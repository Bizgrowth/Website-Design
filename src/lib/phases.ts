import type { Phase } from "@/components/interactive/ProcessTimeline";

export const phases: Phase[] = [
  { name: "Align", time: "Weeks 1–2", body: "Leadership interview, readiness score, shadow-AI inventory, top-10 workflow list." },
  { name: "Map", time: "Weeks 2–3", body: "Document the three highest-value workflows and capture baselines." },
  { name: "Govern", time: "Weeks 3–4", body: "Assign owners, set risk tiers, build the approval matrix and failure playbook — before building." },
  { name: "Deploy", time: "Weeks 4–8", body: "Build against the rules. Run in parallel with the human process until quality thresholds are met." },
  { name: "Optimize", time: "Ongoing", body: "Monthly review of KPIs, exceptions, and cost. Promote workflows from Yellow to Green as they earn it." },
];
