# Static page inventory: src/app/(site)/

All paths relative to `/Users/mujtabakamal/Projects/CRM-Web/src/app/(site)/`.
Site layout (`layout.tsx`) wraps every page in `<main id="main-content" className="overflow-x-clip">`; no per-page layout files exist.

Conventions used below:
- **GLM** = `<GreenLineMark className="..."/>` from `@/components/ui/GreenLineMark`. Two className variants appear:
  - `GLM-h10` = `"inline-block h-10 w-auto align-baseline ml-1"` (hero titles)
  - `GLM-h8`  = `"inline-block h-8 w-auto align-baseline ml-1"` (section headings, some heroes)
  - `GLM-mb2` = `"inline-block -mb-2 ml-1"` (section headings on industry/platform child pages)
- **[RN]** = prop value is a ReactNode/JSX (not a plain string).
- **[COND]** = conditionally rendered.
- **CS-cond** = `{caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title={caseStudies.title} caseStudies={caseStudies.cards} />}`
- **BLOG-cond** = `{blogs.posts.length > 0 && <PageBlogsSection title={blogs.title} posts={blogs.posts} />}`
- **BADGES10** = `images={["/images/certified-badges/1.webp" ... "10.webp"]}` (10 entries, identical everywhere)
- **WRAP-OX** = page root is `<div className="overflow-x-hidden bg-white">` (instead of a fragment). Affects bg + overflow for every section on the page.
- Import note: `CtaSection` on several child pages is imported directly from `@/components/sections/CtaSection` (same component).

Helpers:
- `generateStaticPageMetadata(pageKey, fallback)` from `@/lib/staticPageSeo` (fallback = `{title, description, canonicalPath, image?}`)
- `buildPageMetadata({...})` from `@/lib/seo` (privacy-policy only, as static `export const metadata`)
- JSON-LD: `const jsonLd = await getSitePageJsonLd(key, schema)` from `@/lib/siteJsonLd`, rendered with `<JsonLdScript data={jsonLd} />` as first child. `schema` is always an inline object in the page.
- Data: `getPageBlogs(key)` (`@/lib/pageBlogs`) -> `{title, posts}`; `getPageCaseStudies(key)` (`@/lib/pageCaseStudies`) -> `{title, cards}`.

---

## 1. Home: `page.tsx`

- `export const dynamic = "force-static"` (only page with this)
- Metadata: `generateStaticPageMetadata("home", { title: "ProvidusCRM | Certified Salesforce Partner UK", description: "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.", canonicalPath: "/", image: "/images/salesforce-partner.webp" })`
- JSON-LD: `getSitePageJsonLd("home", schema)`; schema = `@graph` [Organization (#organization, logo, email info@providuscrm.co.uk, address GB, knowsAbout x7), WebSite (#website, publisher ref)]
- Data: `getPageBlogs("home")`, `getPageCaseStudies("home")` (sequential awaits)
- Local constants: `faqs` (4 Q&A)
- `PartnersSection` is loaded via `next/dynamic` (`NextDynamic(() => import("@/components/sections/PartnersSection").then(m => m.PartnersSection))`), the only page doing this.
- Root: fragment

Sections (15 incl. conditional):
1. `<HeroSection />` (no props, all defaults)
2. `<PartnersSection />` (dynamic import)
3. `<CertifiedSection />` (no props)
4. `<WhatWeDoSection />` (no props)
5. `<ExpertiseSection />` (no props)
6. `<IndustriesSection />` (no props)
7. `<PlatformsSection title="Built On Partnerships With the World's Top Platforms" logos={partnerLogos} />` (`partnerLogos` exported from `@/components/sections`)
8. `<WhyChooseSection />` (no props)
9. CS-cond [COND]
10. BLOG-cond [COND]
11. `<EventsSection />`
12. `<PlatformsSection />` (no props: second instance, default title/logos)
13. `<FaqSection title="Frequently Asked Questions" faqs={faqs} />`
14. `<TeamGallerySection />`
15. `<CtaSection />` (no props)

---

## 2. About: `about/page.tsx`

- Metadata: `generateStaticPageMetadata("about", { title: "About Us", description: "Professional Salesforce services grounded in certified expertise from a UK Salesforce partner.", canonicalPath: "/about", image: "/images/about-us-hero.webp" })`
- JSON-LD: `getSitePageJsonLd("about", schema)`; schema = AboutPage + mainEntity Organization
- Data: `getPageBlogs("about")`, `getPageCaseStudies("about")`
- Root: fragment

Sections (10):
1. `<HeroSection title={heroTitle} [RN] description="Professional Salesforce Services Grounded in Certified Expertise" image="/images/about-us-hero.webp" imageClassName="object-contain p-4" />`
   - heroTitle = `Get to Know Your <br/> CRM Experts{" "}<GLM-h10/>`
2. `<PartnersSection />`
3. `<CertifiedSection title="Who We Are" description="We're not a generic Salesforce consultancy... (long string)" />`
4. `<BelieveSection />` (no props)
5. `<PlatformsSection title="Built On Partnerships With the World's Top Platforms" logos={partnerLogos} />`
6. `<TeamThoughtsSection />`
7. CS-cond [COND]
8. `<ExploreSection />`
9. BLOG-cond [COND]
10. `<CtaSection title="Ready to Reinvent Your CRM?" />`

---

## 3. Contact: `contact/page.tsx`

- Metadata: `generateStaticPageMetadata("contact", { title: "Contact Us", description: "Get in touch with ProvidusCRM. Speak to our certified Salesforce experts and CRM consultants today.", canonicalPath: "/contact", image: "/images/hero-bg.webp" })`
- JSON-LD: **none** (no JsonLdScript)
- Data: `getPageBlogs("contact")` only
- Root: fragment

Sections (3):
1. `<ContactSection />`
2. BLOG-cond [COND]
3. `<CtaSection />`

---

## 4. Industries index: `industries/page.tsx`

- Metadata: `generateStaticPageMetadata("industries", { title: "Industries We Serve", description: "Salesforce implementation and CRM consulting for nonprofit, education, commerce, healthcare, financial services, and manufacturing organisations.", canonicalPath: "/industries", image: "/images/industries.webp" })`
- JSON-LD: `getSitePageJsonLd("industries", schema)`; WebPage + about[6 Service]
- Data: `Promise.all([getSitePageJsonLd, getPageCaseStudies("industries"), getPageBlogs("industries")])`
- Root: fragment

Sections (6):
1. `<HeroSection title={heroTitle} [RN] description="Explore how we help businesses across different industries make the most out of their Salesforce investments." image="/images/industries.webp" imageClassName="object-contain" />`; heroTitle = `Industries We Serve{" "}<GLM-h10/>`
2. `<IndustryDetailSection />` (no props)
3. CS-cond [COND]
4. `<PlatformsSection />` (no props)
5. BLOG-cond [COND]
6. `<CtaSection title="Ready to See How Salesforce Fits Your Industry?" />`

---

## 5. `industries/salesforce-commerce-cloud-consulting/page.tsx`

- `const DESCRIPTION` (used in hero, metadata, schema)
- Metadata: `generateStaticPageMetadata("salesforce-commerce-cloud-consulting", { title: "Salesforce Commerce Cloud Consulting & Implementation", description: DESCRIPTION, canonicalPath: "/industries/salesforce-commerce-cloud-consulting", image: "/images/industries/commerce-cloud/hero.webp" })`
- JSON-LD: `getSitePageJsonLd("salesforce-commerce-cloud-consulting", schema)`; Service + provider
- Data: `getPageCaseStudies("salesforce-commerce-cloud-consulting")`, `getPageBlogs("salesforce-commerce-cloud-consulting")`
- Local constants: `whyChoose: WhyChooseReason[]` (3 items: title,color,icon,text)
- Root: fragment (NOT WRAP-OX)

Sections (12):
1. `<HeroSection subtitle="Salesforce Commerce Cloud Consulting & Implementation" subtitleAsH1 title={[RN] "Custom CRM Solutions<br/>for 3X Retail Growth{" "}<GLM-h10/>"} description={DESCRIPTION} bullets={[3 strings]} image="/images/industries/commerce-cloud/hero.webp" />`
2. `<PartnersSection />`
3. CS-cond [COND]
4. `<SplitComparisonSection heading="What You Need to Ask Before Any Salesforce Commerce Cloud Implementation" subtitle="..." cards={[4 x {title(string), color hex (#33FF00,#308FFF,#FFA530,#8800FF), text}]} />`
5. `<WhatWeDoSection title="Our Salesforce Commerce Cloud Services" tabs={[6 x {id,label,content:{heading,text(with \n\n),bullets[]}}]} />` (no backgroundOverlayColor)
6. `<ExpertiseCtaSection title="Book A CRM Audit For Your Store" buttonText="Let's Connect" buttonHref="/contact" image1="/images/platform-expertise/expertise-cta-1.webp" image2="/images/platform-expertise/expertise-cta-2.webp" />`
7. `<ExpertisePlatformsSection title="Our Platform Expertise Beyond Salesforce Commerce Cloud" items={[6 x {title,text,icon,bgGradient}]} />`
8. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Salesforce Consulting Partner" customReasons={whyChoose} image="/images/industries/commerce-cloud/why-choose.webp" imageAlt="Consultant reviewing store performance on a tablet" />` (no backgroundOverlayColor)
9. `<CertifiedSection title="Certified Salesforce Expertise You Can Count On" description="..." />`
10. `<FaqSection title="Frequently Asked Questions" faqs={[8 Q&A inline]} />`
11. BLOG-cond [COND]
12. `<CtaSection title="Connect With Our Salesforce Consultants Today!" backgroundImage="/images/cta-bg.webp" />`

---

## 6. `industries/salesforce-education-cloud-consulting/page.tsx`

- `const DESCRIPTION`
- Metadata: `generateStaticPageMetadata("salesforce-education-cloud-consulting", { title: "Salesforce Education Cloud Consulting & Implementation", description: DESCRIPTION, canonicalPath: "/industries/salesforce-education-cloud-consulting", image: "/images/industries/education-cloud/hero.webp" })`
- JSON-LD: `getSitePageJsonLd("salesforce-education-cloud-consulting", schema)`; Service + serviceType + areaServed GB + provider
- Data: `getPageBlogs("salesforce-education-cloud-consulting")` only. **No getPageCaseStudies, no case-studies section.**
- Local constants: `challenges` (3: title,icon,text), `institutions` (4: title, paragraphs[1]), `whyChoose` (4: title,color,icon,text; one color literal `#C08A2E`)
- Root: fragment

Sections (15):
1. `<HeroSection subtitle="Salesforce Education Cloud Consulting & Implementation" subtitleAsH1 title={[RN] "One Student<br/>Record, Not Multiple<br/>Disconnected Systems{" "}<GLM-h10/>"} description={DESCRIPTION} bullets={[4]} image="/images/industries/education-cloud/hero.webp" />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection hideCta heading={[RN] "Is Your Student Data Spread Across Disparate Systems &amp; Sheets?{" "}<GLM-h8/>"} paragraphs={[1 string]} />`  <- **hideCta boolean**
4. `<ExpertiseChallengesSection items={challenges} />`
5. `<WhatWeDoSection title="Our Salesforce Education Cloud Services" tabs={[7 tabs]} />` (no overlay)
6. `<ExpertiseCtaSection title="Not Sure How Much Of Your Student Data Is Actually Connected?" buttonText="Book A Free Consultation" buttonHref="/contact" image1=".../expertise-cta-1.webp" image2=".../expertise-cta-2.webp" />`
7. `<ExpertiseSalesforceSection heading="Salesforce Consulting Services That Secure Your CRM Investments" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
8. `<ExpertiseCertifiedSection BADGES10 />`
9. `<ExpertisePlatformsSection title="Our Platform Expertise Beyond Salesforce Education Cloud" items={[6]} />`
10. `<OrganisationTypesSection title="Institutions We Work With" subtitle="..." items={institutions} images={["/images/industries/education-cloud/institutions-1.webp", ".../institutions-2.webp"]} />`
11. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Education Cloud Consulting & Implementation Partner" customReasons={whyChoose} image="/images/industries/education-cloud/why-choose.webp" imageAlt="Student working on a laptop outdoors" />`
12. `<CertifiedSection title="Certified Expertise and Experience Across Industries" description="..." />`
13. `<FaqSection title="Frequently Asked Questions" faqs={[5 inline]} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Connect With Our Salesforce Consultants Today!" backgroundImage="/images/cta-bg.webp" />`

---

## 7. `industries/salesforce-financial-services-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-financial-services-cloud-consulting", { title: "Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK", description: "Certified Salesforce Financial Services Cloud consultants in the UK. We model households, ...", canonicalPath: "/industries/salesforce-financial-services-cloud-consulting" })` **no image**
- JSON-LD: `getSitePageJsonLd("salesforce-financial-services-cloud-consulting", schema)`; Service + provider
- Data: `getPageCaseStudies(...same key)`, `getPageBlogs(...same key)`
- Local constants: none (everything inline)
- Root: **WRAP-OX**

Sections (14):
1. `<SalesforceServiceHero badgeTitle="Certified" badgeSubtitle="Salesforce Partner in the UK" kicker="Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK" title="One Household Record, Zero Disconnected Accounts" (string) description="..." bullets={[4]} formTitle="Fill a form today" formButtonLabel="Let's Connect" />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "Where Financial Client Data Breaks Down{" "}<GLM-mb2/>"} paragraphs={[3]} />` (CTA shown, no hideCta)
4. `<ExpertiseChallengesSection items={[3 x {title,text,icon "/images/platform-expertise/Mask group (N).webp"}]} />`
5. `<WhatWeDoSection title="Salesforce Financial Services Cloud Solutions & Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
6. CS-cond [COND]
7. `<IndustryCtaSection title="Not sure if your current setup is seeing the household? Talk to a consultant." buttonLabel="Let's Connect" buttonHref="/contact" image="/images/industries-pages/industry-cta-1.png" />`
8. `<ExpertisePlatformsSection title="Our Salesforce Platform Expertise Beyond Financial Services Cloud" items={[6]} />`
9. `<OrganisationTypesSection title="What Makes ProvidusCRM Stand Out As A Salesforce Financial Services Cloud Partner" items={[3 x {title, paragraphs[1]}]} images={["/images/industries/in-finance-types.png"]} />` (no subtitle; single image)
10. `<ExpertiseSalesforceSection heading="On-Demand, Certified Salesforce FSC Talent At Your Service" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
11. `<ExpertiseCertifiedSection BADGES10 />`
12. `<FaqSection title="Frequently Asked Questions" faqs={[10 inline]} />`
13. BLOG-cond [COND]
14. `<CtaSection title="Connect With Our Salesforce Financial Services Cloud Consultants Today!" buttonLabel="Let's Connect" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

(No WhyChooseSection on this page.)

---

## 8. `industries/salesforce-health-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-health-cloud-consulting", { title: "Salesforce Health Cloud Consultant & Implementation Partner in the UK", description: "Certified Salesforce Health Cloud consultants in the UK. ...", canonicalPath: "/industries/salesforce-health-cloud-consulting" })` **no image**
- JSON-LD: `getSitePageJsonLd("salesforce-health-cloud-consulting", schema)`
- Data: case studies + blogs, same key
- Root: **WRAP-OX**

Sections (15):
1. `<SalesforceServiceHero badgeTitle="Certified" badgeSubtitle="Salesforce Partner in the UK" kicker="Salesforce Health Cloud Consultant & Implementation Partner in the UK" title="Patient Data Synced Across Your Systems With Salesforce Health Cloud" description="..." bullets={[4]} formTitle="Fill a form today" formButtonLabel="Let's Connect" />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "Where Your Patient Data Is Getting Lost{" "}<GLM-mb2/>"} paragraphs={[3]} />`
4. `<ExpertiseChallengesSection items={[3, Mask group icons]} />`
5. `<WhatWeDoSection title="Salesforce Health Cloud Solutions & Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
6. CS-cond [COND]
7. `<IndustryCtaSection title="Not sure if your current setup meets NHS DSPT and UK GDPR standards?" buttonLabel="Talk to a Consultant" buttonHref="/contact" image="/images/industries-pages/industry-cta-1.png" />`
8. `<ExpertisePlatformsSection title="Beyond Health Cloud: Explore ProvidusCRM's Expertise Across The Salesforce Platform" items={[6]} />`
9. `<OrganisationTypesSection title="Types of Organisations We Build & Deliver Health Cloud Solutions For" items={[5 x {title, paragraphs[2]}]} images={["/images/industries-pages/industy-types-1.png", "/images/industries-pages/industy-types-2.png"]} />`
10. `<ExpertiseSalesforceSection heading="Work With Certified, Experienced Salesforce Health Cloud Consultants in the UK" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
11. `<ExpertiseCertifiedSection BADGES10 />`
12. `<WhyChooseSection title="What Makes ProvidusCRM a Trusted Salesforce Health Cloud Partner" customReasons={[4 inline; 4th color "var(--color-explore-teal)", icon "/images/consult.webp"]} image="/images/industries-pages/i-why-choose-health.jpg" backgroundOverlayColor="#616161" />`
13. `<FaqSection title="Frequently Asked Questions" faqs={[10 inline]} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Ready to connect your patient data across every system?" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 9. `industries/salesforce-nonprofit-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-nonprofit-consulting", { title: "Salesforce Nonprofit Consulting & Implementation Partner", description: "Certified Salesforce Nonprofit Cloud and NPSP consultants in the UK. ...", canonicalPath: "/industries/salesforce-nonprofit-consulting" })` **no image**
- JSON-LD: `getSitePageJsonLd("salesforce-nonprofit-consulting", schema)`
- Data: case studies + blogs, same key
- Root: **WRAP-OX**

Sections (16):
1. `<SalesforceServiceHero badgeTitle="Certified" badgeSubtitle="Salesforce Partner in the UK" kicker="Salesforce Nonprofit Consulting & Implementation Partner" title="Your Fundraising, Programme & Grant Data In One Place" description="..." bullets={[4]} formTitle="Fill a form today" formButtonLabel="Let's Connect" />`
2. `<PartnersSection />`
3. `<TrueCostSection heading={[RN] "What&rsquo;s The True Cost of Salesforce for Nonprofits{" "}<GLM-mb2/>"} subtitle="..." intro={[3 strings]} cards={[2 x {title,text(\n\n),bullets?[],background:"var(--color-cost-card-green|blue)",iconColor:"var(--color-brand-green)"|"var(--color-cost-icon-blue)",icon:"/images/salesforce-power.svg"|"/images/non-profit-imp.svg"}]} panelTitle="Simplifying Salesforce for Nonprofits" highlights={[6 x {label,text}]} />`  <- **only page using TrueCostSection**
4. `<ComparisonSection heading={[RN] "DIY Implementation vs Certified Salesforce Nonprofit Cloud Partner{" "}<GLM-mb2/>"} subtitle="..." negativeTitle="What DIY Implementation Costs" negativeItems={[6]} positiveTitle="What ProvidusCRM Brings" positiveItems={[6]} footnote="..." buttonLabel="Book a Call" buttonHref="/contact" />`  <- **only page using ComparisonSection**
5. CS-cond [COND]
6. `<WhatWeDoSection title="Salesforce Nonprofit Cloud Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
7. `<IndustryCtaSection title="Schedule a consultation with our certified Salesforce Nonprofit Cloud consultants." buttonLabel="Let's Connect" buttonHref="/contact" image="/images/industries-pages/industry-cta-1.png" />`
8. `<ExpertisePlatformsSection title="Our Salesforce Expertise Beyond Nonprofit Cloud" items={[6]} />`
9. `<SolutionTypesSection heading="Solutions We've Delivered For Different Types of Nonprofits" subtitle="..." cards={[5 x {title,text,icon:"/images/industries-pages/nonprofit-types/*.png",color:"var(--color-brand-green|type-teal|type-purple|type-magenta|type-amber)"}]} />`  <- **only page using SolutionTypesSection**
10. `<ExpertiseSalesforceSection heading="You Can Count On Our Certified Salesforce Nonprofit Cloud Expertise" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
11. `<ExpertiseCertifiedSection BADGES10 />`
12. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Salesforce Nonprofit Cloud Partner" customReasons={[3 inline]} image="/images/platform-expertise/expertise-choose.webp" backgroundOverlayColor="#616161" />`
13. `<FaqSection title="Frequently Asked Questions" faqs={[10 inline]} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Bring Your Nonprofit to Salesforce With ProvidusCRM" buttonLabel="Let's Connect" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 10. Partnership index: `partnership/page.tsx`

- Metadata: `generateStaticPageMetadata("partnership", { title: "Partnership", description: "Certified Salesforce expertise backed by a wider partner ecosystem — FinDock, FundraiseUp, Dotdigital, and the platforms we build on.", canonicalPath: "/partnership", image: "/images/partnership-hero.webp" })`
- JSON-LD: `getSitePageJsonLd("partnership", schema)`; AboutPage + Organization
- Data: `getPageBlogs("partnership")`, `getPageCaseStudies("partnership")`
- Local constants: `partnershipCards` (4 x {title, description, icon "/images/partnership-logos/*.png", href? (3 of 4: /partnership/findock, /partnership/fundraise-up, /partnership/dotdigital; Salesforce card has none), bgImage "/images/*-bg.webp"}); `partnershipPlatformLogos` (12 logo paths)
- Root: fragment

Sections (8):
1. `<HeroSection title={[RN] "Our Certified Expertise{" "}<br/>& Partner Ecosystem{" "}<GLM-h10/>"} description="Certified Salesforce experts working alongside the platforms and partners that make CRM strategies whole." image="/images/partnership-hero.webp" imageClassName="object-contain p-4" />`
2. `<PartnersSection />`
3. `<CertifiedSection title="Certified Salesforce Expertise You Can Count On" description="..." />`
4. `<BelieveSection title="Our Partnerships" cards={partnershipCards} />`
5. CS-cond [COND]
6. `<PlatformsSection title="Platforms We Work With" logos={partnershipPlatformLogos} />`
7. BLOG-cond [COND]
8. `<CtaSection title="Ready To Talk About Your CRM Needs?" />`

---

## 11. `partnership/dotdigital/page.tsx`

- `const DESCRIPTION`
- Metadata: `generateStaticPageMetadata("partnership-dotdigital", { title: "Dotdigital Implementation Partner", description: DESCRIPTION, canonicalPath: "/partnership/dotdigital", image: "/images/dotdigital/hero-visual.webp" })`
- JSON-LD: `getSitePageJsonLd("partnership-dotdigital", schema)`; Service + serviceType + areaServed GB
- Data: `getPageBlogs("partnership-dotdigital")` only (no case studies)
- Local constants:
  - `helpCards` (3 x {title, icon webp, text, cta:{label, href:"/contact"}})
  - `marketingProcess` (4 x {title [RN] with `<br/>`, color hex, text})
  - `steps` (5 x {title, icon: **lucide-react component** (ClipboardList/Workflow/Cog/FileCheck2/HeartHandshake), colorTheme "blue"|"green"|"yellow"|"peach"|"pink", description})
- Root: fragment

Sections (8):
1. `<HeroSection subtitle="Dotdigital Implementation Partner" subtitleAsH1 title={[RN] "Make Dotdigital<br/>&amp; Salesforce Work Better Together{" "}<GLM-h10/>"} description={DESCRIPTION} image="/images/dotdigital/hero-visual.webp" imageClassName="object-contain p-4" ctaLabel="Discuss Your Project" ctaHref="/contact" ctaVariant="filled" ctaSize="sm" />`
2. `<PartnersSection />`
3. `<ExplainerCardsSection heading="What Do You Need Help With?" cards={helpCards} iconVariant="plain" />`
4. `<SplitComparisonSection heading="One Connected Marketing Process" cards={marketingProcess} className="bg-linear-to-b from-white to-brand-blue-light" />`  <- **className bg override**, card titles [RN]
5. `<ServiceBenefitsSection title="How We Implement Dotdigital" items={steps} />` (icon = component ref, not iconKey)
6. `<ExpertiseSalesforceSection heading={[RN] "Why Work With<br/>ProvidusCRM?{" "}<GLM-h8/>"} hideMark paragraphs={[2]} image="/images/dotdigital-image.webp" imageAlt="ProvidusCRM consultants reviewing a Dotdigital and Salesforce setup" imageVariant="framed-wide" />`  <- **hideMark, imageVariant, paragraphs (vs text)**
7. BLOG-cond [COND]
8. `<CtaSection title="Ready to Connect Dotdigital With Salesforce?" />`

---

## 12. `partnership/findock/page.tsx`

- `const DESCRIPTION`
- Metadata: `generateStaticPageMetadata("partnership-findock", { title: "FinDock Implementation and Consulting Partner", description: DESCRIPTION, canonicalPath: "/partnership/findock", image: "/images/findock/hero-visual.webp" })`
- JSON-LD: `getSitePageJsonLd("partnership-findock", schema)`
- Data: `getPageBlogs("partnership-findock")` only
- Local constants: `outcomes` (4 x {title with "\n", icon, text}), `coverage` (4 x {title,color (one hex #A9714B),icon,text}), `steps` (5, lucide icons + colorTheme), `whyProvidus` (4 x {title [RN] with <br/>, color hex, text})
- Root: fragment

Sections (10):
1. `<HeroSection subtitle="FinDock Implementation and Consulting Partner" subtitleAsH1 title={[RN] "Manage Donations and Payments Inside Salesforce{" "}<GLM-h10/>"} description={DESCRIPTION} image="/images/findock/hero-visual.webp" imageClassName="object-contain p-4" ctaLabel="Book a FinDock Consultation" ctaHref="/contact" ctaVariant="filled" ctaSize="sm" />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "When Salesforce Doesn&rsquo;t Hold the Full Payment Story{" "}<GLM-h8/>"} paragraphs={[3]} />`
4. `<OutcomeCardsSection cards={outcomes} />`
5. `<ExpertiseSalesforceSection heading={[RN] "Build One Connected<br/>Payment Process{" "}<GLM-h8/>"} hideMark paragraphs={[4]} image="/images/findock/connected-process.webp" imageAlt="Two colleagues reviewing payment paperwork together" imageVariant="framed" ctaLabel="Plan Your FinDock Setup" ctaHref="/contact" />`
6. `<WhyChooseSection title="What Our FinDock Implementation Covers" customReasons={coverage} image="/images/findock/implementation.webp" imageAlt="Consultants reviewing a FinDock payment setup in Salesforce" />`
7. `<ServiceBenefitsSection title="How We Implement FinDock" items={steps} />`
8. `<SplitComparisonSection heading="Why Work With ProvidusCRM?" subtitle="..." cards={whyProvidus} className="bg-linear-to-b from-white to-brand-blue-light" />`  <- **className override**
9. BLOG-cond [COND]
10. `<CtaSection title="Bring Payment Management Into Salesforce" buttonLabel="Book a FinDock Consultation" />` (no href: default)

---

## 13. `partnership/fundraise-up/page.tsx`

- `const DESCRIPTION`
- Metadata: `generateStaticPageMetadata("partnership-fundraise-up", { title: "Fundraise Up Implementation Partner", description: DESCRIPTION, canonicalPath: "/partnership/fundraise-up", image: "/images/fundraiseup/hero-visual.webp" })`
- JSON-LD: `getSitePageJsonLd("partnership-fundraise-up", schema)`
- Data: `getPageBlogs("partnership-fundraise-up")` only
- Local constants: `outcomes` (2), `integrations` (3 x {title,color,icon,text}), `steps` (5, lucide), `whyProvidus` (3, [RN] titles, hex colors)
- Root: fragment

Sections (9):
1. `<HeroSection subtitle="Fundraise Up Implementation" subtitleAsH1 title={[RN] "Turn Online Donations Into Reliable Salesforce Data{" "}<GLM-h10/>"} description={DESCRIPTION} image="/images/fundraiseup/hero-visual.webp" imageClassName="object-contain p-4" ctaLabel="Book a Fundraise Up Consultation" ctaHref="/contact" ctaVariant="filled" ctaSize="sm" />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "The Donation Form Is Only Half of the Setup{" "}<GLM-h8/>"} paragraphs={[3]} />`
4. `<OutcomeCardsSection cards={outcomes} />`
5. `<WhyChooseSection title="Choose the Right Fundraise Up Salesforce Integration" customReasons={integrations} image="/images/fundraiseup/integration-image.webp" imageAlt="Fundraising manager reviewing donation data in Salesforce" />`
6. `<ServiceBenefitsSection title="From Requirements to a Successful Fundraise Up Implementation" items={steps} />`
7. `<SplitComparisonSection heading="Why Work With ProvidusCRM?" subtitle="..." cards={whyProvidus} className="bg-linear-to-b from-white to-brand-blue-light" />`  <- **className override**
8. BLOG-cond [COND]
9. `<CtaSection title="Plan Fundraise Up and Salesforce Together" />`

---

## 14. Platform expertise index: `platform-expertise/page.tsx`

- Metadata: `generateStaticPageMetadata("platform-expertise", { title: "Certified Platform Expertise", description: "Certified Salesforce Platform expertise across Sales Cloud, ...", canonicalPath: "/platform-expertise", image: "/images/platform-experties.webp" })`
- JSON-LD: `getSitePageJsonLd("platform-expertise", schema)`; WebPage + about[7 Service]
- Data: blogs + case studies, key "platform-expertise"
- Root: fragment

Sections (6):
1. `<HeroSection title={[RN] "Certified Platform Expertise Across Every Salesforce Cloud{" "}<GLM-h10/>"} description="Whether it is sales pipeline management or autonomous AI agents, ..." image="/images/platform-experties.webp" imageClassName="object-contain" />`
2. `<PartnersSection />`
3. CS-cond [COND]
4. `<ExpertiseStackSection />` (no props)
5. BLOG-cond [COND]
6. `<CtaSection title="Drive CRM Innovation For Your Organisation" />`

---

## 15. `platform-expertise/salesforce-agentforce-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-agentforce-consulting", { title: "Salesforce Agentforce Consulting | ProvidusCRM", description: "Salesforce Agentforce Consulting Services", canonicalPath: "/platform-expertise/salesforce-agentforce-consulting" })` no image (note: title fallback already contains "| ProvidusCRM"; placeholder-ish description)
- JSON-LD: `getSitePageJsonLd("salesforce-agentforce-consulting", schema)`
- Data: case studies + blogs, same key
- Root: **WRAP-OX**

Sections (13):
1. `<HeroSection title={[RN] "Automate Your Workflows with Agentforce & ProvidusCRM<GLM-h10/>"} (note: NO {" "} before mark) subtitle="Agentforce Consulting & Implementation" subtitleAsH1 description="..." image="/images/platform-expertise/agentforce-hero.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. CS-cond [COND]
4. `<ExplainerCardsSection heading="What Agentforce Is (And What It Isn't)" cards={[3 x {title [RN] with <br/>, text, icon "/images/platform-expertise/agentforce-what-is/*-icon.png"}]} />` (no iconVariant, no cta per card)
5. `<WhatWeDoSection title="Start With A Pre-Built Agent and Customise" tabs={[5]} backgroundOverlayColor="#616161" />`
6. `<ExpertiseCtaSection title="Discuss Your CRM Automation Goals With Our Certified Agentforce Specialists and Consultants." buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
7. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Salesforce Agentforce Partner?" customReasons={[3]} image="/images/platform-expertise/why-choose-agentforce.webp" backgroundOverlayColor="#616161" />`
8. `<ServiceBenefitsSection title="How Our Salesforce Consulting Services Help You" items={[4 x {title, description, iconKey:"roi"|"adoption"|"maturity"|"view360", colorTheme:"blue"|"green"|"yellow"|"peach"}]} />`  <- **iconKey strings (serialisable) vs lucide component refs on partnership pages**
9. `<ExpertisePlatformsSection title="Our Platform Expertise" items={[6, incl. Revenue Cloud icon "/images/revenue-cloud.webp"]} />`
10. `<ExpertiseImplementationSection heading={[RN] <>How We Setup Agentforce Across Industries</>} items={[4 x {title,text,image}]} />`  <- heading wrapped in fragment (no GLM)
11. `<FaqSection title="Frequently Asked Questions" faqs={[5]} />`
12. BLOG-cond [COND]
13. `<CtaSection title="Automate Your Workflows With ProvidusCRM" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 16. `platform-expertise/salesforce-data-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-data-cloud-consulting", { title: "Salesforce Data Cloud Consulting | ProvidusCRM", description: "Salesforce Data Cloud Consulting Services", canonicalPath: "/platform-expertise/salesforce-data-cloud-consulting" })` no image
- JSON-LD: `getSitePageJsonLd("salesforce-data-cloud-consulting", schema)`
- Data: blogs + case studies, same key
- Unused import: `Fragment` from react
- Root: **WRAP-OX**

Sections (17):
1. `<HeroSection title={[RN] "Salesforce Data Cloud Consulting{" "}<GLM-h10/>"} subtitle="Salesforce Data Cloud Consulting & Implementation Partner" subtitleAsH1 description="..." image="/images/platform-expertise/data-cloud-hero.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "Data Cloud Delivers What Your Setup Around It Allows{" "}<GLM-mb2/>"} paragraphs={[3]} />`
4. `<ExpertiseFeaturesSection features={[3 x {title (with \n), description, icon Mask group}]} />`
5. `<ExpertiseSalesforceSection heading="Count On Our Certified Salesforce Data Cloud Prowess" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
6. `<ExpertiseCertifiedSection BADGES10 />`
7. `<WhatWeDoSection title="Salesforce Data Cloud Services & Solutions We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
8. CS-cond [COND]
9. `<ExpertiseCtaSection title="Still struggling to have a single source of truth for your customer data? Reach out to our team today!" buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
10. `<ExpertisePlatformsSection title="Our End-to-End Salesforce Platform Expertise" items={[6]} />`
11. `<IdentityResolutionSection />` (no props; only page using it)
12. `<WhyChooseSection title="Why Choose ProvidusCRM For Salesforce Data Cloud Consulting" customReasons={[3]} image="/images/platform-expertise/data-cloud-why-choose.webp" backgroundOverlayColor="#616161" />`
13. `<SplitComparisonSection heading="Data Cloud vs Your Data Warehouse, Do You Need Both?" cards={[4; first 3 titles [RN] with <br/>, 4th plain string "The Common Mistake"; colors #33FF00,#308FFF,#8800FF,#FFB030]} />` (no subtitle, no className)
14. `<ExpertiseImplementationSection heading={[RN] <>Industries We Impact</>} items={[6]} />`
15. `<FaqSection title="Frequently Asked Questions" faqs={[8]} />`
16. BLOG-cond [COND]
17. `<CtaSection title="Transform Your Data Strategy Today" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 17. `platform-expertise/salesforce-experience-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-experience-cloud-consulting", { title: "Salesforce Experience Cloud Consulting | ProvidusCRM", description: "Salesforce Experience Cloud Consulting Services", canonicalPath: "/platform-expertise/salesforce-experience-cloud-consulting" })`
- JSON-LD: `getSitePageJsonLd("salesforce-experience-cloud-consulting", schema)`
- Data: case studies + blogs
- Unused import: `Fragment`
- Root: **WRAP-OX**

Sections (14):
1. `<HeroSection title={[RN] "Intuitive Portals Connected To Your Data{" "}<GLM-h10/>"} subtitle="Salesforce Experience Cloud Consulting & Implementation Partner" subtitleAsH1 description="..." image="/images/platform-expertise/pe-cloud-consult.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "Why Most Portals Fail To Deliver Value{" "}<GLM-mb2/>"} paragraphs={[2]} />`
4. `<ExpertiseFeaturesSection features={[3 (long question-style titles)]} />`
5. `<WhatWeDoSection title="Salesforce Experience Cloud Solutions & Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
6. CS-cond [COND]
7. `<ExpertiseCtaSection title="Connect with our consultant to get the best-aligned Experience Cloud solution." buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
8. `<ExpertiseSalesforceSection heading="Certified & Experienced Salesforce Experience Cloud Talent" text="..." image="/images/platform-expertise/salesforce-partner.webp" />`
9. `<ExpertiseCertifiedSection BADGES10 />`
10. `<ExpertiseImplementationSection heading={[RN] <>Industries We Serve</>} items={[4, text with \n\n]} />`
11. `<WhyChooseSection title="What Makes ProvidusCRM A Leading Salesforce Experience Cloud Partner" customReasons={[3]} image="/images/platform-expertise/expertise-choose.webp" backgroundOverlayColor="#616161" />`
12. `<FaqSection title="Frequently Asked Questions" faqs={[10]} />`
13. BLOG-cond [COND]
14. `<CtaSection title="Transform Your Data Strategy Today" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />` (same title as Data Cloud page: likely copy-paste)

(No ExpertisePlatformsSection on this page.)

---

## 18. `platform-expertise/salesforce-marketing-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-marketing-cloud-consulting", { title: "Salesforce Marketing Cloud Consulting | ProvidusCRM", description: "Salesforce Marketing Cloud Consulting Services", canonicalPath: "/platform-expertise/salesforce-marketing-cloud-consulting" })`
- JSON-LD: `getSitePageJsonLd("salesforce-marketing-cloud-consulting", schema)`
- Data: case studies + blogs
- Root: **WRAP-OX**

Sections (15):
1. `<HeroSection title={[RN] "Make Every Campaign Convert With Salesforce Marketing Cloud{" "}<GLM-h10/>"} subtitle="Certified Salesforce Marketing Cloud Consultants" subtitleAsH1 description="..." image="/images/platform-expertise/pr-marketing-cloud-hero.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "Marketing Cloud is Powerful. But Is Yours Working?{" "}<GLM-mb2/>"} paragraphs={[1]} />`
4. `<ExpertiseChallengesSection items={[3, titles with \n]} />`
5. `<WhatWeDoSection title="Salesforce Marketing Cloud Solutions & Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
6. CS-cond [COND]
7. `<ExpertiseCtaSection title="Reach Out To ProvidusCRM's Salesforce Marketing Cloud Consultants To Discuss Your Initiatives And Challenges." buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
8. `<ExpertiseSalesforceSection heading="We're a Team of Certified Marketing Cloud Consultants & Implementation Experts" text="..." image=".../salesforce-partner.webp" />`
9. `<ExpertiseCertifiedSection BADGES10 />`
10. `<ExpertisePlatformsSection title="Explore Our Expertise Across The Salesforce Ecosystem" items={[6]} />`
11. `<ExpertiseImplementationSection heading={[RN] <>Industries We Deliver Marketing Cloud Solutions For</>} items={[6]} />`
12. `<WhyChooseSection title="What Makes ProvidusCRM The Perfect Choice For Marketing Cloud Consulting" customReasons={[3]} image="/images/platform-expertise/expertise-choose.webp" backgroundOverlayColor="#616161" />`
13. `<FaqSection title="Frequently Asked Questions" faqs={[6]} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Reach Out To Our Marketing Cloud Consultants" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 19. `platform-expertise/salesforce-sales-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-sales-cloud-consulting", { title: "Salesforce Sales Cloud Consulting | ProvidusCRM", description: "Salesforce Sales Cloud Consulting Services", canonicalPath: "/platform-expertise/salesforce-sales-cloud-consulting" })`
- JSON-LD: `getSitePageJsonLd("salesforce-sales-cloud-consulting", schema)`
- Data: case studies + blogs
- Unused import: `Fragment`
- Root: **WRAP-OX**

Sections (15):
1. `<HeroSection title={[RN] "Get More Out Of Salesforce Sales Cloud{" "}<GLM-h10/>"} subtitle="Salesforce Sales Cloud Consulting & Implementation" subtitleAsH1 description="..." image="/images/platform-expertise/pe-cloud-hero.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. `<ExpertiseDescriptionSection heading={[RN] "You Invested in Sales Cloud, But Was It Worth It?{" "}<GLM-mb2/>"} paragraphs={[3]} />`
4. `<ExpertiseFeaturesSection features={[3, titles with \n]} />`
5. `<WhatWeDoSection title="Salesforce Sales Cloud Solutions & Services We Offer" tabs={[6]} backgroundOverlayColor="#616161" />`
6. CS-cond [COND]
7. `<ExpertiseCtaSection title="Connect With Our Salesforce Sales Cloud Consultants To Discuss Your Challenges And Goals." buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
8. `<ExpertiseSalesforceSection heading="We're a Certified Salesforce Sales Cloud Consulting & Implementation Partner" text="..." image=".../salesforce-partner.webp" />`
9. `<ExpertiseCertifiedSection BADGES10 />`
10. `<ExpertisePlatformsSection title="Explore Our Expertise Across The Salesforce Ecosystem" items={[6]} />`
11. `<ExpertiseImplementationSection heading={[RN] <>Industries We Impact</>} items={[6]} />`
12. `<WhyChooseSection title="Why Implement Salesforce Sales Cloud With ProvidusCRM" customReasons={[3]} image="/images/platform-expertise/expertise-choose.webp" backgroundOverlayColor="#616161" />`
13. `<FaqSection title="Frequently Asked Questions" faqs={[8]} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Transform Your Sales Process Today" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

---

## 20. `platform-expertise/salesforce-service-cloud-consulting/page.tsx`

- Metadata: `generateStaticPageMetadata("salesforce-service-cloud-consulting", { title: "Salesforce Service Cloud Consulting | ProvidusCRM", description: "Salesforce Service Cloud Consulting Services", canonicalPath: "/platform-expertise/salesforce-service-cloud-consulting" })`
- JSON-LD: `getSitePageJsonLd("salesforce-service-cloud-consulting", schema)`
- Data: case studies + blogs
- Root: **WRAP-OX**

Sections (13):
1. `<HeroSection title={[RN] "Route Cases Correctly.<br/>Report On Them Honestly.{" "}<GLM-h10/>"} subtitle="Salesforce Service Cloud Consulting & Implementation" subtitleAsH1 description="..." image="/images/platform-expertise/pr-service-cloud-hero.webp" bullets={[4]} />`
2. `<PartnersSection />`
3. `<ExpertiseSalesforceSection heading="Certified Salesforce Service Cloud Expertise You Can't Go Wrong With" text="..." image=".../salesforce-partner.webp" />`
4. `<ExpertiseCertifiedSection BADGES10 />`
5. CS-cond [COND]
6. `<WhatWeDoSection title="Salesforce Service Cloud Services & Solutions We Offer" tabs={[5]} backgroundOverlayColor="#616161" />`
7. `<ExpertiseCtaSection title="Reinvent Your Support Workflows With Our Salesforce Service Cloud Consultants." buttonText="Let's Connect" buttonHref="/contact" image1=... image2=... />`
8. `<ExpertisePlatformsSection title="Our Expertise Beyond Salesforce Service Cloud" items={[6]} />`
9. `<ExpertiseImplementationSection heading={[RN] <>Industries We Impact</>} items={[4]} />`
10. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Salesforce Service Cloud Partner?" customReasons={[3]} image="/images/platform-expertise/expertise-choose.webp" backgroundOverlayColor="#616161" />`
11. `<FaqSection title="Frequently Asked Questions" faqs={[9]} />`
12. BLOG-cond [COND]
13. `<CtaSection title="Reinvent Your Support Workflows With ProvidusCRM" buttonLabel="Talk to an Expert" buttonHref="/contact" backgroundImage="/images/cta-bg.webp" />`

(No ExpertiseDescriptionSection / Features / Challenges on this page.)

---

## 21. Privacy policy: `privacy-policy/page.tsx`

- Metadata: **static** `export const metadata = buildPageMetadata({ title: "Privacy Policy", description: "How ProvidusCRM collects, uses, shares and protects personal data under UK GDPR, and the rights you have over it.", canonicalPath: "/privacy-policy" })` (no pageKey, no Sanity override, no image)
- JSON-LD: none
- Data: none
- Local helpers: `EMAIL = "connect@providuscrm.co.uk"`, `<Email/>` mailto link component, `H2` (`<Heading as="h2" level="h4" className="mt-12 mb-4 text-black">`), `P` (`<Text variant="p3" className="mb-4 text-gray-700">`)

**Entire page is INLINE JSX (no section components):**
- `<Section background="white" className="py-16 md:py-24"><Container><article className="mx-auto max-w-3xl">`
  - `<Heading as="h1" level="h2" className="text-black">Privacy Policy</Heading>`
  - `<Text variant="p3" className="mt-4 font-semibold text-gray-700">Last updated: 24-06-2026</Text>`
  - 10 numbered H2 sections with P paragraphs; one `<address className="mb-4 not-italic">` (multi-line postal address with <br/>), one `<ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">` with 4 `<li>` containing `<strong>` lead-ins, inline links (mailto, https://ico.org.uk target=_blank, tel:03031231113), closing `<address className="mt-10 not-italic">`.
- Migration: best as a single rich-text (Portable Text) "legal/prose" section with Section bg white + py-16 md:py-24 + max-w-3xl article.

---

## 22. Salesforce recruitment agency: `salesforce-recruitment-agency/page.tsx` (729 lines)

- `const DESCRIPTION`
- Metadata: `generateStaticPageMetadata("staff-augmentation", { title: "Staff Augmentation Services", description: DESCRIPTION, canonicalPath: "/salesforce-recruitment-agency", image: "/images/staff-augmentation/hero.webp" })`  <- **pageKey "staff-augmentation" differs from route slug**
- JSON-LD: `getSitePageJsonLd("staff-augmentation", schema)`; Service + serviceType "Staff Augmentation" + areaServed GB
- Data: `getPageCaseStudies("staff-augmentation")` with **fallback**: `caseStudyCards = caseStudies.cards.length > 0 ? caseStudies.cards : FALLBACK_CASE_STUDIES` (so case-studies section is ALWAYS rendered, not conditional); `getPageBlogs("staff-augmentation")`
- Local constants:
  - `FALLBACK_CASE_STUDIES: ServiceCaseStudyCard[]` (4 x {title, slug, image, label, category})
  - `DEVELOPER_ROLES` (7 strings), `SPECIALIST_ROLES` (6 strings)
  - `INDUSTRIES: IndustrySectionItem[]` (6 x {title,image,description,href?}; Manufacturing has no href)
  - `PLATFORM_EXPERTISE: ExpertisePlatformItem[]` (5)
  - `WHY_REASONS` (4 x {title,text,icon,titleClass: Tailwind text colour classes e.g. "text-[#54a9da]"})
  - `HIRING_MODELS` (2 x {title,text,borderClass,shadowClass: Tailwind classes})
  - `PROCESS_STEPS` (6 x {title,text,icon png,gradient: Tailwind "to-[#hex]"})
  - `FAQS` (4)
  - `PILL_VARIANTS` {blue, green} (icon svg, border/bg/text classes)
  - Local component `TalentPillsRow({roles, variant, reverse?})`: marquee row (`animate-marquee`, reverse via `[animation-direction:reverse]`), duplicates roles for loop
- Local file component: `./FeaturedRolesCarousel.tsx` ("use client", 151 lines, 5 hardcoded FEATURED_ROLES {title, details[3], description}, embla Carousel, each card links to /contact, own `<Section className="overflow-hidden bg-white">` + GLM + h2)
- Root: fragment

Sections (15):
1. `<HeroSection subtitle="Salesforce Recruitment Company" subtitleAsH1 title={[RN] "Certified.<br/>Pre-Vetted.<br/>Salesforce Talent.{" "}<GLM-h8/>"} description={DESCRIPTION} hideCta image="/images/staff-augmentation/hero.webp" imageClassName="object-contain object-center" />`  <- **hideCta**, hero uses **GLM-h8** (not h10)
2. `<PartnersSection />`
3. **INLINE: Intro band** `<Section className="border-y border-migration-blue bg-[#eff6ff]"><Container>` centered column: 88x88 icon `/images/staff-augmentation/intro-icon.webp` + `<Text variant="p1" className="max-w-5xl !text-[22px] !leading-snug text-black md:!text-[37px]">` paragraph with trailing `<span className="font-bold text-migration-blue">` highlight.
4. `<ServiceCaseStudiesSection title={caseStudies.title} caseStudies={caseStudyCards} viewAllHref="/case-studies" />` (ALWAYS rendered; `viewAllHref` prop only used here)
5. **INLINE: "Salesforce Talent We Offer"** `<Section className="overflow-hidden"><Container size="xl">` centered `/images/green-line.svg` (64x24, w-16) + `<Heading as="h2" className="mt-5 text-black">`; then outside Container `<div className="mt-12 flex flex-col gap-6">` with `<TalentPillsRow roles={DEVELOPER_ROLES} variant="blue"/>` and `<TalentPillsRow roles={SPECIALIST_ROLES} variant="green" reverse/>`.
6. **INLINE: "Choose The Right Hiring Model"** `<Section className="border-y border-brand-green bg-[#f6f6f6]"><Container>` green-line + h2; `mt-16 grid lg:grid-cols-2` : left column 2 HIRING_MODELS cards in `<Reveal delay={i*0.1}>` (rounded-2xl border bg-white p-8 md:p-10 + borderClass + shadowClass; h3 level h4; Text p4) ; right `<Reveal direction="right">` photo `/images/staff-augmentation/hiring-model-photo.webp` (fill, h-[320px] sm:h-[420px] lg:h-[500px], rounded-2xl).
7. **INLINE: "How Salesforce Recruitment Works At ProvidusCRM"** `<Section className="overflow-hidden bg-white"><Container size="lg">` green-line + h2 (`mx-auto mt-5 max-w-2xl`); `relative mt-14 space-y-8` list of 6 PROCESS_STEPS `<Reveal delay={i*0.08}>` article (rounded-[22px] bg-linear-to-b from-white + step.gradient, p-6 md:p-8), dashed vertical connector div between steps (md+ only), 64/72px icon tile with multi-layer shadow, h3 `text-[#19689f]`, Text p2. (Comment: same recipe as ServiceBenefitsSection but raster icons.)
8. `<SalesforceConsultCtaSection title="Reach Out To Our Salesforce Recruitment Experts To Hire Top CRM Talent!" buttonLabel="Let's Connect" buttonHref="/contact" backgroundColor="linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)" image="/images/staff-augmentation/recruitment-experts.webp" imageAlt="A ProvidusCRM recruiter, with a list of the Salesforce roles she places" buttonVariant="white" />`  <- **backgroundColor gradient + buttonVariant**
9. `<FeaturedRolesCarousel />` (route-local client component, not in `@/components/sections`)
10. `<IndustriesSection title="How We Implement Salesforce Across Industries" items={INDUSTRIES} />`
11. `<ExpertisePlatformsSection title="Our End-to-End Salesforce Platform Expertise" items={PLATFORM_EXPERTISE} />`
12. **INLINE: "Why ProvidusCRM" blue band** raw `<section className="relative overflow-hidden py-16 md:py-24">` (NOT the Section component) with full-bleed bg `<Image fill src="/images/staff-augmentation/why-band-bg.webp" className="object-cover object-center">`; `<Container className="relative z-10">` green-line + white h2 (`max-w-4xl text-white`) "What Makes ProvidusCRM A Leading Salesforce Recruitment Company in the UK"; `lg:grid-cols-2` : left 4 WHY_REASONS white cards (rounded-[13px] p-6 md:p-7, 56px icon, h3 with titleClass, Text p4 text-type-body) in Reveal; right `<Reveal direction="right" height="100%" className="h-full">` white frame p-3.5 with photo `/images/staff-augmentation/checklist-handshake.webp`.
13. `<FaqSection title="Frequently Asked Questions" faqs={FAQS} />`
14. BLOG-cond [COND]
15. `<CtaSection title="Ready To Scale Your Salesforce Team?" backgroundImage="/images/cta-bg.webp" />`

---

## 23. Services index: `services/page.tsx`

- Metadata: `generateStaticPageMetadata("services", { title: "Salesforce Services", description: "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.", canonicalPath: "/services", image: "/images/our-services-hero.webp" })`
- JSON-LD: `getSitePageJsonLd("services", schema)`; WebPage
- Data: blogs + case studies, key "services"
- Local constants (inside component): `servicesReasons` = 3 items spreading `reasons[0..2]` (exported from `@/components/sections`) and overriding `text` only (so title/color/icon come from shared defaults)
- Root: fragment

Sections (8):
1. `<HeroSection title={[RN] "Our Services{" "}<GLM-h10/>"} description="End-to-end Salesforce services and certified talent ..." image="/images/our-services-hero.webp" imageClassName="object-contain" />`
2. `<PartnersSection />`
3. `<CategoriesSection />` (no props)
4. `<WhyChooseSection title="Why Choose ProvidusCRM As Your Salesforce Services Partner" customReasons={servicesReasons} />` (no image)
5. CS-cond [COND]
6. `<CertifiedSection title="Certified Salesforce Expertise Behind Every Solution We Deliver" description="..." />`
7. BLOG-cond [COND]
8. `<CtaSection title="Ready to Reinvent Your CRM?" />`

---

## Cross-cutting findings

### Root wrappers
- WRAP-OX (`<div className="overflow-x-hidden bg-white">`): financial-services, health, nonprofit, agentforce, data-cloud, experience-cloud, marketing-cloud, sales-cloud, service-cloud (9 pages).
- Fragment root: home, about, contact, industries index, commerce, education, partnership index + 3 children, platform-expertise index, recruitment, services. Privacy = single `<Section>`.
- No other wrapper divs around individual sections anywhere.

### className / spacing / style overrides passed to section components
- `SplitComparisonSection className="bg-linear-to-b from-white to-brand-blue-light"`: dotdigital, findock, fundraise-up (NOT on commerce or data-cloud instances).
- `HeroSection imageClassName`: `"object-contain p-4"` (about, partnership, dotdigital, findock, fundraise-up), `"object-contain"` (industries, platform-expertise, services), `"object-contain object-center"` (recruitment).
- `backgroundOverlayColor="#616161"` on WhatWeDoSection: FSC, health, nonprofit, agentforce, data, experience, marketing, sales, service (not commerce/education).
- `backgroundOverlayColor="#616161"` on WhyChooseSection: health, nonprofit, agentforce, data, experience, marketing, sales, service (not commerce/education/findock/fundraise-up/services).
- `SalesforceConsultCtaSection backgroundColor="linear-gradient(...)" buttonVariant="white"` (recruitment).
- `ExpertiseSalesforceSection imageVariant="framed-wide"` (dotdigital) / `"framed"` (findock), plus `hideMark`.
- `ExplainerCardsSection iconVariant="plain"` (dotdigital).
- `HeroSection ctaVariant="filled" ctaSize="sm"` (3 partnership children).
- Data-level style values: card `color` hex/CSS vars, `bgGradient` CSS strings, TrueCost `background`/`iconColor` CSS vars; recruitment local Tailwind class strings (`titleClass`, `borderClass`, `shadowClass`, `gradient`).

### Booleans
- `subtitleAsH1`: commerce, education, dotdigital, findock, fundraise-up, agentforce, data, experience, marketing, sales, service, recruitment.
- `hideCta`: HeroSection (recruitment); ExpertiseDescriptionSection (education).
- `hideMark`: ExpertiseSalesforceSection (dotdigital, findock).
- `kicker` (string, SalesforceServiceHero): FSC, health, nonprofit.

### ReactNode props
- HeroSection `title` with GLM: about, industries, partnership, platform-expertise, services, commerce, education, dotdigital, findock, fundraise-up, agentforce (no space before GLM), data, experience, marketing, sales, service, recruitment (GLM-h8). Many include `<br/>`.
- `heading` with GLM: ExpertiseDescriptionSection (education GLM-h8; FSC/health/data/experience/marketing/sales GLM-mb2; findock/fundraise-up GLM-h8); TrueCostSection + ComparisonSection (nonprofit, GLM-mb2); ExpertiseSalesforceSection (dotdigital, findock, GLM-h8 + <br/>).
- `heading` as bare fragment (no GLM): ExpertiseImplementationSection (agentforce, data, experience, marketing, sales, service).
- Array item `title` as JSX with `<br/>`: SplitComparisonSection cards (dotdigital, findock, fundraise-up, data-cloud 3/4), ExplainerCardsSection cards (agentforce).
- Component refs in data: ServiceBenefitsSection `items[].icon` = lucide components (dotdigital, findock, fundraise-up) vs `iconKey` strings (agentforce).
- Strings using `\n` for line breaks (rendered via whitespace?): ExpertiseFeaturesSection/ChallengesSection titles, OutcomeCards titles, tab `text` with `\n\n`.

### Conditional rendering
- CS-cond: home, about, industries, partnership, platform-expertise, services, commerce, FSC, health, nonprofit, agentforce, data, experience, marketing, sales, service. (Education + partnership children: no case studies at all. Recruitment: always rendered with hardcoded fallback.)
- BLOG-cond: every page except privacy-policy.

### Inline (non-component) blocks needing new section components
- privacy-policy: whole page (prose/legal document).
- recruitment: intro band; talent pills marquee (+ local TalentPillsRow); hiring model cards + photo; 6-step process list; "why" blue band with bg image + 4 cards + photo; plus route-local `FeaturedRolesCarousel` (client) not in shared sections.

### Section components used only on one page
TrueCostSection, ComparisonSection, SolutionTypesSection (nonprofit); IdentityResolutionSection (data-cloud); SalesforceConsultCtaSection (recruitment); OutcomeCardsSection (findock, fundraise-up); IndustryDetailSection (industries); ExpertiseStackSection (platform-expertise); CategoriesSection (services); ContactSection (contact); EventsSection, TeamGallerySection, ExpertiseSection (home); TeamThoughtsSection, ExploreSection (about).

### Metadata quirks
- No `image` fallback: FSC, health, nonprofit, all 6 platform-expertise children.
- Platform children fallback titles already include "| ProvidusCRM" and descriptions are placeholders ("Salesforce X Consulting Services").
- pageKey != slug: recruitment uses "staff-augmentation"; partnership children use "partnership-<slug>".
- Privacy uses `buildPageMetadata` statically (not CMS-overridable).
- Contact + privacy have no JSON-LD.
