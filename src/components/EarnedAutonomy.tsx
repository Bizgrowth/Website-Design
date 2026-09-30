// The signature method as a three-stage diagram: Red → Yellow → Green.
const stages = [
  {
    tier: "Red",
    name: "Human decides",
    body: "AI researches and drafts. A person makes every decision. Used for new workflows and high-risk actions.",
    tone: "border-risk bg-risk-soft text-risk",
  },
  {
    tier: "Yellow",
    name: "Human approves",
    body: "AI acts, a person reviews before anything reaches a customer. Measured against a labeled test set.",
    tone: "border-warn bg-warn-soft text-warn",
  },
  {
    tier: "Green",
    name: "AI runs, people audit",
    body: "Promoted one task type at a time, only after it holds its pass rate. Sampled and reviewed monthly.",
    tone: "border-ok bg-ok-soft text-ok",
  },
];

export function EarnedAutonomy() {
  return (
    <ol className="grid gap-4 md:grid-cols-3" aria-label="Earned Autonomy stages">
      {stages.map((s, i) => (
        <li key={s.tier} className="relative rounded-2xl border border-line bg-surface p-6">
          <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold ${s.tone}`}>
            Stage {i + 1} · {s.tier}
          </span>
          <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
          <p className="mt-2 text-sm text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
