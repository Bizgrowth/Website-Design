"use client";

import { motion } from "motion/react";
import { assessmentAreas } from "@/lib/assessment";

const short: Record<string, string> = { sops: "SOPs", workflows: "Workflows", data: "Data", systems: "Systems", control: "Control" };
const C = 150;
const R = 92;

const pt = (i: number, r: number): [number, number] => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / assessmentAreas.length;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
const outline = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${pt(i, R * (v / 6)).map((n) => n.toFixed(1)).join(" ")}`).join("") + "Z";

// Five-axis map of the readiness areas. Values are 0-6 per area; `answered` dims axes with no answers yet.
export function ReadinessRadar({
  values,
  answered,
  weakest,
  className = "",
}: {
  values: number[];
  answered?: boolean[];
  weakest?: string;
  className?: string;
}) {
  return (
    <svg viewBox="-34 0 368 300" role="img" aria-label="Readiness map across five areas" className={className}>
      {[2, 4, 6].map((k) => (
        <path key={k} d={outline(assessmentAreas.map(() => k))} fill="none" stroke="var(--border)" strokeWidth={k === 6 ? 1.5 : 1} />
      ))}
      {assessmentAreas.map((a, i) => {
        const [x, y] = pt(i, R);
        const [lx, ly] = pt(i, R + 22);
        const dim = answered && !answered[i];
        return (
          <g key={a.slug}>
            <line x1={C} y1={C} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />
            <text
              x={lx}
              y={ly + 4}
              textAnchor={lx < C - 6 ? "end" : lx > C + 6 ? "start" : "middle"}
              fontSize="11.5"
              fill={a.slug === weakest ? "var(--warn)" : dim ? "var(--faint)" : "var(--ink)"}
              fontWeight={a.slug === weakest ? 700 : 500}
            >
              {short[a.slug]}
            </text>
          </g>
        );
      })}
      <motion.path
        initial={false}
        animate={{ d: outline(values) }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        fill="rgba(0, 153, 255, 0.18)"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {assessmentAreas.map((a, i) => {
        const [x, y] = pt(i, R * (values[i] / 6));
        const dim = answered && !answered[i];
        return <circle key={a.slug} cx={x} cy={y} r={a.slug === weakest ? 5 : 3.5} fill={a.slug === weakest ? "var(--warn)" : dim ? "var(--faint)" : "var(--accent)"} />;
      })}
    </svg>
  );
}

// Ring that fills to value/max, with the number in the middle.
export function ScoreRing({ value, max, label }: { value: number; max: number; label: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" role="img" aria-label={`${label}: ${value} of ${max}`} className="h-36 w-36">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - value / max) }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="72" textAnchor="middle" fontSize="30" fontWeight="700" fill="var(--ink)">
        {value}
      </text>
      <text x="70" y="92" textAnchor="middle" fontSize="12" fill="var(--muted)">
        of {max}
      </text>
    </svg>
  );
}
