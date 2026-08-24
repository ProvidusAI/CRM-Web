# Per-Page Blog Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let editors pick blog posts per marketing page in Sanity and render them as a strip directly above the footer CTA on 21 pages.

**Architecture:** A new `pageBlogs` Sanity document keyed by `pageKey` holds an ordered list of post references — the same shape as the existing `pageCaseStudies`. A `getPageBlogs()` helper fetches and maps it to plain card data, and a `PageBlogsSection` component (built from `ServiceCaseStudiesSection`) renders it. The section hides itself when no document exists, so the feature ships dark and lights up per page as editors configure it.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, Sanity CMS, Playwright, `tsx` for script-style assertions.

**Spec:** `docs/superpowers/specs/2026-08-24-page-blogs-design.md`

## Global Constraints

- Package manager is **pnpm**. Never run `npm install` — it ignores `pnpm-lock.yaml` and `pnpm-workspace.yaml`.
- **No `any`.** TypeScript strict mode is on and `as any` casts have been deliberately removed from this codebase.
- All typography goes through `<Heading>` / `<Text>` from `@/components/ui/Typography`. Never a raw `<h1>`/`<p>` with inline styles.
- Server components are the default. Add `"use client"` only where hooks or browser APIs are needed.
- Every `sanityFetch` call must pass `tags`.
- New sections are exported from `src/components/sections/index.ts`.
- Compose class names with `cn()` from `@/lib/utils`.
- Content is optional at build time: `isSanityConfigured` is false without env vars and `sanityFetch` returns `null`. Every consumer must render an empty state rather than throw.
- Dates use `formatDate` from `src/lib/format.ts`. Do not add a second date format.
- Default section heading: **"Latest from our blog"**. Button label: **"Read Article"**.
- Post count per page: **min 1, max 4**.
- Image fallback when a post has no hero image: **`/images/case-study.webp`** (what `/blog` already uses).

---

## File Structure

| File | Responsibility |
| --- | --- |
| `src/lib/pageKeys.ts` (modify) | Adds `PAGE_BLOG_OPTIONS` (runtime dropdown list) and `PageBlogKey` (exact type). Single source of truth for which pages can host a blog strip. |
| `src/sanity/schemaTypes/pageBlogs.ts` (create) | The `pageBlogs` document type. |
| `src/sanity/schemaTypes/index.ts` (modify) | Registers the new type. |
| `src/sanity/lib/queries.ts` (modify) | `PAGE_BLOGS_QUERY`. |
| `src/sanity/lib/types.ts` (modify) | `PageBlogPost`, `PageBlogs` response types. |
| `src/lib/blogTeaserCards.ts` (create) | `toBlogTeaserCards()` — pure mapping, **no `server-only`** so it stays importable by the check script. |
| `src/lib/pageBlogs.ts` (create) | `getPageBlogs()` — fetch, then delegate to `toBlogTeaserCards()`. |
| `src/components/sections/PageBlogsSection.tsx` (create) | Renders the card grid. Returns `null` when empty. |
| `src/components/sections/index.ts` (modify) | Barrel export. |
| `src/app/api/revalidate/route.ts` (modify) | Maps `pageBlogs` edits to `revalidateTag("page-blogs")`. |
| 21 page files under `src/app/(site)/` (modify) | Fetch and render the section above `<CtaSection>`. |
| `scripts/check-page-blogs.ts` (create) | `tsx`-run assertions for the pure logic. No new dependency. |
| `tests/page-blogs.spec.ts` (create) | Playwright guard: the section is absent on an unconfigured page. |
| `SANITY.md` (modify) | Documents the new content model. |

**On testing:** this repo has no unit-test runner — `pnpm test` is Playwright E2E only. Rather than add one, pure logic is asserted by a `tsx` script (matching the existing `scripts/*.ts` + `tsx` precedent used by `perf:guard`), and rendering behaviour is covered by Playwright. Do not add Vitest or Jest.

**Why the mapper is its own module:** `tsx` cannot load any module that reaches
`import "server-only"` — it fails with `Cannot find module 'server-only'`, since
that package only resolves inside the Next build. `src/lib/pageBlogs.ts` calls
`sanityFetch`, which is `server-only`, so the check script can never import it.
The pure mapper therefore lives in `src/lib/blogTeaserCards.ts`, whose only
imports are **type-only** — `tsx` erases those, so nothing is resolved at
runtime. This is verified working; do not merge the two modules back together or
the check script stops running.

---

### Task 1: Shared page key list

Both the Sanity schema and the data layer need the same list of eligible pages. This task creates it once so the two cannot drift.

**Files:**
- Modify: `src/lib/pageKeys.ts` (append after the existing `StaticPageKey` export)
- Create: `scripts/check-page-blogs.ts`

**Interfaces:**
- Consumes: `STATIC_PAGE_OPTIONS`, `StaticPageKey` (already exported from `src/lib/pageKeys.ts`)
- Produces: `PAGE_BLOG_OPTIONS: { title: string; value: string }[]` and `type PageBlogKey` — used by Task 2 (schema dropdown) and Task 3 (fetch signature)

- [ ] **Step 1: Write the failing assertions**

Create `scripts/check-page-blogs.ts`:

```ts
import { PAGE_BLOG_OPTIONS, STATIC_PAGE_OPTIONS } from "../src/lib/pageKeys";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

// The blog and case-study indexes are deliberately excluded — a blog grid
// there is redundant. Comparing against STATIC_PAGE_OPTIONS.length rather than
// a hardcoded 21 keeps this passing when a new static page is added.
check(
  "excludes exactly two pages",
  PAGE_BLOG_OPTIONS.length === STATIC_PAGE_OPTIONS.length - 2,
  `expected ${STATIC_PAGE_OPTIONS.length - 2}, got ${PAGE_BLOG_OPTIONS.length}`
);

for (const excluded of ["blog", "case-studies"]) {
  check(
    `omits "${excluded}"`,
    !PAGE_BLOG_OPTIONS.some((option) => option.value === excluded),
    `"${excluded}" is still in the list`
  );
}

check(
  "every option has a title and value",
  PAGE_BLOG_OPTIONS.every((option) => Boolean(option.title && option.value)),
  "at least one option is missing a title or value"
);

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(`PASS  ${PAGE_BLOG_OPTIONS.length} blog-eligible pages`);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm exec tsx scripts/check-page-blogs.ts`

Expected: FAIL — a TypeScript/module error, because `PAGE_BLOG_OPTIONS` does not exist yet.

- [ ] **Step 3: Add the list and type**

Append to `src/lib/pageKeys.ts`, after the existing `export type StaticPageKey` line:

```ts
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
```

- [ ] **Step 4: Run it to verify it passes**

Run: `pnpm exec tsx scripts/check-page-blogs.ts`

Expected: `PASS  21 blog-eligible pages`

- [ ] **Step 5: Type-check**

Run: `pnpm type-check`

Expected: no output (success).

- [ ] **Step 6: Commit**

```bash
git add src/lib/pageKeys.ts scripts/check-page-blogs.ts
git commit -m "feat: add the blog-eligible page key list"
```

---

### Task 2: Sanity schema

**Files:**
- Create: `src/sanity/schemaTypes/pageBlogs.ts`
- Modify: `src/sanity/schemaTypes/index.ts`
- Modify: `src/app/api/revalidate/route.ts`
- Modify: `SANITY.md`

**Interfaces:**
- Consumes: `PAGE_BLOG_OPTIONS` from `src/lib/pageKeys.ts` (Task 1)
- Produces: a `pageBlogs` document type with fields `title`, `pageKey`, `sectionTitle`, `posts`; and the cache tag string `"page-blogs"` used by Task 3

- [ ] **Step 1: Create the schema**

Create `src/sanity/schemaTypes/pageBlogs.ts`:

```ts
import { defineField, defineType } from "sanity";

import { PAGE_BLOG_OPTIONS } from "@/lib/pageKeys";

export const pageBlogs = defineType({
  name: "pageBlogs",
  title: "Page blogs",
  type: "document",
  description:
    "Choose which blog posts appear on a specific page, above the closing call to action. Leave a page unconfigured to hide the section there.",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Only used inside Sanity.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Website page",
      type: "string",
      description: "The page these blog posts will appear on.",
      options: {
        list: PAGE_BLOG_OPTIONS,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      type: "string",
      description:
        "Optional. Overrides the default heading shown above the posts.",
    }),
    defineField({
      name: "posts",
      title: "Blog posts",
      type: "array",
      description:
        "Select and order the posts shown on this page. Leave empty to hide the section.",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
```

- [ ] **Step 2: Register the type**

In `src/sanity/schemaTypes/index.ts`, add the import beside the existing `pageCaseStudies` import:

```ts
import { pageBlogs } from "./pageBlogs";
```

and add `pageBlogs,` to the `schemaTypes` array, immediately after `pageCaseStudies,`.

- [ ] **Step 3: Wire cache invalidation**

In `src/app/api/revalidate/route.ts`, immediately after the existing `pageCaseStudies` block, add:

```ts
  if (body._type === "pageBlogs") {
    revalidateTag("page-blogs");
  }
```

- [ ] **Step 4: Document the model**

In `SANITY.md`, add a short entry beside the existing "Page case studies" description, matching the surrounding prose style:

```markdown
### Page blogs

Selects blog posts for a single page, keyed by `pageKey`. Rendered above the
closing CTA. One to four posts. A page with no document hides the section.
Editing a `pageBlogs` document revalidates the `page-blogs` tag; publishing a
referenced post revalidates `posts`, which these pages also subscribe to.
```

- [ ] **Step 5: Verify the Studio compiles**

Run: `pnpm type-check && pnpm lint`

Expected: no type errors; `✔ No ESLint warnings or errors`.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemaTypes/pageBlogs.ts src/sanity/schemaTypes/index.ts src/app/api/revalidate/route.ts SANITY.md
git commit -m "feat: add the pageBlogs Sanity document type"
```

---

### Task 3: Query, types, and data layer

**Files:**
- Modify: `src/sanity/lib/queries.ts`
- Modify: `src/sanity/lib/types.ts`
- Create: `src/lib/blogTeaserCards.ts`
- Create: `src/lib/pageBlogs.ts`
- Modify: `scripts/check-page-blogs.ts`

**Interfaces:**
- Consumes: `PageBlogKey` (Task 1); tag `"page-blogs"` (Task 2); `sanityFetch`, `SanityImage`, `SanitySlug` (existing)
- Produces:
  - `toBlogTeaserCards(posts?: PageBlogPost[]): BlogTeaserCard[]` — pure, in `src/lib/blogTeaserCards.ts`, exported for the check script
  - `getPageBlogs(pageKey: PageBlogKey): Promise<{ title?: string; posts: BlogTeaserCard[] }>`
  - `interface BlogTeaserCard { title: string; slug: string; image: string; imageAlt: string; publishedAt: string; category?: string }` — declared in `src/components/sections/PageBlogsSection.tsx` by Step 1 below, per the codebase rule that a section owns and exports its own item type. Task 4 fills in the component around it and must not change this shape.

  The card carries no `excerpt`: the layout mirrors `ServiceCaseStudiesSection`, which shows image, category, date, title and button only. Nothing would render it.

- [ ] **Step 1: Add the GROQ query**

In `src/sanity/lib/queries.ts`, add after `PAGE_CASE_STUDIES_QUERY`:

```ts
export const PAGE_BLOGS_QUERY = defineQuery(`
  *[_type == "pageBlogs" && pageKey == $pageKey][0] {
    pageKey,
    sectionTitle,
    posts[]->{
      _id,
      title,
      slug,
      publishedAt,
      "categories": categories[]->title,
      heroImage {
        ${imageProjection}
      }
    }
  }
`);
```

- [ ] **Step 2: Add the response types**

In `src/sanity/lib/types.ts`, add beside the existing `PageCaseStudies` interface:

```ts
export interface PageBlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  /** Projected to plain strings by the query: categories[]->title */
  categories?: string[];
  heroImage?: SanityImage;
}

export interface PageBlogs {
  pageKey: string;
  sectionTitle?: string;
  posts?: PageBlogPost[];
}
```

- [ ] **Step 3: Write the failing assertions for the mapper**

Append to `scripts/check-page-blogs.ts`, above the final `if (failures.length > 0)` block:

```ts
import { toBlogTeaserCards } from "../src/lib/blogTeaserCards";
import type { PageBlogPost } from "../src/sanity/lib/types";

const samplePost: PageBlogPost = {
  _id: "post-1",
  title: "Migrating from Magento",
  slug: { current: "migrating-from-magento" },
  publishedAt: "2026-08-01T00:00:00Z",
  categories: ["Commerce", "Migration"],
  heroImage: {
    alt: "A storefront dashboard",
    asset: { _id: "image-1", url: "https://cdn.example/hero.webp" },
  },
};

const mapped = toBlogTeaserCards([samplePost]);

check("maps one card per post", mapped.length === 1, `got ${mapped.length}`);
check("flattens the slug", mapped[0]?.slug === "migrating-from-magento", `got ${mapped[0]?.slug}`);
check("uses the hero image url", mapped[0]?.image === "https://cdn.example/hero.webp", `got ${mapped[0]?.image}`);
check("uses the editor's alt text", mapped[0]?.imageAlt === "A storefront dashboard", `got ${mapped[0]?.imageAlt}`);
check("takes only the first category", mapped[0]?.category === "Commerce", `got ${mapped[0]?.category}`);

// A post whose hero image was never uploaded must not produce an empty src.
const bare: PageBlogPost = { ...samplePost, heroImage: undefined, categories: undefined };
const mappedBare = toBlogTeaserCards([bare]);
check("falls back to the placeholder image", mappedBare[0]?.image === "/images/case-study.webp", `got ${mappedBare[0]?.image}`);
check("falls back to the title for alt", mappedBare[0]?.imageAlt === "Migrating from Magento", `got ${mappedBare[0]?.imageAlt}`);
check("leaves category undefined", mappedBare[0]?.category === undefined, `got ${mappedBare[0]?.category}`);

// sanityFetch returns null when Sanity is not configured.
check("handles undefined input", toBlogTeaserCards(undefined).length === 0, "expected an empty array");
```

- [ ] **Step 4: Run it to verify it fails**

Run: `pnpm exec tsx scripts/check-page-blogs.ts`

Expected: FAIL — module not found, because `src/lib/blogTeaserCards.ts` does not exist yet.

- [ ] **Step 5: Write the pure mapper**

Create `src/lib/blogTeaserCards.ts`. Every import here must stay **type-only** —
a value import would drag `server-only` in and break `scripts/check-page-blogs.ts`:

```ts
import type { BlogTeaserCard } from "@/components/sections/PageBlogsSection";
import type { PageBlogPost } from "@/sanity/lib/types";

/**
 * Maps the Sanity response onto card props.
 *
 * Deliberately kept out of `pageBlogs.ts`: that module is `server-only`, which
 * cannot be loaded by `tsx`, and this logic needs a runnable check.
 */
export function toBlogTeaserCards(posts?: PageBlogPost[]): BlogTeaserCard[] {
  return (posts ?? []).map((post) => ({
    title: post.title,
    slug: post.slug.current,
    image: post.heroImage?.asset?.url ?? "/images/case-study.webp",
    imageAlt: post.heroImage?.alt ?? post.title,
    publishedAt: post.publishedAt,
    category: post.categories?.[0],
  }));
}
```

- [ ] **Step 6: Write the fetch layer**

Create `src/lib/pageBlogs.ts`:

```ts
import "server-only";

import type { BlogTeaserCard } from "@/components/sections/PageBlogsSection";
import { toBlogTeaserCards } from "@/lib/blogTeaserCards";
import type { PageBlogKey } from "@/lib/pageKeys";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PAGE_BLOGS_QUERY } from "@/sanity/lib/queries";
import type { PageBlogs } from "@/sanity/lib/types";

interface PageBlogsResult {
  /** Optional heading override. Undefined falls back to the section default. */
  title?: string;
  /** Empty when no document exists or none are selected — the section then hides. */
  posts: BlogTeaserCard[];
}

/**
 * Fetches the blog posts an editor selected for a given page in Sanity
 * ("Page blogs" document, keyed by pageKey).
 */
export async function getPageBlogs(
  pageKey: PageBlogKey
): Promise<PageBlogsResult> {
  const data = await sanityFetch<PageBlogs>({
    query: PAGE_BLOGS_QUERY,
    params: { pageKey },
    tags: ["page-blogs", "posts"],
  });

  return { title: data?.sectionTitle, posts: toBlogTeaserCards(data?.posts) };
}
```

- [ ] **Step 7: Create the card interface**

Both new lib modules import `BlogTeaserCard` as a type from the section that
owns it, so that file must exist before the type-check runs. Create
`src/components/sections/PageBlogsSection.tsx` containing exactly this, and
nothing else — Task 4 builds the component around it:

```ts
export interface BlogTeaserCard {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  category?: string;
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `pnpm exec tsx scripts/check-page-blogs.ts`

Expected: `PASS  21 blog-eligible pages`, with no `FAIL` lines.

- [ ] **Step 9: Type-check and lint**

Run: `pnpm type-check && pnpm lint`

Expected: no type errors; `✔ No ESLint warnings or errors`.

- [ ] **Step 10: Commit**

```bash
git add src/sanity/lib/queries.ts src/sanity/lib/types.ts src/lib/blogTeaserCards.ts src/lib/pageBlogs.ts src/components/sections/PageBlogsSection.tsx scripts/check-page-blogs.ts
git commit -m "feat: fetch and map per-page blog selections"
```

---

### Task 4: The section component, wired into the home page

Wiring one page here gives the component a real, runnable test — the Playwright guard proves it stays invisible until an editor configures a page.

**Files:**
- Modify: `src/components/sections/PageBlogsSection.tsx` (created as an interface-only stub in Task 3, Step 6)
- Modify: `src/components/sections/index.ts`
- Modify: `src/app/(site)/page.tsx`
- Create: `tests/page-blogs.spec.ts`

**Interfaces:**
- Consumes: `getPageBlogs` (Task 3); `formatDate` from `@/lib/format`; `Container`, `Section`, `Heading`, `Text`, `Reveal` (existing)
- Produces: `PageBlogsSection` component and the exported `BlogTeaserCard` interface that Task 3 imports

- [ ] **Step 1: Write the failing Playwright guard**

Create `tests/page-blogs.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

// The section is editor-driven: it must stay completely absent on any page
// with no "Page blogs" document, rather than rendering an empty heading.
test.describe("Per-page blog strip", () => {
  test("is absent on an unconfigured page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /latest from our blog/i })
    ).toHaveCount(0);
  });

  test("does not break the closing CTA", async ({ page }) => {
    await page.goto("/");
    // The home page renders <CtaSection /> with no title prop, so this is
    // CtaSection's built-in default heading.
    await expect(
      page.getByRole("heading", { name: /explore how we align your crm systems/i })
    ).toBeVisible();
  });
});
```

- [ ] **Step 2: Run it to verify the second test fails**

Run: `pnpm exec playwright test tests/page-blogs.spec.ts`

Expected: both pass. The first passes trivially (nothing renders yet); the second passes because the home page already ends with that CTA. This second test is the regression guard for Task 5 — it must keep passing after 20 more pages are edited.

- [ ] **Step 3: Write the component**

Replace the stub at `src/components/sections/PageBlogsSection.tsx` with the
full file. The `BlogTeaserCard` interface is unchanged from the stub:

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";

export interface BlogTeaserCard {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  category?: string;
}

interface PageBlogsSectionProps {
  title?: string;
  posts: BlogTeaserCard[];
}

export function PageBlogsSection({
  title = "Latest from our blog",
  posts,
}: PageBlogsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container size="xl">
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mt-5 text-black">
            {title}
          </Heading>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal
              key={post.slug}
              direction="up"
              delay={index * 0.08}
              width="100%"
            >
              <article className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[1.95/1] overflow-hidden rounded-[10px] bg-brand-blue-light"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.category && (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-2 font-body text-[12px] text-black shadow-sm">
                      {post.category}
                    </span>
                  )}
                </Link>

                <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    <Text variant="p4" className="text-brand-blue">
                      {formatDate(post.publishedAt)}
                    </Text>
                    <Heading
                      as="h3"
                      level="h4"
                      className="mt-2 max-w-lg text-black"
                    >
                      {post.title}
                    </Heading>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 font-body text-[12px] font-medium text-white transition-transform hover:scale-105"
                  >
                    Read Article
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Export it**

In `src/components/sections/index.ts`, add beside the other exports:

```ts
export { PageBlogsSection } from "./PageBlogsSection";
```

- [ ] **Step 5: Wire the home page**

In `src/app/(site)/page.tsx`:

1. Add to the `@/components/sections` import list: `PageBlogsSection`
2. Add the import: `import { getPageBlogs } from "@/lib/pageBlogs";`
3. Inside the default export function, beside the other awaits:

```tsx
  const blogs = await getPageBlogs("home");
```

4. Immediately **above** the closing `<CtaSection ... />`:

```tsx
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
```

- [ ] **Step 6: Run the guard and the full suite**

Run: `pnpm exec playwright test tests/page-blogs.spec.ts && pnpm test`

Expected: the new spec passes (the section is still absent — no document exists), and the pre-existing suite stays green.

- [ ] **Step 7: Type-check, lint, build**

Run: `pnpm type-check && pnpm lint && pnpm build`

Expected: no type errors; `✔ No ESLint warnings or errors`; build completes.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/PageBlogsSection.tsx src/components/sections/index.ts "src/app/(site)/page.tsx" tests/page-blogs.spec.ts
git commit -m "feat: add the per-page blog strip section"
```

---

### Task 5: Wire the remaining 20 pages

Mechanical repetition of the Task 4 Step 5 edit. `contact/page.tsx` additionally becomes `async` — it is the only sync page component of the 21.

**Files:** modify each of the following, with the `pageKey` shown.

| `pageKey` | File under `src/app/(site)/` |
| --- | --- |
| `about` | `about/page.tsx` |
| `services` | `services/page.tsx` |
| `platform-expertise` | `platform-expertise/page.tsx` |
| `industries` | `industries/page.tsx` |
| `contact` | `contact/page.tsx` — **also convert to `async`** |
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

**Interfaces:**
- Consumes: `getPageBlogs` (Task 3), `PageBlogsSection` (Task 4)
- Produces: nothing new

- [ ] **Step 1: Apply the same four edits to each page**

For every row in the table above, in that file:

1. Add `PageBlogsSection` to the existing `from "@/components/sections"` import list.
2. Add `import { getPageBlogs } from "@/lib/pageBlogs";`
3. Inside the page component: `const blogs = await getPageBlogs("<pageKey from the table>");`
4. Immediately above the closing `<CtaSection ... />`:

```tsx
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
```

Do not reorder or otherwise modify existing sections.

- [ ] **Step 2: Convert `/contact` to async**

In `src/app/(site)/contact/page.tsx`, change:

```tsx
export default function ContactPage() {
```

to:

```tsx
export default async function ContactPage() {
```

The function is named `ContactPage` and is declared at `src/app/(site)/contact/page.tsx:15`.

- [ ] **Step 3: Verify every page compiles and still renders**

Run: `pnpm type-check && pnpm lint && pnpm build`

Expected: no type errors; `✔ No ESLint warnings or errors`; build completes with all 21 routes listed.

- [ ] **Step 4: Confirm no page lost its CTA**

Run:

```bash
for f in $(grep -rl "getPageBlogs" "src/app/(site)"); do
  grep -q "CtaSection" "$f" || echo "MISSING CTA: $f"
done; echo "checked"
```

Expected: `checked` with no `MISSING CTA` lines.

- [ ] **Step 5: Run the full suite**

Run: `pnpm test`

Expected: all specs pass, including `tests/page-blogs.spec.ts`.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(site)"
git commit -m "feat: render the blog strip on the remaining marketing pages"
```

---

### Task 6: Live verification

The mapping and the hidden state are covered by the checks above. What no automated test in this repo can cover is the populated state, because only Sanity can produce that data.

**Files:** none — this task changes no code.

**Interfaces:**
- Consumes: everything from Tasks 1–5
- Produces: nothing

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

Expected: server on `http://localhost:3002`.

- [ ] **Step 2: Create a document in the Studio**

At `http://localhost:3002/studio`, create a **Page blogs** document:
- Internal title: `Home — blogs`
- Website page: `Home`
- Blog posts: pick two published posts
- Publish

- [ ] **Step 3: Confirm the strip appears**

Load `http://localhost:3002/`. Expected: two cards directly above the closing CTA, each showing a date, a category pill, the post title, and a "Read Article" button linking to `/blog/<slug>`.

- [ ] **Step 4: Confirm alt text comes from the CMS**

In the browser devtools, inspect a card image. Expected: `alt` matches the alt text set on that post's hero image in Sanity — not the post title, unless the post genuinely has no hero image.

- [ ] **Step 5: Confirm an unconfigured page is untouched**

Load `http://localhost:3002/about`. Expected: no blog strip, and the page is otherwise identical to before this work.

- [ ] **Step 6: Confirm the heading override works**

Set **Section heading** on the document to `Insights for retailers`, publish, reload the home page. Expected: the heading changes. Clear it and confirm it reverts to "Latest from our blog".

---

## Rollout note

Nothing appears on the site until an editor creates the first `pageBlogs`
document. Merging and deploying this is safe with zero content — all 21 pages
render exactly as they do today.
