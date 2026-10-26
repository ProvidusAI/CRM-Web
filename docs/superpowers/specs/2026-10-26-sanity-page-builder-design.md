# Sanity page builder for static pages — design

**Date:** 2026-10-26
**Status:** approved, ready for implementation planning
**Branch:** `feat/sanity-page-builder` (pushed, not merged to `main`)
**Appendices** (survey snapshots taken before any change, in
`2026-10-26-sanity-page-builder/`):
- `inventory-components.md`: props, defaults, hard-coded content and image handling of all 41 section components.
- `inventory-pages.md`: every prop, override and inline block each static route passes.
- `inventory-plumbing.md`: routing, Sanity fetch, SEO keys, revalidation, sitemap, tests, seed precedent.

## Goal

Move every static page into Sanity, so the client manages copy, section
order, images and SEO in the Studio, and can create a new top-level page
without a code change. **No visible change:** every migrated page must look
identical to today at desktop (1440px) and mobile (375px).

## Decisions

| # | Question | Decision |
| --- | --- | --- |
| 1 | Page model | A new `page` document with an ordered `sections[]` array of typed section objects. `servicePage` and `/services/[slug]` stay untouched (option A). |
| 2 | Static code after migration | Deleted. There is no code fallback: a missing document returns 404, and editors restore from Sanity document history. |
| 3 | Fidelity | Exact. Every per-page spacing, width, tone, overlap or variant survives as a field. Component files keep their defaults, so nothing else moves. |
| 4 | Images | Seeded from `public/` into Sanity assets. Content images get a nested `alt`. Backgrounds and icon chips stay plain images. 2× logo and badge exports render at the Figma display size: the renderer halves the asset dimensions and caps them with CSS. |
| 5 | Home | The `page` document with slug `home` is served at `/`. `/home` returns 404. Ids use dashes (`page-home`), never dots. |
| 6 | Studio | Two lists: "Parent pages" (`count(string::split(slug.current, "/")) == 1`) and "Dynamic pages" (depth > 1). Never use GROQ `match` for this. |
| 7 | Navigation | Stays in code. |
| 8 | Hero headings | When a hero has a small label, the label is the h1 and the big title the h2. Without a label, the title is the h1. |
| 9 | Seed | One-shot. Run with `SEED_SLUG_PREFIX=preview/`, compare, then run with the final slugs. Delete the script together with the static constants. |
| 10 | Legacy keyed documents | `staticPageSeo`, `sitePageJsonLd`, `pageBlogs` and `pageCaseStudies` stay only for routes still in code. Their values are copied into the page documents during the seed, then their route lists and key unions are trimmed. |

## Scope

**Migrated (23 routes):**
- `/` (home), `/about`, `/contact`, `/industries`, `/partnership`, `/platform-expertise`, `/services`, `/salesforce-recruitment-agency`, `/privacy-policy`
- `/industries/salesforce-{commerce-cloud,education-cloud,financial-services-cloud,health-cloud,nonprofit}-consulting`
- `/partnership/{dotdigital,findock,fundraise-up}`
- `/platform-expertise/salesforce-{agentforce,data-cloud,experience-cloud,marketing-cloud,sales-cloud,service-cloud}-consulting`

**Stays in code:**
- `/blog`, `/blog/[slug]`, `/case-studies`, `/case-studies/[slug]`: listings and details already driven by Sanity.
- `/services/[slug]` and its `/salesforce/[slug]` implementation: Sanity `servicePage`.
- `/section-thumbs-preview`: a dev tool, used by the thumbnail capture script.
- `studio`, `api/*`, `sitemap`, `robots`.

## Architecture

### `page` document (`src/sanity/schemaTypes/page.ts`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string, required | Studio label and the metadata title fallback. |
| `slug` | slug, required | May contain `/`. See the validation rules below. |
| `clipOverflowX` | boolean | Wraps the page in `<div className="overflow-x-hidden bg-white">`. Nine pages use this wrapper today (financial services, health, nonprofit and the six platform children). It is not applied by default, because it would break the sticky stack on home. |
| `seo` | `seo` | The existing object type. |
| `jsonLd` | `jsonLd` | The existing object type. |
| `sections` | array of section objects | See the Sections section below. |

- **Slug validation:**
  - Lower-case segments of `[a-z0-9-]` joined by `/`, with no leading or trailing slash. Must be unique across `page` documents.
  - **Rejected values:**
    - `home/…` (plain `home` is allowed)
    - first segment `blog`, `case-studies`, `services`, `salesforce`, `studio`, `api`, `section-thumbs-preview` or `staff-augmentation`
    - a first segment starting `salesforce-`, except `salesforce-recruitment-agency`, because `next.config.ts` redirects those
    - the two redirected `platform-expertise/…` paths in `next.config.ts`
  - The reserved list lives in one exported constant, which the schema validation and the sitemap filter share.
  - A custom slugify keeps `/` when the editor clicks Generate.
- **Ids:** `page-<slug with "/" replaced by "-">`, e.g. `page-industries-salesforce-health-cloud-consulting`. During the preview stage they are `page-preview-…`.

### Routing (`src/app/(site)/[[...slug]]/page.tsx`)

- **Deployment:** the optional catch-all replaces `src/app/(site)/page.tsx` in the same commit. Next refuses to build with both, because both match `/`.
- **Path rules:**
  - `slug` undefined → `home`. A slug joined as `home` → `notFound()`, so `/home` returns 404.
  - Any other path → `PAGE_QUERY` by `slug.current`. A missing document → `notFound()`, which renders `(site)/not-found.tsx` inside the site layout.
- **Static params:** `generateStaticParams` reads every page slug (with `metadata: true`) and maps `home` to `[]`. `dynamicParams` stays `true`, so new pages work without a deploy.
- **Fetch tags:** `["pages", "page:<slug>"]`, with `revalidate` 300, the same as other CMS pages.
- **Metadata:**
  - `generateMetadata` uses `buildPageMetadata({ seo, title, description, canonicalPath })`. `canonicalPath` is `/` for home and `/<slug>` otherwise.
  - Brand rules are unchanged, and `tests/title.spec.ts` must keep passing.
- **Body:** renders `<JsonLdScript>` when `jsonLd` is set, then `<PageSections sections={…} />`, optionally inside the `clipOverflowX` wrapper.
- **Migration order:** static folders win over the catch-all, so pages can migrate one at a time during development. The final stage deletes them.

### Sections

- **One object type per section** lives in `src/sanity/schemaTypes/sections/`, each built with a shared helper:

  ```ts
  defineSection({ name, title, icon?, fields, preview })
  ```

  The helper appends a `spacing` object (`top`, `bottom`: optional integer px, with a "leave empty to keep the component's default" description) and an `anchorId` string. It also groups the shared fields under a collapsed "Layout" fieldset.
- **One renderer:** `src/components/sanity/page-builder/PageSections.tsx` maps `_type` to an adapter in `registry.tsx`.
  - Adapters convert the Sanity shape into the component's own exported item types, following the `salesforce/[slug]` precedent. Sections never receive raw documents.
  - Each section renders inside `<div data-section-type="…" id={anchorId}>`. When `spacing` is set, it adds `style={{ paddingTop, paddingBottom }}`, or a negative margin where the replacement rule below needs one.
  - With `spacing` empty the wrapper adds nothing, so the component's built-in rhythm survives.
- **Consecutive dark bands:** where the renderer would otherwise produce a gap between two dark sections, an explicit top spacing replaces the component's top margin; it is never added on top of it. Reconciliation (below) proves it.

**Section types.** There is one per component in `inventory-components.md`, plus new components for the inline blocks:

| New component | Replaces |
| --- | --- |
| `RichTextSection` | `/privacy-policy` prose: `Section` white, `py-16 md:py-24`, `max-w-3xl` article, Portable Text with h2, p, bullet lists, strong, links (mailto, tel, external) and address blocks. |
| `RecruitmentIntroSection` | The recruitment intro band (blue border, `bg-[#eff6ff]`, migrated to a token). |
| `TalentPillsSection` | "Salesforce Talent We Offer": two scrolling pill rows (the `TalentPillsRow` logic). |
| `HiringModelsSection` | "Choose The Right Hiring Model": two cards plus a photo. |
| `ProcessStepsSection` | Six steps with a dashed connector and image icons. |
| `WhyBandSection` | The "Why ProvidusCRM" full-bleed band: background image, four cards, photo. |
| `FeaturedRolesSection` | `FeaturedRolesCarousel.tsx` (five roles) moves into `components/sections`. |

These new components are created by moving today's JSX verbatim into a component that accepts props, with today's values as defaults.

**Content held inside components today.** These ten components take no props: PartnersSection, TeamThoughtsSection, TeamGallerySection, IndustryDetailSection, IdentityResolutionSection, ExploreSection, ExpertiseStackSection, EventsSection, ContactSection and CategoriesSection. Large defaults (WhatWeDo, Industries, Believe, WhyChoose, Expertise, Platforms) are treated the same way:
- The component gains optional props whose default is the current constant, so pages still in code don't change.
- The section type exposes every item.
- The seed writes the current constant explicitly into each page.

### Fidelity fields

These replace JSX and raw strings that pages pass today. The full list per page is in `inventory-pages.md`.

| Need | Field |
| --- | --- |
| Headings containing `<GreenLineMark/>` and `<br/>` (17 hero titles; ExpertiseDescription, TrueCost, Comparison and ExpertiseSalesforce headings; SplitComparison and ExplainerCards card titles) | Shared `markHeading` object: `text` (newline → `<br/>`), `mark` (`none` / `after`), `markStyle` (enum holding exactly today's variants: hero `h-10` with space, hero `h-8`, hero `h-10` no space (agentforce), section `-mb-2`, section `h-8`). A single `renderMarkHeading()` turns it back into the same JSX. |
| Hero label as h1 | `subtitle` with `subtitleAsH1` (HeroSection), `kicker` (SalesforceServiceHero). |
| Colours, gradients, shadows and Tailwind class strings in item data (WhyChooseReason.color, SplitComparisonCard.color, ExpertisePlatformItem.bgGradient, ExpertiseItem.shadow, TrueCostCard.background/iconColor, SolutionTypeCard.color, recruitment `titleClass`/`borderClass`/`shadowClass`/`gradient`) | `string` fields with `options.list` holding exactly the values used today. No free text. Raw hex values are migrated to `@theme` tokens where the existing code has a token. |
| Variants | HeroSection `imageClassName` (enum: `object-contain p-4`, `object-contain`, `object-contain object-center`, default), `ctaVariant`, `ctaSize`, `hideCta`, `hideImage`. `backgroundOverlayColor` (enum: none, `#616161`). ExpertiseSalesforce `imageVariant`, `hideMark`. ExplainerCards `iconVariant`. ExpertiseDescription `hideCta`. SalesforceConsultCta `backgroundColor` (enum), `buttonVariant`. SplitComparison `className` (enum: default, `bg-linear-to-b from-white to-brand-blue-light`). |
| Card links | A per-item `href` on Expertise and ExpertisePlatforms cards, seeded from `PLATFORM_HREFS`. Today they link by title lookup, which breaks silently on rename. The component prefers `item.href` and falls back to the lookup. Also hrefs on steps and tiles wherever a component renders a link. |
| Lucide icons on partnership ServiceBenefits | `iconKey` enum extended with those icons. The adapter resolves keys to components. |
| Conditional case studies and blogs | ServiceCaseStudies and PageBlogs sections hold their own references (`caseStudies[]`, `posts[]`) and render nothing when empty, like today. ServiceCaseStudies keeps `viewAllHref`. |
| Hard-coded alts | Content images use the Sanity image `alt`, seeded with today's exact alt (for example "Business meeting" and "Platform Logo"), so the HTML is identical. |

### Images

- Sanity images expose `asset->{_id, url, originalFilename, metadata{dimensions}}`.
- **Adapter:** turns an image into the plain URL string the component already takes, so components stay string-based. Components that set fixed width/height read the dimensions instead.
- **2× exports** (logos, badges): the adapter passes `width/2 × height/2`, and the component's existing CSS caps the display size.
- **SVG:** Sanity serves SVGs as `.svg`, so `next/image` passes them through unoptimised, as it does with local SVGs today. CSS-mask icons use the URL directly.
- **Remote images:** `next.config.ts` already allows `cdn.sanity.io`.

### SEO, JSON-LD and curation

- **Seed copies into each page document:** the current `staticPageSeo` value for its key into `seo`, `sitePageJsonLd` into `jsonLd`, and `pageBlogs` and `pageCaseStudies` references into the section's own references. The key for each route comes from `inventory-pages.md`; for example, `/salesforce-recruitment-agency` uses `staff-augmentation`.
- **Code fallbacks:** the route files' fallback `title`, `description` and `image` become the page's `seo` defaults where the CMS value is empty.
- **After the final seed:**
  - `StaticPageKey` and the `staticPageSeo` route list keep only routes still in code.
  - `PageBlogKey`, `PageCaseStudyKey` and their schemas are trimmed the same way.
  - `scripts/check-page-blogs.ts` is updated to match.
- **Recruitment case-study fallback:** that page falls back to four hard-coded case-study cards when its curated list is empty. The seed resolves what production shows today:
  - It seeds the matching `caseStudy` references where those documents exist.
  - Only if a card has no document does `ServiceCaseStudiesSection` get an inline-cards field.

### Revalidation, sitemap and Studio

- **`/api/revalidate`:** a `page` branch calls `revalidateTag("pages")` and `revalidatePath("/" or "/<slug>")`. The Sanity webhook filter must include `page`; this goes in `SANITY.md` and the client steps.
- **`sitemap.ts`:**
  - Hard-coded entries for migrated routes are removed.
  - A GROQ clause lists `page` slugs, excluding `preview/…`. `home` maps to `/` and is never listed as `/home`.
  - Each URL appears once.
- **`robots`:** `preview/…` pages carry `noindex` while they exist.
- **Studio:** `sanity.config.ts` gets a structure with "Parent pages" and "Dynamic pages" (filters in decision 6), followed by the existing default document lists.

## Seed (`scripts/seed-pages.ts`, one-shot)

- **Reads:** one seed module per route under `scripts/seed-pages/`. It holds the route's constants, copied verbatim from the route file (Next rejects extra exports from `page.tsx`, so they cannot be imported), plus the section list translated from the route's JSX. Component defaults are imported from the components themselves.
- **Builds:** one document per route, with sections in today's order and today's prop values.
- **Images:**
  - Uploads each referenced `public/` image once, deduplicated by path, and keeps the original filename.
  - Content images get today's alt.
- **Credentials and flags:**
  - Needs `SANITY_API_WRITE_TOKEN` in `.env.local`, from the user. It never falls back to the read token, and it fails loudly when the variable is missing.
  - Supports `--dry-run`, which writes the JSON to the scratchpad.
  - Writes with `createOrReplace`.
- **Runs, each confirmed with the user first because it writes to production content:**
  1. With `SEED_SLUG_PREFIX=preview/`: ids `page-preview-*`, slugs `preview/<slug>`.
  2. With the final slugs.
- **Clean-up:**
  - After the final run and verification, the preview documents are deleted, with the user's confirmation.
  - The script is deleted with the static constants, because a re-run would overwrite live edits with incomplete pages.
  - The docs point to git history and Sanity document history instead.

## Verification

The controller does all of this itself, not a subagent.

1. **Reference build:** the pre-migration commit (`0a9c2de`) is built in a git worktree with `rm -rf .next` and a full production build, served on :3005. The branch gets a clean production build on :3004.
2. **Per-page comparison:** each migrated page (`/preview/<slug>` on the branch against `/<slug>` on the reference) is checked in the in-app browser at 1440px and at 375px:
   - every top-level section's top offset, height and computed padding
   - headings in order with their tags
   - image file names: the branch's Sanity asset ids are resolved to `originalFilename`
   - link hrefs from the HTML

   Pages are reconciled until every section matches within 3px. Consecutive dark bands get their own check.
3. **After the routing switch:**
   - Every migrated route returns 200 with the same `<title>` as the reference.
   - `/home` returns 404.
   - The sitemap lists each page once, without `/home` or `preview/`.
   - `/services/*`, `/blog/*`, `/case-studies/*` and `/section-thumbs-preview` are unchanged.
   - A `page` webhook payload for `home` revalidates `/`.
4. **Gates:**
   - Every commit runs `pnpm type-check`, `pnpm lint` and the Playwright suite.
   - Every stage ends with `rm -rf .next && pnpm build`.
   - Playwright runs against the real dataset. No test assumes an unconfigured project. Should one appear, it runs without Sanity env vars.
   - Specs that assert home copy keep passing, because the seeded content is identical.

## Stages

1. **Foundation:**
   - `page` schema, slug rules, the `defineSection` helper and `markHeading`, Studio structure.
   - Catch-all route (home static files kept until stage 4), `PageSections` registry, revalidate branch, sitemap clause.
   - Tests.
2. **Section types and adapters, in batches:**
   1. heroes and CTAs
   2. expertise family
   3. home and about family
   4. industry and partnership family
   5. new recruitment and privacy components

   Each batch gets adapter unit tests (Playwright unit-style specs, like `tests/table-links.spec.ts`). Fidelity itself is proven by the stage 3 DOM reconciliation.
3. **Seed `preview/`, then reconcile** every page (verification steps 1–2) and fix renderers and fields until it matches.
4. **Switch:**
   - Seed the final slugs; delete the preview documents.
   - Delete the static route files, the home `page.tsx`, page-only constants and the seed script.
   - Trim the key unions and legacy documents. Update `SANITY.md`, `CLAUDE.md` and `PROGRESS.md`.
   - Run verification step 3, push the branch and report.

## Risks

- **Production writes:** the seed writes to the production dataset. That is why every run is gated on user confirmation, and why the preview prefix comes first.
- **Live site timing:** the live site keeps serving `main` until the branch is merged. Merging before the final seed exists would make migrated routes 404.
- **Unconfigured environments:** without Sanity env vars, migrated routes 404. That is decision 2, and it is accepted.
- **Draft content:** `apiVersion` is `2026-03-01`, which defaults to the `published` perspective, so drafts never render. Stage 1 asserts this with a draft-only fixture check in the reconciliation notes.

## Out of scope

Navigation and footer content, `/services/[slug]` (`servicePage`), the blog and case-study routes, visual changes, and copy fixes noticed during the survey. Those are reported separately: the contact intro grammar, the GITEX "Dubai" copy, the `identiy-mob.png` filename, and the experience-cloud CTA title duplicate.
