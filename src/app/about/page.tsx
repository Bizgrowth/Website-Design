import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { ContactDetails } from "@/components/ContactDetails";
import { CtaBand } from "@/components/CtaBand";
import { ZoomIn } from "@/components/interactive/Effects";
import { Reveal } from "@/components/interactive/Reveal";
import { Portrait } from "@/components/Portrait";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";
import { trackRecord } from "@/lib/track-record";

export const metadata: Metadata = {
  title: "About Daniel Schley",
  description: "Operator, former COO, and founder of AI Operations Expert.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="border-b border-line bg-white/[0.015]">
        <Container className="grid items-center gap-8 py-12 sm:py-14 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr] lg:gap-10">
          <ZoomIn className="w-44 sm:w-60 md:w-full">
            <Portrait size={320} className="h-auto w-full" />
          </ZoomIn>
          <Reveal delay={0.1}>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{site.owner}</h1>
            <p className="mt-2 text-lg font-medium text-muted">Founder, {site.name} · Former COO</p>
            <p className="mt-5 max-w-2xl text-lg">{site.intro}</p>
            <ContactDetails className="mt-6" />
          </Reveal>
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <div className="prose">
          <p>
            Managed care taught me that the right answer is a system — tiered approvals, clear thresholds, audit trails,
            and quality measured every month. AI needs exactly that system, and most SMBs don&apos;t have it. They buy tools,
            run a pilot, and stall because no one owns the workflow, no one measured the before, and no one planned for
            mistakes.
          </p>
          <p>
            This hub is where I share what works: blueprints you can inspect, daily updates in plain language, and a
            method — Earned Autonomy — that lets AI take on more work only as it proves itself.
          </p>
          <p>
            <Link href="/track-record">See the full track record</Link> or{" "}
            <a href={site.bookingUrl}>book a 30-minute call</a>.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 self-start">
          {trackRecord.headline.map((h) => (
            <div key={h.label} className="rounded-xl border border-line bg-surface p-4">
              <dt className="text-xl font-bold tabular-nums">{h.value}</dt>
              <dd className="mt-1 text-xs text-muted">{h.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
