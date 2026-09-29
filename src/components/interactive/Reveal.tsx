"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Fades and lifts content in the first time it scrolls into view.
// data-reveal lets the <noscript> rule in the layout show content when JS is off.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Reveals each child in turn.
export function Stagger({ children, className, step = 0.08 }: { children: ReactNode[]; className?: string; step?: number }) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} className="h-full">
          {child}
        </Reveal>
      ))}
    </div>
  );
}
