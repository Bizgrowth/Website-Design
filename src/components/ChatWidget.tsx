"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "Is my business ready for AI?",
  "Which workflows should I automate first?",
  "What's new in AI for small business?",
  "What does it cost to work with Daniel?",
];

// Minimal, safe markdown: paragraphs, bullet lists, **bold**, and links (https or site-relative only).
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[3]) parts.push(<strong key={i++}>{m[3]}</strong>);
    else if (m[2].startsWith("/") && !m[2].startsWith("//"))
      parts.push(<Link key={i++} href={m[2]} className="font-semibold text-accent underline">{m[1]}</Link>);
    else if (m[2].startsWith("https://"))
      parts.push(<a key={i++} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">{m[1]}</a>);
    else parts.push(m[1]);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Rich({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter(Boolean);
        if (lines.length && lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l))) {
          return (
            <ul key={bi} className="my-1 list-disc space-y-1 pl-5">
              {lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*([-*]|\d+\.)\s+/, ""))}</li>)}
            </ul>
          );
        }
        return (
          <p key={bi} className="my-1">
            {lines.map((l, li) => <Fragment key={li}>{li > 0 && <br />}{inline(l)}</Fragment>)}
          </p>
        );
      })}
    </>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, status, leadSent]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setNotice("");
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setBusy(true);
    setStatus("");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    let started = false;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, page: pathname }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        setNotice(
          res.status === 429
            ? "You're asking quickly. Please wait a few minutes and try again."
            : `The chat assistant is offline right now. Book an Ops Call or email ${site.email}.`,
        );
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n\n")) !== -1) {
          const line = buf.slice(0, idx).trim();
          buf = buf.slice(idx + 2);
          if (!line.startsWith("data: ")) continue;
          let ev: { t?: string; status?: string; lead?: string; error?: string };
          try {
            ev = JSON.parse(line.slice(6));
          } catch {
            continue;
          }
          if (ev.status) setStatus(ev.status);
          if (ev.lead === "sent") setLeadSent(true);
          if (ev.error) setNotice("Something went wrong. Please try again.");
          if (ev.t) {
            setStatus("");
            const delta = ev.t;
            if (!started) {
              started = true;
              setMessages((m) => [...m, { role: "assistant", content: delta }]);
            } else {
              setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, content: x.content + delta } : x)));
            }
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") setNotice("Connection lost. Please try again.");
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  return (
    <>
      {!open && (
        // The wrapper is what is pinned to the corner: .btn-flare sets position: relative, which would override `fixed` on the button itself.
        <div className="fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-flare inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-medium"
            aria-label="Open the AI Solutions Guide chat"
          >
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            Ask the AI guide
          </button>
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="AI Solutions Guide"
          className="fixed inset-x-3 bottom-3 z-50 flex h-[min(78vh,640px)] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px]"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="font-medium">AI Solutions Guide</p>
              <p className="text-xs text-muted">Ask about AI for your operations</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-11 w-11 place-items-center rounded-xl text-muted hover:text-ink">
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="text-muted">
                  I can explain how AI fits your operations, what&apos;s new in AI tools, and what working with {site.owner} looks like.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {starters.map((s) => (
                    <button key={s} type="button" onClick={() => ask(s)} className="min-h-11 rounded-xl border border-line bg-surface-2 px-3 py-2 text-left hover:border-accent/40">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${m.role === "user" ? "bg-accent-soft" : "bg-surface-2"}`}>
                  {m.role === "assistant" ? <Rich text={m.content} /> : m.content}
                </div>
              </div>
            ))}
            {busy && !status && messages[messages.length - 1]?.role === "user" && <p className="text-xs text-muted">Thinking…</p>}
            {status && <p className="text-xs text-muted">{status}</p>}
            {leadSent && <p className="rounded-xl bg-ok-soft px-3 py-2 text-xs text-ok">✓ Your details were sent to {site.owner}.</p>}
            {notice && <p className="rounded-xl bg-warn-soft px-3 py-2 text-xs text-warn">{notice}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="border-t border-line p-3"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1500}
                placeholder="Ask a question…"
                aria-label="Your message"
                className="min-h-11 flex-1 rounded-xl border border-line bg-surface-2 px-3 text-sm outline-none focus:border-accent"
              />
              <button type="submit" disabled={busy || !input.trim()} className="min-h-11 rounded-xl bg-accent px-4 text-sm font-semibold text-on-accent disabled:opacity-50">
                Send
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-faint">
              AI-generated answers can be wrong. Messages are processed by an AI service. If you share contact details, they&apos;re emailed to {site.owner}. See our{" "}
              <Link className="underline" href="/privacy">Privacy Policy</Link>. Prefer to talk?{" "}
              <a className="underline" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">Book an Ops Call</a>.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
