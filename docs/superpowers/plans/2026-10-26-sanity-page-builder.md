# Sanity Page Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every static page (23 routes) is served from a Sanity `page` document with an ordered `sections[]` array. The pages look pixel-identical to today, and the static route code is deleted.

**Architecture:**
- A `page` document holds a slug (which may contain `/`), SEO, JSON-LD and `sections[]`. A catch-all route renders it through a registry that maps each section `_type` to an adapter, and each adapter feeds an existing section component.
- Components keep their current defaults. New optional props replace hard-coded content.
- A one-shot seed copies each route's constants into Sanity: first under `preview/` for side-by-side reconciliation against a reference build, then under the final slugs. After that, the static code and the seed are deleted.

**Tech Stack:** Next.js 15.5 App Router, React 19, TypeScript strict, Tailwind v4, Sanity v4 (`sanity`, `next-sanity`, `@sanity/client`, `@sanity/image-url`), Playwright (the only test runner, also used for unit-style specs), `tsx` for scripts.

**Spec:** `docs/superpowers/specs/2026-10-26-sanity-page-builder-design.md`. Its appendices are required reading for every section and seed task:
- `docs/superpowers/specs/2026-10-26-sanity-page-builder/inventory-components.md`: per component, its props, defaults, hard-coded content and images.
- `docs/superpowers/specs/2026-10-26-sanity-page-builder/inventory-pages.md`: per route, every prop passed, the overrides and the inline blocks.
- `docs/superpowers/specs/2026-10-26-sanity-page-builder/inventory-plumbing.md`: routing, fetch, SEO keys, revalidation, sitemap and tests.

## Global Constraints

- **Branch:** work on `feat/sanity-page-builder`. Never merge to `main` and never push to `main`.
- **No visible change:** the migrated pages must match the pre-migration commit `0a9c2de` within 3px per top-level section at 1440px and 375px.
- **Defaults stay:** component files keep every current default. New props are optional, and their default is today's constant.
- **No raw hex in components:** colours come from `@theme` tokens in `src/styles/globals.css`. Typography goes only through `Heading`/`Text`/`typography-*`. Classes are composed with `cn()`. There is no `any`.
- **Data in, not documents:** sections receive their own exported item types, never raw Sanity documents. The adapters live in `src/components/sanity/page-builder/adapters/`.
- **Hero headings:** when a small label exists it is the h1 and the big title the h2. With no label the title is the h1.
- **Document ids:** `page-<slug with "/" → "-">`, e.g. `page-home`, `page-industries-salesforce-health-cloud-consulting`. Never use dots.
- **Home:** home is slug `home`, served at `/`. `/home` returns 404.
- **Studio lists:** "Parent pages" filters `_type == "page" && count(string::split(slug.current, "/")) == 1`, and "Dynamic pages" uses `> 1`. Never use GROQ `match` for depth.
- **Images:**
  - Content images are Sanity `image` fields with a nested `alt`. Backgrounds and icon chips are plain `image` fields.
  - 2× logo and badge exports render at half the asset's pixel size.
- **Navigation:** stays in code.
- **Write token:** the seed needs `SANITY_API_WRITE_TOKEN` from `.env.local`, and must fail if it is missing. Never fall back to `SANITY_API_READ_TOKEN`, and never print token values.
- **Dev server:** never kill processes by name (`pkill -f next` killed the user's dev server before). Stop only the PIDs you started.
- **Commits:** every commit must pass `pnpm type-check`, `pnpm lint` and the touched Playwright specs. Every stage ends with `rm -rf .next && pnpm build` plus the full `pnpm test`.
- **Commit trailer:** every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

## Patterns (read before any section task)

These are referenced by Tasks 4–9. Each section type follows all five parts.

### P1. Schema file: `src/sanity/schemaTypes/sections/<camelName>.ts`

```ts
import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { markHeadingField } from "./markHeading";

export const ctaSection = defineSection({
  name: "ctaSection",
  title: "CTA band",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button link", type: "string" }),
    defineField({ name: "backgroundImage", title: "Background image", type: "image" }),
  ],
  previewTitle: "title",
});
```

**Rules:**
- **Every prop gets a field.** Each prop the component accepts, or gains in its task, becomes a field with the same name.
- **Content images:** `type: "image"` with `fields: [altField]`.
- **Plain images:** backgrounds and icon chips are `type: "image"` with no alt field.
- **JSX headings:** a prop that takes JSX made of text plus `<GreenLineMark/>` or `<br/>` becomes `markHeadingField(name, title)` (P3).
- **Colour, gradient, shadow and class-string values:** become `type: "string", options: { list: [...] }`. The list holds exactly the values found for that field in `inventory-pages.md`, plus the component's default. The `value` is the literal string, and the `title` is a human label. Never use free text.
- **Booleans and variants** keep the same prop name.
- **Arrays of objects:** each item is an inline `type: "object"` with a `name` and a `preview`.

### P2. Section adapter: `src/components/sanity/page-builder/adapters/<componentFile>.tsx`

```tsx
import { CtaSection } from "@/components/sections/CtaSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter } from "../types";

export interface CtaSectionData {
  _type: "ctaSection";
  _key: string;
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: SanityImageValue;
}

export const ctaSectionAdapter: SectionAdapter<CtaSectionData> = (s) => (
  <CtaSection
    title={s.title}
    buttonLabel={s.buttonLabel}
    buttonHref={s.buttonHref}
    backgroundImage={imageSrc(s.backgroundImage)}
  />
);
```


**Rules:**
- **Pass `undefined` for empty fields** so the component default applies, exactly as an omitted prop does today.
- **Images** go through `imageSrc()`, `imageAlt()` and `imageSize()` (Task 2), which read the asset ref without needing a GROQ `->` expansion.
- **Headings** go through `renderMarkHeading()` (P3).
- **2× logos** use `imageSize(img, { half: true })`.
- **Register the adapter:** add `ctaSection: ctaSectionAdapter` to `src/components/sanity/page-builder/registry.tsx`, and add the data type to the `PageSectionData` union in `src/components/sanity/page-builder/types.ts`.

### P3. Mark headings

These are built once in Task 1 (schema) and Task 2 (renderer).

- **`markHeadingField(name, title)`** creates an object with three fields:
  - `text` (`text`, newline → `<br/>`)
  - `mark` (`"none" | "after"`)
  - `markStyle`, one of:
    - `"hero"` → `inline-block h-10 w-auto align-baseline ml-1`
    - `"heroSmall"` → `inline-block h-8 w-auto align-baseline ml-1`
    - `"section"` → `inline-block -mb-2 ml-1`
- **`markSpace`** is a boolean, default true. It renders `{" "}` before the mark. It is false when the route's JSX puts the mark on its own line with no `{" "}`, because JSX then drops the whitespace (agentforce hero and others). Check each usage in the route source.
- **`renderMarkHeading(value)`** returns `ReactNode`. With `mark: "none"`, no `<br/>` and no mark, it returns the plain string.
- **Fallback:** any heading the field can't express gets reported back to the controller. Do not improvise.

### P4. Hard-coded component content

For components with hard-coded content (see the "Zero-prop" and "large defaults" tables in `inventory-components.md`):
- Export the existing constant (e.g. `export const DEFAULT_EVENTS = EVENTS`).
- Add an optional prop with that constant as its default, e.g. `events = DEFAULT_EVENTS`. The item type must be exported.
- The component's markup is unchanged.
- The seed (Task 10+) imports `DEFAULT_*` to write the content explicitly.

### P5. Adapter test: `tests/page-builder/<componentFile>.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { ctaSectionAdapter } from "@/components/sanity/page-builder/adapters/CtaSection";

const img = { _type: "image", asset: { _type: "reference", _ref: "image-abc123-1920x1080-webp" } };

test("ctaSection maps fields to CtaSection props", () => {
  const el = ctaSectionAdapter({ _type: "ctaSection", _key: "k", title: "T", buttonHref: "/contact", backgroundImage: img }) as { props: Record<string, unknown> };
  expect(el.props.title).toBe("T");
  expect(el.props.buttonHref).toBe("/contact");
  expect(el.props.buttonLabel).toBeUndefined();
  expect(String(el.props.backgroundImage)).toContain("abc123-1920x1080.webp");
});
```

- **One spec per adapter.** Assert the field-to-prop mapping, the empty-field → `undefined` rule, and every image, heading and enum conversion.
- **Testing a component:** don't render it. Assert on the returned element's `props`, as `tests/table-links.spec.ts` does.

---

## File structure

**Create:**
- `src/lib/pagePaths.ts`: slug rules, the reserved list, slug ↔ path, ids, depth.
- `src/sanity/schemaTypes/page.ts`: the `page` document.
- `src/sanity/schemaTypes/sections/defineSection.ts`, `markHeading.ts`, `alt.ts`, `index.ts` (the list of all section types), plus one file per section type.
- `src/sanity/structure.ts`: the Studio sidebar.
- `src/sanity/lib/imageRef.ts`: image helpers that work from an asset ref.
- `src/app/(site)/[...slug]/page.tsx`: the catch-all. It is renamed to `[[...slug]]` in Task 13.
- `src/components/sanity/page-builder/`:
  - `PageSections.tsx`, `registry.tsx`, `types.ts`, `markHeading.tsx`
  - `adapters/*.tsx`
- `src/components/sections/` (new components): `RichTextSection.tsx`, `RecruitmentIntroSection.tsx`, `TalentPillsSection.tsx`, `HiringModelsSection.tsx`, `ProcessStepsSection.tsx`, `WhyBandSection.tsx`, `FeaturedRolesSection.tsx`.
- `scripts/seed-pages.ts` and `scripts/seed-pages/*.ts`: one-shot, deleted in Task 13.
- `tests/page-paths.spec.ts`, `tests/page-route.spec.ts`, `tests/page-builder/*.spec.ts`, `tests/seed-walk.spec.ts`.

**Modify:**
- `src/sanity/schemaTypes/index.ts`, `sanity.config.ts`
- `src/sanity/lib/queries.ts`, `src/sanity/lib/types.ts`
- `src/app/api/revalidate/route.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Section components (optional props only)
- `src/lib/pageCaseStudies.ts` (export the card mapper)

**Delete in Task 13:**
- the 23 static route files, `src/app/(site)/page.tsx` and `salesforce-recruitment-agency/FeaturedRolesCarousel.tsx`
- `scripts/seed-pages*`
- the unused key-union entries

---

## Stage 1: Foundation

### Task 1: Page paths, `page` schema, section helper, mark-heading schema, Studio structure

**Files:**
- Create: `src/lib/pagePaths.ts`
- Create: `src/sanity/schemaTypes/page.ts`
- Create: `src/sanity/schemaTypes/sections/defineSection.ts`, `markHeading.ts`, `alt.ts`, `index.ts`
- Create: `src/sanity/structure.ts`
- Modify: `src/sanity/schemaTypes/index.ts`, `sanity.config.ts`
- Test: `tests/page-paths.spec.ts`

**Interfaces:**
- **Produces from `pagePaths.ts`:**
  - `RESERVED_FIRST_SEGMENTS: readonly string[]`
  - `pageSlugError(slug: string): string | null`
  - `slugToPath(slug: string): string`
  - `segmentsToSlug(segments: string[] | undefined): string | null`
  - `pageDocumentId(slug: string): string`
  - `slugDepth(slug: string): number`
- **Produces from the schema files:**
  - `defineSection(opts)` returns a Sanity object type definition.
  - `markHeadingField(name, title)` returns a field definition.
  - `altField`, `contentImageField(name, title)` and `plainImageField(name, title)`.
  - `sectionTypes` is the array of all section object types (empty in this task), and `pageSectionMembers` is `sectionTypes.map(t => ({ type: t.name }))`.

- [ ] **Step 1: Write the failing test** `tests/page-paths.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { pageSlugError, slugToPath, segmentsToSlug, pageDocumentId, slugDepth } from "@/lib/pagePaths";

test.describe("page paths", () => {
  test("home maps to / and /home is not a page", () => {
    expect(slugToPath("home")).toBe("/");
    expect(segmentsToSlug(undefined)).toBe("home");
    expect(segmentsToSlug([])).toBe("home");
    expect(segmentsToSlug(["home"])).toBeNull();
  });
  test("nested slugs keep their slashes", () => {
    expect(segmentsToSlug(["industries", "salesforce-health-cloud-consulting"])).toBe("industries/salesforce-health-cloud-consulting");
    expect(slugToPath("industries/salesforce-health-cloud-consulting")).toBe("/industries/salesforce-health-cloud-consulting");
    expect(slugDepth("about")).toBe(1);
    expect(slugDepth("industries/x")).toBe(2);
  });
  test("ids use dashes, never dots", () => {
    expect(pageDocumentId("home")).toBe("page-home");
    expect(pageDocumentId("preview/industries/x")).toBe("page-preview-industries-x");
    expect(pageDocumentId("a.b")).not.toContain(".");
  });
  test("slug validation", () => {
    expect(pageSlugError("about")).toBeNull();
    expect(pageSlugError("industries/salesforce-health-cloud-consulting")).toBeNull();
    expect(pageSlugError("salesforce-recruitment-agency")).toBeNull();
    expect(pageSlugError("home")).toBeNull();
    for (const bad of ["Home", "/about", "about/", "a//b", "a b", "home/x", "blog", "blog/x", "case-studies", "services/x",
      "salesforce", "studio", "api/x", "section-thumbs-preview", "staff-augmentation", "salesforce-foo",
      "platform-expertise/salesforce-education-cloud-consulting", "platform-expertise/salesforce-commerce-cloud-consulting"]) {
      expect(pageSlugError(bad), bad).not.toBeNull();
    }
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `pnpm exec playwright test tests/page-paths.spec.ts`
Expected: FAIL, because the module `@/lib/pagePaths` does not exist.

- [ ] **Step 3: Implement `src/lib/pagePaths.ts`**

```ts
/**
 * Slug rules for Sanity `page` documents. A slug may contain "/" (nested
 * pages); "home" is served at "/". The reserved list mirrors routes that stay
 * in code and the redirects in next.config.ts, which run before routing and
 * would otherwise shadow a page with that slug.
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
  if ((RESERVED_FIRST_SEGMENTS as readonly string[]).includes(first)) {
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

export function pageDocumentId(slug: string): string {
  return `page-${slug.replace(/[/.]/g, "-")}`;
}

export function slugDepth(slug: string): number {
  return slug.split("/").length;
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `pnpm exec playwright test tests/page-paths.spec.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Create the schema helpers**

`src/sanity/schemaTypes/sections/alt.ts`:

```ts
import { defineField } from "sanity";

export const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describe the image for screen readers. Leave empty only for decorative images.",
});

/** An image people read (photos, logos): carries alt text. */
export const contentImageField = (name: string, title: string) =>
  defineField({ name, title, type: "image", options: { hotspot: true }, fields: [altField] });

/** A background, texture or icon chip: no alt text, rendered decoratively. */
export const plainImageField = (name: string, title: string) =>
  defineField({ name, title, type: "image" });
```

`src/sanity/schemaTypes/sections/markHeading.ts`:

```ts
import { defineField } from "sanity";

/**
 * Headings that today are JSX: text, optional <br/> line breaks, and the green
 * squiggle (GreenLineMark) after the last word. markStyle values map 1:1 to the
 * className variants the static pages used (see markHeading.tsx).
 */
export const markHeadingField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: false },
    fields: [
      defineField({ name: "text", title: "Text", type: "text", rows: 2, description: "A new line becomes a line break." }),
      defineField({
        name: "mark",
        title: "Green squiggle",
        type: "string",
        initialValue: "none",
        options: { list: [{ title: "None", value: "none" }, { title: "After the text", value: "after" }], layout: "radio", direction: "horizontal" },
      }),
      defineField({
        name: "markStyle",
        title: "Squiggle size",
        type: "string",
        initialValue: "hero",
        hidden: ({ parent }) => parent?.mark !== "after",
        options: {
          list: [
            { title: "Hero (large)", value: "hero" },
            { title: "Hero (small)", value: "heroSmall" },
            { title: "Section heading", value: "section" },
          ],
        },
      }),
      defineField({
        name: "markSpace",
        title: "Space before squiggle",
        type: "boolean",
        initialValue: true,
        hidden: ({ parent }) => parent?.mark !== "after",
      }),
    ],
  });
```

`src/sanity/schemaTypes/sections/defineSection.ts`:

```ts
import { defineField, defineType, type FieldDefinition } from "sanity";

interface DefineSectionOptions {
  name: string;
  title: string;
  fields: FieldDefinition[];
  /** Field path shown as the row title in the sections list. */
  previewTitle?: string;
}

/**
 * Every page-builder section shares a "Layout" group: a spacing override and an
 * anchor id. Spacing left empty keeps the component's built-in rhythm, so a
 * seeded page renders exactly like the static page it replaced.
 */
export function defineSection({ name, title, fields, previewTitle }: DefineSectionOptions) {
  return defineType({
    name,
    title,
    type: "object",
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "layout", title: "Layout" },
    ],
    fields: [
      ...fields.map((f) => ({ ...f, group: f.group ?? "content" })),
      defineField({
        name: "spacing",
        title: "Spacing override",
        type: "object",
        group: "layout",
        description: "Leave empty to keep the section's normal spacing.",
        fields: [
          defineField({ name: "top", title: "Top (px)", type: "number", validation: (r) => r.integer() }),
          defineField({ name: "bottom", title: "Bottom (px)", type: "number", validation: (r) => r.integer() }),
        ],
      }),
      defineField({
        name: "anchorId",
        title: "Anchor id",
        type: "string",
        group: "layout",
        description: "Optional. Lets links jump to this section, e.g. #pricing.",
        validation: (r) => r.regex(/^[a-z][a-z0-9-]*$/, { name: "anchor" }),
      }),
    ],
    preview: {
      select: { title: previewTitle ?? "title", text: "title.text" },
      prepare: ({ title: t, text }) => ({
        title: (typeof t === "string" ? t : text) || title,
        subtitle: title,
      }),
    },
  });
}
```

`src/sanity/schemaTypes/sections/index.ts`:

```ts
// Every page-builder section type. Section tasks append to this list.
export const sectionTypes = [] as const satisfies readonly { name: string }[];

export const pageSectionMembers = sectionTypes.map((t) => ({ type: t.name }));
```

- [ ] **Step 6: Create the `page` document** `src/sanity/schemaTypes/page.ts`

```ts
import { defineField, defineType, type SlugValue } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { pageSlugError, slugToPath } from "@/lib/pagePaths";
import { pageSectionMembers } from "./sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "The page address. Use \"home\" for the homepage and / for child pages, e.g. industries/salesforce-health-cloud-consulting.",
      options: {
        source: "title",
        maxLength: 200,
        // Keep "/" so nested pages can be generated; the default slugifier strips it.
        slugify: (input: string) =>
          input.toLowerCase().trim().replace(/[^a-z0-9/]+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, ""),
      },
      validation: (r) =>
        r.required().custom((value: SlugValue | undefined) => {
          const current = value?.current;
          if (!current) return true;
          return pageSlugError(current) ?? true;
        }),
    }),
    defineField({
      name: "clipOverflowX",
      title: "Clip horizontal overflow",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Wraps the page so wide decorations cannot cause sideways scrolling. Leave off for pages with sticky sections (e.g. the homepage stack).",
    }),
    defineField({ name: "sections", title: "Sections", type: "array", group: "content", of: pageSectionMembers }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "jsonLd", title: "JSON-LD", type: "jsonLd", group: "seo" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? slugToPath(slug) : "No slug" }),
  },
});
```

Then add these lines to `src/sanity/schemaTypes/index.ts`:
- `import { page } from "./page";`
- `import { sectionTypes } from "./sections";`
- append `page, ...sectionTypes` to the `schemaTypes` array

- [ ] **Step 7: Studio structure** `src/sanity/structure.ts`

```ts
import type { StructureResolver } from "sanity/structure";

// "Parent pages" are depth 1 (home, about, …); "Dynamic pages" are nested
// (industries/…, platform-expertise/…). Depth comes from string::split because
// GROQ `match` tokenises on "/" and cannot tell the two apart.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Parent pages")
        .child(
          S.documentList()
            .title("Parent pages")
            .schemaType("page")
            .filter('_type == "page" && count(string::split(slug.current, "/")) == 1')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        ),
      S.listItem()
        .title("Dynamic pages")
        .child(
          S.documentList()
            .title("Dynamic pages")
            .schemaType("page")
            .filter('_type == "page" && count(string::split(slug.current, "/")) > 1')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "page"),
    ]);
```

In `sanity.config.ts`, add `import { structure } from "@/sanity/structure";` and change `structureTool()` to `structureTool({ structure })`.

- [ ] **Step 8: Verify in the Studio**

1. Run `pnpm type-check && pnpm lint`. Expected: both pass.
2. Open `http://localhost:3002/studio` in the in-app browser (preview server `crm-web-dev`).
3. Expected:
   - The sidebar shows "Parent pages", "Dynamic pages", a divider, then the existing types.
   - Creating a draft `page` and typing slug `blog` shows the reserved-slug error.
   - Discard the draft. Never publish test documents.

- [ ] **Step 9: Commit**

```bash
git add src/lib/pagePaths.ts src/sanity/schemaTypes src/sanity/structure.ts sanity.config.ts tests/page-paths.spec.ts
git commit -m "feat(cms): page document, slug rules, section helper, Studio page lists

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 2: Catch-all route, page query, image helpers, mark-heading renderer, registry

**Files:**
- Create: `src/sanity/lib/imageRef.ts`
- Create: `src/components/sanity/page-builder/types.ts`, `markHeading.tsx`, `registry.tsx`, `PageSections.tsx`
- Create: `src/app/(site)/[...slug]/page.tsx`
- Modify: `src/sanity/lib/queries.ts` (add `PAGE_QUERY`, `PAGE_SLUGS_QUERY`)
- Modify: `src/sanity/lib/types.ts` (add `PageDocument`)
- Test: `tests/page-builder/core.spec.ts`, `tests/page-route.spec.ts`

**Interfaces:**
- **Consumes:** `segmentsToSlug`, `slugToPath` and `pageDocumentId` from Task 1.
- **Produces:**
  - `SanityImageValue = { _type?: "image"; asset?: { _ref?: string; _type?: "reference" }; alt?: string }`
  - `imageSrc(img?): string | undefined`
  - `imageAlt(img?, fallback?: string): string | undefined`
  - `imageSize(img?, opts?: { half?: boolean }): { width: number; height: number } | undefined`
  - `renderMarkHeading(value?: MarkHeadingValue): ReactNode | undefined` and `MarkHeadingValue = { text?: string; mark?: "none" | "after"; markStyle?: "hero" | "heroSmall" | "section"; markSpace?: boolean }`
  - `SectionAdapter<T> = (section: T) => ReactNode`
  - `PageSectionData` (a union, initially `never`)
  - `SECTION_ADAPTERS: Record<string, SectionAdapter<never>>`
  - `<PageSections sections={PageSectionData[] | undefined} />`
  - `PAGE_QUERY` (params `$slug`) and `PAGE_SLUGS_QUERY`
  - `PageDocument = { _id: string; title: string; slug: string; clipOverflowX?: boolean; seo?: SeoFields; jsonLd?: JsonLdField; sections?: PageSectionData[] }`

- [ ] **Step 1: Write the failing unit test** `tests/page-builder/core.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { imageSrc, imageSize, imageAlt } from "@/sanity/lib/imageRef";
import { renderMarkHeading } from "@/components/sanity/page-builder/markHeading";
import { sectionWrapperStyle } from "@/components/sanity/page-builder/PageSections";

const img = { _type: "image" as const, asset: { _type: "reference" as const, _ref: "image-a1b2c3-416x82-webp" }, alt: "Logo" };

/** Flattens a React element tree into a list of nodes (elements and strings). */
function walk(node: unknown, out: unknown[] = []): unknown[] {
  if (Array.isArray(node)) node.forEach((n) => walk(n, out));
  else if (node && typeof node === "object" && "props" in node) {
    out.push(node);
    walk((node as { props: { children?: unknown } }).props.children, out);
  } else if (node !== null && node !== undefined && node !== false) out.push(node);
  return out;
}

test.describe("page builder core", () => {
  test("image helpers read the asset ref", () => {
    expect(imageSrc(img)).toMatch(/^https:\/\/cdn\.sanity\.io\/images\/[^/]+\/[^/]+\/a1b2c3-416x82\.webp$/);
    expect(imageSize(img)).toEqual({ width: 416, height: 82 });
    expect(imageSize(img, { half: true })).toEqual({ width: 208, height: 41 });
    expect(imageAlt(img)).toBe("Logo");
    expect(imageAlt({ ...img, alt: "" }, "fallback")).toBe("fallback");
    expect(imageSrc(undefined)).toBeUndefined();
    expect(imageSrc({ _type: "image" })).toBeUndefined();
  });

  test("mark headings render like the static JSX", () => {
    expect(renderMarkHeading({ text: "Plain", mark: "none" })).toBe("Plain");
    expect(renderMarkHeading(undefined)).toBeUndefined();
    expect(renderMarkHeading({ text: "  " })).toBeUndefined();

    const withMark = walk(renderMarkHeading({ text: "Hello world", mark: "after", markStyle: "hero", markSpace: true }));
    expect(withMark).toContain("Hello world");
    expect(withMark).toContain(" ");
    const mark = withMark.find((n) => (n as { props?: { className?: string } })?.props?.className) as { props: { className: string } };
    expect(mark.props.className).toBe("inline-block h-10 w-auto align-baseline ml-1");

    const noSpace = walk(renderMarkHeading({ text: "A", mark: "after", markStyle: "section", markSpace: false }));
    expect(noSpace).not.toContain(" ");

    const lines = walk(renderMarkHeading({ text: "Line one\nLine two" }));
    expect(lines).toContain("Line one");
    expect(lines).toContain("Line two");
    expect(lines.some((n) => (n as { type?: string })?.type === "br")).toBe(true);
  });

  test("spacing override only sets what the editor filled in", () => {
    expect(sectionWrapperStyle(undefined)).toBeUndefined();
    expect(sectionWrapperStyle({})).toBeUndefined();
    expect(sectionWrapperStyle({ top: 40 })).toEqual({ paddingTop: 40 });
    expect(sectionWrapperStyle({ top: 0, bottom: 24 })).toEqual({ paddingTop: 0, paddingBottom: 24 });
  });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `pnpm exec playwright test tests/page-builder/core.spec.ts`
Expected: FAIL with "Cannot find module".

- [ ] **Step 3: Implement `src/sanity/lib/imageRef.ts`**

```ts
import { dataset, projectId } from "../env";

export interface SanityImageValue {
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" };
  alt?: string;
}

// Asset refs encode everything we need: image-<hash>-<w>x<h>-<ext>. Reading
// them avoids a GROQ `asset->` expansion for every image in every section.
const REF = /^image-([a-f0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/;

function parse(img?: SanityImageValue) {
  const match = img?.asset?._ref?.match(REF);
  if (!match) return undefined;
  const [, id, w, h, ext] = match;
  return { id, width: Number(w), height: Number(h), ext };
}

/** Plain CDN URL (no transforms) so next/image optimises it like a local file. */
export function imageSrc(img?: SanityImageValue): string | undefined {
  const p = parse(img);
  return p && `https://cdn.sanity.io/images/${projectId}/${dataset}/${p.id}-${p.width}x${p.height}.${p.ext}`;
}

/** Intrinsic size; `half` for 2x exports shown at their Figma display size. */
export function imageSize(img?: SanityImageValue, opts: { half?: boolean } = {}) {
  const p = parse(img);
  if (!p) return undefined;
  return opts.half
    ? { width: Math.round(p.width / 2), height: Math.round(p.height / 2) }
    : { width: p.width, height: p.height };
}

export function imageAlt(img?: SanityImageValue, fallback?: string): string | undefined {
  return img?.alt?.trim() || fallback;
}
```

- [ ] **Step 4: Implement `markHeading.tsx`, `types.ts`, `registry.tsx` and `PageSections.tsx`** in `src/components/sanity/page-builder/`

`markHeading.tsx`:

```tsx
import { Fragment, type ReactNode } from "react";
import { GreenLineMark } from "@/components/ui/GreenLineMark";

export interface MarkHeadingValue {
  text?: string;
  mark?: "none" | "after";
  markStyle?: "hero" | "heroSmall" | "section";
  markSpace?: boolean;
}

// The exact className each static page passed to <GreenLineMark/>.
const MARK_CLASS: Record<NonNullable<MarkHeadingValue["markStyle"]>, string> = {
  hero: "inline-block h-10 w-auto align-baseline ml-1",
  heroSmall: "inline-block h-8 w-auto align-baseline ml-1",
  section: "inline-block -mb-2 ml-1",
};

/** Rebuilds the JSX headings the static pages wrote: text, <br/>s, squiggle. */
export function renderMarkHeading(value?: MarkHeadingValue): ReactNode | undefined {
  const text = value?.text?.trim();
  if (!text) return undefined;
  const lines = text.split("\n");
  const hasMark = value?.mark === "after";
  if (!hasMark && lines.length === 1) return text;

  return (
    <>
      {lines.length === 1
        ? lines[0]
        : lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
      {hasMark && (value?.markSpace ?? true) ? " " : null}
      {hasMark && <GreenLineMark className={MARK_CLASS[value?.markStyle ?? "hero"]} />}
    </>
  );
}
```

`types.ts`:

```ts
import type { ReactNode } from "react";

export interface SectionSpacing {
  top?: number;
  bottom?: number;
}

export interface SectionBase {
  _key: string;
  _type: string;
  spacing?: SectionSpacing;
  anchorId?: string;
}

export type SectionAdapter<T> = (section: T) => ReactNode;

/**
 * Union of every section's data type. Section tasks add a member here, e.g.
 * `| CtaSectionData`, when they register an adapter.
 */
export type PageSectionData = SectionBase;
```

`registry.tsx`:

```tsx
import type { SectionAdapter } from "./types";

// _type → adapter. Section tasks add one entry each.
export const SECTION_ADAPTERS: Record<string, SectionAdapter<never>> = {};
```

`PageSections.tsx`:

```tsx
import type { CSSProperties } from "react";
import { SECTION_ADAPTERS } from "./registry";
import type { PageSectionData, SectionSpacing } from "./types";

/** Only the sides an editor set; undefined keeps the component's own rhythm. */
export function sectionWrapperStyle(spacing?: SectionSpacing): CSSProperties | undefined {
  if (!spacing) return undefined;
  const style: CSSProperties = {};
  if (typeof spacing.top === "number") style.paddingTop = spacing.top;
  if (typeof spacing.bottom === "number") style.paddingBottom = spacing.bottom;
  return Object.keys(style).length > 0 ? style : undefined;
}

export function PageSections({ sections }: { sections?: PageSectionData[] }) {
  return (
    <>
      {sections?.map((section) => {
        const adapter = SECTION_ADAPTERS[section._type] as ((s: PageSectionData) => React.ReactNode) | undefined;
        if (!adapter) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[PageSections] No adapter for section type "${section._type}"`);
          }
          return null;
        }
        return (
          <div
            key={section._key}
            data-section-type={section._type}
            id={section.anchorId || undefined}
            style={sectionWrapperStyle(section.spacing)}
          >
            {adapter(section)}
          </div>
        );
      })}
    </>
  );
}
```

**Wrapper note:** the wrapper `<div>` is a plain block. It doesn't change layout for sections whose outer element is a block. Task 11 reconciliation verifies this, in particular for any section using `position: sticky` (ExpertiseStackSection) or margin collapsing (`mt-24` CTAs). If a wrapper changes a measurement, record it and use `display: contents` on that type's wrapper. Add a `WRAPPER_CONTENTS` set in `PageSections.tsx`; it only applies when no spacing is set.

- [ ] **Step 5: Run the unit test and confirm it passes**

Run: `pnpm exec playwright test tests/page-builder/core.spec.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Add the queries and types**

In `src/sanity/lib/queries.ts`, after the other exported queries:

```ts
// Section-type projections that need dereferencing; everything else is plain
// data (images are read from their asset refs, see imageRef.ts). Section tasks
// that hold references append a `_type == "…" => { … }` clause here.
const pageSectionsProjection = `
  ...
`;

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    clipOverflowX,
    seo {
      ${seoProjection}
    },
    jsonLd {
      ${jsonLdProjection}
    },
    sections[] {
      ${pageSectionsProjection}
    }
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)].slug.current
`);
```

In `src/sanity/lib/types.ts`:

```ts
import type { PageSectionData } from "@/components/sanity/page-builder/types";

export interface PageDocument {
  _id: string;
  title: string;
  slug: string;
  clipOverflowX?: boolean;
  seo?: SeoFields;
  jsonLd?: JsonLdField;
  sections?: PageSectionData[];
}
```

`types.ts` can't import from components without creating a cycle (`types.ts` is imported by components). In that case, declare `sections?: unknown[]` here and cast to `PageSectionData[]` in the route.

- [ ] **Step 7: Write the failing route test** `tests/page-route.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test.describe("page catch-all route", () => {
  test("an unknown top-level path renders the site 404 inside the layout", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist-xyz");
    expect(res?.status()).toBe(404);
    await expect(page.locator("footer")).toBeVisible();
  });

  test("/home is not a page", async ({ page }) => {
    const res = await page.goto("/home");
    expect(res?.status()).toBe(404);
  });

  test("an unknown nested path 404s", async ({ page }) => {
    const res = await page.goto("/industries/does-not-exist-xyz");
    expect(res?.status()).toBe(404);
  });
});
```

Run: `pnpm exec playwright test tests/page-route.spec.ts`
Expected: FAIL. Today the first test gets Next's bare 404 with no site footer, and `/home` may also lack the footer.

- [ ] **Step 8: Implement the catch-all** `src/app/(site)/[...slug]/page.tsx`

A required catch-all can't coexist with `src/app/(site)/page.tsx` (the home route) as an optional one. Task 13 renames it to `[[...slug]]` when the home `page.tsx` is deleted.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { PageSections } from "@/components/sanity/page-builder/PageSections";
import type { PageSectionData } from "@/components/sanity/page-builder/types";
import { resolveJsonLd } from "@/lib/jsonLd";
import { segmentsToSlug, slugToPath } from "@/lib/pagePaths";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { PageDocument } from "@/sanity/lib/types";

type Params = Promise<{ slug?: string[] }>;

// Case studies and posts shown in sections are dereferenced, so their tags
// refresh pages too.
const tagsFor = (slug: string) => ["pages", `page:${slug}`, "case-studies", "posts"];

async function getPage(slug: string, metadata = false) {
  return sanityFetch<PageDocument>({ query: PAGE_QUERY, params: { slug }, tags: tagsFor(slug), metadata });
}

export async function generateStaticParams() {
  const slugs = (await sanityFetch<string[]>({ query: PAGE_SLUGS_QUERY, tags: ["pages"], metadata: true })) ?? [];
  // "home" is served by the optional catch-all's empty segment (Task 13).
  return slugs.filter((s) => s !== "home").map((s) => ({ slug: s.split("/") }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = segmentsToSlug((await params).slug);
  if (!slug) return {};
  const page = await getPage(slug, true);
  if (!page) return {};
  return buildPageMetadata({ seo: page.seo, title: page.title, canonicalPath: slugToPath(page.slug) });
}

export default async function SanityPage({ params }: { params: Params }) {
  const slug = segmentsToSlug((await params).slug);
  if (!slug) notFound();
  const page = await getPage(slug);
  if (!page) notFound();

  const body = (
    <>
      <JsonLdScript data={resolveJsonLd(page.jsonLd, null)} />
      <PageSections sections={page.sections as PageSectionData[] | undefined} />
    </>
  );

  return page.clipOverflowX ? <div className="overflow-x-hidden bg-white">{body}</div> : body;
}
```

`resolveJsonLd(jsonLd, fallback)` is in `src/lib/jsonLd.ts`. Check that it accepts `null` as the fallback. If its signature needs a `JsonLdValue`, pass `null` through a widened overload, keeping existing callers unchanged.

The fallback `description` and `image` for metadata come from the page `seo` field. The seed (Task 10) writes them there.

- [ ] **Step 9: Run the route test and confirm it passes**

Run: `pnpm exec playwright test tests/page-route.spec.ts tests/title.spec.ts tests/navbar.spec.ts`
Expected: PASS. The existing static routes still win, so `title.spec` and `navbar.spec` are unaffected.

- [ ] **Step 10: Commit**

```bash
git add src/sanity/lib src/components/sanity/page-builder "src/app/(site)/[...slug]" tests/page-builder/core.spec.ts tests/page-route.spec.ts
git commit -m "feat(cms): catch-all page route, section registry, image and heading helpers

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 3: Revalidation, sitemap, robots for pages

**Files:**
- Modify: `src/app/api/revalidate/route.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Test: `tests/page-plumbing.spec.ts`

**Interfaces:**
- **Consumes:** `slugToPath` from Task 1.
- **Produces:** `sitemapPageEntries(slugs: {slug: string; _updatedAt?: string}[])`, exported from `src/app/sitemap.ts`, so it can be unit-tested.

- [ ] **Step 1: Write the failing test** `tests/page-plumbing.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { sitemapPageEntries } from "@/app/sitemap";

test("sitemap page entries: home is /, preview pages are excluded, no /home", () => {
  const urls = sitemapPageEntries([
    { slug: "home" },
    { slug: "about" },
    { slug: "industries/salesforce-health-cloud-consulting" },
    { slug: "preview/about" },
  ]).map((e) => e.url);
  expect(urls).toEqual([
    "https://providuscrm.co.uk/",
    "https://providuscrm.co.uk/about",
    "https://providuscrm.co.uk/industries/salesforce-health-cloud-consulting",
  ]);
});
```

Run: `pnpm exec playwright test tests/page-plumbing.spec.ts`
Expected: FAIL, because `sitemapPageEntries` is not exported.

- [ ] **Step 2: Implement the sitemap clause**

In `src/app/sitemap.ts`:
1. Extend `SITEMAP_QUERY` with `|| (_type == "page" && defined(slug.current))`.
2. Add `'pages'` to the fetch tags.
3. Add:

```ts
// Parent pages get the priority the hard-coded entries used (0.8 for depth 1,
// 0.7 for nested). The home page is "/" and is never listed as "/home".
export function sitemapPageEntries(pages: { slug: string; _updatedAt?: string }[]): MetadataRoute.Sitemap {
  return pages
    .filter((p) => !p.slug.startsWith("preview/"))
    .map((p) => ({
      url: `https://providuscrm.co.uk${slugToPath(p.slug)}`,
      lastModified: new Date(p._updatedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: p.slug === "home" ? 1 : slugDepth(p.slug) === 1 ? 0.8 : 0.7,
    }));
}
```

Then spread `...sitemapPageEntries(allItems.filter((i) => i._type === "page"))` into `dynamicUrls`.
- **Duplicates:** while the hard-coded `staticUrls` entries for migrated routes still exist (until Task 13), no `page` documents with those final slugs exist either, so nothing duplicates.
- **Matching values:** before writing, read the hard-coded entries' `priority` and `changeFrequency` for home, parents and nested pages, and make `sitemapPageEntries` produce the same values. Adjust the numbers above to match what is there.

- [ ] **Step 3: Implement revalidation**

In `src/app/api/revalidate/route.ts`, before the final `return`:

```ts
  if (body._type === "page") {
    revalidateTag("pages");
    if (slug) {
      revalidateTag(`page:${slug}`);
      revalidatePath(slugToPath(slug));
    }
  }
```

Also add `import { slugToPath } from "@/lib/pagePaths";`.

- [ ] **Step 4: Robots and noindex for preview pages**

Read `src/app/robots.ts`. Add `disallow: ["/preview/"]` to the existing rule, keeping the existing entries. In the catch-all's `generateMetadata`, return `robots: { index: false, follow: false }` merged into the metadata when `slug.startsWith("preview/")`.

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `pnpm exec playwright test tests/page-plumbing.spec.ts tests/page-route.spec.ts`
Expected: PASS.

- [ ] **Step 6: Stage gate and commit**

```bash
pnpm type-check && pnpm lint && rm -rf .next && pnpm build && pnpm test
git add src/app/api/revalidate/route.ts src/app/sitemap.ts src/app/robots.ts "src/app/(site)/[...slug]/page.tsx" tests/page-plumbing.spec.ts
git commit -m "feat(cms): revalidate, sitemap and robots handle page documents

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

**Note on `rm -rf .next`:** it wipes the dev server's build output. Afterwards, restart the preview server `crm-web-dev` with the preview tool rather than by killing a process.

---

## Stage 2: Section types and adapters

Each task below applies **Patterns P1–P5** to each listed component:
- Read that component's entry in `inventory-components.md`.
- Read every usage in `inventory-pages.md` to find which values the pages actually pass.
- Every prop and every value found must be expressible.
- Append each new schema to `sectionTypes` in `src/sanity/schemaTypes/sections/index.ts`.
- Append each adapter to `SECTION_ADAPTERS`, and its data type to `PageSectionData` (change `export type PageSectionData = SectionBase` into a union of all data types, each extending `SectionBase`).
- **Schema type names** are the component name in lower camelCase: `HeroSection` → `heroSection`, `CtaSection` → `ctaSection`.

**Component change rules:**
- **Only additive, defaulted props.** Markup and defaults stay unchanged.
- **Gate:** run `pnpm exec playwright test` for any existing spec covering the component (`hero.spec.ts`, `events-section.spec.ts`, `footer.spec.ts`, `page.spec.ts`, `page-blogs.spec.ts`, `section-order.spec.ts`). It must still pass.

**Task end:** each task finishes with a commit after `pnpm type-check && pnpm lint && pnpm exec playwright test tests/page-builder`.

### Task 4: Heroes, CTAs, contact, partners strip

**Components:** HeroSection, SalesforceServiceHero, CtaSection, ExpertiseCtaSection, IndustryCtaSection, SalesforceConsultCtaSection, ContactSection, PartnersSection.

**Fidelity fields** (beyond each component's plain props):

| Component | Fields |
| --- | --- |
| HeroSection | `title` → `markHeadingField` (17 usages; check `markSpace` per usage). `subtitle` + `subtitleAsH1`. `imageClassName` enum `["object-contain p-4", "object-contain", "object-contain object-center"]` (empty = default). `ctaVariant`, `ctaSize`, `hideCta`, `hideImage`. `image` is a content image whose alt is seeded "Business meeting": add an optional `imageAlt` prop to HeroSection defaulting to `"Business meeting"`. `bullets` string array. `ctaLabel`/`ctaHref`. |
| SalesforceServiceHero | `kicker`, `badgeTitle`, `badgeSubtitle`, `title` (plain string), `description`, `bullets`, `formTitle`, `formButtonLabel`, `backgroundImage` (plain image). |
| CtaSection | As in P1 and P2. |
| ExpertiseCtaSection | All props. The two hard-coded alts ("Consultation Team", "Salesforce Astro") become optional props with those defaults. Both images are content images. |
| IndustryCtaSection | All props. `imageAlt` comes from the image `alt`. |
| SalesforceConsultCtaSection | `backgroundColor` enum: the gradient string recruitment passes, plus empty for the default. `buttonVariant` (`filled`/`white`). Image alt comes from the image. |
| ContactSection (P4) | Make the intro copy, address, email and phone optional props with today's values. Keep the copy exactly, including "Get in touch with by filling out the form…"; it's reported separately. The form logic stays in the component. |
| PartnersSection (P4) | The logos array becomes an optional prop (`DEFAULT_PARTNER_LOGOS`). Each item is a content image whose alt is seeded with today's "Partner N logo". The home page loads it with `next/dynamic`; the adapter does the same, with `NextDynamic(() => import("@/components/sections/PartnersSection").then((m) => m.PartnersSection))`, so the bundle split is unchanged. |

**H1 rule:** the HeroSection adapter passes `subtitleAsH1` only from the field; the seed sets it wherever the static page did. SalesforceServiceHero already promotes `kicker` to the h1.

**Test:** `tests/page-builder/heroes.spec.ts` covers P5 for all eight adapters. It includes:
- a HeroSection title with `markStyle: "heroSmall"` and `markSpace: false`
- the `imageClassName` passthrough
- the PartnersSection logos mapping to `{ src, alt }` items

- [ ] **Step 1:** Write `tests/page-builder/heroes.spec.ts` covering every adapter above. Run it and confirm it fails (missing modules).
- [ ] **Step 2:** Make the component changes (P4 and the optional-alt props), keeping defaults.
- [ ] **Step 3:** Create the 8 schema files and register them in `sections/index.ts`.
- [ ] **Step 4:** Create the 8 adapters and register them, plus the `PageSectionData` members.
- [ ] **Step 5:** Run `pnpm exec playwright test tests/page-builder tests/hero.spec.ts tests/page.spec.ts`. Expected: PASS.
- [ ] **Step 6:** Run `pnpm type-check && pnpm lint`, then commit `feat(cms): hero, CTA, contact and partners section types`.

### Task 5: Expertise family

**Components:** ExpertiseSalesforceSection, ExpertisePlatformsSection, ExpertiseDescriptionSection, ExpertiseCertifiedSection, ExpertiseImplementationSection, ExpertiseChallengesSection, ExpertiseFeaturesSection, ExpertiseStackSection, ExpertiseSection, IdentityResolutionSection.

| Component | Fields |
| --- | --- |
| ExpertiseSalesforceSection | `heading` → `markHeadingField`, `imageVariant` (`framed`, `framed-wide`, default), `hideMark`, image plus alt, and the rest of the props. |
| ExpertiseDescriptionSection | `heading` → `markHeadingField` (`section` and `heroSmall` styles occur), `paragraphs`, `hideCta`, CTA fields. |
| ExpertiseImplementationSection | `heading` → `markHeadingField`. All six usages are plain text with no mark, but a fragment is passed. Check for `<br/>`. |
| ExpertiseChallengesSection | `title` → `markHeadingField`. Item icons are rendered as CSS masks, so they are plain images; keep the mask rendering. |
| ExpertisePlatformsSection | Items get `bgGradient` enum (the values from the pages) and an `href` string. The component prefers `item.href` and falls back to `PLATFORM_HREFS[title]`, so pages still in code keep working. |
| ExpertiseSection (P4) | Export `expertiseItems` as the default. Items get `shadow` enum and `href` (same preference rule). |
| ExpertiseStackSection (P4) | Export its local items (including the hidden Revenue Cloud entry and its hidden flag) as `DEFAULT_STACK_ITEMS`, and add a `hidden` boolean to the item type. The section uses `position: sticky`; the wrapper rule in Task 2's note applies. |
| ExpertiseCertifiedSection | Badge images get alts seeded "Certification N" (an optional per-item alt, defaulting to today's). |
| ExpertiseFeaturesSection, IdentityResolutionSection (P4) | All content is editable. IdentityResolution keeps the `identiy-mob.png` filename (reported separately, not renamed). |

**Test:** `tests/page-builder/expertise.spec.ts` covers P5 for all ten. It must include:
- the `href` preference (`item.href` wins, missing `href` keeps the title lookup)
- the hidden stack item

- [ ] **Step 1:** Write the test. Run it and confirm it fails.
- [ ] **Step 2:** Make the component changes, including the `href` preference with a code comment explaining the fallback.
- [ ] **Step 3:** Create the schemas and register them.
- [ ] **Step 4:** Create the adapters and register them.
- [ ] **Step 5:** Run `pnpm exec playwright test tests/page-builder tests/page.spec.ts`. Expected: PASS.
- [ ] **Step 6:** Run `pnpm type-check && pnpm lint`, then commit `feat(cms): expertise section types`.

### Task 6: Listings and shared home sections

**Components:** PageBlogsSection, ServiceCaseStudiesSection, WhyChooseSection, FaqSection, WhatWeDoSection, CertifiedSection, PlatformsSection.

| Component | Fields |
| --- | --- |
| ServiceCaseStudiesSection | `title`, `caseStudies` (array of references to `caseStudy`), `viewAllHref`, `inlineCards` (only if Task 10's check finds recruitment fallback cards with no document; otherwise omit). Add a projection clause to `pageSectionsProjection`: `_type == "serviceCaseStudiesSection" => { ..., caseStudies[]->{ title, slug, technologies, industry, coverImage { asset->{ url } } } }`. Export the card mapper from `src/lib/pageCaseStudies.ts` as `toServiceCaseStudyCards(caseStudies)` and use it in both places. An empty list renders nothing, as today. |
| PageBlogsSection | `title`, `posts` (array of references to `post`). Projection clause: copy the `posts[]->{…}` projection from `PAGE_BLOGS_QUERY`. Map with `toBlogTeaserCards`. An empty list renders nothing. |
| WhyChooseSection | `title`, `reasons` (P4 default `reasons`), item `color` enum, image plus alt, `backgroundOverlayColor` enum (`#616161`, or empty). |
| WhatWeDoSection (P4) | `tabs` default, `backgroundOverlayColor` enum. |
| FaqSection | `title`, `faqs[]` (question, answer). The default title's two-span split only happens when the title equals the default; keep that behaviour. |
| CertifiedSection | `title` with a newline mapped to its `<br/>` default (use `markHeadingField` and convert to `ReactNode`; the prop type widens from `string` to `ReactNode`, with the default unchanged). `description`. |
| PlatformsSection | `title`, `logos[]` as content images plus alt. Seed alt "Platform Logo" to match today; add an optional per-logo alt prop defaulting to `"Platform Logo"`. Keep the flex-wrap layout. |

**Test:** `tests/page-builder/listings.spec.ts`. It includes references mapped through `toServiceCaseStudyCards` and `toBlogTeaserCards`, and empty lists returning `null`.

- [ ] **Step 1:** Write the test. Run it and confirm it fails.
- [ ] **Step 2:** Make the component and lib changes (export `toServiceCaseStudyCards` and switch `getPageCaseStudies` to it).
- [ ] **Step 3:** Create the schemas and projection clauses, and register them.
- [ ] **Step 4:** Create the adapters and register them.
- [ ] **Step 5:** Run `pnpm exec playwright test tests/page-builder tests/page-blogs.spec.ts tests/page.spec.ts tests/section-order.spec.ts`. Expected: PASS.
- [ ] **Step 6:** Run `pnpm type-check && pnpm lint`, then commit `feat(cms): listing and shared home section types`.

### Task 7: Home and about family

**Components:** IndustriesSection, BelieveSection, TeamThoughtsSection, TeamGallerySection, ExploreSection, EventsSection, CategoriesSection.

All of these apply P4. Notes:
- **IndustriesSection:** keep `unoptimized`.
- **BelieveSection:** card `bgImage` is a CSS background, so it's a plain image.
- **TeamThoughtsSection:** quotes and photos. The mobile carousel uses the same data.
- **TeamGallerySection:** photos plus today's per-photo alts.
- **EventsSection:** `events[]` holds name, description, `bg` (plain), `logo` (content image), the logo display size (seed with today's display width/height; the `--logo-w` CSS var reads from it) and `photos[]` (content images, decorative alt ""). Keep the folder-typo paths as-is; they are only seed sources.
- **CategoriesSection:** `boxGradient`/`iconGradient` enums with today's 8 values, and `href` per item (Support has none).

**Test:** `tests/page-builder/home.spec.ts` covers P5 for all seven, including that an event's logo size passes through unchanged.

- [ ] **Step 1:** Write the test. Run it and confirm it fails.
- [ ] **Step 2:** Make the component changes (P4).
- [ ] **Step 3:** Create the schemas and register them.
- [ ] **Step 4:** Create the adapters and register them.
- [ ] **Step 5:** Run `pnpm exec playwright test tests/page-builder tests/events-section.spec.ts tests/page.spec.ts`. Expected: PASS.
- [ ] **Step 6:** Run `pnpm type-check && pnpm lint`, then commit `feat(cms): home and about section types`.

### Task 8: Industry and partnership family

**Components:** SplitComparisonSection, ServiceBenefitsSection, OrganisationTypesSection, OutcomeCardsSection, ExplainerCardsSection, TrueCostSection, SolutionTypesSection, IndustryDetailSection, ComparisonSection.

| Component | Fields |
| --- | --- |
| SplitComparisonSection | `heading` and `cards[].title` → `markHeadingField`. `cards[].color` is a hex enum. `className` enum: the default, or `bg-linear-to-b from-white to-brand-blue-light` (the three partnership pages). |
| ServiceBenefitsSection | `items[].iconKey` enum extended with the lucide icons the partnership pages pass. Map key → component in the adapter: import the icons by name from `lucide-react`, and add the keys to `ServiceBenefitIconKey` in `src/sanity/lib/types.ts` without changing the existing keys. `colorTheme` stays an existing enum. |
| ExplainerCardsSection | `heading` and `cards[].title` → `markHeadingField`. `iconVariant` (`plain`, default). The tile icons use a CSS mask, so they are plain images. |
| TrueCostSection, ComparisonSection, SolutionTypesSection | `heading` → `markHeadingField`. Colour and background enums use exactly the values found. Icons are plain images. |
| OrganisationTypesSection, OutcomeCardsSection, IndustryDetailSection (P4) | All content is editable. Images use today's alts ("" where today is ""). |

**List keys:** OutcomeCards, TrueCost and the comparison items use the item text as the React key. Switch to the index, because editors may duplicate entries. Output is unchanged.

**Empty lists:** ExpertiseFeatures, ExplainerCards and ExpertiseSection render an empty section when given `[]`. The adapter passes `undefined` for an empty array only where that reproduces today's output; otherwise it returns `null` when the list is empty.

**Test:** `tests/page-builder/industry.spec.ts` covers P5 for all nine, including the lucide key → component map.

- [ ] **Step 1:** Write the test. Run it and confirm it fails.
- [ ] **Step 2:** Make the component changes.
- [ ] **Step 3:** Create the schemas and register them.
- [ ] **Step 4:** Create the adapters and register them.
- [ ] **Step 5:** Run `pnpm exec playwright test tests/page-builder`. Expected: PASS.
- [ ] **Step 6:** Run `pnpm type-check && pnpm lint`, then commit `feat(cms): industry and partnership section types`.

### Task 9: New components for inline blocks (recruitment, privacy)

**Create components** in `src/components/sections/` by moving the JSX verbatim from the route files. Do not change any class names. The props default to today's values, which are exported as `DEFAULT_*`. Export each from `sections/index.ts`.

| New component | Source (see `inventory-pages.md`) |
| --- | --- |
| `RecruitmentIntroSection` | The recruitment intro band. Replace `bg-[#eff6ff]` with an `@theme` token of the same value (add `--color-recruitment-intro: #eff6ff` if no token has that value). |
| `TalentPillsSection` | "Salesforce Talent We Offer", including the local `TalentPillsRow` logic. Rows are string arrays. Keep the marquee class names so the reduced-motion rule still applies. |
| `HiringModelsSection` | "Choose The Right Hiring Model": two cards plus a photo. |
| `ProcessStepsSection` | Six steps, dashed connector, image icons (plain images). |
| `WhyBandSection` | The "Why ProvidusCRM" raw `<section>`: background image (plain), four cards, photo (content image). The Tailwind class strings in its data (`titleClass`, `borderClass`, `shadowClass`, `gradient`) become enums of exactly today's values. |
| `FeaturedRolesSection` | Move `src/app/(site)/salesforce-recruitment-agency/FeaturedRolesCarousel.tsx` here. Roles become a prop with `DEFAULT_FEATURED_ROLES`. Keep `"use client"`. The route keeps working by importing from the new location until Task 13. |
| `RichTextSection` | `/privacy-policy`: `<Section background="white" className="py-16 md:py-24">` → `<Container>` → `<article className="mx-auto max-w-3xl">`. The body is Portable Text. Custom serializers reproduce exactly: the `H2` helper (`Heading as="h2" level="h4" className="mt-12 mb-4 text-black"`), the `P` helper (`Text variant="p3" className="mb-4 text-gray-700"`), bullets (`ul.mb-4.list-disc.space-y-2.pl-6.text-gray-700` with `Text variant="p3" as="span"` items), strong, links (mailto/tel/external with today's classes and target/rel), and an `address` block style (`not-italic`, `<br/>` per line). The page heading is a separate `title` (h1, `level="h2"`) plus an optional `subtitle` ("Last updated…"). |

**Route refactor:** the route files (recruitment and privacy) switch to the new components with no props, so they render identically while still static.

**Proof of identical output:**
1. Before touching the route files, capture `curl -s localhost:3002/<route>` HTML for the two routes into the scratchpad.
2. Make the change.
3. Diff the `<main>` inner HTML. Expected: identical, apart from React key order and generated ids. Save the diff in the task report.

**Schemas and adapters** for all seven: per P1, P2 and P5. For RichTextSection, the Portable Text block field uses styles `normal`, `h2` and `address`, the `bullet` list, the `strong` decorator and a `link` annotation (`href` validated as http/https/mailto/tel/relative).

**Test:** `tests/page-builder/new-sections.spec.ts` covers P5 for all seven, including that the RichText serializer maps an `address` block to `<address className="… not-italic">`.

- [ ] **Step 1:** Capture the before-HTML for `/salesforce-recruitment-agency` and `/privacy-policy`.
- [ ] **Step 2:** Write the test. Run it and confirm it fails.
- [ ] **Step 3:** Create the 7 components by moving the JSX, and switch the two route files to them.
- [ ] **Step 4:** Diff the after-HTML. Expected: identical. Fix any difference before continuing.
- [ ] **Step 5:** Create the schemas and adapters, and register them.
- [ ] **Step 6:** Stage gate: `pnpm type-check && pnpm lint && rm -rf .next && pnpm build && pnpm test`, then restart `crm-web-dev` via the preview tool. Commit `feat(cms): recruitment and privacy section components and types`.

---

## Stage 3: Seed under `preview/` and reconcile

### Task 10: Seed runner

**Files:**
- Create: `scripts/seed-pages.ts` (the runner), `scripts/seed-pages/lib.ts` (the walker, image placeholders, legacy copy)
- Create: `scripts/seed-pages/types.ts` (`SeedPage`)
- Test: `tests/seed-walk.spec.ts`
- Modify: `package.json` (add the script `"seed:pages": "tsx scripts/seed-pages.ts"`)

**Interfaces:**
- **Produces:**
  - `img(path: string, alt?: string): ImagePlaceholder`
  - `ref(id: string): { _type: "reference"; _ref: string }`
  - `heading(text: string, opts?: { mark?: "after"; markStyle?: "hero" | "heroSmall" | "section"; markSpace?: boolean })`
  - `SeedPage = { slug: string; title: string; legacyKey?: string; clipOverflowX?: boolean; seoFallback: { title: string; description?: string; image?: string }; jsonLdFallback?: JsonLdValue; sections: SeedSection[] }`
  - `prepareDocument(page: SeedPage, opts: { prefix: string; upload: (path: string) => Promise<string>; legacy: LegacyValues }): Promise<SanityDocument>`

- [ ] **Step 1: Write the failing test** `tests/seed-walk.spec.ts`

```ts
import { test, expect } from "@playwright/test";
import { img, heading, prepareDocument } from "../scripts/seed-pages/lib";

test("prepareDocument uploads each image once, adds _keys, applies the prefix", async () => {
  const uploads: string[] = [];
  const doc = await prepareDocument(
    {
      slug: "industries/x",
      title: "X",
      seoFallback: { title: "X title", description: "X desc", image: "/images/x.webp" },
      sections: [
        { _type: "heroSection", title: heading("Hello", { mark: "after", markStyle: "hero" }), image: img("/images/a.webp", "Business meeting") },
        { _type: "platformsSection", logos: [img("/images/a.webp", "Platform Logo"), img("/images/b.webp", "Platform Logo")] },
      ],
    },
    { prefix: "preview/", upload: async (p) => { uploads.push(p); return `image-${uploads.length}abc-10x10-webp`; }, legacy: {} }
  );
  expect(doc._id).toBe("page-preview-industries-x");
  expect((doc.slug as { current: string }).current).toBe("preview/industries/x");
  expect(uploads).toEqual(["/images/a.webp", "/images/b.webp", "/images/x.webp"]);
  const sections = doc.sections as Record<string, unknown>[];
  expect(sections.every((s) => typeof s._key === "string")).toBe(true);
  const logos = sections[1].logos as Record<string, unknown>[];
  expect(logos.every((l) => typeof l._key === "string")).toBe(true);
  expect(logos[0]).toMatchObject({ _type: "image", alt: "Platform Logo", asset: { _type: "reference", _ref: "image-1abc-10x10-webp" } });
  expect((doc.seo as Record<string, unknown>).metaTitle).toBe("X title");
});

test("legacy SEO wins over the code fallback, field by field", async () => {
  const doc = await prepareDocument(
    { slug: "about", title: "About", legacyKey: "about", seoFallback: { title: "About Us", description: "Code desc" }, sections: [] },
    { prefix: "", upload: async () => "image-a-1x1-png", legacy: { about: { seo: { metaDescription: "CMS desc" } } } }
  );
  expect(doc.seo).toMatchObject({ metaTitle: "About Us", metaDescription: "CMS desc" });
});
```

Run: `pnpm exec playwright test tests/seed-walk.spec.ts`
Expected: FAIL with "Cannot find module".

- [ ] **Step 2: Implement `scripts/seed-pages/lib.ts`**

```ts
import { randomUUID } from "node:crypto";
import { pageDocumentId } from "../../src/lib/pagePaths";
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

export const img = (path: string, alt?: string): ImagePlaceholder => ({ __seedImage: path, ...(alt !== undefined && { alt }) });
export const ref = (id: string) => ({ _type: "reference" as const, _ref: id });
export const heading = (
  text: string,
  opts: { mark?: "after"; markStyle?: "hero" | "heroSmall" | "section"; markSpace?: boolean } = {}
) => ({ text, mark: opts.mark ?? "none", ...(opts.mark && { markStyle: opts.markStyle ?? "hero", markSpace: opts.markSpace ?? true }) });

function isPlaceholder(v: unknown): v is ImagePlaceholder {
  return typeof v === "object" && v !== null && "__seedImage" in v;
}

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Replace image placeholders (uploading each path once) and key every array object. */
async function walk(value: unknown, upload: (p: string) => Promise<string>, cache: Map<string, Promise<string>>): Promise<unknown> {
  if (isPlaceholder(value)) {
    if (!cache.has(value.__seedImage)) cache.set(value.__seedImage, upload(value.__seedImage));
    const assetId = await cache.get(value.__seedImage)!;
    return { _type: "image", asset: { _type: "reference", _ref: assetId }, ...(value.alt !== undefined && { alt: value.alt }) };
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      const walked = await walk(item, upload, cache);
      // Sanity requires a _key on every object in an array (images included);
      // plain string arrays (bullets, pill rows) stay as they are.
      out.push(walked && typeof walked === "object" && !Array.isArray(walked) ? { _key: key(), ...(walked as object) } : walked);
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = await walk(v, upload, cache);
    }
    return out;
  }
  return value;
}

export async function prepareDocument(
  page: SeedPage,
  opts: { prefix: string; upload: (path: string) => Promise<string>; legacy: LegacyValues; cache?: Map<string, Promise<string>> }
) {
  const cache = opts.cache ?? new Map<string, Promise<string>>();
  const slug = `${opts.prefix}${page.slug}`;
  const legacy = page.legacyKey ? opts.legacy[page.legacyKey] ?? {} : {};
  // Code fallbacks first, then any non-empty CMS value on top (field by field),
  // so the seeded page reproduces exactly what generateStaticPageMetadata served.
  const seo: Record<string, unknown> = {
    metaTitle: page.seoFallback.title,
    ...(page.seoFallback.description && { metaDescription: page.seoFallback.description }),
    ...(page.seoFallback.image && { ogImage: img(page.seoFallback.image) }),
  };
  for (const [k, v] of Object.entries(legacy.seo ?? {})) {
    if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)) seo[k] = v;
  }
  const jsonLd = legacy.jsonLd?.schemaJson || legacy.jsonLd?.enabled === false
    ? legacy.jsonLd
    : page.jsonLdFallback
      ? { enabled: true, schemaJson: JSON.stringify(page.jsonLdFallback, null, 2) }
      : undefined;

  const body = await walk(
    { title: page.title, clipOverflowX: page.clipOverflowX || undefined, sections: page.sections, seo: { _type: "seo", ...seo }, jsonLd: jsonLd && { _type: "jsonLd", ...jsonLd } },
    opts.upload,
    cache
  );
  return {
    _id: pageDocumentId(slug),
    _type: "page",
    slug: { _type: "slug", current: slug },
    ...(body as Record<string, unknown>),
  };
}
```

**Legacy SEO images:** a legacy `ogImage` is copied from the raw, unprojected `seo` field (Step 3 fetches it that way), so it is already an `{ asset: { _ref } }` reference and passes through the walker untouched.

**Checks:**
- **Upload order:** uploads must happen in document order (sequential `await`) so the test's upload-order expectation is deterministic.
- **Seeded SEO must render identically:** the catch-all's metadata builds from `seo.metaTitle`, so the title must equal what `generateStaticPageMetadata` produced. When the CMS `staticPageSeo` had a `metaTitle`, that wins. Otherwise the code fallback `title` is written as `metaTitle`. The brand-absolute rule in `buildPageMetadata` applies the same way either way.

- [ ] **Step 3: Implement the runner `scripts/seed-pages.ts`**

```ts
/**
 * ONE-SHOT seed: writes Sanity `page` documents from the static route content.
 * Deleted with the static code (Task 13). Re-running it after editors change
 * pages would overwrite their work with the old static copy.
 *
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages
 *   pnpm seed:pages                       # final slugs
 */
import { createReadStream } from "node:fs";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { prepareDocument, type LegacyValues } from "./seed-pages/lib";
import { SEED_PAGES } from "./seed-pages";

loadEnvConfig(process.cwd());

const dryRun = process.argv.includes("--dry-run");
const prefix = process.env.SEED_SLUG_PREFIX ?? "";
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token && !dryRun) {
  console.error("SANITY_API_WRITE_TOKEN is not set (.env.local). Refusing to fall back to the read token.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  token: token ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

async function loadLegacy(): Promise<LegacyValues> {
  // Raw (unprojected) values so image fields stay asset references.
  const [seoDocs, jsonLdDocs] = await Promise.all([
    client.fetch<{ pageKey: string; seo?: Record<string, unknown>; jsonLd?: LegacyValues[string]["jsonLd"] }[]>(`*[_type == "staticPageSeo"]{ pageKey, seo, jsonLd }`),
    client.fetch<{ pageKey: string; jsonLd?: LegacyValues[string]["jsonLd"] }[]>(`*[_type == "sitePageJsonLd"]{ pageKey, jsonLd }`),
  ]);
  const legacy: LegacyValues = {};
  for (const d of jsonLdDocs) legacy[d.pageKey] = { ...legacy[d.pageKey], jsonLd: d.jsonLd };
  // staticPageSeo.jsonLd wins over sitePageJsonLd, matching getSitePageJsonLd.
  for (const d of seoDocs) legacy[d.pageKey] = { seo: d.seo, jsonLd: d.jsonLd?.schemaJson ? d.jsonLd : legacy[d.pageKey]?.jsonLd };
  return legacy;
}

async function upload(publicPath: string): Promise<string> {
  if (dryRun) return `image-dryrun${publicPath.length}-1x1-png`;
  const file = path.join(process.cwd(), "public", publicPath);
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
  return asset._id;
}

async function main() {
  const legacy = await loadLegacy();
  const cache = new Map<string, Promise<string>>();
  const pages = SEED_PAGES.filter((p) => !only || p.slug === only);
  const docs = [];
  for (const page of pages) docs.push(await prepareDocument(page, { prefix, upload, legacy, cache }));

  if (dryRun) {
    const out = path.join(process.env.TMPDIR ?? "/tmp", "seed-pages.json");
    writeFileSync(out, JSON.stringify(docs, null, 2));
    console.log(`Dry run: ${docs.length} documents written to ${out}`);
    return;
  }
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${docs.length} pages with prefix "${prefix}": ${docs.map((d) => d.slug.current).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**`@next/env`:** check it is resolvable (it ships with Next). If not, copy the `.env` + `.env.local` loading from `scripts/import-migration-page.ts`.

`scripts/seed-pages/index.ts` exports `SEED_PAGES: SeedPage[]`, assembled from the per-page modules of Tasks 11a–11f. It starts empty.

**Recruitment case-study fallback check (record the result in the task report):**
- Run `client.fetch('*[_type=="pageCaseStudies" && pageKey=="staff-augmentation"][0]{"n": count(caseStudies)}')`.
  - If `n > 0`, the four hard-coded cards are never shown and no inline-cards field is needed.
  - If `n` is 0, list the four hard-coded titles, and check each one with `*[_type=="caseStudy" && title==$t][0]._id`.
- Report back to the controller before Task 11e.

- [ ] **Step 4:** Run `pnpm exec playwright test tests/seed-walk.spec.ts`. Expected: PASS.
- [ ] **Step 5:** Run `SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run`. Expected: "Dry run: 0 documents …". There are no pages yet, and no network write happens.
- [ ] **Step 6:** Commit `chore(cms): one-shot page seed runner`.

### Tasks 11a–11f: Per-page seed modules

Each seed module is `scripts/seed-pages/<route-name>.ts`. It exports one `SeedPage` (or several for a family), which is added to `SEED_PAGES`. It is written from the route file:

1. **Constants:** copy every local constant verbatim (FAQs, cards, bullets). Next forbids extra exports from `page.tsx`, so copy, don't import. Retyping is not allowed.
2. **Sections:** translate the JSX section list, in order, into `SeedSection` objects with today's prop values:
   - every image path becomes `img(path, alt)` with today's exact alt
   - JSX headings become `heading(text, opts)`, with `markSpace` matching the JSX whitespace
   - conditional case-study and blog sections take the current CMS selection: `pageCaseStudies` and `pageBlogs` for the route's key, fetched read-only at seed time in the module through a `legacyRefs(key)` helper you add to `lib.ts` (it returns `{ caseStudies: ref[], posts: ref[], sectionTitle }`)
   - props the route omits are omitted
3. **Component defaults:** sections that rely on them (no props passed) write the defaults explicitly from the `DEFAULT_*` exports. That way editors see the content, and the render is unchanged.
4. **Page settings:**
   - `clipOverflowX: true` for the nine pages with the wrapper div.
   - `seoFallback` from the route's `generateMetadata` fallback.
   - `legacyKey` from `inventory-pages.md` (recruitment is `staff-augmentation`; the partnership children are `partnership-*`).
   - `jsonLdFallback` from the route's inline JSON-LD object (copied verbatim).
5. **Dry run:** after adding a module, run `SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run --only=<slug>`. Then check every section the route renders is present, in order, by comparing against the route source line by line. The report lists the section order side by side.

| Task | Modules |
| --- | --- |
| 11a | `home.ts` (home, including the dynamic PartnersSection and both PlatformsSections), `about.ts`, `contact.ts` |
| 11b | `parents.ts`: `/industries`, `/partnership`, `/platform-expertise`, `/services` |
| 11c | `industries.ts`: the 5 industry children |
| 11d | `platform-expertise.ts`: the 6 platform children |
| 11e | `partnership.ts` (3 children) and `recruitment.ts` (recruitment, using the fallback decision from Task 10) |
| 11f | `privacy.ts`: privacy, converting the article into Portable Text blocks with `_type: "block"`, styles `h2`/`normal`/`address`, the bullet list, `strong` marks, and link `markDefs` for the mailto, tel and ico.org.uk links |

Each task commits `chore(cms): seed module for <pages>`.

### Task 12: Preview seed and reconciliation (controller only)

This task is done by the controller, not a subagent.

- [ ] **Step 1: Write token**
  - Confirm with the user that `SANITY_API_WRITE_TOKEN` is in `.env.local`.
  - Confirm the preview write (23 `page-preview-*` documents plus image assets in the production dataset).
- [ ] **Step 2: Seed**
  - Run `SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run`, then `SEED_SLUG_PREFIX=preview/ pnpm seed:pages`.
  - Expected: "Seeded 23 pages with prefix "preview/"".
- [ ] **Step 3: Reference build at `0a9c2de`:**

```bash
S=/private/tmp/claude-501/-Users-mujtabakamal-Projects-CRM-Web/f5228286-0e00-44b9-98e3-a0c566ac9194/scratchpad
git worktree add "$S/ref-wt" 0a9c2de
cp .env "$S/ref-wt/.env"
cd "$S/ref-wt" && pnpm install --frozen-lockfile && rm -rf .next && pnpm build && pnpm exec next start -p 3005
```

Run the last command in the background.

- [ ] **Step 4: Branch build**

```bash
rm -rf .next && pnpm build && pnpm exec next start -p 3004
```

Run it in the background.

- [ ] **Step 5: Measure every page** in the in-app browser at 1440×900, then at 375×812. Open the reference `http://localhost:3005/<path>` and the branch `http://localhost:3004/preview/<slug>`, and run:

```js
await new Promise((r) => setTimeout(r, 1500));
// Scroll through so lazy sections and Reveal animations settle.
for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
const main = document.querySelector("main");
// Top-level sections: on the branch, unwrap the data-section-type wrapper.
const tops = [...main.children].flatMap((el) => (el.matches("[data-section-type]") || el.matches(".overflow-x-hidden")) ? [...el.children].flatMap((c) => c.matches("[data-section-type]") ? [...c.children] : [c]) : [el]);
const sections = tops.map((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { tag: el.tagName, top: Math.round(r.top + scrollY), h: Math.round(r.height), pt: cs.paddingTop, pb: cs.paddingBottom, mt: cs.marginTop }; });
const headings = [...main.querySelectorAll("h1,h2,h3")].map((h) => `${h.tagName}:${h.textContent.trim().replace(/\s+/g, " ")}`);
const links = [...main.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
const images = [...main.querySelectorAll("img")].map((i) => decodeURIComponent(i.currentSrc || i.src).replace(/^.*[/=]/, "").replace(/[&?].*$/, ""));
({ sections, headings, links, images, docH: document.body.scrollHeight })
```

- [ ] **Step 6: Reconcile**

  **Pass criteria:**
  - Section count, `top` and `h` match within 3px.
  - Headings match exactly.
  - Links match. The only allowed difference is none: hrefs must be identical.
  - Images match by filename: resolve branch Sanity asset ids to `originalFilename` with `*[_type=="sanity.imageAsset" && _id in $ids]{_id, originalFilename}`.

  **Fixing differences:**
  - Fix in the adapter, schema or seed module (re-run `--only=<slug>`). Never in the component's defaults.
  - Where the renderer would insert an automatic gap between two consecutive dark bands, the fix is an explicit `spacing.top` that replaces the component's margin. It must never add to it.
  - If a section's wrapper changes its measurement, add the type to `WRAPPER_CONTENTS` in `PageSections.tsx`.

  **Recording:** results go in a reconciliation table in `.superpowers/sdd/progress.md` (page × width × pass/fail, with the max delta).
- [ ] **Step 7: Stage gate and commit** the fixes: `pnpm type-check && pnpm lint && rm -rf .next && pnpm build && pnpm test`.

---

## Stage 4: Switch

### Task 13: Final slugs, delete static code, trim legacy keys (controller-supervised)

- [ ] **Step 1: Final seed**
  - Confirm the final seed with the user.
  - Run `pnpm seed:pages --dry-run`, then `pnpm seed:pages`.
  - Expected: "Seeded 23 pages with prefix """, with ids `page-home`, `page-about` and so on.
- [ ] **Step 2: Routing switch**
  - `git mv "src/app/(site)/[...slug]" "src/app/(site)/[[...slug]]"`, and delete `src/app/(site)/page.tsx` in the same commit.
  - Delete the 22 other migrated route files (and their now-empty folders), plus `salesforce-recruitment-agency/FeaturedRolesCarousel.tsx` if anything still remains there.
  - Keep `section-thumbs-preview`, `blog`, `case-studies`, `services/[slug]` and `salesforce/[slug]`.
  - **`services/page.tsx`:** it is the services index route and is migrated, so it is deleted. The folder keeps only `[slug]/page.tsx`.
- [ ] **Step 3: Delete the seed and trim keys**
  - Delete `scripts/seed-pages.ts`, `scripts/seed-pages/`, the `seed:pages` script and `tests/seed-walk.spec.ts`.
  - Trim `STATIC_PAGE_OPTIONS` in `src/lib/pageKeys.ts`, `PageCaseStudyKey`, the `pageCaseStudies` schema list and the `pageBlogs` options to the routes still in code (`blog`, `case-studies` and any other remaining key `grep` finds in use).
  - Update `scripts/check-page-blogs.ts` to match.
  - `pnpm type-check` must pass. Any remaining caller of a removed key is a migrated route that should have been deleted, so fix it there.
- [ ] **Step 4: Sitemap:** remove the hard-coded `staticUrls` entries for migrated routes. Keep `/blog` and `/case-studies`.
- [ ] **Step 5: Tests**
  - `tests/title.spec.ts`'s paths still apply, since the URLs are unchanged.
  - Add to `tests/page-route.spec.ts`: `/` renders the home hero, and `/home` returns 404, which is still true.
  - Run the full `pnpm test`.
- [ ] **Step 6: Docs**
  - `SANITY.md`: `page` documents, Studio lists, slug rules, section spacing override, the webhook filter must include `page`, and restoring from history. Note that the seed was one-shot; see git history at the commit before this one, and Sanity document history.
  - `CLAUDE.md` architecture: the route groups and the Sanity integration paragraph.
  - `PROGRESS.md`: a short entry.
- [ ] **Step 7: Verification (controller)**
  - Clean build: `rm -rf .next && pnpm build && pnpm exec next start -p 3004`.
  - Every migrated route returns 200, and its `<title>` equals the reference server's.
  - `/home` returns 404.
  - `curl :3004/sitemap.xml` lists each page once, with no `/home` or `/preview/`.
  - `/services/salesforce-consulting-services`, `/blog`, a blog post, `/case-studies`, a case study and `/section-thumbs-preview` return 200 and are unchanged.
  - `POST /api/revalidate?secret=…` with `{"_type":"page","slug":{"current":"home"}}` returns `revalidated: true`, and a subsequent home render reflects a draft-free published edit. Only test this with the user's go-ahead on a real edit; otherwise verify the `revalidatePath("/")` call with a unit assertion.
- [ ] **Step 8: Delete the preview documents:** ask the user first. Then delete the 23 `page-preview-*` documents by explicit id: build the list with `pageDocumentId("preview/" + slug)` for every seeded slug, and delete it in one transaction (`client.transaction()` with `.delete(id)` per id). Never select by `match`, which ignores `/`.
- [ ] **Step 9: Stage gate, commit and push**

```bash
pnpm type-check && pnpm lint && rm -rf .next && pnpm build && pnpm test
git add -A && git commit -m "feat(cms)!: serve static pages from Sanity page documents

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -u origin feat/sanity-page-builder
```

- [ ] **Step 10: Report**
  - The migrated pages.
  - The new section types.
  - The fidelity fields added.
  - What remains in code and why.
  - The reconciliation summary.
  - The client's Studio steps: the webhook filter adds `page`; creating a page (slug rules, Parent vs Dynamic); spacing override usage; restoring from history; that the branch must be merged only after the final seed.
