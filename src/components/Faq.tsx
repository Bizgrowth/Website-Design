import { faqs } from "@/lib/offers";

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="faq group px-5 py-2 sm:px-6">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-2 font-semibold sm:gap-6">
            {f.q}
            <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-accent">+</span>
          </summary>
          <p className="mb-4 mt-1 max-w-3xl text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
