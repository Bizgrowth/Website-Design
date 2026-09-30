import { site } from "@/lib/site";

export type Lead = {
  name: string;
  email: string;
  company?: string;
  need: string;
  summary: string;
  consent: boolean;
  page?: string;
};

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

// Validates the agent's tool input. Returns an error string the agent can act on, or the clean lead.
export function parseLead(input: unknown, page?: string): { lead: Lead } | { error: string } {
  const i = (input ?? {}) as Record<string, unknown>;
  const lead: Lead = {
    name: clip(i.name, 120),
    email: clip(i.email, 200),
    company: clip(i.company, 160) || undefined,
    need: clip(i.need, 800),
    summary: clip(i.summary, 1500),
    consent: i.consent === true,
    page: page ? clip(page, 200) : undefined,
  };
  if (!lead.consent) return { error: "The visitor has not clearly agreed to be contacted. Ask for their permission first." };
  if (!lead.name) return { error: "Missing the visitor's name." };
  if (!EMAIL.test(lead.email)) return { error: "The email address looks invalid. Ask the visitor to check it." };
  if (!lead.need) return { error: "Missing what the visitor wants help with." };
  return { lead };
}

// Sends the lead to Daniel by email through Resend. Returns true only when the email was accepted.
export async function sendLeadEmail(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[chat] RESEND_API_KEY is not set; lead not delivered.");
    return false;
  }
  const text = [
    `New lead from the ${site.shortName} website chat`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company ?? "(not given)"}`,
    `Page: ${lead.page ?? "(unknown)"}`,
    "",
    "What they want help with:",
    lead.need,
    "",
    "Conversation summary:",
    lead.summary || "(none)",
    "",
    "The visitor agreed to be contacted. Reply to this email to respond to them directly.",
  ].join("\n");
  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || `${site.shortName} Chat <onboarding@resend.dev>`,
        to: [process.env.LEAD_TO_EMAIL || site.email],
        reply_to: lead.email,
        subject: `New chat lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
        text,
      }),
    });
    if (!res.ok) console.error("[chat] Resend rejected the lead email:", res.status);
    return res.ok;
  } catch (err) {
    console.error("[chat] Lead email failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
