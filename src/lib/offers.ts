// The four-step service ladder and the homepage FAQ. No prices are published: every project is a fixed fee quoted after a call.
export const offers = [
  {
    name: "AI Ops Diagnostic",
    cadence: "2 weeks · fixed fee",
    body: "Find the three workflows worth automating first, what has to be fixed before each one, and a 90-day plan.",
    featured: false,
  },
  {
    name: "Foundations Sprint",
    cadence: "1–3 weeks · fixed fee",
    body: "Document the workflows, write the SOPs, and clean up the data your first automation depends on. You own every document, whether or not you automate.",
    featured: true,
  },
  {
    name: "Governed Build",
    cadence: "3–6 weeks per workflow · fixed fee",
    body: "One workflow built on your tools, tested against your real work, with approval rules and a plan for when it gets something wrong.",
    featured: false,
  },
  {
    name: "AI Ops Oversight",
    cadence: "Monthly retainer",
    body: "Monthly accuracy and cost review, fixes after changes, and one new workflow each quarter.",
    featured: false,
  },
];

export const faqs = [
  {
    q: "We already pay for ChatGPT or Copilot. Why do we need this?",
    a: "Those tools help one person at a time. Your operation changes when AI is connected to your inbox, CRM, and accounting, and follows a process someone owns and measures. That connection and that process are what I install.",
  },
  {
    q: "Our processes aren't written down. Is that a problem?",
    a: "That's normal, and it's where most engagements start. The Foundations Sprint documents your workflows and SOPs with your team. You keep everything, even if you decide not to automate.",
  },
  {
    q: "Will AI send things to our customers without us seeing them?",
    a: "Only if you decide it should. Every workflow starts with AI drafting and your team approving. A task runs on its own only after it holds an agreed accuracy rate on your real work.",
  },
  {
    q: "Do we need developers or new servers?",
    a: "No. Builds run on tools you log into, like Make, n8n, your CRM, and an AI provider. Each one comes with a plain-English runbook your team can follow.",
  },
  {
    q: "Are the blueprints real client projects?",
    a: "They're working reference builds, labeled that way. They show exactly what I'd install and how it's controlled. Client results are published only with measured before-and-after numbers and permission.",
  },
  {
    q: "How do you measure whether it worked?",
    a: "Before building, I record time per task, cost per unit, and error rate. Every month I report against those numbers, one workflow at a time.",
  },
];
