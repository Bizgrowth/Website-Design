// Starting prices from the strategy brief. Edit here and every page updates.
export const offers = [
  {
    name: "AI Ops Diagnostic",
    price: "From $2,500",
    cadence: "2 weeks · fixed fee",
    body: "Find the three workflows worth automating first, with baselines and a 90-day roadmap.",
    points: ["Workflow inventory & baselines", "Shadow-AI check", "Readiness scorecard", "Ranked roadmap"],
    featured: false,
  },
  {
    name: "Governed Build",
    price: "From $6,000",
    cadence: "per workflow · 3–6 weeks",
    body: "One workflow built on your tools with controls, an eval set, and a failure playbook.",
    points: ["Make / n8n + AI agent build", "Approval matrix & quality gates", "Labeled test set", "Team handoff & runbook"],
    featured: true,
  },
  {
    name: "AI Ops Oversight",
    price: "From $2,000/mo",
    cadence: "monthly retainer",
    body: "Keep it accurate, keep costs in line, and promote workflows to autonomy as they earn it.",
    points: ["Monthly accuracy & cost review", "Eval re-runs after changes", "Promotion to autonomy", "New workflow each quarter"],
    featured: false,
  },
];

export const faqs = [
  {
    q: "We already pay for ChatGPT or Copilot. Why do we need this?",
    a: "Generic tools help individuals. Operations change when AI is wired into your workflows — your inbox, CRM, and accounting — with owners, controls, and measurement. That's the part we install.",
  },
  {
    q: "Will AI send things to our customers without us seeing them?",
    a: "Not unless you decide it should. Every workflow starts supervised: AI drafts, your team approves. Specific low-risk tasks are promoted to autonomous only after they hold an agreed accuracy rate.",
  },
  {
    q: "Do we need developers or new servers?",
    a: "No. Builds run on licensed tools you log into — Make, n8n cloud, your CRM, and an AI provider — and come with a runbook your team can maintain.",
  },
  {
    q: "Are the blueprints real client projects?",
    a: "They're working reference builds, and we label them that way. They show exactly what we'd install and how it's governed. Client results are published only with measured before-and-after numbers and permission.",
  },
  {
    q: "How do you measure whether it worked?",
    a: "We capture a baseline before building — time per task, cost per unit, error rate — and report against it monthly. Efficiency claims are always per workflow, against your own numbers.",
  },
];
