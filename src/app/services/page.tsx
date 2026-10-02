import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { Card, Container, PageHeader } from "@/components/ui";
import { services } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Services",
  description: "AI readiness, workflow automation, AI agents, dashboards, and AI governance for SMBs.",
};

const ladder = [
  { step: "1", name: "Diagnostic", body: "Two weeks. Inventory, baselines, and the three workflows worth automating first." },
  { step: "2", name: "Governed build", body: "One workflow at a time, with controls, an eval set, and a failure playbook." },
  { step: "3", name: "Oversight", body: "Monthly review of accuracy, exceptions, and cost — and promotion to autonomy." },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Services"
        title="From “where do we start?” to AI that runs — and stays running"
        lead="Five service areas, delivered in the same order every time: diagnose, build with controls, then oversee."
      />
      <Container className="py-14">
        <ol className="grid gap-4 md:grid-cols-3">
          {ladder.map((l) => (
            <li key={l.step} className="rounded-2xl border border-line bg-surface p-6">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{l.step}</span>
              <h2 className="mt-3 font-medium">{l.name}</h2>
              <p className="mt-2 text-sm text-muted">{l.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} href={`/services/${s.slug}`}>
              <h2 className="text-xl font-medium">{s.name}</h2>
              <p className="mt-2 font-medium">{s.outcome}</p>
              <p className="mt-2 text-sm text-muted">{s.summary}</p>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          Need ongoing senior operations leadership instead? <Link href="/fractional-coo" className="text-accent hover:underline">See the Fractional COO option</Link>.
        </p>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
