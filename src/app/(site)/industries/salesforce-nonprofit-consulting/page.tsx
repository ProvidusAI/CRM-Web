import type { Metadata } from "next";
import {
  SalesforceServiceHero,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseChallengesSection,
  WhatWeDoSection,
  ServiceCaseStudiesSection,
  IndustryCtaSection,
  ExpertisePlatformsSection,
  OrganisationTypesSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export const metadata: Metadata = {
  title: "Salesforce for Nonprofit | ProvidusCRM",
  description: "Salesforce consulting and implementation for nonprofit organisations",
};

export default async function SalesforceNonprofitConsultingPage() {
  const caseStudies = await getPageCaseStudies("salesforce-nonprofit-consulting");

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section (with form) — TODO: replace copy */}
      <SalesforceServiceHero
        badgeTitle="Certified"
        badgeSubtitle="Salesforce Partner in the UK"
        title="[PLACEHOLDER] Salesforce for Nonprofit Heading"
        description="[PLACEHOLDER] Hero description for Salesforce Nonprofit consulting. Replace with the real intro copy."
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

      {/* 4. Challenges (staggered cards) — TODO: replace heading, card copy, and icons */}
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

      {/* 5. Tabs Section (What We Do) — TODO: replace tab labels, copy, and bullets */}
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

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Nonprofit) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Industry CTA — matches Figma (node 12:5); TODO: replace copy + right-side image */}
      <IndustryCtaSection
        title="[PLACEHOLDER] Industry CTA Heading"
        buttonLabel="Talk to a Consultant"
        buttonHref="/contact"
        image="/images/industries-pages/industry-cta-1.png"
      />

      {/* 8. Platforms Expertise — TODO: replace title + cloud cards */}
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

      {/* 9. Organisation Types accordion — matches Figma (node 12:438); TODO: replace copy + images */}
      <OrganisationTypesSection
        title="[PLACEHOLDER] Types of Organisations We Build & Deliver Solutions For"
        items={[
          {
            title: "[PLACEHOLDER] Organisation Type One",
            paragraphs: [
              "[PLACEHOLDER] First paragraph describing this organisation type.",
              "[PLACEHOLDER] Second paragraph describing how ProvidusCRM helps.",
            ],
          },
          {
            title: "[PLACEHOLDER] Organisation Type Two",
            paragraphs: ["[PLACEHOLDER] Body copy for organisation type two."],
          },
          {
            title: "[PLACEHOLDER] Organisation Type Three",
            paragraphs: ["[PLACEHOLDER] Body copy for organisation type three."],
          },
          {
            title: "[PLACEHOLDER] Organisation Type Four",
            paragraphs: ["[PLACEHOLDER] Body copy for organisation type four."],
          },
          {
            title: "[PLACEHOLDER] Organisation Type Five",
            paragraphs: ["[PLACEHOLDER] Body copy for organisation type five."],
          },
        ]}
        images={[
          "/images/industries/non-profit.webp",
          "/images/industries/education.webp",
        ]}
      />

      {/* 10. Salesforce / Certified Partner Section — TODO: replace heading + text + image */}
      <ExpertiseSalesforceSection
        heading="[PLACEHOLDER] We're a Certified Salesforce Nonprofit Partner"
        text="[PLACEHOLDER] Body copy about ProvidusCRM as a certified Salesforce partner for nonprofits."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 11. Certified Badges Marquee */}
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

      {/* 12. Why Choose Section — TODO: replace title + reasons */}
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

      {/* 13. FAQs Section — TODO: replace with real FAQs */}
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

      {/* 14. Footer CTA — TODO: replace title */}
      <CtaSection
        title="[PLACEHOLDER] Footer Call To Action"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
