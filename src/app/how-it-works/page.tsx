import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Container, PageHeader, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "How an AI Engagement Works: Diagnose, Fix, Build, Oversee | AI Ops Expert" },
  description:
    "See each step of an AI engagement: what happens, what you keep, and the decision that's yours. Fixed fee. Nothing goes live without your sign-off.",
};

// Plain-English version of the internal engagement SOP. Keep prices, internal documents and gate names out of this page.
const steps = [
  {
    name: "Talk",
    length: "30 minutes · free",
    phase: null,
    happens: [
      "We look at where your team's hours go and what's written down.",
      "We decide together whether AI is the right fix yet.",
    ],
    keep: "An honest answer. If AI isn't the right fix yet, I'll tell you what to do first.",
    decision: "Whether to start with a Diagnostic.",
  },
  {
    name: "Diagnose",
    length: "2 weeks · fixed fee",
    phase: "Align",
    happens: [
      "We agree on your goals and on what the AI must never touch.",
      "I check which AI tools your team already uses on their own.",
      "I score your five foundations: ownership, documented workflows, written SOPs, clean data, and systems that fit.",
      "I record today's time, cost, and error rate for your top workflows.",
      "I design the solution on tools you can run yourself and turn it into a 90-day plan.",
    ],
    keep: "A signed confidentiality agreement, a readiness scorecard, a gap list, a 90-day roadmap, and a written scope with a fixed fee.",
    decision: "Go or no-go, and which step comes next.",
  },
  {
    name: "Fix the foundations",
    length: "1–3 weeks · fixed fee · only if needed",
    phase: "Document",
    happens: [
      "We pick the workflows and name an owner for each.",
      "I record your team doing the work and collect the files they use.",
      "I audit the data, and you approve the cleanup plan before anything changes.",
      "I clean the data, map the workflows, and write the SOPs.",
      "Your team reviews everything, and I walk you through the finished package.",
    ],
    keep: "Workflow maps, written SOPs, cleaned data with a log of every change, a data dictionary, before numbers, and a readiness score.",
    decision: "Is the operation ready to automate? We score the foundations again to find out.",
  },
  {
    name: "Build with controls",
    length: "3–6 weeks per workflow · fixed fee",
    phase: "Govern and Deploy",
    happens: [
      "You approve the design before anything is built.",
      "I build it switched off, on tools you already pay for.",
      "It is tested against a set of your real past work.",
      "It runs alongside your current process until it meets the agreed quality bar.",
      "Before go-live we confirm who owns it, what the AI can do alone, how to pause it, and how we'll measure it.",
    ],
    keep: "One plain-English Build Summary, a runbook your team can follow, the test results, and a governance checklist.",
    decision: "Your sign-off. Nothing is switched on until you give it.",
  },
  {
    name: "Keep it accurate",
    length: "Monthly retainer",
    phase: "Optimize",
    happens: [
      "Each month we review accuracy, exceptions, and cost against your before numbers.",
      "Everything is re-tested after any change to your tools, prompts, or process.",
      "A sample of the work that ran on its own gets a human check.",
      "A task takes on more only when it earns it, and drops back if it slips.",
      "One new workflow each quarter.",
    ],
    keep: "A monthly report showing how the AI is doing.",
    decision: "Which tasks have earned more responsibility.",
  },
];

const promises = [
  {
    title: "You stay in control",
    body: "Everything is built switched off, and nothing goes live without your sign-off.",
  },
  {
    title: "You own what we build",
    body: "You own every document, whether or not you automate. You can stop after any step and keep everything.",
  },
  {
    title: "Your data stays safe",
    body: "I work from read-only access or exports where possible, confirm a backup exists before changing anything, and get your written approval before merging records.",
  },
  {
    title: "No surprises on cost",
    body: "Every project is a fixed fee, quoted in writing after a 30-minute call. You know the full cost before anything starts.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="How an engagement works"
        title="The same path every time, and every step ends with your decision."
        lead="You always know what happens next, what you keep, and what's yours to decide. Nothing goes live without your sign-off."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={site.bookingUrl}>Book a 30-minute ops call</ButtonLink>
          <Link href="/assessment" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">
            Or take the 2-minute readiness check
          </Link>
        </div>
      </PageHeader>

      <Container className="pt-14">
        <JourneyMap />
        <p className="mt-6 max-w-2xl text-sm text-muted">
          If your foundations are already strong, we skip straight from Diagnose to Build. If they aren&apos;t, fixing them first is
          what makes the automation keep working.
        </p>
      </Container>

      <Container className="py-14">
        <SectionHeading title="Step by step" lead="What happens, what you keep, and the decision that's yours at each step." />
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.name} className="grid gap-6 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[220px_1fr_1fr] md:p-8">
              <div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{s.length}</p>
                {s.phase && <p className="mt-2 text-xs text-faint">Method phase: {s.phase}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-faint">What happens</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {s.happens.map((h) => (
                    <li key={h} className="flex gap-2"><span className="text-ok">✓</span><span>{h}</span></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">You keep</p>
                  <p className="mt-2">{s.keep}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">Your decision</p>
                  <p className="mt-2 font-medium">{s.decision}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading title="What stays true at every step" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Want the full picture of how AI earns more responsibility over time?{" "}
            <Link href="/method" className="font-semibold text-accent">See the Earned Autonomy method →</Link>
          </p>
        </Container>
      </section>

      <CtaBand secondary={{ href: "/assessment", label: "Or take the 2-minute readiness check first" }} />
    </PageTransition>
  );
}

// A simple picture of the path: five steps, with the foundations step shown as optional.
function JourneyMap() {
  const nodes = [
    { name: "Talk", sub: "30 min · free" },
    { name: "Diagnose", sub: "2 weeks" },
    { name: "Fix the foundations", sub: "1–3 weeks · only if needed", optional: true },
    { name: "Build with controls", sub: "3–6 weeks per workflow" },
    { name: "Keep it accurate", sub: "Monthly" },
  ];
  return (
    <ol aria-label="The path of an engagement" className="grid gap-3 md:grid-cols-5">
      {nodes.map((n, i) => (
        <li
          key={n.name}
          className={`relative rounded-2xl border p-5 ${
            n.optional ? "border-dashed border-accent/60 bg-accent-soft" : "border-line bg-surface"
          }`}
        >
          <p className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2 font-semibold leading-snug">{n.name}</p>
          <p className="mt-1 text-xs text-muted">{n.sub}</p>
          {i < nodes.length - 1 && (
            <span aria-hidden className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-accent md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
