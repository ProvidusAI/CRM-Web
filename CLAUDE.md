# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ProvidusCRM marketing site — a Salesforce consultancy site. Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS v4, Sanity CMS, Playwright.

Package manager is **pnpm** (`pnpm-lock.yaml`). `AGENTS.md`/`README.md` show `npm run` commands; both work, but prefer `pnpm`.

## Commands

```bash
pnpm dev              # dev server on :3002 (3000 is used by another project)
pnpm build            # production build
pnpm type-check       # tsc --noEmit
pnpm lint             # ESLint (next/core-web-vitals + next/typescript)

pnpm test             # Playwright — auto-starts `pnpm dev` via webServer config
pnpm test:ui          # Playwright UI mode
pnpm test:report      # open last HTML report
pnpm exec playwright test tests/navbar.spec.ts            # single file
pnpm exec playwright test -g "mobile menu"                # single test by title

pnpm perf:start       # production server on :3001 (run `pnpm build` first)
pnpm perf:guard       # asserts prod-build markers against :3001
pnpm perf:vitals      # Core Web Vitals probe
```

Playwright's `webServer` reuses an existing dev server locally, so `pnpm test` works whether or not `pnpm dev` is already running.

## Architecture

### Route groups

- `src/app/(site)/` — all public pages; owns the shared layout (Navbar, Footer, skip link, `<main id="main-content">`), `error.tsx`, `loading.tsx`, `not-found.tsx`.
- `src/app/studio/[[...tool]]/` — embedded Sanity Studio at `/studio`, outside the site layout.
- `src/app/api/` — `contact`, `service-inquiry` (Resend email), `revalidate` (Sanity webhook).
- `src/app/sitemap.ts` / `robots.ts` — sitemap merges static routes with published CMS content.

**Route aliasing:** `services/[slug]/page.tsx` is a pure re-export of `salesforce/[slug]/page.tsx` (`export { default, generateMetadata, generateStaticParams }`). `next.config.ts` redirects `/salesforce-:slug` → `/services/salesforce-:slug` and `/salesforce/:slug` → `/services/:slug`. Edit the `salesforce/[slug]` implementation, not the re-export.

### Sanity integration

Content is **optional at build time**. `isSanityConfigured` (`src/sanity/env.ts`) is false without env vars, and `sanityFetch` returns `null` — pages must render empty states or fall back to hardcoded data rather than throw. `src/data/salesforceServicePage.ts` is the fallback for the service page when the CMS has no document.

`sanityFetch` (`src/sanity/lib/fetch.ts`) is `server-only` and picks one of four clients based on `readToken` and a `metadata` flag: metadata reads disable stega (visual-editing overlay encoding), which would otherwise corrupt `<title>`/OG strings. Always pass `metadata: true` when fetching for `generateMetadata`.

Cache invalidation is tag-based. Every fetch passes `tags`; `/api/revalidate` maps Sanity document types to `revalidateTag` + `revalidatePath` calls. Adding a new CMS-driven surface means adding its tag in both the fetch call and the webhook handler.

### SEO layer

Three composed helpers, all CMS-overridable with code fallbacks:
- `lib/seo.ts` → `buildPageMetadata()` merges Sanity `seo` fields over fallbacks and absolutizes URLs.
- `lib/staticPageSeo.ts` → `generateStaticPageMetadata(pageKey, fallback)` for fixed routes; `StaticPageKey` is a closed union.
- `lib/jsonLd.ts` / `siteJsonLd.ts` + `<JsonLdScript>` for structured data.

`lib/pageCaseStudies.ts` works the same way — editors pick case studies per page via a `pageKey`-keyed document; `PageCaseStudyKey` is a closed union. Adding a page that shows curated case studies means extending that union.

### Components

- `components/ui/` — atomic (`Typography`, `Button`, `Card`, `Carousel`, `Reveal`, …)
- `components/sections/` — page blocks, the bulk of the codebase; barrel-exported from `sections/index.ts`
- `components/layout/` — `Container`, `Section`, `Navbar` (server) + `NavbarClient` (interactive)
- `components/sanity/` — Portable Text rendering, `SanityImage`, blog article chrome

Sections are data-driven: a section defines and exports its own item type (e.g. `WhyChooseReason`, `ExpertiseItem`, `ServiceCaseStudyCard`), and the page maps CMS or fallback data into it. Follow this rather than passing raw Sanity documents into sections.

## Design system

Strictly enforced — see `AGENTS.md` for the full token tables and the `providus-crm-development` skill for the working rules.

- **All** typography goes through `<Heading>` / `<Text>` from `@/components/ui/Typography`. Never raw `<h1>` with inline styles. `Heading` separates `as` (semantic tag) from `level` (visual size) — use that instead of picking a wrong tag for its look.
- Typography lives in `globals.css` as Tailwind v4 `@utility typography-*` rules, deliberately **not** in `@theme` (that would auto-generate conflicting utilities). The `!important` flags there are load-bearing; `Typography.tsx` layers responsive `!`-prefixed overrides on top.
- Colors come from `@theme` custom properties in `src/styles/globals.css` — no raw hex in components. When touching code with legacy hardcoded hex, migrate it to a token rather than propagating it.
- `lib/tokens.ts` mirrors the CSS type scale as TS constants; the two have drifted before, so keep them in sync when either changes.
- Wrap new sections in `<Section>` (background prop) + `<Container>`, and export from `components/sections/index.ts`.
- Compose classes with `cn()` from `@/lib/utils`.

## Conventions

- No `any` — strict mode is on and `as any` casts have been deliberately removed.
- `"use client"` only where hooks/browser APIs are needed; server components are the default.
- Animations (framer-motion, CSS marquees) must respect `prefers-reduced-motion` — existing components check it and there are reduced-motion overrides in `globals.css`.
- `PROGRESS.md` tracks a completed SEO/a11y/performance/design-token audit; check it before "fixing" something that was already addressed intentionally.
- `SANITY.md` covers CMS env setup, content models, and the revalidation webhook.

## Deployment (Hostinger)

Pushes to `main` auto-deploy. The build settings must stay on **pnpm** — the
package manager dropdown, and `pnpm run build` as the build command.

This matters more than it looks. Under `npm install` the deploy ignores
`pnpm-lock.yaml` and re-resolves the whole dependency graph from the registry
every time, which took builds to ~30 minutes (`next build` itself is ~20s) and
made them flaky: timeouts surfaced as a one-line `ERROR: package.json file not
found` and 503s, and the same commit would deploy fine on a retry.

`pnpm-workspace.yaml` also carries `overrides`, `patchedDependencies`, and
`allowBuilds` — there is no `pnpm` key in `package.json`. npm ignores that file
entirely, and so do pnpm majors older than 10, in both cases **without failing
the build**. When that happens the `@sanity/table` patch silently stops applying
in production. `packageManager` in `package.json` pins the version to guard it;
if an install ever looks wrong, check the pnpm version in the build log first.
