import { resultsEmail } from "@/lib/assessment-email";
import { scoreAssessment, validAnswers } from "@/lib/assessment";
import { EMAIL, clientIp, clip, rateLimited } from "@/lib/forms";
import { mailConfigured, ownerAddress, sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

// Emails a visitor their readiness results and alerts Daniel. The score is recomputed here from the answers.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  // Hidden field real visitors never fill in: pretend success so bots learn nothing.
  if (clip(body.website, 200)) return Response.json({ ok: true });

  if (rateLimited(`assessment:${clientIp(req)}`, 5)) return Response.json({ error: "rate_limited" }, { status: 429 });
  if (!mailConfigured()) return Response.json({ error: "offline" }, { status: 503 });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const company = clip(body.company, 160);
  if (!name) return Response.json({ error: "invalid", message: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(email)) return Response.json({ error: "invalid", message: "That email address looks invalid." }, { status: 400 });
  if (body.consent !== true) return Response.json({ error: "invalid", message: "Please tick the box so we can email you." }, { status: 400 });
  if (!validAnswers(body.answers)) return Response.json({ error: "bad_request" }, { status: 400 });
  const result = scoreAssessment(body.answers);
  if (!result) return Response.json({ error: "bad_request" }, { status: 400 });

  const { text, html } = resultsEmail(name, result);
  const sent = await sendMail({ to: email, replyTo: site.email, subject: `Your AI Readiness results: ${result.tier.name}`, text, html });
  if (!sent) return Response.json({ error: "send_failed" }, { status: 502 });

  // Alert for Daniel. A failure here does not fail the visitor's request.
  await sendMail({
    to: ownerAddress(),
    replyTo: email,
    subject: `New assessment lead: ${name}${company ? ` (${company})` : ""} · ${result.tier.name}`,
    text: [
      "New lead from the AI Readiness self-check",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "(not given)"}`,
      "",
      `Result: ${result.tier.name} (${result.total} of ${result.max})`,
      ...result.areas.map((a) => `- ${a.name}: ${a.score} of 6`),
      `Biggest gap: ${result.weakest.name}`,
      "",
      "They asked for their results by email and agreed to be contacted. Reply to this email to respond.",
    ].join("\n"),
  });
  return Response.json({ ok: true });
}
