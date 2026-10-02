import type { MetadataRoute } from "next";
import { getBlueprints, getGuides, getUpdates } from "@/lib/content";
import { libraryBuilds } from "@/lib/builds";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/hub", "/builds", "/blueprints", "/updates", "/services", "/assessment", "/method", "/track-record", "/fractional-coo", "/about", "/contact", "/privacy"];
  const paths = [
    ...staticPaths,
    ...pillars.map((p) => `/hub/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...libraryBuilds.map((b) => `/builds/${b.slug}`),
    ...getBlueprints().map((b) => `/blueprints/${b.slug}`),
    ...getGuides().map((g) => `/guides/${g.slug}`),
    ...getUpdates().map((u) => `/updates/${u.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
