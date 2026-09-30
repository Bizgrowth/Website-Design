import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { assessmentAreas } from "@/lib/assessment";
import { referenceApps } from "@/lib/apps";
import { clients } from "@/lib/clients";
import { faqs, offers } from "@/lib/offers";
import { phases } from "@/lib/phases";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";
import { trackRecord } from "@/lib/track-record";

// Builds the chat agent's knowledge base from the same files that generate the website,
// so the agent can never drift from what the site says. Rebuilt on each deploy.

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMarkdown(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      return { slug: file.replace(/\.md$/, ""), data, body: content.trim() };
    });
}

const list = (items: unknown) => (Array.isArray(items) ? items.map(String).join("; ") : "");

let cached: string | undefined;

export function getKnowledgeBase(): string {
  if (cached) return cached;
  const out: string[] = [];

  out.push(
    `# About ${site.name}`,
    `Owner: ${site.owner}. Website: ${site.url}. Tagline: ${site.tagline}`,
    site.intro,
    `Booking link: ${site.bookingUrl}. Email: ${site.email}. Phone: ${site.phone}.`,
    `Core belief: AI can't run what isn't written down. Without written SOPs, documented workflows, and connected data, AI does not create time, margin, or scale. Daniel's edge is operations: he fixes the foundations first, then automates what is left.`,
  );

  out.push(
    "\n# Services (page: /services)",
    ...services.map((s) => `- ${s.name} (/services/${s.slug}): ${s.outcome} ${s.summary} Deliverables: ${list(s.deliverables)}`),
    "- Fractional COO (/fractional-coo): part-time senior operations leadership with AI built into the operating plan.",
  );

  out.push(
    "\n# Pricing (published starting prices only; custom quotes need a call)",
    ...offers.map((o) => `- ${o.name}: ${o.price}, ${o.cadence}. ${o.body} Includes: ${o.points.join("; ")}`),
  );

  out.push("\n# FAQ", ...faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`));

  out.push("\n# Method (page: /method), five phases", ...phases.map((p) => `- ${p.name} (${p.time}): ${p.body}`));

  out.push(
    "\n# AI Hub pillars (page: /hub)",
    ...pillars.map((p) => `- ${p.name} (/hub/${p.slug}): ${p.question} ${p.summary}`),
  );

  out.push(
    "\n# AI Readiness Assessment (page: /assessment)",
    "A free 10-question self-check scored in the browser, then the paid AI Ops Diagnostic. Five areas, scored 0-3 per question: " +
      assessmentAreas.map((a) => `${a.name} (${a.why})`).join(" | ") +
      ". The lowest area caps the result tier (Fix first, Ready to pilot, Ready to scale).",
  );

  out.push(
    "\n# Track record (page: /track-record). Verified executive results only",
    ...trackRecord.headline.map((h) => `- ${h.value}: ${h.label}. ${h.story}`),
    ...trackRecord.roles.map((r) => `- ${r.role}, ${r.company} (${r.years}, ${r.industry}): ${list(r.results)}`),
    `Companies Daniel has worked with (logos on the site; names only, no results are published for them): ${clients.map((c) => c.name).join(", ")}.`,
  );

  out.push(
    "\n# Interactive reference apps (apps.aiopsexpert.com). Demos on sample data, NOT client results",
    ...referenceApps.map((a) => `- ${a.name} (${a.area}): ${a.blurb} ${a.href}`),
  );

  out.push("\n# Blueprints (page: /blueprints). Reference builds, NOT client projects");
  for (const b of readMarkdown("blueprints")) {
    out.push(
      `\n## ${b.data.title} (/blueprints/${b.slug})`,
      `Industry: ${b.data.industry}. Stack: ${list(b.data.stack)}. Summary: ${b.data.summary}`,
      `Governance: ${list(b.data.governance)}. Measures: ${list(b.data.measures)}.`,
      b.data.app ? `Interactive demo: https://apps.aiopsexpert.com/${b.data.app}` : "",
      b.body,
    );
  }

  out.push("\n# Guides (page: /hub)");
  for (const g of readMarkdown("guides")) out.push(`\n## ${g.data.title} (/guides/${g.slug})`, g.body);

  out.push("\n# SMB AI Daily updates (page: /updates), newest first");
  const updates = readMarkdown("updates").sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)));
  for (const u of updates.slice(0, 12)) {
    const date = u.data.date instanceof Date ? u.data.date.toISOString().slice(0, 10) : String(u.data.date);
    out.push(
      `\n## ${u.data.title} (/updates/${u.slug}, ${date})`,
      `Takeaway: ${u.data.takeaway ?? ""}`,
      u.body,
      Array.isArray(u.data.sources) ? `Sources: ${u.data.sources.map((s: { title: string; url: string }) => `${s.title} ${s.url}`).join("; ")}` : "",
    );
  }

  cached = out.filter(Boolean).join("\n");
  return cached;
}
