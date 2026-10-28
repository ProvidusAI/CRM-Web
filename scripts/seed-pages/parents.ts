import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { reasons } from "@/components/sections/WhyChooseSection";
import { DEFAULT_CATEGORIES } from "@/components/sections/CategoriesSection";
import { DEFAULT_STACK_ITEMS } from "@/components/sections/ExpertiseStackSection";
import { DEFAULT_INDUSTRIES } from "@/data/industryDetail";
import { curated, heading, img } from "./lib";
import type { SeedPage, SeedSection } from "./types";

// Sources: src/app/(site)/{industries,partnership,platform-expertise}/page.tsx and
// src/app/(site)/(coded)/services/page.tsx. Route constants are copied verbatim
// (a page cannot export them); component defaults come from the components' own
// DEFAULT_* exports. Every hero image uses the component's default alt, since no
// route passes imageAlt.

/** The 12 default platform logos (PlatformsSection's own defaults are not exported). */
const defaultPlatformLogos = () => Array.from({ length: 12 }, (_, i) => img(`/images/platform-logos/${i + 1}.webp`, "Platform Logo"));

// <PartnersSection /> (defaults)
const partnersSection = (): SeedSection => ({
  _type: "partnersSection",
  logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)),
});

// <CtaSection title=... /> (button and background are the component defaults)
const ctaSection = (title: string): SeedSection => ({
  _type: "ctaSection",
  title,
  buttonLabel: "Let's Connect",
  buttonHref: "/contact",
  backgroundImage: img("/images/cta-bg.webp"),
});

// ---------------------------------------------------------------------------
// /industries

// getSitePageJsonLd("industries", schema)
const industriesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Industries We Serve | ProvidusCRM",
  "description": "Deep technical knowledge across every core Salesforce platform. We implement Salesforce effectively for Nonprofit, Education, Commerce, Healthcare, Financial Services, and Manufacturing industries.",
  "url": "https://providuscrm.co.uk/industries",
  "about": [
    {
      "@type": "Service",
      "name": "Salesforce for Nonprofit",
      "description": "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data."
    },
    {
      "@type": "Service",
      "name": "Salesforce for Education",
      "description": "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform."
    },
    {
      "@type": "Service",
      "name": "Salesforce for Commerce",
      "description": "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation."
    },
    {
      "@type": "Service",
      "name": "Salesforce for Healthcare",
      "description": "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance."
    },
    {
      "@type": "Service",
      "name": "Salesforce for Financial Services",
      "description": "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts."
    },
    {
      "@type": "Service",
      "name": "Salesforce for Manufacturing",
      "description": "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning."
    }
  ]
};

export const industriesPage: SeedPage = {
  slug: "industries",
  title: "Industries",
  legacyKey: "industries",
  seoFallback: {
    title: "Industries We Serve",
    description:
      "Salesforce implementation and CRM consulting for nonprofit, education, commerce, healthcare, financial services, and manufacturing organisations.",
    image: "/images/industries.webp",
  },
  jsonLdFallback: industriesSchema,
  sections: [
    // <HeroSection title={heroTitle} description image imageClassName="object-contain" />
    {
      _type: "heroSection",
      title: heading("Industries We Serve", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Explore how we help businesses across different industries make the most out of their Salesforce investments.",
      image: img("/images/industries.webp", "Business meeting"),
      imageClassName: "object-contain",
    },
    // <IndustryDetailSection /> (defaults; the image alt is the title)
    {
      _type: "industryDetailSection",
      industries: DEFAULT_INDUSTRIES.map((i) => ({ title: i.title, image: img(i.image), description: i.description, href: i.href })),
    },
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "industries") },
    // <PlatformsSection /> (defaults)
    { _type: "platformsSection", title: "Platforms We Work With", logos: defaultPlatformLogos() },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "industries") },
    // <CtaSection title="Ready to See How Salesforce Fits Your Industry?" />
    ctaSection("Ready to See How Salesforce Fits Your Industry?"),
  ],
};

// ---------------------------------------------------------------------------
// /partnership

const partnershipCards = [
  {
    title: "Salesforce",
    description:
      "Providus (operating as ProvidusCRM in the UK) is a certified Salesforce consulting partner, having successfully delivered proven CRM solutions across Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Agentforce, and industry clouds including Nonprofit Cloud, Health Cloud, and Financial Services Cloud.",
    icon: "/images/partnership-logos/salesforce.png",
    bgImage: "/images/build-matters-bg.webp",
  },
  {
    title: "FinDock",
    description:
      "As a FinDock partner, we configure payment architecture inside Salesforce for nonprofits and subscription-based businesses. FinDock connects Salesforce to payment processors, direct debit systems, and recurring giving platforms, keeping payment data inside your CRM rather than in disconnected finance systems.",
    icon: "/images/partnership-logos/findock.png",
    href: "/partnership/findock",
    bgImage: "/images/get-it-right-bg.webp",
  },
  {
    title: "FundraiseUp",
    description:
      "We are a certified FundraiseUp partner, implementing conversion-optimised donation experiences for nonprofits, connected directly to Salesforce Nonprofit Cloud and NPSP. Donation forms, recurring giving, and donor facing checkout flows sit within FundraiseUp while donor data lands cleanly in Salesforce.",
    icon: "/images/partnership-logos/fundraiseup.png",
    href: "/partnership/fundraise-up",
    bgImage: "/images/outcome-bg.webp",
  },
  {
    title: "DotDigital",
    description:
      "As a Dotdigital partner, we deliver marketing automation for organisations that need something between Marketing Cloud and lightweight email tools. Dotdigital integrates with Salesforce for segmentation, journeys, and reporting, particularly well-suited to nonprofits, higher education, and mid-market businesses.",
    icon: "/images/partnership-logos/dotdigital.png",
    href: "/partnership/dotdigital",
    bgImage: "/images/drive-self-bg.webp",
  },
];

const partnershipPlatformLogos = [
  "/images/partnership-logos/salesforce.png",
  "/images/partnership-logos/fundraiseup.png",
  "/images/partnership-logos/findock.png",
  "/images/partnership-logos/dotdigital.png",
  "/images/partnership-logos/mulesoft.png",
  "/images/partnership-logos/heroku.png",
  "/images/partnership-logos/aws.png",
  "/images/partnership-logos/azure.png",
  "/images/partnership-logos/kafka.png",
  "/images/partnership-logos/snowflake.png",
  "/images/partnership-logos/redshift.png",
  "/images/partnership-logos/elastic.png",
];

// getSitePageJsonLd("partnership", schema)
const partnershipSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Partnership | ProvidusCRM",
  "description":
    "Certified Salesforce expertise backed by a wider partner ecosystem — FinDock, FundraiseUp, Dotdigital, and the platforms we build on.",
  "url": "https://providuscrm.co.uk/partnership",
  "mainEntity": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
    "description":
      "Certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more.",
  },
};

export const partnershipPage: SeedPage = {
  slug: "partnership",
  title: "Partnership",
  legacyKey: "partnership",
  seoFallback: {
    title: "Partnership",
    description:
      "Certified Salesforce expertise backed by a wider partner ecosystem — FinDock, FundraiseUp, Dotdigital, and the platforms we build on.",
    image: "/images/partnership-hero.webp",
  },
  jsonLdFallback: partnershipSchema,
  sections: [
    // <HeroSection title={heroTitle} description image imageClassName="object-contain p-4" />
    {
      _type: "heroSection",
      title: heading("Our Certified Expertise \n& Partner Ecosystem", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Certified Salesforce experts working alongside the platforms and partners that make CRM strategies whole.",
      image: img("/images/partnership-hero.webp", "Business meeting"),
      imageClassName: "object-contain p-4",
    },
    // <PartnersSection />
    partnersSection(),
    // <CertifiedSection title description />
    {
      _type: "certifiedSection",
      title: heading("Certified Salesforce Expertise You Can Count On"),
      description:
        "Every Salesforce expert you'll come across when working with ProvidusCRM boasts several years of industry-wide experience and multiple certifications across Salesforce and our partner platforms.",
    },
    // <BelieveSection title="Our Partnerships" cards={partnershipCards} />
    {
      _type: "believeSection",
      title: "Our Partnerships",
      cards: partnershipCards.map((c) => ({
        title: c.title,
        description: c.description,
        icon: img(c.icon),
        bgImage: img(c.bgImage),
        href: c.href,
      })),
    },
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "partnership") },
    // <PlatformsSection title="Platforms We Work With" logos={partnershipPlatformLogos} />
    {
      _type: "platformsSection",
      title: "Platforms We Work With",
      logos: partnershipPlatformLogos.map((src) => img(src, "Platform Logo")),
    },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "partnership") },
    // <CtaSection title="Ready To Talk About Your CRM Needs?" />
    ctaSection("Ready To Talk About Your CRM Needs?"),
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise

// getSitePageJsonLd("platform-expertise", schema)
const platformExpertiseSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Certified Platform Expertise | ProvidusCRM",
  "description": "Certified Salesforce Platform expertise across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce, and Revenue Cloud.",
  "url": "https://providuscrm.co.uk/platform-expertise",
  "about": [
    {
      "@type": "Service",
      "name": "Experience Cloud Consulting",
      "description": "Give customers, partners, and teams a self-service portal that works."
    },
    {
      "@type": "Service",
      "name": "Service Cloud Consulting",
      "description": "Resolve cases faster with the right context on every ticket."
    },
    {
      "@type": "Service",
      "name": "Marketing Cloud Consulting",
      "description": "Connect every campaign to a measurable pipeline based on CRM data."
    },
    {
      "@type": "Service",
      "name": "Data Cloud Consulting",
      "description": "Unify customer data from every source into one profile inside Salesforce."
    },
    {
      "@type": "Service",
      "name": "Agentforce Implementation",
      "description": "Deploy autonomous AI agents that handle real workflows and tasks."
    },
    {
      "@type": "Service",
      "name": "Revenue Cloud & CPQ Implementation",
      "description": "Configure CPQ rules, product bundles, pricing logic, and billing automation."
    },
    {
      "@type": "Service",
      "name": "Sales Cloud Implementation",
      "description": "Close deals faster with full pipeline visibility and lead assignment rules."
    }
  ]
};

export const platformExpertisePage: SeedPage = {
  slug: "platform-expertise",
  title: "Platform Expertise",
  legacyKey: "platform-expertise",
  seoFallback: {
    title: "Certified Platform Expertise",
    description:
      "Certified Salesforce Platform expertise across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce, and Revenue Cloud.",
    image: "/images/platform-experties.webp",
  },
  jsonLdFallback: platformExpertiseSchema,
  sections: [
    // <HeroSection title={heroTitle} description image imageClassName="object-contain" />
    {
      _type: "heroSection",
      title: heading("Certified Platform Expertise Across Every Salesforce Cloud", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Whether it is sales pipeline management or autonomous AI agents, our certified team delivers end-to-end solutions across the Salesforce platform.",
      image: img("/images/platform-experties.webp", "Business meeting"),
      imageClassName: "object-contain",
    },
    // <PartnersSection />
    partnersSection(),
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "platform-expertise") },
    // <ExpertiseStackSection /> (defaults; the picture alt is the title)
    {
      _type: "expertiseStackSection",
      items: DEFAULT_STACK_ITEMS.map((i) => ({
        title: i.title,
        subtitle: i.subtitle,
        text: i.text,
        color: i.color,
        icon: img(i.icon),
        image: img(i.image),
        href: i.href,
        hidden: i.hidden,
      })),
    },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "platform-expertise") },
    // <CtaSection title="Drive CRM Innovation For Your Organisation" />
    ctaSection("Drive CRM Innovation For Your Organisation"),
  ],
};

// ---------------------------------------------------------------------------
// /services

// getSitePageJsonLd("services", schema)
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Salesforce Services | ProvidusCRM",
  "description": "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.",
  "url": "https://providuscrm.co.uk/services"
};

// servicesReasons: the standard reasons with the route's own text.
const servicesReasonTexts = [
  "We deliver solutions based on the challenges you’re facing. Before any configuration begins, our team maps business processes and bottlenecks. As a result, the Salesforce org that goes live reflects how your business actually runs. ",
  "We provide you with experienced, certified Salesforce talent who’ve solved the challenges you’re facing today many times for multiple organisations across the UK. You get proven expertise, defined delivery frameworks, documented decisions, and a track record of going live on time with solutions teams actually adopt.",
  "ProvidusCRM is a specialist Salesforce services company. Our certified team covers Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Experience Cloud, and Agentforce, delivering custom Salesforce solutions around your industry, processes, needs, and goals.",
];

export const servicesPage: SeedPage = {
  slug: "services",
  title: "Services",
  legacyKey: "services",
  seoFallback: {
    title: "Salesforce Services",
    description:
      "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.",
    image: "/images/our-services-hero.webp",
  },
  jsonLdFallback: servicesSchema,
  sections: [
    // <HeroSection title={servicesHeroTitle} description image imageClassName="object-contain" />
    {
      _type: "heroSection",
      title: heading("Our Services", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.",
      image: img("/images/our-services-hero.webp", "Business meeting"),
      imageClassName: "object-contain",
    },
    // <PartnersSection />
    partnersSection(),
    // <CategoriesSection /> (defaults)
    {
      _type: "categoriesSection",
      categories: DEFAULT_CATEGORIES.map((c) => ({
        title: c.title,
        text: c.text,
        icon: img(c.icon),
        boxGradient: c.boxGradient,
        iconGradient: c.iconGradient,
        href: c.href,
      })),
    },
    // <WhyChooseSection title customReasons={servicesReasons} /> (no image, so the component's default picture and tint apply)
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Services Partner",
      reasons: servicesReasonTexts.map((text, i) => ({
        title: reasons[i].title,
        text,
        color: reasons[i].color,
        icon: img(reasons[i].icon),
      })),
    },
    // {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "services") },
    // <CertifiedSection title description />
    {
      _type: "certifiedSection",
      title: heading("Certified Salesforce Expertise Behind Every Solution We Deliver"),
      description:
        "Our consultants, developers, and architects are certified across platform administration, app building, data architecture, and every major Salesforce cloud. Every engagement is backed by certified expertise.",
    },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "services") },
    // <CtaSection title="Ready to Reinvent Your CRM?" />
    ctaSection("Ready to Reinvent Your CRM?"),
  ],
};
