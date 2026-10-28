/**
 * The single source of truth for every fixed page that is still served from
 * code (blog and case-study indexes). Every other page is a Sanity `page`
 * document with its own SEO and JSON-LD fields.
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
  { title: "Blog", value: "blog" },
  { title: "Case Studies", value: "case-studies" },
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
