import type { Metadata } from "next";
import { LightStreaks } from "@/components/LightStreaks";
import { Morph, PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Container, Eyebrow, PillarTags, ReferenceBuildTag, Tag } from "@/components/ui";
import { getBlueprint, getBlueprints } from "@/lib/content";

export function generateStaticParams() {
  return getBlueprints().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: PageProps<"/blueprints/[slug]">): Promise<Metadata> {
  const b = getBlueprint((await props.params).slug);
  return b ? { title: `${b.title} — Blueprint`, description: b.summary } : {};
}

export default async function BlueprintPage(props: PageProps<"/blueprints/[slug]">) {
  const b = getBlueprint((await props.params).slug);
  if (!b) notFound();

  return (
    <PageTransition>
      <header className="relative isolate border-b border-line">
        <div className="absolute inset-x-0 -top-28 bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
          <LightStreaks intensity={0.7} />
        </div>
        <Container className="py-12 sm:py-16">
          <Link href="/blueprints" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">← All blueprints</Link>
          <div className="mt-5 flex flex-wrap gap-1.5">
            <ReferenceBuildTag />
            <Tag>{b.industry}</Tag>
          </div>
          <Morph name={`bp-${b.slug}`}>
            <h1 className="mt-4 max-w-3xl text-3xl font-medium sm:text-5xl">{b.title}</h1>
          </Morph>
          <p className="mt-4 max-w-2xl text-lg text-muted">{b.summary}</p>
          <div className="mt-5">
            <PillarTags pillars={b.pillars} />
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="prose" dangerouslySetInnerHTML={{ __html: b.html }} />

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Panel title="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {b.stack.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
            </ul>
          </Panel>
          <Panel title="Governance controls">
            <List items={b.governance} />
          </Panel>
          <Panel title="What it measures">
            <List items={b.measures} />
          </Panel>
          {(b.repo || b.loom) && (
            <Panel title="See it">
              <ul className="space-y-2 text-sm">
                {b.loom && <li><a className="font-semibold text-accent" href={b.loom}>Watch the 90-second walkthrough →</a></li>}
                {b.repo && <li><a className="font-semibold text-accent" href={b.repo}>View the build on GitHub →</a></li>}
              </ul>
            </Panel>
          )}
        </aside>
      </Container>
      <CtaBand title="Want this running in your business?" lead="We adapt the blueprint to your tools, set the controls, and measure it against your baseline." />
    </PageTransition>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-muted">
      {items.map((i) => (
        <li key={i} className="flex gap-2"><span className="text-ok">✓</span><span>{i}</span></li>
      ))}
    </ul>
  );
}
