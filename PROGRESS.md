# ProvidusCRM — Quality Audit Progress

## Done ✅

### Phase 1: SEO (Complete)
- [x] Created `src/app/sitemap.ts` — static routes + dynamic CMS content (posts, case studies, services)
- [x] Created `src/app/robots.ts` — robots.txt with rules and sitemap reference

### Phase 2: Heading Hierarchy (Complete)
- [x] Blog post title: h2 → h1 in `blog/[slug]/page.tsx`
- [x] CtaSection: h1 → h2 (section inside home page, not the page heading)
- [x] ContactSection: h1 → h2 (embedded section component)
- [x] Improved 404 metadata for blog, case-studies, and service pages

### Phase 3: Accessibility (Complete)
- [x] Skip-to-content link in `(site)/layout.tsx` (sr-only, visible on focus)
- [x] `<main>` has `id="main-content"` and `aria-label="Main content"`
- [x] HeroSection animated characters: added `aria-hidden` + sr-only screen reader text

### Phase 4: Design System — Color Centralization (Complete)
- [x] Added 26 new color tokens to `@theme` in `globals.css`
- [x] Removed duplicate h1-h4 from `@layer base` (kept @utility as authoritative)
- [x] Added `--color-migration-blue`

**Hardcoded colors replaced:**
- [x] CtaSection: `#38A81B` → `bg-brand-green` + `var(--color-brand-green)`
- [x] ContactSection: `#A0FF88` → `bg-brand-green-light/20` + `var(--color-brand-green-light)`
- [x] MigrationPlatformsSection: `#A0FF88` → `text-brand-green-light`
- [x] WhyChooseSection: 4 colors → soft-indigo, soft-purple, salesforce-blue, tab-highlight
- [x] ExpertiseStackSection: 7 colors → explore-* variables
- [x] SalesforceConsultCtaSection: `#2898FF` → `var(--color-consult-blue)`
- [x] WhatWeDoSection: 2 colors → tab-highlight, brand-green-light
- [x] ExploreSection: 2 colors → explore-green-dark, explore-green-accent

### Phase 5.1: Typography Fix (Complete)
- [x] Fixed `tokens.ts` — p1-p4 lineHeight/fontSize drift to match CSS utility values

---

## In Progress 🚧

### User's own changes (verified, aligned with plan):
- [x] `page.tsx` — Added dynamic imports for PartnersSection, TeamSection, BentoSection
- [x] `layout.tsx` — Added preconnect link for cdn.sanity.io
- [x] `ExpertiseStackSection.tsx` — User's changes match plan (colors already replaced)
- [x] `ExploreSection.tsx` — User's changes match plan (colors already replaced)

---

## Build Status
- [x] Build passes cleanly — all phases complete

### Phase 4 (remaining): Design System
- [x] ~ExploreSection: Inline font styles already use Heading/Text components (verified — no changes needed)~
- [x] ~ExpertiseStackSection: Inline font-size on `<h3>` — already uses Heading component~

## Completed ✅ (added since last update)

### Phase 5: Performance
- [x] `page.tsx`: Already has `export const dynamic = "force-static"` (user change)
- [x] IndustryDetailSection: Replaced `useScroll/useTransform` with `whileInView` on images
- [x] ContactSection: Replaced inline SVGs with lucide-react icons (MapPin, Mail, Phone)
- [x] Footer: Replaced inline SVGs with lucide-react icons + removed Reveal wrappers

### Phase 6: Accessibility
- [x] MigrationPlatformsSection: Added prefers-reduced-motion check + pause/play toggle + hover pause
- [x] TeamThoughtsSection: Added tabIndex={0}, onFocus, onClick to small cards
- [x] BlogSection: Added `aria-label="Search blog posts"` + replaced emoji with ArrowRight icon
- [x] TeamSection: Changed alt text to use member names (with fallback)
- [x] Footer: Added aria-label, rel="noopener noreferrer", target="_blank" to social links + alt="" on icon images
- [x] ContactSection: Added role="status" aria-live="polite" to success message
- [x] NavbarClient: Added role="dialog", Escape key handler, dropdown keyboard nav, aria-current="page", aria-label on menu toggle
- [x] globals.css: Added marquee animation to prefers-reduced-motion + removed will-change from hero letters
- [x] Reveal.tsx: Added prefers-reduced-motion check — skips animation when user prefers reduced motion
- [x] PortableContent, BlogAuthorCard, BlogArticleSidebars: All `rel="noreferrer"` → `rel="noopener noreferrer"`

### Phase 7: Best Practices
- [x] Created `src/app/(site)/error.tsx` and `src/app/global-error.tsx`
- [x] Added security headers to next.config.ts (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy)
- [x] Fixed `as any` cast in case-studies/[slug]/page.tsx → proper SanityImageType assertion

### Phase 8: Medium Polish
- [x] PartnersSection: Changed alt text from "Partner logo" to "Partner N logo"
- [x] lib/seo.ts: Added alt property to OG images array
- [x] Carousel.tsx: Already has `disabled:opacity-50` (no change needed)

## Sanity page builder switch (feat/sanity-page-builder)
- [x] The 23 static pages (home, about, contact, industries, partnership, platform-expertise, privacy-policy, recruitment, services index) are Sanity `page` documents served by `(site)/[[...slug]]`; their route files, the seed script and the legacy page-key options are removed. `/` is prerendered via `generateStaticParams` (`slug: []`) and revalidated by tag, replacing the old `force-static` home export. See `SANITY.md`.
