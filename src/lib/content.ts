import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { PillarSlug } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "content");

type Source = { title: string; url: string };

type BaseEntry = {
  slug: string;
  title: string;
  summary: string;
  pillars: PillarSlug[];
  html: string;
};

export type Blueprint = BaseEntry & {
  kind: "blueprint";
  industry: string;
  stack: string[];
  governance: string[];
  measures: string[];
  repo?: string;
  loom?: string;
  order: number;
};

export type Update = BaseEntry & {
  kind: "update";
  date: string;
  takeaway: string;
  sources: Source[];
};

export type Guide = BaseEntry & {
  kind: "guide";
  date: string;
  readingMinutes: number;
};

function readCollection(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        data,
        html: marked.parse(content, { async: false }) as string,
        words: content.split(/\s+/).length,
      };
    });
}

// gray-matter parses unquoted YAML dates into Date objects; normalize to YYYY-MM-DD.
const toDateString = (value: unknown) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");

export function getBlueprints(): Blueprint[] {
  return readCollection("blueprints")
    .map(({ slug, data, html }) => ({
      kind: "blueprint" as const,
      slug,
      html,
      title: data.title,
      summary: data.summary,
      pillars: data.pillars ?? [],
      industry: data.industry ?? "Cross-industry",
      stack: data.stack ?? [],
      governance: data.governance ?? [],
      measures: data.measures ?? [],
      repo: data.repo,
      loom: data.loom,
      order: data.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getUpdates(): Update[] {
  return readCollection("updates")
    .map(({ slug, data, html }) => ({
      kind: "update" as const,
      slug,
      html,
      title: data.title,
      summary: data.summary,
      takeaway: data.takeaway ?? "",
      pillars: data.pillars ?? [],
      date: toDateString(data.date),
      sources: data.sources ?? [],
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getGuides(): Guide[] {
  return readCollection("guides")
    .map(({ slug, data, html, words }) => ({
      kind: "guide" as const,
      slug,
      html,
      title: data.title,
      summary: data.summary,
      pillars: data.pillars ?? [],
      date: toDateString(data.date),
      readingMinutes: Math.max(1, Math.round(words / 220)),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getBlueprint = (slug: string) => getBlueprints().find((b) => b.slug === slug);
export const getUpdate = (slug: string) => getUpdates().find((u) => u.slug === slug);
export const getGuide = (slug: string) => getGuides().find((g) => g.slug === slug);

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
