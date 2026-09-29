export type PillarSlug = "automation" | "integration" | "implementation";

export type Pillar = {
  slug: PillarSlug;
  name: string;
  question: string;
  summary: string;
  topics: string[];
};

// The three hub pillars. Every blueprint, guide, and update is tagged with one or more.
export const pillars: Pillar[] = [
  {
    slug: "automation",
    name: "AI Automation",
    question: "Which work should AI take off your team's plate?",
    summary:
      "Workflows where AI does the volume — inbound triage, document intake, follow-up, reporting — and people handle the exceptions.",
    topics: ["Inbound triage", "Document intake", "Follow-up sequences", "Automated reporting"],
  },
  {
    slug: "integration",
    name: "AI Integration",
    question: "How does AI connect to the tools you already run?",
    summary:
      "Wiring AI into your CRM, accounting, inbox, and knowledge base with Make, n8n, and APIs — so it works inside your stack, not beside it.",
    topics: ["Make & n8n", "CRM (HubSpot, Salesforce)", "QuickBooks & finance", "Knowledge bases & RAG"],
  },
  {
    slug: "implementation",
    name: "AI Implementation",
    question: "How do you launch AI so it stays safe, measured, and owned?",
    summary:
      "Readiness, governance, evaluation, and rollout. The operating discipline that separates AI that sticks from pilots that stall.",
    topics: ["AI readiness", "Approval matrices", "Eval sets & quality gates", "Earned autonomy"],
  },
];

export const pillarBySlug = (slug: string) => pillars.find((p) => p.slug === slug);

export type Service = {
  slug: string;
  name: string;
  outcome: string;
  summary: string;
  deliverables: string[];
  pillars: PillarSlug[];
};

// Daniel's five service areas.
export const services: Service[] = [
  {
    slug: "ai-readiness",
    name: "AI Readiness & Roadmap",
    outcome: "Know exactly where AI pays off before you spend on tools.",
    summary:
      "A two-week diagnostic: workflow inventory, baselines, shadow-AI check, and a ranked roadmap of the three workflows worth automating first.",
    deliverables: [
      "AI Readiness Scorecard (data, process, people, technology)",
      "Workflow opportunity map ranked by impact, risk, and effort",
      "Baseline report: cycle time, cost per unit, error rate",
      "90-day implementation roadmap",
    ],
    pillars: ["implementation"],
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation & Tool Integration",
    outcome: "Your systems talk to each other, and AI works inside them.",
    summary:
      "Make and n8n workflows that connect your inbox, CRM, accounting, and documents — with retries, deduplication, and error handling built in.",
    deliverables: [
      "Process map of the current and future workflow",
      "Production Make or n8n scenarios with error handling",
      "CRM, QuickBooks, Google Workspace, and API integrations",
      "Runbook your team can maintain",
    ],
    pillars: ["automation", "integration"],
  },
  {
    slug: "ai-agents",
    name: "AI Agents: Build, Manage, Scale",
    outcome: "Agents that start supervised and earn autonomy with data.",
    summary:
      "Triage, intake, knowledge, and multi-agent systems. Drafts first, measured against a labeled test set, and promoted to autonomous one task at a time.",
    deliverables: [
      "Agent design with structured outputs and confidence scoring",
      "Reusable tool layer (CRM, accounting, knowledge base)",
      "Labeled eval set and pre-release pass-rate gate",
      "Promotion plan from supervised to autonomous",
    ],
    pillars: ["automation", "implementation"],
  },
  {
    slug: "dashboards",
    name: "Ops & AI Performance Dashboards",
    outcome: "See what your operation — and your AI — is actually doing.",
    summary:
      "KPI dashboards that pull from your sheets and systems, plus AI-written weekly narratives that flag risks and recommend actions.",
    deliverables: [
      "KPI scorecard design (the 5–7 numbers that matter)",
      "Live dashboard connected to your data",
      "AI performance panel: accuracy, exceptions, cost drift",
      "Weekly narrative report to owners and managers",
    ],
    pillars: ["integration", "implementation"],
  },
  {
    slug: "ai-governance",
    name: "AI Governance & Oversight",
    outcome: "Clear ownership, controls, and a plan for when AI gets it wrong.",
    summary:
      "The operating layer most SMBs skip: owners, approval thresholds, failure playbooks, usage policy, and a monthly oversight review.",
    deliverables: [
      "AI Governance Charter per workflow (one page each)",
      "Approval matrix: what AI does alone, what needs sign-off",
      "Failure and rollback playbook",
      "Monthly AI Operations Report",
    ],
    pillars: ["implementation"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
