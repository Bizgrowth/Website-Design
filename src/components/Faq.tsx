import { faqs } from "@/lib/offers";

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="faq group p-6">
          <summary className="flex items-center justify-between gap-6 font-semibold">
            {f.q}
            <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-accent">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
