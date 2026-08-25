# Section Thumbnails in the Services Picker — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the `servicePage.sectionOrder` picker a recognisable thumbnail per section, in both the row and the open menu.

**Architecture:** A `data-section-key` wrapper on the service-page template makes each section addressable for a Playwright capture script, which screenshots all 13 sections into `public/studio-thumbnails/`. The `sectionOrderOptions` array gains a `thumbnail` field (ignored by Sanity's native select), and a custom `SectionPicker` input component renders the thumbnail beside the section name using `@sanity/ui`'s `MenuButton`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Sanity Studio v4.18, `@sanity/ui` 3.2.0, Playwright 1.60, `tsx`.

## Global Constraints

- 13 sections only — `partners, certified, caseStudies, tabs, consultantCta, benefits, process, migrationPlatforms, expertise, industries, whyChoose, faqs, cta`. No new sections.
- Thumbnails live at `public/studio-thumbnails/<key>.webp` (URL `/studio-thumbnails/<key>.webp`). **Note:** the spec said `public/studio/section-thumbnails/`; this plan uses `public/studio-thumbnails/` to avoid any path ambiguity with the `/studio` route itself.
- `data-section-key` is added **only** to the service-page template (`src/app/(site)/salesforce/[slug]/page.tsx`), nowhere else.
- A missing thumbnail (file absent or fails to load) must degrade to name-only — never break the picker.
- No change to public rendering beyond the wrapper `<div>`.
- The value written to the document stays the plain section-key string, unchanged.
- TypeScript strict: no `any`, no `as any`.
- Capture script runs against an **already-running** dev server at `http://localhost:3002` (it does not start one).

---

### Task 1: `data-section-key` wrapper

**Files:**
- Modify: `src/app/(site)/salesforce/[slug]/page.tsx:3` (import) and `:261-263` (render)
- Test: `tests/section-order.spec.ts`

**Interfaces:**
- Produces: every section on a service page is wrapped in `<div data-section-key="<key>">`, so the capture script (Task 2) can locate sections by key rather than index. The attribute is also a stable hook for the regression test.

- [ ] **Step 1: Write the failing test**

Create `tests/section-order.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

const EXPECTED_KEYS = [
  "partners",
  "certified",
  "caseStudies",
  "tabs",
  "consultantCta",
  "benefits",
  "process",
  "migrationPlatforms",
  "expertise",
  "industries",
  "whyChoose",
  "faqs",
  "cta",
];

test("service page wraps every section in a data-section-key marker", async ({
  page,
}) => {
  await page.goto("/services/salesforce-consulting-services");

  const keys = await page
    .locator("[data-section-key]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("data-section-key")));

  expect(keys).toHaveLength(13);
  expect([...new Set(keys)].sort()).toEqual([...EXPECTED_KEYS].sort());
});
```

The assertion is order-independent because the fallback page renders `getOrderedServiceSectionKeys(undefined)`, which returns the full 13-key default order, and the wrapper is emitted for every key — including keys whose section returns `null` (the wrapper is an empty `<div>`, still carrying the attribute).

- [ ] **Step 2: Run the test to confirm it fails**

Run: `pnpm exec playwright test tests/section-order.spec.ts`
Expected: FAIL — `expect(received).toHaveLength(13)` fails because no `[data-section-key]` elements exist yet (length 0).

- [ ] **Step 3: Implement the wrapper**

In `src/app/(site)/salesforce/[slug]/page.tsx`, change the import (line 3):

```tsx
import { Fragment, type ReactNode } from "react";
```

to:

```tsx
import { type ReactNode } from "react";
```

And change the render (lines 261-263) from:

```tsx
      {orderedSectionKeys.map((sectionKey) => (
        <Fragment key={sectionKey}>{sectionRenderers[sectionKey]}</Fragment>
      ))}
```

to:

```tsx
      {orderedSectionKeys.map((sectionKey) => (
        <div key={sectionKey} data-section-key={sectionKey}>
          {sectionRenderers[sectionKey]}
        </div>
      ))}
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `pnpm exec playwright test tests/section-order.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/salesforce/[slug]/page.tsx" tests/section-order.spec.ts
git commit -m "feat: tag service-page sections with data-section-key"
```

---

### Task 2: Capture script

**Files:**
- Create: `scripts/capture-section-thumbnails.ts`
- Modify: `package.json` (add `thumbs:sections` script)

**Interfaces:**
- Consumes: `[data-section-key="<key>"]` wrappers from Task 1, plus `section:has(a[href^="/case-studies/"])` for `caseStudies` (renders on a static page, not the service template).
- Produces: 13 WebP files in `public/studio-thumbnails/`, consumed by Task 3's metadata and Task 4's component.

- [ ] **Step 1: Write the capture script**

Create `scripts/capture-section-thumbnails.ts`:

```ts
import { chromium } from "@playwright/test";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3002";
const OUT_DIR = path.join(process.cwd(), "public", "studio-thumbnails");
const MIN_BYTES = 1024;

type Source = { url: string; selector?: string };

// The fallback page renders 11 of the 13 sections with no Sanity content.
// `caseStudies` and `migrationPlatforms` need explicit sources because they
// return null on the fallback page.
const DEFAULT_URL = "/services/salesforce-consulting-services";

const SOURCES: Record<string, Source> = {
  partners: { url: DEFAULT_URL },
  certified: { url: DEFAULT_URL },
  caseStudies: {
    url: "/platform-expertise/salesforce-sales-cloud-consulting",
    selector: 'section:has(a[href^="/case-studies/"])',
  },
  tabs: { url: DEFAULT_URL },
  consultantCta: { url: DEFAULT_URL },
  benefits: { url: DEFAULT_URL },
  process: { url: DEFAULT_URL },
  migrationPlatforms: { url: "/services/salesforce-migration-services" },
  expertise: { url: DEFAULT_URL },
  industries: { url: DEFAULT_URL },
  whyChoose: { url: DEFAULT_URL },
  faqs: { url: DEFAULT_URL },
  cta: { url: DEFAULT_URL },
};

const captured: string[] = [];
const missed: string[] = [];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    for (const [key, source] of Object.entries(SOURCES)) {
      const selector = source.selector ?? `[data-section-key="${key}"]`;
      try {
        await page.goto(`${BASE_URL}${source.url}`, { waitUntil: "load" });
        const locator = page.locator(selector).first();
        await locator.waitFor({ state: "visible", timeout: 15000 });
        await locator.scrollIntoViewIfNeeded();
        // Let lazy images and in-view (Reveal) animations settle.
        await page.waitForTimeout(600);

        const filePath = path.join(OUT_DIR, `${key}.webp`);
        await locator.screenshot({ path: filePath, type: "webp", quality: 75 });
        const { size } = await stat(filePath);
        if (size < MIN_BYTES) {
          missed.push(`${key} (${size} bytes < ${MIN_BYTES})`);
        } else {
          captured.push(key);
        }
      } catch (error) {
        missed.push(`${key}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`Captured ${captured.length}/${Object.keys(SOURCES).length}: ${captured.join(", ")}`);
  if (missed.length > 0) {
    console.error(`Missed ${missed.length}: ${missed.join("; ")}`);
    process.exit(1);
  }
}

void main();
```

- [ ] **Step 2: Add the npm script**

In `package.json`, add to the `scripts` object (alphabetical, next to `check:page-blogs`):

```json
"thumbs:sections": "tsx scripts/capture-section-thumbnails.ts",
```

- [ ] **Step 3: Run the script**

With the dev server already running (`pnpm dev`), run: `pnpm thumbs:sections`
Expected: `Captured 13/13: …` and `ls public/studio-thumbnails/` shows 13 `.webp` files.

If the environment has no Sanity content, `caseStudies` and/or `migrationPlatforms` are reported as missed — that is expected information, not a code failure. In the editor's Sanity-configured environment both pages have content and all 13 capture.

- [ ] **Step 4: Verify the output**

Run: `ls public/studio-thumbnails/ | wc -l` and `find public/studio-thumbnails -name '*.webp' -size +1k | wc -l`
Expected: both `13` in a fully-configured environment.

- [ ] **Step 5: Commit**

The generated `.webp` files are build artifacts — commit them so the Studio has thumbnails without anyone re-running the script.

```bash
git add scripts/capture-section-thumbnails.ts package.json public/studio-thumbnails/
git commit -m "feat: capture section thumbnails for the services picker"
```

---

### Task 3: Thumbnail metadata on `sectionOrderOptions`

**Files:**
- Modify: `src/sanity/schemaTypes/servicePage.ts:31-45`

**Interfaces:**
- Produces: each entry in `sectionOrderOptions` carries a `thumbnail` URL. `options.list` passes unknown keys through untouched, so the native select keeps working if the custom component is ever removed. Task 4's component reads this same list.

- [ ] **Step 1: Add `thumbnail` to every entry**

In `src/sanity/schemaTypes/servicePage.ts`, replace the `sectionOrderOptions` block (lines 31-45) with:

```ts
const sectionOrderOptions = [
  { title: "Trusted partners", value: "partners", thumbnail: "/studio-thumbnails/partners.webp" },
  { title: "Certified section", value: "certified", thumbnail: "/studio-thumbnails/certified.webp" },
  { title: "Case studies", value: "caseStudies", thumbnail: "/studio-thumbnails/caseStudies.webp" },
  { title: "Tabs section", value: "tabs", thumbnail: "/studio-thumbnails/tabs.webp" },
  { title: "Consultant CTA (middle)", value: "consultantCta", thumbnail: "/studio-thumbnails/consultantCta.webp" },
  { title: "Benefits timeline", value: "benefits", thumbnail: "/studio-thumbnails/benefits.webp" },
  { title: "Salesforce process", value: "process", thumbnail: "/studio-thumbnails/process.webp" },
  { title: "Migration platforms", value: "migrationPlatforms", thumbnail: "/studio-thumbnails/migrationPlatforms.webp" },
  { title: "Expertise carousel", value: "expertise", thumbnail: "/studio-thumbnails/expertise.webp" },
  { title: "Industries grid", value: "industries", thumbnail: "/studio-thumbnails/industries.webp" },
  { title: "Why choose", value: "whyChoose", thumbnail: "/studio-thumbnails/whyChoose.webp" },
  { title: "FAQs", value: "faqs", thumbnail: "/studio-thumbnails/faqs.webp" },
  { title: "Footer CTA", value: "cta", thumbnail: "/studio-thumbnails/cta.webp" },
];
```

Do not touch `defaultSectionOrder` (line 47) — it still maps `value`s and is unaffected.

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS. (`options.list` accepts extra keys.)

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/servicePage.ts
git commit -m "feat: add thumbnail paths to the section-order options"
```

---

### Task 4: `SectionPicker` Studio component

**Files:**
- Create: `src/sanity/components/SectionPicker.tsx`
- Modify: `src/sanity/schemaTypes/servicePage.ts:1` (import) and `:165-171` (attach component)
- Modify: `package.json` (add `@sanity/ui` dependency)

**Interfaces:**
- Consumes: `sectionOrderOptions` (with `thumbnail`) from Task 3; the 13 WebP files from Task 2.
- Produces: a `StringInputProps`-compatible input component that renders a `MenuButton` — the button shows the selected section's thumbnail + name, the open menu shows every section's thumbnail + name. Writes a plain `set` patch, so the stored value stays the section-key string.

- [ ] **Step 1: Add the `@sanity/ui` dependency**

`@sanity/ui@3.2.0` is already in the dependency graph (transitive via `sanity`) but must be a direct dependency to import it. In `package.json`, add to `dependencies` (alphabetical, after `@sanity/table`):

```json
"@sanity/ui": "^3.2.0",
```

Then run: `pnpm install`
Expected: completes without version churn (it only promotes an existing package to direct).

- [ ] **Step 2: Write the component**

Create `src/sanity/components/SectionPicker.tsx`:

```tsx
import { useCallback } from "react";
import { type StringInputProps, set } from "sanity";
import { Button, Flex, Menu, MenuButton, MenuItem, Text } from "@sanity/ui";

interface SectionOption {
  title: string;
  value: string;
  thumbnail?: string;
}

const thumbStyle = {
  width: 64,
  height: "auto",
  border: "1px solid var(--card-border-color)",
  borderRadius: 4,
} as const;

function Thumb({ src }: { src?: string }) {
  if (!src) return null;
  return <img src={src} alt="" style={thumbStyle} />;
}

export function SectionPicker(props: StringInputProps) {
  const options = (props.schemaType.options?.list ?? []) as SectionOption[];
  const selected = options.find((option) => option.value === props.value);

  const handleSelect = useCallback(
    (value: string) => props.onChange(set(value)),
    [props.onChange],
  );

  return (
    <MenuButton
      button={
        <Button mode="ghost" padding={2}>
          <Flex align="center" gap={3}>
            <Thumb src={selected?.thumbnail} />
            <Text size={1}>{selected?.title ?? "Select a section"}</Text>
          </Flex>
        </Button>
      }
      menu={
        <Menu>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              padding={2}
            >
              <Flex align="center" gap={3}>
                <Thumb src={option.thumbnail} />
                <Text size={1}>{option.title}</Text>
              </Flex>
            </MenuItem>
          ))}
        </Menu>
      }
    />
  );
}
```

Notes baked into the design:
- `props.value` is the current section-key string; `props.schemaType.options.list` carries the metadata.
- `set` (from `sanity`) produces a `FormSetPatch`; `props.onChange(set(value))` writes the string at the field's own path.
- `MenuButton`/`Menu`/`MenuItem` are keyboard-operable and inherit the Studio's dark theme via context.
- `Thumb` returns `null` for a missing `thumbnail`, and a broken image simply renders its alt text — so an absent file degrades to name-only.

- [ ] **Step 3: Attach the component to the schema**

In `src/sanity/schemaTypes/servicePage.ts`, add the import after the existing imports (line 1):

```ts
import { SectionPicker } from "../components/SectionPicker";
```

Then change the `sectionKey` field (lines 165-171) from:

```ts
        defineField({
          name: "sectionKey",
          title: "Section",
          type: "string",
          options: { list: sectionOrderOptions },
          validation: (rule) => rule.required(),
        }),
```

to:

```ts
        defineField({
          name: "sectionKey",
          title: "Section",
          type: "string",
          components: { input: SectionPicker },
          options: { list: sectionOrderOptions },
          validation: (rule) => rule.required(),
        }),
```

- [ ] **Step 4: Type-check and lint**

Run: `pnpm type-check` then `pnpm lint`
Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add src/sanity/components/SectionPicker.tsx src/sanity/schemaTypes/servicePage.ts package.json pnpm-lock.yaml
git commit -m "feat: render section thumbnails in the section-order picker"
```

---

### Task 5: End-to-end verification

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: everything from Tasks 1-4.

- [ ] **Step 1: Full type-check, lint, and test suite**

Run: `pnpm type-check && pnpm lint && pnpm test`
Expected: all PASS (the existing Playwright suite plus the new `section-order.spec.ts`).

- [ ] **Step 2: Production build compiles the Studio**

Run: `pnpm build`
Expected: build succeeds — this proves the custom input component compiles inside the embedded Studio.

- [ ] **Step 3: Regenerate thumbnails end-to-end**

With `pnpm dev` running, run: `pnpm thumbs:sections`
Expected: `Captured 13/13` and all 13 files present in `public/studio-thumbnails/`.

- [ ] **Step 4: Human check in the Studio**

Open `/studio`, open a Salesforce service page document, and expand the **Section order** array. Confirm: each row shows its section's thumbnail beside the name, and the open menu shows the same thumbnails; a section with no thumbnail still shows its name. Reorder one section and save — the value stored is still the plain key, and the published page renders in the new order.

- [ ] **Step 5: Commit any stragglers**

```bash
git status
# commit only if Steps 1-4 surfaced an untracked or changed file
```

---

## Known risks / notes

- **`caseStudies` and `migrationPlatforms` sources are data-dependent.** They only render when the Sanity dataset has content (`pageCaseStudies` for the sales-cloud page; the migration service page). In a fresh/no-Sanity environment the capture script reports them as missed — correct, not a bug. The picker degrades to name-only for those two until a capture runs against populated content.
- **The spec's `public/studio/section-thumbnails/` path was changed** to `public/studio-thumbnails/` to remove any ambiguity with the `/studio` route.
- **Screenshots capture the natural desktop width** (no downscale to 360px). The spec mentioned 360px as a file-size nicety; WebP at quality 75 keeps each file small enough for a Studio-only asset. Add `sharp` (already in the graph) and a `resize({ width: 360 })` step only if the files prove too heavy.
