import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { DEFAULT_BELIEVE_CARDS } from "@/components/sections/BelieveSection";
import { partnerLogos } from "@/components/sections/PlatformsSection";
import { DEFAULT_TEAM_THOUGHTS } from "@/components/sections/TeamThoughtsSection";
import { DEFAULT_EXPLORE_TILES } from "@/data/exploreTiles";
import { curated, heading, img } from "./lib";
import type { SeedPage } from "./types";

// Source: src/app/(site)/about/page.tsx. See home.ts for how defaults are read.

// getSitePageJsonLd("about", schema)
const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Us | ProvidusCRM",
  "description": "Professional Salesforce Services Grounded in Certified Expertise. We are a certified Salesforce partner in the UK, specializing in tailored CRM consulting.",
  "url": "https://providuscrm.co.uk/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
    "description": "Certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more."
  }
};

export const aboutPage: SeedPage = {
  slug: "about",
  title: "About",
  legacyKey: "about",
  seoFallback: {
    title: "About Us",
    description:
      "Professional Salesforce services grounded in certified expertise from a UK Salesforce partner.",
    image: "/images/about-us-hero.webp",
  },
  jsonLdFallback: schema,
  sections: [
    // <HeroSection title={heroTitle} description image imageClassName />
    {
      _type: "heroSection",
      title: heading("Get to Know Your \nCRM Experts", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Professional Salesforce Services Grounded in Certified Expertise",
      image: img("/images/about-us-hero.webp", "Business meeting"),
      imageClassName: "object-contain p-4",
    },
    // <PartnersSection />
    { _type: "partnersSection", logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)) },
    // <CertifiedSection title="Who We Are" description=... />
    {
      _type: "certifiedSection",
      title: heading("Who We Are"),
      description:
        "We're not a generic Salesforce consultancy delivering run-of-the-mill implementations. At ProvidusCRM, we align your CRM with your unique challenges, building tailored Salesforce solutions that drive measurable impact. As a certified Salesforce partner based in the UK, ProvidusCRM works with organisations across nonprofit, financial services, healthcare, and other industries to implement Salesforce around their workflows, challenges, and goals.",
    },
    // <BelieveSection />
    {
      _type: "believeSection",
      title: "What We Believe In",
      cards: DEFAULT_BELIEVE_CARDS.map((c) => ({ title: c.title, description: c.description, icon: img(c.icon), bgImage: c.bgImage && img(c.bgImage) })),
    },
    // <PlatformsSection title="Built On Partnerships With the World's Top Platforms" logos={partnerLogos} />
    {
      _type: "platformsSection",
      title: "Built On Partnerships With the World's Top Platforms",
      logos: partnerLogos.map((src) => img(src, "Platform Logo")),
    },
    // <TeamThoughtsSection />
    {
      _type: "teamThoughtsSection",
      title: "Meet Our Team",
      subtitle: "Our team of technology experts and industry leaders leads our expertise, solutions, and success stories.",
      members: DEFAULT_TEAM_THOUGHTS.map((m) => ({
        name: m.name,
        designation: m.designation,
        displayName: m.displayName,
        fullDesignation: m.fullDesignation,
        quote: m.quote,
        image: img(m.image),
      })),
    },
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "about") },
    // <ExploreSection />
    {
      _type: "exploreSection",
      title: "Explore ProvidusCRM",
      tiles: DEFAULT_EXPLORE_TILES.map((t) => ({ title: t.title, href: t.href, image: img(t.image, t.imageAlt) })),
    },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "about") },
    // <CtaSection title="Ready to Reinvent Your CRM?" />
    {
      _type: "ctaSection",
      title: "Ready to Reinvent Your CRM?",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};
