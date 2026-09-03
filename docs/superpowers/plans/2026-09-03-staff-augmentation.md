# Staff Augmentation Page + Picker Thumbnails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A hardcoded Staff Augmentation page at `/services/salesforce-staff-augmentation` implementing Figma frame `397:2147`, then thumbnails for the five new section-picker entries.

**Architecture:** Static App Router page composed of existing section components plus page-local components for the bands nothing matches, following `src/app/(site)/industries/salesforce-education-cloud-consulting/page.tsx` as the canonical pattern. Thumbnails come from a committed noindex preview route so `pnpm thumbs:sections` stays repeatable. Spec: `docs/superpowers/specs/2026-09-03-staff-augmentation-design.md`.

**Tech Stack:** Next.js 15 App Router, React 19, TS strict, Tailwind v4, Playwright, pnpm, Figma MCP.

## Global Constraints

- Package manager **pnpm**, never npm. Dev server port 3002.
- **Figma is the source of truth for every band.** Before writing a band's JSX, load the `figma:figma-design-to-code` skill, then call `get_design_context` (fileKey `j8xHI1PKviupVUOnQwdVUr`, the task's node IDs) for exact copy, colors, spacing; use `get_screenshot` on the node to eyeball. Never invent copy — the text comes from Figma verbatim.
- **Icons/images**: render from Figma-exported assets — download (`download_assets` or the URLs in the design context) and commit under `public/images/staff-augmentation/` (create it). Never hand-draw an SVG, never leave a placeholder. Photos and logos included. Asset URLs expire in ~7 days — download in the same task that references them.
- Typography ONLY via `<Heading>`/`<Text>` from `@/components/ui/Typography`, or raw tags carrying a `typography-*` class. Sections wrapped in `<Section>` + `<Container>`. Classes via `cn()`.
- Color tokens from `src/styles/globals.css` when an exact match exists; otherwise the Figma hex in arbitrary classes.
- `Reveal` around grid cards needs `height="100%"` + `h-full` on the card (known trap).
- Animations respect `prefers-reduced-motion` (Reveal and the Carousel primitives already do).
- Page-local components live INSIDE the page file (not exported from the sections barrel) unless a task says otherwise.
- The page is a server component; `"use client"` only in extracted local client components if hooks are genuinely needed (e.g. the roles carousel — put that in a separate file under the route directory, e.g. `FeaturedRolesCarousel.tsx`, marked `"use client"`).
- Every task ends: `pnpm type-check` clean, `pnpm lint` no new warnings, and commit with message ending `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- Reference page for all patterns: `src/app/(site)/industries/salesforce-education-cloud-consulting/page.tsx` — read it before writing anything.

---

### Task 1: Scaffold — route, keys, metadata, nav, hero, partners, intro band

**Files:**
- Create: `src/app/(site)/services/salesforce-staff-augmentation/page.tsx`
- Create: `public/images/staff-augmentation/` (hero assets)
- Modify: `src/lib/pageKeys.ts` (STATIC_PAGE_OPTIONS entry, value `salesforce-staff-augmentation`, label `Salesforce Staff Augmentation` — study how the union/list is built and follow it)
- Modify: `src/lib/pageCaseStudies.ts` (add `| "salesforce-staff-augmentation"` to `PageCaseStudyKey`)
- Modify: `src/app/sitemap.ts` (one static URL entry beside the service/industry ones, priority 0.7)
- Modify: `src/components/layout/NavbarClient.tsx` (in `getNavItems`, Services dropdown: `children: [...salesforceServices, { label: "Salesforce Staff Augmentation", href: "/services/salesforce-staff-augmentation" }]` — match the NavItem shape used there)

**Interfaces:**
- Produces: the page file with hero + `<PartnersSection />` + intro band, plus `generateMetadata` via `generateStaticPageMetadata("salesforce-staff-augmentation", {...})` (fallback title/description drawn from the Figma hero copy; canonicalPath `/services/salesforce-staff-augmentation`). Later tasks append sections INSIDE this page file, above the closing tail.
- Produces: page key valid for `getPageCaseStudies` / `getPageBlogs` (Task 5 uses them).

**Figma nodes:** hero `397:2148` + `397:2509` + `397:2510` + `397:2521` + `454:2`; intro band `454:40`, `454:43`, `454:4`. (Partners bar `397:2229` is content for the existing `PartnersSection` — verify its logos roughly match; if Figma shows different logos, keep `PartnersSection` as-is, it is CMS/shared.)

- [ ] **Step 1:** Read the education page top-to-bottom; read `pageKeys.ts`, `pageCaseStudies.ts`, `staticPageSeo.ts` enough to extend the unions correctly.
- [ ] **Step 2:** Pull Figma context for the hero + intro nodes; download hero artwork to `public/images/staff-augmentation/`.
- [ ] **Step 3:** Build the page skeleton: metadata, JSON-LD via `getSitePageJsonLd` if the education page does it (mirror it), hero band, `<PartnersSection />`, intro paragraph band. End the file with `<CtaSection />` so the page is loadable from day one.
- [ ] **Step 4:** Wire keys/sitemap/nav per Files above.
- [ ] **Step 5:** Verify: `pnpm type-check`; `pnpm build` (route appears, `/services/salesforce-staff-augmentation` prerenders); load `http://localhost:3002/services/salesforce-staff-augmentation` and screenshot the hero vs Figma.
- [ ] **Step 6:** Commit (`feat: scaffold the staff augmentation page`).

---

### Task 2: Case studies band + talent pills

**Files:**
- Modify: `src/app/(site)/services/salesforce-staff-augmentation/page.tsx`
- Create (assets): `public/images/staff-augmentation/` additions

**Interfaces:**
- Consumes: the page scaffold; `ServiceCaseStudiesSection` props (read the component); `getPageCaseStudies("salesforce-staff-augmentation")`.
- Produces: two bands inserted after the intro band, before `<CtaSection />`.

**Figma nodes:** case studies `457:8`; talent pills `457:3`, `457:378`, `457:379`.

- [ ] **Step 1:** Pull design context for both bands.
- [ ] **Step 2:** Case studies: mirror the education page's dual-source pattern — CMS selection via `getPageCaseStudies`, hardcoded fallback cards built from the Figma band (download card images). Title verbatim from Figma ("More projects that made a mark." — confirm from context).
- [ ] **Step 3:** Talent pills: local component in the page file — two wrapping rows of icon pills; icons downloaded and committed; copy verbatim.
- [ ] **Step 4:** Verify: type-check, lint, browser screenshot of both bands vs Figma node screenshots.
- [ ] **Step 5:** Commit (`feat: add staff-aug case studies and talent bands`).

---

### Task 3: Hiring model + recruitment process steps

**Files:**
- Modify: `src/app/(site)/services/salesforce-staff-augmentation/page.tsx`
- Assets under `public/images/staff-augmentation/`

**Interfaces:**
- Consumes: `SplitComparisonSection` and `ServiceBenefitsSection` (read both before deciding).
- Produces: two bands after the talent pills.

**Figma nodes:** hiring model `457:412` + `460:17`; process steps band `460:26`–`460:164` (heading `460:27`, six step groups `460:30`/`34`/`38`/`42`/`46`/`50`, icons `460:54`–`460:164`).

- [ ] **Step 1:** Pull design context for both bands.
- [ ] **Step 2:** Hiring model: reuse `SplitComparisonSection` if the card/rule shape matches its contract; otherwise a local component (two stacked description cards + photo). State the choice and why in the report.
- [ ] **Step 3:** Process steps: try `ServiceBenefitsSection` first (`ServiceBenefitCard` supports Lucide `icon` override + `colorTheme`); the Figma icons are custom images though — if the section can't take image icons, build local, reusing its color-theme gradient values where they match. State the choice.
- [ ] **Step 4:** Verify: type-check, lint, browser vs Figma.
- [ ] **Step 5:** Commit (`feat: add staff-aug hiring model and process bands`).

---

### Task 4: Recruitment CTA band + featured roles carousel

**Files:**
- Modify: `src/app/(site)/services/salesforce-staff-augmentation/page.tsx`
- Create: `src/app/(site)/services/salesforce-staff-augmentation/FeaturedRolesCarousel.tsx` (`"use client"`)
- Assets under `public/images/staff-augmentation/`

**Interfaces:**
- Consumes: `SalesforceConsultCtaSection` (read its props); `Carousel` primitives from `@/components/ui/Carousel`; `OfferCarouselSection.tsx` as the wiring reference (autoplay/pause/reduced-motion).
- Produces: two bands after the process steps.

**Figma nodes:** CTA band `461:189`; roles heading `461:190`; role cards `462:341`, `462:352`, `462:342`, `462:446`, `462:456`; arrows `480:2`.

- [ ] **Step 1:** Pull design context.
- [ ] **Step 2:** CTA band: `SalesforceConsultCtaSection` with the Figma copy/image if its props cover it; else local. State the choice.
- [ ] **Step 3:** Featured roles: `FeaturedRolesCarousel.tsx` client component copying `OfferCarouselSection`'s embla wiring; card layout per Figma (role title, detail rows, CTA); all five cards' copy verbatim.
- [ ] **Step 4:** Verify: type-check, lint, browser (arrows work, autoplay pauses on hover, reduced-motion honored) vs Figma.
- [ ] **Step 5:** Commit (`feat: add staff-aug recruitment CTA and featured roles`).

---

### Task 5: Industries, platform expertise, split checklist, FAQs, tail

**Files:**
- Modify: `src/app/(site)/services/salesforce-staff-augmentation/page.tsx`
- Assets under `public/images/staff-augmentation/`

**Interfaces:**
- Consumes: `IndustriesSection`, `ExpertiseSection`/`ExpertisePlatformsSection`, `SplitChecklistSection` (new — props `{title?, text?, ctaLabel?, ctaHref?, images?, items}`), `FaqSection`, `PageBlogsSection` + `getPageBlogs`, `CtaSection`.
- Produces: the completed page — final band order matching Figma top-to-bottom.

**Figma nodes:** industries `462:554`; platform expertise `462:555`; checklist band `462:566` + `463:708`/`463:709`/`463:710`; FAQs `463:910`; final CTA `463:842`.

- [ ] **Step 1:** Pull design context for each band.
- [ ] **Step 2:** Industries: `IndustriesSection` with Figma content if the card shape matches; else local. Platform expertise: whichever of the two expertise sections matches the card style; feed Figma content. State choices.
- [ ] **Step 3:** Checklist band: `SplitChecklistSection` with the Figma heading/rows/CTA/images.
- [ ] **Step 4:** FAQs: `FaqSection` with the Figma Q&A verbatim (accordion answers may be hidden in Figma — use whatever the design context exposes; questions at minimum).
- [ ] **Step 5:** Tail: `{blogs.posts.length > 0 && <PageBlogsSection …/>}` above `<CtaSection />`, per the education page.
- [ ] **Step 6:** Verify: type-check, lint, `pnpm build`, full Playwright suite (`pnpm exec playwright test`) — all green.
- [ ] **Step 7:** Commit (`feat: complete the staff augmentation page bands`).

---

### Task 6: Whole-page visual verification against Figma

**Files:**
- Modify (fixes only): the page file and its local components.

- [ ] **Step 1:** `get_screenshot` each Figma band (the node IDs from Tasks 1–5) at `maxDimension` 1200+; open `http://localhost:3002/services/salesforce-staff-augmentation` in the browser tools at 1440×900 and compare band by band. Also mobile (375px): nothing overflows horizontally, grids stack, carousel usable.
- [ ] **Step 2:** Fix real discrepancies (layout, color, hierarchy, missing copy). Do not chase sub-pixel spacing.
- [ ] **Step 3:** Re-run: type-check, lint, full Playwright, `pnpm build`.
- [ ] **Step 4:** Commit fixes (`fix: align staff augmentation page with Figma`), or skip if clean.

---

### Task 7: Thumbnails for the five new picker sections

**Files:**
- Create: `src/app/(site)/section-thumbs-preview/page.tsx`
- Modify: `scripts/capture-section-thumbnails.ts` (five SOURCES entries)
- Modify: `src/sanity/schemaTypes/servicePage.ts` (five `thumbnail:` keys)
- Create: `public/studio-thumbnails/{painPoints,splitChecklist,offerCarousel,pricing,description}.webp` (captured)

**Interfaces:**
- Consumes: the five section components from `@/components/sections` (`PainPointsSection`, `SplitChecklistSection`, `OfferCarouselSection`, `PricingPlansSection`, `ExpertiseDescriptionSection`).

- [ ] **Step 1:** Build the preview route: renders all five with representative sample props (2+ items each — realistic copy, e.g. reuse the sample props from `docs/superpowers/plans/2026-09-03-managed-services-sections.md` Task 7; for `ExpertiseDescriptionSection` a heading + 2 paragraphs), each wrapped in `<div data-section-key="KEY">` where KEY is the picker value (`painPoints`, `splitChecklist`, `offerCarousel`, `pricing`, `description`). Export `metadata = { robots: { index: false, follow: false } }`. Do NOT add it to the sitemap or nav.
- [ ] **Step 2:** Add five SOURCES entries to the capture script, all `{ url: "/section-thumbs-preview" }` (the default selector `[data-section-key="<key>"]` resolves there).
- [ ] **Step 3:** Start `pnpm dev` (or reuse), run `pnpm thumbs:sections`. Expected: `Captured 18/18` and five new webp files ≥1KB.
- [ ] **Step 4:** Add `thumbnail: "/studio-thumbnails/<key>.webp"` to the five picker options in `sectionOrderOptions`, removing the "No thumbnail yet" comments.
- [ ] **Step 5:** Verify: `pnpm type-check`, `pnpm build` (preview route prerenders, marked noindex), `pnpm exec playwright test` (section-order test unaffected — it targets a service page, but confirm 60/60).
- [ ] **Step 6:** Commit (`feat: add picker thumbnails for the five new sections`).
