import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Services for SMBs: Diagnostic, Foundations, Build, Oversight | AI Ops Expert" },
  description:
    "Four steps to AI that sticks: find what to automate, document and clean up the foundations, build with controls, and keep it accurate. Fixed-fee projects, quoted after a free 30-minute call.",
};

const steps = [
  {
    name: "AI Ops Diagnostic",
    cadence: "2 weeks · fixed fee",
    intro: "Find out where AI pays off and what has to be fixed first.",
    points: [
      "Inventory of your workflows, with today's time per task, cost, and error rate",
      "Readiness scorecard across the five foundations",
      "Check for AI tools your team already uses on their own",
      "Gap list: what must be documented, cleaned, or connected for each workflow",
      "90-day roadmap ranked by impact, risk, and effort",
    ],
    walkAway: "a written plan you can run with me, with someone else, or on your own.",
  },
  {
    name: "Foundations Sprint",
    cadence: "1–3 weeks · fixed fee",
    intro: "Get your operation ready for AI. This is the work most providers skip.",
    points: [
      "Workflow maps for your top three workflows, with every step, handoff, and exception",
      "Written SOPs, built with the people who do the work",
      "Data cleanup for the records those workflows use: duplicates merged, fields standardized, a single source named for each record",
      "An owner named for each workflow",
      "Before numbers recorded so results can be measured later",
    ],
    walkAway:
      "documentation your team can train from tomorrow, plus processes ready for automation. Just the act of centralizing your data immediately improves decision-making and efficiency.",
    bestFor:
      "businesses where the process lives in one or two people's heads, or where the same customer shows up three ways in three systems.",
    href: "/services/foundations",
  },
  {
    name: "Governed Build",
    cadence: "3–6 weeks per workflow · fixed fee",
    intro: "One workflow automated on the tools you already pay for.",
    points: [
      "Automation and AI built in Make or n8n, connected to your inbox, CRM, accounting, or documents",
      "Tested against a set of your real past work before it goes live",
      "Approval rules: what AI can do alone, what needs a person, and what it never touches",
      "A plan for when it gets something wrong",
      "Runs alongside your current process until it meets the agreed quality bar",
      "Handoff training and a plain-English runbook",
    ],
    walkAway: "a working, measured workflow your team can maintain.",
  },
  {
    name: "AI Ops Oversight",
    cadence: "Monthly retainer",
    intro: "Keep it accurate, keep costs in line, and let it take on more as it earns it.",
    points: [
      "Monthly review of accuracy, exceptions, and cost",
      "Re-testing after any change to tools, prompts, or your process",
      "Moving proven tasks from \"you approve\" to \"AI runs, you spot-check\"",
      "One new workflow each quarter",
    ],
    walkAway: "AI that keeps working after launch, and a monthly report showing it.",
  },
];

const whereToStart = [
  ["\"We know we should use AI but don't know where.\"", "Diagnostic"],
  ["\"Only Maria knows how billing really works.\"", "Diagnostic, then Foundations"],
  ["\"Our CRM is a mess and nobody trusts the reports.\"", "Foundations"],
  ["\"Our processes are documented and we know what to automate.\"", "Governed Build"],
  ["\"We built something and it's drifting or costing too much.\"", "Oversight"],
];

const built = [
  {
    href: "/services/ai-readiness",
    name: "AI Readiness & Roadmap",
    body: "Know where AI pays off before you spend on tools. Delivered as the Diagnostic.",
  },
  {
    href: "/services/foundations",
    name: "Process Documentation & Data Cleanup",
    body: "Written SOPs, mapped workflows, and clean records your team and your AI can rely on. Delivered as the Foundations Sprint.",
  },
  {
    href: "/services/workflow-automation",
    name: "Workflow Automation & Tool Integration",
    body: "Your inbox, CRM, accounting, and documents connected, with AI working inside them. Built with retries and error handling so nothing runs twice or disappears.",
  },
  {
    href: "/services/ai-agents",
    name: "AI Agents",
    body: "Agents that handle triage, intake, and answering questions from your SOPs. They start supervised and take on more as accuracy holds.",
  },
  {
    href: "/services/dashboards",
    name: "Ops & AI Performance Dashboards",
    body: "Your core numbers on one screen, plus a weekly plain-English summary of what moved and what to do next.",
  },
  {
    href: "/services/ai-governance",
    name: "AI Governance & Oversight",
    body: "Owners, approval rules, a usage policy for your team, and a monthly review.",
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Services"
        title="From “where do we start?” to AI your team actually uses."
        lead="Every engagement follows the same four steps. We find what's worth automating, fix the foundations it depends on, build it with controls, and keep it accurate. You can stop after any step and keep everything we've built."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={site.bookingUrl}>Book a 30-minute ops call</ButtonLink>
          <Link href="/assessment" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">
            Not sure you&apos;re ready? Take the 2-minute readiness check
          </Link>
        </div>
      </PageHeader>

      <Container className="py-14">
        <SectionHeading
          title="Four steps, always in this order"
          lead="Skipping a step is how AI projects stall. Each step produces something you own, whether or not you continue."
        />
        <p className="-mt-2 mb-8 max-w-2xl text-sm font-medium">
          Every step is a fixed fee, quoted in writing after a 30-minute call and sized to your business. You know the full cost before anything starts.
        </p>
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">Step {i + 1} · {s.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{s.cadence}</p>
              <p className="mt-3 font-medium">{s.intro}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-ok">✓</span><span>{p}</span></li>
                ))}
              </ul>
              <p className="mt-4 text-sm"><em>You walk away with:</em> {s.walkAway}</p>
              {s.bestFor && <p className="mt-2 text-sm"><em>Best for:</em> {s.bestFor}</p>}
              {s.href && (
                <Link href={s.href} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent">
                  More on the Foundations Sprint →
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading title="Which step fits where you are today?" />
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-faint">
                  <th className="px-4 py-3 font-semibold sm:px-6">If this sounds like you</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Start with</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {whereToStart.map(([sounds, start]) => (
                  <tr key={sounds}>
                    <td className="px-4 py-3 sm:px-6">{sounds}</td>
                    <td className="px-4 py-3 font-medium sm:px-6">{start}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            Not sure? The <Link href="/assessment" className="text-accent hover:underline">2-minute readiness check</Link> will tell you.
          </p>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading
          title="What gets built inside those steps"
          lead="Six service areas, each with its own page. Every one follows the four steps above."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {built.map((b) => (
            <Card key={b.href} href={b.href}>
              <h3 className="text-xl font-medium">{b.name}</h3>
              <p className="mt-2 text-sm text-muted">{b.body}</p>
            </Card>
          ))}
        </div>
      </Container>

      <CtaBand
        lead="A 30-minute operations call. We look at where your team's hours go, what's written down, and which step makes sense. If AI isn't the right fix yet, I'll tell you."
        secondary={{ href: "/assessment", label: "Or take the 2-minute readiness check first" }}
      />
    </PageTransition>
  );
}
