import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlueprintCard, GuideCard, UpdateCard } from "@/components/cards";
import { ConnectedStack } from "@/components/ConnectedStack";
import { CtaBand } from "@/components/CtaBand";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { getBlueprints, getGuides, getUpdates } from "@/lib/content";
import { pillarBySlug, pillars, services } from "@/lib/taxonomy";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata(props: PageProps<"/hub/[pillar]">): Promise<Metadata> {
  const pillar = pillarBySlug((await props.params).pillar);
  return pillar ? { title: `${pillar.name} for SMBs`, description: pillar.summary } : {};
}

export default async function PillarPage(props: PageProps<"/hub/[pillar]">) {
  const pillar = pillarBySlug((await props.params).pillar);
  if (!pillar) notFound();

  const inPillar = <T extends { pillars: string[] }>(list: T[]) => list.filter((x) => x.pillars.includes(pillar.slug));
  const blueprints = inPillar(getBlueprints());
  const guides = inPillar(getGuides());
  const updates = inPillar(getUpdates()).slice(0, 6);
  const relatedServices = services.filter((s) => s.pillars.includes(pillar.slug));

  return (
    <>
      <PageHeader eyebrow={`AI Hub · ${pillar.name}`} title={pillar.question} lead={pillar.summary} />
      {pillar.slug === "integration" && <ConnectedStack />}

      {guides.length > 0 && (
        <Section title="Guides">
          {guides.map((g) => <GuideCard key={g.slug} guide={g} />)}
        </Section>
      )}
      {blueprints.length > 0 && (
        <Section title="Blueprints" tinted>
          {blueprints.map((b) => <BlueprintCard key={b.slug} blueprint={b} />)}
        </Section>
      )}
      {updates.length > 0 && (
        <Section title="Recent updates">
          {updates.map((u) => <UpdateCard key={u.slug} update={u} />)}
        </Section>
      )}
      <Section title="Get help with this" tinted>
        {relatedServices.map((s) => (
          <Card key={s.slug} href={`/services/${s.slug}`}>
            <h3 className="font-bold">{s.name}</h3>
            <p className="mt-2 text-sm text-muted">{s.outcome}</p>
          </Card>
        ))}
      </Section>
      <CtaBand />
    </>
  );
}

function Section({ title, tinted, children }: { title: string; tinted?: boolean; children: React.ReactNode }) {
  return (
    <section className={`py-14 ${tinted ? "border-y border-line bg-surface" : ""}`}>
      <Container>
        <SectionHeading title={title} />
        <div className="grid gap-4 md:grid-cols-3">{children}</div>
      </Container>
    </section>
  );
}
