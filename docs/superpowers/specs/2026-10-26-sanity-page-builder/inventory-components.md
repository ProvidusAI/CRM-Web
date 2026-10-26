# Section Component Inventory (src/components/sections)

Repo: /Users/mujtabakamal/Projects/CRM-Web. All paths below are relative to `src/components/sections/`.
Barrel: `index.ts` re-exports every component (plus `partnerLogos` from PlatformsSection and `reasons` from WhyChooseSection).
Barrel does NOT export any of the `*Props` interfaces (they are file-local `interface`, not exported) and does NOT re-export item types; import item types from the component file directly.

Legend: **RSC** = server component (no "use client"); **Client** = "use client".
"green-line" = decorative `/images/green-line.svg` (next/image, alt="") or `<GreenLineMark />` (`@/components/ui/GreenLineMark`: a thin next/image wrapper around the same SVG, 80x40, alt="" aria-hidden, only prop `className`).
No component in this list accepts a `className`, `tone`, `spacing` or generic `variant` prop unless explicitly stated.

---

## 1. PageBlogsSection — `PageBlogsSection.tsx` — RSC
Props (`PageBlogsSectionProps`, not exported):
| prop | type | default |
|---|---|---|
| title | string? | `"Latest from our blog"` (via `||`) |
| posts | BlogTeaserCard[] (required) | — returns null if empty |

Exported type `BlogTeaserCard { id: string; title: string; slug: string; image: string; imageAlt: string; publishedAt: string; category?: string }`
- Hard-coded: green-line.svg header mark; link pattern `/blog/${slug}`; button label "Read Article".
- ReactNode props: none.
- Bg/spacing: fixed `bg-white py-16 md:py-24`, `Container size="xl"`. No bg props.
- Images: next/image `fill` (aspect 1.95/1), alt = `post.imageAlt` (prop). green-line fixed 64x24.

## 2. CtaSection — `CtaSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "Explore How We Align Your CRM Systems With Your Business Initiatives." (`\n` splits into `<br/>`) |
| buttonLabel | string? | "Let's Connect" |
| buttonHref | string? | "/contact" |
| backgroundImage | string? | "/images/cta-bg.webp" |
- All defaults use `||` (empty strings from Sanity fall back — explicit comment in code).
- Hard-coded: green-line.svg; gradient overlay; `mt-24 md:mt-40` top margin; mobile bg `bg-footer-blue` (photo hidden < md).
- ReactNode: none (title string, newline-aware).
- Images: next/image `fill` bg, alt="" (decorative, not a prop). green-line 60x20.

## 3. PartnersSection — `PartnersSection.tsx` — RSC
- **No props at all.**
- Hard-coded: heading "Trusted by."; `logos` const of **12** images `/images/partners/1.webp` ... `/images/partners/12.webp` (rendered twice for marquee).
- Images: next/image fixed 220x100; alt auto-generated `Partner ${n} logo` (not a prop; meaningless alt).
- Bg: fixed `bg-white`, card `bg-brand-green-pale`.

## 4. HeroSection — `HeroSection.tsx` — RSC (also exports `BlurScaleHeading`)
| prop | type | default |
|---|---|---|
| title | **React.ReactNode**? | default JSX: "Custom Salesforce Solutions For Your CRM Innovation Goals" + inline green-line `<Image>` |
| description | string? | "Future-proof customer operations and business processes with ProvidusCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK." |
| image | string? | "/images/hero-img.webp" |
| imageClassName | string? | "object-cover object-center" |
| hideImage | boolean? | false (switches to centered short layout; hides badge/subtitle/description/bullets/CTA) |
| ctaLabel | string? | "Book a Call" |
| ctaHref | string? | "/contact" |
| ctaVariant | "white" \| "filled" | "white" |
| ctaSize | "sm" \| "md" | "md" |
| subtitle | string? | — |
| subtitleAsH1 | boolean? | false (subtitle becomes `<h1>`, title `<h2>`) |
| bullets | string[]? | — |
| hideCta | boolean? | false |
- Hard-coded: bg `/images/hero-bg.webp` (priority, fill); Salesforce partner badge `/images/salesforce-partner.webp` (66x71, alt "Salesforce Partner") + copy "Certified / Salesforce Partner / in the UK".
- ReactNode: `title` — passed through `BlurScaleHeading`, which walks children, splits strings into per-letter animated spans and wraps non-text elements (e.g. inline images/GreenLineMark) in animated spans. Portable Text / string-with-mark serialization needed.
- Images: main image next/image `fill`, **alt hard-coded "Business meeting"** (not a prop).
- Variant-ish props: ctaVariant, ctaSize, hideImage, imageClassName.

## 5. ServiceCaseStudiesSection — `ServiceCaseStudiesSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "More projects that made a mark." |
| caseStudies | ServiceCaseStudyCard[] (required) | — null if empty |
| viewAllHref | string? | — |
| viewAllLabel | string? | "View More" |
Exported `ServiceCaseStudyCard { title: string; slug: string; image: string; label?: string; category?: string }`
- Hard-coded: green-line; link `/case-studies/${slug}`; button "View Project".
- Images: `fill`, alt = `caseStudy.title` (no separate alt).
- Bg: fixed `bg-white py-16 md:py-24`.

## 6. WhyChooseSection — `WhyChooseSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "Why Choose ProvidusCRM As Your Salesforce Solutions Partner" |
| customReasons | WhyChooseReason[]? | exported `reasons` (3 items) |
| image | string? | "/images/why-choose.webp" |
| imageAlt | string? | "Salesforce Specialist" |
| backgroundOverlayColor | string? | "var(--color-tab-highlight)" |
Exported `WhyChooseReason { title: string; color: string; icon: string; text: string }` and exported const `reasons` (3: Operational Excellence / Technical Depth / Business-First Approach; icons `/images/different.webp`, `/images/better.webp`, `/images/salesforce-partner.webp`; colors are CSS vars `--color-soft-indigo`, `--color-soft-purple`, `--color-salesforce-blue`).
- Hard-coded: bg `/images/why-choose-bg.webp` (fill), green-line.
- Bg prop: `backgroundOverlayColor` (CSS colour string used twice at 0.9/0.8 opacity).
- Images: reason icons fixed 70x70, alt=""; main image fill, alt = prop.

## 7. FaqSection — `FaqSection.tsx` — Client
| prop | type | default |
|---|---|---|
| title | string? | "Frequently Asked Questions" (special-cased: rendered on 2 lines only when equal to default) |
| faqs | FaqItem[]? | [] — returns null if empty |
Exported `FaqItem { question: string; answer: string }` (answer is plain string, no rich text).
- Hard-coded: GreenLineMark. No images.
- Bg: fixed `bg-white py-24`.

## 8. WhatWeDoSection — `WhatWeDoSection.tsx` — Client
| prop | type | default |
|---|---|---|
| title | string? | "What We Do" |
| tabs | WhatWeDoTab[]? | internal `tabs` const (**8** tabs) when undefined or empty |
| backgroundOverlayColor | string? | "var(--color-tab-highlight)" |
Exported `WhatWeDoTabLink { href: string; isExternal: boolean }`, `WhatWeDoTab { id?: string; label: string; content: { heading: string; text: string; bullets?: string[] }; link?: WhatWeDoTabLink }`.
- Hard-coded: **large** default `tabs` array (8 tabs: Consulting, Development, Implementation, Migration, Integration, Customisation, Managed Services, Support & Maintenance), each ~2 paragraphs (`\n\n` separated) + 4 bullets; 6 have links to `/services/salesforce-*-services`. Not exported.
- Images: bg `/images/what-we-do-bg.webp` fill; `/images/tab-content-bg.webp` fill; green-line 60x20. All decorative alt="".
- `text` split on `\n\n` into paragraphs. Uses `<a>` not next/link.

## 9. ExpertiseSalesforceSection — `ExpertiseSalesforceSection.tsx` — Client (framer-motion)
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| text | string? | — (ignored when paragraphs given) |
| paragraphs | string[]? | — |
| image | string (required) | — |
| imageAlt | string? | "Salesforce Partner" |
| imageVariant | "contain" \| "framed" \| "framed-wide" | "contain" |
| hideMark | boolean? | false (drop GreenLineMark when heading carries inline one) |
| ctaLabel | string? | — (CTA only if both label+href) |
| ctaHref | string? | — |
- Hard-coded: GreenLineMark. Bg fixed `bg-white py-16 md:py-24`.
- ReactNode: `heading`.
- Variant prop: `imageVariant` changes grid + image frame.
- Images: next/image `fill` in all variants; alt = prop.

## 10. ExpertisePlatformsSection — `ExpertisePlatformsSection.tsx` — Client (Embla carousel, autoplay 3s, framer-motion)
| prop | type | default |
|---|---|---|
| title | string (required) | — |
| items | ExpertisePlatformItem[] (required) | — null if empty |
Exported `ExpertisePlatformItem { title: string; text: string; icon: string; bgGradient: string }` (bgGradient = raw CSS `background` value).
- Hard-coded: GreenLineMark; card titles auto-link via `PLATFORM_HREFS[item.title]` from `@/lib/platformPages` (lookup keyed by title string — fragile if editors rename).
- Images: icon next/image `fill` in 64/80px box, alt = item.title.

## 11. ExpertiseDescriptionSection — `ExpertiseDescriptionSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| heading | **React.ReactNode** (required) | — |
| paragraphs | string[] (required) | — |
| ctaText | string? | "Let's Connect" |
| ctaHref | string? | "/contact" |
| hideCta | boolean? | false |
- No images. Bg fixed `bg-white py-16 md:py-24`.
- ReactNode: `heading`.

## 12. ExpertiseCertifiedSection — `ExpertiseCertifiedSection.tsx` — Client (framer-motion marquee)
| prop | type | default |
|---|---|---|
| images | string[] (required) | — null if empty |
- Images: next/image `fill`, sizes 150px, **alt auto `Certification ${n}`** (no alt prop). Rendered twice (marquee).
- Bg fixed `bg-white py-12`. No heading.

## 13. ExpertiseCtaSection — `ExpertiseCtaSection.tsx` — Client (framer-motion)
| prop | type | default |
|---|---|---|
| title | string (required) | — |
| titleHref | string? | — (wraps heading in link) |
| buttonText | string (required) | — |
| buttonHref | string (required) | — |
| image1 | string (required) | — |
| image2 | string (required) | — |
- Hard-coded: GreenLineMark; heading is `<h3>`.
- Images: both `fill`; **alts hard-coded** "Consultation Team" (image1, object-cover) and "Salesforce Astro" (image2, object-contain). No alt props.

## 14. ExpertiseImplementationSection — `ExpertiseImplementationSection.tsx` — Client (framer-motion)
| prop | type | default |
|---|---|---|
| heading | **React.ReactNode** (required) | — |
| items | ExpertiseImplementationItem[] (required) | — null if empty |
Exported `ExpertiseImplementationItem { title: string; text: string; image: string }` (text rendered `whitespace-pre-wrap`).
- Hard-coded: custom inline SVG zig-zag mark (`#A0FF88`, NOT GreenLineMark); card bg `#EBF4FF`.
- Images: `fill`, alt = item.title.
- ReactNode: `heading`.

## 15. CertifiedSection — `CertifiedSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | default JSX "Professional Salesforce `<br/>` Services Grounded in `<br/>` Certified Expertise" |
| description | string? | "ProvidusCRM consultants hold certifications across the Salesforce platform and industry clouds. ..." |
- Hard-coded images: `/images/certified-left.webp` & `/images/certified-right.webp` (1236x1385, decorative, md+), `/images/salesforce-partner.webp` (446x474, alt "Salesforce Partner"), green-line 60x20.
- Bg fixed: gradient `to-certified-blue`, `rounded-b-[60px] md:rounded-b-[120px]`.
- Type is `string` but default is JSX with `<br/>` — Sanity-supplied title cannot reproduce line breaks.

## 16. SplitComparisonSection — `SplitComparisonSection.tsx` — Client (framer-motion)
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| subtitle | string? | — |
| cards | SplitComparisonCard[] (required) | — null if empty |
| className | string? | `"bg-[#F6F6F6] border-y border-[#38A81B] mt-20"` (replaces bg + outer margin wholesale; `py-20 md:py-32` always applied) |
Exported `SplitComparisonCard { title: **ReactNode**; text: string; color: string /* hex; border + shadow `${color}36` */ }`
- ReactNode: `heading` AND card `title`.
- Bg prop: `className`. Odd card count centres last card and drops the divider.
- Hard-coded: GreenLineMark. No images.

## 17. PlatformsSection — `PlatformsSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "Platforms We Work With" (param default; `""` would NOT fall back) |
| logos | string[]? | `defaultLogos` (12: `/images/platform-logos/1.webp` ... `12.webp`) |
- Also exports const `partnerLogos` (7: first 4 platform logos + `/images/partnership-logos/pledge.webp`, `digital-data-cloud.webp`, `stripe.webp`) used by About + homepage.
- Hard-coded: green-line 60x20; bg `bg-[#EEFFEA] border-y border-[#38A81B] pt-24 pb-32`.
- Images: `fill`, **alt hard-coded "Platform Logo"** for every logo (no alt support; logos are bare strings).

## 18. ServiceBenefitsSection — `ServiceBenefitsSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "How Our Salesforce Consulting Services Help You" |
| items | ServiceBenefitCard[] (required) | — null if empty |
Exported `ServiceBenefitCard { title: string; description: string; iconKey?: ServiceBenefitIconKey; icon?: LucideIcon /* wins over iconKey; NOT serialisable */; colorTheme?: ServiceBenefitColorTheme }`.
- Types `ServiceBenefitIconKey` / `ServiceBenefitColorTheme` imported from `@/sanity/lib/types` (already CMS-backed). iconMap: roi, adoption, maturity, visibility, view360, partnership -> lucide icons; themes: blue, green, yellow, peach, pink, purple (default iconKey "roi", theme "blue").
- `icon` prop takes a **component (LucideIcon)** — JSX-like, needs mapping to iconKey for CMS.
- Hard-coded: green-line 64x24. `Container size="lg"`.

## 19. ExpertiseChallengesSection — `ExpertiseChallengesSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | **ReactNode**? | — (heading omitted if falsy) |
| items | ExpertiseChallenge[] (required) | — null if empty |
Exported `ExpertiseChallenge { title: string /* whitespace-pre-line */; text: string; icon: string /* URL used as CSS mask-image */ }`
- Images: **not next/image** — icon rendered via CSS `mask-image: url(icon)` tinted `#18689F`; no alt (aria-hidden). Needs SVG/monochrome PNG URL.
- Hard-coded: stagger offsets (lg:mt-0/14/28 cycling every 3), border `#C0DDFF`.

## 20. SalesforceServiceHero — `SalesforceServiceHero.tsx` — Client (contains a form)
| prop | type | default |
|---|---|---|
| badgeTitle | string? | "Certified" |
| badgeSubtitle | string? | "Salesforce Partner in the UK" |
| kicker | string? | — (trimmed; when set becomes `<h1>`, title becomes `<h2>`) |
| title | string (required) | — (also sent as `serviceTitle` in form POST) |
| description | string? | — |
| bullets | string[]? | [] (keyed by bullet text — duplicates collide) |
| formTitle | string? | "Fill a form today" |
| formButtonLabel | string? | "Let's Connect" |
| backgroundImage | string? | "/images/hero-bg.webp" |
- Hard-coded: green-line appended inline after title (always); badge image `/images/salesforce-partner.webp` 66x71 alt "Salesforce Partner"; form fields (Name/Email/Contact Number/Message, placeholders, validation patterns); success copy "Thank You!" / "Your message has been sent successfully..."; POSTs to `/api/service-inquiry`.
- Images: bg `fill` priority alt="".

## 21. OrganisationTypesSection — `OrganisationTypesSection.tsx` — Client (accordion)
| prop | type | default |
|---|---|---|
| title | string (required) | — |
| subtitle | string? | — |
| items | OrganisationTypeItem[] (required) | — null if empty |
| images | string[]? | [] (design uses 2; first 480px tall, rest 380px) |
Exported `OrganisationTypeItem { title: string; paragraphs: string[] }`
- Hard-coded: GreenLineMark (w-20); numbering "01","02"...; first item open by default.
- Images: `fill`, **alt="" always** (no alt support).

## 22. IndustryCtaSection — `IndustryCtaSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string (required) | — |
| buttonLabel | string (required) | — |
| buttonHref | string (required) | — |
| image | string (required) | — |
| imageAlt | string? | "" |
- Hard-coded: `CTA_GRADIENT` cyan gradient; heading colour `#12233B`.
- Images: next/image **fixed 659x415** (rendered twice: mobile in-flow + desktop overflow), alt = prop.

## 23. ExpertiseFeaturesSection — `ExpertiseFeaturesSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| features | ExpertiseFeature[] (required) | — (no empty guard: renders empty section) |
Exported `ExpertiseFeature { title: string /* pre-line */; description: string; icon: string }`
- No heading. Hard-coded card bg `#F9FFF8`, green radial icon circle.
- Images: icon `fill` 40x40 box, alt = feature.title.

## 24. OutcomeCardsSection — `OutcomeCardsSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| cards | OutcomeCard[] (required) | — null if empty |
Exported `OutcomeCard { title: string /* pre-line, \n honoured */; text: string; icon: string }`
- No heading (sits under a lead-in section). Bg fixed `bg-white pb-16 md:pb-24` (no top padding).
- Columns auto by count (1-4). Cards keyed by title (duplicate titles collide).
- Images: icon `fill` 44px, alt="" aria-hidden.

## 25. IndustriesSection — `IndustriesSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "How We Implement Salesforce Across Industries" |
| items | IndustrySectionItem[]? | internal `industries` (6) when undefined/empty |
Exported `IndustrySectionItem { title: string; image: string; description: string; href?: string }`
- Hard-coded default `industries` (6, not exported): Non-Profit / Education / Commerce / Health / Financial Services / Manufacturing Cloud; images `/images/non-profit.webp`, `/images/education-cloud.webp`, `/images/commerce-cloud.webp`, `/images/health-cloud.webp`, `/images/finance-services-cloud.webp`, `/images/manufacturing-cloud.webp`; ~70-word descriptions; 5 with `/industries/salesforce-*` hrefs (Manufacturing has none).
- Images: `fill`, **`unoptimized`**, alt = item.title. green-line 60x20.
- Bg fixed `py-24 bg-white`; card gradient hard-coded.

## 26. ExplainerCardsSection — `ExplainerCardsSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| cards | ExplainerCard[] (required) | — (no empty guard) |
| iconVariant | "tile" \| "plain" | "tile" |
Exported `ExplainerCard { title: **ReactNode**; text: string; icon: string; cta?: { label: string; href: string } }`
- ReactNode: `heading` AND card `title`.
- Hard-coded: green-line 64x24; tile bg `/images/platform-expertise/agentforce-what-is/icon-bg.svg` (page-specific asset used generically).
- Images: "tile" = icon as CSS mask (white over gradient tile; not next/image for icon); "plain" = next/image `fill` 48px alt="". No alt prop.
- Uses `<Section background="white">` (Section's default padding).
- Variant prop: `iconVariant`.

## 27. BelieveSection — `BelieveSection.tsx` — Client (framer-motion hover)
| prop | type | default |
|---|---|---|
| title | string? | "What We Believe In" (param default) |
| cards | CardItem[]? | `believeCards` (4) |
`CardItem { title: string; description: string; icon: string; bgImage?: string; bgColor?: string; href?: string }` — **NOT exported** (interface declared after use, file-local).
- Hard-coded default `believeCards` (4): Build What Matters / Get It Right / Own Every Outcome / Drive Self-Sufficiency; icons `/images/build-matters.webp`, `/images/get-it-right.webp`, `/images/outcome.webp`, `/images/drive-self.webp`; bgImages `*-bg.webp` counterparts.
- Hard-coded section bg `/images/believe-bg.webp` (fill), green-line 60x20.
- Images: icon `fill` 156px alt = card.title; card `bgImage` via CSS `background-image` (not next/image); fallback `bgColor` or `var(--color-brand-blue-light)`.

## 28. TrueCostSection — `TrueCostSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| subtitle | string? | — |
| intro | string[]? | [] |
| cards | TrueCostCard[]? | [] |
| panelTitle | string? | — (panel shown if panelTitle or highlights) |
| highlights | TrueCostHighlight[]? | [] |
Exported `TrueCostCard { title: string; text: string /* split on \n\n */; bullets?: string[]; background: string /* CSS var */; iconColor: string /* CSS var */; icon?: string }`, `TrueCostHighlight { label: string; text: string }`.
- ReactNode: `heading`.
- Colour props per card are CSS custom-property strings (e.g. `var(--color-cost-card-green)`) — need an enum/select in Sanity.
- Images: card icon next/image fixed 32x32 alt="". No section images.
- Keys: cards by title, highlights by label, bullets by text.
- Uses `<Section background="white">`.

## 29. TeamThoughtsSection — `TeamThoughtsSection.tsx` — Client (carousel + AnimatePresence)
- **No props at all.**
- Hard-coded `teamThoughts` (4): Mohsin J. Khan (Founder, `/images/team/9.webp`), Mustansir Mustafa (`/images/team/10.webp`), Sami Haroon (`/images/team/8.webp`), Adil Raja (`/images/team/1.webp`); each has name, displayName, designation, fullDesignation, quote. Type `TeamMember` inferred, not exported.
- Hard-coded copy: heading "Meet Our Team", subtitle "Our team of technology experts and industry leaders leads our expertise, solutions, and success stories."
- Hard-coded bg `/images/team-bg.webp` + `bg-[#1E5D8F]`, `mt-24`; green-line 60x20; mobile autoplay 6000ms.
- Images: all `fill`, alt = member.name.

## 30. TeamGallerySection — `TeamGallerySection.tsx` — RSC
- **No props at all.**
- Hard-coded heading JSX: "Work With Experts Across CRM," / "AI, Sales, Marketing, and More!" (two `md:block` spans).
- Hard-coded photos (5): `/images/gallery/1.webp` ... `5.webp` in a 2 + 3 layout, each with descriptive alt, Figma-derived aspect ratio classes and crop `imageClassName` (object-position/scale). `GalleryPhoto` type not exported.
- Images: `fill`, alt hard-coded per photo (good alts). Layout tightly coupled to exactly 2+3 photos.
- Uses `<Section>` defaults; GreenLineMark.

## 31. SolutionTypesSection — `SolutionTypesSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| subtitle | string? | — |
| cards | SolutionTypeCard[]? | [] |
Exported `SolutionTypeCard { title: string; text: string; icon: string /* CSS mask */; color: string /* CSS var e.g. var(--color-type-teal) */ }`
- ReactNode: `heading`.
- Images: icon via CSS mask only (no next/image, no alt). Cards keyed by title.
- Uses `<Section background="white">`; GreenLineMark.

## 32. SalesforceConsultCtaSection — `SalesforceConsultCtaSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| title | string? | "Connect With Our Salesforce Consultants To Discuss Your CRM Needs And Business Goals." (`||`) |
| buttonLabel | string? | "Let's Connect" |
| buttonHref | string? | "/contact" |
| backgroundColor | string? | "var(--color-consult-blue)" — applied as CSS `background` shorthand, so gradients allowed |
| image | string? | "/images/consult.webp" |
| imageAlt | string? | "" |
| buttonVariant | "filled" \| "white" | "filled" (white => size md, filled => size sm) |
- Hard-coded: outer `bg-white py-16 md:py-24 mt-24`; heading is `<h3>`.
- Images: next/image **fixed 647x446**, alt = prop.
- Bg prop: `backgroundColor`; variant: `buttonVariant`.

## 33. IndustryDetailSection — `IndustryDetailSection.tsx` — Client (scroll-linked sticky stack, framer-motion useScroll)
- **No props at all.**
- Hard-coded `industries` (6, `Industry` type not exported): Nonprofit / Education / Commerce / Healthcare / Financial Services / Manufacturing; images `/images/industries/non-profit.webp`, `education.webp`, `commerce.webp`, `healthcare.webp`, `financial-services.webp`, `manufacturing.webp`; ~40-word descriptions; 5 hrefs `/industries/salesforce-*` (Manufacturing none).
- NOTE: different copy + images from IndustriesSection's default list (two parallel industry datasets).
- Images: `fill`, alt = title, `priority` for first 2.
- Hard-coded card gradient, sticky offsets.

## 34. IdentityResolutionSection — `IdentityResolutionSection.tsx` — Client (framer-motion)
- **No props at all.** 100% hard-coded page-specific content (Data Cloud page).
- Heading JSX: "How Identity `<br/>` Resolution Works" + inline `<GreenLineMark>`.
- 2 intro paragraphs; 3 columns ("The Two Failure modes", "Here's An Example", "Survivorship Rules"), 2 paragraphs each.
- Images: `/images/data-cloud-identity.svg` (desktop, fill) and `/images/platform-expertise/identiy-mob.png` (mobile, fill; note typo "identiy"); both alt "How Identity Resolution Works Diagram" (hard-coded).
- Bg fixed `py-20 md:py-32 bg-white`.

## 35. ExploreSection — `ExploreSection.tsx` — Client (framer-motion)
- **No props at all.**
- Hard-coded: heading "Explore ProvidusCRM"; 3 tiles: "Our Services" -> `/services` (`/images/our-services.webp`, alt "Our Services"), "Our Industry Expertise" -> `/industries` (`/images/our-industry.webp`, alt "Industry Expertise"), "Our Platform Expertise" -> `/platform-expertise` (`/images/our-platform.webp`, alt "Platform Expertise"); "Explore →" labels; gradients per tile (CSS vars `--color-explore-green-dark`, `--color-explore-green-accent`).
- Images: all `fill`, alts hard-coded.

## 36. ExpertiseStackSection — `ExpertiseStackSection.tsx` — Client (sticky stack + framer-motion)
- **No props at all.**
- Hard-coded `expertiseData` (7 items, 1 `hidden: true` => 6 rendered): Experience / Service / Marketing / Data Cloud / Agentforce / Revenue Cloud (hidden, no href) / Sales Cloud. Each: title, subtitle, ~60-word text, color (CSS var `--color-explore-*`), icon `/images/<x>-cloud.webp` / `/images/agent-force.webp`, image `/images/<x>-expertise.webp`, href `/platform-expertise/salesforce-*-consulting`. `ExpertiseItem` type not exported.
- Images: main `fill` alt = title (object-contain); icon `fill` alt="".
- Bg fixed `bg-white pb-32`.

## 37. ExpertiseSection — `ExpertiseSection.tsx` — Client (Embla carousel)
| prop | type | default |
|---|---|---|
| title | string? | "Our End-to-End Salesforce Platform Expertise" |
| items | ExpertiseItem[]? | exported `expertiseItems` (6) — `items || default` so `[]` renders an empty carousel |
Exported `ExpertiseItem { id: number \| string; title: string; icon: string; text: string; shadow: string /* raw CSS box-shadow */ }` and exported const `expertiseItems` (6: Agentforce, Sales, Marketing, Service, Experience, Data Cloud; icons `/images/agent-force.webp`, `/images/sales-cloud.webp`, `/images/marketing-cloud.webp`, `/images/service-cloud.webp`, `/images/experience-cloud.webp`, `/images/data-cloud.webp`). `expertiseItems` is NOT re-exported from the barrel.
- Items duplicated when fewer than 8 (for loop). Titles auto-link via `PLATFORM_HREFS[title]`.
- Images: icon `fill` 60px, alt = title. green-line 60x20. Uses `<Section className="overflow-hidden">` (default py).
- Name clash: `ExpertiseItem` also declared (different shape, not exported) in ExpertiseStackSection.

## 38. EventsSection — `EventsSection.tsx` — Client (Embla carousel, autoplay 8s, CSS marquee columns)
- **No props at all.**
- Hard-coded heading "Events & Industry Conferences We Attend".
- Hard-coded `EVENTS` (4; `EventSlide` not exported): TechCrunch Disrupt (folder `disrupt`, 8 photos), Singapore FinTech Festival (`singapore-fintect`, 4), GITEX Asia Singapore (`gitex-singapre`, 4), AI Everything MEA Egypt (`ai-egypt`, 4). Each has description + logo display size.
- Image paths are **convention-derived**: `/images/events/<folder>/bg.webp`, `/logo.webp`, `/<1..N>.webp` (folder names contain typos "fintect", "singapre"). Total ~20 photos + 4 bg + 4 logos.
- Copy bug: GITEX Asia Singapore description says "held in Dubai".
- Images: bg `fill` alt=""; logo next/image **fixed width/height from data**, alt = event.name; photos `fill` alt="" (column has role=img aria-label).

## 39. ContactSection — `ContactSection.tsx` — Client (form)
- **No props at all.**
- Hard-coded: h1 "Let's Connect"; intro "Get in touch with by filling out the form or via the contact details below." (grammar slip "with by"); address "9 Appold St, London EC2A 2AP, United Kingdom"; email `connect@providuscrm.co.uk`; phone `+44 7777 973577`; 5 form fields (Name/Email/Phone/Company/How can we help?) with placeholders and validation; success/error copy; submit "Let's Connect"; POSTs `/api/contact`.
- Images: bg `/images/hero-bg.webp` fill priority alt=""; green-line 60x20.
- Contact details likely duplicate site settings/footer — candidate to source from a Sanity singleton.

## 40. ComparisonSection — `ComparisonSection.tsx` — RSC
| prop | type | default |
|---|---|---|
| heading | **ReactNode** (required) | — |
| subtitle | string? | — |
| negativeTitle | string (required) | — |
| negativeItems | string[] (required) | — |
| positiveTitle | string (required) | — |
| positiveItems | string[] (required) | — |
| footnote | string? | — |
| buttonLabel | string? | — (CTA only when both) |
| buttonHref | string? | — |
- ReactNode: `heading`.
- Hard-coded: "V/S" badge; gradients via CSS vars; tick mask `/images/industries-pages/check-mask.png` (CSS mask, no next/image). List items keyed by text (duplicates collide).
- Uses `<Section background="white">`. No images otherwise.

## 41. CategoriesSection — `CategoriesSection.tsx` — RSC
- **No props at all.**
- Hard-coded `categories` (8, not exported): Consulting / Development / Implementation / Migration / Integration / Customisation / Managed Services / Support and Maintenance; each ~45-word text, icon `/images/salesforce-<x>.svg` (consulting, development, implementation, migration, integration, customisation, managed-services, support), raw CSS `boxGradient` + `iconGradient`, href `/services/salesforce-*` (7 of 8; Support has none).
- Overlaps WhatWeDoSection default tabs (same 8 services, different copy).
- Images: icon `fill` 32px alt="". Uses `<a>` not next/link. Rows of 2 alternating 1.22fr/1fr.
- Bg: `<Section className="bg-white py-24">`.

---

## Shared infrastructure notes
- `Section` (`src/components/layout/Section.tsx`): props `background?: SectionBackground` ("white" | "blue-light" | "green-light" | "pink-light" | "yellow-light" | "blue"; default "white"), `id?`, `className?`; always applies `py-16 md:py-24`. **None of the 41 section components forward a background/id/className to it** (only SplitComparisonSection exposes `className`, on a raw `<section>`). Anchor links (`id`) are therefore unsupported everywhere.
- `PLATFORM_HREFS` (`src/lib/platformPages.ts`) — title-string -> URL map used by ExpertiseSection and ExpertisePlatformsSection for auto-linking.
- `ServiceBenefitIconKey` / `ServiceBenefitColorTheme` already live in `src/sanity/lib/types` (ServiceBenefitsSection is the only one directly typed against Sanity).
- Sections with built-in top margin (affects stacking order in a page builder): CtaSection (`mt-24 md:mt-40`), SplitComparisonSection default className (`mt-20`), SalesforceConsultCtaSection (`mt-24`), TeamThoughtsSection (`mt-24`), HeroSection/ContactSection (`mt-4`).

## Summary tables

### Server vs client
- Client (19): FaqSection, WhatWeDoSection, ExpertiseSalesforceSection, ExpertisePlatformsSection, ExpertiseCertifiedSection, ExpertiseCtaSection, ExpertiseImplementationSection, SplitComparisonSection, SalesforceServiceHero, OrganisationTypesSection, BelieveSection, TeamThoughtsSection, IndustryDetailSection, IdentityResolutionSection, ExploreSection, ExpertiseStackSection, ExpertiseSection, EventsSection, ContactSection.
- Server (22): PageBlogsSection, CtaSection, PartnersSection, HeroSection, ServiceCaseStudiesSection, WhyChooseSection, ExpertiseDescriptionSection, CertifiedSection, PlatformsSection, ServiceBenefitsSection, ExpertiseChallengesSection, IndustryCtaSection, ExpertiseFeaturesSection, OutcomeCardsSection, IndustriesSection, ExplainerCardsSection, TrueCostSection, TeamGallerySection, SolutionTypesSection, SalesforceConsultCtaSection, ComparisonSection, CategoriesSection.

### ReactNode / JSX-typed props
| component | prop(s) |
|---|---|
| HeroSection | title (walked by BlurScaleHeading) |
| ExpertiseSalesforceSection | heading |
| ExpertiseDescriptionSection | heading |
| ExpertiseImplementationSection | heading |
| SplitComparisonSection | heading, cards[].title |
| ExpertiseChallengesSection | title |
| ExplainerCardsSection | heading, cards[].title |
| TrueCostSection | heading |
| SolutionTypesSection | heading |
| ComparisonSection | heading |
| ServiceBenefitsSection | items[].icon (LucideIcon component) |
Default-JSX but string-typed: CertifiedSection.title (default has `<br/>`), FaqSection.title (default split into 2 spans).

### Zero-prop, fully hard-coded (10)
PartnersSection, TeamThoughtsSection, TeamGallerySection, IndustryDetailSection, IdentityResolutionSection, ExploreSection, ExpertiseStackSection, EventsSection, ContactSection, CategoriesSection.

### Props with large hard-coded defaults
WhatWeDoSection (8 tabs), IndustriesSection (6), WhyChooseSection (`reasons`, 3, exported), BelieveSection (4), ExpertiseSection (`expertiseItems`, 6, exported), PlatformsSection (12 logos + `partnerLogos` 7 exported), HeroSection/CtaSection/SalesforceConsultCtaSection/CertifiedSection/ServiceBenefitsSection/SalesforceServiceHero (copy + image defaults).

### Background / variant / style props
| component | prop |
|---|---|
| WhyChooseSection | backgroundOverlayColor |
| WhatWeDoSection | backgroundOverlayColor |
| SplitComparisonSection | className (replaces bg + margin) |
| SalesforceConsultCtaSection | backgroundColor (CSS background shorthand), buttonVariant |
| HeroSection | ctaVariant, ctaSize, hideImage, imageClassName, hideCta, subtitleAsH1 |
| ExpertiseSalesforceSection | imageVariant, hideMark |
| ExplainerCardsSection | iconVariant |
| ExpertiseDescriptionSection | hideCta |
| CtaSection | backgroundImage |
| SalesforceServiceHero | backgroundImage |
| Per-item colour strings | WhyChooseReason.color, SplitComparisonCard.color (hex), ExpertisePlatformItem.bgGradient, ExpertiseItem.shadow, TrueCostCard.background/iconColor, SolutionTypeCard.color, ServiceBenefitCard.colorTheme (enum) |

### Images: alt handling
- alt is a prop: PageBlogsSection (imageAlt per post), WhyChooseSection (imageAlt), ExpertiseSalesforceSection (imageAlt), IndustryCtaSection (imageAlt), SalesforceConsultCtaSection (imageAlt).
- alt derived from item title: ServiceCaseStudiesSection, ExpertisePlatformsSection, ExpertiseImplementationSection, ExpertiseFeaturesSection, IndustriesSection, BelieveSection, ExpertiseSection, ExpertiseStackSection, IndustryDetailSection, TeamThoughtsSection, EventsSection (logo).
- alt hard-coded string (not overridable): HeroSection ("Business meeting"), ExpertiseCtaSection ("Consultation Team"/"Salesforce Astro"), PlatformsSection ("Platform Logo" x all), PartnersSection ("Partner N logo"), ExpertiseCertifiedSection ("Certification N"), IdentityResolutionSection, ExploreSection, TeamGallerySection (good per-photo alts).
- alt always "" for content images: OrganisationTypesSection images, OutcomeCardsSection icons, ExplainerCards plain icons, TrueCost icons, CategoriesSection icons, WhyChoose icons.
- Not next/image (CSS mask or background-image): ExpertiseChallengesSection icons, ExplainerCardsSection tile icons, SolutionTypesSection icons, ComparisonSection tick, BelieveSection card bgImage.
- Fixed width/height (non-fill) content images: PartnersSection 220x100, IndustryCtaSection 659x415, SalesforceConsultCtaSection 647x446, TrueCostSection icons 32x32, CertifiedSection decorative 1236x1385 / 446x474, EventsSection logos (data-driven), WhyChoose icons 70x70. Everything else uses `fill`.
- `unoptimized`: IndustriesSection only.
- All image props are plain `string` paths (no Sanity image object / hotspot / LQIP); a page builder will need a `urlFor()` adapter layer.
