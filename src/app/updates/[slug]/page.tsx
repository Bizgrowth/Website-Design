import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Container, Eyebrow, PillarTags } from "@/components/ui";
import { formatDate, getUpdate, getUpdates } from "@/lib/content";

export function generateStaticParams() {
  return getUpdates().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata(props: PageProps<"/updates/[slug]">): Promise<Metadata> {
  const u = getUpdate((await props.params).slug);
  return u ? { title: u.title, description: u.summary } : {};
}

export default async function UpdatePage(props: PageProps<"/updates/[slug]">) {
  const u = getUpdate((await props.params).slug);
  if (!u) notFound();

  return (
    <PageTransition>
      <Container className="py-12 sm:py-16">
        <Link href="/updates" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">← SMB AI Daily</Link>
        <time dateTime={u.date} className="mt-6 block text-sm font-semibold text-faint">{formatDate(u.date)}</time>
        <h1 className="mt-2 max-w-3xl text-3xl font-medium sm:text-4xl">{u.title}</h1>
        <div className="mt-4"><PillarTags pillars={u.pillars} /></div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="prose" dangerouslySetInnerHTML={{ __html: u.html }} />
          <aside className="space-y-6 lg:self-start">
            {u.takeaway && (
              <div className="rounded-2xl border border-accent bg-accent-soft p-5">
                <Eyebrow>What to do this week</Eyebrow>
                <p className="mt-2 text-sm">{u.takeaway}</p>
              </div>
            )}
            {u.sources.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface p-5">
                <Eyebrow>Sources</Eyebrow>
                <ul className="mt-3 space-y-2 text-sm">
                  {u.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} className="text-accent underline underline-offset-2" rel="noopener noreferrer">{s.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
