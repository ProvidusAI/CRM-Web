# Lighthouse fixes — design-safe only

**Date:** 2026-09-09
**Status:** approved, ready for implementation planning

## Problem

Chrome Lighthouse on the live home page (desktop, 2026-09-09): Performance
71, Accessibility 94, Best Practices 77, SEO 100. Load speed is excellent
(LCP 0.7s, FCP 0.6s, TBT 150ms); the performance score is dominated by one
number: **CLS 0.927**, attributed almost entirely to `main#main-content`
shifting, alongside 51 non-composited `hero-heading-letter` animations.

Binding constraint from the user: **no fix may change how the site looks or
behaves visually.** Anything that would — contrast changes, animation
redesign, analytics deferral — is out of scope by decision, not oversight.

## What the report actually says (signal only)

| Finding | Verdict |
| --- | --- |
| CLS 0.927, culprit `main#main-content`; unsized nav `img.h-8.w-auto` | Fix — worth ~25 performance points on its own. |
| 51 non-composited animations, all `.hero-heading-letter` (filter moves pixels) | Fix — compositor promotion, identical pixels. |
| LCP image: no `fetchpriority=high`, should not be lazy; 400ms render delay | Fix — `priority` on the hero image. |
| Improve image delivery, ~164 KiB (`certified-left/right.webp`, `what-we-do-bg.webp` served at w=3840) | Fix — `sizes` correction; same rendered output. |
| Heading order: `h4` follows `h2` | Fix — semantic tag only. |
| No HSTS, no COOP (flagged High, unscored) | Fix — headers only. |
| Missing CSP `script-src`/`object-src`, Trusted Types | Defer — a wrong allowlist silently breaks GTM/HubSpot/Clarity. Follow-up, not this pass. |
| Contrast failures (white on brand green, `text-white/60` footer) | Excluded — color changes are design decisions. |
| 10 third-party cookies, console issues (HubSpot/Clarity) → BP 77 | Excluded — inherent to the marketing stack; no code fix short of removing the tools. |
| GTM/HubSpot/Clarity weight (~380 KiB, most main-thread time) | Excluded — user chose to leave analytics loading untouched. |
| Legacy JS ~11 KiB polyfills in own bundle | Excluded — build-config risk not worth the bytes. |
| ~155 KiB "unused JS" + 270ms unattributable from `chrome-extension://hgmoccdb…` | Not the site. Verification runs use a clean profile. |

## Root-cause note on the CLS (why measure-first)

The hero letters are **server-rendered** spans animating only `transform`
and `filter` — neither moves layout. So the 0.927 shift is not the
animation. The strongest suspect is the **web-font swap**: the heading is
split into per-letter `inline-block` spans, so when Afacad replaces the
fallback font every glyph box resizes and everything below reflows —
Lighthouse's own font-display note ("swap can be further optimized with
font metric overrides") points the same way. Second suspect: something in
`main` mounting client-side after first paint. The fix must be chosen from
evidence, not this guess.

## Design

### 1. CLS to near-zero — diagnose, then minimal fix

Reproduce locally against a production build (`pnpm build` + `next start`)
with DevTools layout-shift regions / a local Lighthouse run, identify which
elements actually shift, then apply the smallest fix that zeroes it:

- **Font swap** (expected): make the fallback metric-compatible for the
  heading font. `next/font`'s `adjustFontFallback` is on by default —
  verify it is actually active for Afacad in `src/app/layout.tsx`; if its
  generated override is insufficient for the per-letter layout, add
  explicit `@font-face` metric overrides (`size-adjust`,
  `ascent/descent-override`) for the fallback stack. After the real font
  loads, rendering is pixel-identical to today.
- **Unsized nav logo**: explicit `width`/`height` on the `img.h-8.w-auto`
  element (CSS keeps controlling displayed size — no visual change).
- **Late-mounting content** (only if evidence shows it): reserve that
  element's box so entry doesn't push siblings.

The letter animation's look — blur, stagger, timing — is untouched.
Gate: local Lighthouse reports **CLS ≤ 0.05** on the home page.

### 2. Composite the letter animation

`.hero-heading-letter` gains `will-change: transform, filter` (in
`globals.css` beside the existing keyframes) so each span is promoted to
its own compositor layer — the repaint churn behind the "51 non-composited
animations" audit disappears, pixels identical. The existing
`prefers-reduced-motion` block stays as-is.

### 3. LCP hygiene

The hero background image in `HeroSection` (the LCP element,
`img.absolute.inset-0`) gets `priority` — next/image then emits the preload
with `fetchpriority=high` and drops lazy-loading. Applies site-wide through
the shared component; no other hero call-site changes.

### 4. Image delivery

- Fix `sizes` on the two `CertifiedSection` side images and the
  what-we-do background so candidates match rendered size instead of
  w=3840 (~164 KiB saved; rendered output byte-for-byte identical at the
  displayed dimensions).
- Add `images.qualities: [75, 78, 82]` to `next.config.ts` — the values
  already in use — which Next 16 will require and which ends the
  per-request warning spam in every build/test log.

### 5. Heading order

The flagged `h4.typography-h4` that follows an `h2` becomes
`<Heading as="h3" level="h4">` — identical rendering, correct hierarchy.
Locate it from the audit's element snippet (`div.bg-white.p-6.md:p-8…`
card); fix any sibling cards in the same section the same way.

### 6. Security headers

In `next.config.ts` `headers()`, add to the existing global header block:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Cross-Origin-Opener-Policy: same-origin-allow-popups` (the popup-safe
  variant, so OAuth/Studio windows keep working)

No CSP in this pass (see table).

## Verification

- Baseline and after: Lighthouse against a local production build in a
  clean browser profile (no extensions). Pass gate: CLS ≤ 0.05,
  Performance ≥ 90, zero non-composited `hero-heading-letter` entries.
- Visual: hero animation side-by-side unchanged (blur/stagger present);
  certified images and what-we-do background visually unchanged at
  desktop and mobile widths.
- Standard suite: `pnpm type-check`, `pnpm lint`, full Playwright (60),
  `pnpm build`.
- Headers: `curl -sI` the local prod server shows HSTS + COOP.

## Out of scope

Contrast/color changes; CSP and Trusted Types; analytics loading changes;
third-party cookie remediation; browserslist/polyfill trimming; anything
on pages other than shared components touched above (the fixes are all in
shared code, so every page benefits automatically).
