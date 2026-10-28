/**
 * Slug rules for Sanity `page` documents. A slug may contain "/" (nested
 * pages); "home" is served at "/". The reserved list mirrors routes that stay
 * in code and the redirects in next.config.ts, which run before routing and
 * would otherwise shadow a page with that slug.
 *
 * Segments in NESTED_ONLY_SEGMENTS are reserved for child paths only: their
 * index is a CMS page, but /<segment>/<slug> stays in code (services/[slug]).
 */
export const RESERVED_FIRST_SEGMENTS = [
  "blog",
  "case-studies",
  "services",
  "salesforce",
  "studio",
  "api",
  "section-thumbs-preview",
  "staff-augmentation",
] as const;

const NESTED_ONLY_SEGMENTS: readonly string[] = ["services"];

/** Exact paths next.config.ts redirects away. */
const REDIRECTED_SLUGS = [
  "platform-expertise/salesforce-education-cloud-consulting",
  "platform-expertise/salesforce-commerce-cloud-consulting",
];

const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function pageSlugError(slug: string): string | null {
  const segments = slug.split("/");
  if (!segments.every((s) => SEGMENT.test(s))) {
    return "Use lower-case words joined by hyphens, with / between levels (e.g. industries/salesforce-health-cloud-consulting).";
  }
  const [first] = segments;
  if (first === "home" && segments.length > 1) return "\"home\" is the homepage and cannot have child pages.";
  const nestedOnly = NESTED_ONLY_SEGMENTS.includes(first);
  if ((RESERVED_FIRST_SEGMENTS as readonly string[]).includes(first) && !(nestedOnly && segments.length === 1)) {
    return `"/${first}" is handled by the site code and cannot be a page.`;
  }
  // next.config.ts redirects /salesforce-* (except the recruitment agency page).
  if (first.startsWith("salesforce-") && first !== "salesforce-recruitment-agency") {
    return "Top-level slugs starting with \"salesforce-\" are redirected to /services. Choose another slug.";
  }
  if (REDIRECTED_SLUGS.includes(slug)) return "This path is redirected elsewhere. Choose another slug.";
  return null;
}

export function slugToPath(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}

/** Route segments → page slug. null means "not a page" (e.g. /home). */
export function segmentsToSlug(segments: string[] | undefined): string | null {
  if (!segments || segments.length === 0) return "home";
  const slug = segments.join("/");
  return slug === "home" ? null : slug;
}

export function slugDepth(slug: string): number {
  return slug.split("/").length;
}
