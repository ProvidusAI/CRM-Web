# Homepage events section — design

**Date:** 2026-10-01
**Status:** approved, ready for implementation planning
**Figma:** file `j8xHI1PKviupVUOnQwdVUr`, slide `725:3235` (desktop only).

## Problem

The homepage needs an "Events & Industry Conferences We Attend" section. It
shows the four conferences ProvidusCRM attends as a slider, and each slide's
photos scroll vertically.

## Decisions

| Question | Decision |
| --- | --- |
| Content source | Fixed in code. No Sanity. Images live in `public/images/events/<folder>/` (`bg.webp`, `logo.webp`, `1.webp`…`N.webp`). |
| Placement | Homepage, directly before `PlatformsSection` ("Platforms We Work With"). |
| Slider | The existing `ui/Carousel` (Embla), looping. |
| Photos | Two columns per slide, as CSS vertical marquees running in opposite directions. |
| Mobile | Stacked: text and logo on top, then the two marquee columns in a 360px strip. |

## Content (order fixed)

| # | Event | Folder | Photos | Logo display size (half its 2× export) |
| --- | --- | --- | --- | --- |
| 1 | TechCrunch Disrupt | `disrupt` | 8 | 416×82 |
| 2 | Singapore FinTech Festival | `singapore-fintect` | 4 | 342×158 |
| 3 | GITEX Asia Singapore | `gitex-singapre` | 4 | 254×147 |
| 4 | AI Everything Middle East & Africa, Egypt | `ai-egypt` | 4 | 170×194 |

Descriptions are taken verbatim from the Figma frames:

1. "The world's leading gathering of startups, investors, and tech innovators. ProvidusCRM attends to connect with growing businesses looking to scale smarter with Salesforce."
2. "The largest fintech event in the world, bringing together banks, regulators, and technology providers across Asia and beyond. ProvidusCRM joins to explore how Salesforce is shaping financial services and CRM strategy in the fintech space."
3. "One of the largest technology exhibitions globally, held in Dubai, covering everything from AI to enterprise software. ProvidusCRM attends to showcase our Salesforce consulting and implementation expertise to businesses across the Middle East and beyond."
4. "A leading AI-focused event bringing together innovators, enterprises, and government bodies across the MENA region. ProvidusCRM takes part to discuss how AI and Salesforce, including Agentforce, are transforming customer relationship management."

(Copy 3 says "held in Dubai" for GITEX Asia Singapore. It is reproduced as
designed, and the user is told.)

Photo split: odd-numbered photos go in the left column and even-numbered in
the right. This matches the Figma grid, where 1 and 3 are on the left and 2
and 4 on the right.

## Layout (desktop, ≥ lg, values from Figma 725:3235)

- **Section header:** `GreenLineMark` (`mb-6 h-auto w-16`) above an `h2`
  "Events & Industry Conferences We Attend", centred, inside `Container`.
  The slider sits below the header.
- **Slide:** full-bleed, 703px tall, with the event's `bg.webp` covering it.
  The images are already darkened, so there is no overlay. Content sits in a
  1440px-wide area with 100px side padding.
- **Text column:** 494px wide, starting 86px from the top.
  - The logo is shown at the display size in the table above.
  - The description sits 45px below the logo, in Roboto 20px/32px white.
- **Photo columns:**
  - Two columns of 263px with a 38px gap, aligned to the right edge (100px
    from the slide edge), each spanning the full slide height and clipped.
  - Photos are 263×285.5 with 15px radius and a 38px vertical gap.
- **Marquee:** the left column moves up and the right moves down, looping
  continuously.
  - The photo set repeats until one copy holds at least three photos, so no
    empty space shows.
  - The set is then duplicated so a −50% translate loops seamlessly.
  - The duration scales with the number of photos so every column moves at
    the same speed.
- **Controls:** one shared set, not one per slide, placed 100px from the
  left and 38px from the slide bottom.
  - Previous arrow (24px, white, 1.5 stroke), then 16px gap, then the
    counter, then 16px gap, then the next arrow.
  - Counter: a 104px circle, `#308FFF` fill (`migration-blue` token) with a
    10px ring at 30% opacity that lets the background show through. The text
    "01/04" is 18px/28px semibold white.
  - The arrow buttons have 44px hit areas.

## Mobile (< lg)

The slide stacks:
1. The text block (logo capped at 96px tall, description 16px/26px).
2. The two marquee columns, side by side, in a 360px-tall strip.
3. Space reserved at the bottom for the shared controls, which sit centred
   inside the dark slide area.

The page must not scroll horizontally at 375px.

## Behaviour

- Arrows, swipe and drag change slides, and the slider loops (after 04
  comes 01).
- Autoplay advances every 8s and pauses while the pointer is over the
  slider. It stops permanently after the first arrow click or drag.
- With `prefers-reduced-motion: reduce` there is no autoplay and the
  marquees stand still. The existing global rule pauses `[class*="marquee"]`
  animations, so the new utilities include "marquee" in their names.
- Accessibility:
  - The slider region is labelled "Events".
  - Each slide is a labelled group ("Event N of 4: <name>").
  - The marquee columns are one `role="img"` labelled "ProvidusCRM at
    <name>", and the individual photos are decorative.
  - A visually hidden status reads "<name>, event N of 4". It is
    `aria-live="polite"` only once autoplay has stopped, so autoplay does
    not announce every 8s.
- Images: only the first slide's background is `priority`, and everything
  else lazy-loads.

## Testing

`tests/events-section.spec.ts` (Playwright, 1440×900):
- The heading renders before "Platforms We Work With", and there are 4
  slides.
- Next moves the status to event 2, Previous returns to event 1, and
  Previous again loops to event 4.

Plus a visual comparison against `725:3235` at 1440px, a fit check at
1024px and 390px, a reduced-motion check, and the full suite with
type-check and lint.

## Out of scope

Sanity-managed events, per-event links, and lightbox views of the photos.
