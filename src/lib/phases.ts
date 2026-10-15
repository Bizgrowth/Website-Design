import type { Phase } from "@/components/interactive/ProcessTimeline";

export const phases: Phase[] = [
  { name: "Align", body: "Leadership interview, readiness score, a check for AI tools your team already uses on their own, and a list of your top 10 workflows." },
  { name: "Document", body: "Map the three highest-value workflows, write their SOPs, clean the data they depend on, and record today's time and error rates." },
  { name: "Govern", body: "Name owners, set risk levels, and decide who approves what and what happens when the AI gets something wrong." },
  { name: "Deploy", body: "Build on your existing tools. Run alongside your current process until quality targets are met." },
  { name: "Optimize", body: "Monthly review of results, exceptions, and cost. Tasks move from Yellow to Green as they earn it." },
];
