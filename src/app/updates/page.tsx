import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Container, PageHeader, PillarTags } from "@/components/ui";
import { formatDate, getUpdates } from "@/lib/content";

export const metadata: Metadata = {
  title: "SMB AI Daily",
  description: "Short, sourced daily briefings on AI automation, integration, and implementation for SMB owners and operators.",
};

export default function UpdatesPage() {
  const updates = getUpdates();
  return (
    <PageTransition>
      <PageHeader
        eyebrow="SMB AI Daily"
        title="What changed in AI operations — and what it means for your business"
        lead="Every update ends with one practical takeaway. Sources are linked so you can check them yourself."
      />
      <Container className="py-14">
        <ol className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {updates.map((u) => (
            <li key={u.slug}>
              <Link href={`/updates/${u.slug}`} className="grid gap-2 p-6 hover:bg-surface-2 sm:grid-cols-[140px_1fr]">
                <time dateTime={u.date} className="text-sm font-semibold text-faint">{formatDate(u.date)}</time>
                <div>
                  <h2 className="text-lg font-medium">{u.title}</h2>
                  <p className="mt-1 text-sm text-muted">{u.summary}</p>
                  <div className="mt-3"><PillarTags pillars={u.pillars} /></div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
