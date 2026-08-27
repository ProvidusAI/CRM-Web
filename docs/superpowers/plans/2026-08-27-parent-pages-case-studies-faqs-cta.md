# Parent Pages Case Studies, Homepage FAQs, CTA Fixes & Footer Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Five small site changes: add all parent pages to the "Page case studies" system (placed one section above blogs, never adjacent to them), add a homepage FAQ section above the footer CTA, fix the broken "Book a Call" hero buttons to link to Contact, strip non-LinkedIn social links from the footer, and update the About "Who We Are" copy.

**Architecture:** All changes are edits to existing server components and one shared section component. There is one data-union change (`PageCaseStudyKey`) mirrored by one Sanity schema dropdown list; the page-level changes are pure JSX ordering + two fetches. No new components, no new Sanity fields, no new routes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, Sanity CMS, pnpm.

## Global Constraints

- Package manager is **pnpm** (never npm for installs/builds).
- All typography via `Heading`/`Text` from `@/components/ui/Typography`; all new sections wrapped in `Section` + `Container` from `@/components/layout`. (`FaqSection` already does this internally.)
- No `any`; strict mode. `"use client"` only where hooks/browser APIs are needed.
- New sections must be exported from `src/components/sections/index.ts` (already done for `FaqSection` and `ServiceCaseStudiesSection`).
- The `pageCaseStudies` Sanity document is already registered, already has tag `page-case-studies` in `getPageCaseStudies`, and `/api/revalidate` already maps it — **no webhook or tag changes required**.
- The parent-page keys `home`, `about`, `services`, `platform-expertise`, `industries`, `partnership` already exist in `src/lib/pageKeys.ts` (`STATIC_PAGE_OPTIONS`), so `getPageBlogs(...)` already accepts them. Only `PageCaseStudyKey` is narrower and needs widening.
- Copy strings below must be used verbatim (British "organisations" spelling is intentional).

---

### Task 1: Widen the Page Case Studies key union + Sanity dropdown

**Files:**
- Modify: `src/lib/pageCaseStudies.ts:8-19`
- Modify: `src/sanity/schemaTypes/pageCaseStudies.ts:3-45`

**Interfaces:**
- Produces: `PageCaseStudyKey` now accepts `"home" | "about" | "services" | "platform-expertise" | "partnership"` (in addition to `"industries"` and the existing detail-page keys), so `getPageCaseStudies(pageKey)` type-checks for those keys in later tasks.

- [ ] **Step 1: Add the five parent-page keys to `PageCaseStudyKey`**

Replace the union in `src/lib/pageCaseStudies.ts` (lines 8–19) with:

```ts
export type PageCaseStudyKey =
  | "home"
  | "about"
  | "services"
  | "platform-expertise"
  | "industries"
  | "partnership"
  | "salesforce-sales-cloud-consulting"
  | "salesforce-service-cloud-consulting"
  | "salesforce-marketing-cloud-consulting"
  | "salesforce-experience-cloud-consulting"
  | "salesforce-data-cloud-consulting"
  | "salesforce-agentforce-consulting"
  | "salesforce-commerce-cloud-consulting"
  | "salesforce-health-cloud-consulting"
  | "salesforce-nonprofit-consulting"
  | "salesforce-financial-services-cloud-consulting";
```

- [ ] **Step 2: Mirror the same keys in the Sanity dropdown**

In `src/sanity/schemaTypes/pageCaseStudies.ts`, prepend these five entries to the `pageOptions` array (immediately after `const pageOptions = [`):

```ts
  { title: "Home", value: "home" },
  { title: "About", value: "about" },
  { title: "Services", value: "services" },
  { title: "Platform Expertise", value: "platform-expertise" },
  { title: "Partnership", value: "partnership" },
```

(`"Industries"` is already present — leave it.)

- [ ] **Step 3: Verify**

Run: `pnpm type-check`
Expected: PASS. The union and the dropdown are a string-list edit; no schema migration is needed (the `pageKey` field is a plain string with a dropdown option list).

---

### Task 2: Wire case studies into the six parent pages, one section above blogs

**Files:**
- Modify: `src/app/(site)/page.tsx`
- Modify: `src/app/(site)/about/page.tsx`
- Modify: `src/app/(site)/services/page.tsx`
- Modify: `src/app/(site)/platform-expertise/page.tsx`
- Modify: `src/app/(site)/partnership/page.tsx`
- Modify: `src/app/(site)/industries/page.tsx` (reorder only — already wired)

**Interfaces:**
- Consumes: `getPageCaseStudies(pageKey)` and `ServiceCaseStudiesSection` (props `{ title?, caseStudies }`).
- Produces: each parent page renders `<ServiceCaseStudiesSection>` such that exactly one other section sits between it and `<PageBlogsSection>`.

**Rule for placement (all six pages):** the case-studies section goes immediately **before** the section that currently sits directly above the blog section. Result: `Case Studies → [one existing section] → Blogs`.

- [ ] **Step 1: Home — `src/app/(site)/page.tsx`**

Add `ServiceCaseStudiesSection` to the `@/components/sections` import, and add:

```ts
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
```

Add after the `getPageBlogs` line inside `HomePage()`:

```ts
  const caseStudies = await getPageCaseStudies("home");
```

Change the return JSX so the section order is: `WhyChooseSection` → **case studies** → `TeamSection` → blogs → `CtaSection` (case studies inserted directly above `TeamSection`, keeping one section between it and the blogs):

```tsx
      <WhyChooseSection />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <TeamSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection />
```

- [ ] **Step 2: About — `src/app/(site)/about/page.tsx`**

Add `ServiceCaseStudiesSection` to the sections import and `import { getPageCaseStudies } from "@/lib/pageCaseStudies";`. After `const blogs = await getPageBlogs("about");` add `const caseStudies = await getPageCaseStudies("about");`.

Insert case studies above `ExploreSection` (the section currently directly above blogs), so the order becomes `TeamThoughtsSection` → **case studies** → `ExploreSection` → blogs → `CtaSection`:

```tsx
      <TeamThoughtsSection />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <ExploreSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to Reinvent Your CRM?" />
```

- [ ] **Step 3: Services — `src/app/(site)/services/page.tsx`**

Add `ServiceCaseStudiesSection` to the sections import and `import { getPageCaseStudies } from "@/lib/pageCaseStudies";`. After `const blogs = await getPageBlogs("services");` add `const caseStudies = await getPageCaseStudies("services");`.

Insert case studies above `CertifiedSection` (the section currently directly above blogs): order `WhyChooseSection` → **case studies** → `CertifiedSection` → blogs → `CtaSection`.

```tsx
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Services Partner"
        customReasons={servicesReasons}
      />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <CertifiedSection
        title="Certified Salesforce Expertise Behind Every Solution We Deliver"
        description="Our consultants, developers, and architects are certified across platform administration, app building, data architecture, and every major Salesforce cloud. Every engagement is backed by certified expertise."
      />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to Reinvent Your CRM?" />
```

- [ ] **Step 4: Platform Expertise — `src/app/(site)/platform-expertise/page.tsx`**

Add `ServiceCaseStudiesSection` to the sections import and `import { getPageCaseStudies } from "@/lib/pageCaseStudies";`. After `const blogs = await getPageBlogs("platform-expertise");` add `const caseStudies = await getPageCaseStudies("platform-expertise");`.

Insert case studies above `ExpertiseStackSection` (the section currently directly above blogs): order `PartnersSection` → **case studies** → `ExpertiseStackSection` → blogs → `CtaSection`.

```tsx
      <PartnersSection />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <ExpertiseStackSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Drive CRM Innovation For Your Organisation" />
```

- [ ] **Step 5: Partnership — `src/app/(site)/partnership/page.tsx`**

Add `ServiceCaseStudiesSection` to the sections import and `import { getPageCaseStudies } from "@/lib/pageCaseStudies";`. After `const blogs = await getPageBlogs("partnership");` add `const caseStudies = await getPageCaseStudies("partnership");`.

Insert case studies above `PlatformsSection` (the section currently directly above blogs): order `BelieveSection` → **case studies** → `PlatformsSection` → blogs → `CtaSection`.

```tsx
      <BelieveSection title="Our Partnerships" cards={partnershipCards} />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <PlatformsSection
        title="Platforms We Work With"
        logos={partnershipPlatformLogos}
      />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready To Talk About Your CRM Needs?" />
```

- [ ] **Step 6: Industries — `src/app/(site)/industries/page.tsx` (reorder only)**

The page is already wired (`getPageCaseStudies("industries")` and `ServiceCaseStudiesSection` are present). Move the case-studies block **above** `PlatformsSection`, so it is no longer adjacent to blogs:

Before (current order): `HeroSection` → `IndustryDetailSection` → `PlatformsSection` → **case studies** → blogs → `CtaSection`.

After: `HeroSection` → `IndustryDetailSection` → **case studies** → `PlatformsSection` → blogs → `CtaSection`.

```tsx
      <IndustryDetailSection />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <PlatformsSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to See How Salesforce Fits Your Industry?" />
```

- [ ] **Step 7: Verify**

Run: `pnpm type-check`
Expected: PASS (each new `getPageCaseStudies("<key>")` now satisfies `PageCaseStudyKey`).

---

### Task 3: Add FAQ section to the homepage above the footer CTA

**Files:**
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `FaqSection` (props `{ title?, faqs?: FaqItem[] }`), already exported from `@/components/sections`.

- [ ] **Step 1: Import `FaqSection`**

Add `FaqSection` to the existing `@/components/sections` import in `src/app/(site)/page.tsx`.

- [ ] **Step 2: Add the FAQ data**

Add this `faqs` constant just above `export default async function HomePage()` (or at module scope near the other constants):

```tsx
const faqs = [
  {
    question: "What is ProvidusCRM?",
    answer:
      "ProvidusCRM is a certified UK-based Salesforce consultancy specializing in enterprise CRM strategy, custom platform development, and business process automation. We help organizations streamline sales workflows, unify customer data, and maximize ROI on the Salesforce ecosystem.",
  },
  {
    question: "Is ProvidusCRM a Salesforce consulting partner based in the UK?",
    answer:
      "Yes, ProvidusCRM is a London-headquartered Salesforce partner operating on UK time zones (GMT/BST). Our team delivers custom Salesforce implementation, custom Apex/LWC development, Agentforce and custom AI integrations, and platform/industry cloud optimizations for UK businesses.",
  },
  {
    question: "What core services does ProvidusCRM provide?",
    answer:
      "ProvidusCRM provides end-to-end CRM solutions, including Salesforce consulting, development, implementation, migration, integrations, support, and managed services.",
  },
  {
    question: "Why choose ProvidusCRM for Salesforce consulting?",
    answer:
      "ProvidusCRM offers dedicated, UK-based certified specialists who design scalable CRM architectures tailored to local regulations, compliance standards, and operational workflows, ensuring high adoption and zero technical debt or bloat.",
  },
];
```

- [ ] **Step 3: Render the FAQ section above the footer CTA**

Insert `<FaqSection>` between the blogs block and `<CtaSection />`:

```tsx
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <FaqSection title="Frequently Asked Questions" faqs={faqs} />
      <CtaSection />
```

- [ ] **Step 4: Verify**

Run: `pnpm type-check`
Expected: PASS. `FaqSection` is a client component with `"use client"`; passing `faqs` from a server component is fine.

---

### Task 4: Fix the "Book a Call" hero button to link to Contact

**Files:**
- Modify: `src/components/sections/HeroSection.tsx:15,142,263-275`

**Interfaces:**
- Produces: `HeroSection`'s primary CTA always renders inside `<Link href="/contact">` unless a `ctaHref` is passed.

**Root cause:** the default `ctaLabel` is `"Book a Call"` but `ctaHref` defaults to `undefined`, and the render logic only wraps the button in a `<Link>` when `ctaHref` is truthy — so every hero that omits `ctaHref` (Home, About, Services, Industries, Platform Expertise, Partnership, and the health/financial/commerce/nonprofit industry pages) shows an inert `<button>`. This single change fixes all of them.

- [ ] **Step 1: Default `ctaHref` to `/contact`**

In `src/components/sections/HeroSection.tsx`, change the destructured default:

```ts
  ctaLabel = "Book a Call",
  ctaHref,
```

to:

```ts
  ctaLabel = "Book a Call",
  ctaHref = "/contact",
```

- [ ] **Step 2: Always wrap the CTA in a link**

Replace the conditional CTA block (lines 262–275) with an unconditional link:

```tsx
                {/* CTA */}
                {!hideCta && (
                  <div className="flex flex-wrap items-center gap-4">
                    <Link href={ctaHref}>
                      <CtaButton variant={ctaVariant} size={ctaSize}>
                        {ctaLabel}
                      </CtaButton>
                    </Link>

                    {secondaryCta && (
                      <Link
                        href={secondaryCta.href}
                        {...(isExternalHref(secondaryCta.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={cn(
                          "inline-flex items-center rounded-full border-2 border-white font-body font-semibold text-white transition-colors hover:bg-white/10",
                          ctaSize === "sm"
                            ? "px-5 py-2 typography-p3"
                            : "px-7 py-3 typography-p2"
                        )}
                      >
                        {secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
```

- [ ] **Step 3: Update the stale doc comment**

Change line 15 from `/** Without \`ctaHref\` the button stays unlinked, as on the older pages. */` to `/** Defaults to \`/contact\`; pass \`ctaHref\` to override the target. */`.

- [ ] **Step 4: Verify**

Run: `pnpm type-check`
Expected: PASS. `ctaHref` is now non-optional (`string`), so `href={ctaHref}` type-checks.

Manual check (optional, via `pnpm dev`): on `/`, `/about`, `/services`, `/industries`, `/platform-expertise`, `/partnership` the hero "Book a Call" button navigates to `/contact`.

---

### Task 5: Remove non-LinkedIn social links from the footer

**Files:**
- Modify: `src/components/layout/Footer.tsx:23-28`

- [ ] **Step 1: Keep only LinkedIn in `socialLinks`**

Replace the `socialLinks` array:

```ts
const socialLinks = [
  { icon: "facebook", href: "https://www.facebook.com/share/1ASdLhT26p/" },
  { icon: "twitter", href: "https://x.com/Providustechllc" },
  { icon: "instagram", href: "https://www.instagram.com/lifeatprovidus" },
  { icon: "linkedin", href: "https://www.linkedin.com/company/providus-technologies" },
];
```

with:

```ts
const socialLinks = [
  { icon: "linkedin", href: "https://www.linkedin.com/company/providus-technologies" },
];
```

The existing `.map()` rendering needs no change — it iterates whatever is in the array.

- [ ] **Step 2: Verify**

Run: `pnpm type-check`
Expected: PASS. (The unused `facebook.svg`/`twitter.svg`/`instagram.svg` image files can be left in place; only the array changed.)

---

### Task 6: Update the About "Who We Are" description

**Files:**
- Modify: `src/app/(site)/about/page.tsx:64-67`

- [ ] **Step 1: Replace the `CertifiedSection` description**

In `src/app/(site)/about/page.tsx`, replace the `description` prop on the `CertifiedSection` (the "Who We Are" block) with the new copy:

```tsx
      <CertifiedSection
        title="Who We Are"
        description="We're not a generic Salesforce consultancy delivering run-of-the-mill implementations. At ProvidusCRM, we align your CRM with your unique challenges, building tailored Salesforce solutions that drive measurable impact. As a certified Salesforce partner based in the UK, ProvidusCRM works with organisations across nonprofit, financial services, healthcare, and other industries to implement Salesforce around their workflows, challenges, and goals."
      />
```

- [ ] **Step 2: Verify**

Run: `pnpm type-check`
Expected: PASS (pure string change).

---

## Final Verification (after all tasks)

- [ ] `pnpm type-check` — PASS
- [ ] `pnpm lint` — PASS
- [ ] `pnpm build` — PASS
- [ ] `pnpm dev` + manual spot-check:
  - `/` — hero button → `/contact`; case studies between Why Choose and Team; FAQ above footer CTA.
  - `/about`, `/services`, `/platform-expertise`, `/partnership`, `/industries` — case studies present one section above blogs; hero button → `/contact`.
  - Footer — only LinkedIn icon remains.
  - `/about` — "Who We Are" shows the new description.

## Notes / Out of scope

- `salesforce-education-cloud-consulting` is absent from `PageCaseStudyKey`/the Sanity dropdown even though it is a static page. It is a **child** page, not a parent page, so it is intentionally left out of this change; flag it separately if it should also host case studies.
- Partner child pages (`partnership/findock`, `fundraise-up`, `dotdigital`) and platform/industry child pages are not "parent pages" and already have their own CTA wiring (their hero CTAs already pass `ctaHref="/contact"`).
