import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import {
  SalesforceServiceHero,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseChallengesSection,
  TrueCostSection,
  ComparisonSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  IndustryCtaSection,
  ExpertisePlatformsSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-nonprofit-consulting", {
    title: "Salesforce Nonprofit Consulting | ProvidusCRM",
    description:
      "Salesforce consulting and implementation for nonprofit and charity organisations in the UK.",
    canonicalPath: "/industries/salesforce-nonprofit-consulting",
  });
}

export default async function SalesforceNonprofitConsultingPage() {
  const caseStudies = await getPageCaseStudies("salesforce-nonprofit-consulting");

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section (with form) — TODO: replace copy */}
      <SalesforceServiceHero
        badgeTitle="Certified"
        badgeSubtitle="Salesforce Partner in the UK"
        title="[PLACEHOLDER] Salesforce for Nonprofit Heading"
        description="[PLACEHOLDER] Hero description for Salesforce Nonprofit consulting."
        bullets={[
          "[PLACEHOLDER] Hero bullet one",
          "[PLACEHOLDER] Hero bullet two",
          "[PLACEHOLDER] Hero bullet three",
          "[PLACEHOLDER] Hero bullet four",
        ]}
        formTitle="Fill a form today"
        formButtonLabel="Let's Connect"
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 3. Expertise Description — TODO: replace heading + paragraphs */}
      <ExpertiseDescriptionSection
        heading={
          <>
            [PLACEHOLDER] Description Section Heading{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "[PLACEHOLDER] First paragraph of the description section.",
          "[PLACEHOLDER] Second paragraph of the description section.",
        ]}
      />

      {/* 4. Challenges (staggered cards) — TODO: replace copy + icons */}
      <ExpertiseChallengesSection
        items={[
          {
            title: "[PLACEHOLDER] Challenge One",
            text: "[PLACEHOLDER] Challenge one body copy.",
            icon: "/images/platform-expertise/Mask group (1).webp",
          },
          {
            title: "[PLACEHOLDER] Challenge Two",
            text: "[PLACEHOLDER] Challenge two body copy.",
            icon: "/images/platform-expertise/Mask group (2).webp",
          },
          {
            title: "[PLACEHOLDER] Challenge Three",
            text: "[PLACEHOLDER] Challenge three body copy.",
            icon: "/images/platform-expertise/Mask group (3).webp",
          },
        ]}
      />

      {/* 5. True Cost of Salesforce for Nonprofits (Figma 172:4) */}
      <TrueCostSection
        heading={
          <>
            What&rsquo;s The True Cost of Salesforce for Nonprofits{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        subtitle="Not sure what “free for nonprofits” really means? Here’s a breakdown to help you plan your Salesforce investment."
        intro={[
          "Many nonprofits hear “Salesforce is free for nonprofits” at some point when choosing the right CRM platform. Well, this is partially true.",
          "Salesforce’s Power of Us programme gives eligible nonprofits ten free Sales Cloud and Service Cloud licences, plus discounted pricing on additional licences and Nonprofit Cloud itself.",
          "But implementation, configuration, migration, integrations, and support all carry costs.",
        ]}
        cards={[
          {
            title: "Salesforce Power of Us",
            text: "Power of Us covers ten free Salesforce licences and discounted pricing for eligible nonprofits.\n\nThe true cost of setting up Nonprofit Cloud successfully involves specialised consulting, implementation, customisation, configuration, data migration, integrations, and ongoing support.",
            background: "var(--color-cost-card-green)",
            iconColor: "var(--color-brand-green)",
          },
          {
            title: "Types of Salesforce Nonprofit Implementations",
            text: "Most Salesforce Nonprofit implementations ProvidusCRM’s certified team has worked on fall into one of these three bands:",
            bullets: [
              "End-to-end NPSP setups",
              "Mid-sized Nonprofit Cloud implementations",
              "Enterprise-scale, multi-programme custom orgs with, for instance, grant management and fund accounting integration.",
            ],
            background: "var(--color-cost-card-blue)",
            iconColor: "var(--color-cost-icon-blue)",
          },
        ]}
        panelTitle="Simplifying Salesforce for Nonprofits"
        highlights={[
          {
            label: "Licensing Benefit",
            text: "Ten free Sales Cloud and Service Cloud licences through the Power of Us programme for eligible nonprofits.",
          },
          {
            label: "Discounted Additional Licences",
            text: "Additional licences beyond the free ten and Nonprofit Cloud itself at reduced pricing for eligible UK-registered charities and third-sector organisations.",
          },
          {
            label: "What You Pay For",
            text: "Salesforce Nonprofit implementation, customisation, configuration, data migration, integrations, managed services, user adoption, and ongoing support.",
          },
          {
            label: "Typical Salesforce Nonprofit Implementation Cost",
            text: "End-to-end Salesforce Nonprofit Cloud or NPSP implementations start from £30,000, with cost rising with further complexity, customisation, features, and scale.",
          },
          {
            label: "Project Timeline",
            text: "NPSP or Nonprofit Cloud implementations take around eight to sixteen weeks on average, based on the projects we’ve worked on. Complex builds may run four to six months.",
          },
          {
            label: "Eligibility Verification",
            text: "Free scoping and Power of Us eligibility review before any commitment, so you know your actual costs up front.",
          },
        ]}
      />

      {/* 6. DIY vs Certified Partner comparison (Figma 53:123) */}
      <ComparisonSection
        heading={
          <>
            DIY Implementation vs Certified Salesforce Nonprofit Cloud Partner{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        subtitle="Salesforce's free licences make DIY implementation tempting. Here is what typically works and what usually breaks, so you can make a more informed decision."
        negativeTitle="What DIY Implementation Costs"
        negativeItems={[
          "Months of admin time learning while building",
          "Reconfiguration cost when the build cannot scale",
          "Data migration errors that surface months later",
          "Broken sharing rules that expose donor data",
          "Manual workarounds because reporting was not scoped properly",
          "Dependency on one admin",
        ]}
        positiveTitle="What ProvidusCRM Brings"
        positiveItems={[
          "Configuration was built once successfully with Salesforce NPC best practices",
          "Validated data migration from any legacy platform",
          "Sharing rules designed before launch, not an afterthought",
          "Board-ready reporting scoped to leadership's actual questions",
          "Documentation and training built for team handoff",
          "Customising Salesforce Nonprofit Cloud to your workflows and goals",
        ]}
        footnote="Reach out to our consultants to discuss the impact Salesforce Nonprofit Cloud and ProvidusCRM can deliver for your organisation."
        buttonLabel="Book a Call"
        buttonHref="/contact"
      />

      {/* 7. Case Studies — selected in Sanity ("Page case studies" → Nonprofit) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 8. Tabs Section (What We Do) — TODO: replace tab labels, copy, bullets */}
      <WhatWeDoSection
        title="[PLACEHOLDER] Nonprofit Solutions & Services We Offer"
        tabs={[
          {
            id: "tab-one",
            label: "[PLACEHOLDER] Tab One",
            content: {
              heading: "[PLACEHOLDER] Tab One Heading",
              text: "[PLACEHOLDER] Tab one body copy.",
              bullets: [
                "[PLACEHOLDER] Bullet one",
                "[PLACEHOLDER] Bullet two",
                "[PLACEHOLDER] Bullet three",
                "[PLACEHOLDER] Bullet four",
              ],
            },
          },
          {
            id: "tab-two",
            label: "[PLACEHOLDER] Tab Two",
            content: {
              heading: "[PLACEHOLDER] Tab Two Heading",
              text: "[PLACEHOLDER] Tab two body copy.",
              bullets: [
                "[PLACEHOLDER] Bullet one",
                "[PLACEHOLDER] Bullet two",
                "[PLACEHOLDER] Bullet three",
                "[PLACEHOLDER] Bullet four",
              ],
            },
          },
          {
            id: "tab-three",
            label: "[PLACEHOLDER] Tab Three",
            content: {
              heading: "[PLACEHOLDER] Tab Three Heading",
              text: "[PLACEHOLDER] Tab three body copy.",
              bullets: [
                "[PLACEHOLDER] Bullet one",
                "[PLACEHOLDER] Bullet two",
                "[PLACEHOLDER] Bullet three",
                "[PLACEHOLDER] Bullet four",
              ],
            },
          },
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 9. Industry CTA — TODO: replace copy + image */}
      <IndustryCtaSection
        title="[PLACEHOLDER] Industry CTA Heading"
        buttonLabel="Talk to a Consultant"
        buttonHref="/contact"
        image="/images/industries-pages/industry-cta-1.png"
      />

      {/* 10. Platforms Expertise — TODO: replace title + cloud cards */}
      <ExpertisePlatformsSection
        title="[PLACEHOLDER] Explore Our Expertise Across The Salesforce Ecosystem"
        items={[
          {
            title: "[PLACEHOLDER] Cloud One",
            text: "[PLACEHOLDER] Cloud one body copy.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "[PLACEHOLDER] Cloud Two",
            text: "[PLACEHOLDER] Cloud two body copy.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "[PLACEHOLDER] Cloud Three",
            text: "[PLACEHOLDER] Cloud three body copy.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "[PLACEHOLDER] Cloud Four",
            text: "[PLACEHOLDER] Cloud four body copy.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "[PLACEHOLDER] Cloud Five",
            text: "[PLACEHOLDER] Cloud five body copy.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "[PLACEHOLDER] Cloud Six",
            text: "[PLACEHOLDER] Cloud six body copy.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
        ]}
      />

      {/* 11. TODO: NEW COMPONENT — design pending, spec to be shared */}

      {/* 12. Salesforce / Certified Partner Section — TODO: replace copy + image */}
      <ExpertiseSalesforceSection
        heading="[PLACEHOLDER] We're a Certified Salesforce Nonprofit Partner"
        text="[PLACEHOLDER] Body copy about ProvidusCRM as a certified Salesforce partner for nonprofits."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 13. Certified Badges Marquee */}
      <ExpertiseCertifiedSection
        images={[
          "/images/certified-badges/1.webp",
          "/images/certified-badges/2.webp",
          "/images/certified-badges/3.webp",
          "/images/certified-badges/4.webp",
          "/images/certified-badges/5.webp",
          "/images/certified-badges/6.webp",
          "/images/certified-badges/7.webp",
          "/images/certified-badges/8.webp",
          "/images/certified-badges/9.webp",
          "/images/certified-badges/10.webp",
        ]}
      />

      {/* 14. Why Choose Section — TODO: replace title + reasons */}
      <WhyChooseSection
        title="[PLACEHOLDER] Why Choose ProvidusCRM for Nonprofit"
        customReasons={[
          {
            title: "[PLACEHOLDER] Reason One",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "[PLACEHOLDER] Reason one body copy.",
          },
          {
            title: "[PLACEHOLDER] Reason Two",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "[PLACEHOLDER] Reason two body copy.",
          },
          {
            title: "[PLACEHOLDER] Reason Three",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "[PLACEHOLDER] Reason three body copy.",
          },
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 15. FAQs Section — TODO: replace with real FAQs */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "[PLACEHOLDER] Question one?",
            answer: "[PLACEHOLDER] Answer one.",
          },
          {
            question: "[PLACEHOLDER] Question two?",
            answer: "[PLACEHOLDER] Answer two.",
          },
          {
            question: "[PLACEHOLDER] Question three?",
            answer: "[PLACEHOLDER] Answer three.",
          },
        ]}
      />

      {/* 16. Footer CTA — TODO: replace title */}
      <CtaSection
        title="[PLACEHOLDER] Footer Call To Action"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
