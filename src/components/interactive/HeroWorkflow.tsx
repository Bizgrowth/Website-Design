"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Tier = "auto" | "review" | "escalate";

// Sample traffic for the Email Triage blueprint. Simulated, and labeled as such.
const messages: { text: string; intent: string; confidence: number; tier: Tier }[] = [
  { text: "What time does the fuel dock close today?", intent: "Hours", confidence: 0.97, tier: "auto" },
  { text: "Can I move my reservation to next weekend?", intent: "Reservation change", confidence: 0.88, tier: "review" },
  { text: "I think I was charged twice last month.", intent: "Billing dispute", confidence: 0.62, tier: "escalate" },
  { text: "Do you have a slip open for a 32ft boat?", intent: "Availability", confidence: 0.91, tier: "review" },
  { text: "How do I get there from I-95?", intent: "Directions", confidence: 0.98, tier: "auto" },
  { text: "What's my current balance?", intent: "Balance", confidence: 0.93, tier: "review" },
];

const tierStyle: Record<Tier, { label: string; className: string }> = {
  auto: { label: "Draft ready", className: "bg-ok-soft text-ok" },
  review: { label: "Staff review", className: "bg-warn-soft text-warn" },
  escalate: { label: "Escalated", className: "bg-risk-soft text-risk" },
};

const stages = ["Inbox", "AI agent", "Approval gate", "CRM · QuickBooks"];

export function HeroWorkflow() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const visible = [0, 1, 2].map((i) => {
    const index = (tick + i) % messages.length;
    return { ...messages[index], key: tick + i };
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Live queue</p>
        <span className="flex items-center gap-2 text-xs text-white/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Running
        </span>
      </div>

      {/* Pipeline with a pulse travelling between stages */}
      <div className="mt-4 grid grid-cols-4 items-center gap-2">
        {stages.map((s, i) => (
          <div key={s} className="relative">
            <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center text-[11px] font-medium text-white/80">
              {s}
            </div>
            {i < stages.length - 1 && (
              <div className="absolute left-full top-1/2 h-px w-2 bg-white/20" aria-hidden>
                {!reduce && (
                  <motion.span
                    className="absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-accent"
                    animate={{ x: [0, 8], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <ul className="mt-5 space-y-2" aria-live="off">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((m) => (
            <motion.li
              key={m.key}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-navy/60 p-3"
            >
              <p className="text-sm text-white/90">“{m.text}”</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">{m.intent}</span>
                <span className="font-mono text-white/50">conf {m.confidence.toFixed(2)}</span>
                <span className={`ml-auto rounded-full px-2 py-0.5 font-semibold ${tierStyle[m.tier].className}`}>
                  {tierStyle[m.tier].label}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <p className="mt-4 text-[11px] text-white/40">
        Simulated run of the Email Triage blueprint · nothing sends without approval
      </p>
    </div>
  );
}
