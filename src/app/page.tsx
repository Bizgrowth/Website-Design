import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { ClientLogos } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { AutonomyScroller } from "@/components/interactive/AutonomyScroller";
import { BlueprintRail } from "@/components/interactive/BlueprintRail";
import { HeroParallax, Tilt, WordCascade, ZoomIn } from "@/components/interactive/Effects";
import { HeroWorkflow } from "@/components/interactive/HeroWorkflow";
import { ProcessTimeline } from "@/components/interactive/ProcessTimeline";
import { Reveal, Stagger } from "@/components/interactive/Reveal";
import { OfferLadder } from "@/components/OfferLadder";
import { Portrait } from "@/components/Portrait";
import { ButtonLink, Card, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getBlueprints } from "@/lib/content";
import { phases } from "@/lib/phases";
import { site } from "@/lib/site";

const foundations = [
  {
    title: "Ownership",
    body: "One named person owns each workflow and its results. Without an owner, nobody fixes the AI when it drifts, and nobody notices that it has.",
  },
  {
    title: "Documented workflows",
    body: "Every step, handoff, and exception is written down. AI can only follow a path someone has drawn.",
  },
  {
    title: "Written SOPs",
    body: "The way your best person does the job, on paper. This becomes the instruction set the AI works from and the standard it gets checked against.",
  },
  {
    title: "Clean, connected data",
    body: "One version of each customer, invoice, and job, in systems that can talk to each other. Duplicate and outdated records turn into wrong answers sent with confidence.",
  },
  {
    title: "Systems that fit",
    body: "Your CRM, accounting, and inbox set up the way your team really works. AI layered on a tool nobody uses well becomes one more tool nobody uses.",
  },
];

const stats = [
  {
    value: "$0 → $265M",
    text: "in revenue in under 5 years. As SVP of Operations, I built the operating platform for Align Networks through its acquisition.",
  },
  {
    value: "12X EBITDA exit",
    text: "to General Atlantic. As acting President of Techhealth through my consulting firm, I designed and ran the exit strategy.",
  },
  {
    value: "$1B real estate portfolio",
    text: "operated as COO of The Klotz Group. Occupancy rose from 94% to 98%.",
  },
  {
    value: "$15M → $75M",
    text: "in revenue in under a year at One Call Care Management, from a clinical performance platform I helped build.",
  },
];

const explore = [
  {
    href: "/builds",
    title: "Build Library",
    body: "Eight interactive tools you can click through on sample data.",
    link: "Open the Build Library",
  },
  {
    href: "/updates",
    title: "SMB AI Daily",
    body: "Short, sourced updates on what changed in AI and what it means for your business.",
    link: "Read today's update",
  },
  {
    href: "/hub",
    title: "AI Hub",
    body: "Guides on automation, integration, and implementation, organized by the problem you're solving.",
    link: "Browse the Hub",
  },
];

export default function Home() {
  const blueprints = getBlueprints().map(({ slug, title, summary, industry, cardLine }) => ({
    slug,
    title,
    summary,
    industry,
    cardLine,
  }));

  return (
    <PageTransition>
      {/* 1 · Hero: three-layer parallax, cascading headline, tilting live visual */}
      <section className="text-white">
        <Container>
          <HeroParallax
            className="py-12 sm:py-20"
            copy={
              <>
                <Reveal>
                  <Eyebrow>If it isn&apos;t documented, it can&apos;t be automated.</Eyebrow>
                </Reveal>
                <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl xl:text-[4rem]">
                  <WordCascade text="Fix the operation." delay={0.1} />{" "}
                  <WordCascade text="Then automate it." delay={0.45} className="text-flare-gradient" />
                </h1>
                <Reveal delay={0.7}>
                  <p className="mt-6 max-w-xl text-lg text-white/70">
                    Most AI projects stall before anything gets built. The process lives in one person&apos;s head, the data sits
                    in five systems, and nobody owns the result. I document your workflows, write the SOPs, and clean up the
                    data first. Then I automate what&apos;s ready, so your team trusts it and actually uses it.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href="/assessment">Take the 2-minute readiness check</ButtonLink>
                    <ButtonLink href={site.bookingUrl} variant="secondary">Book a 20-minute ops call</ButtonLink>
                  </div>
                  <p className="mt-6 max-w-xl text-sm text-white/60">
                    Twenty years as a COO and operating executive, including helping scale a healthcare network from $0 to $265M.
                  </p>
                </Reveal>
              </>
            }
            visual={
              <ZoomIn>
                <Tilt>
                  <HeroWorkflow />
                </Tilt>
              </ZoomIn>
            }
          />
        </Container>
      </section>

      {/* 2 · Before AI: the five foundations */}
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Before AI"
              title="AI speeds up whatever you give it. Give it something worth speeding up."
              lead="Clear processes get faster with AI. Unclear ones get louder. Every engagement starts by checking five foundations, because these decide whether AI pays off or gets quietly switched off three months later."
            />
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foundations.map((f, i) => (
              <div key={f.title} className="rounded-2xl border border-line bg-surface p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </div>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="font-medium">See how your operation scores</p>
            <ButtonLink href="/assessment" variant="secondary">Take the 2-minute readiness check</ButtonLink>
          </div>
        </Container>
      </section>

      {/* 3 · Earned Autonomy, scroll-driven */}
      <section className="py-12 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Earned Autonomy method"
              title="AI starts supervised. It earns more responsibility with results."
              lead="Your team stays in control from day one. AI takes on more work only after it proves it can handle it, one task at a time."
            />
          </Reveal>
          <AutonomyScroller />
          <Link href="/method" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent">How the method works →</Link>
        </Container>
      </section>

      {/* 4 · How an install runs */}
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How an install runs</Eyebrow>
            <h2 className="mt-2 text-2xl font-medium sm:text-3xl">Five phases. Foundations before the build.</h2>
            <p className="mt-3 text-muted">
              Owners, documentation, and clean data are in place before anything gets automated. That&apos;s why the automation
              keeps working after I hand it over.
            </p>
            <div className="mt-6">
              <ButtonLink href="/method" variant="secondary">The full method →</ButtonLink>
            </div>
          </Reveal>
          <ProcessTimeline phases={phases} />
        </Container>
      </section>

      {/* 5 · Services */}
      <section className="py-12 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Work with Daniel"
              title="Diagnose. Fix the foundations. Build. Oversee."
              lead="Every engagement follows the same order. Most owners know within two weeks which workflows to fix first and which are ready to automate."
              action={<ButtonLink href="/services" variant="secondary">All services →</ButtonLink>}
            />
            <p className="-mt-2 mb-8 max-w-2xl text-sm font-medium">
              Every project is a fixed fee, quoted in writing after a 20-minute call. You know the full cost before anything starts.
            </p>
          </Reveal>
          <OfferLadder />
        </Container>
      </section>

      {/* 6 · Proof */}
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] lg:gap-10">
            <ZoomIn className="w-36 sm:w-48 md:w-full">
              <Portrait size={280} className="h-auto w-full" />
            </ZoomIn>
            <div>
              <Reveal>
                <Eyebrow>The operator behind the work</Eyebrow>
                <h2 className="mt-4 text-3xl font-medium sm:text-4xl">AI is new. Running operations isn&apos;t.</h2>
                <p className="mt-3 max-w-2xl text-muted">
                  I&apos;ve spent twenty years building and running operating companies in healthcare, real estate, and logistics.
                  The same discipline goes into every AI install: clear owners, written processes, measured results, and
                  controls that keep it from breaking.
                </p>
              </Reveal>
              <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
                {stats.map((s) => (
                  <div key={s.value} className="rounded-xl border border-line bg-surface p-5">
                    <p className="text-sm text-muted">
                      <span className="block text-2xl font-bold tabular-nums text-ink">{s.value}</span>
                      {s.text}
                    </p>
                  </div>
                ))}
              </Stagger>
              <div className="mt-3 flex flex-wrap gap-x-6">
                <Link href="/about" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">Meet Daniel →</Link>
                <Link href="/track-record" className="inline-flex min-h-11 items-center text-sm font-semibold text-accent">Full track record →</Link>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Reveal>
              <ClientLogos heading="Companies where I've built and automated operations" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 7 · Blueprints */}
      <section className="py-12 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Blueprints"
              title="See exactly what gets built before you buy it."
              lead="Working reference builds that show the workflow, the tools, the controls, and what each one measures. Each is labeled as a reference build. Client results appear here only with real before-and-after numbers and the client's permission."
              action={<ButtonLink href="/blueprints" variant="secondary">All blueprints →</ButtonLink>}
            />
          </Reveal>
          <BlueprintRail items={blueprints} />
        </Container>
      </section>

      {/* 8 · Explore */}
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="mb-8 text-3xl font-medium sm:text-4xl">Keep learning</h2>
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {explore.map((e) => (
              <Card key={e.href} href={e.href} className="h-full">
                <h3 className="text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted">{e.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{e.link} →</span>
              </Card>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 9 · FAQ */}
      <section className="py-12 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="text-2xl font-medium sm:text-3xl">Straight answers</h2>
          </Reveal>
          <Faq />
        </Container>
      </section>

      {/* 10 · Final CTA */}
      <CtaBand secondary={{ href: "/assessment", label: "Or take the 2-minute readiness check first" }} />
    </PageTransition>
  );
}
