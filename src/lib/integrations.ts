import {
  siAirtable,
  siAsana,
  siCalendly,
  siClaude,
  siClickup,
  siGmail,
  siGoogledrive,
  siGooglegemini,
  siGooglesheets,
  siHubspot,
  siMake,
  siN8n,
  siNotion,
  siQuickbooks,
  siShopify,
  siStripe,
  siSupabase,
  siWhatsapp,
  siXero,
  siZapier,
  siZendesk,
} from "simple-icons";

export type Category = "Automation" | "AI models" | "CRM & sales" | "Communication" | "Finance" | "Data & knowledge" | "Projects";

export type Integration = {
  name: string;
  category: Category;
  // Brand mark from Simple Icons, or a monogram for brands that don't publish one there.
  icon: { path: string; hex: string } | { monogram: string; hex: string };
  automate: string[];
  blueprints: string[]; // blueprint slugs
};

const logo = (i: { path: string; hex: string }) => ({ path: i.path, hex: i.hex });

export const categories: Category[] = ["Automation", "AI models", "CRM & sales", "Communication", "Finance", "Data & knowledge", "Projects"];

export const integrations: Integration[] = [
  {
    name: "Make",
    category: "Automation",
    icon: logo(siMake),
    automate: ["Watches inboxes, forms, and apps for new work", "Routes AI output by confidence and risk", "Retries and deduplication so nothing runs twice"],
    blueprints: ["email-triage-agent"],
  },
  {
    name: "n8n",
    category: "Automation",
    icon: logo(siN8n),
    automate: ["Multi-step workflows with AI at the judgment points", "Per-execution pricing that stays cheap at volume", "Self-hosted option when data must stay in-house"],
    blueprints: ["lead-intake-pipeline", "ops-knowledge-brain", "document-intake-extractor", "kpi-dashboard-narrative", "multi-agent-advisory-team"],
  },
  {
    name: "Zapier",
    category: "Automation",
    icon: logo(siZapier),
    automate: ["Quick connections between everyday apps", "Migrations to Make or n8n when volume grows"],
    blueprints: [],
  },
  {
    name: "Claude",
    category: "AI models",
    icon: logo(siClaude),
    automate: ["Classifies and extracts from messy emails and documents", "Drafts replies with confidence scores", "Writes plain-English KPI narratives"],
    blueprints: ["email-triage-agent", "ops-knowledge-brain", "document-intake-extractor", "lead-intake-pipeline", "kpi-dashboard-narrative", "multi-agent-advisory-team"],
  },
  {
    name: "OpenAI",
    category: "AI models",
    icon: { monogram: "AI", hex: "10A37F" },
    automate: ["Alternative model benchmarked against your labeled test set", "Embeddings for knowledge-base search"],
    blueprints: ["ops-knowledge-brain"],
  },
  {
    name: "Gemini",
    category: "AI models",
    icon: logo(siGooglegemini),
    automate: ["Google Workspace-native assistance", "Model comparison on your own test set"],
    blueprints: [],
  },
  {
    name: "HubSpot",
    category: "CRM & sales",
    icon: logo(siHubspot),
    automate: ["Creates and enriches contacts and deals", "Triggers follow-up sequences after calls", "Keeps pipeline stages and owners current"],
    blueprints: ["lead-intake-pipeline"],
  },
  {
    name: "Salesforce",
    category: "CRM & sales",
    icon: { monogram: "SF", hex: "00A1E0" },
    automate: ["Lead routing and enrichment", "AI-drafted follow-ups logged to the record"],
    blueprints: [],
  },
  {
    name: "Calendly",
    category: "CRM & sales",
    icon: logo(siCalendly),
    automate: ["Books qualified leads straight from the first reply", "Pre-call briefs from CRM history"],
    blueprints: ["lead-intake-pipeline"],
  },
  {
    name: "Gmail",
    category: "Communication",
    icon: logo(siGmail),
    automate: ["Triage of shared inboxes", "Drafts written into the thread for staff to send", "Escalation labels for sensitive messages"],
    blueprints: ["email-triage-agent", "lead-intake-pipeline"],
  },
  {
    name: "Slack",
    category: "Communication",
    icon: { monogram: "S", hex: "E01E5A" },
    automate: ["Alerts a named owner for hot leads and escalations", "Daily summaries of what the AI handled"],
    blueprints: ["lead-intake-pipeline", "kpi-dashboard-narrative"],
  },
  {
    name: "WhatsApp",
    category: "Communication",
    icon: logo(siWhatsapp),
    automate: ["Customer questions answered from your knowledge base", "Appointment reminders and confirmations"],
    blueprints: [],
  },
  {
    name: "Zendesk",
    category: "Communication",
    icon: logo(siZendesk),
    automate: ["Ticket classification and routing", "Suggested replies with cited sources"],
    blueprints: [],
  },
  {
    name: "QuickBooks",
    category: "Finance",
    icon: logo(siQuickbooks),
    automate: ["Balance and invoice-status lookups for replies", "Invoice entry from extracted documents", "Payment reminders under approval rules"],
    blueprints: ["email-triage-agent", "document-intake-extractor"],
  },
  {
    name: "Xero",
    category: "Finance",
    icon: logo(siXero),
    automate: ["Bill capture from supplier emails", "Reconciliation drafts for review"],
    blueprints: ["document-intake-extractor"],
  },
  {
    name: "Stripe",
    category: "Finance",
    icon: logo(siStripe),
    automate: ["Invoices created at contract signature", "Failed-payment follow-up"],
    blueprints: [],
  },
  {
    name: "Shopify",
    category: "Finance",
    icon: logo(siShopify),
    automate: ["Order and returns questions answered from store data", "Inventory alerts"],
    blueprints: [],
  },
  {
    name: "Google Sheets",
    category: "Data & knowledge",
    icon: logo(siGooglesheets),
    automate: ["Staff-editable facts the AI reads (hours, rates, policies)", "Tracking sheets for extracted data", "KPI source data"],
    blueprints: ["email-triage-agent", "document-intake-extractor", "kpi-dashboard-narrative"],
  },
  {
    name: "Google Drive",
    category: "Data & knowledge",
    icon: logo(siGoogledrive),
    automate: ["Watched folders for incoming documents", "Source files for the knowledge base"],
    blueprints: ["ops-knowledge-brain", "document-intake-extractor"],
  },
  {
    name: "Supabase",
    category: "Data & knowledge",
    icon: logo(siSupabase),
    automate: ["Vector search for cited knowledge-base answers", "Audit logs of every AI decision"],
    blueprints: ["ops-knowledge-brain"],
  },
  {
    name: "Airtable",
    category: "Data & knowledge",
    icon: logo(siAirtable),
    automate: ["Operations databases with AI-filled fields", "Central logging of automation runs"],
    blueprints: [],
  },
  {
    name: "Notion",
    category: "Data & knowledge",
    icon: logo(siNotion),
    automate: ["SOP library the assistant answers from", "Client portals created at onboarding"],
    blueprints: ["ops-knowledge-brain"],
  },
  {
    name: "ClickUp",
    category: "Projects",
    icon: logo(siClickup),
    automate: ["Tasks created from emails and calls", "Weekly status summaries"],
    blueprints: [],
  },
  {
    name: "Asana",
    category: "Projects",
    icon: logo(siAsana),
    automate: ["Project status drafts for clients", "Handoffs assigned to the right owner"],
    blueprints: [],
  },
];
