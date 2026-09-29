# Mega menu navbar — design

**Date:** 2026-09-29
**Status:** approved, ready for implementation planning
**Figma:** file `j8xHI1PKviupVUOnQwdVUr` — Services › Salesforce Services
`851:2892`, Services › Industries `851:3138`, Services › Platform Expertise
`851:3370`, Partnership `851:3803`, Company `851:3616`. Desktop only; there
is no mobile design.

## Problem

The header has eight top-level items and four hover dropdowns, and it no
longer fits the site's page count. The new design groups everything under
five items with a mega menu panel that morphs between menus.

## Decisions

| Question | Decision |
| --- | --- |
| Where do Salesforce Services links and icons come from? | Links stay Sanity-driven (published `servicePage` documents, same query and caching). Icons are mapped in code by `href`, with a generic fallback icon. No schema change. Industries, Platform Expertise, Partnership and Company are fixed lists in code. |
| Mobile | Keep the native `<details>` menu (works before hydration), restructured to the new groups. |
| Desktop menu primitive | shadcn's Base UI navigation menu (`@base-ui/react`), copied into the project and restyled with our tokens. |
| Link targets | See the table below. |

### Top level and link targets

| Item | Kind | Target |
| --- | --- | --- |
| Services | Panel trigger | — |
| Our Work | Link | `/case-studies` |
| Hire Talent | Link | `/salesforce-recruitment-agency` |
| Partnership | Panel trigger | — |
| Company | Panel trigger | — |
| Let's Connect | Button link | `/contact` (unchanged) |

Panel triggers open their panel on hover, click and keyboard; they never
navigate.

### Panel contents

Each panel has a left column of categories and a right column with the
active category's links. Category rows link to their overview page, except
Company, which has no page.

| Panel | Category (link) | Links (in order) |
| --- | --- | --- |
| Services | Salesforce Services (`/services`) | Sanity service pages, `order(title asc)` |
| | Industries We Serve (`/industries`) | Health Cloud, Nonprofit, Financial Services, Education Cloud, Commerce Cloud (existing `/industries/*` pages) |
| | Platform Expertise (`/platform-expertise`) | Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce (existing `/platform-expertise/*` pages) |
| Partnership | Partnership (`/partnership`) | FinDock, Fundraise Up, Dotdigital |
| Company | Company (not a link) | About Us (`/about`), Blog (`/blog`) |

Link labels follow Figma, e.g. "Salesforce Financial Services" (the page
title is "…Financial Services Cloud Consulting"; the menu uses the shorter
Figma label). Service labels come from each Sanity page title.

## Architecture

| File | Role |
| --- | --- |
| `src/components/layout/navConfig.ts` | The menu as data: top-level items, panels, categories, links, icons. `buildNav(salesforceServices)` returns the full tree. Shared by desktop and mobile. |
| `src/components/ui/NavigationMenu.tsx` | shadcn Base UI navigation menu parts, restyled with project tokens. No `class-variance-authority` or `tw-animate-css`: Base UI animates with CSS transitions on `data-starting-style` / `data-ending-style`. |
| `src/components/layout/DesktopNav.tsx` | `"use client"` mega menu built on `NavigationMenu`. |
| `src/components/layout/MobileNav.tsx` | The `<details>` menu, restructured. No hooks needed. |
| `src/components/layout/NavbarClient.tsx` | Header shell: logo, `DesktopNav`, Let's Connect, `MobileNav`. |
| `src/components/layout/Navbar.tsx` | Server component, unchanged fetch; passes the services list through. |
| `public/images/nav/*.svg` | Figma icon glyphs (25 files, exported, not redrawn). |

The old `DesktopDropdown`, `getNavItems` and the three hard-coded page
lists in `NavbarClient.tsx` are removed.

### Data shape

```ts
interface NavIcon { src: string; width: number; height: number }
interface NavLink { label: string; href: string; icon: NavIcon }
interface NavCategory { label: string; href?: string; icon: NavIcon; links: NavLink[] }
type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "panel"; label: string; categories: NavCategory[] };
```

Icon `width`/`height` are the glyph's intrinsic SVG size (15–19px; the
Health Cloud file is a full 25px icon). Service icons are looked up in a
`Record<href, NavIcon>`; a service page with no entry gets the Salesforce
Services category glyph.

### Dependency

`@base-ui/react`, pinned to an exact version in `package.json` (no caret).
Hostinger installs without the lockfile, so a range would drift.

## Desktop behaviour and visuals (≥ `lg`)

Values from Figma; colours become `@theme` tokens where they are new.

- **Top-level items:** Roboto 14px/25px, `#2E2E2E`, 10px padding, 21px gap.
  No chevrons.
- **Active item:** semibold, brand green (`#38A81B`), with a 1px green line
  under the label at the label's width. An item is active while its panel is
  open, or when no panel is open and the current page belongs to its
  section:
  - Services: `/services*`, `/industries*`, `/platform-expertise*`.
  - Partnership: `/partnership*`.
  - Company: `/about`, `/blog*`.
  - Our Work: `/case-studies*`.
  - Hire Talent: `/salesforce-recruitment-agency`.
- **Panel:** 800px wide, white, radius 20px, shadow `0 0 19px
  rgb(0 0 0 / 0.11)`. It is centred on the header rather than aligned to
  the trigger: `Positioner` `anchor` is the header row and `align="center"`, which puts it at the page centre as in Figma.
  Every panel is the same width, and its height fits the content.
- **Caret:** a 21×17 white triangle on the panel's top edge, pointing at the
  open trigger. It sits inside the popup and shares its shadow. Its x offset
  (trigger centre minus header-row centre) is set as a CSS variable on the popup
  and transitions with the panel.
- **Gap:** the panel's top edge sits 32px below the trigger (15px to the
  caret tip).
- **Morph:** moving between Services, Partnership and Company animates the
  panel height and slides the content by direction. This is Base UI's
  `--popup-height` and `data-activation-direction`, 0.35s
  `cubic-bezier(0.22,1,0.36,1)`.
- **Left column:** 234px wide, `#E9FFE4` (new token), with rounded left
  corners.
  - Category rows are 53px tall with 24px side padding and a 30px gap
    between rows; the first row starts 56px from the panel top.
  - Label: Roboto bold 16px, `#141414`.
  - The active row is `brand-green-light` (`#A0FF88`).
- **Right column:** starts 35px right of the left column. It is a two-column
  grid (219px columns, 54px column gap, 40px row gap), filled row by row.
  - Top padding is 70px in the Services panel and 56px in Partnership and
    Company.
  - Each link: 15px gap, then Roboto medium 16px/20px `#3C3C3C` wrapping
    at 179px.
- **Vertical spacing:** follows Figma per panel type.
  - Services panel: rows start 56px from the top, the link grid starts at
    70px, and there is 38px bottom padding.
  - Single-category panels: the row starts at 42px, the links at 56px, and
    there is 48px bottom padding.
  - The panel is at least as tall as its left column. Heights within 6px of
    Figma are accepted.
- **Icons:** a 25px brand-green circle with the white glyph centred at its
  intrinsic size.
- **Category switching:** hovering or focusing a category row makes it
  active. It stays active until another row is hovered or focused, and the
  panel opens on the first category.
- **Keyboard:** every category's links must be reachable by Tab. The DOM
  interleaves each category row with its link grid, and only the active
  grid renders. CSS grid places rows in column 1 and the grid in column 2
  spanning all rows. Focusing a row therefore renders its links next in tab
  order.
- **Category height:** in the Services panel, switching categories changes
  the height (Figma: 355px vs 313px). The panel must resize to the active
  category. If Base UI does not re-measure on an internal content change,
  the accepted fallback is a fixed Services height equal to its tallest
  category.
- **Backdrop:** while any panel is open, the page below the header is
  blurred (8px backdrop blur, no tint) and fades with the panel. The
  overlay takes the outside click so it closes the menu without activating
  whatever is underneath.
- **Closing:** the panel closes on Escape, an outside click or pointer
  leave (Base UI defaults: 50ms open and close delay). Clicking a panel link
  closes it and navigates.
- **Reduced motion:** transitions are disabled under
  `prefers-reduced-motion: reduce`.

## Mobile behaviour (< `lg`)

- The same native `<details>` burger and full-height scrolling sheet as
  today, so the burger works before hydration.
- **Top level:** Services, Our Work, Hire Talent, Partnership, Company, then
  Let's Connect.
- **Groups:** Services, Partnership and Company are `<details>` accordions
  (one open at a time via `name`).
  - Services contains three labelled groups (Salesforce Services, Industries
    We Serve, Platform Expertise). Each group heading links to its
    overview page, and its links follow with the same 25px icons as desktop.
  - Partnership lists an overview link followed by its three links.
  - Company lists About Us and Blog.
- **Unchanged:** escape and link-click close behaviour stays as it is, and
  `aria-current="page"` is set on the current link.
- **SEO:** every menu link is in the server HTML inside the mobile menu, so
  crawlers still see all links even though desktop panel content only
  mounts while open.

## Testing

Update `tests/navbar.spec.ts`:

- Top-level items render at 1280px: Services, Partnership and Company are
  buttons; Our Work and Hire Talent are links with the hrefs above.
- Hovering Services opens a panel showing the Salesforce Services links from
  Sanity (or the fallback). Hovering "Industries We Serve" swaps in the
  industry links, and "Platform Expertise" the platform links.
- Moving to Partnership shows FinDock, Fundraise Up and Dotdigital; Company
  shows About Us and Blog.
- Escape closes the panel, and clicking a panel link navigates.
- Keyboard: Tab from the Services trigger with the panel open reaches an
  industry link after focusing "Industries We Serve".
- Mobile: the existing open, collapse, close, short-screen scroll and
  no-JS tests are updated to the new groups and all still pass.

Visual check at 1440×900 against the five Figma frames (panel position,
caret position, row heights, colours), plus 1024px for fit.

## Out of scope

- Mobile visual redesign beyond regrouping (no Figma).
- Sanity-editable menu structure or icons.
- Logo and Let's Connect button styling (unchanged).
