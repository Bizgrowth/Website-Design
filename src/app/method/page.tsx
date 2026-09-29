import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { EarnedAutonomy } from "@/components/EarnedAutonomy";
import { Container, PageHeader, SectionHeading } from "@/components/ui";

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

const phases = [
  { name: "Align", time: "Weeks 1–2", body: "Leadership interview, readiness score, shadow-AI inventory, top-10 workflow list." },
  { name: "Map", time: "Weeks 2–3", body: "Document the three highest-value workflows and capture baselines." },
  { name: "Govern", time: "Weeks 3–4", body: "Assign owners, set risk tiers, build the approval matrix and failure playbook — before building." },
  { name: "Deploy", time: "Weeks 4–8", body: "Build against the rules. Run in parallel with the human process until quality thresholds are met." },
  { name: "Optimize", time: "Ongoing", body: "Monthly review of KPIs, exceptions, and cost. Promote workflows from Yellow to Green as they earn it." },
];

export default function MethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="Method"
        title="Earned Autonomy: AI that starts supervised and earns its independence"
        lead="The same discipline used to run utilization review in managed care — tiered approvals, thresholds, audit trails — applied to AI."
      />
      <Container className="py-14">
        <SectionHeading eyebrow="Three stages" title="Every workflow moves Red → Yellow → Green" />
        <EarnedAutonomy />
      </Container>

      <section className="border-y border-line bg-surface py-14">
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
        <ol className="space-y-3">
          {phases.map((p, i) => (
            <li key={p.name} className="grid gap-2 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-[48px_160px_1fr] sm:items-center">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold text-white">{i + 1}</span>
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-xs text-faint">{p.time}</p>
              </div>
              <p className="text-sm text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm text-muted">
          On efficiency claims: we target large gains on specific workflows, measured against your own baseline — never a
          company-wide multiplier we can&apos;t show you the math for.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
