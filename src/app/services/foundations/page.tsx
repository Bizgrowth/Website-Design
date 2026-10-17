import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Container, PageHeader, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Data Cleanup & SOP Documentation for Small Businesses | AI Ops Expert" },
  description:
    "Clean, centralized data and written SOPs in 1–3 weeks. Dedupe your CRM, set data entry rules, and document your workflows so your team works better and automation works later.",
};

const pillars = [
  {
    title: "Pillar 1 · Data Cleanup & Standardization",
    intro:
      "I run a thorough audit of the software your operation runs on, including your CRM, project tools, and databases (such as HubSpot, GoHighLevel, Airtable, or ClickUp), to establish a single source of truth.",
    items: [
      ["Deduplication and consolidation.", "I find and merge duplicate records, so each customer has one complete profile instead of three conflicting ones."],
      ["Structure cleanup.", "I reorganize fields and fix how contacts, companies, and deals link together, so information flows correctly across your tools."],
      ["Data entry rules.", "I set clear rules for required fields, formats, and naming, and turn on validation where your tools allow it, so your data stays clean long after the sprint."],
    ],
  },
  {
    title: "Pillar 2 · Process Documentation & SOPs",
    intro:
      "I sit with the people who do the work and turn what's in their heads into documents anyone on your team can follow.",
    items: [
      ["Workflow maps.", "Every step, handoff, decision, and exception, laid out visually with who does what and in which tool."],
      ["Written SOPs.", "Step-by-step procedures your team can train from on day one, reviewed by the person who does the job."],
      ["Clear ownership.", "One named owner for each workflow, so someone is responsible for keeping it running."],
    ],
  },
];

const youGet = [
  "A workflow map for each process",
  "A written SOP for each process",
  "Cleaned, deduplicated data in your existing tools, with a log of every change",
  "A data dictionary naming the source of truth for each key field",
  "Written data entry rules your team can follow",
  "Before numbers: time per task, weekly volume, and error rate",
  "An automation readiness score with your top three opportunities ranked",
];

const howItWorks = [
  ["Kickoff.", "We pick the workflows and name an owner for each."],
  ["Walkthroughs.", "I record your team doing the work and collect the files they use."],
  ["Audit and plan.", "I audit the data and you approve the cleanup plan before anything changes."],
  ["Clean and document.", "I clean the data, map the workflows, and write the SOPs."],
  ["Review and hand off.", "Your team reviews everything, and I walk you through the finished package."],
];

const sizes = [
  ["Workflows", "1", "Up to 3"],
  ["Length", "1 week", "3 weeks"],
  ["Systems cleaned", "1", "Up to 2"],
  ["Price", "Fixed fee, quoted after your call", "Fixed fee, quoted after your call"],
];

const faqs = [
  ["Our processes aren't written down at all. Is that a problem?", "That's where most clients start. The sprint is built for it."],
  ["Will you change how we work?", "I document how the work happens today and note quick fixes. A full redesign is a separate project."],
  ["Is our data safe?", "I work from read-only access or exports where possible, confirm a backup exists before changing anything, and get your written approval before merging records."],
];

export default function FoundationsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Services · Foundations"
        title="Get your operation ready for AI."
        lead="Just the act of centralizing your data immediately improves decision-making and efficiency. The Foundations Sprint cleans up your data and writes down how your work gets done, so your team works better now and automation works later."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={site.bookingUrl}>Book a 30-minute ops call</ButtonLink>
          <Link href="/assessment" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">
            Or take the 2-minute readiness check
          </Link>
        </div>
      </PageHeader>

      <Container className="py-14">
        <SectionHeading title="What I do: two pillars, one sprint" />
        <div className="grid gap-4 lg:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted">{p.intro}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {p.items.map(([lead, body]) => (
                  <li key={lead} className="flex gap-3">
                    <span className="text-ok">✓</span>
                    <span><strong>{lead}</strong> <span className="text-muted">{body}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading title="Everything you need to run it, train on it, and automate it" />
          <ul className="grid gap-3 md:grid-cols-2">
            {youGet.map((y) => (
              <li key={y} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm">
                <span className="text-ok">✓</span>
                <span>{y}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium">You own every document, whether or not you automate.</p>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading title="How it works" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {howItWorks.map(([name, body], i) => (
            <li key={name} className="rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
              <p className="mt-3 font-semibold">{name}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-y border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading title="Two sizes" />
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-faint">
                  <th className="px-4 py-3 sm:px-6"><span className="sr-only">Detail</span></th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Starter</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sizes.map(([label, starter, standard]) => (
                  <tr key={label}>
                    <th scope="row" className="px-4 py-3 font-medium sm:px-6">{label}</th>
                    <td className="px-4 py-3 text-muted sm:px-6">{starter}</td>
                    <td className="px-4 py-3 text-muted sm:px-6">{standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-10 text-xl font-semibold">What&apos;s not included</h3>
          <p className="mt-2 max-w-2xl text-muted">
            Building automations is the next step (Governed Build). Moving to new software and ongoing upkeep are quoted separately.
          </p>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeading title="FAQ" />
        <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {faqs.map(([q, a]) => (
            <details key={q} className="faq group px-5 py-2 sm:px-6">
              <summary className="flex min-h-14 items-center justify-between gap-4 py-2 font-semibold sm:gap-6">
                {q}
                <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-accent">+</span>
              </summary>
              <p className="mb-4 mt-1 max-w-3xl text-muted">{a}</p>
            </details>
          ))}
        </div>
      </Container>

      <CtaBand
        title="Clean data and written processes, in as little as a week."
        lead="A 30-minute operations call. We'll look at which process is costing your team the most time and what it would take to get it ready."
      />
    </PageTransition>
  );
}
