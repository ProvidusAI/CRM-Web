# Mega Menu Navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the eight-item header with the Figma mega menu (Services, Our Work, Hire Talent, Partnership, Company): a morphing Base UI panel on desktop and a regrouped `<details>` menu on mobile.

**Architecture:** One data file (`navConfig.ts`) describes the whole menu. The desktop nav (`DesktopNav.tsx`, built on a restyled shadcn Base UI navigation menu) and the mobile nav (`MobileNav.tsx`, native `<details>`) both render it. `Navbar.tsx` keeps fetching the Sanity service pages; `NavbarClient.tsx` becomes a thin header shell.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4.3, `@base-ui/react` 1.8.0, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-29-mega-menu-navbar-design.md`

## Global Constraints

- **Package manager:** pnpm. Add `@base-ui/react` pinned exactly: `"1.8.0"`, no caret. Hostinger installs without the lockfile.
- **Colours:** no raw hex in components. New colours go in `@theme` in `src/styles/globals.css` (Task 2 adds them).
- **Typography:** use the `typography-*` utilities. Their size, weight and line height are `!important`, so override with `!`-prefixed classes (`!font-bold`, `!leading-5`).
- **Classes:** compose them with `cn()` from `@/lib/utils`.
- **Types:** no `any`; strict TypeScript.
- **Reduced motion:** every transition added here also gets `motion-reduce:transition-none`.
- **Icons:** `public/images/nav/*.svg` are already committed (Figma exports). Do not edit or redraw them.
- **Tests:** Playwright only (`pnpm exec playwright test …`). It reuses the dev server on :3002 or starts `pnpm dev`. If a run flakes with timeouts, re-run with `--last-failed --workers=1`.
- **Git:** commit after each task on `main`, with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push.

---

### Task 1: Menu data

**Files:**
- Create: `src/components/layout/navConfig.ts`
- Test: `tests/nav-config.spec.ts`

**Interfaces:**
- Consumes: `NavItem` from `@/types` (`{ label: string; href: string }`).
- Produces:
  - `interface NavIcon { src: string; width: number; height: number }`
  - `interface NavLink { label: string; href: string; icon: NavIcon }`
  - `interface NavCategory { label: string; href?: string; icon: NavIcon; links: NavLink[] }`
  - `type NavEntry = { kind: "link"; label: string; section: string[]; href: string } | { kind: "panel"; label: string; section: string[]; categories: NavCategory[] }`
  - `buildNav(salesforceServices: NavItem[]): NavEntry[]`
  - `isInSection(pathname: string, section: string[]): boolean`

- [ ] **Step 1: Write the failing test**

Create `tests/nav-config.spec.ts`:

```ts
import { existsSync } from "node:fs";
import { test, expect } from "@playwright/test";
import { buildNav, isInSection, type NavEntry } from "@/components/layout/navConfig";

const services = [
  { label: "Salesforce Consulting Services", href: "/services/salesforce-consulting-services" },
  { label: "Salesforce Brand New Service", href: "/services/salesforce-brand-new-service" },
];

function panel(entries: NavEntry[], label: string) {
  const entry = entries.find((e) => e.label === label);
  if (entry?.kind !== "panel") throw new Error(`${label} should be a panel`);
  return entry;
}

test.describe("nav config", () => {
  test("top level follows the design", () => {
    expect(buildNav(services).map((e) => `${e.kind}:${e.label}`)).toEqual([
      "panel:Services",
      "link:Our Work",
      "link:Hire Talent",
      "panel:Partnership",
      "panel:Company",
    ]);
  });

  test("Salesforce Services lists the Sanity pages with mapped or fallback icons", () => {
    const [salesforce, industries, platform] = panel(buildNav(services), "Services").categories;
    expect(salesforce.href).toBe("/services");
    expect(salesforce.links.map((l) => l.href)).toEqual(services.map((s) => s.href));
    expect(salesforce.links[0].icon.src).toBe("/images/nav/consulting.svg");
    // A service page with no mapped icon falls back to the category glyph.
    expect(salesforce.links[1].icon).toEqual(salesforce.icon);
    expect(industries.links).toHaveLength(5);
    expect(platform.links).toHaveLength(6);
  });

  test("Company has no overview page", () => {
    expect(panel(buildNav([]), "Company").categories[0].href).toBeUndefined();
  });

  test("isInSection matches the prefix and its subpages only", () => {
    expect(isInSection("/services", ["/services"])).toBe(true);
    expect(isInSection("/services/salesforce-consulting-services", ["/services"])).toBe(true);
    expect(isInSection("/services-extra", ["/services"])).toBe(false);
    expect(isInSection("/blog/some-post", ["/about", "/blog"])).toBe(true);
    expect(isInSection("/", ["/about", "/blog"])).toBe(false);
  });

  test("every icon file exists", () => {
    const icons = buildNav(services).flatMap((entry) =>
      entry.kind === "panel"
        ? entry.categories.flatMap((c) => [c.icon, ...c.links.map((l) => l.icon)])
        : []
    );
    for (const icon of icons) {
      expect(existsSync(`public${icon.src}`), icon.src).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec playwright test tests/nav-config.spec.ts`
Expected: FAIL because the module `@/components/layout/navConfig` cannot be resolved.

- [ ] **Step 3: Write the implementation**

Create `src/components/layout/navConfig.ts`:

```ts
import type { NavItem } from "@/types";

export interface NavIcon {
  src: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  href: string;
  icon: NavIcon;
}

export interface NavCategory {
  label: string;
  /** Overview page. Company has none. */
  href?: string;
  icon: NavIcon;
  links: NavLink[];
}

interface NavEntryBase {
  label: string;
  /** Path prefixes of the pages this item is highlighted on. */
  section: string[];
}

export type NavEntry =
  | (NavEntryBase & { kind: "link"; href: string })
  | (NavEntryBase & { kind: "panel"; categories: NavCategory[] });

// White glyphs exported from Figma (j8xHI1PKviupVUOnQwdVUr), drawn at their
// intrinsic size (rounded) inside a 25px green circle. health-cloud.svg is
// already a full 25px icon, circle included.
function icon(name: string, width: number, height: number): NavIcon {
  return { src: `/images/nav/${name}.svg`, width, height };
}

const CATEGORY_ICONS = {
  salesforceServices: icon("cat-salesforce-services", 18, 13),
  industries: icon("cat-industries", 16, 16),
  platformExpertise: icon("cat-platform-expertise", 15, 15),
  partnership: icon("partnership", 19, 13),
  company: icon("cat-company", 17, 17),
};

// Service pages come from Sanity, so their icons are matched by URL. A new
// service page shows the category glyph until it gets an entry here.
const SERVICE_ICONS: Record<string, NavIcon> = {
  "/services/salesforce-consulting-services": icon("consulting", 15, 15),
  "/services/salesforce-customisation-services": icon("customisation", 19, 19),
  "/services/salesforce-development-services": icon("development", 17, 17),
  "/services/salesforce-implementation-services": icon("implementation", 17, 17),
  "/services/salesforce-integration-services": icon("integration", 19, 19),
  "/services/salesforce-managed-services": icon("managed-services", 15, 15),
  "/services/salesforce-migration-services": icon("migration", 17, 14),
};

// Labels follow Figma, which shortens a few page titles.
const INDUSTRY_LINKS: NavLink[] = [
  {
    label: "Salesforce Health Cloud Consulting",
    href: "/industries/salesforce-health-cloud-consulting",
    icon: icon("health-cloud", 25, 25),
  },
  {
    label: "Salesforce Nonprofit Consulting",
    href: "/industries/salesforce-nonprofit-consulting",
    icon: icon("nonprofit", 17, 16),
  },
  {
    label: "Salesforce Financial Services",
    href: "/industries/salesforce-financial-services-cloud-consulting",
    icon: icon("financial-services", 15, 18),
  },
  {
    label: "Salesforce Education Cloud Consulting",
    href: "/industries/salesforce-education-cloud-consulting",
    icon: icon("education-cloud", 17, 17),
  },
  {
    label: "Salesforce Commerce Cloud Consulting",
    href: "/industries/salesforce-commerce-cloud-consulting",
    icon: icon("commerce-cloud", 16, 17),
  },
];

const PLATFORM_LINKS: NavLink[] = [
  {
    label: "Salesforce Sales Cloud Consulting",
    href: "/platform-expertise/salesforce-sales-cloud-consulting",
    icon: icon("sales-cloud", 15, 15),
  },
  {
    label: "Salesforce Service Cloud Consulting",
    href: "/platform-expertise/salesforce-service-cloud-consulting",
    icon: icon("service-cloud", 15, 15),
  },
  {
    label: "Salesforce Marketing Cloud Consulting",
    href: "/platform-expertise/salesforce-marketing-cloud-consulting",
    icon: icon("marketing-cloud", 17, 17),
  },
  {
    label: "Salesforce Experience Cloud Consulting",
    href: "/platform-expertise/salesforce-experience-cloud-consulting",
    icon: icon("experience-cloud", 17, 17),
  },
  {
    label: "Salesforce Data Cloud Consulting",
    href: "/platform-expertise/salesforce-data-cloud-consulting",
    icon: icon("data-cloud", 15, 15),
  },
  {
    label: "Salesforce Agentforce Consulting",
    href: "/platform-expertise/salesforce-agentforce-consulting",
    icon: icon("agentforce", 17, 16),
  },
];

const PARTNER_LINKS: NavLink[] = [
  { label: "FinDock", href: "/partnership/findock", icon: CATEGORY_ICONS.partnership },
  { label: "Fundraise Up", href: "/partnership/fundraise-up", icon: CATEGORY_ICONS.partnership },
  { label: "Dotdigital", href: "/partnership/dotdigital", icon: CATEGORY_ICONS.partnership },
];

const COMPANY_LINKS: NavLink[] = [
  { label: "About Us", href: "/about", icon: icon("about-us", 15, 17) },
  { label: "Blog", href: "/blog", icon: icon("blog", 15, 16) },
];

export function buildNav(salesforceServices: NavItem[]): NavEntry[] {
  return [
    {
      kind: "panel",
      label: "Services",
      section: ["/services", "/industries", "/platform-expertise"],
      categories: [
        {
          label: "Salesforce Services",
          href: "/services",
          icon: CATEGORY_ICONS.salesforceServices,
          links: salesforceServices.map((service) => ({
            ...service,
            icon: SERVICE_ICONS[service.href] ?? CATEGORY_ICONS.salesforceServices,
          })),
        },
        {
          label: "Industries We Serve",
          href: "/industries",
          icon: CATEGORY_ICONS.industries,
          links: INDUSTRY_LINKS,
        },
        {
          label: "Platform Expertise",
          href: "/platform-expertise",
          icon: CATEGORY_ICONS.platformExpertise,
          links: PLATFORM_LINKS,
        },
      ],
    },
    { kind: "link", label: "Our Work", href: "/case-studies", section: ["/case-studies"] },
    {
      kind: "link",
      label: "Hire Talent",
      href: "/salesforce-recruitment-agency",
      section: ["/salesforce-recruitment-agency"],
    },
    {
      kind: "panel",
      label: "Partnership",
      section: ["/partnership"],
      categories: [
        {
          label: "Partnership",
          href: "/partnership",
          icon: CATEGORY_ICONS.partnership,
          links: PARTNER_LINKS,
        },
      ],
    },
    {
      kind: "panel",
      label: "Company",
      section: ["/about", "/blog"],
      categories: [{ label: "Company", icon: CATEGORY_ICONS.company, links: COMPANY_LINKS }],
    },
  ];
}

export function isInSection(pathname: string, section: string[]): boolean {
  return section.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec playwright test tests/nav-config.spec.ts && pnpm type-check`
Expected: 5 passed; `tsc --noEmit` exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/navConfig.ts tests/nav-config.spec.ts
git commit -m "feat(nav): describe the mega menu as data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Mobile menu on the new groups

**Files:**
- Modify: `src/styles/globals.css` (the `@theme` block, after the "Pain points grid" tokens)
- Create: `src/components/layout/NavIconBadge.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Modify: `src/components/layout/NavbarClient.tsx`
- Test: `tests/navbar.spec.ts`

**Interfaces:**
- Consumes: `buildNav`, `NavEntry`, `NavIcon` from Task 1.
- Produces:
  - `NavIconBadge({ icon }: { icon: NavIcon })`
  - `MobileNav({ entries }: { entries: NavEntry[] })`
  - Theme tokens: `text-nav-text` (`#2e2e2e`), `text-nav-link` (`#3c3c3c`), `text-nav-category` (`#141414`), `--color-nav-panel-side` (`#e9ffe4`), `drop-shadow-nav-panel`.

- [ ] **Step 1: Update the mobile tests so they fail**

In `tests/navbar.spec.ts`, replace the whole `test("mobile menu opens, collapses child pages, and closes", …)` block with:

```ts
  test("mobile menu opens, collapses child pages, and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const toggle = page.getByLabel("Navigation menu", { exact: true });
    const menu = page.getByRole("navigation", { name: "Main navigation" });
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Our Work", exact: true })).toHaveAttribute(
      "href",
      "/case-studies"
    );

    // Services is a collapsed accordion holding three labelled groups.
    const child = menu.getByRole("link", { name: "Salesforce Sales Cloud Consulting" });
    await expect(child).not.toBeVisible();
    await menu.getByText("Services", { exact: true }).click();
    await expect(child).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Platform Expertise", exact: true })
    ).toHaveAttribute("href", "/platform-expertise");

    // Sections share a <details> name, so opening Company closes Services.
    await menu.getByText("Company", { exact: true }).click();
    await expect(child).not.toBeVisible();
    await expect(menu.getByRole("link", { name: "About Us", exact: true })).toHaveAttribute(
      "href",
      "/about"
    );

    await toggle.click();
    await expect(menu).not.toBeVisible();
  });
```

In the `"Navbar without JavaScript"` describe, `/about` now sits inside the collapsed Company group. Change the assertion line to:

```ts
    await expect(page.locator('header a[href="/case-studies"]').last()).toBeVisible();
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm exec playwright test tests/navbar.spec.ts -g "mobile menu opens"`
Expected: `mobile menu opens, collapses child pages, and closes` FAILS because there is no "Our Work" link. `mobile menu opens before hydration` FAILS because there is no `/case-studies` link in the header.

- [ ] **Step 3: Add the theme tokens**

In `src/styles/globals.css`, inside `@theme`, directly after the line `--color-icon-badge-end: #247ac9;`, add:

```css
  /* Mega menu navbar (Figma 851:2892) */
  --color-nav-text: #2e2e2e;
  --color-nav-link: #3c3c3c;
  --color-nav-category: #141414;
  --color-nav-panel-side: #e9ffe4;
  --drop-shadow-nav-panel: 0 0 19px rgb(0 0 0 / 0.11);
```

- [ ] **Step 4: Create the icon badge**

Create `src/components/layout/NavIconBadge.tsx`:

```tsx
import Image from "next/image";
import type { NavIcon } from "./navConfig";

// Figma menu icon: a white glyph centred in a 25px brand-green circle.
export function NavIconBadge({ icon }: { icon: NavIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-[25px] shrink-0 items-center justify-center rounded-full bg-brand-green"
    >
      <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
    </span>
  );
}
```

- [ ] **Step 5: Create the mobile menu**

Create `src/components/layout/MobileNav.tsx`. This moves the `<details>` menu and its two handlers out of `NavbarClient.tsx` and renders it from `NavEntry[]`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "./Container";
import { NavIconBadge } from "./NavIconBadge";
import type { NavEntry } from "./navConfig";

// The mobile menu is a native <details>, so the burger works the moment the
// server HTML paints. As a React-state button it ignored taps for ~3s on a
// throttled phone until hydration, and for good when a bundle stalled.
function closeMenuOnEscape(e: KeyboardEvent<HTMLDetailsElement>) {
  if (e.key !== "Escape" || !e.currentTarget.open) return;
  e.currentTarget.open = false;
  e.currentTarget.querySelector("summary")?.focus();
}

function closeMenuOnLinkClick(e: MouseEvent<HTMLDivElement>) {
  if (!(e.target as Element).closest("a")) return;
  const menu = e.currentTarget.closest("details");
  if (menu) menu.open = false;
}

export function MobileNav({ entries }: { entries: NavEntry[] }) {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <details className="group/menu lg:hidden" onKeyDown={closeMenuOnEscape}>
      {/* -m-1 p-3: a 44px tap target with the icon where p-2 had it. */}
      <summary
        aria-label="Navigation menu"
        className="-m-1 flex cursor-pointer touch-manipulation list-none items-center justify-center p-3 text-nav-text [&::-webkit-details-marker]:hidden"
      >
        <svg
          className="h-5 w-5 group-open/menu:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className="hidden h-5 w-5 group-open/menu:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </summary>

      {/* Fixed under the 72px header row with its own scroll: inline in
          the sticky header it was pinned with it, so on a short screen
          its lower items could never scroll into view. */}
      <div
        className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto overscroll-contain border-t border-gray-100 bg-white"
        onClick={closeMenuOnLinkClick}
      >
        <Container>
          <nav aria-label="Main navigation" className="flex flex-col gap-1 py-4">
            {entries.map((entry) =>
              entry.kind === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="typography-p3 px-2 py-2 text-nav-text transition-colors hover:text-brand-green"
                  aria-current={current(entry.href)}
                >
                  {entry.label}
                </Link>
              ) : (
                <details key={entry.label} name="mobile-nav-section" className="group/section">
                  <summary className="typography-p3 flex cursor-pointer list-none items-center justify-between px-2 py-2 text-nav-text [&::-webkit-details-marker]:hidden">
                    {entry.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-open/section:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-gray-100 pl-4">
                    {entry.categories.map((category) => (
                      <div key={category.label} className="flex flex-col gap-1">
                        {category.href ? (
                          <Link
                            href={category.href}
                            aria-current={current(category.href)}
                            className="typography-p4 !font-semibold px-2 py-2 text-nav-category transition-colors hover:text-brand-green"
                          >
                            {/* Services has three named groups; a single-group
                                panel links its overview page instead. */}
                            {entry.categories.length > 1 ? category.label : `${entry.label} overview`}
                          </Link>
                        ) : null}
                        {category.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={current(link.href)}
                            className="typography-p4 flex items-center gap-3 px-2 py-2 text-gray-text transition-colors hover:text-brand-green"
                          >
                            <NavIconBadge icon={link.icon} />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              )
            )}
            <div className="mt-2 border-t border-gray-100 pt-4">
              <Link href="/contact">
                <CtaButton variant="filled" size="sm" className="w-full">
                  Let&apos;s Connect
                </CtaButton>
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </details>
  );
}
```

- [ ] **Step 6: Use it in the header**

In `src/components/layout/NavbarClient.tsx`, make these changes:

1. Delete the `closeMenuOnEscape` and `closeMenuOnLinkClick` functions and the comment above them. They now live in `MobileNav.tsx`.
2. Delete the whole `<details className="group/menu lg:hidden" …> … </details>` block (from `<details className="group/menu lg:hidden"` to its closing `</details>`, just before the row's closing `</div>`), and put this in its place:

   ```tsx
             <MobileNav entries={buildNav(salesforceServices)} />
   ```
3. Add the imports:

   ```tsx
   import { MobileNav } from "./MobileNav";
   import { buildNav } from "./navConfig";
   ```
4. Remove the imports that are now unused: `ChevronDown` and the `KeyboardEvent`/`MouseEvent` type import.

The desktop `<nav>` and `DesktopDropdown` stay until Task 3.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `pnpm exec playwright test tests/navbar.spec.ts tests/nav-config.spec.ts && pnpm type-check && pnpm lint`
Expected: all navbar tests pass, including `mobile menu scrolls to its last item on a short screen`, the four `Mobile page width` tests and `mobile menu opens before hydration`. `tsc` exits 0. Lint shows only the existing `SectionPicker.tsx` `<img>` warning.

- [ ] **Step 8: Commit**

```bash
git add src/styles/globals.css src/components/layout/NavIconBadge.tsx src/components/layout/MobileNav.tsx src/components/layout/NavbarClient.tsx tests/navbar.spec.ts
git commit -m "feat(nav): regroup the mobile menu under the new top level

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Desktop mega menu

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml` (via `pnpm add`)
- Create: `src/components/ui/NavigationMenu.tsx`
- Create: `src/components/layout/DesktopNav.tsx`
- Modify: `src/components/layout/NavbarClient.tsx` (full rewrite below)
- Test: `tests/navbar.spec.ts`

**Interfaces:**
- Consumes:
  - From Task 1: `NavEntry`, `NavCategory`, `isInSection`, `buildNav`.
  - From Task 2: `NavIconBadge`, `MobileNav`, and the tokens `text-nav-text`, `text-nav-link`, `text-nav-category`, `--color-nav-panel-side`, `drop-shadow-nav-panel`.
- Produces:
  - `DesktopNav({ entries, anchor }: { entries: NavEntry[]; anchor: RefObject<HTMLDivElement | null> })`. It renders `<nav aria-label="Primary">`.
  - The open panel's popup carries `data-slot="nav-panel"`.

- [ ] **Step 1: Write the failing desktop tests**

In `tests/navbar.spec.ts`, delete the `test("renders all navigation links", …)` block. After the closing `});` of `test.describe("Navbar", …)`, add:

```ts
test.describe("Desktop mega menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
  });

  const panel = (page: Page) => page.locator('[data-slot="nav-panel"]');

  test("top level has three panel triggers and two links", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const label of ["Services", "Partnership", "Company"]) {
      await expect(nav.getByRole("button", { name: label, exact: true })).toBeVisible();
    }
    await expect(nav.getByRole("link", { name: "Our Work", exact: true })).toHaveAttribute(
      "href",
      "/case-studies"
    );
    await expect(nav.getByRole("link", { name: "Hire Talent", exact: true })).toHaveAttribute(
      "href",
      "/salesforce-recruitment-agency"
    );
  });

  test("Services panel switches category on hover", async ({ page }) => {
    await page.getByRole("button", { name: "Services", exact: true }).hover();
    const link = (name: string) => panel(page).getByRole("link", { name, exact: true });

    await expect(link("Salesforce Consulting Services")).toBeVisible();
    await expect(link("Salesforce Services")).toHaveAttribute("href", "/services");

    await link("Industries We Serve").hover();
    await expect(link("Salesforce Health Cloud Consulting")).toBeVisible();
    await expect(link("Salesforce Consulting Services")).toHaveCount(0);

    await link("Platform Expertise").hover();
    await expect(link("Salesforce Agentforce Consulting")).toHaveAttribute(
      "href",
      "/platform-expertise/salesforce-agentforce-consulting"
    );
  });

  test("Partnership and Company panels", async ({ page }) => {
    const link = (name: string) => panel(page).getByRole("link", { name, exact: true });

    await page.getByRole("button", { name: "Partnership", exact: true }).hover();
    await expect(link("FinDock")).toHaveAttribute("href", "/partnership/findock");
    await expect(link("Fundraise Up")).toHaveAttribute("href", "/partnership/fundraise-up");
    await expect(link("Dotdigital")).toHaveAttribute("href", "/partnership/dotdigital");
    await expect(link("Partnership")).toHaveAttribute("href", "/partnership");

    await page.getByRole("button", { name: "Company", exact: true }).hover();
    await expect(link("About Us")).toHaveAttribute("href", "/about");
    await expect(link("Blog")).toHaveAttribute("href", "/blog");
  });

  test("Escape closes the panel", async ({ page }) => {
    await page.getByRole("button", { name: "Services", exact: true }).click();
    await expect(panel(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
  });

  test("keyboard reaches a category's links", async ({ page }) => {
    await page.getByRole("button", { name: "Services", exact: true }).click();
    await panel(page).getByRole("link", { name: "Industries We Serve", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(
      panel(page).getByRole("link", { name: "Salesforce Health Cloud Consulting", exact: true })
    ).toBeFocused();
  });

  test("clicking a panel link navigates and closes the panel", async ({ page }) => {
    await page.getByRole("button", { name: "Company", exact: true }).hover();
    await panel(page).getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(panel(page)).toBeHidden();
  });
});
```

Change the first line of the file to:

```ts
import { test, expect, type Page } from "@playwright/test";
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm exec playwright test tests/navbar.spec.ts -g "Desktop mega menu"`
Expected: all 6 FAIL. There is no `navigation` named "Primary", and no `[data-slot="nav-panel"]`.

- [ ] **Step 3: Add the dependency, pinned**

Run: `pnpm add --save-exact @base-ui/react@1.8.0`
Then check: `grep '"@base-ui/react"' package.json`
Expected: `"@base-ui/react": "1.8.0",` with no caret.

- [ ] **Step 4: Create the navigation menu primitives**

Create `src/components/ui/NavigationMenu.tsx`:

```tsx
"use client";

import { NavigationMenu as Primitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps, CSSProperties, RefObject } from "react";
import { cn } from "@/lib/utils";

// shadcn's Base UI navigation menu (ui.shadcn.com/docs/components/base/navigation-menu),
// trimmed to the parts the header uses and restyled for Figma 851:2892.
// Base UI animates with CSS transitions on data-starting-style and
// data-ending-style, so no animation plugin is needed.

type WithClassName<P> = Omit<P, "className"> & { className?: string };

const MORPH =
  "duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export const NavigationMenuItem = Primitive.Item;
export const NavigationMenuTrigger = Primitive.Trigger;
export const NavigationMenuLink = Primitive.Link;

export function NavigationMenu(props: WithClassName<Primitive.Root.Props<string>>) {
  return <Primitive.Root {...props} />;
}

export function NavigationMenuList({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Primitive.List>>) {
  return (
    <Primitive.List
      className={cn("flex list-none items-center gap-[21px]", className)}
      {...props}
    />
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Primitive.Content>>) {
  return (
    <Primitive.Content
      className={cn(
        "transition-[opacity,translate]",
        MORPH,
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        // Slide in from the side of the previously open trigger, out the other way.
        "data-[starting-style]:data-[activation-direction=left]:-translate-x-1/2",
        "data-[starting-style]:data-[activation-direction=right]:translate-x-1/2",
        "data-[ending-style]:data-[activation-direction=left]:translate-x-1/2",
        "data-[ending-style]:data-[activation-direction=right]:-translate-x-1/2",
        className
      )}
      {...props}
    />
  );
}

interface NavigationMenuPanelProps {
  /** Element the panel centres under. */
  anchor: RefObject<HTMLElement | null>;
  /** Gap between the anchor's bottom edge and the panel's top edge. */
  sideOffset: number;
  /** Horizontal distance from the panel centre to the open trigger's centre. */
  caretOffset: number;
}

// Figma 851:2892: one 800px white panel for every menu, radius 20, soft
// shadow, a 21×17 caret on the top edge pointing at the open trigger. The
// left-column tint is painted on the popup so it stays put while the
// content slides between menus.
export function NavigationMenuPanel({ anchor, sideOffset, caretOffset }: NavigationMenuPanelProps) {
  return (
    <Primitive.Portal>
      {/* Blurs the page below the header, and takes the outside click that
          closes the menu so nothing underneath is activated. */}
      <Primitive.Backdrop className="fixed inset-x-0 top-18 bottom-0 z-40 backdrop-blur-[8px] transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
      <Primitive.Positioner
        anchor={anchor}
        side="bottom"
        align="center"
        sideOffset={sideOffset}
        collisionPadding={16}
        // before: bridges the gap under the triggers, so moving the pointer
        // down to the panel does not count as leaving the menu.
        className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) before:absolute before:inset-x-0 before:bottom-full before:h-8 before:content-['']"
      >
        <Primitive.Popup
          data-slot="nav-panel"
          style={{ "--caret-offset": `${caretOffset}px` } as CSSProperties}
          className={cn(
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-[20px] outline-none",
            "bg-[linear-gradient(to_right,var(--color-nav-panel-side)_234px,var(--color-white)_234px)]",
            "drop-shadow-nav-panel transition-[opacity,scale,width,height]",
            MORPH,
            "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute bottom-full left-[calc(50%+var(--caret-offset)-10.5px)] h-[17px] w-[21px] bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)] transition-[left] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
          <Primitive.Viewport className="relative size-full overflow-hidden rounded-[20px]" />
        </Primitive.Popup>
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
```

- [ ] **Step 5: Create the desktop nav**

Create `src/components/layout/DesktopNav.tsx`:

```tsx
"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { cn } from "@/lib/utils";
import { NavIconBadge } from "./NavIconBadge";
import { isInSection, type NavCategory, type NavEntry } from "./navConfig";

// Figma 851:2892, top-level item: 14px/25px with 10px padding. The
// highlighted item (the open panel, or the current section when none is
// open) turns semibold green with a 1px underline.
const TOP_ITEM =
  "group/top relative flex cursor-pointer items-center rounded-md p-2.5 typography-p4 !leading-[25px] whitespace-nowrap text-nav-text outline-none transition-colors hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-green/50 data-[highlight]:!font-semibold data-[highlight]:text-brand-green motion-reduce:transition-none";

// Trigger bottom sits 13.5px above the 72px header row's bottom edge; the
// panel's top edge is 32px below the trigger (15px gap + 17px caret).
const PANEL_SIDE_OFFSET = 18;

// Left column: 53px rows, 30px apart. The first row starts 56px from the top
// in the three-category Services panel and 42px in single-category panels.
// The first link row's icon is centred on the first category row.
const ROW_HEIGHT = 53;
const ROW_STRIDE = 83;

interface DesktopNavProps {
  entries: NavEntry[];
  /** The header row; panels centre under it. */
  anchor: RefObject<HTMLDivElement | null>;
}

export function DesktopNav({ entries, anchor }: DesktopNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [caretOffset, setCaretOffset] = useState(0);
  const [categoryByPanel, setCategoryByPanel] = useState<Record<string, number>>({});
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleValueChange(value: string | null) {
    setOpen(value);
    if (!value) return;
    // Each panel opens on its first category. Only the new panel is reset,
    // so the outgoing one keeps its content while it animates out.
    setCategoryByPanel((prev) => ({ ...prev, [value]: 0 }));
    const trigger = triggers.current[value]?.getBoundingClientRect();
    const row = anchor.current?.getBoundingClientRect();
    if (trigger && row) {
      setCaretOffset(trigger.left + trigger.width / 2 - (row.left + row.width / 2));
    }
  }

  return (
    <NavigationMenu
      value={open}
      onValueChange={handleValueChange}
      aria-label="Primary"
      className="hidden lg:block"
    >
      <NavigationMenuList>
        {entries.map((entry) => {
          const highlight = open ? open === entry.label : isInSection(pathname, entry.section);
          const highlightAttr = highlight ? "" : undefined;

          return (
            <NavigationMenuItem
              key={entry.label}
              value={entry.kind === "panel" ? entry.label : undefined}
            >
              {entry.kind === "link" ? (
                <NavigationMenuLink
                  active={pathname === entry.href}
                  render={<NextLink href={entry.href} />}
                  className={TOP_ITEM}
                  data-highlight={highlightAttr}
                >
                  <TopLabel label={entry.label} />
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    ref={(node) => {
                      triggers.current[entry.label] = node;
                    }}
                    className={TOP_ITEM}
                    data-highlight={highlightAttr}
                  >
                    <TopLabel label={entry.label} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <PanelBody
                      categories={entry.categories}
                      active={categoryByPanel[entry.label] ?? 0}
                      onActivate={(index) =>
                        setCategoryByPanel((prev) => ({ ...prev, [entry.label]: index }))
                      }
                      pathname={pathname}
                    />
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuPanel
        anchor={anchor}
        sideOffset={PANEL_SIDE_OFFSET}
        caretOffset={caretOffset}
      />
    </NavigationMenu>
  );
}

function TopLabel({ label }: { label: string }) {
  return (
    <span className="relative grid">
      {/* A semibold copy reserves the highlighted width, so neighbours don't shift. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
        {label}
      </span>
      <span className="col-start-1 row-start-1">{label}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0.5 h-px scale-x-0 rounded-full bg-brand-green transition-transform group-data-[highlight]/top:scale-x-100 motion-reduce:transition-none"
      />
    </span>
  );
}

interface PanelBodyProps {
  categories: NavCategory[];
  active: number;
  onActivate: (index: number) => void;
  pathname: string;
}

function PanelBody({ categories, active, onActivate, pathname }: PanelBodyProps) {
  const single = categories.length === 1;
  const rowTop = single ? 42 : 56;
  const bottom = single ? 48 : 38;
  // The rows are absolutely placed, so reserve their column's height.
  const minHeight = rowTop + categories.length * ROW_STRIDE - (ROW_STRIDE - ROW_HEIGHT) + bottom;

  return (
    // Each category row is followed in the DOM by its link grid (only the
    // active one renders), so Tab moves from a category straight into its
    // links. Rows sit in the left column by absolute position.
    <div className="relative w-[800px]" style={{ minHeight }}>
      {categories.map((category, index) => {
        const isActive = index === active;
        const rowClass = cn(
          "absolute left-0 flex w-[234px] items-center gap-[15px] px-6 typography-p3 !font-bold !leading-7 text-nav-category outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-green motion-reduce:transition-none",
          single && "justify-center",
          isActive && "bg-brand-green-light"
        );
        const rowStyle = { top: rowTop + index * ROW_STRIDE, height: ROW_HEIGHT };
        const rowContent = (
          <>
            <NavIconBadge icon={category.icon} />
            {category.label}
          </>
        );

        return (
          <Fragment key={category.label}>
            {category.href ? (
              <NavigationMenuLink
                closeOnClick
                active={pathname === category.href}
                render={<NextLink href={category.href} />}
                className={rowClass}
                style={rowStyle}
                onMouseEnter={() => onActivate(index)}
                onFocus={() => onActivate(index)}
              >
                {rowContent}
              </NavigationMenuLink>
            ) : (
              <div className={rowClass} style={rowStyle}>
                {rowContent}
              </div>
            )}
            {isActive ? (
              <ul
                className="ml-[269px] grid w-[493px] list-none grid-cols-[219px_219px] gap-x-[54px] gap-y-10"
                style={{ paddingTop: rowTop + 14, paddingBottom: bottom }}
              >
                {category.links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink
                      closeOnClick
                      active={pathname === link.href}
                      render={<NextLink href={link.href} />}
                      className="flex items-start gap-[15px] rounded-md text-nav-link outline-none transition-colors hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-green/50 motion-reduce:transition-none"
                    >
                      <NavIconBadge icon={link.icon} />
                      <span className="mt-0.5 typography-p3 !font-medium !leading-5">
                        {link.label}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Rewrite the header shell**

Replace the whole of `src/components/layout/NavbarClient.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import type { NavItem } from "@/types";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { buildNav } from "./navConfig";

interface NavbarClientProps {
  salesforceServices: NavItem[];
}

export function NavbarClient({ salesforceServices }: NavbarClientProps) {
  // Desktop panels centre under this row (Figma centres them on the page).
  const rowRef = useRef<HTMLDivElement>(null);
  const entries = buildNav(salesforceServices);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <Container>
        <div ref={rowRef} className="flex h-18 items-center justify-between gap-8 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="ProvidusCRM"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <DesktopNav entries={entries} anchor={rowRef} />

          <div className="hidden shrink-0 lg:block">
            <Link href="/contact">
              <CtaButton variant="filled" size="sm">
                Let&apos;s Connect
              </CtaButton>
            </Link>
          </div>

          <MobileNav entries={entries} />
        </div>
      </Container>
    </header>
  );
}
```

This removes `DesktopDropdown`, `getNavItems` and the old `industryPages`, `platformExpertisePages` and `partnerPages` lists.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `pnpm exec playwright test tests/navbar.spec.ts tests/nav-config.spec.ts && pnpm type-check && pnpm lint`
Expected: all pass. That is the 6 `Desktop mega menu` tests plus every existing navbar and mobile test. `tsc` exits 0. Lint shows only the existing `SectionPicker.tsx` warning.

If `Services panel switches category on hover` fails because the panel closes while the pointer travels from the trigger to the panel, raise the Root `closeDelay` to `150` in `DesktopNav` (`<NavigationMenu closeDelay={150} …>`) and re-run.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml src/components/ui/NavigationMenu.tsx src/components/layout/DesktopNav.tsx src/components/layout/NavbarClient.tsx tests/navbar.spec.ts
git commit -m "feat(nav): desktop mega menu on Base UI navigation menu

Services, Partnership and Company open one morphing 800px panel with a
caret on the open trigger and a blurred backdrop (Figma 851:2892).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Visual check against Figma and full suite

**Files:**
- Modify only if a check fails: `src/components/layout/DesktopNav.tsx`, `src/components/ui/NavigationMenu.tsx`

- [ ] **Step 1: Get the Figma targets**

Call the Figma MCP `get_screenshot` for file `j8xHI1PKviupVUOnQwdVUr`, nodes `851:2892`, `851:3138`, `851:3370`, `851:3803` and `851:3616`. Download each PNG into the scratchpad.

- [ ] **Step 2: Measure the live menu at 1440×900**

Write this script to the scratchpad as `nav-measure.mjs`. Copy it into the repo root as `.nav-measure.mjs`, run it with `node .nav-measure.mjs <scratchpad>`, then delete the copy (`@playwright/test` resolves from the repo):

```js
import { chromium } from "@playwright/test";
const out = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:3002/", { waitUntil: "load" });
await p.addStyleTag({ content: "nextjs-portal{display:none!important}" });
const measure = async (name) => {
  await p.waitForTimeout(600);
  const m = await p.evaluate(() => {
    const popup = document.querySelector('[data-slot="nav-panel"]').getBoundingClientRect();
    const trigger = document.querySelector("[data-popup-open]").getBoundingClientRect();
    const caret = document.querySelector('[data-slot="nav-panel"] > span').getBoundingClientRect();
    return {
      panel: [Math.round(popup.left), Math.round(popup.top), Math.round(popup.width), Math.round(popup.height)],
      gapBelowTrigger: Math.round(popup.top - trigger.bottom),
      caretVsTrigger: Math.round(caret.left + caret.width / 2 - (trigger.left + trigger.width / 2)),
    };
  });
  console.log(name, JSON.stringify(m));
  await p.screenshot({ path: `${out}/nav-live-${name}.png`, clip: { x: 0, y: 0, width: 1440, height: 520 } });
};
await p.getByRole("button", { name: "Services", exact: true }).hover(); await measure("services");
await p.locator('[data-slot="nav-panel"]').getByRole("link", { name: "Industries We Serve", exact: true }).hover(); await measure("industries");
await p.locator('[data-slot="nav-panel"]').getByRole("link", { name: "Platform Expertise", exact: true }).hover(); await measure("platform");
await p.getByRole("button", { name: "Partnership", exact: true }).hover(); await measure("partnership");
await p.getByRole("button", { name: "Company", exact: true }).hover(); await measure("company");
await b.close();
```

Expected for every panel:
- `panel` width is 800 and its left edge is 320 ±20. The header row is centred, so the panel sits at the page centre.
- `gapBelowTrigger` is 32 ±2.
- `caretVsTrigger` is 0 ±2.
- Height is Services 355, Industries 313, Platform 313, Partnership 190 and Company 143, each ±6.

For any value out of range, adjust the constant that drives it:

| Value out of range | Constant to adjust |
| --- | --- |
| Gap below the trigger | `PANEL_SIDE_OFFSET` |
| Panel height | `rowTop`, `bottom` or `ROW_STRIDE` in `PanelBody` |
| Caret position | the caret offset maths in `handleValueChange` |

Re-run the script after each change.

- [ ] **Step 3: Compare screenshots side by side**

Read each `nav-live-*.png` next to its Figma PNG and check:
- the left column tint (`#e9ffe4`) and the active row (`#a0ff88`);
- the green circle icons and two-line link wrapping;
- the green, semibold, underlined top item;
- the blurred page behind the panel.

Also check at 1024×768 that the panel fits and no nav items wrap. Fix only in-scope mismatches. Note anything pre-existing without changing it.

- [ ] **Step 4: Check reduced motion**

Run the Services measurement with `await p.emulateMedia({ reducedMotion: "reduce" })` before the hover. Expected: the panel is fully visible within 50ms of opening, with no slide.

- [ ] **Step 5: Run the full suite, type-check and lint**

Run: `pnpm exec playwright test && pnpm type-check && pnpm lint`
Expected: everything passes except the known skips. Re-run any timeouts with `pnpm exec playwright test --last-failed --workers=1`.

- [ ] **Step 6: Commit any fixes**

If Steps 2–4 changed code:

```bash
git add src/components/layout/DesktopNav.tsx src/components/ui/NavigationMenu.tsx
git commit -m "fix(nav): match mega menu spacing to Figma

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
