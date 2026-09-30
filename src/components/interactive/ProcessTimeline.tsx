"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";

export type Phase = { name: string; time: string; body: string };

// Vertical timeline whose line draws itself as the reader scrolls.
export function ProcessTimeline({ phases }: { phases: Phase[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <ol ref={ref} className="relative space-y-8 pl-14">
      <div className="absolute bottom-2 left-[18px] top-2 w-0.5 rounded bg-line" aria-hidden />
      <motion.div
        className="absolute left-[18px] top-2 w-0.5 origin-top rounded bg-accent"
        style={{ scaleY: scrollYProgress, bottom: "0.5rem" }}
        aria-hidden
      />
      {phases.map((p, i) => (
        <motion.li
          key={p.name}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <span className="absolute -left-14 grid h-10 w-10 place-items-center rounded-full border-2 border-accent bg-surface text-sm font-bold text-accent">
            {i + 1}
          </span>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <span className="text-xs font-medium text-faint">{p.time}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{p.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
