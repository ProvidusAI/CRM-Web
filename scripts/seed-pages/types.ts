import type { JsonLdValue } from "../../src/lib/jsonLd";

export interface ImagePlaceholder { __seedImage: string; alt?: string }
export type SeedSection = { _type: string } & Record<string, unknown>;

export interface SeedPage {
  slug: string;
  title: string;
  /** Key used by staticPageSeo / sitePageJsonLd / pageBlogs / pageCaseStudies. */
  legacyKey?: string;
  clipOverflowX?: boolean;
  seoFallback: { title: string; description?: string; image?: string };
  jsonLdFallback?: JsonLdValue;
  sections: SeedSection[];
}

export interface LegacyEntry {
  seo?: Record<string, unknown>;
  jsonLd?: { enabled?: boolean; schemaJson?: string };
}
export type LegacyValues = Record<string, LegacyEntry>;
