"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { LightStreaks } from "@/components/LightStreaks";

/* ---------------- Parallax ---------------- */

// Fixed light-streak backdrop that drifts slower than the page.
export function Atmosphere() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -220]);
  return <motion.div aria-hidden className="atmosphere" style={{ y }} />;
}

// Hero with three depth layers: background glows (slowest), copy, and the
// foreground visual (fastest). Everything eases out as the hero leaves.
export function HeroParallax({ copy, visual, className = "" }: { copy: ReactNode; visual: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120 * k]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -140 * k]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div aria-hidden style={{ y: bgY }} className="pointer-events-none absolute -bottom-24 -top-32 left-1/2 -z-10 w-screen -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <LightStreaks />
      </motion.div>
      <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>{copy}</motion.div>
        <motion.div style={{ y: visualY }}>{visual}</motion.div>
      </div>
    </div>
  );
}

// Element drifts at a different speed from the scroll, for depth.
export function ParallaxLayer({ children, speed = 0.2, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 200 * speed, reduce ? 0 : -200 * speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// 3D tilt that follows the pointer (mouse parallax).
export function Tilt({ children, max = 6, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------- Reveals ---------------- */

// Staggered word-by-word entrance for headlines. Screen readers get the full sentence.
export function WordCascade({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Clip-path reveals are triggered by an unclipped wrapper: a fully clipped
// element never registers as intersecting, so it can't observe itself.
function ClipReveal({ from, to, duration, amount, children, className = "" }: {
  from: string; to: string; duration: number; amount: number; children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <div ref={ref} className={className}>
      <motion.div
        data-reveal
        initial={{ clipPath: from }}
        animate={inView ? { clipPath: to } : undefined}
        transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Wipe: a hard edge sweeps left to right to uncover the content.
export function Wipe({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ClipReveal from="inset(0 100% 0 0)" to="inset(0 0% 0 0)" duration={0.8} amount={0.5} className={className}>
      {children}
    </ClipReveal>
  );
}

// Circular mask expanding from the center.
export function CircleReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ClipReveal from="circle(0% at 50% 50%)" to="circle(75% at 50% 50%)" duration={1} amount={0.3} className={className}>
      {children}
    </ClipReveal>
  );
}

// Zoom: scales up from slightly smaller with a soft focus pull.
export function ZoomIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ scale: 0.86, opacity: 0, filter: "blur(6px)" }}
      whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Flip card ---------------- */

// Two-sided card. Flips on hover (mouse) or tap/Enter (touch, keyboard).
// Both faces stay in the accessibility tree.
export function FlipCard({ front, back, className = "" }: { front: ReactNode; back: ReactNode; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      className={`group block h-full w-full text-left [perspective:1000px] ${className}`}
    >
      <motion.div
        className="relative h-full min-h-40 [transform-style:preserve-3d]"
        animate={{ rotateY: flipped && !reduce ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 [backface-visibility:hidden] ${
            reduce && flipped ? "opacity-0" : ""
          }`}
        >
          {front}
        </div>
        <div
          className={`flare-edge absolute inset-0 flex flex-col justify-center rounded-2xl bg-bg p-5 [backface-visibility:hidden] ${
            reduce ? (flipped ? "opacity-100" : "opacity-0") : "[transform:rotateY(180deg)]"
          }`}
        >
          {back}
        </div>
      </motion.div>
    </button>
  );
}
