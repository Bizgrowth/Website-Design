import Anthropic from "@anthropic-ai/sdk";
import { parseLead, sendLeadEmail } from "@/lib/chat/lead";
import { buildSystemPrompt } from "@/lib/chat/prompt";
import { trustedSources } from "@/lib/chat/sources";
import { site } from "@/lib/site";

export const maxDuration = 60;

const MODEL = process.env.CHAT_MODEL || "claude-opus-5-5";
const MAX_MESSAGES = 16;
const MAX_CHARS = 1500;
const MAX_TURNS = 5;

// Light abuse guard. Serverless instances do not share memory, so also set a spend limit in the Anthropic Console.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 25;
}

const tools: Anthropic.Beta.BetaToolUnion[] = [
  {
    type: "web_search_20260209",
    name: "web_search",
    max_uses: 3,
    allowed_domains: trustedSources,
  },
  {
    name: "save_lead",
    description:
      "Send the visitor's contact details to Daniel by email. Call only after the visitor has given their name, email, and what they need, AND has clearly agreed to be contacted. Call at most once per conversation.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's name" },
        email: { type: "string", description: "Visitor's email address" },
        company: { type: "string", description: "Visitor's company, or an empty string if not given" },
        need: { type: "string", description: "What the visitor wants help with, in their words" },
        summary: { type: "string", description: "Two to four sentence summary of the conversation and their situation" },
        consent: { type: "boolean", description: "True only if the visitor explicitly agreed to be contacted by Daniel" },
      },
      required: ["name", "email", "company", "need", "summary", "consent"],
      additionalProperties: false,
    },
  },
];

type Incoming = { role: "user" | "assistant"; content: string };

function cleanMessages(raw: unknown): Incoming[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs = raw.slice(-MAX_MESSAGES).map((m) => {
    const r = m as Record<string, unknown>;
    return { role: r.role === "assistant" ? "assistant" : "user", content: typeof r.content === "string" ? r.content.trim().slice(0, MAX_CHARS) : "" } as Incoming;
  });
  if (msgs.some((m) => !m.content)) return null;
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  return msgs.length && msgs[msgs.length - 1].role === "user" ? msgs : null;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "offline" }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: { messages?: unknown; page?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const incoming = cleanMessages(body.messages);
  if (!incoming) return Response.json({ error: "bad_request" }, { status: 400 });
  const page = typeof body.page === "string" ? body.page : undefined;

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      const messages: Anthropic.Beta.BetaMessageParam[] = incoming;
      let leadSaved = false;
      try {
        for (let turn = 0; turn < MAX_TURNS; turn++) {
          const params = {
            model: MODEL,
            max_tokens: 2000,
            system: [{ type: "text" as const, text: buildSystemPrompt(), cache_control: { type: "ephemeral" as const } }],
            tools,
            messages,
            output_config: { effort: "low" as const },
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
          };
          const s = client.beta.messages.stream(params as Anthropic.Beta.MessageCreateParamsStreaming);
          s.on("text", (delta) => send({ t: delta }));
          s.on("contentBlock", (block) => {
            if (block.type === "server_tool_use") send({ status: "Checking trusted AI sources…" });
          });
          const msg = await s.finalMessage();
          // Pass the assistant content back unchanged so tool loops and server-tool pauses continue correctly.
          messages.push({ role: "assistant", content: msg.content });

          if (msg.stop_reason === "refusal") {
            send({ t: `I can't help with that one. For anything else, or to talk with ${site.owner}, book a call: ${site.bookingUrl}` });
            break;
          }
          if (msg.stop_reason === "pause_turn") continue;
          if (msg.stop_reason === "tool_use") {
            const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
            for (const block of msg.content) {
              if (block.type !== "tool_use") continue;
              if (block.name !== "save_lead") {
                results.push({ type: "tool_result", tool_use_id: block.id, content: "Unknown tool.", is_error: true });
                continue;
              }
              if (leadSaved) {
                results.push({ type: "tool_result", tool_use_id: block.id, content: "Lead was already sent for this conversation.", is_error: true });
                continue;
              }
              const parsed = parseLead(block.input, page);
              if ("error" in parsed) {
                results.push({ type: "tool_result", tool_use_id: block.id, content: parsed.error, is_error: true });
                continue;
              }
              const ok = await sendLeadEmail(parsed.lead);
              if (ok) {
                leadSaved = true;
                send({ lead: "sent" });
                results.push({ type: "tool_result", tool_use_id: block.id, content: "Success. The lead was emailed to Daniel." });
              } else {
                results.push({ type: "tool_result", tool_use_id: block.id, content: "Delivery failed. Give the visitor Daniel's email address instead.", is_error: true });
              }
            }
            messages.push({ role: "user", content: results });
            continue;
          }
          if (msg.stop_reason === "max_tokens") send({ t: "\n\n(Reply cut short. Ask me to continue.)" });
          break;
        }
        send({ done: true });
      } catch (err) {
        console.error("[chat] error:", err instanceof Error ? err.message : err);
        send({ error: "failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store, no-transform", "X-Accel-Buffering": "no" },
  });
}
