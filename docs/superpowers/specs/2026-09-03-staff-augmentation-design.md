# Staff Augmentation page + picker thumbnails

**Date:** 2026-09-03
**Status:** approved by standing instruction (user asked for plan + subagent
execution while away; decisions below are the controller's, logged for review)

## Scope

Two deliverables, in this order:

1. **A new hardcoded page** implementing Figma frame `397:2147` ("Staff
   Augmentation", 1440×12021) at `/services/salesforce-staff-augmentation`.
2. **Thumbnails** for the five new picker entries (`painPoints`,
   `splitChecklist`, `offerCarousel`, `pricing`, `description`), captured via
   the existing `pnpm thumbs:sections` pipeline.

## Why hardcoded, not CMS

`servicePage` documents need a Sanity write token; none exists in this
environment (`SANITY_API_WRITE_TOKEN` unset, no `.env.local`). The
established precedent for pages built in-repo is the education/commerce cloud
pages: a static route composed from existing section components with
hardcoded data, CMS-overridable SEO via `generateStaticPageMetadata`, curated
case studies/blogs via `pageKey`. Staff Augmentation follows that exactly.

## Route and wiring decisions

| Decision | Choice |
| --- | --- |
| Route | `src/app/(site)/services/salesforce-staff-augmentation/page.tsx` — a static segment beside the dynamic `[slug]`; static wins in App Router, and no CMS slug collides. |
| Page key | `salesforce-staff-augmentation` added to `StaticPageKey` (`pageKeys.ts`) and `PageCaseStudyKey` (`pageCaseStudies.ts`); `PageBlogKey` derives automatically. |
| Sitemap | One entry beside the other service/industry static URLs. |
| Nav | Appended as a hardcoded child at the end of the CMS-driven Services dropdown in `NavbarClient.getNavItems` (education/industries pages are hardcoded nav children already). |
| Reference implementation | `src/app/(site)/industries/salesforce-education-cloud-consulting/page.tsx` is the canonical pattern for structure, metadata, JSON-LD, blogs/case-studies wiring. |

## Section mapping (Figma band → implementation)

Figma file `j8xHI1PKviupVUOnQwdVUr`. Implementers pull each node through
`get_design_context` (with the figma-design-to-code skill) for exact copy,
colors, and assets; the mapping below is binding, the pixels come from Figma.

| # | Band (top→bottom) | Figma nodes | Implementation |
| --- | --- | --- | --- |
| 1 | Hero ("Certified. Pre-Vetted. Salesforce Talent.") | `397:2148`, `397:2509`, `397:2510`, `397:2521`, `454:2` | Bespoke hero in the page file following the education page's hero approach; download + commit its artwork assets. |
| 2 | Partner logos bar | `397:2229` | `PartnersSection` (existing). |
| 3 | Intro paragraph with colored links | `454:40`, `454:43`, `454:4` | Inline block in the page file (`Section`/`Container`/`Text`), links styled per Figma. |
| 4 | "More projects that made a mark." | `457:8` | `ServiceCaseStudiesSection` fed by `getPageCaseStudies("salesforce-staff-augmentation")`, hardcoded Figma cards as fallback when CMS empty — same dual-source shape the education page uses. |
| 5 | "Salesforce Talent We Offer" pills | `457:3`, `457:378`, `457:379` | Local (non-exported) component in the page file — two rows of icon pills. |
| 6 | "Choose The Right Hiring Model" (Hourly / Full Time + photo) | `457:412`, `460:17` | Local component; check `SplitComparisonSection` first and reuse it if it matches, else build local. |
| 7 | "How Salesforce Recruitment Works" (6 colored steps) | `460:26`–`460:164` band | `ServiceBenefitsSection` — its `ServiceBenefitCard` takes a Lucide `icon` override and `colorTheme`; map the six steps onto it. If the visual diverges too far (timeline vs rows), build local and say so in the report. |
| 8 | "Reach Out To Our Salesforce Recruitment Experts" band | `461:189` | `SalesforceConsultCtaSection` (existing, same shape). |
| 9 | "Featured Roles" (5 role cards + arrows) | `461:190`, `462:341/352/342/446/456`, `480:2` | Carousel of role cards using the shared `Carousel` primitives (pattern: `OfferCarouselSection`); local component. |
| 10 | "Industries We Serve" | `462:554` | `IndustriesSection` if its card shape matches, else local component. |
| 11 | "Our End-to-End Salesforce Platform Expertise" | `462:555` | `ExpertiseSection`/`ExpertisePlatformsSection` — whichever matches the card style. |
| 12 | "What Makes ProvidusCRM A Leading…" (blue checklist) | `462:566`, `463:708`, `463:709`, `463:710` | `SplitChecklistSection` (one of the five new ones). |
| 13 | FAQs | `463:910` | `FaqSection` (existing). |
| 14 | Final CTA | `463:842` | `CtaSection` + `PageBlogsSection` above it (standard tail). |

Rules that bind every band: typography via `Heading`/`Text` (or
`typography-*` classes), tokens where an exact-match token exists, `cn()`,
`Reveal` with the `height="100%"` lesson where cards sit in grids,
icons/images downloaded from Figma exports and committed (never hand-drawn),
`prefers-reduced-motion` respected.

## Thumbnails

The five new sections render on no live page with content, so captures need a
source. Decision: a **committed preview route** at
`src/app/(site)/section-thumbs-preview/page.tsx` that renders all five new
sections with representative sample props, each wrapped in
`<div data-section-key="...">`, with `robots: { index: false }` metadata. It
is not in the sitemap (explicit list) and not linked from anywhere; it exists
so `pnpm thumbs:sections` is repeatable forever, unlike the deleted Task-7
scratch route.

`scripts/capture-section-thumbnails.ts` gains five `SOURCES` entries pointing
at that route; `sectionOrderOptions` gains the five `thumbnail:` keys. The
script's existing contract (explicit failure on missing/small captures, stale
unlink) is unchanged.

## Out of scope

- Creating the Sanity documents (case-studies/blogs selections, SEO
  overrides) — editor work.
- The `/salesforce/[slug]` CMS template — untouched.
- Any redirect (the URL is new).
