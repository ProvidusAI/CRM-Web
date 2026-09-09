# Design-Safe Lighthouse Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take home-page CLS from 0.927 to ≤ 0.05 and clear the remaining actionable Lighthouse findings, with zero visual change.

**Architecture:** Six independent fixes in shared code (fonts/globals, HeroSection, CertifiedSection, WhatWeDoSection, WhyChooseSection, next.config). The CLS fix is measure-first using the repo's own `scripts/core-web-vitals-probe.ts`, which records per-element layout-shift sources. Spec: `docs/superpowers/specs/2026-09-09-lighthouse-fixes-design.md`.

**Tech Stack:** Next.js 15 App Router, next/font, next/image, Tailwind v4, Playwright, pnpm.

## Global Constraints

- **No visual change, anywhere.** The hero letter animation keeps its blur, stagger, and timing. Images render at identical displayed sizes. If a fix would alter pixels, stop and report instead.
- Package manager **pnpm**. Dev on :3002; the perf tooling uses a production server on :3001 (`pnpm perf:start` after `pnpm build`).
- Analytics (GTM/HubSpot/Clarity) loading must not be touched. No CSP in this pass.
- Known toolchain quirk: `pnpm build` and `pnpm dev` share `.next` and corrupt each other — if the dev server or tests act strangely after a build, `rm -rf .next` and restart. Kill any server you start.
- Every task ends: `pnpm type-check` clean, `pnpm lint` no new warnings, commit with message ending `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- The measurement env must be clean: the user's original report was polluted by a Chrome extension — all probes here run headless Chromium via the repo scripts, which is already clean.

---

### Task 1: Diagnose and zero the CLS

**Files:**
- Modify (as evidence dictates, likely subset): `src/app/layout.tsx`, `src/components/layout/NavbarClient.tsx:44-51`, `src/styles/globals.css`
- No new files. Do NOT modify `scripts/core-web-vitals-probe.ts` except reading it.

**Interfaces:**
- Consumes: `pnpm perf:vitals` — the existing probe (budget `cls: 0.1`) prints layout-shift records with per-source `tagName`/`className`/`previousRect`/`currentRect` against `http://localhost:3001`.
- Produces: home-page CLS ≤ 0.05 as measured by the probe; the diagnosis written into the commit message. Task 7 re-runs the same probe as the gate.

Context: Lighthouse (live site) reported CLS 0.927 attributed to `main#main-content`, plus an unsized `img.h-8.w-auto` (the nav logo — which already HAS width/height props at `NavbarClient.tsx:46-49`, so distrust that lead). The hero letters are server-rendered and animate only `transform`/`filter`, which cannot shift layout. Both fonts in `src/app/layout.tsx` use `next/font` with `display: "swap"` and default `adjustFontFallback` (on). So the cause is NOT obvious — measure before touching anything.

- [ ] **Step 1: Reproduce with attribution**

```bash
pnpm build
pnpm perf:start &   # production server on :3001
sleep 5
pnpm perf:vitals
```

Read the probe output: total CLS and every layout-shift source (element, previous/current rects, timestamps). Identify which elements actually move and when (font-load time? hydration? image load?). If local CLS is already ≤ 0.05, the live-site shift may be environment-specific (e.g. slower font fetch) — throttle via the probe's context if it supports it, or use Chrome DevTools Performance with Layout Shift regions against :3001 to catch it. Record findings.

- [ ] **Step 2: Apply the smallest fix the evidence supports**

Candidate fixes, in order of prior likelihood — apply ONLY what the measurements implicate:

a) **Font-swap reflow** (letter spans resize when Afacad replaces the fallback): in `src/app/layout.tsx`, add explicit fallbacks so the adjusted fallback metrics apply deterministically:

```ts
const afacad = Afacad({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  fallback: ["Arial"],
  adjustFontFallback: true,
});
```

(and the same shape for `roboto`). If the shift persists because `--font-heading` consumers fall back to a non-adjusted stack in CSS, align the CSS fallback stack in `globals.css` with the adjusted one next/font generates.

b) **Anything hydration-mounted in `main`** that enters after first paint: reserve its box (explicit min-height or aspect-ratio on the placeholder) so entry pushes nothing. Only with evidence naming the element.

c) **Nav logo**: if the probe implicates it despite its width/height props, give the `<Image>` at `NavbarClient.tsx:46` an explicit `style={{ height: 32, width: "auto" }}` alongside `className="h-8 w-auto"` so the box is sized pre-CSS.

- [ ] **Step 3: Verify the fix**

```bash
pnpm build && pnpm perf:start &
sleep 5
pnpm perf:vitals
```

Expected: CLS ≤ 0.05, probe passes its budget. Also eyeball `http://localhost:3001` — hero letters still blur-stagger in exactly as before.

- [ ] **Step 4: Standard checks + commit**

Run `pnpm type-check`, `pnpm lint`. Commit as `fix: eliminate home-page layout shift` with the measured before/after CLS and the diagnosed cause in the body.

---

### Task 2: Composite the hero letter animation

**Files:**
- Modify: `src/styles/globals.css:214-217` (the `.hero-heading-letter` rule)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: zero entries under Lighthouse's "avoid non-composited animations" for `hero-heading-letter` (Task 7 spot-checks via DevTools).

- [ ] **Step 1: Add compositor promotion**

```css
.hero-heading-letter {
  opacity: 0;
  will-change: transform, filter;
  animation: hero-heading-letter-in 0.48s cubic-bezier(0.2, 0.65, 0.3, 1) forwards;
}
```

(only the `will-change` line is new). Leave the `prefers-reduced-motion` block untouched — `animation: none` there makes `will-change` inert, which is fine.

- [ ] **Step 2: Verify pixels unchanged**

Load `http://localhost:3002/` (dev is fine here), watch the hero heading animate — identical blur/stagger. Optionally confirm layer promotion in DevTools (Rendering → Layer borders).

- [ ] **Step 3: Checks + commit**

`pnpm type-check`, `pnpm lint`. Commit `perf: promote hero letter animation to the compositor`.

---

### Task 3: LCP preload priority

**Files:**
- Modify (only if needed): `src/components/sections/HeroSection.tsx:174-182`

**Interfaces:**
- Consumes: nothing.
- Produces: the LCP image's request carries `fetchpriority=high` and is never lazy.

Context: the hero background `<Image src="/images/hero-bg.webp" fill priority …/>` already has `priority`. Lighthouse still asked for `fetchpriority=high` on the *preload request* — so verify what the built HTML actually emits before changing anything.

- [ ] **Step 1: Inspect the built page**

```bash
pnpm build && pnpm perf:start &
sleep 5
curl -s http://localhost:3001/ | grep -o '<link[^>]*rel="preload"[^>]*as="image"[^>]*>' | head -3
curl -s http://localhost:3001/ | grep -o '<img[^>]*hero-bg[^>]*>' | head -1 | grep -o 'fetchpriority="[^"]*"\|loading="[^"]*"'
```

- [ ] **Step 2: Fix only the gap found**

If the preload link or img lacks `fetchpriority="high"`, add `fetchPriority="high"` to the `<Image>` at `HeroSection.tsx:174` (React's casing; next/image forwards it). If both already carry it, make NO change and record that the audit item was satisfied by the live-site version lag — report it, skip the commit.

- [ ] **Step 3: Checks + commit (if changed)**

`pnpm type-check`, `pnpm lint`. Commit `perf: raise hero image fetch priority`.

---

### Task 4: Right-size image candidates + qualities config

**Files:**
- Modify: `src/components/sections/CertifiedSection.tsx:23-36`, `src/components/sections/WhatWeDoSection.tsx:191-196`, `next.config.ts` (images block)

**Interfaces:**
- Consumes: nothing.
- Produces: `/certified-left.webp`, `/certified-right.webp`, `/what-we-do-bg.webp` no longer requested at w=3840; builds stop printing `images.qualities` warnings.

- [ ] **Step 1: Add `sizes` to the certified side images**

Both images render at `w-[42.5%]` of the container (max container ~1696px → ~721px displayed). On each `<Image>` in `CertifiedSection.tsx` (lines 23 and 30) add:

```tsx
sizes="(min-width: 1800px) 721px, 42.5vw"
```

Everything else (src, width, height, className) unchanged.

- [ ] **Step 2: Add `sizes` to the what-we-do background**

It is a `fill` image spanning the viewport behind a 0.9-opacity blend overlay. Add `sizes="100vw"` explicitly to the `<Image>` at `WhatWeDoSection.tsx:191` (this documents intent and keeps candidate selection sane; do NOT cap below viewport width — that would soften the background, a visual change).

- [ ] **Step 3: Add the qualities config**

In `next.config.ts`, inside the existing `images` block (which currently has `remotePatterns`):

```ts
  images: {
    qualities: [75, 78, 82],
    remotePatterns: [
      // ...existing entries unchanged
    ],
  },
```

75 is the default, 78 and 82 are the two values pages pass explicitly (`quality={78}` in HeroSection, `quality={82}` widely).

- [ ] **Step 4: Verify**

```bash
pnpm build 2>&1 | grep -c "not configured in images.qualities"
```

Expected: `0`. Then load `http://localhost:3001` (or dev) at 1440px and mobile width — certified band and what-we-do band look identical.

- [ ] **Step 5: Checks + commit**

`pnpm type-check`, `pnpm lint`, plus `pnpm exec playwright test` (image plumbing touched — run the suite). Commit `perf: right-size image candidates and declare image qualities`.

---

### Task 5: Heading hierarchy in WhyChooseSection

**Files:**
- Modify: `src/components/sections/WhyChooseSection.tsx:105`

**Interfaces:**
- Consumes: `Heading` from `@/components/ui/Typography` — `as` sets the rendered tag, `level` sets the visual size independently.
- Produces: no `h4` directly follows an `h2` on pages rendering this section.

- [ ] **Step 1: Fix the tag, keep the look**

Line 105 renders the card headings as `as="h4"` under the section's `h2`:

```tsx
<Heading as="h3" level="h4" style={{ color: reason.color }} className="mb-2">
```

(`level="h4"` preserves the exact current size; only the semantic tag changes to h3.) Verify `level` accepts `"h4"` by reading `Typography.tsx` — it does (`HeadingLevel` string union); if the current call relied on `as` defaulting the level, passing `level="h4"` explicitly keeps today's rendering.

- [ ] **Step 2: Sweep for siblings**

```bash
grep -rn 'as="h4"' src/components/sections/ | grep -v 'level='
```

For any hit that sits directly under an `h2` in the same section (read the surrounding JSX to confirm), apply the same `as="h3" level="h4"` change. Do not touch h4s that already follow an h3.

- [ ] **Step 3: Verify + commit**

Load a page using WhyChooseSection (e.g. `/services/salesforce-consulting-services`) — cards look identical. `pnpm type-check`, `pnpm lint`, `pnpm exec playwright test` (the title.spec heading-hierarchy tests must stay green). Commit `fix: correct heading hierarchy in section cards`.

---

### Task 6: HSTS and COOP headers

**Files:**
- Modify: `next.config.ts` (the existing global `headers()` entry for `source: "/(.*)"`)

**Interfaces:**
- Consumes: nothing.
- Produces: every response carries HSTS and COOP.

- [ ] **Step 1: Add the two headers**

In the existing `source: "/(.*)"` headers array, alongside `X-Content-Type-Options` etc., add:

```ts
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
```

(`same-origin-allow-popups`, NOT `same-origin` — OAuth/Studio popups must keep their opener.)

- [ ] **Step 2: Verify**

```bash
pnpm build && pnpm perf:start &
sleep 5
curl -sI http://localhost:3001/ | grep -iE "strict-transport|cross-origin-opener"
```

Expected: both headers present. Also `curl -sI http://localhost:3001/studio` — still 200/307, not broken.

- [ ] **Step 3: Checks + commit**

`pnpm type-check`, `pnpm lint`. Commit `feat: add HSTS and COOP security headers`.

---

### Task 7: Whole-change verification

**Files:** none created; fixes only if a gate fails.

- [ ] **Step 1: Full gate**

```bash
rm -rf .next
pnpm type-check && pnpm lint
pnpm exec playwright test          # expected: all pass (60)
pnpm build                         # expected: clean, zero qualities warnings
pnpm perf:start &
sleep 5
pnpm perf:vitals                   # expected: CLS ≤ 0.05, budgets pass
pnpm perf:guard                    # expected: prod-build markers pass
curl -sI http://localhost:3001/ | grep -icE "strict-transport|cross-origin-opener"   # expected: 2
```

- [ ] **Step 2: Visual spot-check**

Against :3001 in the browser tools at 1440px and 375px: hero letter animation unchanged (blur + stagger), certified band unchanged, what-we-do band unchanged, WhyChoose cards unchanged. Any pixel drift = fix the offending task's change, not the check.

- [ ] **Step 3: Record the result**

Write measured before/after (CLS, probe output summary) into the final commit message or the ledger; commit any straggler fixes as `fix: verification follow-ups for lighthouse pass`. Kill the perf server.
