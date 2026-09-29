import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { UpdateCard } from "@/components/cards";
import { ConnectedStack } from "@/components/ConnectedStack";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { AutonomyScroller } from "@/components/interactive/AutonomyScroller";
import { BlueprintRail } from "@/components/interactive/BlueprintRail";
import { FlipCard, HeroParallax, Tilt, WordCascade, ZoomIn } from "@/components/interactive/Effects";
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
    <PageTransition>
      {/* 1 · Hero: three-layer parallax, cascading headline, tilting live visual */}
      <section className="text-white">
        <Container>
          <HeroParallax
            className="py-12 sm:py-20"
            copy={
              <>
                <Reveal>
                  <Eyebrow>The SMB hub for AI operations</Eyebrow>
                </Reveal>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-[3.4rem]">
                  <WordCascade text="AI that runs your operations —" delay={0.1} />{" "}
                  <WordCascade text="measured, controlled, and owned." delay={0.45} className="text-flare-gradient" />
                </h1>
                <Reveal delay={0.7}>
                  <p className="mt-6 max-w-xl text-lg text-white/70">
                    Blueprints, daily updates, and hands-on help with AI automation, integration, and implementation —
                    from an operator who scaled a company from $0 to $265M.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={site.bookingUrl}>Book an Ops Call</ButtonLink>
                    <ButtonLink href="/blueprints" variant="secondary">See the blueprints</ButtonLink>
                  </div>
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

      {/* 2 · Operator proof: zoom-in portrait, flip cards with the story behind each number */}
      <section className="py-12 sm:py-20">
        <Container className="grid items-center gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] lg:gap-10">
          <ZoomIn className="w-36 sm:w-48 md:w-full">
            <Portrait size={280} className="h-auto w-full" />
          </ZoomIn>
          <div>
            <Reveal>
              <Eyebrow>The operator behind the hub</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">AI is new. Running operations isn&apos;t.</h2>
              <p className="mt-3 max-w-2xl text-muted">{site.intro}</p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {trackRecord.headline.map((h) => (
                <FlipCard
                  key={h.label}
                  className="h-44"
                  front={
                    <>
                      <p className="text-2xl font-bold tabular-nums">{h.value}</p>
                      <div>
                        <p className="text-xs text-muted">{h.label}</p>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-hero-accent">The story ↻</p>
                      </div>
                    </>
                  }
                  back={<p className="text-xs leading-relaxed text-ink">{h.story}</p>}
                />
              ))}
            </Stagger>
            <Link href="/about" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-accent">Meet Daniel →</Link>
          </div>
        </Container>
      </section>

      {/* 4 · Hub pillars */}
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
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
      <section className="py-12 sm:py-24">
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
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
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
      <section className="py-12 sm:py-24">
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
      <section className="border-y border-line bg-white/[0.015] py-12 sm:py-20">
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
      <section className="py-12 sm:py-24">
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
      <section className="border-t border-line bg-white/[0.015] py-12 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Straight answers</h2>
          </Reveal>
          <Faq />
        </Container>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
