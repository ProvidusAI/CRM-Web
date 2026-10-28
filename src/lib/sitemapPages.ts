import type { MetadataRoute } from "next";
import { slugDepth, slugToPath } from "@/lib/pagePaths";

// Kept out of sitemap.ts: that file imports the server-only Sanity client, so
// it cannot be loaded by the Playwright unit specs.
//
// Priorities are depth-based: home is weekly/1, top-level pages 0.8 and nested
// pages 0.7 (both monthly). They no longer mirror the old hard-coded entries,
// which had bespoke values (partnership, contact, privacy-policy). The home page
// is "/" and is never listed as "/home". Preview pages and pages marked
// noIndex are excluded.
// ponytail: a depth rule cannot express per-page priority; add a priority field
// to the page document if it matters.
export function sitemapPageEntries(
  pages: { slug: string; _updatedAt?: string; noIndex?: boolean }[]
): MetadataRoute.Sitemap {
  return pages
    .filter((p) => !p.slug.startsWith("preview/") && !p.noIndex)
    .map((p) => ({
      url: `https://providuscrm.co.uk${slugToPath(p.slug)}`,
      lastModified: new Date(p._updatedAt || Date.now()),
      changeFrequency: p.slug === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: p.slug === "home" ? 1 : slugDepth(p.slug) === 1 ? 0.8 : 0.7,
    }));
}
