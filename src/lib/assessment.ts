// AI-readiness self-check. Five operations areas, two questions each, scored 0–3.
// The self-check is indicative. The paid AI Ops Diagnostic scores current vs. required state per workflow.

export type AssessmentOption = { label: string; score: 0 | 1 | 2 | 3 };
export type AssessmentQuestion = { id: string; prompt: string; options: AssessmentOption[] };
export type AssessmentArea = {
  slug: string;
  name: string;
  why: string;
  firstMove: string;
  questions: AssessmentQuestion[];
};

const opts = (a: string, b: string, c: string, d: string): AssessmentOption[] => [
  { label: a, score: 0 },
  { label: b, score: 1 },
  { label: c, score: 2 },
  { label: d, score: 3 },
];

export const assessmentAreas: AssessmentArea[] = [
  {
    slug: "sops",
    name: "Written SOPs",
    why: "AI can only follow steps that exist in writing.",
    firstMove: "Write down the steps for your three most repeated processes, then have someone new follow them and fix what breaks.",
    questions: [
      {
        id: "sop-1",
        prompt: "Could a new hire run your core processes from written instructions alone?",
        options: opts("No, it's in people's heads", "A few are written, most are out of date", "Most are written and reasonably current", "Yes: written, current, and reviewed on a schedule"),
      },
      {
        id: "sop-2",
        prompt: "When someone is out or leaves, what happens to the process they ran?",
        options: opts("It stalls until we figure it out", "We scramble and ask around", "Someone can cover using notes", "Someone covers from documented steps, with no disruption"),
      },
    ],
  },
  {
    slug: "workflows",
    name: "Mapped workflows",
    why: "Automating an unclear process just makes the confusion faster.",
    firstMove: "Map your top workflow end to end: each step, who owns it, and where work is handed off.",
    questions: [
      {
        id: "wf-1",
        prompt: "Can you name the steps, owner, and handoffs of your top three workflows (lead to cash, order to delivery, request to resolution)?",
        options: opts("Not really", "Roughly, but people do it differently", "Yes for most, with some gaps", "Yes: mapped, with owners and handoffs"),
      },
      {
        id: "wf-2",
        prompt: "Do you know how the odd cases that break the normal flow get handled?",
        options: opts("It's ad hoc", "Only the most experienced people know", "The common exceptions are written down", "Yes: exceptions and escalation rules are documented"),
      },
    ],
  },
  {
    slug: "data",
    name: "Connected data",
    why: "Data locked in silos means AI works from half the picture, or the wrong picture.",
    firstMove: "Pick one system of record for each kind of information (customers, jobs, invoices) and name an owner for each.",
    questions: [
      {
        id: "data-1",
        prompt: "Where does the information your team needs actually live?",
        options: opts("Scattered across inboxes, spreadsheets, and people's heads", "In several tools that don't match up", "Mostly in one or two systems of record", "One trusted source for each type of information"),
      },
      {
        id: "data-2",
        prompt: "Do you trust your numbers, and does someone own their accuracy?",
        options: opts("No, we double-check everything", "Sometimes, with no clear owner", "Mostly, with informal ownership", "Yes: a named owner and regular cleanup"),
      },
    ],
  },
  {
    slug: "systems",
    name: "Systems & handoffs",
    why: "If people retype data between tools, automation has nothing to plug into.",
    firstMove: "List every place a person copies data from one tool to another. Those are your first integration targets.",
    questions: [
      {
        id: "sys-1",
        prompt: "How does information move between your tools?",
        options: opts("People copy, paste, or retype", "Some manual work, a few connections", "Most key tools are connected", "Connected, with alerts when something breaks"),
      },
      {
        id: "sys-2",
        prompt: "If you wanted software to read from or update your key tools, could it?",
        options: opts("Not sure, or no", "Maybe for one or two", "For most of them", "Yes: we know which tools allow it and who administers access"),
      },
    ],
  },
  {
    slug: "control",
    name: "Ownership & control",
    why: "Automations without owners and checks drift, and nobody notices until a customer does.",
    firstMove: "Name one person who decides what AI may do, and write a one-page rule for approvals and sensitive data.",
    questions: [
      {
        id: "ctl-1",
        prompt: "Who decides what AI is allowed to do in your business?",
        options: opts("Nobody has decided", "Individuals use AI tools on their own", "There's an informal policy", "A named owner and written rules on approvals and data"),
      },
      {
        id: "ctl-2",
        prompt: "How would you know an automation was quietly getting things wrong?",
        options: opts("We wouldn't", "We'd hear it from a customer", "Someone spot-checks occasionally", "We track a baseline metric and review results on a schedule"),
      },
    ],
  },
];

export const questionCount = assessmentAreas.reduce((n, a) => n + a.questions.length, 0);
export const maxAreaScore = 6;

export type Tier = { slug: "fix-first" | "ready-to-pilot" | "ready-to-scale"; name: string; summary: string; next: string };

export const tiers: Record<Tier["slug"], Tier> = {
  "fix-first": {
    slug: "fix-first",
    name: "Fix first",
    summary: "Automating today would speed up an unclear process. The foundations need to come first.",
    next: "Spend the next 30–60 days documenting your top three workflows and consolidating the data they depend on, before buying any tools.",
  },
  "ready-to-pilot": {
    slug: "ready-to-pilot",
    name: "Ready to pilot",
    summary: "You have enough in place to prove AI on one narrow, well-documented workflow.",
    next: "Pick one workflow, run it supervised (AI drafts, a person approves), measure against a baseline, and close your weakest area in parallel.",
  },
  "ready-to-scale": {
    slug: "ready-to-scale",
    name: "Ready to scale",
    summary: "Your foundations can carry more than one automation.",
    next: "Rank your workflows by impact, risk, and effort, then build them in order, each with owners, controls, and a monthly review.",
  },
};

export type AssessmentResult = {
  total: number;
  max: number;
  areas: { slug: string; name: string; score: number; why: string; firstMove: string }[];
  weakest: { slug: string; name: string; score: number; why: string; firstMove: string };
  tier: Tier;
};

// answers: question id -> score. Returns null until every question is answered.
export function scoreAssessment(answers: Record<string, number>): AssessmentResult | null {
  if (assessmentAreas.some((a) => a.questions.some((q) => answers[q.id] === undefined))) return null;
  const areas = assessmentAreas.map((a) => ({
    slug: a.slug,
    name: a.name,
    why: a.why,
    firstMove: a.firstMove,
    score: a.questions.reduce((s, q) => s + answers[q.id], 0),
  }));
  const total = areas.reduce((s, a) => s + a.score, 0);
  const weakest = areas.reduce((w, a) => (a.score < w.score ? a : w));
  // AI stalls on the weakest link, so the lowest area caps the tier as well as the total.
  const tier =
    total >= 23 && weakest.score >= 3 ? tiers["ready-to-scale"] : total >= 13 && weakest.score >= 2 ? tiers["ready-to-pilot"] : tiers["fix-first"];
  return { total, max: questionCount * 3, areas, weakest, tier };
}
