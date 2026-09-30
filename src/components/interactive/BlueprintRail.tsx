"use client";

import Link from "next/link";
import { Morph } from "@/components/PageTransition";
import { useRef, type PointerEvent } from "react";

export type RailItem = { slug: string; title: string; summary: string; industry: string; stack: string[] };

// Horizontal, snap-scrolling rail of blueprints. Works with touch, trackpad,
// the arrow buttons, and click-and-drag with a mouse.
export function BlueprintRail({ items }: { items: RailItem[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !rail.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: rail.current.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !rail.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    rail.current.scrollLeft = d.startScroll - dx;
  };
  const onUp = () => {
    drag.current.active = false;
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-faint">Drag to explore →</p>
        <div className="flex gap-2">
          <RailButton label="Previous blueprints" onClick={() => scrollBy(-1)}>←</RailButton>
          <RailButton label="Next blueprints" onClick={() => scrollBy(1)}>→</RailButton>
        </div>
      </div>
      <div
        ref={rail}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => {
          // A drag shouldn't count as a click on the card underneath.
          if (drag.current.moved) {
            e.preventDefault();
            drag.current.moved = false;
          }
        }}
        className="rail -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:cursor-grab md:active:cursor-grabbing"
      >
        {items.map((b, i) => (
          <Link
            key={b.slug}
            href={`/blueprints/${b.slug}`}
            draggable={false}
            className="group flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent sm:w-[420px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full bg-warn-soft px-2.5 py-0.5 text-xs font-medium text-warn">Reference build</span>
            </div>
            <p className="mt-6 text-xs font-medium text-accent">{b.industry}</p>
            <Morph name={`bp-${b.slug}`}>
              <h3 className="mt-1 text-xl font-semibold">{b.title}</h3>
            </Morph>
            <p className="mt-3 flex-1 text-sm text-muted">{b.summary}</p>
            <p className="mt-6 font-mono text-xs text-faint">{b.stack.join(" · ")}</p>
            <span className="mt-4 text-sm font-semibold text-accent transition group-hover:translate-x-1">
              See the architecture →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
