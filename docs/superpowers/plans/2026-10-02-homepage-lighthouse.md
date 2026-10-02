# Homepage Lighthouse Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the homepage's main-thread and render-blocking cost without any visible change. Load tracking when the page is idle, inline CSS, target modern browsers, right-size images, and fix one ARIA error.

**Architecture:** The changes are head-level and config-level (`next/script` strategies, `next.config.ts`, `package.json` browserslist), plus one image swap and one footer markup fix. A new `scripts/check-perf-markers.ts` asserts the production HTML markers. Lighthouse runs against a local production build, before and after.

**Tech Stack:** Next.js 15.5 App Router, React 19, TypeScript strict, Tailwind v4.3, Playwright, tsx, Lighthouse 12.8.2 (via `npx`), `sharp` (installed as a Next dependency).

**Spec:** `docs/superpowers/specs/2026-10-02-homepage-lighthouse-design.md`

## Global Constraints

- **No visible change.** Colours are NOT changed: the contrast findings are accepted by the user.
- **Tracking:** keep all four tools (GTM, Clarity, ContentSquare, HubSpot), and only change `strategy` to `lazyOnload`.
- **Production builds must not touch the running dev server's `.next`.** Always build in a separate git worktree, as described under "Production build recipe" below.
- **Lighthouse:** `npx -y lighthouse@12.8.2`, with `CHROME_PATH` set to Playwright's Chromium (`node -e "console.log(require('@playwright/test').chromium.executablePath())"` from the repo root). Use `--preset=desktop` for desktop and the default for mobile. Run 3 times each and report the median performance score plus FCP, LCP, TBT, SI and CLS.
- **Code rules:** no raw hex; `cn()` from `@/lib/utils`; no `any`.
- **Tests:** Playwright only for app tests. It reuses the dev server on :3002; do not start or kill it.
- **Git:** commit per task on `main`, with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push.
- **Scratchpad:** `/private/tmp/claude-501/-Users-mujtabakamal-Projects-CRM-Web/f5228286-0e00-44b9-98e3-a0c566ac9194/scratchpad` (written `$S` below).

### Production build recipe (used by Tasks 1, 2 and 5)

```bash
S=/private/tmp/claude-501/-Users-mujtabakamal-Projects-CRM-Web/f5228286-0e00-44b9-98e3-a0c566ac9194/scratchpad
WT=$S/lh-wt
REV=HEAD   # the commit to measure
cd /Users/mujtabakamal/Projects/CRM-Web
git worktree remove --force "$WT" 2>/dev/null; git worktree add --detach "$WT" "$REV"
cp .env "$WT/.env"   # Sanity config; never commit or print it
cd "$WT" && pnpm install --frozen-lockfile --prefer-offline && pnpm build
pnpm exec next start -p 3005   # run in the background; serves http://localhost:3005
```

When finished, stop the `next start` process and remove the worktree with `git worktree remove --force "$WT"`.

---

### Task 1: Baseline measurement and bundle investigation

**Files:**
- Create: `$S/lighthouse-baseline.md` (scratchpad report, not committed)

**Interfaces:**
- Produces:
  - Baseline numbers that Task 5 compares against.
  - A bundle findings section for the user.

- [ ] **Step 1: Build the current HEAD**

Follow the production build recipe with `REV=HEAD`. Record the commit SHA.

- [ ] **Step 2: Lighthouse baseline**

Run Lighthouse 3× desktop and 3× mobile against `http://localhost:3005/`, writing JSON to `$S/lh-base-desktop-{1,2,3}.json` and `$S/lh-base-mobile-{1,2,3}.json`. In `$S/lighthouse-baseline.md`, record for each form factor:
- the median performance score with FCP, LCP, TBT, SI and CLS;
- the accessibility and best-practices scores;
- pass/fail for the audits `render-blocking-insight`, `legacy-javascript-insight`, `image-delivery-insight` (listing which URLs), `aria-prohibited-attr`, `unused-javascript` (listing the URLs and wasted bytes) and `bootup-time` (the top 5 URLs).

- [ ] **Step 3: Bundle investigation**

For each first-party chunk in the median desktop run's `unused-javascript` list (`/_next/static/chunks/*.js`):
1. Open the built file in `$WT/.next/static/chunks/`.
2. Identify the libraries in it by searching for distinctive strings, for example `embla`, `framer-motion`/`motion`, `@base-ui`, `lucide`, `@portabletext`, `next-sanity`, `@sanity`, `react-dom`.
3. Note which homepage components import those libraries (`grep -rln "<lib>" src/components src/app`), and whether each component is above or below the fold.

Write a "Bundle findings" section with one row per chunk: size, unused bytes, libraries, importing components, and a one-line recommendation. Do not change any code.

- [ ] **Step 4: Clean up**

Stop `next start` on :3005 and remove the worktree. No commit; this task only produces the scratchpad report.

---

### Task 2: Idle-loaded tracking, inline CSS, modern browser targets

**Files:**
- Create: `scripts/check-perf-markers.ts`
- Modify: `package.json` (a script entry and a `browserslist` field)
- Modify: `src/components/analytics/GoogleTagManager.tsx:7`, `src/components/analytics/MicrosoftClarity.tsx:7`, `src/components/analytics/Contentsquare.tsx:15`, `src/components/analytics/HubSpot.tsx:48`
- Modify: `next.config.ts` (add `experimental`)

**Interfaces:**
- Produces: `pnpm check:perf-markers [url]` (default `http://localhost:3001/`). It exits 0 when CSS is inlined and none of the tracking hosts are preloaded.

- [ ] **Step 1: Write the failing check**

Create `scripts/check-perf-markers.ts`:

```ts
// Asserts production-only performance markers on a running `next start`
// server: CSS inlined (no render-blocking stylesheet request) and tracking
// scripts deferred to idle. `next/script` only emits <link rel="preload">
// for eagerly loaded (afterInteractive) scripts, so a preload means the
// tool still competes with first paint.
const target = process.argv.slice(2).find((arg) => arg !== "--") ?? "http://localhost:3001/";

const TRACKING_HOSTS = ["hs-scripts.com", "contentsquare.net", "clarity.ms", "googletagmanager.com"];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main(): Promise<void> {
  const response = await fetch(target, { cache: "no-store", redirect: "follow" });
  const html = await response.text();
  const failures: string[] = [];

  if (!response.ok) failures.push(`HTTP ${response.status}`);

  if (/<link[^>]*rel="stylesheet"[^>]*href="\/_next\/static\/css\//.test(html)) {
    failures.push("CSS is linked, not inlined (render-blocking request)");
  }

  for (const host of TRACKING_HOSTS) {
    const preload = new RegExp(`<link[^>]*rel="preload"[^>]*href="[^"]*${escapeRegExp(host)}`);
    if (preload.test(html)) failures.push(`${host} is preloaded, so it loads eagerly`);
  }

  if (failures.length > 0) {
    console.error(`check:perf-markers failed for ${target}\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`check:perf-markers passed for ${target}`);
}

main().catch((error: unknown) => {
  console.error(`check:perf-markers could not inspect ${target}: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
```

In `package.json` `scripts`, add after `"check:blog-blocks": …,`:

```json
    "check:perf-markers": "tsx scripts/check-perf-markers.ts",
```

- [ ] **Step 2: Run it against the current build to verify it fails**

Build HEAD with the recipe (`REV=HEAD`), start it on :3005, then run `pnpm check:perf-markers http://localhost:3005/`.
Expected: FAIL, listing "CSS is linked, not inlined" and `hs-scripts.com is preloaded` (and `contentsquare.net` if present). Record the output. Stop the server.

- [ ] **Step 3: Load the tracking tools when the page is idle**

In each of these four files, change `strategy="afterInteractive"` to `strategy="lazyOnload"`. Change nothing else:
- `src/components/analytics/GoogleTagManager.tsx` (line 7)
- `src/components/analytics/MicrosoftClarity.tsx` (line 7)
- `src/components/analytics/Contentsquare.tsx` (line 15)
- `src/components/analytics/HubSpot.tsx` (line 48)

In `HubSpot.tsx`, directly above the `<Script`, add:

```tsx
      {/* lazyOnload: HubSpot's analytics blocked the main thread for ~2s on
          load. Route changes queue into window._hsq and replay when it loads. */}
```

- [ ] **Step 4: Inline CSS in production**

In `next.config.ts`, add inside `nextConfig`, directly before `images: {`:

```ts
  experimental: {
    // Ship CSS inside the HTML instead of a render-blocking stylesheet
    // request (Lighthouse "render-blocking requests", ~270ms on desktop).
    inlineCss: true,
  },
```

- [ ] **Step 5: Target modern browsers**

In `package.json`, add a top-level field after `"private": true,`:

```json
  "browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"],
```

- [ ] **Step 6: Verify**

1. `pnpm type-check` and `pnpm lint` (only the pre-existing `SectionPicker.tsx` warning is acceptable).
2. Commit. Build the new HEAD with the recipe, start it on :3005, and run `pnpm check:perf-markers http://localhost:3005/`. Expected: PASS.
3. In that build, grep the chunks for the polyfill that was flagged: `grep -l "Array.prototype.at" "$WT/.next/static/chunks/"*.js`. Expected: no first-party chunk matches. Record the result either way.
4. With Playwright against :3005: load `/`, wait for the `load` event plus 3s, and confirm the HubSpot script tag (`script[src*="hs-scripts.com"]`) and the ContentSquare script are present in the DOM. They load lazily, not never.
5. Stop the server and remove the worktree.
6. `pnpm exec playwright test tests/navbar.spec.ts tests/page.spec.ts` against the dev server: all pass.

Commit (before the Step 6.2 build):

```bash
git add scripts/check-perf-markers.ts package.json src/components/analytics next.config.ts
git commit -m "perf: idle-load tracking, inline CSS, modern browser targets

GTM, Clarity, ContentSquare and HubSpot move to lazyOnload (HubSpot's
analytics alone blocked the main thread ~2s). experimental.inlineCss removes
the render-blocking stylesheet; browserslist drops legacy polyfills.
check:perf-markers asserts both on a production server.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Right-size the certified images and add a 1440 device size

**Files:**
- Create: `public/images/certified-left-1240w.webp`, `public/images/certified-right-1240w.webp`
- Delete: `public/images/certified-left.webp`, `public/images/certified-right.webp`
- Modify: `src/components/sections/CertifiedSection.tsx:24,31`
- Modify: `next.config.ts` (`images.deviceSizes`)

**Interfaces:** none.

- [ ] **Step 1: Capture the "before" reference**

`next.config.ts` changes need a server restart, and the shared dev server must not be restarted, so do both captures on production builds. Build the current HEAD with the recipe (`REV=HEAD`, :3005). Then, with a throwaway Playwright script (copy it to the repo root only to run it, then delete it):
1. Open `/` at 1440×900, first at DPR 1, then in a fresh context at DPR 2.
2. Scroll the certified section into view. It is the section containing the image `alt="Salesforce Partner"`; the decorative images are its `aria-hidden` children.
3. Force all its images to eager loading and wait until they have finished loading.
4. Screenshot the section to `$S/certified-before-dpr{1,2}.png`.

- [ ] **Step 2: Re-encode**

From the repo root:

```bash
node -e "
const sharp = require('sharp');
(async () => {
  for (const side of ['left', 'right']) {
    await sharp('public/images/certified-' + side + '.webp')
      .resize({ width: 1240 })
      .webp({ quality: 82, effort: 6 })
      .toFile('public/images/certified-' + side + '-1240w.webp');
  }
})();
"
```

Confirm each output is 1240×1389 (`sips -g pixelWidth -g pixelHeight …`). Record the old and new byte sizes.

- [ ] **Step 3: Use the new files and add the device size**

In `src/components/sections/CertifiedSection.tsx`, change `src="/images/certified-left.webp"` to `src="/images/certified-left-1240w.webp"` and `src="/images/certified-right.webp"` to `src="/images/certified-right-1240w.webp"`. Leave `width={1236} height={1385}` unchanged.

In `next.config.ts`, inside `images: {`, add as the first entry:

```ts
    // 1440 sits between Next's 1200 and 1920 steps, so full-bleed images on
    // ~1280-1440px screens no longer download a 1920-wide file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
```

Delete the old files: `git rm public/images/certified-left.webp public/images/certified-right.webp`. First run `grep -rn "certified-left.webp\|certified-right.webp" src scripts tests` and confirm nothing else references them.

Commit this change now (the Step 5 commit message), then stop :3005, rebuild with the recipe at `REV=HEAD` (your new commit) and start it on :3005.

- [ ] **Step 4: Pixel comparison**

Screenshot the section the same way into `$S/certified-after-dpr{1,2}.png`. Compare each pair with `sharp`: decode both to raw RGBA, and count pixels where any channel differs by more than 2. Expected for both DPRs: changed pixels ≤ 0.1% of the total and max channel difference ≤ 2. If it fails, report the numbers and STOP; do not lower the bar.

- [ ] **Step 5: Verify (the commit was made in Step 3)**

Run `pnpm type-check`, `pnpm lint` and `pnpm exec playwright test tests/page.spec.ts`. Stop :3005 and remove the worktree. Commit message used in Step 3:

```bash
git add src/components/sections/CertifiedSection.tsx next.config.ts public/images/certified-left-1240w.webp public/images/certified-right-1240w.webp
git commit -m "perf(images): right-size the certified images, add a 1440 device size

Certified art was 1854px wide for a <=612px slot; 1240px keeps 2x density.
New names avoid the year-long immutable cache. Pixel-identical at DPR 1 and 2.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Run `git rm` on the old files before committing so the deletion is included.)

---

### Task 4: Footer rating ARIA

**Files:**
- Modify: `src/components/layout/Footer.tsx:148`
- Test: `tests/footer.spec.ts` (new)

**Interfaces:** none.

- [ ] **Step 1: Write the failing test**

Create `tests/footer.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("footer rating is announced without a prohibited aria-label", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByText("Rated 4.9 out of 5", { exact: true })).toBeAttached();
  await expect(footer.locator("p[aria-label]")).toHaveCount(0);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm exec playwright test tests/footer.spec.ts`
Expected: FAIL. The text is only an `aria-label`, and `p[aria-label]` has a count of 1.

- [ ] **Step 3: Fix the markup**

In `src/components/layout/Footer.tsx`, change line 148 from

```tsx
          <p className="flex items-center gap-3 text-footer-link" aria-label="Rated 4.9 out of 5">
```

to

```tsx
          <p className="flex items-center gap-3 text-footer-link">
            <span className="sr-only">Rated 4.9 out of 5</span>
```

Leave the rest of the `<p>` unchanged. Its visible children are already `aria-hidden`.

- [ ] **Step 4: Run it to verify it passes, then commit**

Run: `pnpm exec playwright test tests/footer.spec.ts && pnpm type-check && pnpm lint`

```bash
git add src/components/layout/Footer.tsx tests/footer.spec.ts
git commit -m "fix(a11y): footer rating uses sr-only text, not aria-label on a <p>

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: After measurement and full suite

**Files:**
- Create: `$S/lighthouse-after.md` (scratchpad report, not committed)

- [ ] **Step 1: Build and measure the final HEAD**

Follow the recipe with `REV=HEAD`. Run `pnpm check:perf-markers http://localhost:3005/` (expect PASS). Then run Lighthouse 3× desktop and 3× mobile, saving to `$S/lh-after-{desktop,mobile}-{1,2,3}.json`.

- [ ] **Step 2: Compare**

Write `$S/lighthouse-after.md` with a before/after table per form factor, using the medians from `$S/lighthouse-baseline.md`. Include:
- performance, accessibility and best-practices scores;
- FCP, LCP, TBT, SI and CLS;
- status of the audits: `render-blocking-insight`, `legacy-javascript-insight` (first-party URLs only), `image-delivery-insight` (are the certified URLs gone?), `aria-prohibited-attr`, `unused-javascript`, `bootup-time` (top 5), `mainthread-work-breakdown`, `color-contrast`, `third-party-cookies`.

List anything that got worse. Expected: contrast, third-party cookies and Issues are unchanged; this was accepted.

- [ ] **Step 3: Full suite**

Run: `pnpm exec playwright test && pnpm type-check && pnpm lint`
Expected: everything passes except the known skips. Re-run timeouts with `--last-failed --workers=1`.

- [ ] **Step 4: Clean up**

Stop :3005 and remove the worktree. No commit.
