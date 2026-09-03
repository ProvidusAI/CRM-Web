# Four new service-page sections

**Date:** 2026-09-03
**Status:** approved, ready for implementation planning

## Problem

Editors compose service pages from a fixed menu of 14 sections. The Managed
Services page design in Figma uses four layouts that menu does not have, and
the goal is broader than one page: editors should be able to assemble new
service pages themselves, so the sections must be fully CMS-driven — no
hardcoded fallback content, hidden until filled in, reusable on any service
page.

## The four sections

Figma file `j8xHI1PKviupVUOnQwdVUr`. Implementation must pull each node
through `get_design_context` (with the `figma-design-to-code` skill); the
notes here are from screenshots and set scope, not pixel values.

| Key | Node | What it is |
| --- | --- | --- |
| `painPoints` | `593:16` | 2×2 grid (1-col mobile) of rounded light-blue cards: blue heading, round blue icon badge top-right, body text. |
| `splitChecklist` | `369:625` | Left: heading + green scribble, intro text, green pill CTA, two images side by side. Right: blue rounded panel of rows — green check icon + white text. Stacks on mobile. |
| `offerCarousel` | `369:817` | Centred scribble + heading, embla carousel of white cards (icon image, title, body), blue round prev/next arrows. |
| `pricing` | `593:28` | Centred scribble + heading + subtitle, three plan cards: name + scribble, description, "Includes:" check list. A featured plan gets a green border. |

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Architecture | Four field groups on `servicePage`, mirroring existing sections | Same editing model editors already know. A generic block-builder array would be a second model and a migration risk. |
| Content source | CMS only, no fallback data | The whole point is editor-built pages. Every section returns `null` when its content is absent. |
| Icons/images | Uploaded images (`serviceImageField`) | An editor creating a page cannot extend a fixed icon-key list. Pattern already exists in the schema. |
| Pricing highlight | `featured` boolean per plan | Any plan can be the highlighted one. |
| Carousel base | Copy `ExpertisePlatformsSection` | Same embla setup: autoplay, pause on hover, `prefers-reduced-motion` check, arrow buttons. Explicitly requested. |
| Thumbnails | None yet — name-only picker entries | No page renders these sections, so there is nothing to screenshot. Same precedent as "Blog posts". |

## Component contracts

All in `src/components/sections/`, exported from `sections/index.ts`,
`<Section>` + `<Container>`, `<Heading>`/`<Text>` typography, `cn()` for
classes, tokens over raw hex where a token exists. Each defines and exports
its own item type; the page maps CMS data into it. Each returns `null` when
its items array is empty.

```ts
// PainPointsSection
interface PainPointItem { title: string; text: string; icon?: string; iconAlt?: string }
{ title?: string; items: PainPointItem[] }

// SplitChecklistSection
{ title?: string; text?: string;
  ctaLabel?: string; ctaHref?: string;
  images?: { src: string; alt: string }[];   // renders whatever count is given, side by side
  items: string[] }                           // the checklist rows

// OfferCarouselSection
interface OfferCarouselItem { title: string; text: string; icon?: string; iconAlt?: string }
{ title?: string; items: OfferCarouselItem[] }

// PricingPlansSection
interface PricingPlan { name: string; description: string; includes: string[]; featured?: boolean }
{ title?: string; subtitle?: string; plans: PricingPlan[] }
```

`OfferCarouselSection` starts as a copy of `ExpertisePlatformsSection` minus
`PLATFORM_HREFS` linking (cards are not links) and minus the gradient
backgrounds (cards are white with an uploaded icon image). Animations keep the
existing reduced-motion handling.

The green scribble mark: reuse whatever existing sections use for it
(`GreenLineMark` / the inline SVG in `ExpertisePlatformsSection`) — do not
introduce a third variant.

## Sanity schema

Four object fields on `servicePage`, each using `prominentSectionComponents`
like their siblings:

| Field | Contents |
| --- | --- |
| `painPointsSection` | `title` (string), `items[]` of `{ title*, text*, icon (serviceImageField) }`, max 8 |
| `splitChecklistSection` | `title`, `text` (text), `ctaLabel`, `ctaHref`, `images[]` (serviceImageField, max 2), `items[]` (string, max 10) |
| `offerCarouselSection` | `title`, `items[]` of `{ title*, text*, icon (serviceImageField) }` |
| `pricingSection` | `title`, `subtitle` (text), `plans[]` of `{ name*, description* (text), includes[] (string), featured (boolean) }`, max 4 |

(* = required within an item; the groups themselves are all optional.)

Picker options appended to `sectionOrderOptions`, name-only:

```ts
{ title: "Pain points grid", value: "painPoints" },
{ title: "Checklist with CTA", value: "splitChecklist" },
{ title: "Offer carousel", value: "offerCarousel" },
{ title: "Pricing plans", value: "pricing" },
```

## Wiring

- `ServicePageSectionKey` union: + the four keys.
- `SERVICE_PAGE_QUERY`: project the four groups (icons through `imageProjection`).
- `types.ts`: interfaces for the four groups on `ServicePage`.
- `salesforce/[slug]/page.tsx`: four renderer entries mapping CMS data to the
  component props; four keys appended to `DEFAULT_SERVICE_SECTION_ORDER`
  before `cta`.

**Known mechanism:** `getOrderedServiceSectionKeys` appends every default key
the editor's list omits, so the new keys render on all existing service pages
immediately — as `null`, since no document has the content. This is the same
way `blogs` shipped. `SERVICE_SECTION_KEY_SET` derives from
`DEFAULT_SERVICE_SECTION_ORDER`, so membership in that array is what makes an
editor-picked key valid.

## Verification

- `pnpm type-check`, `pnpm lint`, `pnpm build`.
- `tests/section-order.spec.ts`: expected marker count 14 → 18; the four keys
  added to its `EXPECTED_KEYS`.
- Full Playwright suite stays green — the renderer edit is the regression risk.
- Pixel-level check against Figma requires a page with content, which cannot
  exist until an editor creates one. Build-time verification is therefore
  structural only; visual sign-off happens on the first real page. To de-risk
  that, the implementer should render each section once with sample props on a
  scratch route (deleted before merge) and compare against the Figma
  screenshots.

## Out of scope

- The Managed Services page itself (content entry is the editor's).
- Thumbnails for the four picker entries — capture once a live page renders
  them, by extending the `thumbs:sections` source map.
- Exposing any of the other existing 40+ components in the picker.
- JSON-LD, SEO, or nav changes.
