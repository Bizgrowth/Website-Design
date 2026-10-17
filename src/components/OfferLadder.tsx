import { Reveal } from "@/components/interactive/Reveal";
import { offers } from "@/lib/offers";
import { site } from "@/lib/site";
import { ButtonLink } from "./ui";

export function OfferLadder() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {offers.map((o, i) => (
        <Reveal key={o.name} delay={i * 0.1} className="h-full">
          <div
            className={`flex h-full flex-col rounded-2xl border p-6 ${
              o.featured ? "border-accent bg-accent-soft shadow-lg" : "border-line bg-surface"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Step {i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{o.name}</h3>
            <p className="mt-2 text-sm font-medium text-accent">{o.cadence}</p>
            <p className="mt-4 flex-1 text-sm">{o.body}</p>
            <div className="mt-6">
              <ButtonLink href={site.bookingUrl} variant={o.featured ? "primary" : "secondary"}>
                Book a 30-minute ops call
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
