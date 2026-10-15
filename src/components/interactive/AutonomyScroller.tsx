"use client";

import { motion } from "motion/react";
import { useState } from "react";

const stages = [
  {
    tier: "Red",
    name: "You decide",
    body: "AI researches and drafts. A person makes every call. Every new workflow starts here, along with anything involving money, legal risk, or an unhappy customer.",
    color: "bg-risk",
    text: "text-risk",
  },
  {
    tier: "Yellow",
    name: "You approve",
    body: "AI does the work, and a person reviews it before a customer sees anything. Anything the AI is unsure about goes to a separate queue.",
    color: "bg-warn",
    text: "text-warn",
  },
  {
    tier: "Green",
    name: "AI runs, you spot-check",
    body: "A task moves here only after it hits an agreed accuracy rate on your real work. A sample is still reviewed every month. If accuracy slips, it goes back to Yellow.",
    color: "bg-ok",
    text: "text-ok",
  },
];

// Sticky autonomy meter that fills as each stage scrolls into view.
export function AutonomyScroller() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr] md:gap-8 lg:grid-cols-[360px_1fr] lg:gap-10">
      <div className="hidden md:sticky md:top-28 md:block md:self-start">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">Autonomy level</p>
          <div className="mt-4 flex gap-2" role="img" aria-label={`Stage ${active + 1} of 3: ${stages[active].tier}`}>
            {stages.map((s, i) => (
              <div key={s.tier} className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className={`h-full ${s.color}`}
                  initial={false}
                  animate={{ width: i <= active ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            ))}
          </div>
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-2xl font-bold ${stages[active].text}`}
          >
            {stages[active].tier}: {stages[active].name}
          </motion.p>
        </div>
      </div>

      <ol className="space-y-6">
        {stages.map((s, i) => (
          <motion.li
            key={s.tier}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.6 }}
            initial={{ opacity: 0.35 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col justify-center rounded-2xl border border-line bg-surface p-6 sm:p-8 md:min-h-[36vh]"
          >
            {/* Mini meter for phones, where the sticky meter is hidden */}
            <div className="mb-4 flex gap-1.5 md:hidden" aria-hidden>
              {stages.map((m, j) => (
                <span key={m.tier} className={`h-1.5 flex-1 rounded-full ${j <= i ? m.color : "bg-surface-2"}`} />
              ))}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${s.text}`}>
              Stage {i + 1} · {s.tier}
            </span>
            <h3 className="mt-2 text-2xl font-semibold">{s.name}</h3>
            <p className="mt-3 max-w-xl text-muted">{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
