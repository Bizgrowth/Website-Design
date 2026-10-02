"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, Honeypot, errorFor, inputCls } from "@/components/FormBits";

// Sends a message through the server (Resend). Daniel gets an alert with the visitor as reply-to,
// and the visitor gets a confirmation email.
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          message: fd.get("message"),
          consent: fd.get("consent") === "on",
          website: fd.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(errorFor(res.status, data.message));
        setState("idle");
        return;
      }
      setSentTo(String(fd.get("email")));
      setState("sent");
    } catch {
      setError("Connection lost. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-ok/40 bg-ok-soft p-6">
        <p className="font-medium text-ok">✓ Message sent</p>
        <p className="mt-1 text-sm text-muted">Thanks. A confirmation is on its way to {sentTo}, and you&apos;ll hear back within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required maxLength={120} autoComplete="name" className={inputCls} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputCls} />
        </Field>
      </div>
      <Field label="Company" optional>
        <input name="company" maxLength={160} autoComplete="organization" className={inputCls} />
      </Field>
      <Field label="What would you like help with?">
        <textarea name="message" required rows={5} maxLength={3000} className={`${inputCls} resize-y`} placeholder="Tell me about the process that eats your team's time." />
      </Field>
      <Honeypot />
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]" />
        <span>
          I agree to be contacted about my message. See the{" "}
          <Link href="/privacy" className="text-accent underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="rounded-xl bg-warn-soft px-3 py-2 text-sm text-warn">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-flare inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-[15px] font-medium disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
