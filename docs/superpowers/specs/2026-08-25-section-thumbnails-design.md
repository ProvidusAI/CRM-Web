# Section thumbnails in the services picker

**Date:** 2026-08-25
**Status:** approved, ready for implementation planning

## Problem

`servicePage.sectionOrder` is an array of section keys rendered as one row per
section, each a plain text dropdown. Editors reorder a page by dragging rows
labelled "Expertise carousel", "Benefits timeline", "Tabs section" — names that
do not tell you what the section looks like. The reported symptom: *"Can't
recognise all by name."*

Two distinct moments fail. **Reading** the assembled order, where 13 text rows
give no sense of the page. And **choosing** a section, where the menu is the same
13 names with nothing to distinguish them.

## Scope

This spec covers **only** the visual picker for the 13 sections that already
exist. Exposing more of the 47 built sections in the dropdown is a separate,
larger project: each new section needs its own content field group in the schema
(existing ones run 34–84 lines, averaging ~45) plus a renderer entry, which would
roughly double a file already at 737 lines. That is deliberately not in scope.

## Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Placement | Thumbnail in the row **and** in the open menu | The two failure moments are separate; one custom input component covers both. |
| Image source | Screenshots of the real sections | Most recognisable. Generated mechanically, so no design work. |
| Staleness | A regeneration script | Screenshots go stale when a section is redesigned; `pnpm thumbs:sections` re-shoots the set in one command. |
| Metadata | Extend the existing `sectionOrderOptions` | `options.list` ignores unknown keys, so a `thumbnail` field rides along. No parallel map to drift. |
| Missing thumbnail | Fall back to name only | A new section key added later degrades gracefully instead of breaking the picker. |

Rejected: hand-drawn SVG wireframes (less recognisable, and 13 to draw);
editor-uploaded images in Sanity (needs 13 images produced and uploaded before
the picker is useful at all, plus a live fetch inside the Studio, for a tool only
the internal team sees).

## What I verified before designing

- **The container is safe to change.** Sections render inside `<Fragment>` in
  `src/app/(site)/salesforce/[slug]/page.tsx:261`, whose parent is a plain
  `<div>`. No CSS in the project selects on direct children, `:first-child`, or
  `:last-child`, so wrapping each section in a `<div>` is layout-neutral.
- **No single page renders all 13.** The most complete service page renders 12
  (hero + 11). `benefits` renders on none of the six service pages, because no
  service document has that content filled in. It does render on the partner
  pages, which use the same `ServiceBenefitsSection`.
- **`migrationPlatforms` is page-specific**, rendering only on
  `/services/salesforce-migration-services` and
  `/services/salesforce-implementation-services`.

The capture script therefore cannot assume one source page, and cannot assume
every key is capturable.

## Component 1 — the DOM hook

Sections currently render with no marker saying which section is which, so a
capture script would have to identify them by index. That breaks silently: any
section whose component returns `null` for lack of content — which is exactly
what `benefits` does today — shifts every subsequent index by one, and the script
would crop the wrong section without failing.

In `src/app/(site)/salesforce/[slug]/page.tsx:261`, replace the `Fragment` with a
keyed wrapper:

```tsx
{orderedSectionKeys.map((sectionKey) => (
  <div key={sectionKey} data-section-key={sectionKey}>
    {sectionRenderers[sectionKey]}
  </div>
))}
```

An empty wrapper for a null-rendering section has no height and no styles, so it
is invisible. The attribute also makes section order assertable by future tests.

## Component 2 — the capture script

`scripts/capture-section-thumbnails.ts`, run as `pnpm thumbs:sections`.

It walks a **source map** — section key to where that section can be found:

```ts
type Source = { url: string; selector?: string };
// selector defaults to `[data-section-key="${key}"]`
```

Most keys resolve on a service page via the new attribute. `benefits` needs an
explicit entry pointing at a partner page with a CSS selector, since the wrapper
only exists on the service page template.

For each key the script navigates, waits for the element, scrolls it into view so
lazy images and in-view animations settle, screenshots that element's bounding
box, downscales to 360px wide, and writes
`public/studio/section-thumbnails/<key>.webp`.

**Failure behaviour is explicit, not silent.** A key whose element is absent or
zero-height is reported by name and skipped; the script exits non-zero if any key
failed, and prints the captured and missed lists. A silently short set is the
failure mode that matters here — it would leave a section unlabelled with no
warning.

The script runs against a local dev server, which must already be running. It
does not start one.

## Component 3 — the option metadata

`sectionOrderOptions` in `src/sanity/schemaTypes/servicePage.ts:31` gains a third
key per entry:

```ts
{ title: "Trusted partners", value: "partners", thumbnail: "/studio/section-thumbnails/partners.webp" },
```

Sanity's `options.list` passes entries through untouched and ignores keys it does
not recognise, so the existing dropdown keeps working unchanged if the custom
component is ever removed.

## Component 4 — the Studio input component

`src/sanity/components/SectionPicker.tsx`, attached as the `input` component on
the array's item type. The Studio is embedded in this Next app, so JSX is
available; `servicePage.ts` uses `createElement` only because it is a `.ts` file.

Two states:

- **Row (collapsed)** — thumbnail at ~64px wide beside the section name, so the
  assembled order reads as a visual sequence.
- **Open** — the same thumbnail and name as menu entries in place of plain text.

**API confirmed against the installed version** (sanity 4.18.0): a string
schema definition accepts `components?: StringComponents`, and
`StringInputProps` exposes
`onChange: (patch: FormPatch | FormPatch[] | PatchEvent) => void` plus the
resolved `schemaType` the options list can be read from. The mechanism this
design rests on exists; it is not assumed.

Requirements:

- Reads its options from the field's `options.list`, so the metadata stays in one
  place.
- Calls Sanity's `onChange` with a `set` patch on selection — the value written
  must remain the plain section key string, unchanged from today, so existing
  documents and the page renderer are unaffected.
- An entry with no `thumbnail`, or whose image fails to load, renders name-only.
- Keyboard-operable: the control is reachable by tab and selectable without a
  mouse.
- The Studio is dark-themed and the thumbnails are light, so each image gets a
  subtle border to avoid appearing to float.

## Verification

- The capture script asserts one file per section key above a minimum byte size
  and exits non-zero listing any it missed. This is the check that matters: a
  silently short set is the likely failure.
- `pnpm build` proves the Studio compiles with the custom component attached.
- A published service page still renders in the right order after the wrapper
  change, and its section count is unchanged.
- Opening the picker and confirming the thumbnails are recognisable is a human
  check. Nothing automated can judge that.

## Out of scope

- Exposing additional sections in the dropdown.
- Any change to how sections render on the public site beyond the wrapper `div`.
- Thumbnails for `hero`, which is fixed and not part of `sectionOrder`.
- Automatic regeneration on deploy. The script is run deliberately.

## Known limitation

`benefits` has no content on any service page, so its thumbnail comes from a
partner page. If those pages change, that one source entry needs updating. The
alternative — filling in benefits content on a service document purely to enable
a screenshot — puts CMS content at the mercy of a tooling need, which is worse.
