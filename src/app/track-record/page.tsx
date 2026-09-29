import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { CtaBand } from "@/components/CtaBand";
import { Container, PageHeader } from "@/components/ui";
import { trackRecord } from "@/lib/track-record";

export const metadata: Metadata = {
  title: "Track Record",
  description: "Two decades of operating results: $0 to $265M, a 12X EBITDA exit, and COO of a $1B real estate portfolio.",
};

export default function TrackRecordPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Track Record"
        title="AI is new. Running operations isn't."
        lead="Twenty years of building, scaling, and exiting operating companies in healthcare, real estate, and logistics. This is the discipline behind every AI install."
      />
      <Container className="py-14">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trackRecord.headline.map((h) => (
            <div key={h.label} className="rounded-2xl border border-line bg-surface p-6">
              <dt className="text-3xl font-bold tabular-nums">{h.value}</dt>
              <dd className="mt-2 text-sm text-muted">{h.label}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-14 space-y-4">
          {trackRecord.roles.map((r) => (
            <li key={r.company} className="grid gap-4 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[260px_1fr]">
              <div>
                <p className="font-bold">{r.company}</p>
                <p className="text-sm">{r.role}</p>
                <p className="mt-1 text-xs text-faint">{r.years} · {r.industry}</p>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {r.results.map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-ok">▸</span><span>{x}</span></li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
      <CtaBand />
    </PageTransition>
  );
}
