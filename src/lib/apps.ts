import { site } from "./site";

// The interactive reference builds hosted at apps.aiopsexpert.com (repo: Bizgrowth/ai-ops-portfolio-apps).
// They run on sample data. Always present them as reference builds, never as client results.
export const referenceApps = [
  { name: "LeadPilot", area: "Marketing & Lead Gen", file: "01-leadpilot.html", blurb: "Sortable lead table — pick a lead and get a data-driven follow-up draft." },
  { name: "PipelineIQ", area: "Sales", file: "02-pipelineiq.html", blurb: "Drag-and-drop deal board with live totals and weighted forecast." },
  { name: "Onboard", area: "Onboarding", file: "03-onboard.html", blurb: "Staged checklist — finishing a stage unlocks the next and updates progress." },
  { name: "FlowDesk", area: "Delivery", file: "04-flowdesk.html", blurb: "Task board with an SOP panel that drafts a first pass from task and SOP data." },
  { name: "KnowledgeBase", area: "Communication & Knowledge", file: "05-knowledgebase.html", blurb: "Live search and tag filters across an SOP article set." },
  { name: "LedgerFlow", area: "Finance & Billing", file: "06-ledgerflow.html", blurb: "Invoice table — mark one paid and AR aging and DSO recalculate." },
  { name: "PulseBoard", area: "Reporting & Analytics", file: "07-pulseboard.html", blurb: "Date and segment filters redraw a chart and a plain-English trend summary." },
  { name: "RetainAI", area: "Inbound messages", file: "08-retainai.html", blurb: "Inbound message queue by priority and account health, with a tailored draft reply." },
].map((a) => ({ ...a, href: `${site.appsUrl}/${a.file}` }));
