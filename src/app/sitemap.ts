import type { MetadataRoute } from "next";
import { getBlueprints, getGuides, getUpdates } from "@/lib/content";
import { site } from "@/lib/site";
import { pillars, services } from "@/lib/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/hub", "/blueprints", "/updates", "/services", "/assessment", "/method", "/track-record", "/fractional-coo", "/about", "/contact", "/privacy"];
  const paths = [
    ...staticPaths,
    ...pillars.map((p) => `/hub/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...getBlueprints().map((b) => `/blueprints/${b.slug}`),
    ...getGuides().map((g) => `/guides/${g.slug}`),
    ...getUpdates().map((u) => `/updates/${u.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
