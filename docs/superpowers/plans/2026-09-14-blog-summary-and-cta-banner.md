# Blog Summary Card and Inline CTA Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give blog posts an editor-filled Summary card fixed at the top of the body and a "CTA banner" block editors can insert anywhere in the body.

**Architecture:** Two new optional string fields on the Sanity `post` document feed a `BlogSummaryCard` server component rendered above `PortableContent` on the blog page. A new `ctaBanner` object in the shared `blockContent` array renders through `PortableContent`'s `types` map via a `BlogCtaBanner` component. Both buttons are fixed "Let's Connect" → `/contact`.

**Tech Stack:** Next.js 15 App Router, React 19 server components, TypeScript strict, Tailwind v4 (`@theme` tokens in `src/styles/globals.css`), Sanity v3 schema + GROQ, `@portabletext/react`, Playwright, `tsx` check scripts.

**Spec:** `docs/superpowers/specs/2026-09-14-blog-summary-and-cta-banner-design.md`

## Global Constraints

- Package manager is **pnpm**. Never run `pnpm build` while `pnpm dev` is running (they share `.next`).
- A dev server is usually already running on `:3002`; Playwright reuses it.
- All typography through `<Heading>` / `<Text>` from `@/components/ui/Typography`; never raw `<h*>`/`<p>` with size classes.
- No raw hex in components — colours come from `@theme` tokens in `src/styles/globals.css`. Compose classes with `cn()` from `@/lib/utils`.
- No `any`. Server components by default; `"use client"` only for hooks/browser APIs.
- Buttons on both cards are fixed: label `Let's Connect`, href `/contact`, via `<Link href="/contact"><CtaButton variant="filled" size="sm">Let's Connect</CtaButton></Link>`.
- Summary card renders only when **both** `summaryHeading` and `summaryText` are non-blank after `trim()`.
- Badge assets are fixed: `/images/salesforce-partner.webp` and `/images/certified-badges/1.webp` … `9.webp` (nine, not ten).
- Commit after every task. End commit messages with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## File structure

| File | Responsibility |
| --- | --- |
| `src/sanity/schemaTypes/post.ts` (modify) | Two new optional summary fields in a "Summary card" group. |
| `src/sanity/schemaTypes/blockContent.ts` (modify) | New `ctaBanner` array member (heading + image). |
| `src/sanity/lib/queries.ts` (modify) | `BLOG_POST_QUERY` projects the summary fields and expands the banner image. |
| `src/sanity/lib/types.ts` (modify) | `BlogPost` summary fields; `CtaBannerBlock` value type. |
| `src/styles/globals.css` (modify) | Four gradient colour tokens. |
| `src/components/sanity/BlogSummaryCard.tsx` (create) | The blue summary panel; exports `splitParagraphs`. |
| `src/components/sanity/BlogCtaBanner.tsx` (create) | The dark inline banner. |
| `src/components/sanity/PortableContent.tsx` (modify) | Registers `ctaBanner` in `types`. |
| `src/app/(site)/blog/[slug]/page.tsx` (modify) | Renders `BlogSummaryCard` above the body. |
| `scripts/check-blog-blocks.ts` (create) + `package.json` | Direct-render checks (`pnpm check:blog-blocks`), no CMS needed. |
| `tests/blog-blocks.spec.ts` (create) | Playwright check against a real post; self-skips if none has the content. |

---

### Task 1: Sanity schema — summary fields and the CTA banner block

**Files:**
- Modify: `src/sanity/schemaTypes/post.ts`
- Modify: `src/sanity/schemaTypes/blockContent.ts`
- Create: `scripts/check-blog-blocks.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: `post` fields `summaryHeading: string`, `summaryText: text`; `blockContent` member `ctaBanner { heading: string; image: image{alt} }`. Later tasks read these exact names.

- [ ] **Step 1: Write the failing check script**

Create `scripts/check-blog-blocks.ts`:

```ts
import { post } from "../src/sanity/schemaTypes/post";
import { blockContent } from "../src/sanity/schemaTypes/blockContent";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

// ── Schema ──────────────────────────────────────────────────────
const postFields = (post.fields ?? []).map((field) => field.name);
check("post has summaryHeading", postFields.includes("summaryHeading"), `fields: ${postFields.join(", ")}`);
check("post has summaryText", postFields.includes("summaryText"), `fields: ${postFields.join(", ")}`);

const members = (blockContent.of ?? []) as Array<{ name?: string; fields?: Array<{ name: string }> }>;
const banner = members.find((member) => member.name === "ctaBanner");
check("blockContent has ctaBanner", Boolean(banner), `members: ${members.map((m) => m.name).join(", ")}`);
const bannerFields = (banner?.fields ?? []).map((field) => field.name);
check("ctaBanner has heading + image", bannerFields.includes("heading") && bannerFields.includes("image"), `fields: ${bannerFields.join(", ")}`);

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("PASS  blog blocks");
```

Add to `package.json` `"scripts"`, after `"check:slugs"`:

```json
"check:blog-blocks": "tsx scripts/check-blog-blocks.ts",
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm check:blog-blocks`
Expected: `FAIL` listing `post has summaryHeading`, `post has summaryText`, `blockContent has ctaBanner`, exit code 1.

- [ ] **Step 3: Add the post fields**

In `src/sanity/schemaTypes/post.ts`, add a `groups` entry to the `defineType` call and two fields after `body`:

```ts
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [{ name: "summary", title: "Summary card" }],
  fields: [
    // … existing fields unchanged …
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summaryHeading",
      title: "Summary heading",
      description:
        "Shown in the blue card at the top of the article. The card only appears when both this and the text are filled.",
      type: "string",
      group: "summary",
    }),
    defineField({
      name: "summaryText",
      title: "Summary text",
      description: "Leave a blank line between paragraphs.",
      type: "text",
      rows: 6,
      group: "summary",
    }),
    // … seo, jsonLd unchanged …
  ],
```

- [ ] **Step 4: Add the banner block**

In `src/sanity/schemaTypes/blockContent.ts`, after the `defineArrayMember({ type: "table" })` entry:

```ts
    defineArrayMember({
      name: "ctaBanner",
      title: "CTA banner",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          title: "Image",
          description: "Sits in the bottom-right corner of the banner.",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required().assetRequired(),
        }),
      ],
      preview: {
        select: { title: "heading", media: "image" },
        prepare: ({ title, media }) => ({ title: title || "CTA banner", subtitle: "CTA banner", media }),
      },
    }),
```

- [ ] **Step 5: Run the check and type-check**

Run: `pnpm check:blog-blocks && pnpm type-check`
Expected: `PASS  blog blocks` and tsc exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemaTypes/post.ts src/sanity/schemaTypes/blockContent.ts scripts/check-blog-blocks.ts package.json
git commit -m "feat(sanity): summary card fields and CTA banner block on blog posts

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Query, types, and colour tokens

**Files:**
- Modify: `src/sanity/lib/queries.ts:167-173`
- Modify: `src/sanity/lib/types.ts:82-86`
- Modify: `src/styles/globals.css` (`@theme` block, after `--color-footer-blue`)

**Interfaces:**
- Consumes: schema names from Task 1.
- Produces: `BlogPost.summaryHeading?: string`, `BlogPost.summaryText?: string`, `export interface CtaBannerBlock { _type: "ctaBanner"; heading?: string; image?: SanityImage }`; tokens `summary-blue-start`, `summary-blue-end`, `banner-grey-start`, `banner-grey-end` usable as Tailwind colour classes.

- [ ] **Step 1: Extend the check script with a type-level assertion**

Append to `scripts/check-blog-blocks.ts`, before the `if (failures.length > 0)` block:

```ts
// ── Types ───────────────────────────────────────────────────────
// Compile-time: these assignments fail `tsx` if the types are missing.
import type { BlogPost, CtaBannerBlock } from "../src/sanity/lib/types";
const typedPost: Pick<BlogPost, "summaryHeading" | "summaryText"> = { summaryHeading: "Summary", summaryText: "One\n\nTwo" };
const typedBanner: CtaBannerBlock = { _type: "ctaBanner", heading: "Hi" };
check("types compile", Boolean(typedPost) && Boolean(typedBanner), "unreachable");
```

(Move the `import type` line to the top of the file with the other imports.)

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm type-check`
Expected: errors that `CtaBannerBlock` is not exported and `summaryHeading` does not exist on `BlogPost`.

- [ ] **Step 3: Add the types**

In `src/sanity/lib/types.ts`, replace the `BlogPost` interface with:

```ts
export interface BlogPost extends BlogPostListItem {
  body?: PortableTextBlock[];
  summaryHeading?: string;
  summaryText?: string;
  seo?: SeoFields;
  jsonLd?: JsonLdField;
}

/** The `ctaBanner` block editors insert into `blockContent`. */
export interface CtaBannerBlock {
  _type: "ctaBanner";
  heading?: string;
  image?: SanityImage;
}
```

- [ ] **Step 4: Project the new data**

In `src/sanity/lib/queries.ts`, inside `BLOG_POST_QUERY`, replace the `body[] { … }` block with:

```groq
    body[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      },
      _type == "ctaBanner" => {
        heading,
        image {
          ${imageProjection}
        }
      }
    },
    summaryHeading,
    summaryText,
```

- [ ] **Step 5: Add the tokens**

In `src/styles/globals.css`, directly after `--color-footer-blue: #124f87;`:

```css
  /* Blog summary card and CTA banner gradients (Figma 602:856, 605:920) */
  --color-summary-blue-start: #267de4;
  --color-summary-blue-end: #154278;
  --color-banner-grey-start: #616161;
  --color-banner-grey-end: #0a0a0a;
```

- [ ] **Step 6: Verify**

Run: `pnpm type-check && pnpm check:blog-blocks`
Expected: tsc exits 0; `PASS  blog blocks`.

- [ ] **Step 7: Commit**

```bash
git add src/sanity/lib/queries.ts src/sanity/lib/types.ts src/styles/globals.css scripts/check-blog-blocks.ts
git commit -m "feat(blog): query, types and tokens for the summary card and CTA banner

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: `BlogSummaryCard` and its slot on the blog page

**Files:**
- Create: `src/components/sanity/BlogSummaryCard.tsx`
- Modify: `src/app/(site)/blog/[slug]/page.tsx:148-150`
- Modify: `scripts/check-blog-blocks.ts`

**Interfaces:**
- Consumes: `BlogPost.summaryHeading` / `summaryText` (Task 2).
- Produces: `export function BlogSummaryCard({ heading, text }: { heading?: string; text?: string }): JSX.Element | null`; `export function splitParagraphs(text: string): string[]`. Root element carries `data-testid="blog-summary-card"` (Task 5 relies on it).

- [ ] **Step 1: Write the failing checks**

Append to `scripts/check-blog-blocks.ts` before the failure block (add the import at the top):

```ts
import { BlogSummaryCard, splitParagraphs } from "../src/components/sanity/BlogSummaryCard";

// ── Summary card ────────────────────────────────────────────────
check("splits on blank lines", JSON.stringify(splitParagraphs("One.\n\nTwo.\n\n\nThree.")) === JSON.stringify(["One.", "Two.", "Three."]), "wrong split");
check("keeps single line breaks inside a paragraph", splitParagraphs("a\nb").length === 1, "single newline split a paragraph");
check("drops whitespace-only paragraphs", splitParagraphs("  \n\nOnly").length === 1, "kept an empty paragraph");
check("summary hidden when heading blank", BlogSummaryCard({ heading: "  ", text: "Body" }) === null, "rendered with blank heading");
check("summary hidden when text blank", BlogSummaryCard({ heading: "Summary", text: "" }) === null, "rendered with blank text");
check("summary hidden when both undefined", BlogSummaryCard({}) === null, "rendered with nothing");
check("summary renders when both filled", BlogSummaryCard({ heading: "Summary", text: "Body" }) !== null, "expected an element");
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm check:blog-blocks`
Expected: fails to resolve `../src/components/sanity/BlogSummaryCard`.

- [ ] **Step 3: Create the component**

Create `src/components/sanity/BlogSummaryCard.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heading, Text } from "@/components/ui/Typography";

interface BlogSummaryCardProps {
  heading?: string;
  text?: string;
}

// Figma 602:856 shows nine badges; the site ships ten, so the tenth is unused.
const CERTIFIED_BADGES = Array.from({ length: 9 }, (_, i) => `/images/certified-badges/${i + 1}.webp`);

/** Editors separate paragraphs with a blank line; single line breaks stay inside one paragraph. */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function BlogSummaryCard({ heading, text }: BlogSummaryCardProps) {
  const displayHeading = heading?.trim();
  const paragraphs = splitParagraphs(text ?? "");

  if (!displayHeading || paragraphs.length === 0) {
    return null;
  }

  return (
    <aside
      data-testid="blog-summary-card"
      aria-label={displayHeading}
      className="mb-10 grid gap-8 rounded-[10px] bg-linear-[192deg] from-summary-blue-start from-[7%] to-summary-blue-end to-[108%] p-7 text-white md:grid-cols-[152px_minmax(0,1fr)]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-[162px] w-[152px] items-center justify-center rounded-md bg-white">
          <Image
            src="/images/salesforce-partner.webp"
            alt="Salesforce Partner"
            width={140}
            height={150}
            className="h-auto w-[140px] object-contain"
          />
        </div>
        <ul className="grid w-[152px] grid-cols-3 gap-3" aria-hidden="true">
          {CERTIFIED_BADGES.map((src) => (
            <li key={src}>
              <Image src={src} alt="" width={43} height={43} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading as="h2" level="h3" className="text-white">
          {displayHeading}
        </Heading>
        <div className="mt-5 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <Text key={index} variant="p3" className="text-white">
              {paragraph}
            </Text>
          ))}
        </div>
        <Link href="/contact" className="mt-8 inline-block">
          <CtaButton variant="filled" size="sm">
            Let&apos;s Connect
          </CtaButton>
        </Link>
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Render it on the blog page**

In `src/app/(site)/blog/[slug]/page.tsx`, add the import next to the other `components/sanity` imports:

```tsx
import { BlogSummaryCard } from "@/components/sanity/BlogSummaryCard";
```

and replace the `<article>` block with:

```tsx
            <article>
              <BlogSummaryCard
                heading={post.summaryHeading}
                text={post.summaryText}
              />
              <PortableContent value={post.body} contained={false} />
            </article>
```

- [ ] **Step 5: Verify**

Run: `pnpm check:blog-blocks && pnpm type-check && pnpm exec eslint src/components/sanity/BlogSummaryCard.tsx "src/app/(site)/blog/[slug]/page.tsx"`
Expected: `PASS  blog blocks`, tsc 0, eslint clean.

Then open any blog post on `http://localhost:3002/blog/<slug>` and confirm it renders unchanged (no post has the fields yet, so no card).

- [ ] **Step 6: Commit**

```bash
git add src/components/sanity/BlogSummaryCard.tsx "src/app/(site)/blog/[slug]/page.tsx" scripts/check-blog-blocks.ts
git commit -m "feat(blog): summary card at the top of the article body

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: `BlogCtaBanner` rendered inline from Portable Text

**Files:**
- Create: `src/components/sanity/BlogCtaBanner.tsx`
- Modify: `src/components/sanity/PortableContent.tsx:114-189` (the `types` map)
- Modify: `scripts/check-blog-blocks.ts`

**Interfaces:**
- Consumes: `CtaBannerBlock` (Task 2), `SanityImage` component.
- Produces: `export function BlogCtaBanner({ value }: { value: CtaBannerBlock }): JSX.Element | null`; root carries `data-testid="blog-cta-banner"` (Task 5 relies on it).

- [ ] **Step 1: Write the failing checks**

Append to `scripts/check-blog-blocks.ts` before the failure block (import at top):

```ts
import { BlogCtaBanner } from "../src/components/sanity/BlogCtaBanner";

// ── CTA banner ──────────────────────────────────────────────────
const bannerImage = { alt: "Dashboard", asset: { _id: "img", url: "https://cdn.example/dash.webp" } };
check("banner hidden without an image asset", BlogCtaBanner({ value: { _type: "ctaBanner", heading: "Go" } }) === null, "rendered without image");
check("banner hidden without a heading", BlogCtaBanner({ value: { _type: "ctaBanner", heading: " ", image: bannerImage } }) === null, "rendered without heading");
check("banner renders with heading + image", BlogCtaBanner({ value: { _type: "ctaBanner", heading: "Go", image: bannerImage } }) !== null, "expected an element");
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm check:blog-blocks`
Expected: fails to resolve `../src/components/sanity/BlogCtaBanner`.

- [ ] **Step 3: Create the component**

Create `src/components/sanity/BlogCtaBanner.tsx`:

```tsx
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heading } from "@/components/ui/Typography";
import type { CtaBannerBlock } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";

interface BlogCtaBannerProps {
  value: CtaBannerBlock;
}

// Figma 605:920 background; layout from the client's screenshot. The image
// is pinned to the bottom-right corner and clipped by the rounded panel.
export function BlogCtaBanner({ value }: BlogCtaBannerProps) {
  const heading = value.heading?.trim();

  if (!heading || !value.image?.asset?.url) {
    return null;
  }

  return (
    <div
      data-testid="blog-cta-banner"
      className="relative my-4 overflow-hidden rounded-[10px] bg-linear-[100deg] from-banner-grey-start from-[6%] to-banner-grey-end to-[97%] md:min-h-[260px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[10%] h-[260px] w-[260px] rounded-full bg-brand-green-light opacity-60 blur-2xl"
      />

      <div className="relative z-10 max-w-[420px] p-7 md:p-8">
        <Heading as="h3" level="h4" className="text-white">
          {heading}
        </Heading>
        <Link href="/contact" className="mt-6 inline-block">
          <CtaButton variant="filled" size="sm">
            Let&apos;s Connect
          </CtaButton>
        </Link>
      </div>

      {/* Static and right-aligned on phones; pinned to the corner from md up. */}
      <div className="relative ml-auto mt-4 aspect-[4/3] w-[70%] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[min(52%,340px)]">
        <SanityImage
          image={value.image}
          altFallback={heading}
          className="object-contain object-right-bottom"
          sizes="(min-width: 768px) 340px, 70vw"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Register it in `PortableContent`**

In `src/components/sanity/PortableContent.tsx`, add the imports:

```tsx
import { BlogCtaBanner } from "./BlogCtaBanner";
import type { CtaBannerBlock } from "@/sanity/lib/types";
```

and inside `components.types`, after the `image` entry:

```tsx
    ctaBanner: ({ value }) => <BlogCtaBanner value={value as CtaBannerBlock} />,
```

- [ ] **Step 5: Verify**

Run: `pnpm check:blog-blocks && pnpm type-check && pnpm exec eslint src/components/sanity/BlogCtaBanner.tsx src/components/sanity/PortableContent.tsx`
Expected: `PASS  blog blocks`, tsc 0, eslint clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/sanity/BlogCtaBanner.tsx src/components/sanity/PortableContent.tsx scripts/check-blog-blocks.ts
git commit -m "feat(blog): inline CTA banner block in article bodies

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Playwright test against a real post

**Files:**
- Create: `tests/blog-blocks.spec.ts`

**Interfaces:**
- Consumes: `data-testid="blog-summary-card"` (Task 3), `data-testid="blog-cta-banner"` (Task 4).

- [ ] **Step 1: Write the test**

Create `tests/blog-blocks.spec.ts`:

```ts
import { test, expect, type Page } from "@playwright/test";

// Both blocks are editor-driven, so the test looks for a post that has them
// and skips (rather than fails) when the dataset has none yet. Direct-render
// cases live in scripts/check-blog-blocks.ts.
async function findPostWith(page: Page, testId: string): Promise<string | null> {
  await page.goto("/blog");
  const hrefs = await page
    .locator('main a[href^="/blog/"]')
    .evaluateAll((links) =>
      Array.from(new Set(links.map((a) => a.getAttribute("href") ?? "")))
        .filter((href) => href.split("/").length === 3)
        .slice(0, 8)
    );

  for (const href of hrefs) {
    await page.goto(href);
    if ((await page.getByTestId(testId).count()) > 0) return href;
  }
  return null;
}

test.describe("Blog summary card and CTA banner", () => {
  test("summary card sits inside the article above the body", async ({ page }) => {
    const href = await findPostWith(page, "blog-summary-card");
    test.skip(href === null, "no post has a summary card yet");

    const card = page.locator("article").getByTestId("blog-summary-card");
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /let's connect/i })).toHaveAttribute("href", "/contact");

    // The card must be the article's first child.
    const isFirst = await card.evaluate((el) => el.parentElement?.firstElementChild === el);
    expect(isFirst).toBe(true);
  });

  test("CTA banner renders inside the article body", async ({ page }) => {
    const href = await findPostWith(page, "blog-cta-banner");
    test.skip(href === null, "no post has a CTA banner yet");

    const banner = page.locator("article").getByTestId("blog-cta-banner").first();
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("heading")).not.toBeEmpty();
    await expect(banner.getByRole("img")).toBeVisible();
    await expect(banner.getByRole("link", { name: /let's connect/i })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run it**

Run: `pnpm exec playwright test tests/blog-blocks.spec.ts --reporter=line`
Expected: both tests report **skipped** (no post has the content yet). Run again after Task 6 adds content: both **pass**.

- [ ] **Step 3: Commit**

```bash
git add tests/blog-blocks.spec.ts
git commit -m "test(blog): cover the summary card and CTA banner on a real post

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Verification content, screenshots, and full suite

**Files:** none in the repo (content lives in Sanity); scratch screenshots only.

- [ ] **Step 1: Confirm Studio shows the new fields**

Open `http://localhost:3002/studio`, open any Blog post. Expect a **Summary card** tab/group with *Summary heading* and *Summary text*, and in the Body editor's "+" insert menu a **CTA banner** entry alongside Image and Table.

- [ ] **Step 2: Add content to one post**

Pick the post the client screenshot shows (the nonprofit "digital dream team" article) or the newest post. Fill *Summary heading* = `Summary`, *Summary text* = two paragraphs separated by a blank line, insert a **CTA banner** after the second body heading with heading `Custom Salesforce Solutions For Your CRM Innovation Goals` and any dashboard-style image with alt text, then **Publish**. The `/api/revalidate` webhook refreshes the page; if it is slow, request `http://localhost:3002/blog/<slug>` again after ~10s.

If a Sanity write token is available (`grep -l "SANITY_API_WRITE_TOKEN\|SANITY_WRITE_TOKEN" .env.local`), the same edit can be scripted with `@sanity/client` `.patch(id).set({...}).commit()`; otherwise do it in Studio.

- [ ] **Step 3: Run the Playwright spec and the full suite**

Run: `pnpm exec playwright test tests/blog-blocks.spec.ts --reporter=line`
Expected: `2 passed`.

Run: `pnpm exec playwright test --reporter=line`
Expected: all pass (if a handful time out during a dev-server recompile, re-run with `--last-failed`; they must pass on the re-run).

- [ ] **Step 4: Screenshots against Figma**

With Playwright (`chromium`, `reducedMotion: "reduce"`), capture the summary card and the banner at 1440 and at 375 wide and compare with Figma `602:856` and the client screenshot:
- Summary: badge tile left, 3×3 badge grid under it, white heading ≈40px, paragraphs, green pill; stacked on 375.
- Banner: dark gradient, white heading top-left, pill under it, image bleeding off the bottom-right corner with a soft green glow behind it; on 375 the image sits below the button, right-aligned.

Fix any layout drift in the components and re-run `pnpm check:blog-blocks`, then commit:

```bash
git add src/components/sanity
git commit -m "fix(blog): match the summary card and CTA banner to Figma

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

- [ ] **Step 5: Report**

Send the four screenshots to the client, name the post that carries the demo content, and ask whether it should stay.
