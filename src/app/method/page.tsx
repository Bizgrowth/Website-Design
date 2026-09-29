import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { EarnedAutonomy } from "@/components/EarnedAutonomy";
import { ProcessTimeline } from "@/components/interactive/ProcessTimeline";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { phases } from "@/lib/phases";

export const metadata: Metadata = {
  title: "The Earned Autonomy Method",
  description: "How we install AI so it stays safe, measured, and owned: four layers, five phases, three autonomy stages.",
};

const layers = [
  { name: "Govern", body: "Owners, decision rights, approval thresholds, usage policy, and a risk tier for every workflow." },
  { name: "Operate", body: "Documented processes, handoffs, exception paths, and failure playbooks. AI goes on clean processes, never broken ones." },
  { name: "Build", body: "The automations and agents themselves — Make, n8n, Claude, your CRM. Tool-agnostic so the system outlives any vendor." },
  { name: "Prove", body: "Baselines, a KPI scorecard, quality sampling, and a monthly AI operations review." },
];

export default function MethodPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Method"
        title="Earned Autonomy: AI that starts supervised and earns its independence"
        lead="The same discipline used to run utilization review in managed care — tiered approvals, thresholds, audit trails — applied to AI."
      />
      <Container className="py-14">
        <SectionHeading eyebrow="Three stages" title="Every workflow moves Red → Yellow → Green" />
        <EarnedAutonomy />
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading eyebrow="Four layers" title="What gets installed" lead="Most providers sell only the Build layer. The other three are why AI sticks." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map((l, i) => (
              <div key={l.name} className="rounded-2xl border border-line bg-bg p-6">
                <p className="font-mono text-xs text-faint">Layer {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{l.name}</h3>
                <p className="mt-2 text-sm text-muted">{l.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading eyebrow="Five phases" title="How an install runs" />
        <ProcessTimeline phases={phases} />
        <p className="mt-8 max-w-2xl text-sm text-muted">
          On efficiency claims: we target large gains on specific workflows, measured against your own baseline — never a
          company-wide multiplier we can&apos;t show you the math for.
        </p>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
