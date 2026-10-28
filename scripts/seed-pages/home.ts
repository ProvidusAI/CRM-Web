import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { DEFAULT_WHAT_WE_DO_TABS } from "@/components/sections/WhatWeDoSection";
import { expertiseItems } from "@/components/sections/ExpertiseSection";
import { DEFAULT_INDUSTRIES } from "@/components/sections/IndustriesSection";
import { partnerLogos } from "@/components/sections/PlatformsSection";
import { reasons } from "@/components/sections/WhyChooseSection";
import { DEFAULT_EVENTS } from "@/components/sections/EventsSection";
import { DEFAULT_BOTTOM_ROW, DEFAULT_TOP_ROW } from "@/components/sections/TeamGallerySection";
import { curated, heading, img } from "./lib";
import type { SeedPage } from "./types";

// Source: src/app/(site)/page.tsx. Route constants are copied verbatim (a page
// cannot export them); component defaults are read from the components' own
// DEFAULT_* exports, so nothing is retyped.

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

// getSitePageJsonLd("home", schema)
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://providuscrm.co.uk/#organization",
      "name": "ProvidusCRM",
      "url": "https://providuscrm.co.uk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://providuscrm.co.uk/images/salesforce-partner.webp"
      },
      "description": "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
      "email": "info@providuscrm.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB"
      },
      "knowsAbout": [
        "Salesforce Consulting",
        "Salesforce Development",
        "Salesforce Implementation",
        "Salesforce Integration",
        "Salesforce Migration",
        "Salesforce Managed Services",
        "CRM Consulting"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://providuscrm.co.uk/#website",
      "url": "https://providuscrm.co.uk",
      "name": "ProvidusCRM",
      "publisher": {
        "@id": "https://providuscrm.co.uk/#organization"
      }
    }
  ]
};

/** The 12 default platform logos (PlatformsSection's own defaults are not exported). */
const platformLogos = Array.from({ length: 12 }, (_, i) => img(`/images/platform-logos/${i + 1}.webp`, "Platform Logo"));

export const homePage: SeedPage = {
  slug: "home",
  title: "Home",
  legacyKey: "home",
  seoFallback: {
    title: "ProvidusCRM | Certified Salesforce Partner UK",
    description:
      "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
    image: "/images/salesforce-partner.webp",
  },
  jsonLdFallback: schema,
  sections: [
    // <HeroSection />
    {
      _type: "heroSection",
      title: heading("Custom Salesforce Solutions For Your CRM Innovation Goals", { mark: "after", markStyle: "hero", markSpace: true }),
      description:
        "Future-proof customer operations and business processes with ProvidusCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK.",
      image: img("/images/hero-img.webp", "Business meeting"),
      ctaLabel: "Book a Call",
      ctaHref: "/contact",
    },
    // <PartnersSection />
    { _type: "partnersSection", logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)) },
    // <CertifiedSection />
    {
      _type: "certifiedSection",
      title: heading("Professional Salesforce \n Services Grounded in \n Certified Expertise"),
      description:
        "ProvidusCRM consultants hold certifications across the Salesforce platform and industry clouds. We translate our certified expertise into CRM solutions that solve key business challenges and drive better engagement and revenue generation.",
    },
    // <WhatWeDoSection />
    {
      _type: "whatWeDoSection",
      title: "What We Do",
      tabs: DEFAULT_WHAT_WE_DO_TABS.map((t) => ({
        label: t.label,
        heading: t.content.heading,
        text: t.content.text,
        bullets: t.content.bullets,
        linkHref: t.link?.href,
        linkIsExternal: t.link?.isExternal,
      })),
      backgroundOverlayColor: "var(--color-tab-highlight)",
    },
    // <ExpertiseSection />
    {
      _type: "expertiseSection",
      title: "Our End-to-End Salesforce Platform Expertise",
      items: expertiseItems.map((i) => ({ title: i.title, text: i.text, icon: img(i.icon), shadow: i.shadow })),
    },
    // <IndustriesSection />
    {
      _type: "industriesSection",
      title: "How We Implement Salesforce Across Industries",
      items: DEFAULT_INDUSTRIES.map((i) => ({ title: i.title, description: i.description, image: img(i.image), href: i.href })),
    },
    // <PlatformsSection title="Built On Partnerships With the World's Top Platforms" logos={partnerLogos} />
    {
      _type: "platformsSection",
      title: "Built On Partnerships With the World's Top Platforms",
      logos: partnerLogos.map((src) => img(src, "Platform Logo")),
    },
    // <WhyChooseSection />
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Solutions Partner",
      reasons: reasons.map((r) => ({ title: r.title, text: r.text, color: r.color, icon: img(r.icon) })),
      image: img("/images/why-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "var(--color-tab-highlight)",
    },
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "home") },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "home") },
    // <EventsSection />
    {
      _type: "eventsSection",
      title: "Events & Industry Conferences We Attend",
      events: DEFAULT_EVENTS.map((e) => ({
        name: e.name,
        description: e.description,
        bg: img(e.bg),
        logo: img(e.logo.src, e.logo.alt),
        logoWidth: e.logo.width,
        logoHeight: e.logo.height,
        photos: e.photos.map((p) => img(p)),
      })),
    },
    // <PlatformsSection /> (defaults)
    { _type: "platformsSection", title: "Platforms We Work With", logos: platformLogos },
    // <FaqSection title="Frequently Asked Questions" faqs={faqs} />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs },
    // <TeamGallerySection />
    {
      _type: "teamGallerySection",
      headingStart: "Work With Experts Across CRM,",
      headingEnd: "AI, Sales, Marketing, and More!",
      topRow: DEFAULT_TOP_ROW.map((p) => ({ image: img(p.src, p.alt), crop: p.imageClassName })),
      bottomRow: DEFAULT_BOTTOM_ROW.map((p) => ({ image: img(p.src, p.alt), crop: p.imageClassName })),
    },
    // <CtaSection /> (defaults)
    {
      _type: "ctaSection",
      title: "Explore How We Align Your CRM Systems With Your Business Initiatives.",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};
