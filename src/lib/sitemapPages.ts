import type { MetadataRoute } from "next";
import { slugDepth, slugToPath } from "@/lib/pagePaths";

// Kept out of sitemap.ts: that file imports the server-only Sanity client, so
// it cannot be loaded by the Playwright unit specs.
//
// Values match the hard-coded entries: home is weekly/1, top-level pages are
// 0.8 and nested pages 0.7 (both monthly). The home page is "/" and is never
// listed as "/home". Preview pages are excluded.
// ponytail: partnership (0.7), contact (0.6) and privacy-policy (0.3 yearly) had
// bespoke values; a depth rule cannot express that, so add a priority field to
// the page document if it matters.
export function sitemapPageEntries(pages: { slug: string; _updatedAt?: string }[]): MetadataRoute.Sitemap {
  return pages
    .filter((p) => !p.slug.startsWith("preview/"))
    .map((p) => ({
      url: `https://providuscrm.co.uk${slugToPath(p.slug)}`,
      lastModified: new Date(p._updatedAt || Date.now()),
      changeFrequency: p.slug === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: p.slug === "home" ? 1 : slugDepth(p.slug) === 1 ? 0.8 : 0.7,
    }));
}
