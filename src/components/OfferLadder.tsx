import { Reveal } from "@/components/interactive/Reveal";
import { offers } from "@/lib/offers";
import { site } from "@/lib/site";
import { ButtonLink } from "./ui";

export function OfferLadder() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {offers.map((o, i) => (
        <Reveal key={o.name} delay={i * 0.1} className="h-full">
          <div
            className={`flex h-full flex-col rounded-2xl border p-7 ${
              o.featured ? "border-accent bg-accent-soft shadow-lg" : "border-line bg-surface"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Step {i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{o.name}</h3>
            <p className="mt-4 text-3xl font-bold">{o.price}</p>
            <p className="text-sm text-muted">{o.cadence}</p>
            <p className="mt-4 text-sm">{o.body}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {o.points.map((p) => (
                <li key={p} className="flex gap-2"><span className="text-ok">✓</span>{p}</li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href={site.bookingUrl} variant={o.featured ? "primary" : "secondary"}>
                Book an Ops Call
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
