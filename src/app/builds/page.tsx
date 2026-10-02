import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { Card, Container, PageHeader, ReferenceBuildTag, SectionHeading, Tag } from "@/components/ui";
import { appFor, libraryBuilds } from "@/lib/builds";

export const metadata: Metadata = {
  title: "Build Library",
  description: "Eight working reference builds, each framed around the business problem it solves. Try them on sample data.",
};

export default function BuildsPage() {
  const first = libraryBuilds.filter((b) => b.wave === "first");
  const second = libraryBuilds.filter((b) => b.wave === "second");
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Build Library"
        title="Start with the problem. Try the build."
        lead="Eight working reference builds, each one framed around a problem owners tell us about. They run on sample data and are not client results. Each page shows how it works, what it needs from you, and how it stays under control."
      />
      <Container className="space-y-14 py-14">
        <Group title="Most requested" items={first} />
        <Group title="More builds" items={second} />
      </Container>
      <CtaBand title="Not sure which build fits?" lead="Take the AI Readiness self-check. It shows which of these your operations can support today, and what to fix first." />
    </PageTransition>
  );
}

function Group({ title, items }: { title: string; items: typeof libraryBuilds }) {
  return (
    <section>
      <SectionHeading title={title} />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((b) => (
          <Card key={b.slug} href={`/builds/${b.slug}`} className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-1.5">
              <ReferenceBuildTag />
              <Tag>{appFor(b).name}</Tag>
            </div>
            <h3 className="mt-4 text-lg font-medium">{b.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">{b.short}</p>
            <p className="mt-4 text-sm font-semibold text-accent">See how it works →</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
