import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Fractional COO",
  description: "Part-time senior operations leadership for owner-led companies, with AI built into the operating plan.",
};

const scope = [
  "Operating cadence: weekly KPIs, meeting rhythm, accountability",
  "Process standardization and SOPs your team actually uses",
  "An AI Readiness Diagnostic in the first 30 days",
  "Vendor, tool, and automation decisions",
  "Scaling plans for growth, acquisition, or exit readiness",
];

const fit = [
  "Owner-led companies from roughly $2M to $50M in revenue",
  "PE and search-fund portfolio companies after acquisition",
  "Healthcare services, property management, and logistics operators",
];

export default function FractionalCooPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Premium · Fractional COO"
        title="A COO who has scaled to $265M — part-time, with AI built in"
        lead="Senior operations leadership 10–20 hours a week, without a full-time executive salary."
      />
      <Container className="grid gap-6 py-14 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Eyebrow>What it covers</Eyebrow>
          <ul className="mt-4 space-y-3">
            {scope.map((s) => <li key={s} className="flex gap-3"><span className="text-ok">✓</span>{s}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Eyebrow>Best fit</Eyebrow>
          <ul className="mt-4 space-y-3">
            {fit.map((s) => <li key={s} className="flex gap-3"><span className="text-accent">▸</span>{s}</li>)}
          </ul>
        </div>
      </Container>
      <CtaBand title="Talk through what your operation needs." />
    </PageTransition>
  );
}
