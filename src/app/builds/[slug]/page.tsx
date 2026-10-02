import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightStreaks } from "@/components/LightStreaks";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { ButtonLink, Container, Eyebrow, ReferenceBuildTag, Tag } from "@/components/ui";
import { appFor, getLibraryBuild, libraryBuilds, needsFor } from "@/lib/builds";
import { assessmentAreas } from "@/lib/assessment";

export function generateStaticParams() {
  return libraryBuilds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: PageProps<"/builds/[slug]">): Promise<Metadata> {
  const b = getLibraryBuild((await props.params).slug);
  return b ? { title: `${b.title} — Build Library`, description: b.short } : {};
}

export default async function BuildPage(props: PageProps<"/builds/[slug]">) {
  const b = getLibraryBuild((await props.params).slug);
  if (!b) notFound();
  const app = appFor(b);
  const needs = Object.entries(needsFor(b)).map(([slug, min]) => ({ name: assessmentAreas.find((a) => a.slug === slug)?.name ?? slug, min }));

  return (
    <PageTransition>
      <header className="relative isolate border-b border-line">
        <div className="absolute inset-x-0 -top-28 bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
          <LightStreaks intensity={0.7} />
        </div>
        <Container className="py-12 sm:py-16">
          <Link href="/builds" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">← Build Library</Link>
          <div className="mt-5 flex flex-wrap gap-1.5">
            <ReferenceBuildTag />
            <Tag>{app.name}</Tag>
            <Tag>{app.area}</Tag>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-medium sm:text-5xl">{b.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{b.short}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={app.href} target="_blank" rel="noopener noreferrer" className="btn-flare inline-flex min-h-11 items-center rounded-full px-6 text-sm font-semibold">Try the reference app</a>
            <ButtonLink href="/assessment" variant="secondary">Check if you are ready</ButtonLink>
          </div>
          <p className="mt-3 text-xs text-faint">Runs on sample data in a new tab. Not a client result.</p>
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <section>
            <Eyebrow>How it works</Eyebrow>
            <ol className="mt-4 space-y-3">
              {b.steps.map((s, i) => (
                <li key={s} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/50 bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
                  <p className="text-muted">{s}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <Eyebrow>What to try in the demo</Eyebrow>
            <p className="mt-3 text-muted">{b.demo}</p>
          </section>
          <section>
            <Eyebrow>What you need in place first</Eyebrow>
            <ul className="mt-3 space-y-2 text-muted">
              {b.needs.map((n) => <li key={n} className="flex gap-2"><span className="text-ok">✓</span><span>{n}</span></li>)}
            </ul>
            {needs.length > 0 && (
              <p className="mt-4 text-sm text-faint">
                In the readiness self-check this build needs at least: {needs.map((n) => `${n.name} ${n.min}/6`).join(", ")}.{" "}
                <Link href="/assessment" className="text-accent hover:underline">Check your scores</Link>
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Panel title="How it stays under control">
            <ul className="space-y-2 text-sm text-muted">
              {b.controls.map((c) => <li key={c} className="flex gap-2"><span className="text-ok">✓</span><span>{c}</span></li>)}
            </ul>
          </Panel>
          {b.blueprint && (
            <Panel title="Go deeper">
              <Link href={`/blueprints/${b.blueprint}`} className="text-sm font-semibold text-accent hover:underline">Read the full blueprint: architecture, stack, and measures →</Link>
            </Panel>
          )}
        </aside>
      </Container>
      <CtaBand title="Want this running in your business?" lead="We adapt it to your tools, set the controls, and measure it against your own baseline." />
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
