# Per-page blog strip

**Date:** 2026-08-24
**Status:** approved, ready for implementation planning

## Problem

Marketing pages end with a CTA and nothing else. Published blog posts are
reachable only from `/blog`, so they get no traffic from the pages people
actually land on, and there is no editorial way to put a relevant post in front
of a relevant audience.

Editors already have this capability for case studies: a **Page case studies**
document keyed by page, holding an ordered list of references. This adds the
same thing for posts.

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Selection | Manual, per page | Matches the case-studies pattern editors already know. Relevance is the point: a nonprofit page should be able to show a nonprofit post. |
| Layout | Mirror `ServiceCaseStudiesSection` | Reads as a sibling of the case-studies strip when a page shows both. Already responsive and reduced-motion correct. |
| Page scope | 21 marketing pages | Excludes `/blog`, blog articles, `/case-studies` and case-study articles, where a blog grid is redundant or competes with the page's own content. |
| Empty state | Section hides | Same as case studies. Nothing appears until an editor configures a page. |
| Key list | Reuse `STATIC_PAGE_OPTIONS` | `pageCaseStudies` hardcodes its own list; a third copy is a third thing to drift. |

Rejected: auto-latest-N (no editorial control, which is the feature); auto-by-category
(depends on posts being categorised consistently, unverified); including service
pages (they compose via `sectionOrder` and belong to a separate piece of work).

## Schema — `pageBlogs`

New document type in `src/sanity/schemaTypes/pageBlogs.ts`, registered in
`schemaTypes/index.ts`. Fields mirror `pageCaseStudies` so the form is familiar:

| Field | Type | Rules |
| --- | --- | --- |
| `title` | string | required; internal only |
| `pageKey` | string, dropdown | required |
| `sectionTitle` | string | optional; overrides the default heading |
| `posts` | array of `reference → post` | min 1, max 4 |

Preview: `title` as the heading, `pageKey` as the subtitle.

The dropdown list is `STATIC_PAGE_OPTIONS` from `src/lib/pageKeys.ts` filtered to
drop `blog` and `case-studies` — 21 entries. `pageKeys.ts` carries no
`server-only` import and is already bundled into the Studio, so it imports
cleanly.

Nothing enforces one document per page; that matches how `pageCaseStudies`
behaves today. The query takes `[0]`, so a duplicate is ignored rather than
breaking the page.

## Data layer — `src/lib/pageBlogs.ts`

Mirrors `src/lib/pageCaseStudies.ts`.

```ts
// Derived from the filtered option list, not hand-maintained:
export type PageBlogKey = (typeof PAGE_BLOG_OPTIONS)[number]["value"];

interface PageBlogsResult {
  /** Optional heading override. Undefined falls back to the section default. */
  title?: string;
  /** Empty when no document exists or none are selected — the section then hides. */
  posts: BlogTeaserCard[];
}

export async function getPageBlogs(pageKey: PageBlogKey): Promise<PageBlogsResult>;
```

GROQ goes in `src/sanity/lib/queries.ts` beside `PAGE_CASE_STUDIES_QUERY`, using
the shared `imageProjection`:

```groq
*[_type == "pageBlogs" && pageKey == $pageKey][0] {
  pageKey,
  sectionTitle,
  posts[]->{
    _id, title, slug, excerpt, publishedAt,
    "categories": categories[]->title,   // categories is reference[] → category
    heroImage { ${imageProjection} }
  }
}
```

Fetch tags: `["page-blogs", "posts"]` — so both a config change and an edit to a
referenced post invalidate the page.

`post.heroImage.alt` is `required()` in the schema, so every card gets real
editor-written alt text rather than a hardcoded string.

## Component — `PageBlogsSection`

`src/components/sections/PageBlogsSection.tsx`, built from
`ServiceCaseStudiesSection` and exported from `sections/index.ts`.

```ts
export interface BlogTeaserCard {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  excerpt?: string;
  category?: string;
}

interface PageBlogsSectionProps {
  title?: string;   // default: "Latest from our blog"
  posts: BlogTeaserCard[];
}
```

Same 2-column grid, `Reveal` stagger, rounded image, pill overlay, green pill
button. Differences from the case-studies version:

- the pill shows the post's first **category** rather than a client industry
- a formatted **date** sits above the title
- the button reads **"Read Article"** and links to `/blog/{slug}`
- `alt` comes from `imageAlt`, not the title

Returns `null` when `posts` is empty.

Dates use the existing `formatDate` from `src/lib/format.ts` (en-GB, e.g.
"24 August 2026"), which both blog pages already use. Do not add a second format.

## Wiring

Every one of the 21 pages ends with `<CtaSection>`, so the insertion point is
uniform: immediately above it, guarded by `posts.length > 0`.

Per page:

```tsx
const blogs = await getPageBlogs("<key>");
...
{blogs.posts.length > 0 && (
  <PageBlogsSection title={blogs.title} posts={blogs.posts} />
)}
<CtaSection ... />
```

| Page key | File under `src/app/(site)/` |
| --- | --- |
| `home` | `page.tsx` |
| `about` | `about/page.tsx` |
| `services` | `services/page.tsx` |
| `platform-expertise` | `platform-expertise/page.tsx` |
| `industries` | `industries/page.tsx` |
| `contact` | `contact/page.tsx` |
| `partnership` | `partnership/page.tsx` |
| `partnership-findock` | `partnership/findock/page.tsx` |
| `partnership-fundraise-up` | `partnership/fundraise-up/page.tsx` |
| `partnership-dotdigital` | `partnership/dotdigital/page.tsx` |
| `salesforce-sales-cloud-consulting` | `platform-expertise/salesforce-sales-cloud-consulting/page.tsx` |
| `salesforce-service-cloud-consulting` | `platform-expertise/salesforce-service-cloud-consulting/page.tsx` |
| `salesforce-marketing-cloud-consulting` | `platform-expertise/salesforce-marketing-cloud-consulting/page.tsx` |
| `salesforce-experience-cloud-consulting` | `platform-expertise/salesforce-experience-cloud-consulting/page.tsx` |
| `salesforce-data-cloud-consulting` | `platform-expertise/salesforce-data-cloud-consulting/page.tsx` |
| `salesforce-agentforce-consulting` | `platform-expertise/salesforce-agentforce-consulting/page.tsx` |
| `salesforce-health-cloud-consulting` | `industries/salesforce-health-cloud-consulting/page.tsx` |
| `salesforce-nonprofit-consulting` | `industries/salesforce-nonprofit-consulting/page.tsx` |
| `salesforce-financial-services-cloud-consulting` | `industries/salesforce-financial-services-cloud-consulting/page.tsx` |
| `salesforce-education-cloud-consulting` | `industries/salesforce-education-cloud-consulting/page.tsx` |
| `salesforce-commerce-cloud-consulting` | `industries/salesforce-commerce-cloud-consulting/page.tsx` |

`contact/page.tsx` is the only sync page component; it becomes `async`. The other
20 already are.

## Revalidation

`src/app/api/revalidate/route.ts` gains a branch beside the existing
`pageCaseStudies` one:

```ts
if (body._type === "pageBlogs") {
  revalidateTag("page-blogs");
}
```

Publishing a post already fires `revalidateTag("posts")`, which the second fetch
tag picks up, so edits to a referenced post reach these strips without extra work.

## Verification

The only real logic is "hide when empty", so that is what gets a test:

- `PageBlogsSection` renders nothing for `posts: []`
- renders one card per post, with the right href, alt, and category, for a
  populated array

Then a live check once a document exists: one configured page shows the strip
above the CTA, one unconfigured page shows nothing and is otherwise unchanged.
Only Sanity can produce this data, so the live check cannot be automated here.

`pnpm type-check`, `pnpm lint`, and the existing Playwright suite must stay green
— the 21 page edits are the main regression risk.

## Out of scope

- Service pages (`/services/[slug]`) — they compose through `sectionOrder`; that
  is task #3.
- `/blog`, blog articles, `/case-studies`, case-study articles.
- Any automatic or category-driven selection.
- Backfilling the 21 documents. The section stays hidden until an editor creates
  them, and that is expected: the feature ships dark and lights up per page.

## Follow-ups noted, not included

- `pageCaseStudies` still hardcodes its own page list. Once `pageBlogs` proves
  the shared-list approach, that one could move to `STATIC_PAGE_OPTIONS` too.
- Enforcing one document per `pageKey` would help both types, and neither has it.
