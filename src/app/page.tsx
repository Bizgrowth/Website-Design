import Link from "next/link";
import { BlueprintCard, UpdateCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { EarnedAutonomy } from "@/components/EarnedAutonomy";
import { ButtonLink, Card, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { getBlueprints, getUpdates } from "@/lib/content";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";
import { trackRecord } from "@/lib/track-record";

export default function Home() {
  const updates = getUpdates().slice(0, 3);
  const blueprints = getBlueprints().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5b9bff]">
              The SMB hub for AI operations
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              AI that runs your operations — measured, controlled, and owned.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Blueprints, daily updates, and hands-on help with AI automation, integration, and
              implementation — from an operator who scaled a company from $0 to $265M.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/hub" variant="inverse">
                Explore the AI Hub
              </ButtonLink>
              <Link
                href={site.bookingUrl}
                className="inline-flex items-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Book an Ops Call
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              The operator behind the hub
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {trackRecord.headline.map((item) => (
                <div key={item.label}>
                  <dt className="text-2xl font-bold tabular-nums">{item.value}</dt>
                  <dd className="mt-1 text-xs text-white/60">{item.label}</dd>
                </div>
              ))}
            </dl>
            <Link href="/track-record" className="mt-5 inline-block text-sm font-semibold text-[#5b9bff]">
              See the full track record →
            </Link>
          </div>
        </Container>
      </section>

      {/* Hub pillars */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The AI Hub"
            title="Everything an SMB needs to put AI to work"
            lead="Three pillars. Each one has blueprints, guides, and the latest updates."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.slug} href={`/hub/${p.slug}`}>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm font-medium text-ink">{p.question}</p>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.topics.map((t) => (
                    <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SMB AI Daily */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="SMB AI Daily"
            title="What changed in AI operations — and what it means for you"
            lead="Short, sourced briefings written for owners and operators, not engineers."
            action={<ButtonLink href="/updates" variant="secondary">All updates</ButtonLink>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {updates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        </Container>
      </section>

      {/* Blueprints */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Blueprints"
            title="See the exact systems, not just the promises"
            lead="Working reference builds with the architecture, stack, controls, and what each one measures. Clearly labeled — no invented client results."
            action={<ButtonLink href="/blueprints" variant="secondary">All blueprints</ButtonLink>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {blueprints.map((b) => (
              <BlueprintCard key={b.slug} blueprint={b} />
            ))}
          </div>
        </Container>
      </section>

      {/* Method */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The Earned Autonomy method"
            title="AI starts supervised. It earns autonomy with data."
            lead="Most AI projects stall because nobody owns them, nobody measured the before, and nobody planned for mistakes. Every workflow we build moves through three stages."
            action={<ButtonLink href="/method" variant="secondary">How it works</ButtonLink>}
          />
          <EarnedAutonomy />
        </Container>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Work with Daniel" title="Five ways to get AI working in your operation" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.slug} href={`/services/${s.slug}`}>
                <h3 className="font-bold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.outcome}</p>
              </Card>
            ))}
            <Card href="/fractional-coo" className="border-dashed">
              <Eyebrow>Premium</Eyebrow>
              <h3 className="mt-2 font-bold">Fractional COO</h3>
              <p className="mt-2 text-sm text-muted">
                Senior operations leadership, part-time, with AI built into the plan from day one.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
