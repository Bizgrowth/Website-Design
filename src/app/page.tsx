import Link from "next/link";
import { UpdateCard } from "@/components/cards";
import { ConnectedStack } from "@/components/ConnectedStack";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { AutonomyScroller } from "@/components/interactive/AutonomyScroller";
import { BlueprintRail } from "@/components/interactive/BlueprintRail";
import { HeroWorkflow } from "@/components/interactive/HeroWorkflow";
import { ProcessTimeline } from "@/components/interactive/ProcessTimeline";
import { Reveal, Stagger } from "@/components/interactive/Reveal";
import { SpotlightCard } from "@/components/interactive/SpotlightCard";
import { OfferLadder } from "@/components/OfferLadder";
import { Portrait } from "@/components/Portrait";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getBlueprints, getUpdates } from "@/lib/content";
import { phases } from "@/lib/phases";
import { site } from "@/lib/site";
import { pillars } from "@/lib/taxonomy";
import { trackRecord } from "@/lib/track-record";

export default function Home() {
  const updates = getUpdates().slice(0, 3);
  const blueprints = getBlueprints().map(({ slug, title, summary, industry, stack }) => ({
    slug,
    title,
    summary,
    industry,
    stack,
  }));

  return (
    <>
      {/* 1 · Hero with a live workflow visual */}
      <section className="hero-backdrop bg-navy text-white">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              The SMB hub for AI operations
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl xl:text-[3.4rem]">
              AI that runs your operations — <span className="text-hero-accent">measured, controlled, and owned.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Blueprints, daily updates, and hands-on help with AI automation, integration, and implementation — from an
              operator who scaled a company from $0 to $265M.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.bookingUrl} variant="inverse">Book an Ops Call</ButtonLink>
              <Link
                href="/blueprints"
                className="inline-flex items-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                See the blueprints
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <HeroWorkflow />
          </Reveal>
        </Container>
      </section>

      {/* 3 · Operator proof */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <Portrait size={280} />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>The operator behind the hub</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">AI is new. Running operations isn&apos;t.</h2>
              <p className="mt-3 max-w-2xl text-muted">{site.intro}</p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {trackRecord.headline.map((h) => (
                <div key={h.label} className="h-full rounded-2xl border border-line bg-surface p-5">
                  <p className="text-2xl font-bold tabular-nums">{h.value}</p>
                  <p className="mt-1 text-xs text-muted">{h.label}</p>
                </div>
              ))}
            </Stagger>
            <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-accent">Meet Daniel →</Link>
          </div>
        </Container>
      </section>

      {/* 4 · Hub pillars */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The AI Hub"
              title="Everything an SMB needs to put AI to work"
              lead="Three pillars. Each one collects blueprints, guides, and the latest updates."
            />
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <SpotlightCard key={p.slug} href={`/hub/${p.slug}`} className="bg-bg">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm font-medium">{p.question}</p>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.topics.map((t) => (
                    <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{t}</li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </Stagger>
        </Container>
      </section>

      <ConnectedStack />

      {/* 5 · Earned Autonomy, scroll-driven */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Earned Autonomy method"
              title="AI starts supervised. It earns autonomy with data."
              lead="Most AI projects stall because nobody owns them, nobody measured the before, and nobody planned for mistakes. Scroll through how every workflow moves from Red to Green."
            />
          </Reveal>
          <AutonomyScroller />
        </Container>
      </section>

      {/* 6 · Blueprint rail */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Blueprints"
              title="See the exact systems, not just the promises"
              lead="Working reference builds with the architecture, stack, controls, and what each one measures. Clearly labeled — no invented client results."
              action={<ButtonLink href="/blueprints" variant="secondary">All blueprints</ButtonLink>}
            />
          </Reveal>
          <BlueprintRail items={blueprints} />
        </Container>
      </section>

      {/* 7 · Install process */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How an install runs</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Five phases. Governance before the build.</h2>
            <p className="mt-3 text-muted">
              Owners, thresholds, and a failure plan are set before anything is automated — so AI lands on clean
              processes, not broken ones.
            </p>
            <div className="mt-6">
              <ButtonLink href="/method" variant="secondary">The full method</ButtonLink>
            </div>
          </Reveal>
          <ProcessTimeline phases={phases} />
        </Container>
      </section>

      {/* 8 · SMB AI Daily */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="SMB AI Daily"
              title="What changed in AI operations — and what it means for you"
              lead="Short, sourced briefings written for owners and operators, not engineers."
              action={<ButtonLink href="/updates" variant="secondary">All updates</ButtonLink>}
            />
          </Reveal>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {updates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 9 · Offer ladder */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Work with Daniel"
              title="Diagnose. Build with controls. Oversee."
              lead="Every engagement follows the same three steps. Start with the Diagnostic — most clients know within two weeks exactly where AI pays off."
              action={<ButtonLink href="/services" variant="secondary">All services</ButtonLink>}
            />
          </Reveal>
          <OfferLadder />
        </Container>
      </section>

      {/* 10 · FAQ */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Straight answers</h2>
          </Reveal>
          <Faq />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
