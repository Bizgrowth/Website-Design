"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import type { Integration } from "@/lib/integrations";

type Icons = { gmail: Integration["icon"]; quickbooks: Integration["icon"]; sheets: Integration["icon"]; hubspot: Integration["icon"] };

// Three cards, each with a small working visual: connect → measure → act with approval.
export function StackSteps({ icons }: { icons: Icons }) {
  const steps = [
    {
      n: "01",
      title: "Connect your systems",
      body: "Inbox, CRM, accounting, and the sheets your team already keeps — wired into one flow so every task starts with the right facts.",
      visual: <ConnectVisual icons={icons} />,
    },
    {
      n: "02",
      title: "Measure before you trust",
      body: "Every agent is tested against a labeled set of your real work. If a change lowers the pass rate, it doesn't ship.",
      visual: <EvalVisual />,
    },
    {
      n: "03",
      title: "Let AI act — with approval",
      body: "AI drafts and prepares; your team approves with one click. Low-risk tasks earn autonomy once the data says so.",
      visual: <ApproveVisual />,
    },
  ];

  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/10 md:grid-cols-3">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className="flex flex-col border-white/10 bg-white/[0.02] md:border-l md:first:border-l-0 [&+&]:border-t md:[&+&]:border-t-0"
        >
          <div className="grid h-72 place-items-center border-b border-white/10 bg-black/30 p-5">{s.visual}</div>
          <div className="p-6">
            <span className="inline-grid h-11 w-11 place-items-center border border-white/15 font-mono text-lg text-hero-accent">{s.n}</span>
            <h3 className="mt-4 text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-white/60">{s.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/5">{children}</div>;
}

function ConnectVisual({ icons }: { icons: Icons }) {
  return (
    <div className="relative grid h-full w-full max-w-[260px] grid-cols-2 place-items-center gap-y-6" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 200" preserveAspectRatio="none">
        {[
          "M50 45 H130 V100",
          "M210 45 H130 V100",
          "M50 155 H130 V100",
          "M210 155 H130 V100",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--hero-accent)"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            initial={{ strokeDashoffset: 0, opacity: 0.35 }}
            animate={{ strokeDashoffset: -36, opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.25 }}
          />
        ))}
      </svg>
      <Tile><BrandIcon icon={icons.gmail} label="Gmail" size={26} /></Tile>
      <Tile><BrandIcon icon={icons.hubspot} label="HubSpot" size={26} /></Tile>
      <Tile><BrandIcon icon={icons.sheets} label="Google Sheets" size={26} /></Tile>
      <Tile><BrandIcon icon={icons.quickbooks} label="QuickBooks" size={26} /></Tile>
      <motion.div
        className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_0_24px_var(--hero-accent)]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className="text-[10px] font-bold">AI</span>
      </motion.div>
    </div>
  );
}

function EvalVisual() {
  const rate = 94;
  return (
    <div className="w-full max-w-[280px] rounded-xl border border-white/10 bg-navy/70 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/80">Eval gate</p>
        <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-semibold text-ok">Passed</span>
      </div>
      <p className="mt-2 font-mono text-4xl font-semibold text-hero-accent">
        {rate}%<span className="ml-2 font-sans text-xs text-white/50">pass rate · floor 85%</span>
      </p>
      <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-hero-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${rate}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <span className="absolute inset-y-0 left-[85%] w-px bg-warn" aria-hidden />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] text-white/50">
        {[
          ["CASES", "150"],
          ["INTENT", "96%"],
          ["ESCALATED", "100%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-white/10 p-2">
            <dt>{k}</dt>
            <dd className="mt-1 text-sm text-white">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-[10px] text-white/40">Example report · Email Triage blueprint</p>
    </div>
  );
}

function ApproveVisual() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="w-full max-w-[280px] rounded-xl border border-white/10 bg-navy/70 p-4 text-left">
      <p className="text-sm text-white/80">Inbox</p>
      <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-2.5">
        <p className="text-[11px] font-semibold text-hero-accent">AI Ops agent</p>
        <p className="text-xs text-white/80">Drafted a reply to the balance question · conf 0.93</p>
      </div>
      <div className="mt-2 flex justify-end">
        <AnimatePresence mode="wait">
          {approved ? (
            <motion.button
              key="done"
              type="button"
              onClick={() => setApproved(false)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-ok/60 bg-ok-soft px-3 py-1.5 text-xs font-semibold text-ok"
              title="Replay"
            >
              ✓ Approved · sent
            </motion.button>
          ) : (
            <motion.button
              key="todo"
              type="button"
              onClick={() => setApproved(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-hero-accent px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_16px_-4px_var(--hero-accent)] hover:bg-white/10"
            >
              ✦ Review &amp; approve
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {approved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 rounded-lg border border-white/10 bg-white/5 p-2.5"
          >
            <p className="text-[11px] font-semibold text-white/60">Guest</p>
            <p className="text-xs text-white/80">Thanks — that was fast!</p>
          </motion.div>
        )}
      </AnimatePresence>
      {!approved && <p className="mt-2 text-[10px] text-white/40">Try it: click to approve</p>}
    </div>
  );
}
