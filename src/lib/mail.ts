import { site } from "@/lib/site";

export type Mail = { to: string; subject: string; text: string; html?: string; replyTo?: string };

// Visitor-facing and alert emails share one sender. Any address on the verified domain works.
// Set CONTACT_FROM_EMAIL (e.g. "Daniel Schley <hello@aiopsexpert.com>") to change it; falls back to LEAD_FROM_EMAIL.
export const fromAddress = () =>
  process.env.CONTACT_FROM_EMAIL || process.env.LEAD_FROM_EMAIL || `${site.shortName} <onboarding@resend.dev>`;

// Where alerts for Daniel go.
export const ownerAddress = () => process.env.LEAD_TO_EMAIL || site.email;

export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

// Sends one email through Resend's REST API. Returns true only when Resend accepted it.
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[mail] RESEND_API_KEY is not set; email not sent.");
    return false;
  }
  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddress(),
        to: [mail.to],
        subject: mail.subject,
        text: mail.text,
        ...(mail.html ? { html: mail.html } : {}),
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
    });
    if (!res.ok) console.error("[mail] Resend rejected an email:", res.status);
    return res.ok;
  } catch (err) {
    console.error("[mail] Send failed:", err instanceof Error ? err.message : err);
    return false;
  }
}
