import { EMAIL, clientIp, clip, escapeHtml, rateLimited } from "@/lib/forms";
import { mailConfigured, ownerAddress, sendMail } from "@/lib/mail";
import { site } from "@/lib/site";

// Contact form: alerts Daniel (reply-to is the visitor) and sends the visitor a confirmation.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (clip(body.website, 200)) return Response.json({ ok: true }); // honeypot

  if (rateLimited(`contact:${clientIp(req)}`, 5)) return Response.json({ error: "rate_limited" }, { status: 429 });
  if (!mailConfigured()) return Response.json({ error: "offline" }, { status: 503 });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const company = clip(body.company, 160);
  const message = clip(body.message, 3000);
  if (!name) return Response.json({ error: "invalid", message: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(email)) return Response.json({ error: "invalid", message: "That email address looks invalid." }, { status: 400 });
  if (message.length < 5) return Response.json({ error: "invalid", message: "Please tell us a little about what you need." }, { status: 400 });
  if (body.consent !== true) return Response.json({ error: "invalid", message: "Please tick the box so we can reply to you." }, { status: 400 });

  const alerted = await sendMail({
    to: ownerAddress(),
    replyTo: email,
    subject: `New contact form message: ${name}${company ? ` (${company})` : ""}`,
    text: [
      "New message from the website contact form",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "(not given)"}`,
      "",
      "Message:",
      message,
      "",
      "The visitor agreed to be contacted. Reply to this email to respond.",
    ].join("\n"),
  });
  if (!alerted) return Response.json({ error: "send_failed" }, { status: 502 });

  // Confirmation to the visitor. A failure here does not fail the request.
  const first = name.split(" ")[0] || "there";
  await sendMail({
    to: email,
    replyTo: site.email,
    subject: "Thanks for reaching out",
    text: [
      `Hi ${first},`,
      "",
      "Thanks for your message. It reached me, and I will reply within one business day.",
      "",
      "If it is urgent, the fastest route is to book a 30-minute call:",
      site.bookingUrl,
      "",
      "A copy of what you sent:",
      message,
      "",
      site.owner,
      site.name,
    ].join("\n"),
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:560px"><p>Hi ${escapeHtml(first)},</p><p>Thanks for your message. It reached me, and I will reply within one business day.</p><p>If it is urgent, the fastest route is to <a href="${escapeHtml(site.bookingUrl)}">book a 30-minute call</a>.</p><p style="color:#555;margin-top:20px">A copy of what you sent:</p><blockquote style="margin:4px 0;padding-left:12px;border-left:3px solid #ccc;white-space:pre-wrap">${escapeHtml(message)}</blockquote><p style="margin-top:24px">${escapeHtml(site.owner)}<br>${escapeHtml(site.name)}</p></div>`,
  });
  return Response.json({ ok: true });
}
