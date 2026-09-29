import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Container, PillarTags } from "@/components/ui";
import { getGuide, getGuides } from "@/lib/content";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const g = getGuide((await props.params).slug);
  return g ? { title: g.title, description: g.summary } : {};
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const g = getGuide((await props.params).slug);
  if (!g) notFound();

  return (
    <PageTransition>
      <Container className="py-12 sm:py-16">
        <Link href="/hub" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">← AI Hub</Link>
        <p className="mt-6 text-sm font-semibold text-faint">Guide · {g.readingMinutes} min read</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">{g.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{g.summary}</p>
        <div className="mt-4"><PillarTags pillars={g.pillars} /></div>
        <article className="prose mt-10" dangerouslySetInnerHTML={{ __html: g.html }} />
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
