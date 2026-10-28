import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import { DEFAULT_FEATURED_ROLES } from "@/data/featuredRoles";
import { DEFAULT_HIRING_MODEL_IMAGE, DEFAULT_HIRING_MODEL_IMAGE_ALT, DEFAULT_HIRING_MODELS } from "@/components/sections/HiringModelsSection";
import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { DEFAULT_PROCESS_STEPS } from "@/components/sections/ProcessStepsSection";
import { DEFAULT_RECRUITMENT_INTRO } from "@/components/sections/RecruitmentIntroSection";
import { DEFAULT_TALENT_PILL_ROWS } from "@/components/sections/TalentPillsSection";
import { DEFAULT_WHY_BAND_BACKGROUND, DEFAULT_WHY_BAND_IMAGE, DEFAULT_WHY_BAND_IMAGE_ALT, DEFAULT_WHY_REASONS } from "@/components/sections/WhyBandSection";
import { curated, heading, img } from "./lib";
import type { SeedPage, SeedSection } from "./types";

// Source: src/app/(site)/salesforce-recruitment-agency/page.tsx. The section bodies were
// generated from the route's JSX by a script that reads the TypeScript AST (no retyping):
// every string, list and heading is the route's own value, and every prop the route
// passes is seeded with the same value. The six sections the route renders with no props
// (intro, talent pills, hiring models, process steps, why band, featured roles) are
// written out from their DEFAULT_* exports so editors see the content; the render is
// unchanged. No clipOverflowX (the route has no wrapper div).
//
// Case studies: no pageCaseStudies document exists for staff-augmentation, so the route
// renders FALLBACK_CASE_STUDIES. The four matching caseStudy documents have different cover
// images (CDN png) and two different categories, so they are NOT referenced: the cards are
// seeded as inlineCards, which the adapter shows when no case studies are referenced. The
// cards render their title as the image alt, so the covers carry no alt of their own.

// <PartnersSection /> (defaults)
const partnersSection = (): SeedSection => ({
  _type: "partnersSection",
  logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)),
});

// Fallback shown until an editor picks case studies in Sanity for this page. (copied verbatim from the route)
const FALLBACK_CASE_STUDIES: ServiceCaseStudyCard[] = [
  {
    title: "Implementing Financial Services Cloud with Agentforce",
    slug: "implementing-financial-services-cloud-with-agentforce",
    image: "/images/staff-augmentation/case-study-financial-services.webp",
    label: "Financial Services Cloud",
    category: "Financial Services",
  },
  {
    title:
      "Improving Student Experience and Driving Lifecycle Visibility With Education Cloud",
    slug:
      "improving-student-experience-and-driving-lifecycle-visibility-with-education-cloud",
    image: "/images/staff-augmentation/case-study-education.webp",
    label: "Education Cloud",
    category: "EdTech",
  },
  {
    title: "Migrating to Commerce Cloud and Unifying Customer Data Across Channels",
    slug: "migrating-to-commerce-cloud-and-unifying-customer-data-across-channels",
    image: "/images/staff-augmentation/case-study-retail.webp",
    label: "Commerce Cloud",
    category: "Retail",
  },
  {
    title: "Health Cloud & Service Cloud Implementation for a Leading Hospital Network",
    slug: "health-cloud-and-service-cloud-implementation-for-a-leading-hospital-network",
    image: "/images/staff-augmentation/case-study-healthcare.webp",
    label: "Health Cloud",
    category: "Healthcare",
  },
];

const recruitmentDescription =
  "Your CRM innovation goals can't wait. Hire top 1% Salesforce talent from ProvidusCRM's global team, boasting certifications across the Salesforce ecosystem and implementation expertise spanning industries.";

// getSitePageJsonLd("staff-augmentation", schema)
const recruitmentSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Staff Augmentation Services",
  description: recruitmentDescription,
  url: "https://providuscrm.co.uk/salesforce-recruitment-agency",
  serviceType: "Staff Augmentation",
  areaServed: "GB",
  provider: {
    "@type": "Organization",
    name: "ProvidusCRM",
    url: "https://providuscrm.co.uk",
    logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const recruitmentPage: SeedPage = {
  slug: "salesforce-recruitment-agency",
  title: "Salesforce Recruitment Agency",
  legacyKey: "staff-augmentation",
  seoFallback: {
    title: "Staff Augmentation Services",
    description: recruitmentDescription,
    image: "/images/staff-augmentation/hero.webp",
  },
  jsonLdFallback: recruitmentSchema,
  sections: [
    // L216 <HeroSection subtitle subtitleAsH1 title description hideCta image imageClassName /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "Salesforce Recruitment Company",
      subtitleAsH1: true,
      title: heading("Certified.\nPre-Vetted.\nSalesforce Talent.", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      description: recruitmentDescription,
      hideCta: true,
      image: img("/images/staff-augmentation/hero.webp", "Business meeting"),
      imageClassName: "object-contain object-center",
    },
    // L238 <PartnersSection />
    partnersSection(),
    // L241 <RecruitmentIntroSection /> (no props: the component defaults, written out)
    {
      _type: "recruitmentIntroSection",
      icon: img(DEFAULT_RECRUITMENT_INTRO.icon),
      lead: DEFAULT_RECRUITMENT_INTRO.lead,
      highlight: DEFAULT_RECRUITMENT_INTRO.highlight,
    },
    // L244 <ServiceCaseStudiesSection title={caseStudies.title} caseStudies={FALLBACK_CASE_STUDIES} viewAllHref /> (no pageCaseStudies doc exists for staff-augmentation, so title is undefined and the route renders the fallback cards: seeded as inlineCards)
    {
      _type: "serviceCaseStudiesSection",
      inlineCards: FALLBACK_CASE_STUDIES.map((c) => ({ title: c.title, slug: c.slug, image: img(c.image), label: c.label, category: c.category })),
      viewAllHref: "/case-studies",
    },
    // L251 <TalentPillsSection /> (defaults, written out)
    {
      _type: "talentPillsSection",
      title: "Salesforce Talent We Offer",
      rows: DEFAULT_TALENT_PILL_ROWS.map((r) => ({ variant: r.variant, ...(r.reverse && { reverse: true }), roles: r.roles })),
    },
    // L254 <HiringModelsSection /> (defaults, written out)
    {
      _type: "hiringModelsSection",
      title: "Choose The Right Hiring Model",
      models: DEFAULT_HIRING_MODELS.map((m) => ({ title: m.title, text: m.text, borderClass: m.borderClass, shadowClass: m.shadowClass })),
      image: img(DEFAULT_HIRING_MODEL_IMAGE, DEFAULT_HIRING_MODEL_IMAGE_ALT),
    },
    // L257 <ProcessStepsSection /> (defaults, written out)
    {
      _type: "processStepsSection",
      title: "How Salesforce Recruitment Works At ProvidusCRM",
      steps: DEFAULT_PROCESS_STEPS.map((p) => ({ title: p.title, text: p.text, icon: img(p.icon!), gradient: p.gradient })),
    },
    // L260 <SalesforceConsultCtaSection title buttonLabel buttonHref backgroundColor image imageAlt buttonVariant />
    {
      _type: "salesforceConsultCtaSection",
      title: "Reach Out To Our Salesforce Recruitment Experts To Hire Top CRM Talent!",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      backgroundColor: "linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)",
      image: img("/images/staff-augmentation/recruitment-experts.webp", "A ProvidusCRM recruiter, with a list of the Salesforce roles she places"),
      buttonVariant: "white",
    },
    // L271 <FeaturedRolesSection /> (defaults, written out)
    {
      _type: "featuredRolesSection",
      title: "Featured Roles",
      roles: DEFAULT_FEATURED_ROLES.map((r) => ({ title: r.title, details: r.details, description: r.description })),
    },
    // L274 <IndustriesSection title items />
    {
      _type: "industriesSection",
      title: "How We Implement Salesforce Across Industries",
      items: [
        {
          title: "Non-Profit",
          description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day.",
          image: img("/images/non-profit.webp"),
          href: "/industries/salesforce-nonprofit-consulting",
        },
        {
          title: "Education",
          description: "Universities, colleges, and training providers manage thousands of relationships across recruitment, admissions, student success, and alumni engagement. Our Education Cloud specialists connect every stage of the student lifecycle in one platform. Recruitment pipelines, application tracking, student case management, and alumni fundraising all run from the same data, so no department works in isolation, and no student record falls through the gaps.",
          image: img("/images/education-cloud.webp"),
          href: "/industries/salesforce-education-cloud-consulting",
        },
        {
          title: "Commerce",
          description: "Selling online gets complicated fast. Product catalogues grow, pricing rules multiply, and customers expect the same experience across every channel. Our Commerce Cloud consultants build B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. Inventory visibility, pricing logic, checkout flows, and post-purchase journeys all live inside one platform, so the commerce experience matches what the rest of the business already knows about the customer.",
          image: img("/images/commerce-cloud.webp"),
          href: "/industries/salesforce-commerce-cloud-consulting",
        },
        {
          title: "Health",
          description: "Patient data is sensitive, care coordination is complex, and compliance is not optional. Our Health Cloud implementation experts give healthcare providers a complete view of every patient across referrals, appointments, care plans, and follow-ups. Clinical and non-clinical teams work from the same record, consent tracking is built into every workflow, and reporting meets regulatory standards. Better care coordination with less administrative overhead.",
          image: img("/images/health-cloud.webp"),
          href: "/industries/salesforce-health-cloud-consulting",
        },
        {
          title: "Financial Services",
          description: "Banks, lenders, wealth managers, and fintechs need CRM that understands financial relationships, not just contacts and opportunities. Our Financial Services Cloud consultants set up client household management, financial account tracking, compliance workflow automation, and full advisor dashboards. KYC processes, referral tracking, and pipeline management all operate within a platform built specifically for how financial services teams work and what regulators expect.",
          image: img("/images/finance-services-cloud.webp"),
          href: "/industries/salesforce-financial-services-cloud-consulting",
        },
        {
          title: "Manufacturing",
          description: "Manufacturers deal with long sales cycles, complex account hierarchies, and forecasting that depends on both sales agreements and actual production capacity. Our Manufacturing Cloud specialists connect sales forecasts with operations data, manage account-based agreements, and give commercial teams accurate visibility into run-rate business and new opportunities. Rebate management, partner collaboration, and demand planning all run from one system instead of five disconnected spreadsheets.",
          image: img("/images/manufacturing-cloud.webp"),
        },
      ],
    },
    // L280 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our End-to-End Salesforce Platform Expertise",
      items: [
        {
          title: "Service Cloud",
          text: "Resolve cases faster with structured queues, automated escalations, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing response times and giving agents the context they need before picking up the phone.",
          icon: img("/images/service-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Data Cloud",
          text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
          icon: img("/images/data-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Agentforce",
          text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-ups without human input. At ProvidusCRM, we configure Agentforce to work within existing Salesforce workflows so automation runs on real business rules.",
          icon: img("/images/agent-force.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Sales Cloud",
          text: "Give sales teams full visibility into every deal, from first touch to closed-won. Our team configures Sales Cloud around actual pipeline stages, forecast categories, and reporting needs so reps spend less time on admin and more time selling.",
          icon: img("/images/sales-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #DBFFFB 119.24%)",
        },
      ],
    },
    // L286 <WhyBandSection /> (defaults, written out)
    {
      _type: "whyBandSection",
      title: "What Makes ProvidusCRM A Leading Salesforce Recruitment Company in the UK",
      backgroundImage: img(DEFAULT_WHY_BAND_BACKGROUND),
      reasons: DEFAULT_WHY_REASONS.map((r) => ({ title: r.title, text: r.text, icon: img(r.icon!), titleClass: r.titleClass })),
      image: img(DEFAULT_WHY_BAND_IMAGE, DEFAULT_WHY_BAND_IMAGE_ALT),
    },
    // L289 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What to look out for during Salesforce hiring in the UK?",
          answer: "Assess the candidate's Salesforce experience, relevant cloud expertise, implementation background, technical capability, communication skills, problem-solving ability, and experience working within teams like yours.",
        },
        {
          question: "What if I want to build a dedicated Salesforce team?",
          answer: "We can build a team around the capabilities your roadmap requires. Start with a Salesforce developer and administrator, then add consultants, architects, project managers, Revenue Cloud specialists, Data Cloud specialists, or other Salesforce professionals (based on your requirements).",
        },
        {
          question: "Can ProvidusCRM support both contract and permanent Salesforce staffing needs?",
          answer: "Choose hourly Salesforce talent for flexible requirements or full-time Salesforce professionals for ongoing delivery. You can also scale the engagement when your Salesforce workload changes.",
        },
        {
          question: "How quickly can ProvidusCRM deliver Salesforce recruitment solutions?",
          answer: "Get on a discovery call with our Salesforce consultants and business analysts. We review the profiles and capabilities you require and pick out the best-matched candidates from our global talent pool. You get a faster route to relevant Salesforce candidates because the search starts with your technical requirements.",
        },
      ],
    },
    // L291 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "staff-augmentation") },
    // L296 <CtaSection title backgroundImage />
    {
      _type: "ctaSection",
      title: "Ready To Scale Your Salesforce Team?",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};
