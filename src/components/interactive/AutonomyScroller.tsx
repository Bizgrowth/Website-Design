"use client";

import { motion } from "motion/react";
import { useState } from "react";

const stages = [
  {
    tier: "Red",
    name: "Human decides",
    body: "AI researches and drafts. A person makes every decision. Every new workflow starts here, and so does anything touching money, legal exposure, or an upset customer.",
    proof: "Exit when: a labeled test set exists and accuracy is known.",
    color: "bg-risk",
    text: "text-risk",
  },
  {
    tier: "Yellow",
    name: "Human approves",
    body: "AI acts, but a person reviews before anything reaches a customer. Low-confidence work goes to its own queue.",
    proof: "Track: accuracy, share approved without edits, escalation rate.",
    color: "bg-warn",
    text: "text-warn",
  },
  {
    tier: "Green",
    name: "AI runs, people audit",
    body: "Promoted one task type at a time, only after it holds its pass rate. A fixed sample is still reviewed every month.",
    proof: "Demotion is allowed: if accuracy drops, it goes back to Yellow.",
    color: "bg-ok",
    text: "text-ok",
  },
];

// Sticky autonomy meter that fills as each stage scrolls into view.
export function AutonomyScroller() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
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
          <p className="mt-2 text-sm text-muted">Autonomy is earned with data. It&apos;s never assumed.</p>
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
            className="flex min-h-[40vh] flex-col justify-center rounded-2xl border border-line bg-surface p-8"
          >
            <span className={`text-xs font-bold uppercase tracking-wider ${s.text}`}>
              Stage {i + 1} · {s.tier}
            </span>
            <h3 className="mt-2 text-2xl font-bold">{s.name}</h3>
            <p className="mt-3 max-w-xl text-muted">{s.body}</p>
            <p className="mt-4 text-sm font-medium">{s.proof}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
