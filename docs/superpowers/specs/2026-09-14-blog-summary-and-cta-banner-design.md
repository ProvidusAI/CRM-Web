# Blog summary card and inline CTA banner — design

**Date:** 2026-09-14
**Status:** approved, ready for implementation planning
**Figma:** summary card `602:856`; CTA banner background `605:920` (the
full card group was not linked — layout follows the client's screenshot
until a group link is supplied).

## Problem

Blog posts are plain Portable Text. Marketing wants two promotional
blocks on the article page:

1. A **Summary card** at the top of the body — blue gradient, Salesforce
   Partner badge and cert badges on the left, an editor-written heading
   and text on the right, and a Let's Connect button.
2. A **CTA banner** the editor can drop anywhere in the content — dark
   gradient, editor-written heading, editor-uploaded image anchored to
   the bottom-right corner, and a Let's Connect button.

Editors manage both from the blog post in Sanity Studio.

## Decisions

| Question | Decision |
| --- | --- |
| Where does the Summary card go? | Fixed slot at the top of the body. Rendered only when both its fields are filled. |
| How is the CTA banner placed? | A custom block type in the body editor's insert menu (not a text shortcode). Editors can insert it more than once. |
| Buttons | Fixed on both cards: "Let's Connect" → `/contact`. No editor fields. |

## Sanity

### `post` document — new fields

Added after `body`, in a field group titled **Summary card**:

| Field | Type | Notes |
| --- | --- | --- |
| `summaryHeading` | `string` | Optional. e.g. "Summary". |
| `summaryText` | `text`, 6 rows | Optional. Blank lines separate paragraphs. |

No validation beyond optional: the card is skipped when either is empty
or whitespace.

### `blockContent` — new array member `ctaBanner`

```ts
defineArrayMember({
  name: "ctaBanner",
  title: "CTA banner",
  type: "object",
  fields: [
    { name: "heading", type: "string", validation: required },
    { name: "image", type: "image", options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: required }],
      validation: required().assetRequired() },
  ],
  preview: { select: { title: "heading", media: "image" } },
})
```

`blockContent` is also used by case studies (`challenge`, `solution`,
`results`), so the banner becomes insertable there too; that is
acceptable — the renderer is shared, and nothing forces editors to use
it.

### Query and types

`BLOG_POST_QUERY` (both the list and single projections that expand
`body[]`) adds:

```groq
summaryHeading,
summaryText,
body[] {
  ...,
  _type == "image" => { ${imageProjection}, caption },
  _type == "ctaBanner" => { heading, image { ${imageProjection} } }
}
```

`BlogPost` gains `summaryHeading?: string` and `summaryText?: string`.

No revalidation changes: both live inside the `post` document, which
already invalidates the `posts` tag and the post path.

## Rendering

### `BlogSummaryCard` — `src/components/sanity/BlogSummaryCard.tsx`

Server component. Props: `heading: string`, `text: string`. Rendered by
`blog/[slug]/page.tsx` inside `<article>` directly above
`<PortableContent>`, with `mb-10`, only when both props are non-blank
after trimming.

- Panel: `rounded-[10px]`, gradient `linear-gradient(192deg, #267DE4 7%,
  #154278 108%)` via two new tokens `--color-summary-blue-start` /
  `--color-summary-blue-end`, padding 28px, white text.
- Layout: `grid gap-8 md:grid-cols-[152px_minmax(0,1fr)]`.
  - Left column, fixed content: Salesforce Partner badge
    (`/images/salesforce-partner.webp`) on a white `rounded-md` tile
    152×162, then a `grid grid-cols-3 gap-3` of
    `/images/certified-badges/1.webp` … `9.webp` at 43×43 (the site has
    a 10th badge; Figma shows nine, so nine are used).
  - Right column: `<Heading as="h2" level="h3" className="text-white">`
    with the heading; the text split on blank lines into
    `<Text variant="p3" className="text-white">` paragraphs with
    `space-y-4`; then `<Link href="/contact"><CtaButton variant="filled"
    size="sm">Let's Connect</CtaButton></Link>` with `mt-8`.
- Mobile (`< md`): single column, badges above text.
- Badge images are decorative (`alt=""`); the partner badge keeps
  `alt="Salesforce Partner"` as in `CertifiedSection`.

### CTA banner block — `src/components/sanity/BlogCtaBanner.tsx`

Registered in `PortableContent`'s `components.types.ctaBanner`. Value
type `{ heading: string; image: SanityImage }`. Returns `null` when the
image has no asset URL.

- Panel: `relative overflow-hidden rounded-[10px]`, gradient
  `linear-gradient(100deg, #616161 6%, #0A0A0A 97%)` via tokens
  `--color-banner-grey-start` / `--color-banner-grey-end`, `my-4` like
  the image block, min height 260px on desktop.
- Content column (`relative z-10 max-w-[420px] p-7 md:p-8`):
  `<Heading as="h3" level="h4" className="text-white">` with the
  heading, then the same Let's Connect `CtaButton` (`mt-6`).
- Glow: a fixed absolutely-positioned circle (`bg-brand-green-light`,
  `blur-2xl`, ~60% opacity, 260px) centred behind the image's top-left
  quadrant, `aria-hidden`, `pointer-events-none`.
- Image: `<SanityImage>` in an absolutely positioned box anchored
  `bottom-0 right-0`, `w-[min(52%,340px)]`, `object-contain
  object-right-bottom`, clipped by the panel's `overflow-hidden`. The
  editor's alt text is used.
- Mobile (`< md`): the content column is full width; the image box
  becomes static, `ml-auto mt-4 w-[70%]`, still bottom-right aligned so
  it bleeds off the corner the same way.
- Heading level: article body headings are `h2`/`h3`; the banner uses
  `h3` so it never outranks the section it sits in.

### Tokens

Four new colour tokens in `src/styles/globals.css` `@theme`; no raw hex
in the components.

## Verification

- `pnpm type-check`, `pnpm lint`.
- Playwright (`tests/blog-blocks.spec.ts`): against a post that has the
  summary filled and one banner in its body, assert the summary card
  (`data-testid="blog-summary-card"`) is inside `article` and precedes
  the first body paragraph, and that a banner
  (`data-testid="blog-cta-banner"`) with the expected heading renders
  inside `article`. The test skips itself if no such post exists.
- Studio: `/studio` shows "CTA banner" in the body insert menu and the
  Summary card fields on a post.
- Visual: screenshots at 1440 and 375 for both cards, compared against
  Figma `602:856` and the client screenshot.
- Content for verification is added to one real post in Studio; the
  client decides afterwards whether it stays.

## Out of scope

Editable button label/link; placing the summary card elsewhere; a
banner variant without an image; migrating existing posts.
