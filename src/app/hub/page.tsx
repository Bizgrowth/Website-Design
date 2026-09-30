import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { GuideCard, UpdateCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { getBlueprints, getGuides, getUpdates } from "@/lib/content";
import { pillars } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "AI Hub for SMBs",
  description: "Blueprints, guides, and daily updates on AI automation, integration, and implementation for small and mid-sized businesses.",
};

export default function HubPage() {
  const blueprints = getBlueprints();
  const guides = getGuides();
  const updates = getUpdates();

  return (
    <PageTransition>
      <PageHeader
        eyebrow="The AI Hub"
        title="AI automation, integration, and implementation — in one place"
        lead="Start with the question you're trying to answer. Each pillar collects the blueprints, guides, and updates that answer it."
      />
      <Container className="py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => {
            const count = (list: { pillars: string[] }[]) => list.filter((x) => x.pillars.includes(p.slug)).length;
            return (
              <Card key={p.slug} href={`/hub/${p.slug}`} className="flex flex-col">
                <h2 className="text-xl font-medium">{p.name}</h2>
                <p className="mt-2 text-sm font-medium">{p.question}</p>
                <p className="mt-2 flex-1 text-sm text-muted">{p.summary}</p>
                <p className="mt-5 text-xs text-faint">
                  {count(blueprints)} blueprints · {count(guides)} guides · {count(updates)} updates
                </p>
              </Card>
            );
          })}
        </div>
      </Container>

      <section className="border-t border-line bg-white/[0.015] py-14">
        <Container>
          <SectionHeading eyebrow="Guides" title="Start here" />
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="SMB AI Daily"
            title="Latest updates"
            action={<ButtonLink href="/updates" variant="secondary">All updates</ButtonLink>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {updates.slice(0, 3).map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
