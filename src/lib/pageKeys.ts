/**
 * The single source of truth for every fixed (non-CMS-slug) page on the site.
 *
 * Adding a page here does three things at once:
 *   - widens the `StaticPageKey` union used by `generateStaticPageMetadata`
 *   - adds the option to the "Website page" dropdown on Static page SEO
 *   - adds the option to the "Page" dropdown on Static page JSON-LD
 *
 * When you add a new fixed page, add it here AND call
 * `generateStaticPageMetadata(<key>, fallback)` from that page — the dropdown
 * entry does nothing on its own.
 *
 * No `server-only` import: this module is bundled into the Sanity Studio.
 */
export const STATIC_PAGE_OPTIONS = [
  { title: "Home", value: "home" },
  { title: "About", value: "about" },
  { title: "Services", value: "services" },
  { title: "Platform Expertise", value: "platform-expertise" },
  { title: "Industries", value: "industries" },
  { title: "Blog", value: "blog" },
  { title: "Case Studies", value: "case-studies" },
  { title: "Contact", value: "contact" },
  { title: "Partnership", value: "partnership" },

  // Partnership — partner pages
  { title: "Partnership — FinDock", value: "partnership-findock" },
  { title: "Partnership — Fundraise Up", value: "partnership-fundraise-up" },
  { title: "Partnership — Dotdigital", value: "partnership-dotdigital" },

  // Platform Expertise — internal pages
  {
    title: "Platform Expertise — Sales Cloud",
    value: "salesforce-sales-cloud-consulting",
  },
  {
    title: "Platform Expertise — Service Cloud",
    value: "salesforce-service-cloud-consulting",
  },
  {
    title: "Platform Expertise — Marketing Cloud",
    value: "salesforce-marketing-cloud-consulting",
  },
  {
    title: "Platform Expertise — Experience Cloud",
    value: "salesforce-experience-cloud-consulting",
  },
  {
    title: "Platform Expertise — Data Cloud",
    value: "salesforce-data-cloud-consulting",
  },
  {
    title: "Platform Expertise — Agentforce",
    value: "salesforce-agentforce-consulting",
  },

  // Industries — internal pages
  {
    title: "Industries — Health Cloud",
    value: "salesforce-health-cloud-consulting",
  },
  {
    title: "Industries — Nonprofit",
    value: "salesforce-nonprofit-consulting",
  },
  {
    title: "Industries — Financial Services Cloud",
    value: "salesforce-financial-services-cloud-consulting",
  },
  {
    title: "Industries — Education Cloud",
    value: "salesforce-education-cloud-consulting",
  },
  {
    title: "Industries — Commerce Cloud",
    value: "salesforce-commerce-cloud-consulting",
  },
] as const;

export type StaticPageKey = (typeof STATIC_PAGE_OPTIONS)[number]["value"];

/**
 * Pages that can host a curated blog strip: every static page except the blog
 * and case-study indexes, where a blog grid duplicates the page's own content.
 *
 * The type uses `Exclude` rather than being derived from the filtered array —
 * `.filter()` does not narrow a literal union, so deriving it would silently
 * widen `PageBlogKey` back to every static page key.
 */
const PAGE_BLOG_EXCLUDED: readonly StaticPageKey[] = ["blog", "case-studies"];

export type PageBlogKey = Exclude<StaticPageKey, "blog" | "case-studies">;

export const PAGE_BLOG_OPTIONS = STATIC_PAGE_OPTIONS.filter(
  (option) => !PAGE_BLOG_EXCLUDED.includes(option.value)
);
