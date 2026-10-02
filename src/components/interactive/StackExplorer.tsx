"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import type { Category, Integration } from "@/lib/integrations";

// Filterable grid of tool tiles. Selecting a tile shows
// what gets automated with it and the blueprints that use it.
export function StackExplorer({
  integrations,
  categories,
  blueprintTitles,
}: {
  integrations: Integration[];
  categories: Category[];
  blueprintTitles: Record<string, string>;
}) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [selected, setSelected] = useState(integrations[0].name);
  const current = integrations.find((i) => i.name === selected) ?? integrations[0];
  const panel = useRef<HTMLDivElement>(null);

  // On phones the detail panel sits below the grid, so bring it into view after a tap.
  const select = (name: string) => {
    setSelected(name);
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  return (
    <div>
      <div className="rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter tools by category">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition ${
              filter === c ? "border-white bg-white text-navy" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="relative">
          <ul className="relative grid grid-cols-6 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
            {integrations.map((tool) => {
              const dim = filter !== "All" && tool.category !== filter;
              const active = tool.name === current.name;
              return (
                <li key={tool.name}>
                  <button
                    type="button"
                    onClick={() => select(tool.name)}
                    aria-pressed={active}
                    aria-label={`${tool.name}, ${tool.category}`}
                    className={`group grid aspect-square w-full min-h-11 place-items-center rounded-xl border backdrop-blur sm:rounded-2xl transition duration-300 ${
                      active
                        ? "scale-105 border-hero-accent bg-white/10 shadow-[0_0_32px_-4px_var(--hero-accent)]"
                        : "border-white/10 bg-black/40 hover:-translate-y-1 hover:border-white/30"
                    } ${dim ? "opacity-25" : "opacity-100"}`}
                  >
                    <BrandIcon icon={tool.icon} label={tool.name} size={26} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            ref={panel}
            key={current.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="scroll-mt-24 self-start rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-black/40">
                <BrandIcon icon={current.icon} label={current.name} size={26} />
              </span>
              <div>
                <p className="text-lg font-bold text-white">{current.name}</p>
                <p className="text-xs text-white/50">{current.category}</p>
              </div>
            </div>

            {/* Mini flow: tool → AI Ops layer → your team */}
            <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-white/70">
              <span className="rounded-md border border-white/10 px-2 py-1">{current.name}</span>
              <Pulse />
              <span className="rounded-md border border-hero-accent/60 px-2 py-1 text-hero-accent">AI Ops layer</span>
              <Pulse />
              <span className="rounded-md border border-white/10 px-2 py-1">Your team</span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/50">What we automate</p>
            <ul className="mt-2 space-y-2 text-sm text-white/80">
              {current.automate.map((a) => (
                <li key={a} className="flex gap-2"><span className="text-ok">✓</span>{a}</li>
              ))}
            </ul>

            {current.blueprints.length > 0 && (
              <>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/50">Used in blueprints</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {current.blueprints.map((slug) => (
                    <li key={slug}>
                      <Link href={`/blueprints/${slug}`} className="inline-flex min-h-10 items-center text-hero-accent hover:underline">
                        {blueprintTitles[slug] ?? slug} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Pulse() {
  return (
    <span className="relative h-px w-6 bg-white/20" aria-hidden>
      <motion.span
        className="absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-hero-accent"
        animate={{ x: [0, 20], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      />
    </span>
  );
}
