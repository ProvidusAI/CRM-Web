# Homepage Lighthouse fixes — design

**Date:** 2026-10-02
**Status:** approved, ready for implementation planning
**Input:** the user's Lighthouse 13.4.1 desktop report for
`https://providuscrm.co.uk/` (Performance 75, Accessibility 92, Best
Practices 77, SEO 100), plus a controller re-run with Lighthouse 12.8.2
desktop on the same URL (Performance 34; TBT 2,050ms, almost all from
HubSpot's analytics script).

## Findings that drive the work

| Report item | Root cause (from the audit details) |
| --- | --- |
| Main-thread work 2.7–5.0s, unused JS 312–461 KiB, cache lifetimes 255 KiB, legacy JS (HubSpot part), LCP element render delay ≈3s | Four third-party tools load `afterInteractive`: GTM (+ GA4 via GTM, ~300 KB), ContentSquare (160 KB), HubSpot (`hs-analytics` alone blocked ~2s in the re-run), Clarity. |
| Render-blocking requests (≈270ms) | Two CSS files in `<head>`, mainly `/_next/static/css/*.css` (18.8 KB). |
| Improve image delivery: certified images | `certified-left.webp` / `certified-right.webp` are 1854×2077 for a slot ≤612px wide (42.5% of 1440). |
| Improve image delivery: full-bleed backgrounds | `what-we-do-bg.webp` is displayed ~1350px wide on a 1350px desktop, but Next's device sizes jump from 1200 to 1920. |
| Legacy JS (our part) | Chunk `1255-*.js` ships an `Array.prototype.at` polyfill because there is no `browserslist`. |
| Prohibited ARIA | Footer rating `<p aria-label="Rated 4.9 out of 5">`: `aria-label` is not allowed on a role-less `<p>`. |

## Decisions

| Question | Decision |
| --- | --- |
| Third-party tracking | **Keep all four tools**, and load them with `next/script` `strategy="lazyOnload"` (after page load, during idle). Accepted cost: very fast bounces may go untracked, and HubSpot forms/chat appear slightly later. |
| Colour contrast (5 elements: brand-green buttons, Salesforce-blue heading, events counter) | **Not changed.** Brand colours stay. Accessibility stays at ~92, and the shades are for the designer to decide. |
| Third-party cookies / DevTools Issues | Out of scope. They come from the tools themselves. |
| Server response time (0.5–1.1s TTFB) | Out of scope (hosting). |

## Changes

1. **Third-party scripts:** `GoogleTagManagerScript`, `MicrosoftClarityScript`,
   `ContentsquareScript` and `HubSpotScript` change `strategy` from
   `afterInteractive` to `lazyOnload`.
   - The GTM `<noscript>` iframe is unchanged.
   - `HubSpotRouteTracker` is unchanged. It pushes to `window._hsq`, which
     HubSpot processes once the script loads.
2. **Inline CSS:** set `experimental.inlineCss: true` in `next.config.ts`,
   so production HTML carries the CSS in a `<style>` tag instead of
   render-blocking `<link rel="stylesheet">` requests.
3. **Modern browser targets:** add
   `"browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"]`
   to `package.json` (Next.js's documented modern baseline). This removes
   legacy polyfills from our bundles.
4. **Certified images:** re-encode both files from 1854×2077 to
   1240×1389 WebP (2× the 612px slot).
   - They get new file names, `certified-left-1240w.webp` and
     `certified-right-1240w.webp`, so `/images/*`'s one-year immutable
     cache and the image-optimizer cache cannot serve the old files.
   - Update `CertifiedSection.tsx` and delete the old files.
   - **No visible change:** the rendered section must pixel-match the
     current one at 1440×900 at DPR 1 and DPR 2 (max channel difference ≤ 2,
     changed pixels ≤ 0.1%).
5. **Device sizes:** add `1440` to `images.deviceSizes`, giving
   `[640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840]`. Full-bleed images
   on ~1280–1440px screens are then served at 1440 instead of 1920. A
   served width is never smaller than the displayed width, so nothing
   softens.
6. **Footer rating ARIA:** remove `aria-label` from the rating `<p>` and
   add a visually hidden `<span className="sr-only">Rated 4.9 out of 5</span>`
   inside it. The visible parts stay `aria-hidden`.
7. **Bundle investigation (report only):** identify which libraries make
   up the largest mostly-unused first-party chunks on the homepage
   (`939-*`, `3591-*` in the live build). No code change in this plan; the
   findings go to the user.

## Verification

- `scripts/check-perf-markers.ts` (new, run with `pnpm check:perf-markers`)
  fetches a production server's homepage HTML and fails if:
  - it contains `<link rel="stylesheet" href="/_next/static/css/` (CSS is
    not inlined);
  - it contains a `<link rel="preload"` for `hs-scripts.com`,
    `contentsquare.net`, `clarity.ms` or `googletagmanager.com`. Only
    `afterInteractive` scripts get preloads, so this means tracking still
    loads eagerly.
- Playwright: the footer rating exposes "Rated 4.9 out of 5" via sr-only
  text and its `<p>` has no `aria-label`.
- Pixel comparison for the certified section (change 4).
- Lighthouse 12.8.2 against a local production build, desktop and mobile,
  3 runs each with the median reported, before and after. Expected
  direction: TBT and main-thread work drop sharply; render-blocking and
  legacy-JS (first-party) audits pass; certified images leave
  image-delivery; prohibited-ARIA passes. Contrast, third-party cookies
  and Issues remain (accepted).
- Full Playwright suite, type-check, lint.

## Out of scope

Colour contrast changes, consent banner, removing any tool, hosting/TTFB,
and acting on the bundle investigation.
