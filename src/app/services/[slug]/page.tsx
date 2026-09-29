import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlueprintCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { Container, Eyebrow, PageHeader, SectionHeading } from "@/components/ui";
import { getBlueprints } from "@/lib/content";
import { serviceBySlug, services } from "@/lib/taxonomy";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = serviceBySlug((await props.params).slug);
  return s ? { title: s.name, description: s.summary } : {};
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const s = serviceBySlug((await props.params).slug);
  if (!s) notFound();

  const related = getBlueprints()
    .filter((b) => b.pillars.some((p) => s.pillars.includes(p)))
    .slice(0, 3);

  return (
    <PageTransition>
      <PageHeader eyebrow={`Services · ${s.name}`} title={s.outcome} lead={s.summary} />
      <Container className="grid gap-10 py-14 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Eyebrow>What you get</Eyebrow>
          <ul className="mt-4 space-y-3">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-3"><span className="text-ok">✓</span><span>{d}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Eyebrow>How every engagement is governed</Eyebrow>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>A named owner for every AI workflow.</li>
            <li>A measured baseline before anything is built.</li>
            <li>An approval matrix: what AI does alone and what needs sign-off.</li>
            <li>A failure playbook for wrong outputs and outages.</li>
          </ul>
          <Link href="/method" className="mt-5 inline-block text-sm font-semibold text-accent">The Earned Autonomy method →</Link>
        </div>
      </Container>
      {related.length > 0 && (
        <section className="border-t border-line bg-white/[0.015] py-14">
          <Container>
            <SectionHeading eyebrow="Blueprints" title="Related reference builds" />
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((b) => <BlueprintCard key={b.slug} blueprint={b} />)}
            </div>
          </Container>
        </section>
      )}
      <CtaBand />
    </PageTransition>
  );
}
