import type { Metadata } from "next";
import { AssessmentTool } from "@/components/AssessmentTool";
import { CtaBand } from "@/components/CtaBand";
import { PageTransition } from "@/components/PageTransition";
import { Container, Eyebrow, PageHeader, SectionHeading } from "@/components/ui";
import { offers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Most AI projects stall on missing SOPs, undocumented workflows, and siloed data. Take the 10-question self-check to see whether your operations are ready for AI.",
};

const evidence = [
  {
    stat: "60%",
    text: "of AI projects not supported by AI-ready data will be abandoned through 2026, according to Gartner.",
    source: "Gartner press release, Feb 2025",
    href: "https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk",
  },
  {
    stat: "21%",
    text: "of organizations using gen AI had redesigned any workflows. McKinsey found workflow redesign had the biggest effect on profit impact, of 25 factors tested.",
    source: "McKinsey, The state of AI",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value",
  },
  {
    stat: "42%",
    text: "of companies abandoned most of their AI initiatives in 2025, up from 17% in 2024, in a survey of 1,000+ enterprises.",
    source: "S&P Global, reported by CIO Dive",
    href: "https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/",
  },
];

const deliverables = [
  { name: "Readiness scorecard", body: "Current state against the state each automation needs, scored area by area." },
  { name: "Gap list", body: "What has to be written down, mapped, or connected before each workflow can be automated." },
  { name: "Workflow opportunity map", body: "Your workflows ranked by impact, risk, and effort. Not everything should be automated." },
  { name: "Baselines", body: "Time per task, cost per unit, and error rate, so results can be measured against your own numbers." },
  { name: "Governance baseline", body: "Owners, an approval matrix, and a check for AI tools your team already uses on their own." },
  { name: "90-day roadmap", body: "Fix the foundations, pilot one workflow, then scale, in that order." },
];

export default function AssessmentPage() {
  const diagnostic = offers[0];
  return (
    <PageTransition>
      <PageHeader
        eyebrow="AI Readiness Assessment"
        title="AI can't run what isn't written down."
        lead="No SOPs, no documented workflows, and data trapped in silos: that's where AI projects stall. Find out where your operations stand in ten questions."
      />

      <Container className="py-14">
        <SectionHeading eyebrow="Why it matters" title="The tools are not the hard part" />
        <ul className="grid gap-4 md:grid-cols-3">
          {evidence.map((e) => (
            <li key={e.stat} className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-4xl font-bold tabular-nums">{e.stat}</p>
              <p className="mt-2 text-sm text-muted">{e.text}</p>
              <a className="mt-3 inline-block text-xs font-semibold text-accent" href={e.href} target="_blank" rel="noopener noreferrer">
                {e.source} →
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          These are surveys and forecasts, mostly of larger companies. The pattern holds at every size: automation multiplies whatever process it is
          given. Clear, documented processes get faster. Unclear ones get louder.
        </p>
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container className="max-w-3xl">
          <Eyebrow>Free self-check</Eyebrow>
          <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Is your operation ready for AI?</h2>
          <p className="mt-3 text-muted">
            Ten questions across five areas: written SOPs, mapped workflows, connected data, systems, and ownership. Your lowest area matters as much
            as your total, because AI stalls on the weakest link.
          </p>
          <div className="mt-10">
            <AssessmentTool />
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading
          eyebrow="The full assessment"
          title="What you get from the AI Ops Diagnostic"
          lead={`${diagnostic.cadence.replace(" · ", ", ")}. ${diagnostic.price}. The self-check gives you a direction. The diagnostic gives you a plan.`}
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <li key={d.name} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-medium">{d.name}</h3>
              <p className="mt-2 text-sm text-muted">{d.body}</p>
            </li>
          ))}
        </ul>
      </Container>

      <CtaBand
        title="Get the AI Readiness Assessment for your business."
        lead="A 20-minute operations call. We look at where your team's hours go, what's written down, and whether AI is the right fix yet."
      />
    </PageTransition>
  );
}
