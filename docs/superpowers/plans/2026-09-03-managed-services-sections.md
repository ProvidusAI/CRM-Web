# Four New Service-Page Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Four new CMS-driven sections (`painPoints`, `splitChecklist`, `offerCarousel`, `pricing`) on service pages, selectable in the Sanity section picker, rendering nothing until an editor fills them in.

**Architecture:** Each section is a data-driven component in `src/components/sections/` plus a field group on the `servicePage` Sanity document, mirroring the existing 14 sections exactly. No fallback content anywhere — content is CMS-only. Spec: `docs/superpowers/specs/2026-09-03-managed-services-sections-design.md`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, Sanity, Playwright, `tsx` check scripts.

## Global Constraints

- Package manager is **pnpm**. Never npm.
- Typography ONLY via `<Heading>` / `<Text>` from `@/components/ui/Typography` — with two sanctioned exceptions used by sibling sections: raw `<p>`/`<h4>` carrying a `typography-*` utility class (see `ExpertisePlatformsSection.tsx:131`).
- Compose classes with `cn()` from `@/lib/utils`.
- Wrap sections in `<Section>` + `<Container>` from `@/components/layout/`.
- `"use client"` only where hooks are needed (only `OfferCarouselSection` needs it).
- Animations must respect `prefers-reduced-motion`. Static sections here use `Reveal` (`@/components/ui/Reveal`) which already handles it; the carousel copies the `matchMedia` check from `ExpertisePlatformsSection`.
- Exact hex values in arbitrary Tailwind classes are the established pattern in sibling sections (`SplitComparisonSection` uses `#F6F6F6`, `#38A81B`) — use the Figma values given per task, do not invent tokens.
- Every new component: export its item type, export the component from `src/components/sections/index.ts`, return `null` when its items array is empty.
- Commit messages end with `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- The two icon assets are ALREADY committed to the repo: `public/images/check-circle-dark.svg` (24px dark check-circle, fill `#35353F`) and `public/images/check-bold-mask.png` (76×76 check glyph alpha mask). Do NOT redownload or hand-draw icons.
- Dev server runs on port 3002 (`pnpm dev`). Playwright starts it itself via webServer config.

---

### Task 1: PainPointsSection + shared check script

**Files:**
- Create: `src/components/sections/PainPointsSection.tsx`
- Create: `scripts/check-new-sections.ts`
- Modify: `src/components/sections/index.ts` (add one export line, alphabetical position)
- Modify: `package.json` (add script `"check:new-sections": "tsx scripts/check-new-sections.ts"` beside `"check:page-blogs"`)

**Interfaces:**
- Produces: `PainPointItem { title: string; text: string; icon?: string; iconAlt?: string }`, `PainPointsSection({ title?: string; items: PainPointItem[] })`. Task 6 renders `<PainPointsSection title={...} items={...} />`.
- Produces: `scripts/check-new-sections.ts` — Tasks 2–4 append their assertions to this file.

Design (Figma node `593:16`): 2-column grid (1-col below `md`), gap 24px. Card: `bg-[#f6faff]`, `rounded-[16px]`, 6px solid `#f8f8f8` border, layered soft drop shadow, padding 32px, min-height 241px on desktop. Top row: title in `#19689f` (bold, ~30px → use `<Heading as="h3" level={4}>`; check `Typography.tsx` for the nearest level and pass `className="text-[#19689f]"`) with a 48px circular icon badge floated right. Badge: `rounded-full bg-[#1D70C5]` containing the editor-uploaded icon image at 26px, centered. Body: 14px/25px regular black text.

- [ ] **Step 1: Write the failing check script**

```ts
// scripts/check-new-sections.ts
// The only real logic in the four new sections is "render nothing when
// empty" — this asserts it without a DOM, same pattern as check-page-blogs.
// No React import: the script calls components as plain functions, no JSX.
import { PainPointsSection } from "../src/components/sections/PainPointsSection";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

check(
  "PainPointsSection hides when empty",
  PainPointsSection({ items: [] }) === null,
  "expected null for items: []"
);
check(
  "PainPointsSection renders when populated",
  PainPointsSection({
    items: [{ title: "T", text: "B", icon: "/images/logo.svg" }],
  }) !== null,
  "expected an element for one item"
);

if (failures.length > 0) {
  console.error(`${failures.length} check(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("check-new-sections: all checks passed");
```

Note: calling the component as a plain function works only while it stays hook-free — which is exactly the constraint we want asserted for the three static sections. (The carousel is hook-bearing and is NOT added to this script — see Task 3.)

- [ ] **Step 2: Add the package.json script and run to verify failure**

Add to `"scripts"`: `"check:new-sections": "tsx scripts/check-new-sections.ts"`.

Run: `pnpm check:new-sections`
Expected: FAIL — cannot find module `PainPointsSection`.

- [ ] **Step 3: Write the component**

```tsx
// src/components/sections/PainPointsSection.tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

export interface PainPointItem {
  title: string;
  text: string;
  icon?: string;
  iconAlt?: string;
}

interface PainPointsSectionProps {
  title?: string;
  items: PainPointItem[];
}

export function PainPointsSection({ title, items }: PainPointsSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section background="white" className="py-16 md:py-24">
      <Container>
        {title ? (
          <Reveal>
            <Heading as="h2" className="mb-10 text-center text-black md:mb-14">
              {title}
            </Heading>
          </Reveal>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={index * 0.08}>
              <div className="relative h-full rounded-[16px] border-[6px] border-[#f8f8f8] bg-[#f6faff] p-8 shadow-[0px_2px_2px_rgba(108,113,128,0.08),0px_7px_3.5px_rgba(108,113,128,0.07),0px_17px_5px_rgba(108,113,128,0.04)] md:min-h-[241px]">
                <div className="flex items-start justify-between gap-4">
                  <Heading
                    as="h3"
                    level={4}
                    className="text-[#19689f]"
                  >
                    {item.title}
                  </Heading>
                  {item.icon ? (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1D70C5]">
                      <Image
                        src={item.icon}
                        alt={item.iconAlt ?? ""}
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                      />
                    </span>
                  ) : null}
                </div>
                <Text variant="p4" className="mt-4 leading-[25px] text-black">
                  {item.text}
                </Text>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

Before finalising, open `src/components/ui/Typography.tsx` and `src/components/ui/Reveal.tsx` and adjust to their real prop APIs (e.g. whether `Heading` accepts `level`, whether `Reveal` accepts `delay`, what `Section`'s `background` prop accepts). The visual targets that must survive any adjustment: card `bg-[#f6faff]`, `rounded-[16px]`, `border-[6px] border-[#f8f8f8]`, title colour `#19689f`, 48px round blue badge, 2-col grid.

- [ ] **Step 4: Export from the barrel**

In `src/components/sections/index.ts`, add (keeping alphabetical order with its neighbours):

```ts
export { PainPointsSection, type PainPointItem } from "./PainPointsSection";
```

Match the file's existing export style — if siblings export types separately or not at all, follow them.

- [ ] **Step 5: Run the checks**

Run: `pnpm check:new-sections` — Expected: PASS.
Run: `pnpm type-check` — Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/PainPointsSection.tsx src/components/sections/index.ts scripts/check-new-sections.ts package.json public/images/check-circle-dark.svg public/images/check-bold-mask.png
git commit -m "feat: add PainPointsSection

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

(The two `public/images/check-*` assets are pre-downloaded Figma exports sitting untracked in the working tree; this commit picks them up for the later tasks.)

---

### Task 2: SplitChecklistSection

**Files:**
- Create: `src/components/sections/SplitChecklistSection.tsx`
- Modify: `src/components/sections/index.ts`
- Modify: `scripts/check-new-sections.ts` (append assertions)

**Interfaces:**
- Produces: `SplitChecklistImage { src: string; alt: string }`, `SplitChecklistSection({ title?: string; text?: string; ctaLabel?: string; ctaHref?: string; images?: SplitChecklistImage[]; items: string[] })`. Task 6 renders it with all props.
- Consumes: `check`/`failures` helpers already in `scripts/check-new-sections.ts` (Task 1).

Design (Figma node `369:625`): two columns on `lg` (left content, right panel), stacked below. Left: `<Heading as="h2">` black + `GreenLineMark` inline after it, then intro text `#3e3e3e` 20px/30px, then a green CTA pill, then the images row (side-by-side, rounded). Right panel: `rounded-[29px]`, gradient `linear-gradient(132deg,#1C95DA 7%,#236FAB 88%)`, padding 25px. Each row: `rounded-[16px]`, horizontal gradient `from-[rgba(255,255,255,0.12)] to-transparent`, min-height 56px, flex row: 25px green check + white 16px/20px medium text.

The check glyph uses the committed mask asset with the CSS-mask technique already used in `ExpertiseChallengesSection.tsx` (`maskImage` + `backgroundColor`):

```tsx
<span
  aria-hidden="true"
  className="h-[25px] w-[25px] shrink-0"
  style={{
    backgroundColor: "#a0ff88",
    maskImage: 'url("/images/check-bold-mask.png")',
    WebkitMaskImage: 'url("/images/check-bold-mask.png")',
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  }}
/>
```

The CTA: reuse `CtaButton` (`src/components/ui/CtaButton.tsx`) wrapped in a `next/link`, styled green. Read `CtaButton`'s variants first; if none is green, pass className overrides (`bg-[#38a81b]`, white text, its arrow-circle white with green arrow) rather than forking the component. Label/href both come from props; render the CTA only when both are present.

- [ ] **Step 1: Append failing assertions to the check script**

```ts
// append to scripts/check-new-sections.ts (import at top with the others)
import { SplitChecklistSection } from "../src/components/sections/SplitChecklistSection";

check(
  "SplitChecklistSection hides when empty",
  SplitChecklistSection({ items: [] }) === null,
  "expected null for items: []"
);
check(
  "SplitChecklistSection renders when populated",
  SplitChecklistSection({
    title: "Is This You?",
    text: "Intro",
    ctaLabel: "Schedule",
    ctaHref: "/contact",
    images: [{ src: "/images/logo.svg", alt: "x" }],
    items: ["Row one"],
  }) !== null,
  "expected an element for one row"
);
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm check:new-sections`
Expected: FAIL — cannot find module `SplitChecklistSection`.

- [ ] **Step 3: Write the component**

```tsx
// src/components/sections/SplitChecklistSection.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

export interface SplitChecklistImage {
  src: string;
  alt: string;
}

interface SplitChecklistSectionProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: SplitChecklistImage[];
  items: string[];
}

export function SplitChecklistSection({
  title,
  text,
  ctaLabel,
  ctaHref,
  images,
  items,
}: SplitChecklistSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section background="white" className="py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              {title ? (
                <Heading as="h2" className="text-black">
                  {title}{" "}
                  <GreenLineMark className="ml-2 inline-block h-8 w-auto align-baseline" />
                </Heading>
              ) : null}
              {text ? (
                <Text variant="p2" className="mt-6 text-[#3e3e3e]">
                  {text}
                </Text>
              ) : null}
              {ctaLabel && ctaHref ? (
                <Link href={ctaHref} className="mt-8 inline-block">
                  <CtaButton
                    size="sm"
                    className="bg-[#38a81b] text-white hover:bg-[#2d8716]"
                  >
                    {ctaLabel}
                  </CtaButton>
                </Link>
              ) : null}
              {images && images.length > 0 ? (
                <div className="mt-10 flex gap-4">
                  {images.map((image) => (
                    <div
                      key={image.src}
                      className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-[12px]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rounded-[29px] p-6"
              style={{
                background:
                  "linear-gradient(132deg, #1C95DA 7%, #236FAB 88%)",
              }}
            >
              <ul className="flex flex-col gap-3">
                {items.map((row) => (
                  <li
                    key={row}
                    className="flex min-h-[56px] items-center gap-3 rounded-[16px] bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-transparent px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[25px] w-[25px] shrink-0"
                      style={{
                        backgroundColor: "#a0ff88",
                        maskImage: 'url("/images/check-bold-mask.png")',
                        WebkitMaskImage: 'url("/images/check-bold-mask.png")',
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <span className="typography-p4 font-medium text-white">
                      {row}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

Adjust to the real prop APIs of `CtaButton`, `Reveal`, `Section` after reading them (same rule as Task 1). If `CtaButton` renders a `<button>`, the `Link` wrapper stands; if the project has an established link-styled CTA pattern (check how `HeroSection` or `CtaSection` link their pills), copy that instead.

- [ ] **Step 4: Export from the barrel**

```ts
export { SplitChecklistSection, type SplitChecklistImage } from "./SplitChecklistSection";
```

- [ ] **Step 5: Run the checks**

Run: `pnpm check:new-sections` — Expected: PASS.
Run: `pnpm type-check` — Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/SplitChecklistSection.tsx src/components/sections/index.ts scripts/check-new-sections.ts
git commit -m "feat: add SplitChecklistSection

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: OfferCarouselSection

**Files:**
- Create: `src/components/sections/OfferCarouselSection.tsx`
- Modify: `src/components/sections/index.ts`

**Interfaces:**
- Produces: `OfferCarouselItem { title: string; text: string; icon?: string; iconAlt?: string }`, `OfferCarouselSection({ title?: string; items: OfferCarouselItem[] })`. Task 6 renders it.

This component is a copy of `src/components/sections/ExpertisePlatformsSection.tsx` — read that file first and preserve wholesale: `"use client"`, the embla `Carousel` wiring, `setApi`, the 3s autoplay interval, pause-on-hover, the `prefers-reduced-motion` matchMedia effect, the `CarouselPrevious`/`CarouselNext` footer buttons, and the `if (!items || items.length === 0) return null` guard.

Changes from the original (Figma node `369:817`):
1. Delete the `PLATFORM_HREFS` import and the `Link` branch — card titles are plain text, never links.
2. Card styling: replace the gradient tile with `rounded-[18px] border border-white bg-gradient-to-br from-[#f4f4f4] to-white shadow-[0px_7px_9px_rgba(0,0,0,0.05)] p-7 min-h-[287px]`.
3. Icon: absolute top-right (`top-7 right-7`), sized `h-[76px] w-[76px]`, `object-contain`, rendered from `item.icon` with `alt={item.iconAlt ?? ""}`, only when `icon` is set.
4. Text block bottom-aligned like the original (`mt-auto`): title `typography-p1 font-semibold text-[#0d0901]`, body `<Text variant="p4" className="text-[#4f4d4b]">`.
5. Header: centered `GreenLineMark` above a centered `<Heading as="h2">` (the original's inline scribble SVG is replaced by the shared `GreenLineMark` component — do not carry the hand-drawn SVG over).
6. Interface renamed: `OfferCarouselItem` with fields `title`, `text`, `icon?`, `iconAlt?` (no `bgGradient`).

- [ ] **Step 1: Copy and adapt**

```bash
cp src/components/sections/ExpertisePlatformsSection.tsx src/components/sections/OfferCarouselSection.tsx
```

Then apply the six changes above. Component name: `OfferCarouselSection`, props interface `OfferCarouselSectionProps`.

- [ ] **Step 2: Export from the barrel**

```ts
export { OfferCarouselSection, type OfferCarouselItem } from "./OfferCarouselSection";
```

- [ ] **Step 3: Verify**

Run: `pnpm type-check` — Expected: clean.
Run: `pnpm lint` — Expected: no new errors (the pre-existing `SectionPicker` img warning is fine).

This component uses hooks, so it cannot go in `check-new-sections.ts` (calling it as a function would violate the Rules of Hooks). Its null-guard is inherited verbatim from `ExpertisePlatformsSection`; the type-check plus Task 7's visual check cover it.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/OfferCarouselSection.tsx src/components/sections/index.ts
git commit -m "feat: add OfferCarouselSection

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: PricingPlansSection

**Files:**
- Create: `src/components/sections/PricingPlansSection.tsx`
- Modify: `src/components/sections/index.ts`
- Modify: `scripts/check-new-sections.ts` (append assertions)

**Interfaces:**
- Produces: `PricingPlan { name: string; description: string; includes: string[]; featured?: boolean }`, `PricingPlansSection({ title?: string; subtitle?: string; plans: PricingPlan[] })`. Task 6 renders it.

Design (Figma node `593:28`): centered `GreenLineMark`, centered `<Heading as="h2">` black, centered subtitle `#3e3e3e` 20px/30px max-w ~1010px. Grid: `md:grid-cols-3` gap 24px (stacks below). Card: `bg-white rounded-[20px] p-10` with layered shadow `shadow-[1px_7px_15px_rgba(115,115,115,0.1),4px_27px_27px_rgba(115,115,115,0.09),9px_60px_37px_rgba(115,115,115,0.05)]`; when `featured`, add `border-2 border-[#92ff77]`. Card contents top to bottom: plan name (bold ~40px — `<Heading as="h3" level={3}>` sized per Typography's scale) with a small `GreenLineMark` tucked under its tail (`-mt-2 ml-14 block h-5 w-auto` — eyeball against the reference screenshot in Task 7); description `<Text variant="p4" className="text-[#3e3e3e]">`; "Includes:" label `text-[#a9a9aa]` ~22px; list rows: 24px check icon `/images/check-circle-dark.svg` + `text-[#35353f]` 18px text; dashed divider at the card foot (`border-t border-dashed border-[#d9d9d9] mt-auto pt-0` — a CSS dashed border, the Figma divider is a plain dashed rule).

- [ ] **Step 1: Append failing assertions**

```ts
// append to scripts/check-new-sections.ts
import { PricingPlansSection } from "../src/components/sections/PricingPlansSection";

check(
  "PricingPlansSection hides when empty",
  PricingPlansSection({ plans: [] }) === null,
  "expected null for plans: []"
);
check(
  "PricingPlansSection renders when populated",
  PricingPlansSection({
    title: "Plans",
    plans: [
      { name: "Hourly", description: "D", includes: ["A"], featured: true },
    ],
  }) !== null,
  "expected an element for one plan"
);
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm check:new-sections`
Expected: FAIL — cannot find module `PricingPlansSection`.

- [ ] **Step 3: Write the component**

```tsx
// src/components/sections/PricingPlansSection.tsx
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  description: string;
  includes: string[];
  featured?: boolean;
}

interface PricingPlansSectionProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export function PricingPlansSection({
  title,
  subtitle,
  plans,
}: PricingPlansSectionProps) {
  if (!plans || plans.length === 0) return null;

  return (
    <Section background="white" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center md:mb-16">
          <GreenLineMark className="mb-4 h-7 w-auto" />
          {title ? (
            <Heading as="h2" className="text-black">
              {title}
            </Heading>
          ) : null}
          {subtitle ? (
            <Text variant="p2" className="mt-5 text-[#3e3e3e]">
              {subtitle}
            </Text>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[20px] bg-white p-10 shadow-[1px_7px_15px_rgba(115,115,115,0.1),4px_27px_27px_rgba(115,115,115,0.09),9px_60px_37px_rgba(115,115,115,0.05)]",
                  plan.featured && "border-2 border-[#92ff77]"
                )}
              >
                <div>
                  <Heading as="h3" level={3} className="text-black">
                    {plan.name}
                  </Heading>
                  <GreenLineMark className="ml-12 block h-4 w-auto" />
                </div>
                <Text variant="p4" className="mt-6 text-[#3e3e3e]">
                  {plan.description}
                </Text>

                <p className="typography-p2 mt-10 text-[#a9a9aa]">Includes:</p>
                <ul className="mt-5 flex flex-col gap-5">
                  {plan.includes.map((row) => (
                    <li key={row} className="flex items-start gap-2">
                      <Image
                        src="/images/check-circle-dark.svg"
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0"
                      />
                      <span className="typography-p3 text-[#35353f]">
                        {row}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-dashed border-[#d9d9d9] pt-6" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

Adjust to real `Heading`/`Text`/`Reveal`/`Section` APIs (same rule as Task 1). Visual targets that must survive: white cards with the layered grey shadow, `rounded-[20px]`, `#92ff77` 2px border only on featured, dark 24px check circles, dashed foot divider.

- [ ] **Step 4: Export from the barrel**

```ts
export { PricingPlansSection, type PricingPlan } from "./PricingPlansSection";
```

- [ ] **Step 5: Run the checks**

Run: `pnpm check:new-sections` — Expected: PASS (6 assertions).
Run: `pnpm type-check` — Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/PricingPlansSection.tsx src/components/sections/index.ts scripts/check-new-sections.ts
git commit -m "feat: add PricingPlansSection

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Sanity schema — four field groups + picker options

**Files:**
- Modify: `src/sanity/schemaTypes/servicePage.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks (schema is independent of the components).
- Produces: document fields `painPointsSection`, `splitChecklistSection`, `offerCarouselSection`, `pricingSection`; picker values `painPoints`, `splitChecklist`, `offerCarousel`, `pricing`. Task 6's GROQ/types/renderers use these exact names.

- [ ] **Step 1: Add the four picker options**

In `sectionOrderOptions`, after the `{ title: "Blog posts", value: "blogs" }` entry and before `Footer CTA`:

```ts
  // No thumbnails yet: no page renders these sections to screenshot.
  { title: "Pain points grid", value: "painPoints" },
  { title: "Checklist with CTA", value: "splitChecklist" },
  { title: "Offer carousel", value: "offerCarousel" },
  { title: "Pricing plans", value: "pricing" },
```

(`defaultSectionOrder` derives from this array automatically — verify it still maps over `sectionOrderOptions` and needs no edit.)

- [ ] **Step 2: Add the four field groups**

Place them after the `blogs` field, following the existing `defineField` object-group style with `components: prominentSectionComponents` on each group. Use the existing `serviceImageField(name, title)` helper for every image/icon:

```ts
    defineField({
      name: "painPointsSection",
      title: "Pain points grid",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "items",
          title: "Pain points",
          type: "array",
          validation: (rule) => rule.max(8),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
                serviceImageField("icon", "Icon image"),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "splitChecklistSection",
      title: "Checklist with CTA",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Intro text", type: "text", rows: 4 }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA link", type: "string" }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          validation: (rule) => rule.max(2),
          of: [serviceImageField("image", "Image")],
        }),
        defineField({
          name: "items",
          title: "Checklist rows",
          type: "array",
          validation: (rule) => rule.max(10),
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "offerCarouselSection",
      title: "Offer carousel",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "items",
          title: "Offer cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
                serviceImageField("icon", "Icon image"),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "pricingSection",
      title: "Pricing plans",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
        defineField({
          name: "plans",
          title: "Plans",
          type: "array",
          validation: (rule) => rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Plan name",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "includes",
                  title: "Includes",
                  type: "array",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "featured",
                  title: "Featured (green border)",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
            },
          ],
        }),
      ],
    }),
```

Caveat on `splitChecklistSection.images`: `serviceImageField` returns a `defineField` result. Inside an array `of`, Sanity accepts a member with a `name` — verify against how the codebase already nests image arrays (search `servicePage.ts` for an existing `of: [` containing an image; `migrationPlatformsSection` or similar). If nothing nests `serviceImageField` in an array today, use the inline form instead:

```ts
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ],
            },
          ],
```

- [ ] **Step 3: Verify**

Run: `pnpm type-check` — Expected: clean.
Run: `pnpm build` — Expected: compiles (Studio bundles the schema; a schema error fails here).

- [ ] **Step 4: Commit**

```bash
git add src/sanity/schemaTypes/servicePage.ts
git commit -m "feat: add four section field groups to the servicePage schema

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Wiring — types, GROQ, renderers, default order, test

**Files:**
- Modify: `src/sanity/lib/types.ts`
- Modify: `src/sanity/lib/queries.ts` (SERVICE_PAGE_QUERY only)
- Modify: `src/app/(site)/salesforce/[slug]/page.tsx`
- Modify: `tests/section-order.spec.ts`

**Interfaces:**
- Consumes: components + item types from Tasks 1–4 (via `@/components/sections`); schema field/value names from Task 5.
- Produces: the four keys in `ServicePageSectionKey`; `ServicePage` gains `painPointsSection`, `splitChecklistSection`, `offerCarouselSection`, `pricingSection`.

- [ ] **Step 1: Extend the section-key union and content types**

In `src/sanity/lib/types.ts`, extend the union (order mirrors `DEFAULT_SERVICE_SECTION_ORDER`):

```ts
export type ServicePageSectionKey =
  | "partners"
  | "certified"
  | "caseStudies"
  | "tabs"
  | "consultantCta"
  | "benefits"
  | "process"
  | "migrationPlatforms"
  | "expertise"
  | "industries"
  | "whyChoose"
  | "faqs"
  | "blogs"
  | "painPoints"
  | "splitChecklist"
  | "offerCarousel"
  | "pricing"
  | "cta";
```

Add content interfaces beside the other `Service*Content` types:

```ts
export interface ServicePainPointItem {
  title: string;
  text?: string;
  icon?: SanityImage;
}

export interface ServicePainPointsContent {
  title?: string;
  items?: ServicePainPointItem[];
}

export interface ServiceSplitChecklistContent {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: SanityImage[];
  items?: string[];
}

export interface ServiceOfferCarouselItem {
  title: string;
  text?: string;
  icon?: SanityImage;
}

export interface ServiceOfferCarouselContent {
  title?: string;
  items?: ServiceOfferCarouselItem[];
}

export interface ServicePricingPlan {
  name: string;
  description?: string;
  includes?: string[];
  featured?: boolean;
}

export interface ServicePricingContent {
  title?: string;
  subtitle?: string;
  plans?: ServicePricingPlan[];
}
```

And on the `ServicePage` interface, after `faqSection`:

```ts
  painPointsSection?: ServicePainPointsContent;
  splitChecklistSection?: ServiceSplitChecklistContent;
  offerCarouselSection?: ServiceOfferCarouselContent;
  pricingSection?: ServicePricingContent;
```

- [ ] **Step 2: Extend SERVICE_PAGE_QUERY**

In `src/sanity/lib/queries.ts`, inside `SERVICE_PAGE_QUERY` (NOT the list query), after the `faqSection` projection:

```groq
    painPointsSection {
      title,
      items[] {
        title,
        text,
        icon {
          ${imageProjection}
        }
      }
    },
    splitChecklistSection {
      title,
      text,
      ctaLabel,
      ctaHref,
      images[] {
        ${imageProjection}
      },
      items
    },
    offerCarouselSection {
      title,
      items[] {
        title,
        text,
        icon {
          ${imageProjection}
        }
      }
    },
    pricingSection {
      title,
      subtitle,
      plans[] {
        name,
        description,
        includes,
        featured
      }
    },
```

- [ ] **Step 3: Wire the page**

In `src/app/(site)/salesforce/[slug]/page.tsx`:

a. Append to `DEFAULT_SERVICE_SECTION_ORDER` before `"cta"`:

```ts
  "painPoints",
  "splitChecklist",
  "offerCarousel",
  "pricing",
```

b. Add to the sections barrel import: `PainPointsSection`, `SplitChecklistSection`, `OfferCarouselSection`, `PricingPlansSection` (inside the existing `import { ... } from "@/components/sections"` block — do NOT add a separate import line).

c. Add renderer entries to `sectionRenderers` (after `faqs`):

```tsx
    painPoints: (
      <PainPointsSection
        title={page.painPointsSection?.title}
        items={(page.painPointsSection?.items ?? []).map((item) => ({
          title: item.title,
          text: item.text ?? "",
          icon: imageUrl(item.icon),
          iconAlt: item.icon?.alt,
        }))}
      />
    ),
    splitChecklist: (
      <SplitChecklistSection
        title={page.splitChecklistSection?.title}
        text={page.splitChecklistSection?.text}
        ctaLabel={page.splitChecklistSection?.ctaLabel}
        ctaHref={page.splitChecklistSection?.ctaHref}
        images={(page.splitChecklistSection?.images ?? []).flatMap((image) => {
          const src = imageUrl(image);
          return src ? [{ src, alt: image.alt ?? "" }] : [];
        })}
        items={page.splitChecklistSection?.items ?? []}
      />
    ),
    offerCarousel: (
      <OfferCarouselSection
        title={page.offerCarouselSection?.title}
        items={(page.offerCarouselSection?.items ?? []).map((item) => ({
          title: item.title,
          text: item.text ?? "",
          icon: imageUrl(item.icon),
          iconAlt: item.icon?.alt,
        }))}
      />
    ),
    pricing: (
      <PricingPlansSection
        title={page.pricingSection?.title}
        subtitle={page.pricingSection?.subtitle}
        plans={(page.pricingSection?.plans ?? []).map((plan) => ({
          name: plan.name,
          description: plan.description ?? "",
          includes: plan.includes ?? [],
          featured: plan.featured,
        }))}
      />
    ),
```

Note: `OfferCarouselSection`'s `title` prop — Task 3 kept `ExpertisePlatformsSection`'s required `title: string` or made it optional; reconcile here (pass `page.offerCarouselSection?.title ?? ""` if it stayed required, and prefer making it optional in the component).

- [ ] **Step 4: Update the section-order test**

In `tests/section-order.spec.ts`: add the four keys to `EXPECTED_KEYS` (before `"cta"` to mirror the default order) and change `toHaveLength(14)` to `toHaveLength(18)`.

- [ ] **Step 5: Verify**

Run: `pnpm type-check` — Expected: clean.
Run: `pnpm exec playwright test tests/section-order.spec.ts` — Expected: 1 passed.
Run: `pnpm exec playwright test` — Expected: all pass (60+ tests).
Run: `pnpm build` — Expected: compiles, all pages generate.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/lib/types.ts src/sanity/lib/queries.ts "src/app/(site)/salesforce/[slug]/page.tsx" tests/section-order.spec.ts
git commit -m "feat: wire the four new sections into service pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Visual verification against Figma, then cleanup

**Files:**
- Create (temporary, deleted in this task): `src/app/(site)/section-preview/page.tsx`

**Interfaces:**
- Consumes: all four components from `@/components/sections`.
- Produces: nothing — this task ends with the scratch route deleted and a verification verdict.

Reference screenshots (saved locally, originals from Figma):
`/private/tmp/claude-501/-Users-mujtabakamal-Projects-CRM-Web/f5228286-0e00-44b9-98e3-a0c566ac9194/scratchpad/figma-refs/{painPoints,splitChecklist,offerCarousel,pricing}.png`

- [ ] **Step 1: Create the scratch route with sample props**

```tsx
// src/app/(site)/section-preview/page.tsx — TEMPORARY, deleted before this task commits
import {
  OfferCarouselSection,
  PainPointsSection,
  PricingPlansSection,
  SplitChecklistSection,
} from "@/components/sections";

export default function SectionPreviewPage() {
  return (
    <>
      <PainPointsSection
        items={[
          {
            title: "Uncontrolled automation",
            text: "Someone built a workflow rule two years ago for a process that has since changed. The rule still runs. Nobody remembers why it's there.",
            icon: "/images/salesforce-consulting.svg",
          },
          {
            title: "Inconsistent access management",
            text: "Someone granted access six months ago. Nobody revoked it when the project ended. Your access model widens quietly.",
            icon: "/images/salesforce-integration.svg",
          },
          {
            title: "Poor Salesforce release management",
            text: "Three times a year, a release changes how something works. A customisation built two years earlier starts behaving differently.",
            icon: "/images/salesforce-development.svg",
          },
          {
            title: "Sluggish user adoption",
            text: "When nobody adjusts the system to match how the team works, workarounds appear. A spreadsheet reappears.",
            icon: "/images/salesforce-customisation.svg",
          },
        ]}
      />
      <SplitChecklistSection
        title="Is This You?"
        text="Wondering whether you should be partnering with a Salesforce managed services provider like ProvidusCRM? If any of these issues sound familiar, book a CRM health check:"
        ctaLabel="Schedule a CRM Audit"
        ctaHref="/contact"
        images={[
          { src: "/images/our-services.webp", alt: "Team at work" },
          { src: "/images/consult.webp", alt: "Consultation" },
        ]}
        items={[
          "Support tickets pile up because nobody owns Salesforce administration full-time",
          "The last Salesforce release broke something, and nobody caught it until a user reported it",
          "Reports and dashboards don't quite match what the team is actually experiencing",
          "Nobody's fully sure what all the automation in your org actually does anymore",
          "User adoption has quietly dropped since go-live, and workarounds have crept back in",
        ]}
      />
      <OfferCarouselSection
        title="What We Offer"
        items={[
          {
            title: "Automation & Development",
            text: "Flow and automation maintenance, Apex development where declarative tools don't fit, and fixing what a release changed.",
            icon: "/images/salesforce-development.svg",
          },
          {
            title: "Release Management",
            text: "Reviewing upcoming Salesforce releases against your specific org, testing changes in a sandbox before they go live.",
            icon: "/images/salesforce-implementation.svg",
          },
          {
            title: "Reporting & Analytics",
            text: "Building and maintaining dashboards that reflect what's actually happening in the business.",
            icon: "/images/salesforce-consulting.svg",
          },
          {
            title: "Integration Mapping & Support",
            text: "Maintaining and troubleshooting connections to finance systems, marketing platforms, and other third-party tools.",
            icon: "/images/salesforce-integration.svg",
          },
        ]}
      />
      <PricingPlansSection
        title="Our Flexible Salesforce Managed Services Plans"
        subtitle="Three Salesforce managed services plans, customised to different levels of need."
        plans={[
          {
            name: "Hourly",
            description: "Pay only for the hours you use, with no long-term commitment or fixed retainer.",
            includes: [
              "Admin support, bug fixes, and configuration changes",
              "Reports and dashboard adjustments",
              "Dedicated Desk",
              "One-off development work on a defined scope",
            ],
          },
          {
            name: "Weekly",
            description: "A set number of hours each week with dedicated resources assigned to your account.",
            includes: [
              "Apex development and Lightning customisations",
              "Automation and Flow build work",
              "Integration configuration and troubleshooting",
            ],
          },
          {
            name: "Monthly",
            description: "End-to-end coverage across admin, development, support, integrations, and strategic input.",
            includes: [
              "Release management, health checks, and system monitoring",
              "Backup configuration and Apex testing",
              "Staff training and user adoption support",
            ],
            featured: true,
          },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 2: Render and compare**

Start the dev server if not running (`pnpm dev`, port 3002). Open `http://localhost:3002/section-preview` in the browser tools, screenshot each section, and compare against the four reference PNGs listed above. Check per section:

- painPoints: light-blue cards, thick pale border, blue titles, round blue badges top-right, 2×2 at desktop
- splitChecklist: blue gradient panel right, translucent gradient rows, green checks, green CTA pill, images side by side
- offerCarousel: white cards on grey-white gradient, icon top-right, arrows centered below, autoplay pauses on hover
- pricing: three white cards, layered soft shadow, green border on the featured card only, dark check circles, dashed foot rule

Also verify mobile (375px): grids stack, carousel shows ~1 card, nothing overflows horizontally. Fix discrepancies in the components, not the scratch page. Judgement call: match layout, colour, and hierarchy; do not chase sub-pixel spacing.

- [ ] **Step 3: Delete the scratch route**

```bash
rm -rf "src/app/(site)/section-preview"
```

- [ ] **Step 4: Full verification**

Run: `pnpm check:new-sections` — Expected: PASS.
Run: `pnpm type-check` — Expected: clean.
Run: `pnpm exec playwright test` — Expected: all pass.
Run: `pnpm build` — Expected: clean; confirm no `/section-preview` in the route list.
Run: `git status --short` — Expected: only intended modifications (component fixes from Step 2, if any), no scratch files.

- [ ] **Step 5: Commit any visual fixes**

```bash
git add -A
git commit -m "fix: align new sections with Figma reference

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

(Skip the commit if Step 2 required no changes and the tree is clean.)
