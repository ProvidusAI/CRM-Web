# Homepage Events Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Events & Industry Conferences We Attend" slider to the homepage, before "Platforms We Work With". It has four event slides, and each slide's photos scroll as two vertical marquees running in opposite directions.

**Architecture:** One client component, `EventsSection.tsx`, holds the fixed event data, the Embla carousel (the existing `ui/Carousel`), one shared set of controls, and a `PhotoColumn` marquee. Two CSS utilities in `globals.css` drive the vertical marquee. The homepage renders the section before `PlatformsSection`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4.3, `embla-carousel-react` (already installed, via `@/components/ui/Carousel`), Playwright.

**Spec:** `docs/superpowers/specs/2026-10-01-events-section-design.md`

## Global Constraints

- **Classes and colours:** no raw hex in components (`#308FFF` is the existing `migration-blue` token). Compose classes with `cn()` from `@/lib/utils`.
- **Typography:** use `<Heading>`/`<Text>` or the `typography-*` utilities. Their size, weight and line height are `!important`, so override with `!`-prefixed classes.
- **Types:** no `any`; strict TypeScript.
- **Reduced motion:** no autoplay under `prefers-reduced-motion: reduce`. The marquees must stand still; the existing global rule pauses `[class*="marquee"]`, so the utility names must contain "marquee".
- **Images:** they are already renamed and in place under `public/images/events/<folder>/`: `bg.webp`, `logo.webp`, and `1.webp`…`N.webp`. Ignore `ai-egypt/Text.webp`. Only slide 1's background gets `priority`.
- **Tests:** Playwright only (`pnpm exec playwright test …`). It reuses the dev server on :3002 or starts `pnpm dev`. Re-run unrelated timeouts with `--last-failed --workers=1`.
- **Git:** commit per task on `main`, with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push.

---

### Task 1: Events section on the homepage

**Files:**
- Modify: `src/styles/globals.css` (add the marquee keyframes and utilities after the existing `@utility animate-marquee` block)
- Create: `src/components/sections/EventsSection.tsx`
- Modify: `src/components/sections/index.ts` (barrel export)
- Modify: `src/app/(site)/page.tsx` (render before `<PlatformsSection />`)
- Test: `tests/events-section.spec.ts`

**Interfaces:**
- Consumes:
  - `Carousel`, `CarouselContent`, `CarouselItem` and `type CarouselApi` from `@/components/ui/Carousel`. `CarouselContent` defaults to `-ml-4` and `CarouselItem` to `pl-4`; override with `ml-0` and `pl-0` for full-bleed slides. `Carousel` spreads extra props (`aria-label`, `onMouseEnter`) onto its `role="region"` root, and `CarouselItem` renders `role="group" aria-roledescription="slide"`.
  - `GreenLineMark` from `@/components/ui/GreenLineMark`, and `Heading` from `@/components/ui/Typography` (which accepts `id`).
- Produces: `export function EventsSection()`, exported from `@/components/sections`.

- [ ] **Step 1: Write the failing test**

Create `tests/events-section.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

const HEADING = "Events & Industry Conferences We Attend";

test.describe("Events section", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("sits before Platforms We Work With and has four event slides", async ({ page }) => {
    const region = page.getByRole("region", { name: "Events" });
    await expect(region.locator('[aria-roledescription="slide"]')).toHaveCount(4);

    const order = await page.evaluate((heading) => {
      const titles = [...document.querySelectorAll("h2")].map((h) => h.textContent?.trim());
      return [titles.indexOf(heading), titles.indexOf("Platforms We Work With")];
    }, HEADING);
    expect(order[0]).toBeGreaterThan(-1);
    expect(order[0]).toBeLessThan(order[1]);
  });

  test("arrows move between events and loop", async ({ page }) => {
    const status = page.getByTestId("events-status");
    await status.scrollIntoViewIfNeeded();
    await expect(status).toHaveText("TechCrunch Disrupt, event 1 of 4");

    await page.getByRole("button", { name: "Next event" }).click();
    await expect(status).toHaveText("Singapore FinTech Festival, event 2 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("TechCrunch Disrupt, event 1 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("AI Everything Middle East & Africa, Egypt, event 4 of 4");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec playwright test tests/events-section.spec.ts`
Expected: both tests FAIL, because there is no region named "Events" and no `events-status`.

- [ ] **Step 3: Add the vertical marquee utilities**

In `src/styles/globals.css`, directly after the existing block

```css
@utility animate-marquee {
  animation: marquee 30s linear infinite;
}
```

add:

```css
/* Vertical marquee for the events photo columns. The column renders its
   photo set twice, so translating by -50% loops seamlessly. The duration is
   set inline per column so every column moves at the same speed. */
@keyframes marquee-up {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-50%);
  }
}

@utility animate-marquee-up {
  animation: marquee-up 40s linear infinite;
}

@utility animate-marquee-down {
  animation: marquee-up 40s linear infinite reverse;
}
```

The existing `@media (prefers-reduced-motion: reduce)` rule (`[class*="marquee"] { animation-play-state: paused !important; }`) already pauses both. Do not add another rule.

- [ ] **Step 4: Create the section**

Create `src/components/sections/EventsSection.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading } from "@/components/ui/Typography";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";

interface EventSlide {
  name: string;
  folder: string;
  /** Display size: half the 2x logo export. */
  logo: { width: number; height: number };
  photoCount: number;
  description: string;
}

// Figma 725:3235 and its three sibling frames. Images live in
// public/images/events/<folder>/ as bg.webp, logo.webp and 1..N.webp.
const EVENTS: EventSlide[] = [
  {
    name: "TechCrunch Disrupt",
    folder: "disrupt",
    logo: { width: 416, height: 82 },
    photoCount: 8,
    description:
      "The world's leading gathering of startups, investors, and tech innovators. ProvidusCRM attends to connect with growing businesses looking to scale smarter with Salesforce.",
  },
  {
    name: "Singapore FinTech Festival",
    folder: "singapore-fintect",
    logo: { width: 342, height: 158 },
    photoCount: 4,
    description:
      "The largest fintech event in the world, bringing together banks, regulators, and technology providers across Asia and beyond. ProvidusCRM joins to explore how Salesforce is shaping financial services and CRM strategy in the fintech space.",
  },
  {
    name: "GITEX Asia Singapore",
    folder: "gitex-singapre",
    logo: { width: 254, height: 147 },
    photoCount: 4,
    description:
      "One of the largest technology exhibitions globally, held in Dubai, covering everything from AI to enterprise software. ProvidusCRM attends to showcase our Salesforce consulting and implementation expertise to businesses across the Middle East and beyond.",
  },
  {
    name: "AI Everything Middle East & Africa, Egypt",
    folder: "ai-egypt",
    logo: { width: 170, height: 194 },
    photoCount: 4,
    description:
      "A leading AI-focused event bringing together innovators, enterprises, and government bodies across the MENA region. ProvidusCRM takes part to discuss how AI and Salesforce, including Agentforce, are transforming customer relationship management.",
  },
];

const AUTOPLAY_MS = 8000;
// One copy of a column's photo set must be taller than the slide (703px), or
// the loop shows empty space: three 323px rows is 970px.
const MIN_PHOTOS_PER_SET = 3;
const SECONDS_PER_PHOTO = 8;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function photosFor(event: EventSlide) {
  return Array.from(
    { length: event.photoCount },
    (_, i) => `/images/events/${event.folder}/${i + 1}.webp`
  );
}

function PhotoColumn({ photos, direction }: { photos: string[]; direction: "up" | "down" }) {
  const set = Array.from(
    { length: Math.ceil(MIN_PHOTOS_PER_SET / photos.length) },
    () => photos
  ).flat();
  // The second copy makes the -50% translate seamless.
  const loop = [...set, ...set];

  return (
    <div className="h-full overflow-hidden">
      <ul
        className={cn(
          "flex flex-col",
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        )}
        style={{ animationDuration: `${set.length * SECONDS_PER_PHOTO}s` }}
      >
        {loop.map((src, i) => (
          // pb (not gap) keeps both copies the same height, so -50% lands exactly.
          <li key={`${src}-${i}`} className="pb-[38px]">
            <div className="relative aspect-[263/285.5] w-full overflow-hidden rounded-[15px]">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 263px, 45vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "right" ? "rotate-180" : undefined}
    >
      <path
        d="M9.5 6.5L4.14142 11.8586C4.06332 11.9367 4.06332 12.0633 4.14142 12.1414L9.5 17.5M4.08284 12H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ARROW_BUTTON =
  "-m-2.5 flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

export function EventsSection() {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [selected, setSelected] = useState(0);
  // Autoplay stops for good once the visitor takes over, or never starts
  // under reduced motion.
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStopped(true);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onPointerDown = () => setStopped(true);
    onSelect();
    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);
    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onPointerDown);
    };
  }, [api]);

  // `selected` restarts the timer, so every slide gets the full interval.
  useEffect(() => {
    if (!api || stopped || hovered) return;
    const timer = setTimeout(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [api, stopped, hovered, selected]);

  const current = EVENTS[selected];

  return (
    <section aria-labelledby="events-heading" className="pt-24 pb-20">
      <div className="mx-auto mb-12 flex max-w-[1440px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <GreenLineMark className="mb-6 h-auto w-16" />
        <Heading as="h2" id="events-heading" className="text-black">
          Events &amp; Industry Conferences We Attend
        </Heading>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Carousel opts={{ loop: true }} setApi={setApi} aria-label="Events">
          <CarouselContent className="ml-0">
            {EVENTS.map((event, index) => {
              const photos = photosFor(event);
              return (
                <CarouselItem
                  key={event.folder}
                  className="pl-0"
                  aria-label={`Event ${index + 1} of ${EVENTS.length}: ${event.name}`}
                >
                  <div className="relative h-full overflow-hidden lg:h-[703px]">
                    <Image
                      src={`/images/events/${event.folder}/bg.webp`}
                      alt=""
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                    {/* Figma 725:3235: 494px text column at x=101/y=86; photo
                        columns 263px wide, 38px apart, 100px from the right. */}
                    <div className="relative mx-auto flex h-full max-w-[1440px] flex-col gap-10 px-4 pt-12 pb-40 sm:px-6 lg:flex-row lg:justify-between lg:gap-12 lg:px-[100px] lg:py-0">
                      <div className="flex max-w-[494px] flex-col gap-6 lg:gap-[45px] lg:pt-[86px]">
                        <Image
                          src={`/images/events/${event.folder}/logo.webp`}
                          alt={event.name}
                          width={event.logo.width}
                          height={event.logo.height}
                          className="h-auto max-h-24 w-auto max-w-full self-start lg:max-h-none"
                        />
                        <p className="typography-p3 text-white lg:typography-p2 lg:!leading-8">
                          {event.description}
                        </p>
                      </div>
                      <div
                        role="img"
                        aria-label={`ProvidusCRM at ${event.name}`}
                        className="grid h-[360px] shrink-0 grid-cols-2 gap-[38px] lg:h-full lg:w-[564px]"
                      >
                        <PhotoColumn photos={photos.filter((_, i) => i % 2 === 0)} direction="up" />
                        <PhotoColumn photos={photos.filter((_, i) => i % 2 === 1)} direction="down" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* One shared set of controls, so offscreen slides add no tab stops.
            Desktop: 100px from the left, 38px from the slide bottom. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 lg:bottom-[38px]">
          <div className="mx-auto flex max-w-[1440px] justify-center px-4 sm:px-6 lg:justify-start lg:px-[100px]">
            <div className="pointer-events-auto flex items-center">
              <button
                type="button"
                aria-label="Previous event"
                className={ARROW_BUTTON}
                onClick={() => {
                  setStopped(true);
                  api?.scrollPrev();
                }}
              >
                <ArrowIcon direction="left" />
              </button>
              <div
                aria-hidden="true"
                className="mx-4 flex size-[104px] items-center justify-center rounded-full border-[10px] border-migration-blue/30 bg-migration-blue bg-clip-padding"
              >
                <span className="typography-p3 !text-[18px] !leading-7 !font-semibold text-white">
                  {pad(selected + 1)}/{pad(EVENTS.length)}
                </span>
              </div>
              <button
                type="button"
                aria-label="Next event"
                className={ARROW_BUTTON}
                onClick={() => {
                  setStopped(true);
                  api?.scrollNext();
                }}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        {/* Announced only once autoplay has stopped, so it doesn't speak every 8s. */}
        <p
          data-testid="events-status"
          aria-live={stopped ? "polite" : "off"}
          className="sr-only"
        >
          {current.name}, event {selected + 1} of {EVENTS.length}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Export it and place it on the homepage**

In `src/components/sections/index.ts`, add after the last export line:

```ts
export { EventsSection } from "./EventsSection";
```

In `src/app/(site)/page.tsx`:
1. Add `EventsSection,` to the import list from `@/components/sections` (directly after `PlatformsSection,`).
2. Render it directly before the existing `<PlatformsSection />` line:

```tsx
      <EventsSection />
      <PlatformsSection />
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `pnpm exec playwright test tests/events-section.spec.ts tests/section-order.spec.ts tests/page.spec.ts && pnpm type-check && pnpm lint`
Expected: all pass. `tsc` exits 0. Lint shows only the existing `src/sanity/components/SectionPicker.tsx` `<img>` warning.

If `tests/section-order.spec.ts` or `tests/page.spec.ts` fails because it asserts the homepage's section list or order, read the assertion. If it enumerates homepage sections, add the events section in its new position. Report that change. Do not weaken any assertion.

- [ ] **Step 7: Commit**

```bash
git add src/styles/globals.css src/components/sections/EventsSection.tsx src/components/sections/index.ts "src/app/(site)/page.tsx" tests/events-section.spec.ts public/images/events
git commit -m "feat(home): events slider with vertical photo marquees

Four conferences as a looping Embla slider before Platforms We Work With
(Figma 725:3235). Each slide's photos run in two opposite vertical marquees.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Stage only these paths. The working tree also holds the user's unrelated changes (footer, gallery and hero images, the homepage team section). In `page.tsx`, stage the whole file: the user's earlier edits to it and the events lines both belong on `main`. Report in your summary that the commit includes their pre-existing `page.tsx` edits.

---

### Task 2: Visual check against Figma and full suite

**Files:**
- Modify only if a check fails: `src/components/sections/EventsSection.tsx`

- [ ] **Step 1: Get the Figma target**

Call the Figma MCP `get_screenshot` for file `j8xHI1PKviupVUOnQwdVUr`, node `725:3235` (1440×703). Download it into the scratchpad.

- [ ] **Step 2: Measure the live slide at 1440×900**

Write a throwaway Playwright script in the scratchpad. Copy it to the repo root only to run it, so `@playwright/test` resolves, then delete the copy. Steps:
1. Open `http://localhost:3002/` and hide `nextjs-portal`.
2. Scroll the Events region into view and wait 1.5s.
3. Measure, relative to the first slide's box:
   - slide height;
   - the logo's left, top and width;
   - the description's top;
   - each photo column's left and width, and the right gap to the slide edge;
   - the counter circle's left, bottom gap and size.
4. Screenshot the first slide.

Expected, ±4px:
- slide 703 tall;
- logo at x 100, y 86, width 416;
- description top 86 + 82 + 45 = 213;
- photo columns 263 wide at x ≈ 776 and ≈ 1077, ending 100px from the right;
- circle 104×104, with its bottom 38px above the slide bottom.

Then pause 9s without hovering, and confirm the status text reads event 2 (autoplay).

- [ ] **Step 3: Compare and check other widths**

1. Read the live screenshot next to the Figma PNG. Check:
   - the logo, text block and arrows/counter positions;
   - the counter colours (blue fill, translucent ring);
   - the photo radius and gap;
   - both columns moving: take two screenshots 1s apart and compare a column's crop. The left column should move up and the right one down.
2. At 1024×768 and 390×844, check that:
   - the page doesn't scroll horizontally (`document.documentElement.scrollWidth <= innerWidth`);
   - on mobile the text sits above a 360px photo strip;
   - the controls sit inside the dark slide area without overlapping the photos.
3. With `emulateMedia({ reducedMotion: "reduce" })`, check:
   - the column `ul` reports `animation-play-state: paused`;
   - after 9s the status still reads event 1.

Fix only in-scope mismatches.

- [ ] **Step 4: Full suite, type-check and lint**

Run: `pnpm exec playwright test && pnpm type-check && pnpm lint`
Expected: everything passes except the known skips. Re-run timeouts with `--last-failed --workers=1`.

- [ ] **Step 5: Commit any fixes**

```bash
git add src/components/sections/EventsSection.tsx
git commit -m "fix(home): match events slider spacing to Figma

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
