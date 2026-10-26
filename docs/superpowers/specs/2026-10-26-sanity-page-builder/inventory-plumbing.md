# CRM-Web plumbing inventory for a generic Sanity `page` + catch-all route

Repo: /Users/mujtabakamal/Projects/CRM-Web (Next 15.5.18, React 19, next-sanity ^10.1.4, sanity ^4.18, @sanity/client ^7.22). Working tree clean at survey time.

---

## 1. Routing

### Tree: src/app
```
src/app/layout.tsx            root layout; metadata.title.template = "%s | ProvidusCRM"
src/app/global-error.tsx
src/app/sitemap.ts, robots.ts, icon.png, apple-icon.png
src/app/api/contact/route.ts
src/app/api/service-inquiry/route.ts
src/app/api/revalidate/route.ts
src/app/studio/layout.tsx
src/app/studio/[[...tool]]/page.tsx        (Studio, outside (site) group)
src/app/(site)/layout.tsx      Navbar + <main id="main-content" class="overflow-x-clip"> + Footer + skip link
src/app/(site)/error.tsx, loading.tsx, not-found.tsx
src/app/(site)/page.tsx        HOME, `export const dynamic = "force-static"`, key "home"
```
NOTE: there is NO `src/app/not-found.tsx` at the root. Today an unmatched URL gets Next's default root 404 (no Navbar/Footer); `(site)/not-found.tsx` only renders when a page inside (site) calls `notFound()`.

### Static routes under (site) (candidates for replacement; line counts)
| Route | File lines | pageKey(s) used |
|---|---|---|
| `/` | 136 | home (seo, jsonLd, blogs, caseStudies) |
| `/about` | 92 | about (seo, jsonLd, blogs, caseStudies) |
| `/contact` | 28 | contact (seo, blogs) — no jsonLd call |
| `/privacy-policy` | 241 | NONE — static `export const metadata = buildPageMetadata({...})` |
| `/services` (index) | 94 | services (seo, jsonLd, blogs, caseStudies) |
| `/industries` | 104 | industries (seo, jsonLd, caseStudies, blogs) |
| `/industries/salesforce-health-cloud-consulting` | 445 | salesforce-health-cloud-consulting (seo, blogs, jsonLd) |
| `/industries/salesforce-nonprofit-consulting` | 492 | ...nonprofit (seo, caseStudies, blogs, jsonLd) |
| `/industries/salesforce-financial-services-cloud-consulting` | 401 | ...fsc (seo, caseStudies, jsonLd) |
| `/industries/salesforce-education-cloud-consulting` | 438 | ...education (seo, blogs, jsonLd) |
| `/industries/salesforce-commerce-cloud-consulting` | 389 | ...commerce (seo, blogs, caseStudies, jsonLd) |
| `/platform-expertise` | 106 | platform-expertise (seo, jsonLd, blogs, caseStudies) |
| `/platform-expertise/salesforce-{sales,service,marketing,experience,data}-cloud-consulting`, `.../salesforce-agentforce-consulting` | 353–464 each | key = last segment (seo, blogs, jsonLd, some caseStudies) |
| `/partnership` | 138 | partnership |
| `/partnership/{findock,fundraise-up,dotdigital}` | 240–294 | partnership-findock / -fundraise-up / -dotdigital |
| `/salesforce-recruitment-agency` | 729 (+ colocated `"use client"` FeaturedRolesCarousel.tsx) | **staff-augmentation** (key != slug) |
| `/section-thumbs-preview` | 141 | tooling route, noindex, used by scripts/capture-section-thumbnails.ts — keep |
| `/blog`, `/blog/[slug]`, `/case-studies`, `/case-studies/[slug]` | CMS-driven, keep | blog / case-studies keys for index SEO |
| `/services/[slug]` | 5 | pure re-export of `../../salesforce/[slug]/page` (default, generateMetadata, generateStaticParams) |
| `/salesforce/[slug]` | 505 | servicePage implementation (see §7) |

Key mapping is NOT path-derived: keys are the last path segment for detail pages, prefixed for partnership children (`partnership-findock`), and `staff-augmentation` for `/salesforce-recruitment-agency`. Only `/` has a `dynamic` export; no `revalidate`/`dynamicParams` exports anywhere in (site). blog/[slug] and case-studies/[slug] use generateStaticParams with `metadata: true` + `notFound()`.

### next.config.ts
- headers: security headers on `/(.*)`; immutable cache for `/_next/static/*` and `/images/*`.
- redirects (all permanent, evaluated BEFORE filesystem routing):
  1. `/salesforce-:slug((?!recruitment-agency$).+)` -> `/services/salesforce-:slug`  **(any top-level CMS slug beginning `salesforce-` will be hijacked; only `salesforce-recruitment-agency` is exempt)**
  2. `/staff-augmentation` -> `/salesforce-recruitment-agency`
  3. `/salesforce/:slug` -> `/services/:slug` (so `salesforce/[slug]` route is effectively only reachable via the `services` re-export)
  4. `/platform-expertise/salesforce-education-cloud-consulting` -> `/industries/...`
  5. `/platform-expertise/salesforce-commerce-cloud-consulting` -> `/industries/...`
- no rewrites. `experimental.inlineCss: true`. images.remotePatterns: cdn.sanity.io; qualities [75,78,82].
- No middleware (no middleware.ts at root or src/).

### Would `src/app/(site)/[[...slug]]/page.tsx` conflict?
- **YES with `(site)/page.tsx`**: an optional catch-all also matches `/`. Next errors at build/dev: "You cannot define a route with the same specificity as a optional catch-all route ("/" and "/[[...slug]]")". Route groups don't change URL specificity. Options: delete `(site)/page.tsx` in the same change, OR use required catch-all `[...slug]` and keep `(site)/page.tsx` as a thin wrapper rendering the `home` document.
- `studio/[[...tool]]`: no conflict — `studio` is a static first segment, beats a root catch-all. (Different optional catch-alls at different depths are fine.)
- `api/*` route handlers, `sitemap.xml`, `robots.txt`, `icon.png`, `apple-icon.png`: static/metadata routes win. Side effect: unknown `/api/foo` GETs would now hit the catch-all page and return the (site) 404 HTML.
- `blog`, `case-studies`, `services`, `salesforce`, `section-thumbs-preview`: static segment folders beat catch-all; `/blog/x` matches `blog/[slug]` (static+dynamic beats catch-all). No conflict.
- Precedence facts that matter: static segment > dynamic `[x]` > catch-all `[...x]` > optional catch-all `[[...x]]`, resolved per-URL across the whole tree. So the migration can be incremental: an existing static folder (e.g. `industries/salesforce-health-cloud-consulting/page.tsx`) keeps winning until deleted; once deleted, `/industries/salesforce-health-cloud-consulting` falls through to the root catch-all even if `industries/page.tsx` still exists (no dynamic child there).
- Redirects run before routing → CMS slugs must avoid: top-level `salesforce-*` (except `salesforce-recruitment-agency`), `staff-augmentation`, `salesforce/*`, `platform-expertise/salesforce-{education,commerce}-cloud-consulting`. Also must not collide with kept static routes (`blog`, `case-studies`, `services`, `studio`, `api`, `section-thumbs-preview`) — a CMS doc with those slugs would be silently shadowed.
- Bonus: catch-all + `notFound()` means unmatched URLs render `(site)/not-found.tsx` inside the site layout (improvement over today).
- params in Next 15 are a Promise: `params: Promise<{ slug?: string[] }>`; join with "/" ; undefined => "home".
- Home currently `force-static`; a catch-all with `generateStaticParams` (+ default dynamicParams=true) gives SSG for known slugs and on-demand for new ones. ISR via fetch `revalidate` (default 300) + tags.

---

## 2. Sanity plumbing

### src/sanity/env.ts
Exports `apiVersion` (env NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01"), `dataset` (|| "production"), `projectId` (|| "00000000"), `studioUrl = "/studio"`, `isSanityConfigured` (both PROJECT_ID and DATASET env set), `readToken` (SANITY_API_READ_TOKEN), `revalidateSecret` (SANITY_REVALIDATE_SECRET).

### src/sanity/lib/client.ts
`client` (createClient from next-sanity, useCdn true, stega {studioUrl}); `previewClient` (= client + token, useCdn false); `metadataClient` (stega false, CDN); `privateMetadataClient` (token, stega false, no CDN).

### src/sanity/lib/fetch.ts (`import "server-only"`)
```ts
interface SanityFetchOptions { query: string; params?: QueryParams; tags?: string[]; revalidate?: number; metadata?: boolean; }
export async function sanityFetch<T>({ query, params = {}, tags = [], revalidate = 300, metadata = false }): Promise<T | null>
```
Returns `null` when `!isSanityConfigured`. Client choice: readToken ? (metadata ? privateMetadataClient : previewClient) : (metadata ? metadataClient : client). Passes `{ next: { revalidate, tags } }`. Rule (CLAUDE.md): always `metadata: true` in generateMetadata/generateStaticParams (stega would corrupt titles). NOTE: with the read token set, the token clients do not set `perspective`, so locally drafts may be visible (section-order.spec.ts comment: "local runs see draft documents through the read token").

### src/sanity/lib/image.ts
`urlForImage(source: Image)` -> `builder.image(source).auto("format").fit("max")`. Only used in case-studies/[slug]. Most code uses projected `asset->url` directly (`imageUrl(img) => img?.asset?.url`, duplicated locally in salesforce/[slug] and lib/pageCaseStudies.ts).

### src/components/sanity/SanityImage.tsx
`<SanityImage image altFallback className priority quality sizes unoptimized />` — next/image `fill`, returns null without `asset.url`, uses `metadata.lqip` as blur placeholder. src/lib/sanityImage.ts: `getSanityImageAspectRatio(image)` with fallback "1404 / 480".

### src/sanity/lib/queries.ts patterns
All via `defineQuery` from next-sanity, template-string fragments:
- `imageProjection` = `asset->{ _id, url, metadata { lqip, dimensions { width, height } } }, alt` — used as `field { ${imageProjection} }`.
- `portableBodyProjection` (blockContent: image + ctaBanner expansion).
- `seoProjection` (metaTitle, metaDescription, keywords, canonicalUrl, noIndex, noFollow, ogTitle, ogDescription, ogImage{img}, twitterTitle, twitterDescription, twitterImage{img}).
- `jsonLdProjection` = `enabled, schemaJson`.
- Keyed singletons: `*[_type == "X" && pageKey == $pageKey][0]{...}` (STATIC_PAGE_SEO_QUERY, SITE_PAGE_JSON_LD_QUERY, PAGE_CASE_STUDIES_QUERY, PAGE_BLOGS_QUERY).
- Slug docs: `*[_type == "servicePage" && status == "published" && slug.current == $slug][0]{...}`; slugs list query projects `"slug": slug.current`.
- References: `caseStudies[]->{...}`, `blogs[]->{ ..., "categories": categories[]->title, heroImage{img} }`, internal links `internalLink->{ _type, "slug": slug.current }`.
- Fragments are module-private consts (not exported) — a new PAGE_QUERY should live in this file to reuse them.

### src/sanity/lib/types.ts conventions
Hand-written interfaces (no typegen). `SanitySlug {current}`, `SanityImageAsset`, `SanityImage {alt?, asset?}`, `SeoFields`, `JsonLdField {enabled?, schemaJson?}`, `StaticPageSeo`, `SitePageJsonLd`, `PageCaseStudies`, `PageBlogs`, `PageBlogPost`, `CaseStudyListItem`, `ServicePage` + per-section `Service*Content` interfaces, `ServicePageSectionKey` union. Optional fields everywhere; title fields required.

### Studio config
- sanity.config.ts: name "providus-crm", basePath "/studio", `schema.types = schemaTypes`, plugins `structureTool()` (DEFAULT structure — no custom structure/desk file exists), `visionTool({defaultApiVersion})`, `table()` (@sanity/table, patched via pnpm patches).
- sanity.cli.ts: api {projectId, dataset} from env.ts.
- src/sanity/schemaTypes/index.ts order: post, caseStudy, servicePage, staticPageSeo, sitePageJsonLd, pageCaseStudies, pageBlogs, author, category, blockContent, seo, jsonLd. A new `page` type must be added here (default structure will list it automatically).
- Reusable schema bits: `slugField(source)` (schemaTypes/slugField.ts: required + rejects whitespace only — slashes ARE allowed by validation, but Sanity's default slugify on "Generate" strips/replaces "/"; hand-typed nested slugs needed or custom `options.slugify`); `seo` and `jsonLd` object types; `SectionPicker` custom input (src/sanity/components/SectionPicker.tsx, popover with thumbnails from `options.list[].thumbnail`, `/studio-thumbnails/*.webp`); servicePage's `hiddenUnlessSection` + `ProminentSectionField` helpers are module-private in servicePage.ts.
- Thumbnails for picker generated by scripts/capture-section-thumbnails.ts against `/section-thumbs-preview` and service pages.

---

## 3. SEO

### src/lib/seo.ts
`buildPageMetadata({ seo?, title, description?, image?, canonicalPath?, openGraphType = "website" }): Metadata`. Sanity seo overrides fallbacks; `canonicalUrl` = seo.canonicalUrl || absolute(canonicalPath); image = seo.ogImage || seo.twitterImage || fallback; titles containing brand (`hasBrand`, /providus\s*crm/i) become `{absolute}` to avoid template double-brand; robots only when noIndex/noFollow; site URL from NEXT_PUBLIC_SITE_URL || https://providuscrm.co.uk. Home canonicalPath is "/".

### src/lib/pageKeys.ts (no server-only; bundled into Studio)
`STATIC_PAGE_OPTIONS` (as const) — 24 entries: home, about, services, platform-expertise, industries, blog, case-studies, contact, partnership, partnership-findock, partnership-fundraise-up, partnership-dotdigital, salesforce-{sales,service,marketing,experience,data}-cloud-consulting, salesforce-agentforce-consulting, staff-augmentation, salesforce-{health-cloud,nonprofit,financial-services-cloud,education-cloud,commerce-cloud}-consulting. `StaticPageKey` = union of values. `PageBlogKey = Exclude<StaticPageKey, "blog"|"case-studies">`; `PAGE_BLOG_OPTIONS` filtered list.

### src/lib/staticPageSeo.ts (server-only)
`getStaticPageSeo(pageKey)` -> sanityFetch STATIC_PAGE_SEO_QUERY, tags ["static-page-seo"], metadata true. `generateStaticPageMetadata(pageKey, {title, description?, image?, canonicalPath})` -> buildPageMetadata with fallback copy hardcoded in each page file.

### schemaTypes/staticPageSeo.ts
doc "Static page SEO": title (internal), pageKey (dropdown from STATIC_PAGE_OPTIONS, required), seo, jsonLd ("replaces the legacy Static page JSON-LD document when set").

### sitePageJsonLd + src/lib/siteJsonLd.ts
schema "Static page JSON-LD" (legacy): title, pageKey (same options), jsonLd. `getSitePageJsonLd(pageKey, fallback)` fetches staticPageSeo + sitePageJsonLd (tag "json-ld", NOT metadata) and returns `resolveJsonLd(pageSeo?.jsonLd || pageJsonLd?.jsonLd, fallback)`. Fallback JSON-LD objects are hardcoded per page file. `resolveJsonLd` (lib/jsonLd.ts): enabled===false -> null; parse schemaJson, on error fallback. Rendered via `<JsonLdScript data={...}>`.

### pageBlogs / pageCaseStudies
- schemaTypes/pageBlogs.ts: options = PAGE_BLOG_OPTIONS (from pageKeys); posts refs min1 max4. lib/pageBlogs.ts `getPageBlogs(pageKey: PageBlogKey)` -> {title?, posts: BlogTeaserCard[]}; tags ["page-blogs","posts"].
- schemaTypes/pageCaseStudies.ts: **own hardcoded pageOptions list** (16: home, about, services, platform-expertise, partnership, 6 platform pages, industries, health, nonprofit, fsc, commerce). lib/pageCaseStudies.ts `PageCaseStudyKey` is a **separate hand-written union** (17: same + staff-augmentation; no education). DRIFT: `staff-augmentation` is in the TS union (used by /salesforce-recruitment-agency) but not selectable in the Studio dropdown; education is in neither. tags ["page-case-studies","case-studies"].
- How they key to routes: purely by convention — each page file hardcodes its key string; nothing maps key<->path centrally (canonicalPath is also hardcoded per page). A generic `page` doc can carry seo/jsonLd/blogs/caseStudies inline (like servicePage) and retire these keyed docs for migrated pages; existing keyed docs' content would need to be migrated per key->slug mapping above (note staff-augmentation -> salesforce-recruitment-agency, partnership-findock -> partnership/findock, etc.).
- scripts/check-page-blogs.ts asserts `PAGE_BLOG_OPTIONS.length === STATIC_PAGE_OPTIONS.length - 2` and imports pageKeys — breaks if pageKeys is removed/reshaped.

---

## 4. Revalidation — src/app/api/revalidate/route.ts
POST, `?secret=` must equal SANITY_REVALIDATE_SECRET (401 otherwise). Body `{ _type, slug: { current } }` (webhook projection documented in SANITY.md).
| _type | revalidateTag | revalidatePath |
|---|---|---|
| post | posts | /blog, /blog/{slug} |
| caseStudy | case-studies | /case-studies, /case-studies/{slug} |
| category | categories | /blog |
| servicePage | service-pages | /services, /services/{slug} |
| pageCaseStudies | page-case-studies | — |
| pageBlogs | page-blogs | — |
| staticPageSeo | static-page-seo | — |
| sitePageJsonLd | json-ld | — |
Returns `{revalidated: true, now}`. A new `page` type needs a branch (e.g. tag "pages" + `revalidatePath(slug === "home" ? "/" : "/" + slug)`) and SANITY.md says a webhook filter in Sanity (if configured) must include new types. Nav uses SERVICE_NAV_QUERY (tag service-pages) — not affected.

---

## 5. Sitemap / robots
- src/app/sitemap.ts: 25 hardcoded static URLs (base https://providuscrm.co.uk, hardcoded, not NEXT_PUBLIC_SITE_URL) incl. all candidate static routes, then one GROQ for post / caseStudy / published servicePage (tags posts, case-studies, service-pages; revalidate 3600). `/salesforce-recruitment-agency`, `/privacy-policy` included; `/section-thumbs-preview` excluded. A `page` type would add `_type == "page"` to the query (respect noIndex/status) and remove migrated static entries; slug "home" -> base URL.
- src/app/robots.ts: allow "/", disallow "/studio/", sitemap URL hardcoded.

---

## 6. Tests, scripts, package.json, Playwright

### tests/*.spec.ts
| File | Routes / deps |
|---|---|
| page.spec.ts | `/` only: 200, title /ProvidusCRM/, no console errors, header above first `section`, no broken/empty img src, "Book a call" button with svg |
| hero.spec.ts | `/` HeroSection: "Salesforce Partner" img, "Certified"/"in the UK" text, h1 accessible name, h1 font-size >= 50, "Future-proof customer operations", "Book a call" |
| events-section.spec.ts | `/` EventsSection region "Events", 4 slides, specific event names |
| footer.spec.ts | `/` footer text "Rated 4.9 out of 5" |
| page-blogs.spec.ts | `/` closing CtaSection default heading /explore how we align your crm systems/i |
| navbar.spec.ts | `/` mostly; "Mobile page width" loops `/`, `/about`, `/industries/salesforce-education-cloud-consulting`, `/partnership/findock` |
| title.spec.ts | PATHS: `/`, `/about`, `/services`, `/platform-expertise`, 5 platform detail pages, `/industries`, `/industries/salesforce-health-cloud-consulting`, `/industries/salesforce-nonprofit-consulting`, `/blog`, `/case-studies`, `/contact` — brand exactly once in title + exactly one h1; PLATFORM_PAGES assert exact h1 kicker text (e.g. "Salesforce Sales Cloud Consulting & Implementation"); `/services/salesforce-consulting-services` one h1 |
| section-order.spec.ts | `/services/salesforce-consulting-services` `[data-section-key]` wrappers valid+unique (VALID_KEYS list duplicated from ServicePageSectionKey) |
| nav-config.spec.ts | unit test of navConfig `buildNav` (hardcoded hrefs to static routes, 5 industries / 6 platform links) + icon files exist |
| blog-blocks.spec.ts | `/blog` + post pages, skips when no matching content |
| table-links.spec.ts | unit test of PortableContent renderTableCell |
No test imports pageKeys / StaticPageKey / PageBlogKey / PageCaseStudyKey (only scripts/check-page-blogs.ts does).
The home-page specs assert exact hardcoded section copy (hero text, 4 events, footer, CTA default heading); a CMS-rendered home must reproduce those or tests change.

### Playwright config
testDir ./tests, baseURL http://localhost:3002, chromium only, webServer `pnpm run dev` on :3002, `reuseExistingServer: !CI`, 120s timeout. Runs against `next dev` with the real `.env` → Sanity IS configured locally (all .env vars set: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, NEXT_PUBLIC_SITE_URL, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET, RESEND_*, CONTACT_FORM_TO_EMAIL, SERVICE_FORM_TO_EMAIL, NEXT_PUBLIC_HUBSPOT_*, HUBSPOT_*_FORM_GUID). Tests are written to tolerate live CMS content (section-order asserts mechanism not count; blog-blocks skips). No test explicitly assumes an unconfigured project, but the home/title/h1 tests implicitly assume the hardcoded page content — if routes become CMS-only and the dataset lacks a `page` doc, they 404. CI (`process.env.CI`) would only have Sanity if CI env provides vars; with none, `sanityFetch` returns null -> catch-all would 404 everything unless a code fallback (like salesforceServicePage.ts) exists.

### scripts/
- capture-section-thumbnails.ts (Playwright, BASE_URL env), check-blog-blocks.ts, check-new-sections.ts, check-page-blogs.ts (imports pageKeys), check-perf-markers.ts, perf-guard.ts, core-web-vitals-probe.ts, update-image-extensions.js.
- check-slugs.ts: public unauthenticated `fetch` to `https://{projectId}.api.sanity.io/v{apiVersion}/data/query/{dataset}` for `*[defined(slug.current)]`, fails on whitespace. Env: NEXT_PUBLIC_SANITY_PROJECT_ID (required), NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION. Does not load .env itself (tsx doesn't either) — run with env exported.
- import-migration-page.ts (`pnpm import:migration`, 1197 lines): best precedent for a seed/migration script. Loads `.env` then `.env.local` via its own `loadEnvFile`; CLI flags `--dry-run`, `--publish`, `--pdf`, `--slug`; `createSanityClient()` token = SANITY_API_WRITE_TOKEN || SANITY_WRITE_TOKEN || SANITY_API_TOKEN || SANITY_API_READ_TOKEN (throws if none); projectId env || hardcoded fallback id; dataset env || "production"; useCdn false; dry-run uses tokenless read client and prints JSON; uploads local images from public/ as assets; finds existing doc by slug/title and `createOrReplace` keeping `_id`.
- import-development-page.ts (no package.json script): same token chain, hardcoded projectId/dataset/apiVersion, `createOrReplace`.
- AUTH GAP: `.env` contains only SANITY_API_READ_TOKEN — no write token var. The fallback chain would try the read token and writes would fail (403) unless the read token actually has write rights. A seed script needs SANITY_API_WRITE_TOKEN added to .env.local.

### package.json scripts
dev (`next dev -p 3002`), build, start, lint, type-check, test / test:ui / test:headed / test:report, perf:build, perf:start (:3001), perf:guard, perf:vitals, check:page-blogs, check:new-sections, check:slugs, check:blog-blocks, check:perf-markers, import:migration, thumbs:sections, sanity:deploy, sanity:dataset. `tsx` is a devDependency. Package manager pnpm@11.15.1; xstate pinned 5.31.1 in both pnpm-workspace.yaml overrides and package.json overrides.

---

## 7. servicePage precedent (src/app/(site)/salesforce/[slug]/page.tsx)
- `DEFAULT_SERVICE_SECTION_ORDER: ServicePageSectionKey[]` (19 keys) + `SERVICE_SECTION_KEY_SET`.
- `generateStaticParams`: SERVICE_PAGE_SLUGS_QUERY (tags service-pages, revalidate 60, metadata true) ∪ fallback slug.
- `generateMetadata`: `getServicePage(slug, true)`; not found -> `{title: "Service Not Found | ProvidusCRM"}`; else `buildPageMetadata({seo, title, description: hero.description, image: hero.backgroundImage.asset.url, canonicalPath: /services/{slug}})`.
- Page: parallel fetch of page + CASE_STUDIES_QUERY; `page = fetched || (slug === fallback slug ? salesforceConsultingServicesFallback : null)`; `notFound()` if none.
- `sectionRenderers: Record<ServicePageSectionKey, ReactNode>` — a JSX element per key built from fixed doc fields (`certified`, `tabsSection`, `benefitsSection`, `processSection`, ...), each mapped through small `toXItems(page)` adapters into the section's own exported item type (WhatWeDoTab, ExpertiseItem, IndustrySectionItem, MigrationPlatformItem, WhyChooseReason). Empty-guards return null for sections without internal guards.
- `getOrderedServiceSectionKeys(sectionOrder)`: dedupes/validates; editor's non-empty list is authoritative; empty/missing -> full default order.
- Render: fixed `<SalesforceServiceHero>` then `orderedSectionKeys.map(k => <div key={k} data-section-key={k}>{sectionRenderers[k]}</div>)` inside `<div className="overflow-x-hidden bg-white">`, `<JsonLdScript data={resolveJsonLd(page.jsonLd)}>`.
- Helpers duplicated locally: `imageUrl`, `slugify`; internal link href mapping (servicePage -> /services/x, caseStudy -> /case-studies/x, post -> /blog/x, else /x).
- Downside of this pattern: all section data lives in fixed top-level fields (not an array of typed blocks), so a section can appear only once, and Studio hides unused groups via `hiddenUnlessSection`. For a generic `page`, a `sections[]` array of typed objects (`_type` = section key) avoids the fixed-field explosion; the renderer map pattern (`Record<_type, (block) => ReactNode>`) carries over.
- src/data/salesforceServicePage.ts: exports `SALESFORCE_CONSULTING_SERVICES_SLUG = "salesforce-consulting-services"` and `salesforceConsultingServicesFallback: ServicePage` (full typed document literal, 274 lines, no images) — used when CMS is unconfigured or the doc is missing; also drives the thumbnail capture script. Same approach could give home a code fallback so tests/CI pass without Sanity.

---

## 8. Docs notes relevant to CMS work
- CLAUDE.md: Sanity optional at build time — pages must render empty states/fallbacks rather than throw; `metadata: true` for generateMetadata; every fetch passes `tags` and the webhook must map new types; edit `salesforce/[slug]` not the re-export; StaticPageKey and PageCaseStudyKey are closed unions; sections define their own item types and pages map CMS data into them (don't pass raw Sanity docs into sections); design-system rules (Heading/Text, Section+Container, tokens, `cn()`); pnpm required — `@sanity/table` patch + xstate 5.31.1 pin (Studio dialogs close on keystroke with xstate 5.33); production build was observed not honouring the lockfile (2026-09-14).
- SANITY.md: webhook URL `/api/revalidate?secret=...`, projection `{"_type": "_type", "slug": "slug"}`; if the webhook has a type filter, new types must be added or edits wait out the 300s window. Page blogs: 1–4 posts, hidden when absent. CORS origins for localhost:3002 + prod.
- AGENTS.md: design tokens/typography tables; strict TS, no `any`.
- PROGRESS.md: audit log only (sitemap/robots created, heading fixes, home `force-static`); nothing CMS-architecture specific.

---

## Conflicts / risks summary
1. `[[...slug]]` at (site) conflicts with `(site)/page.tsx` — delete home page.tsx together, or use `[...slug]` + keep home wrapper.
2. Redirect #1 hijacks any top-level CMS slug `salesforce-*`; redirects #2–#5 reserve more paths. Add Studio slug validation for reserved prefixes/kept static segments (blog, case-studies, services, salesforce, studio, api, section-thumbs-preview, staff-augmentation).
3. Slug with slashes: slugField allows "/", but Sanity's default slugify on Generate won't produce nested paths; also `check:slugs` and `slug.current == $slug` work fine with slashes. Leading/trailing slashes should be rejected.
4. pageKey drift: pageCaseStudies schema list vs PageCaseStudyKey union differ (staff-augmentation, education). Keys ≠ slugs for staff-augmentation and partnership-* children — migration mapping needed.
5. CI/no-Sanity: catch-all would 404 every migrated route (sanityFetch -> null); title/hero/events/footer/navbar specs hit those routes. Need a code fallback or accept CMS-required.
6. Seeding: no write token in .env (only SANITY_API_READ_TOKEN); existing scripts fall back to the read token.
7. Revalidate route + sitemap must gain a `page` branch; sitemap static list must drop migrated URLs to avoid duplicates; sitemap base URL hardcoded.
8. Read token clients have no explicit perspective → drafts may render locally (existing behaviour).
9. `salesforce-recruitment-agency` has a colocated client component (FeaturedRolesCarousel) and is 729 lines — heaviest to port. `privacy-policy` uses no keyed SEO doc. `section-thumbs-preview` must stay static.
10. Home is `force-static`; catch-all should use generateStaticParams (+ fetch revalidate/tags) to keep SSG/ISR.
