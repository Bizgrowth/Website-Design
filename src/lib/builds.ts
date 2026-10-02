import { referenceApps } from "./apps";
import { readinessBuilds } from "./assessment";

// The Build Library: one page per reference build, framed as the buyer's problem.
// Every entry is a reference build on sample data. Never add client results or numbers without a verifiable source.
export type LibraryBuild = {
  slug: string;
  app: string; // matches referenceApps[].name
  title: string; // the buyer's problem
  short: string; // one line for cards
  wave: "first" | "second";
  blueprint?: string; // slug in content/blueprints
  steps: string[]; // how it works, plain language
  demo: string; // what to click in the reference app
  needs: string[]; // what the business must have in place
  controls: string[]; // how it stays safe
};

export const libraryBuilds: LibraryBuild[] = [
  {
    slug: "inbound-message-triage",
    app: "RetainAI",
    title: "Triage inbound messages and draft replies for your team to approve",
    short: "Every inbound email or ticket is sorted by priority and account health, and a reply is drafted for a person to review.",
    wave: "first",
    blueprint: "email-triage-agent",
    steps: [
      "New messages are read as they arrive and sorted by what they are about and how urgent they are.",
      "Each one is matched to the account, so the team sees account health next to the message.",
      "A draft reply is written from your own policies and account facts. A person approves or edits it before anything is sent.",
    ],
    demo: "Open the ticket queue, filter by priority and account health, pick a ticket, and read the tailored draft reply.",
    needs: ["A written list of the common questions and how you answer them", "One inbox or help desk the messages arrive in", "A named person who approves drafts"],
    controls: ["Drafts only at launch, staff send every reply", "Sensitive messages are routed straight to a person", "Accuracy is tested on labeled examples before any release"],
  },
  {
    slug: "invoices-and-receivables",
    app: "LedgerFlow",
    title: "Get invoices paid faster and see who owes you",
    short: "Invoices are captured from documents, and receivables aging and days sales outstanding update as payments land.",
    wave: "first",
    blueprint: "document-intake-extractor",
    steps: [
      "Invoices and related documents are read and the key fields are extracted into one table.",
      "Anything unclear is flagged for a person instead of guessed.",
      "Aging and days sales outstanding recalculate as invoices are marked paid, so you see who owes you and for how long.",
    ],
    demo: "Mark an invoice as paid in the table and watch the aging buckets and days sales outstanding recalculate.",
    needs: ["Your invoicing steps written down, including when reminders go out", "Invoices in a consistent place", "Access to your accounting system for the connection"],
    controls: ["Low-confidence fields go to a review queue", "Every extracted value links back to its source document", "A person approves anything that changes the books"],
  },
  {
    slug: "answers-from-your-sops",
    app: "KnowledgeBase",
    title: "Answer staff and customer questions from your own SOPs",
    short: "Searchable, tagged procedures that give cited answers from your documents, not from the open internet.",
    wave: "first",
    blueprint: "ops-knowledge-brain",
    steps: [
      "Your procedures are organized into one searchable set with tags.",
      "A question is answered from those documents only, with the source shown.",
      "When the documents do not cover it, the answer says so and flags the gap for you to fill.",
    ],
    demo: "Search the article set and filter by tag to see how a written procedure becomes a fast answer.",
    needs: ["SOPs or process notes, even rough ones", "An owner for keeping them current", "A decision on who may see what"],
    controls: ["Answers cite the source document", "Access follows your existing permissions", "Unanswered questions become a to-write list"],
  },
  {
    slug: "fast-lead-reply",
    app: "LeadPilot",
    title: "Reply to new leads in under a minute",
    short: "New leads are captured, scored on your own criteria, and given a data-driven follow-up draft right away.",
    wave: "first",
    blueprint: "lead-intake-pipeline",
    steps: [
      "A new lead from your form, ad, or inbox lands in one table.",
      "It is checked against your own criteria so the best-fit leads rise to the top.",
      "A personal follow-up is drafted from the lead's details for your team to send or edit.",
    ],
    demo: "Sort the lead table, pick a lead, and read the follow-up draft built from that lead's data.",
    needs: ["A written definition of a good lead", "One place leads arrive", "Your usual follow-up wording and offer"],
    controls: ["Drafts reviewed before sending until accuracy is proven", "Duplicate leads are merged", "Opt-outs are respected"],
  },
  {
    slug: "weekly-report-in-plain-english",
    app: "PulseBoard",
    title: "A weekly report that explains itself in plain English",
    short: "Your key numbers on one screen, with a short written summary of what changed and why it matters.",
    wave: "second",
    blueprint: "kpi-dashboard-narrative",
    steps: [
      "Numbers from your systems are pulled into one view on a schedule.",
      "Filters let you cut by date and segment.",
      "A plain-English summary explains the trend, so the report does not need a person to interpret it.",
    ],
    demo: "Change the date range and segment and watch the chart and the written trend summary update together.",
    needs: ["Agreement on the five to ten numbers that matter", "Data that is clean and connected", "A weekly owner for the report"],
    controls: ["Every figure traces back to its source", "The summary only states what the data shows", "Changes in definitions are logged"],
  },
  {
    slug: "pipeline-and-forecast",
    app: "PipelineIQ",
    title: "See your pipeline and forecast without a spreadsheet",
    short: "A drag-and-drop deal board with live totals and a weighted forecast.",
    wave: "second",
    steps: [
      "Deals sit on a board by stage, and moving one updates the totals.",
      "Each stage carries a win-rate weight, so the forecast reflects odds, not just the sum of deals.",
      "The team works from one view instead of separate spreadsheets.",
    ],
    demo: "Drag a deal between stages and watch the stage totals and weighted forecast change.",
    needs: ["Named sales stages and what moves a deal between them", "Deal data in one system", "Honest stage win rates, even if estimated at first"],
    controls: ["Stage rules are written down and visible", "Forecast assumptions are shown, not hidden", "Changes are logged by user"],
  },
  {
    slug: "consistent-client-onboarding",
    app: "Onboard",
    title: "Onboard every new client the same way",
    short: "A staged checklist where finishing one stage unlocks the next and progress is visible to everyone.",
    wave: "second",
    steps: [
      "Your onboarding steps are set up as stages with clear owners.",
      "Finishing a stage unlocks the next, so nothing is skipped.",
      "Progress is visible to the team and can be shared with the client.",
    ],
    demo: "Complete a stage in the checklist and see the next one unlock and the progress bar move.",
    needs: ["Your onboarding steps written in order", "An owner for each step", "A list of what the client must provide"],
    controls: ["Stages cannot be skipped without a recorded reason", "Each step has one named owner", "The checklist is the single source of truth"],
  },
  {
    slug: "sops-to-task-drafts",
    app: "FlowDesk",
    title: "Turn your SOPs into task drafts",
    short: "A task board with an SOP panel that drafts a first pass from the task and the procedure.",
    wave: "second",
    steps: [
      "Tasks live on a board next to the written procedure for that kind of work.",
      "The SOP panel drafts a first pass from the task details and the procedure.",
      "A person reviews and finishes the work, so quality stays with your team.",
    ],
    demo: "Open a task, view its SOP, and generate a first-pass draft from the two together.",
    needs: ["Written SOPs for repeat work", "A task list with clear owners", "Agreement on what a good draft looks like"],
    controls: ["A person reviews every draft", "Drafts cite the SOP they came from", "Outdated SOPs are flagged for update"],
  },
];

export function getLibraryBuild(slug: string) {
  return libraryBuilds.find((b) => b.slug === slug);
}

export function appFor(build: LibraryBuild) {
  return referenceApps.find((a) => a.name === build.app)!;
}

export function needsFor(build: LibraryBuild) {
  return readinessBuilds.find((r) => r.name === build.app)?.needs ?? {};
}
