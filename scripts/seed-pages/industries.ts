import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { curated, heading, img } from "./lib";
import type { SeedPage, SeedSection } from "./types";

// Sources: the five pages under src/app/(site)/industries/. Route constants are
// copied verbatim (a page cannot export them) and every component prop the
// route passes is seeded with the same value. A prop the route omits is omitted
// here too, except images whose alt falls back to the component's own default
// (seeded explicitly so editors see it) and the CtaSection button defaults.
// None of the routes pass a hero imageClassName, so the hero image fit is unset.

// Shared by every page.
const certifiedBadges: string[] = [
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
];

// <PartnersSection /> (defaults)
const partnersSection = (): SeedSection => ({
  _type: "partnersSection",
  logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)),
});

// <CtaSection title ... backgroundImage /> (the routes that pass no button take the component's)
const ctaSection = (title: string, buttonLabel: string, buttonHref: string, backgroundImage: string): SeedSection => ({
  _type: "ctaSection",
  title,
  buttonLabel,
  buttonHref,
  backgroundImage: img(backgroundImage),
});

interface RouteTab { label: string; content: { heading: string; text: string; bullets?: string[] } }
/** Route tabs ({ label, content: { heading, text, bullets } }) to the schema's flat tab. */
const tabsOf = (tabs: RouteTab[]) => tabs.map((t) => ({ label: t.label, heading: t.content.heading, text: t.content.text, bullets: t.content.bullets }));

interface RoutePlatform { title: string; text: string; icon: string; bgGradient: string }
const platformCards = (items: RoutePlatform[]) => items.map((i) => ({ title: i.title, text: i.text, icon: img(i.icon), bgGradient: i.bgGradient }));

interface RouteReason { title: string; text: string; color: string; icon: string }
const reasonCards = (items: RouteReason[]) => items.map((r) => ({ title: r.title, text: r.text, color: r.color, icon: img(r.icon) }));

interface RouteChallenge { title: string; text: string; icon: string }
const challengeCards = (items: RouteChallenge[]) => items.map((c) => ({ title: c.title, text: c.text, icon: img(c.icon) }));

// Commerce and education carry identical platform cards.
const platformsCommerceEducation: RoutePlatform[] = [
  {
    title: "Service Cloud",
    text: "Resolve cases faster with structured queues, automated escalations, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing response times and giving agents the context they need before picking up the phone.",
    icon: "/images/service-cloud.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Experience Cloud",
    text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
    icon: "/images/experience-cloud.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
  {
    title: "Data Cloud",
    text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
    icon: "/images/data-cloud.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
  },
  {
    title: "Agentforce",
    text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-ups without human input. At ProvidusCRM, we configure Agentforce to work within existing Salesforce workflows so automation runs on real business rules.",
    icon: "/images/agent-force.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
  },
  {
    title: "Sales Cloud",
    text: "Give sales teams full visibility into every deal, from first touch to closed-won. Our team configures Sales Cloud around actual pipeline stages, forecast categories, and reporting needs so reps spend less time on admin and more time selling.",
    icon: "/images/sales-cloud.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #D8FFE0 119.24%)",
  },
  {
    title: "Marketing Cloud",
    text: "Run email campaigns, build automated journeys, and segment audiences based on real CRM data. We implement Marketing Cloud with proper data extensions, journey logic, and attribution tracking so every campaign connects back to a measurable pipeline.",
    icon: "/images/marketing-cloud.webp",
    bgGradient:
      "linear-gradient(59.61deg, #F4F4F4 45%, #FFF3D8 119.24%)",
  },
];

// ---------------------------------------------------------------------------
// /industries/salesforce-commerce-cloud-consulting

const commerceDescription =
  "Whether your current Commerce Cloud setup needs a fix, customisation, optimisation, or a setup from scratch, you can count on ProvidusCRM's certified team. We streamline order management, after-sales support, and a lot more for B2C and B2B retailers.";

// getSitePageJsonLd("salesforce-commerce-cloud-consulting", schema)
const commerceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Salesforce Commerce Cloud Consulting & Implementation",
  description: commerceDescription,
  url: "https://providuscrm.co.uk/industries/salesforce-commerce-cloud-consulting",
  provider: {
    "@type": "Organization",
    name: "ProvidusCRM",
    url: "https://providuscrm.co.uk",
    logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

const commerceHeroBullets = [
  "Certified Salesforce Commerce Cloud Consultants",
  "Transparent project scoping",
  "Integration with order management, ERP, and your Salesforce data",
];

const commerceWhyChoose = [
  {
    title: "One Senior Point Of Contact",
    color: "var(--color-soft-indigo)",
    icon: "/images/different.webp",
    text: "When a technical issue needs solving, you want access to people who understand the implementation. We keep communication close to the people doing the work.",
  },
  {
    title: "Weekly Updates & Standups",
    color: "var(--color-soft-purple)",
    icon: "/images/better.webp",
    text: "During active build phases, updates clearly identify important changes involving checkout, payments, integrations, and peak-season readiness.",
  },
  {
    title: "Release Planning",
    color: "var(--color-salesforce-blue)",
    icon: "/images/salesforce-partner.webp",
    text: "We discuss release freeze dates before your busiest trading periods arrive. The objective is to avoid unnecessary risk when the cost of a production issue is highest.",
  },
];

const commerceSplitCards = [
  {
    title: "Do you require managed support or a complete rebuild?",
    color: "#33FF00",
    text: "Most Commerce Cloud orgs suffer from configuration issues that have shifted your CRM from how your business sells today. Before recommending development or implementation, we first analyse your current setup to see whether it needs ongoing support, targeted optimisation, or a total rebuild.",
  },
  {
    title: "Is this a technical issue or an operational issue?",
    color: "#308FFF",
    text: "A storefront that underperforms is not always broken code. Sometimes the catalogue structure no longer matches how you merchandise, or a manual process has grown around a gap in the configuration. We separate the two before quoting development work, because the fixes are not the same size.",
  },
  {
    title: "Is your CRM ready for AI enablement?",
    color: "#FFA530",
    text: "Your CRM doesn't have to be AI-enabled if the data foundation isn't right. Agentforce Commerce, personalised recommendations, and guided shopping all depend on clean product and customer data underneath. We audit and perform a detailed AI readiness assessment for your CRM.",
  },
  {
    title:
      "Is your Commerce Cloud org flawed, or does the issue lie in the integrations?",
    color: "#8800FF",
    text: "Orders that stall, stock that reads wrong, and customer records that disagree usually trace back to the boundary between systems rather than the storefront itself. We check what each connected system owns and where they fall out of sync before recommending changes inside Commerce Cloud.",
  },
];

const commerceTabs = [
  {
    id: "implementation",
    label: "Implementation & Development",
    content: {
      heading: "Implementation & Development",
      text: "We develop and customize Salesforce Commerce Cloud storefronts using Storefront Reference Architecture (SFRA), with the merchandising, product, cart, checkout, and operational requirements of your business in mind. That includes configuring Business Manager for the people who use it and developing cartridges with maintainability in mind.",
      bullets: [
        "SFRA storefront development and customization",
        "Business Manager configuration",
        "Cartridge development",
        "Custom product, cart, and checkout development",
        "Sandbox and staging environment setup",
        "Testing and release preparation",
      ],
    },
  },
  {
    id: "b2b-b2c",
    label: "B2B & B2C Commerce Solutions",
    content: {
      heading: "B2B & B2C Commerce Solutions",
      text: "B2B and B2C commerce aren't interchangeable. B2C may involve high volume shopping, personalisation, promotions, and returns at scale.\n\nB2B may involve account-specific catalogues, contract pricing, bulk ordering, and purchasing teams. We configure Commerce Cloud around the buying model your business actually operates.",
      bullets: [
        "B2C Commerce Cloud implementation",
        "B2B Commerce configuration",
        "Account-based buying journeys",
        "Custom catalogues and pricing",
        "Bulk ordering workflows",
        "Headless and composable commerce architecture where appropriate",
      ],
    },
  },
  {
    id: "migration",
    label: "Platform Migration & Replatforming",
    content: {
      heading: "Platform Migration & Replatforming",
      text: "We help you move from platforms like Shopify Plus, Magento, and BigCommerce to Salesforce Commerce Cloud.\n\nWe plan migrations around your catalogue, customer data, order data, integrations, custom functionality, and trading requirements.",
      bullets: [
        "Platform migration",
        "Product catalogue migration",
        "Customer account migration",
        "Order data migration",
        "Integration migration",
        "Post-migration validation",
        "Performance testing",
      ],
    },
  },
  {
    id: "integration",
    label: "Integration & Order Management",
    content: {
      heading: "Integration & Order Management",
      text: "Connect Commerce Cloud with third-party tools and systems that power your store across every transaction.\n\nWe integrate Commerce Cloud with OMS, ERP, payment, fulfilment, customer, and Salesforce systems.",
      bullets: [
        "OMS integration",
        "ERP integration",
        "Payment gateway integration",
        "Third-party integrations",
        "Commerce and fulfilment data synchronisation",
        "Data Cloud integration",
      ],
    },
  },
  {
    id: "performance",
    label: "Store Performance Optimisation",
    content: {
      heading: "Store Performance Optimisation",
      text: "Your storefront may perform perfectly on an ordinary Tuesday. That doesn't tell you what happens when traffic, transactions, promotions, and customer demand increase dramatically.\n\nWe help you prepare before peak trading periods by testing performance, identifying bottlenecks, and planning releases around your trading calendar.",
      bullets: [
        "Peak-period load testing",
        "Performance auditing",
        "Page-speed optimisation",
        "Release freeze planning",
        "Peak-trading readiness",
        "Live performance monitoring",
      ],
    },
  },
  {
    id: "managed-services",
    label: "Salesforce Managed Services & Support",
    content: {
      heading: "Salesforce Managed Services & Support",
      text: "Our team keeps Commerce Cloud working smoothly as your business evolves. We understand your storefront doesn't stay static. Your catalogue changes. Your campaigns change. Your integrations change. Salesforce releases change the platform.\n\nOur managed services support the ongoing configuration, monitoring, optimisation, and release management required to keep your online and offline retail operations up and running.",
      bullets: [
        "Ongoing configuration",
        "Bug fixes",
        "Platform monitoring",
        "Salesforce release management",
        "Personalisation and conversion optimisation",
        "Agentforce Commerce readiness and configuration as applicable",
      ],
    },
  },
];

const commerceFaqs = [
  {
    question:
      "Is Salesforce Commerce Cloud the same as Agentforce Commerce?",
    answer:
      "Salesforce is repositioning Commerce Cloud under the Agentforce Commerce naming as Agentforce capabilities become more deeply integrated into retail experiences.",
  },
  {
    question:
      "What's the difference between Salesforce B2B Commerce and B2C Commerce?",
    answer:
      "B2C commerce typically focuses on high-volume customer shopping experiences, personalisation, promotions, and returns. B2B commerce often involves account-specific catalogues, contract pricing, bulk ordering, and purchasing teams.",
  },
  {
    question:
      "Can you migrate us from Magento or Shopify Plus to Commerce Cloud?",
    answer:
      "Yes. Migration planning considers your existing platform, customisations, integrations, catalogue, customer data, order data, and the parts of the legacy experience. We scope your migration on the complexity of your existing storefront.",
  },
  {
    question: "Does Commerce Cloud support headless architecture?",
    answer:
      "Commerce Cloud can support headless implementations through APIs, allowing the frontend experience to be separated from the commerce platform. Whether that architecture makes sense depends on the flexibility, integrations, frontend requirements, and operational model of your business.",
  },
  {
    question: "Can Commerce Cloud integrate with our OMS or ERP?",
    answer:
      "Yes. Commerce Cloud implementations commonly require connections between the storefront and systems responsible for order management, fulfilment, inventory, finance, payments, and other business processes. Our integration approach depends on your existing tech stack.",
  },
  {
    question: "How long does a Commerce Cloud implementation take?",
    answer:
      "The timeline depends on scope, integrations, custom development, data migration, testing, and trading requirements. We provide a project timeline after assessing the implementation requirements.",
  },
  {
    question:
      "What's the difference between a Commerce Cloud consultant and an implementation partner?",
    answer:
      "A consultant advises on architecture, platform decisions, and roadmap. An implementation partner also builds and delivers the solution. We provide both strategy and implementation.",
  },
  {
    question: "How much do Commerce Cloud consulting services cost?",
    answer:
      "Pricing depends on implementation scope, custom development, integrations, migration requirements, and ongoing services. We provide a project estimate after detailed discovery of your current CRM setup.",
  },
];

export const commercePage: SeedPage = {
  slug: "industries/salesforce-commerce-cloud-consulting",
  title: "Industries — Commerce Cloud",
  legacyKey: "salesforce-commerce-cloud-consulting",
  seoFallback: {
    title: "Salesforce Commerce Cloud Consulting & Implementation",
    description:
      commerceDescription,
    image: "/images/industries/commerce-cloud/hero.webp",
  },
  jsonLdFallback: commerceSchema,
  sections: [
    // L91 <HeroSection subtitle subtitleAsH1 title description bullets image /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "Salesforce Commerce Cloud Consulting & Implementation",
      subtitleAsH1: true,
      title: heading("Custom CRM Solutions\nfor 3X Retail Growth", { mark: "after", markStyle: "hero", markSpace: true }),
      description: commerceDescription,
      bullets: commerceHeroBullets,
      image: img("/images/industries/commerce-cloud/hero.webp", "Business meeting"),
    },
    // L112 <PartnersSection />
    partnersSection(),
    // L115 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-commerce-cloud-consulting") },
    // L123 <SplitComparisonSection heading subtitle cards /> (no className: the component default)
    {
      _type: "splitComparisonSection",
      heading: heading("What You Need to Ask Before Any Salesforce Commerce Cloud Implementation"),
      subtitle:
        "Most CRM solution providers struggle to understand your specific Commerce Cloud challenges and scope the implementation. Before you go ahead with our Salesforce Commerce Cloud services, we require answers to the following questions.",
      cards: commerceSplitCards.map((c) => ({ title: heading(c.title), text: c.text, color: c.color })),
    },
    // L152 <WhatWeDoSection title tabs />
    {
      _type: "whatWeDoSection",
      title: "Our Salesforce Commerce Cloud Services",
      tabs: tabsOf(commerceTabs),
    },
    // L256 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Book A CRM Audit For Your Store",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L265 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Platform Expertise Beyond Salesforce Commerce Cloud",
      items: platformCards(platformsCommerceEducation),
    },
    // L314 <WhyChooseSection title customReasons image imageAlt />
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Consulting Partner",
      reasons: reasonCards(commerceWhyChoose),
      image: img("/images/industries/commerce-cloud/why-choose.webp", "Consultant reviewing store performance on a tablet"),
    },
    // L322 <CertifiedSection title description />
    {
      _type: "certifiedSection",
      title: heading("Certified Salesforce Expertise You Can Count On"),
      description:
        "Our team holds certifications across the Salesforce ecosystem and has experience across Storefront Reference Architecture (SFRA) implementations, replatforming, integrations, and peak-trading performance work for B2B and B2C commerce.",
    },
    // L328 <FaqSection title faqs />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs: commerceFaqs },
    // L378 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-commerce-cloud-consulting") },
    // L383 <CtaSection title backgroundImage /> (button is the component default)
    ctaSection(
      "Connect With Our Salesforce Consultants Today!",
      "Let's Connect",
      "/contact",
      "/images/cta-bg.webp",
    ),
  ],
};

// ---------------------------------------------------------------------------
// /industries/salesforce-education-cloud-consulting

const educationDescription =
  "You deserve a single source of truth for your student data and systems that talk to each other. We unify your student data and streamline workflows across recruitment, admissions, and more with our end-to-end Salesforce Education Cloud solutions.";

// getSitePageJsonLd("salesforce-education-cloud-consulting", schema)
const educationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Salesforce Education Cloud Consulting & Implementation",
  description: educationDescription,
  url: "https://providuscrm.co.uk/industries/salesforce-education-cloud-consulting",
  serviceType: "Salesforce Education Cloud Consulting",
  areaServed: "GB",
  provider: {
    "@type": "Organization",
    name: "ProvidusCRM",
    url: "https://providuscrm.co.uk",
    logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

const educationHeroBullets = [
  "Certified Salesforce Education Cloud consultants",
  "Student Information System (SIS) and Learning Management System (LMS) integration",
  "Advising and admissions workflows built around live student data",
  "Ongoing support as your institution's systems and processes evolve",
];

const educationDescParagraphs = [
  "Every institution runs on data spread across systems that were never designed to talk to each other. The Student Information System holds academic records. The Learning Management System holds engagement data. Recruitment tools, financial aid platforms, and departmental spreadsheets each hold pieces of the picture.",
];

const educationChallenges = [
  {
    title: "A prospective student waits multiple days for a reply",
    icon: "/images/industries/education-cloud/challenge-inquiry.webp",
    text: "An inquiry comes in through the website. A follow-up happens through a separate recruitment tool. By the time an admissions counsellor actually responds, a competing institution that replied the same day has already moved the prospective student along.",
  },
  {
    title: "Advisors cannot see engagement data until it's too late",
    icon: "/images/industries/education-cloud/challenge-engagement.webp",
    text: "A student's LMS engagement drops. Their grades slip. That information sits in a system advisors do not have visibility into. The intervention that could have helped happens after the student has already decided to withdraw, not before.",
  },
  {
    title: "Development officers work from partial alumni data",
    icon: "/images/industries/education-cloud/challenge-alumni.webp",
    text: "Alumni giving history, event attendance, and career milestones live in disconnected systems. A development officer reaching out to a major gift prospect works from fragments of the relationship, not the whole picture.",
  },
];

const educationTabs = [
  {
    id: "recruitment",
    label: "Recruitment & Admissions",
    content: {
      heading: "Recruitment & Admissions",
      text: "Prospective students don't like waiting too long for responses to their applications. When such delays happen, they often move to institutions that answered first. At ProvidusCRM, we help you respond to prospective students faster, with full visibility into where each applicant stands.\n\nOur consultants configure Education Cloud to route inquiries automatically, track applications from every recruitment source in one console, and give admissions counsellors visibility into where each applicant stands at every stage of the funnel.",
      bullets: [
        "Inquiry and lead management from every recruitment channel",
        "Application tracking with a single console across all sources",
        "Automated, personalised outreach through the admissions funnel",
        "Yield and enrolment reporting tied to actual recruitment activity",
      ],
    },
  },
  {
    id: "academic-operations",
    label: "Academic Operations & Course Management",
    content: {
      heading: "Academic Operations & Course Management",
      text: "Course catalogues, prerequisites, and registration workflows often sit across the Student Information System (SIS), department websites, and shared spreadsheets.\n\nOur consultants configure programme and course structures in Education Cloud so students and advisors work from one consistent view, with prerequisites and pathways visible at the point of decision.",
      bullets: [
        "Programme and course catalogue configuration, including degrees and micro-credentials",
        "Prerequisite tracking and recommended course pathways",
        "Registration workflows connected to eligibility and availability",
        "Degree planning and progress tracking for students and advisors",
      ],
    },
  },
  {
    id: "student-success",
    label: "Student Success & Advising",
    content: {
      heading: "Student Success & Advising",
      text: "It's important to identify at-risk students early, not after they have already disengaged. Early intervention depends on advisors seeing the combined picture: academic performance, LMS engagement, financial aid status, and previous advising history.\n\nOur consultants surface these signals together in one advisor view, with risk indicators based on combined data rather than a single metric that misses context.",
      bullets: [
        "Academic performance and LMS engagement data surfaced to advisors in one place",
        "Risk indicators and alerts based on combined data, not a single metric",
        "Action plans and structured advising workflows",
        "Career and skills guidance tied to academic progress",
      ],
    },
  },
  {
    id: "alumni-advancement",
    label: "Alumni & Advancement",
    content: {
      heading: "Alumni & Advancement",
      text: "A development officer approaching a major gift prospect should see the whole relationship, not fragments of it. Giving history, event attendance, volunteering, and career milestones usually live in different places.\n\nOur consultants connect those records into one alumni view, then configure the moves management, segmentation, and reporting your advancement team needs to work from it.",
      bullets: [
        "A single alumni record spanning giving, events, and engagement",
        "Moves management and portfolio tracking for development officers",
        "Segmentation for appeals, campaigns, and stewardship",
        "Advancement reporting on pipeline, and on gifts actually received",
      ],
    },
  },
  {
    id: "integration",
    label: "SIS, LMS & Financial Aid Integration",
    content: {
      heading: "SIS, LMS & Financial Aid Integration",
      text: "Most institutions run on a Student Information System (SIS) as the system record for academic data, a Learning Management System (LMS) for engagement, and separate platforms for financial aid.\n\nWe connect Education Cloud to the systems your institution already runs on. Our consultants build the integration layer that keeps these systems connected without asking staff to re-enter data. Continuous sync means advisors and admissions teams see current information.",
      bullets: [
        "Integration with Student Information Systems (SIS) including Banner, PeopleSoft, and Workday Student",
        "Learning Management System (LMS) integration with Canvas, Blackboard, Moodle, and D2L",
        "Financial aid platform connections and data synchronisation",
        "Legacy database migration with validation and testing",
      ],
    },
  },
  {
    id: "data-foundation",
    label: "Data Foundation & Ongoing Optimisation",
    content: {
      heading: "Data Foundation & Ongoing Optimisation",
      text: "A configuration that fits at launch drifts as programmes, teams, and reporting needs change. Without maintenance, duplicate records and unused fields accumulate until staff stop trusting the data.\n\nOur consultants set the data standards, duplicate rules, and permission structures your institution runs on, then keep reviewing them across releases as your processes evolve.",
      bullets: [
        "Data standards, duplicate rules, and record ownership",
        "Permission and sharing models reviewed against your access policy",
        "Release management as Salesforce and your processes change",
        "Ongoing optimisation based on how teams actually use the system",
      ],
    },
  },
  {
    id: "paas",
    label: "Salesforce PaaS",
    content: {
      heading: "Salesforce PaaS",
      text: "Some institutional processes have no standard product to sit in. Placements, research administration, and bespoke approval flows often end up in spreadsheets because nothing else fits.\n\nWe build those on the Salesforce platform itself, so they use the same student records, permissions, and reporting as everything else rather than becoming another disconnected system.",
      bullets: [
        "Custom applications built on the Salesforce platform",
        "Institution-specific processes that no standard product covers",
        "Shared student data, permissions, and reporting across every build",
        "Maintainable configuration your team can keep running",
      ],
    },
  },
];

const educationInstitutions = [
  {
    title: "Universities & Colleges",
    paragraphs: [
      "Configuration centred on the complete student lifecycle, from recruitment through advising to alumni advancement, across multiple departments and schools. Our consultants coordinate admissions, registrar, academic advising, and advancement configurations so departmental teams work with shared data but keep the operational autonomy each area needs.",
    ],
  },
  {
    title: "Community & Technical Colleges",
    paragraphs: [
      "Community and technical colleges run on high-volume, rolling enrolment rather than a single annual admissions cycle. Our consultants configure Education Cloud with streamlined admissions and registration workflows built for the throughput and speed community colleges need, without adding administrative complexity that fits a different institutional model.",
    ],
  },
  {
    title: "Online, Remote & Virtual Learning Providers",
    paragraphs: [
      "Online providers deliver education to students who may never set foot on a physical campus. Our consultants configure Education Cloud around digital-first student engagement, remote support workflows, and cohort-based advising tied to LMS activity, since the digital signals are what advisors actually have to work with.",
    ],
  },
  {
    title: "Multi-Campus & National Education Networks",
    paragraphs: [
      "Multi-campus institutions and national networks need shared reporting and student services without losing local operational flexibility. Our consultants configure Education Cloud to unify student data across campuses or member institutions, so leadership sees the whole network while individual campus teams keep the autonomy they need for local operations.",
    ],
  },
];

const educationOrgImages: string[] = [
  "/images/industries/education-cloud/institutions-1.webp",
  "/images/industries/education-cloud/institutions-2.webp",
];

const educationWhyChoose = [
  {
    title: "A single point of contact",
    color: "var(--color-salesforce-blue)",
    icon: "/images/different.webp",
    text: "One senior consultant leads your account, coordinating across admissions, IT, registrar, and advancement leads. That person understands what each team cares about and stays involved long enough to see how the launch actually landed, not just what was delivered before it.",
  },
  {
    title: "Weekly updates",
    color: "var(--color-soft-indigo)",
    icon: "/images/better.webp",
    text: "During active build phases, weekly updates spell out any change touching student data privacy or SIS/LMS integration. Those areas carry disproportionate risk, so they get explained specifically.",
  },
  {
    title: "Data privacy and access rules",
    color: "#C08A2E",
    icon: "/images/salesforce-partner.webp",
    text: "Before go-live, data governance and privacy controls get reviewed and approved in writing by your institutional data governance or compliance stakeholder. Sharing rules and access permissions do not get assumed. Approval sits in writing, so the audit trail exists from day one.",
  },
  {
    title: "Direct access to certified Salesforce consultants",
    color: "var(--color-soft-purple)",
    icon: "/images/different.webp",
    text: "When your technical team has a complex question about the SIS or LMS connection, the answer comes from the person who made the integration decision.",
  },
];

const educationFaqs = [
  {
    question:
      "Is Salesforce Education Cloud the same as Agentforce Education?",
    answer:
      "Salesforce is repositioning Education Cloud as Agentforce Education, similar to how Nonprofit Cloud became Agentforce Nonprofit and Commerce Cloud became Agentforce Commerce. The underlying product is the same, with deeper Agentforce agent integration. Our consultants work with it under either name, depending on which term matches your Salesforce contact.",
  },
  {
    question:
      "What Salesforce Education Cloud solutions does ProvidusCRM offer in the UK?",
    answer:
      "Our Salesforce Education Cloud consultants in the UK offer consulting, implementation, customisation, data migration, SIS and LMS integration, and analytics setup. We configure every solution around your student lifecycle and the way your admissions, advising, and advancement teams actually work.",
  },
  {
    question:
      "What Salesforce Education Cloud services do you provide in the UK?",
    answer:
      "The Education Cloud services we provide in the UK cover advisory, implementation, optimisation of existing orgs, integrations with your student information and learning platforms, ongoing managed services, user training, and post-go-live support across releases. We work with you across every stage of your Education Cloud implementation lifecycle.",
  },
  {
    question:
      "What does a Salesforce Education Cloud Implementation Partner do?",
    answer:
      "A Salesforce Education Cloud implementation partner takes you from licensing to deployment to user adoption. They configure objects, automation, reports, and integrations to fit your institution, then train your teams properly so adoption holds up well after go-live and beyond the first term.",
  },
  {
    question:
      "What is the difference between a Salesforce Education Cloud consultant and an implementation partner?",
    answer:
      "A consultant advises on what Education Cloud should do for your institution and how to design it properly. An implementation partner actually builds the configured system you need. ProvidusCRM does both, so your strategy and the build never drift apart across the course of the project.",
  },
];

// The route fetches getPageBlogs only: there is no case-studies key for this page.
export const educationPage: SeedPage = {
  slug: "industries/salesforce-education-cloud-consulting",
  title: "Industries — Education Cloud",
  legacyKey: "salesforce-education-cloud-consulting",
  seoFallback: {
    title: "Salesforce Education Cloud Consulting & Implementation",
    description:
      educationDescription,
    image: "/images/industries/education-cloud/hero.webp",
  },
  jsonLdFallback: educationSchema,
  sections: [
    // L136 <HeroSection subtitle subtitleAsH1 title description bullets image /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "Salesforce Education Cloud Consulting & Implementation",
      subtitleAsH1: true,
      title: heading("One Student\nRecord, Not Multiple\nDisconnected Systems", { mark: "after", markStyle: "hero", markSpace: true }),
      description: educationDescription,
      bullets: educationHeroBullets,
      image: img("/images/industries/education-cloud/hero.webp", "Business meeting"),
    },
    // L160 <PartnersSection />
    partnersSection(),
    // L163 <ExpertiseDescriptionSection hideCta heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Is Your Student Data Spread Across Disparate Systems & Sheets?", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      paragraphs: educationDescParagraphs,
      hideCta: true,
    },
    // L177 <ExpertiseChallengesSection items /> (the route passes no title)
    {
      _type: "expertiseChallengesSection",
      items: challengeCards(educationChallenges),
    },
    // L180 <WhatWeDoSection title tabs />
    {
      _type: "whatWeDoSection",
      title: "Our Salesforce Education Cloud Services",
      tabs: tabsOf(educationTabs),
    },
    // L285 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Not Sure How Much Of Your Student Data Is Actually Connected?",
      buttonText: "Book A Free Consultation",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L294 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Salesforce Consulting Services That Secure Your CRM Investments"),
      text:
        "ProvidusCRM is a certified Salesforce consulting partner, helping organizations in the UK drive operational efficiency, reduce costs, and integrate their CRM systems securely and reliably with other tools and platforms. Every project we work on involves our experienced, certified teams and their relentless efforts towards meeting your specific needs and goals, enabling you to derive maximum value from your Salesforce investments.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L301 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L317 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Platform Expertise Beyond Salesforce Education Cloud",
      items: platformCards(platformsCommerceEducation),
    },
    // L366 <OrganisationTypesSection title subtitle items images />
    {
      _type: "organisationTypesSection",
      title: "Institutions We Work With",
      subtitle:
        "Every institution has different CRM needs. A large research university, a community college, and an online provider share very little of the same operational shape. Configuration reflects where your institution actually sits and how your teams work together across the student lifecycle.",
      items: educationInstitutions,
      images: educationOrgImages.map((p) => img(p)),
    },
    // L377 <WhyChooseSection title customReasons image imageAlt />
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Education Cloud Consulting & Implementation Partner",
      reasons: reasonCards(educationWhyChoose),
      image: img("/images/industries/education-cloud/why-choose.webp", "Student working on a laptop outdoors"),
    },
    // L385 <CertifiedSection title description />
    {
      _type: "certifiedSection",
      title: heading("Certified Expertise and Experience Across Industries"),
      description:
        "Our team holds Salesforce certifications across administration, development, and architecture, with production experience across the industries we serve. What matters more than our certifications is where the experience shows up: in the drift patterns and issues we catch early, in release management, and building the right foundation for more accurate, optimised workflow automation.",
    },
    // L391 <FaqSection title faqs />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs: educationFaqs },
    // L427 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-education-cloud-consulting") },
    // L432 <CtaSection title backgroundImage /> (button is the component default)
    ctaSection(
      "Connect With Our Salesforce Consultants Today!",
      "Let's Connect",
      "/contact",
      "/images/cta-bg.webp",
    ),
  ],
};

// ---------------------------------------------------------------------------
// /industries/salesforce-financial-services-cloud-consulting

// getSitePageJsonLd("salesforce-financial-services-cloud-consulting", schema)
const fsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK",
  "description": "Certified Salesforce Financial Services Cloud consultants in the UK. We model households, financial accounts, and policies correctly and integrate with your core banking, portfolio, or policy systems.",
  "url": "https://providuscrm.co.uk/industries/salesforce-financial-services-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

const fsHeroBullets = [
  "Certified Salesforce Financial Services Cloud consultants",
  "Household and financial account data modelled correctly",
  "Compliance and audit trail requirements built into the configuration",
  "Integration with the core banking, portfolio, or policy systems you already use",
];

const fsDescParagraphs = [
  "Here\u2019s a scenario: your client\u2019s spouse has a separate account, opened through a different channel or adviser. Nothing in the system connects the two records, so an adviser reviewing the client is looking at half the financial relationship.",
  "Meanwhile, the client\u2019s tax preparer, insurance broker, and adult children each hold pieces of the picture that never surface anywhere. The full household stays invisible to the person supposed to advise on it.",
  "Here are the challenges Financial Services Cloud\u2019s data model was built to solve:",
];

const fsChallenges = [
  {
    title: "Unpredictable life events",
    text: "A client gets married, retires, sells a business, or inherits assets. None of that surfaces automatically as a reason to reach out. Proactive advice collapses into reactive guesswork, and the moments that build long-term relationships pass without contact.",
    icon: "/images/platform-expertise/Mask group (1).webp",
  },
  {
    title: "Disconnected KYC & AML documentation",
    text: "Audit season turns into a manual reconstruction project. Documents get pulled together for the auditor rather than being produced from the system. Every audit cycle repeats the same fire drill, and every gap is a potential finding.",
    icon: "/images/platform-expertise/Mask group (2).webp",
  },
  {
    title: "Invisible cross-sell opportunities",
    text: "Deposits, loans, insurance, and investment products each sit in their own system. The client who took out a mortgage last year and just opened a business account should be a wealth management conversation, but nobody sees the pattern because nobody sees the whole client.",
    icon: "/images/platform-expertise/Mask group (3).webp",
  },
];

const fsTabs = [
  {
    id: "household-data-modelling",
    label: "Household & Client Data Modelling",
    content: {
      heading: "Household & Client Data Modelling",
      text: "Configuring Financial Services Cloud's data model around how your clients' financial lives actually connect, rather than forcing them into generic contact records. Our consultants set up household and relationship group configurations that reflect real family, business, and beneficiary relationships.\n\nSegmentation by life stage, net worth tier, and risk tolerance replaces segmentation by \"amount held last year\". Advisers see the full household picture rather than a single account view.",
      bullets: [
        "Household and relationship group configuration linking related accounts and family members",
        "Financial account, asset, and liability tracking tied to the right client and household",
        "Person account setup matched to banking, wealth, or insurance use cases",
        "Segmentation by life stage, net worth, and risk tolerance, not just account size",
      ],
    },
  },
  {
    id: "onboarding-compliance",
    label: "Onboarding & Compliance Automation",
    content: {
      heading: "Onboarding & Compliance Automation",
      text: "Reducing the manual work behind KYC, AML, and documentation requirements. Our consultants configure onboarding journeys with compliance checkpoints built into each stage, so due diligence is not an afterthought handled by whoever is available.\n\nWe build KYC and AML documentation workflows tied directly to the client record, so evidence sits against the client rather than in a shared drive. Role-based access controls and data sharing rules align with UK regulatory frameworks, ensuring strict compliance with FCA regulations, UK GDPR, and ongoing Consumer Duty requirements.",
      bullets: [
        "Automated onboarding journeys with built-in compliance checkpoints",
        "KYC and AML documentation workflows tied to the client record",
        "Role-based access and data sharing rules aligned to FCA and UK GDPR requirements",
        "Audit trail and encryption configuration optimised for FCA Consumer Duty reporting",
      ],
    },
  },
  {
    id: "core-system-integration",
    label: "Core System Integration",
    content: {
      heading: "Core System Integration",
      text: "Connecting Financial Services Cloud to the systems your institution already runs on, rather than asking the platform to work in isolation. Our consultants build the integration layer that ties CRM to your operational financial systems.\n\nWe integrate with core banking platforms including Temenos, portfolio management systems including Avaloq and Envestnet, and policy administration platforms including Guidewire. API and MuleSoft-based connections handle real-time sync between CRM, trading, and reporting platforms.",
      bullets: [
        "Integration with core banking, portfolio management, and policy administration platforms",
        "API and MuleSoft-based connections to systems like Temenos, Avaloq, Envestnet, or Guidewire",
        "Real-time data sync between CRM, trading, and reporting platforms",
        "Legacy CRM and spreadsheet data migration with validation and testing",
      ],
    },
  },
  {
    id: "relationship-service",
    label: "Relationship & Service Management",
    content: {
      heading: "Relationship & Service Management",
      text: "Turning life events and service moments into proactive adviser action, rather than missed opportunities. Our consultants configure the workflows that surface the moments that actually matter to a client relationship.\n\nWe build action plans and triggered workflows tied to life events (marriage, retirement, business sale, inheritance, home purchase), so proactive outreach happens on time rather than by memory. Client review cycle automation tracks compliance-required annual or quarterly reviews with checklist enforcement.",
      bullets: [
        "Action plans and triggered workflows tied to client life events",
        "Client review cycle automation and compliance checklist tracking",
        "Case management and service request routing for policyholders or account holders",
        "Referral and centre-of-influence relationship tracking",
      ],
    },
  },
  {
    id: "reporting-analytics",
    label: "Reporting & Regulatory Analytics",
    content: {
      heading: "Reporting & Regulatory Analytics",
      text: "Reporting that holds up in an audit, not just a quarterly business review. Our consultants configure the reporting layer to satisfy both operational management and regulatory scrutiny from the same underlying data.\n\nWe build regulatory, governance, and cross-channel reporting aligned directly to FCA frameworks, with pre-configured dashboards that track and prove Consumer Duty outcomes. Board and leadership dashboards run on reconciled data rather than a spreadsheet someone updated the morning of the meeting.",
      bullets: [
        "Investment and portfolio performance tracking",
        "Adviser productivity and pipeline reporting",
        "Board and leadership dashboards built on accurate data",
      ],
    },
  },
  {
    id: "ongoing-optimisation",
    label: "Ongoing Optimisation & Support",
    content: {
      heading: "Ongoing Optimisation & Support",
      text: "Keeping the system aligned as products, regulations, and client segments evolve. Our consultants handle the ongoing work that keeps Financial Services Cloud accurate rather than drifting into technical debt over time.\n\nWe manage releases against Salesforce updates and new Financial Services Cloud capabilities as they roll out, monitor compliance configuration as regulatory requirements shift, and enhance the platform as new financial products or client segments are introduced.",
      bullets: [
        "Release management aligned to Salesforce updates and new Financial Services Cloud capabilities",
        "Ongoing compliance monitoring as regulatory requirements change",
        "Ongoing platform enhancements as new financial products or segments are introduced",
        "User adoption support for advisers, relationship managers, and service teams",
      ],
    },
  },
];

const fsPlatforms = [
  {
    title: "Sales Cloud",
    text: "We configure Sales Cloud to track referral partners and centres of influence the way a business development team manages a pipeline. Relationship-building does not rely on memory, and new business sources become visible rather than assumed.",
    icon: "/images/sales-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Marketing Cloud",
    text: "Launch life-stage and net-worth segmented campaigns tied to real client data. A retirement-planning message does not go to a client who just opened their first account, and business banking prospects get materials matched to their actual position.",
    icon: "/images/marketing-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
  },
  {
    title: "Experience Cloud",
    text: "Our consultants build client and adviser portals connected to live Financial Services Cloud data, with sharing rules that respect account-level privacy and household boundaries. Clients see their household position where they should, and nothing they should not.",
    icon: "/images/experience-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
  },
  {
    title: "Service Cloud",
    text: "Our consultants set up client and policyholder support so servicing requests get routed and resolved without an agent starting from a blank case every time. Case history connects to the client and household record, so context carries across interactions.",
    icon: "/images/service-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
  {
    title: "Data Cloud",
    text: "Unify client, account, and transactional data from every source into one household profile. Segmentation and reporting rest on one accurate picture rather than fragments across product lines.",
    icon: "/images/data-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Agentforce",
    text: "We build routine inquiry agents that handle account status, transaction history, and general questions, escalating anything involving financial advice or regulated decisions to a licensed person immediately. Agents never attempt to act on suitability calls, by design.",
    icon: "/images/agent-force.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
];

const fsOrgItems = [
  {
    title: "Weekly Progress Updates",
    paragraphs: [
      "You get a working session and a written summary each week. Any decision touching data access, household visibility, or compliance workflow gets flagged and explained specifically, not folded silently into general progress notes. If a design choice affects regulatory posture, your compliance lead sees it before the build proceeds.",
    ],
  },
  {
    title: "Direct Access to Certified Talent",
    paragraphs: [
      "When your IT team has a question about the Temenos integration configuration, or your compliance team has a question about how audit logging is set up, they get the answer from the person who configured it. No manager translating in the middle.",
    ],
  },
  {
    title: "Post-Launch Support",
    paragraphs: [
      "We schedule reviews to catch integration performance issues as core systems update, and to prepare for audit or regulatory reporting cycles, rather than at arbitrary 30/60/90 day marks. Financial services integrations need attention when the connected systems change, and that timing depends on your vendors’ release schedules and your compliance calendar, not ours.",
    ],
  },
];

const fsOrgImages: string[] = ["/images/industries/in-finance-types.png"];

const fsFaqs = [
  {
    question:
      "What is actually different about Financial Services Cloud’s data model compared to standard Salesforce?",
    answer:
      "Standard Salesforce uses generic accounts and contacts. FSC adds a pre-built data model with person accounts, household structures, financial accounts, assets, liabilities, and policy objects. This means client relationships get modelled the way advisers think about them rather than being forced into a sales-team data structure that does not fit financial services.",
  },
  {
    question:
      "Can Financial Services Cloud integrate with our core banking, portfolio, or policy administration system?",
    answer:
      "Yes. Our consultants build integrations with core banking platforms including Temenos and Finastra, portfolio management platforms including Avaloq, Envestnet, and Orion, and policy administration platforms including Guidewire and Duck Creek. API and MuleSoft-based approaches handle real-time sync where the systems support it.",
  },
  {
    question:
      "How does household and relationship modelling actually work for advisers managing multiple family accounts?",
    answer:
      "FSC’s household object groups relate to client records, so a spouse’s account, a joint account, and a trust account can all sit under one household context. Relationship groups extend this to non-household connections, including tax preparers, attorneys, and adult children. Advisers then see the full picture rather than one record at a time.",
  },
  {
    question:
      "Can KYC and AML documentation be automated within the platform?",
    answer:
      "Yes. Our consultants configure onboarding journeys with automated KYC and AML checkpoints, documentation workflows tied to the client record, and audit trail logging that supports seamless FCA compliance audits and Consumer Duty reporting. Automation reduces manual work while keeping the compliance evidence in one auditable location.",
  },
  {
    question:
      "Is Financial Services Cloud worth it for a small bank or credit union, or is it built for enterprise institutions only?",
    answer:
      "FSC works at both scales. The household data model, compliance configuration, and integration capabilities benefit smaller institutions as much as large ones, particularly community banks and credit unions where member relationships span multiple products. Implementation scope scales down proportionally to organisational complexity.",
  },
  {
    question:
      "How long does a Financial Services Cloud implementation take?",
    answer:
      "A focused implementation runs twelve to twenty weeks. Complex projects with multiple core system integrations, FCA compliance tracking modules, and multi-line-of-business rollouts typically run six to twelve months. Our consultants give a realistic timeline after discovery, based on your actual integration landscape and regulatory scope.",
  },
  {
    question:
      "What is the difference between a consultant and an implementation partner?",
    answer:
      "A consultant advises on architecture, data model design, and compliance configuration. An implementation partner actually builds it. Our consultants deliver both together, so strategy and build never drift apart across the project.",
  },
  {
    question:
      "How much do Financial Services Cloud consulting services cost?",
    answer:
      "Cost depends on scope, core system integration complexity, compliance requirements, and whether ongoing managed services sit inside the engagement. A focused implementation can start from £30,000. Our consultants share a clear quote after discovery, based on your actual environment rather than a template.",
  },
  {
    question:
      "Can the platform support lending and loan origination workflows specifically?",
    answer:
      "Yes. Our consultants configure FSC for loan origination and underwriting workflows tracked end to end: application intake, credit bureau integration, underwriting review, closing coordination, and post-closing servicing. Integrations with loan management platforms handle the operational system of record, while FSC holds the customer relationship view.",
  },
  {
    question:
      "What industries within financial services do your consultants work with?",
    answer:
      "Our consultants work across wealth management and advisory firms, retail and commercial banks, insurance providers (life, health, property and casualty), lenders and loan originators, and investment firms and private equity managers. We bring sub-sector context to each project rather than treating financial services as one homogeneous category.",
  },
];

export const financialServicesPage: SeedPage = {
  slug: "industries/salesforce-financial-services-cloud-consulting",
  title: "Industries — Financial Services Cloud",
  legacyKey: "salesforce-financial-services-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK",
    description:
      "Certified Salesforce Financial Services Cloud consultants in the UK. We model households, financial accounts, and policies correctly and integrate with your core banking, portfolio, or policy systems.",
  },
  jsonLdFallback: fsSchema,
  sections: [
    // L67 <SalesforceServiceHero badgeTitle badgeSubtitle kicker title description bullets formTitle formButtonLabel /> (no backgroundImage: the component default applies)
    {
      _type: "salesforceServiceHero",
      kicker: "Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK",
      badgeTitle: "Certified",
      badgeSubtitle: "Salesforce Partner in the UK",
      title: "One Household Record, Zero Disconnected Accounts",
      description:
        "With ProvidusCRM, you get to work with certified consultants who configure Salesforce Financial Services Cloud around your actual client structure: households, financial accounts, assets, liabilities, and policies, connected to your core banking, portfolio, or policy administration systems.",
      bullets: fsHeroBullets,
      formTitle: "Fill a form today",
      formButtonLabel: "Let's Connect",
    },
    // L84 <PartnersSection />
    partnersSection(),
    // L87 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Where Financial Client Data Breaks Down", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: fsDescParagraphs,
    },
    // L102 <ExpertiseChallengesSection items /> (the route passes no title)
    {
      _type: "expertiseChallengesSection",
      items: challengeCards(fsChallenges),
    },
    // L123 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Financial Services Cloud Solutions & Services We Offer",
      tabs: tabsOf(fsTabs),
      backgroundOverlayColor: "#616161",
    },
    // L214 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-financial-services-cloud-consulting") },
    // L222 <IndustryCtaSection title buttonLabel buttonHref image /> (the route passes no imageAlt, so the component's empty default applies)
    {
      _type: "industryCtaSection",
      title: "Not sure if your current setup is seeing the household? Talk to a consultant.",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      image: img("/images/industries-pages/industry-cta-1.png"),
    },
    // L230 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Salesforce Platform Expertise Beyond Financial Services Cloud",
      items: platformCards(fsPlatforms),
    },
    // L273 <OrganisationTypesSection title items images />
    {
      _type: "organisationTypesSection",
      title: "What Makes ProvidusCRM Stand Out As A Salesforce Financial Services Cloud Partner",
      items: fsOrgItems,
      images: fsOrgImages.map((p) => img(p)),
    },
    // L299 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("On-Demand, Certified Salesforce FSC Talent At Your Service"),
      text:
        "Our Salesforce talent boasts certifications and implementation expertise across the Salesforce ecosystem, not just Financial Services Cloud. We have delivered successful implementations and solutions across wealth management, retail and commercial banking, insurance, lending, and investment firm use cases and challenges.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L306 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L322 <FaqSection title faqs />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs: fsFaqs },
    // L388 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-financial-services-cloud-consulting") },
    // L393 <CtaSection title buttonLabel buttonHref backgroundImage /> 
    ctaSection(
      "Connect With Our Salesforce Financial Services Cloud Consultants Today!",
      "Let's Connect",
      "/contact",
      "/images/cta-bg.webp",
    ),
  ],
};

// ---------------------------------------------------------------------------
// /industries/salesforce-health-cloud-consulting

// getSitePageJsonLd("salesforce-health-cloud-consulting", schema)
const healthSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Health Cloud Consultant & Implementation Partner in the UK",
  "description": "Certified Salesforce Health Cloud consultants in the UK. We connect Health Cloud to your EHR, telehealth, and clinical systems with UK GDPR and NHS DSPT-compliant configuration.",
  "url": "https://providuscrm.co.uk/industries/salesforce-health-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

const healthHeroBullets = [
  "Certified Salesforce Health Cloud consultants",
  "EHR and clinical system integration that reduces manual re-entry",
  "UK GDPR and NHS DSPT-compliant configuration",
  "Ongoing support as care protocols and integrations evolve",
];

const healthDescParagraphs = [
  "A patient's clinical history lives in the EHR. Their insurance and billing details live in a separate system. Their social determinants of health and care plan notes live in a spreadsheet or the case manager's personal notes.",
  "None of it reconciles automatically into one view for the person actually coordinating their care. Front-desk staff, care coordinators, and clinicians each work from an incomplete picture and re-enter the same information across multiple touchpoints.",
  "Here are the issues and challenges healthcare teams face that Salesforce Health Cloud was built to solve:",
];

const healthChallenges = [
  {
    title: "The same question is asked repeatedly",
    text: "The registration asks the patient their reason for coming to the hospital. The attending nurse asks the same question. The doctor asks the same question again. If your patients are experiencing this, your healthcare experience is broken.",
    icon: "/images/platform-expertise/Mask group (1).webp",
  },
  {
    title: "Key details go missing during knowledge transfers",
    text: "The receiving provider re-enters what they can read, calls to fill gaps, and the patient is the one who feels the delay. Referral leakage becomes a patient safety issue, not just an operational one.",
    icon: "/images/platform-expertise/Mask group (2).webp",
  },
  {
    title: "Risk of a compliance violation",
    text: "Patient data handled across disconnected systems multiplies the risk of a UK GDPR breach or a low NHS DSPT score. Every additional data-handling location is another surface for compliance to defend at the next audit.",
    icon: "/images/platform-expertise/Mask group (3).webp",
  },
];

const healthTabs = [
  {
    id: "ehr-integration",
    label: "EHR & Clinical System Integration",
    content: {
      heading: "EHR & Clinical System Integration",
      text: "Connecting Health Cloud to the systems your team already relies on. Our consultants build integrations that reduce manual re-entry and simplify key healthcare workflows.\n\nWe integrate with EHR platforms using FHIR-aligned data models where the platform supports it. Telehealth platforms and health information exchanges connect through the same integration layer. Real-time data sync means your teams see real-time information.",
      bullets: [
        "Integration with EHR platforms",
        "FHIR-aligned data model configuration for interoperability",
        "Telehealth platform and health information exchange (HIE) connections",
        "Real-time data sync to reduce manual re-entry and lookup",
      ],
    },
  },
  {
    id: "care-coordination",
    label: "Care Coordination",
    content: {
      heading: "Care Coordination & Care Team Collaboration",
      text: "One workspace for the people coordinating a patient's care, combining clinical and non-clinical information in one place. Our consultants configure care coordination around how your care team works.\n\nWe build unified patient profiles that include clinical history, social determinants of health, insurance context, and care plan status. Care plans get tracked with task assignment across the care team, so handoffs happen with context intact.",
      bullets: [
        "Unified patient profiles combining clinical and non-clinical data, including social determinants of health",
        "Care plan tracking and task assignment across care team members",
        "Care team communication and handoff workflows",
        "Mobile access for care coordinators and in-home care teams",
      ],
    },
  },
  {
    id: "patient-engagement",
    label: "Patient & Member Engagement",
    content: {
      heading: "Patient & Member Engagement",
      text: "Communication and self-service that actually reduces the burden on front-desk and call centre staff. Our consultants build patient engagement flows connected to live Health Cloud data, so what patients see reflects their actual clinical picture.\n\nWe configure patient portals on Experience Cloud with appointment scheduling, pre-visit questionnaires, post-visit follow-up communication, and messaging with the care team.",
      bullets: [
        "Patient portals and communities connected to live Health Cloud data",
        "Appointment scheduling and pre/post-visit communication workflows",
        "Personalised patient journeys and health campaign communication",
        "Remote monitoring integration where relevant",
      ],
    },
  },
  {
    id: "referral-case-management",
    label: "Referral & Case Management",
    content: {
      heading: "Referral & Case Management",
      text: "Reducing the gap between a referral being made and a referral being acted on, so patients do not fall between providers. Our consultants configure referral tracking with status visibility across the referring and receiving teams.\n\nWe build case management workflows configured around your actual care pathways. Automated handoff notifications keep the receiving provider informed as a referral moves through triage.",
      bullets: [
        "Referral tracking and status visibility across providers",
        "Case management workflows configured around real care pathways",
        "Automated handoff notifications between care team members",
        "Chronic condition monitoring and follow-up tracking",
      ],
    },
  },
  {
    id: "population-health",
    label: "Population Health & Risk Stratification",
    content: {
      heading: "Population Health & Risk Stratification",
      text: "Using the data you already have to identify who needs attention first. Our consultants configure risk stratification models against your patient population.\n\nWe build population health reporting and analytics that support value-based care contracts and quality measure tracking. Risk scores get surfaced to care teams at the point of care, inside the workflow they already use, rather than buried in a separate reporting system nobody opens.",
      bullets: [
        "Risk stratification models configured around your patient population",
        "Population health reporting and analytics",
        "Value-based care and quality measure tracking",
        "AI-driven insights surfaced to care teams at the point of care",
      ],
    },
  },
  {
    id: "compliance-security",
    label: "Compliance & Data Security",
    content: {
      heading: "Compliance & Data Security",
      text: "UK GDPR, NHS DSPT standards, and clinical data security are built into the configuration from the first design decision. Our consultants treat compliance as an architectural concern, since PHI handling errors do not get fixed by policy documents alone.\n\nWe configure role-based access controls aligned to NHS Caldicott Principles, audit trail logging for CQC and DSPT reporting, and data governance policies built into the system design. Salesforce Shield, field audit trails, and event monitoring get configured where the risk profile calls for them.",
      bullets: [
        "Role-based access controls aligned to UK GDPR and Caldicott Principles",
        "Audit trail configuration for regulatory reporting",
        "Data governance policies built into the system design",
        "Ongoing compliance monitoring as requirements and integrations change",
      ],
    },
  },
];

const healthPlatforms = [
  {
    title: "Sales Cloud",
    text: "Our consultants configure Sales Cloud to manage referral partner relationships and provider network growth the way a business development team tracks a pipeline. Network expansion runs on a shared view rather than individual contact spreadsheets.",
    icon: "/images/sales-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Marketing Cloud",
    text: "We build personalised patient and member communication journeys, including appointment reminders, health campaigns, and chronic care check-ins, tied to clinical and engagement data. Message timing reflects actual patient status rather than a batch schedule.",
    icon: "/images/marketing-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
  },
  {
    title: "Experience Cloud",
    text: "Create patient and provider portals connected to live Health Cloud data, with sharing rules that respect UK GDPR data boundaries from day one. Our experts deliver Health Cloud solutions that simplify the patient journey and improve their experience.",
    icon: "/images/experience-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
  },
  {
    title: "Service Cloud",
    text: "Our consultants set up member and patient support so inquiries get routed to the right team, with case history visible instead of starting from scratch on every call. Front-line staff see the complete context of every case.",
    icon: "/images/service-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
  {
    title: "Data Cloud",
    text: "We unify clinical, non-clinical, and administrative data from every source into one patient or member profile. Care coordination and reporting rest on one accurate picture rather than five partial ones.",
    icon: "/images/data-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Agentforce",
    text: "Our consultants build scheduling and routine inquiry agents that handle non-clinical questions, including appointment booking, prescription refill status, and billing queries, and escalate anything clinical to a person immediately. Agents never attempt to act on medical judgment calls, by design.",
    icon: "/images/agent-force.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
];

const healthOrgItems = [
  {
    title: "NHS Trusts, Private Healthcare Groups & Providers",
    paragraphs: [
      "Hospitals and multi-site provider networks run on care coordination across departments, specialties, and locations. A patient moving between the emergency department, an inpatient stay, a specialist visit, and an outpatient follow-up passes through systems that were often bought separately and connected loosely.",
      "At ProvidusCRM, we configure Health Cloud to hold that coordination together: patient records visible across integrated care systems (ICS) and departments, referral tracking that stops referral leakage, and care plans that stay current as different teams update them.",
    ],
  },
  {
    title: "Private Medical Insurance (PMI) & Health Plans",
    paragraphs: [
      "Payers deal with a specific pattern: members experience their plan and their care as disconnected. Enrolment happens in one system, claims processing in another, provider network directories in a third, and member engagement in whatever channel they last used.",
      "Our consultants configure Health Cloud for payers with member engagement workflows connected to claims and eligibility data, so member service teams see the whole picture on the call. Enrolment, benefits verification, and care management flows sit in one system, reducing the disconnect members feel between their plan and their care.",
    ],
  },
  {
    title: "Telehealth & Virtual Care Companies",
    paragraphs: [
      "Telehealth companies operate a healthcare model where the patient gets medical advice virtually. This shifts every operational assumption: scheduling, identity verification, clinical documentation, and follow-up all happen through digital channels.",
      "At ProvidusCRM, we configure Health Cloud around virtual-first workflows: appointment scheduling optimised for time zones and provider licensing, virtual visit workflows integrated with the telehealth platform, and follow-up communication that reflects a healthcare relationship built entirely through devices.",
    ],
  },
  {
    title: "Life Sciences & Pharma",
    paragraphs: [
      "Life sciences and pharma organisations manage patient support programmes and provider engagement across the product lifecycle, from clinical trial support through commercial operations.",
      "Our consultants configure Health Cloud for these specific needs: patient support programme management with adherence tracking, provider engagement tracking, adverse event capture connected to safety reporting, and clinical trial support workflows. The configuration reflects the regulatory context these organisations operate under.",
    ],
  },
  {
    title: "Home Health & Care Management Organisations",
    paragraphs: [
      "Home health and care management organisations deliver care outside a traditional clinical setting, which changes what “care coordination” actually means.",
      "Our consultants configure Health Cloud for mobile-first care delivery. Care coordinators and field teams work from mobile devices, patient status updates happen in real time between visits, and family and caregiver communication sits inside the healthcare record.",
    ],
  },
];

const healthOrgImages: string[] = [
  "/images/industries-pages/industy-types-1.png",
  "/images/industries-pages/industy-types-2.png",
];

const healthWhyChoose = [
  {
    title: "Single Point of Contact",
    color: "var(--color-soft-indigo)",
    icon: "/images/different.webp",
    text: "Our consultant leads your engagement with ProvidusCRM from project kick-off to go-live. They know your processes, challenges, priorities, security concerns, and compliance requirements. They stay on the account long enough to see what happens after launch.",
  },
  {
    title: "Progress Updates",
    color: "var(--color-soft-purple)",
    icon: "/images/better.webp",
    text: "You get a working session and a written summary each week. Any decision touching PID handling or access rules gets flagged and explained specifically. If a design choice has compliance implications, your compliance lead sees it before the build proceeds.",
  },
  {
    title: "Compliance and Security Reviews",
    color: "var(--color-salesforce-blue)",
    icon: "/images/salesforce-partner.webp",
    text: "Before go-live, security and compliance approval happens as a defined milestone. Your compliance officer or Data Protection Officer (DPO) signs off on the patient data configuration in writing, so the audit trail exists from day one.",
  },
  {
    title: "Post-Launch Support",
    color: "var(--color-explore-teal)",
    icon: "/images/consult.webp",
    text: "We schedule reviews to catch integration performance issues as EHR versions or healthcare protocols change. Health Cloud integrations need attention when the connected systems update, and that timing depends on your vendors' release schedules.",
  },
];

const healthFaqs = [
  {
    question:
      "Is Salesforce Health Cloud UK GDPR and NHS DSPT compliant out of the box, or does that depend on configuration?",
    answer:
      "Neither, exactly. Salesforce provides the security and compliance foundation, including UK data hosting options, encryption, audit logging, and Salesforce Shield. However, UK GDPR and DSPT compliance depend on how the platform gets configured: access controls, data handling policies, and integration patterns. Our consultants configure Health Cloud against your specific compliance requirements.",
  },
  {
    question:
      "What is the difference between Health Cloud and Service Cloud for a healthcare organisation?",
    answer:
      "Service Cloud handles general customer service. Health Cloud is built specifically for healthcare, with clinical data models (patient, care plan, condition, medication), healthcare-aware sharing rules, EHR/EMR integration patterns, and care coordination workflows out of the box. For a healthcare organisation, Health Cloud is almost always the right foundation, sometimes with Service Cloud alongside for non-clinical support.",
  },
  {
    question:
      "Can Health Cloud integrate with Epic, Cerner, or other EHR platforms we already use?",
    answer:
      "Yes. Our consultants build integrations with Epic, Cerner, Athena, Allscripts, Meditech, Elation Health, and other EHR platforms. The integration approach depends on the EHR's supported protocols, your interoperability needs, and how much data needs to move in real time versus in batches.",
  },
  {
    question: "What does FHIR interoperability actually mean for our data?",
    answer:
      "FHIR (Fast Healthcare Interoperability Resources) is the healthcare data exchange standard. Health Cloud uses FHIR-aligned data models, so when your EHR speaks FHIR, integration is more straightforward and standardised. It does not eliminate integration work, but it makes the data structures compatible without heavy custom mapping.",
  },
  {
    question:
      "How does Health Cloud handle social determinants of health alongside clinical data?",
    answer:
      "Health Cloud has built-in data models for social determinants of health, so factors like housing stability, food security, transportation access, and social support get captured alongside clinical information. Care coordination workflows can then act on both together, which is often the entire point in complex care management.",
  },
  {
    question:
      "Can we use Health Cloud for population health and risk stratification reporting?",
    answer:
      "Yes. Our consultants configure risk stratification models against your patient population, quality measure tracking for value-based care contracts, and population health reporting that surfaces to care teams at the point of care. This is one of the strongest use cases for Health Cloud beyond individual patient management.",
  },
  {
    question: "How long does a Health Cloud implementation actually take?",
    answer:
      "A focused implementation runs twelve to twenty weeks. Complex projects with multiple EHR integrations, compliance frameworks, and multi-site rollouts typically run six to nine months. Our consultants give a realistic timeline after discovery, based on your actual integration landscape and care model.",
  },
  {
    question:
      "What is the difference between a consultant and an implementation partner?",
    answer:
      "A consultant advises on architecture, integration strategy, and compliance design. An implementation partner actually builds it. Our consultants deliver both together, so strategy and build never drift apart across the project.",
  },
  {
    question: "How much do Health Cloud consulting services cost?",
    answer:
      "Cost depends on scope, EHR integration complexity, compliance requirements, and whether ongoing managed services sit inside the engagement. A focused implementation can start in the mid-tens of thousands of pounds. Our consultants share a clear quote after discovery, based on your actual environment rather than a template.",
  },
  {
    question: "Can Health Cloud support telehealth and remote monitoring workflows?",
    answer:
      "Yes. Our consultants integrate telehealth platforms and remote monitoring devices with Health Cloud, so virtual visits, wearable data, and connected device readings flow into the patient record. Care teams then work from one view, whether the patient was seen in person, virtually, or monitored remotely.",
  },
];

export const healthPage: SeedPage = {
  slug: "industries/salesforce-health-cloud-consulting",
  title: "Industries — Health Cloud",
  legacyKey: "salesforce-health-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Health Cloud Consultant & Implementation Partner in the UK",
    description:
      "Certified Salesforce Health Cloud consultants in the UK. We connect Health Cloud to your EHR, telehealth, and clinical systems with UK GDPR and NHS DSPT-compliant configuration.",
  },
  jsonLdFallback: healthSchema,
  sections: [
    // L61 <SalesforceServiceHero badgeTitle badgeSubtitle kicker title description bullets formTitle formButtonLabel /> (no backgroundImage: the component default applies)
    {
      _type: "salesforceServiceHero",
      kicker: "Salesforce Health Cloud Consultant & Implementation Partner in the UK",
      badgeTitle: "Certified",
      badgeSubtitle: "Salesforce Partner in the UK",
      title: "Patient Data Synced Across Your Systems With Salesforce Health Cloud",
      description:
        "At ProvidusCRM, we configure Salesforce Health Cloud and connect it to your EHR, telehealth platform, and other clinical systems. Healthcare teams see clinical and non-clinical information, including medical history, social determinants of health, and care plan status, in one place.",
      bullets: healthHeroBullets,
      formTitle: "Fill a form today",
      formButtonLabel: "Let's Connect",
    },
    // L78 <PartnersSection />
    partnersSection(),
    // L81 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Where Your Patient Data Is Getting Lost", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: healthDescParagraphs,
    },
    // L96 <ExpertiseChallengesSection items /> (the route passes no title)
    {
      _type: "expertiseChallengesSection",
      items: challengeCards(healthChallenges),
    },
    // L117 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Health Cloud Solutions & Services We Offer",
      tabs: tabsOf(healthTabs),
      backgroundOverlayColor: "#616161",
    },
    // L209 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-health-cloud-consulting") },
    // L217 <IndustryCtaSection title buttonLabel buttonHref image /> (the route passes no imageAlt, so the component's empty default applies)
    {
      _type: "industryCtaSection",
      title: "Not sure if your current setup meets NHS DSPT and UK GDPR standards?",
      buttonLabel: "Talk to a Consultant",
      buttonHref: "/contact",
      image: img("/images/industries-pages/industry-cta-1.png"),
    },
    // L225 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Beyond Health Cloud: Explore ProvidusCRM's Expertise Across The Salesforce Platform",
      items: platformCards(healthPlatforms),
    },
    // L268 <OrganisationTypesSection title items images />
    {
      _type: "organisationTypesSection",
      title: "Types of Organisations We Build & Deliver Health Cloud Solutions For",
      items: healthOrgItems,
      images: healthOrgImages.map((p) => img(p)),
    },
    // L314 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Work With Certified, Experienced Salesforce Health Cloud Consultants in the UK"),
      text:
        "ProvidusCRM provides you access to a team of experts holding certifications across the Salesforce ecosystem and having delivered successful implementations and solutions across healthcare providers, insurance, home health, telehealth, and life sciences organisations. We have enabled our clients to seamlessly connect Health Cloud to their systems, tools, and workflows while ensuring UK GDPR and DSPT-compliant access rules.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L321 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L337 <WhyChooseSection title customReasons image backgroundOverlayColor />
    {
      _type: "whyChooseSection",
      title: "What Makes ProvidusCRM a Trusted Salesforce Health Cloud Partner",
      reasons: reasonCards(healthWhyChoose),
      image: img("/images/industries-pages/i-why-choose-health.jpg", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L370 <FaqSection title faqs />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs: healthFaqs },
    // L432 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-health-cloud-consulting") },
    // L437 <CtaSection title buttonLabel buttonHref backgroundImage /> 
    ctaSection(
      "Ready to connect your patient data across every system?",
      "Talk to an Expert",
      "/contact",
      "/images/cta-bg.webp",
    ),
  ],
};

// ---------------------------------------------------------------------------
// /industries/salesforce-nonprofit-consulting

// getSitePageJsonLd("salesforce-nonprofit-consulting", schema)
const npSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Nonprofit Consulting & Implementation Partner",
  "description": "Certified Salesforce Nonprofit Cloud and NPSP consultants in the UK. We connect donor, programme, grant, and volunteer data in one system with reporting that holds up in a board meeting.",
  "url": "https://providuscrm.co.uk/industries/salesforce-nonprofit-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

const npHeroBullets = [
  "Certified Salesforce Nonprofit Cloud and NPSP consultants",
  "Donor, program, and grant data connected in one system",
  "Reporting that holds up in a board meeting, not just a dashboard",
  "Ongoing support so the system does not quietly drift back into spreadsheets",
];

const npTrueCostIntro = [
  "Many nonprofits hear “Salesforce is free for nonprofits” at some point when choosing the right CRM platform. Well, this is partially true.",
  "Salesforce’s Power of Us programme gives eligible nonprofits ten free Sales Cloud and Service Cloud licences, plus discounted pricing on additional licences and Nonprofit Cloud itself.",
  "But implementation, configuration, migration, integrations, and support all carry costs.",
];

const npTrueCostCards = [
  {
    title: "Salesforce Power of Us",
    text: "Power of Us covers ten free Salesforce licences and discounted pricing for eligible nonprofits.\n\nThe true cost of setting up Nonprofit Cloud successfully involves specialised consulting, implementation, customisation, configuration, data migration, integrations, and ongoing support.",
    background: "var(--color-cost-card-green)",
    iconColor: "var(--color-brand-green)",
    icon: "/images/salesforce-power.svg",
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
    icon: "/images/non-profit-imp.svg",
  },
];

const npTrueCostHighlights = [
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
];

const npNegativeItems = [
  "Months of admin time learning while building",
  "Reconfiguration cost when the build cannot scale",
  "Data migration errors that surface months later",
  "Broken sharing rules that expose donor data",
  "Manual workarounds because reporting was not scoped properly",
  "Dependency on one admin",
];

const npPositiveItems = [
  "Configuration was built once successfully with Salesforce NPC best practices",
  "Validated data migration from any legacy platform",
  "Sharing rules designed before launch, not an afterthought",
  "Board-ready reporting scoped to leadership's actual questions",
  "Documentation and training built for team handoff",
  "Customising Salesforce Nonprofit Cloud to your workflows and goals",
];

const npTabs = [
  {
    id: "donor-fundraising",
    label: "Donor & Fundraising",
    content: {
      heading: "Donor & Fundraising Management",
      text: "Unify donor records across all donation channels. We configure Nonprofit Cloud so that online donations, direct mail responses, event ticketing, and donor-advised fund gifts all resolve to the same constituent record.\n\nMoves management workflows track major gift pipelines properly, while recurring donation automation handles processing through FinDock or your preferred partner. We build automated Gift Aid tracking and HMRC claim processing directly into your system, ensuring your organisation automatically maximises its eligible revenue.",
      bullets: [
        "Unified donor profiles across online giving, direct mail, events, and donor-advised funds",
        "Moves management and major gift pipeline tracking",
        "Recurring donation automation and payment processing",
        "Donor segmentation that distinguishes giving capacity and pattern",
      ],
    },
  },
  {
    id: "grant-management",
    label: "Grant Management",
    content: {
      heading: "Grant Management",
      text: "At ProvidusCRM, our consultants configure grant management so that applications, awards, milestones, and spending documentation all sit against the grant record in Nonprofit Cloud.\n\nCompliance deadlines trigger automated reminders. Documentation is attached to the specific milestone. Where funders require a grantee reporting portal, we build one on Experience Cloud connected to live grant data, so grantees report against the same record your team works from.",
      bullets: [
        "Grant application and award tracking",
        "Milestone and spending documentation tied to the actual grant record",
        "Compliance deadline tracking and automated reminders",
        "Grantee portal setup where funder reporting requires it",
      ],
    },
  },
  {
    id: "programme-beneficiary",
    label: "Programme & Beneficiary",
    content: {
      heading: "Programme & Beneficiary Management",
      text: "Get a single view of who you are serving and what is actually changing for them. Our consultants configure beneficiary and case tracking around your specific programme model.\n\nIndividual donations connect to individual programme outcomes, so the \u201chow is my donation being spent?\u201d question becomes answerable in specific detail rather than in aggregate figures that satisfy nobody.",
      bullets: [
        "Beneficiary and case tracking configured around your specific programme model",
        "Outcome and impact measurement tied to individual programmes",
        "Service delivery tracking across multiple programme sites or cohorts",
        "Reporting that ties individual donations to individual programme outcomes",
      ],
    },
  },
  {
    id: "volunteer-event",
    label: "Volunteer & Event",
    content: {
      heading: "Volunteer & Event Management",
      text: "Match volunteers to the tasks that need the most attention. We configure volunteer management to track skills, availability, and previous assignments, so volunteer coordinators find the right person for each opportunity rather than emailing everyone.\n\nEvent registration, payment, and attendance sit in the same system. Volunteer hours count toward programme impact reporting rather than being kept in a separate log.",
      bullets: [
        "Volunteer skills, availability, and assignment tracking",
        "Event registration, payment, and attendance management",
        "Volunteer hour tracking tied to programme impact reporting",
        "Communication workflows for volunteer coordination",
      ],
    },
  },
  {
    id: "fund-accounting",
    label: "Fund Accounting",
    content: {
      heading: "Fund Accounting & Financial Integration",
      text: "Track restricted and unrestricted funds the way your finance team needs them. We set up and configure fund accounting, so donor intent, restrictions, and programme allocations are traceable from gift receipt through disbursement.\n\nWhether native Salesforce fund accounting fits your setup or an integration with Accounting Seed, QuickBooks, or NetSuite makes more sense, we build it so the audit trail exists.",
      bullets: [
        "Fund accounting setup",
        "Restricted vs unrestricted fund tracking tied to donor intent",
        "Board-ready financial reporting without manual reconciliation",
        "Audit-ready documentation built into the system",
      ],
    },
  },
  {
    id: "communities-portals",
    label: "Communities & Portals",
    content: {
      heading: "Communities & Portals",
      text: "We create self-service portals on Experience Cloud for donors, volunteers, and grantees, connected to live Nonprofit Cloud data.\n\nDonor portals show giving history and programme impact. Grantee portals handle application and milestone reporting. Volunteer self-service covers scheduling and hour logging. Access rules follow the same governance principles as any Experience Cloud project, defined and tested before launch.",
      bullets: [
        "Donor portals showing giving history and programme impact",
        "Grantee portals for application and milestone reporting",
        "Volunteer self-service scheduling and hour logging",
      ],
    },
  },
];

const npPlatforms = [
  {
    title: "Sales Cloud",
    text: "We execute end-to-end Sales Cloud configuration with Nonprofit Cloud to track prospective major donors and volunteer recruitment the way a sales team tracks a pipeline, often using the free licences available through the Power of Us programme.",
    icon: "/images/sales-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Marketing Cloud",
    text: "Our consultants build segmented donor journeys and appeal campaigns tied to giving history. A lapsed donor gets a different message than a major gift prospect, and event attendees get relevant follow-up sequences.",
    icon: "/images/marketing-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
  },
  {
    title: "Experience Cloud",
    text: "Create donor, volunteer, and grantee portals connected to live Nonprofit Cloud data. Self-service means self-service on your actual records, with sharing rules that respect donor privacy and grantee reporting boundaries.",
    icon: "/images/experience-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
  },
  {
    title: "Service Cloud",
    text: "We set up constituent support so donor inquiries and beneficiary requests get routed and resolved without falling through the cracks of a general inbox. Case history connects to the constituent record, so context does not get lost between interactions.",
    icon: "/images/service-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
  {
    title: "Data Cloud",
    text: "Our consultants unify donor, volunteer, and beneficiary data from every source into one profile. Segmentation and reporting rest on one accurate picture rather than five partial ones that quietly contradict each other.",
    icon: "/images/data-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
  },
  {
    title: "Agentforce",
    text: "We build donor inquiry agents with Agentforce that answer routine questions and route anything sensitive to a staff member. This frees up relationship-building work for the people who do it well.",
    icon: "/images/agent-force.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
  },
];

const npSolutionCards = [
  {
    title: "Grantmaking Foundations",
    text: "Configuration centred on application intake, milestone-based disbursement, and compliance reporting across a portfolio of grantees. Application scoring workflows, grant lifecycle tracking from award to closeout, and grantee reporting portals that surface funder requirements clearly.",
    icon: "/images/industries-pages/nonprofit-types/grantmaking.png",
    color: "var(--color-brand-green)",
  },
  {
    title: "UK-Registered Charities & Relief Organisations",
    text: "Beneficiary case tracking, service delivery metrics, and rapid-response donation processing are built to scale without losing data integrity. We configure case management, surge-capable donation flows, and reporting frameworks that align directly with Charity Commission requirements.",
    icon: "/images/industries-pages/nonprofit-types/charities.png",
    color: "var(--color-type-teal)",
  },
  {
    title: "Faith-Based Organisations",
    text: "Membership, tithing, and congregation communication are tracked alongside broader fundraising and outreach. Household relationships that reflect how congregations actually work, giving history connected to member records, and pastoral communication workflows.",
    icon: "/images/industries-pages/nonprofit-types/faith-based.png",
    color: "var(--color-type-purple)",
  },
  {
    title: "Higher Education Advancement Offices",
    text: "Alumni relationship tracking and major gift pipeline management across a donor base spanning decades. Nonprofit Cloud, alongside Education Cloud, connects alumni engagement, career milestones, event attendance, and giving history in one view.",
    icon: "/images/industries-pages/nonprofit-types/education.png",
    color: "var(--color-type-magenta)",
  },
  {
    title: "Arts & Cultural Institutions",
    text: "Membership, ticketing, and patron giving are connected in one system, since a season ticket holder, a gala donor, and a member are often the same person. Nonprofit Cloud is configured to hold these as one supporter view.",
    icon: "/images/industries-pages/nonprofit-types/arts-culture.png",
    color: "var(--color-type-amber)",
  },
];

const npWhyChoose = [
  {
    title: "A Single Point of Contact",
    color: "var(--color-soft-indigo)",
    icon: "/images/different.webp",
    text: "Our consultant leads your engagement from kickoff through go-live and stays involved long enough to see what actually happened after launch. Escalations, decisions, and progress questions all go through one place.",
  },
  {
    title: "Clarity Over Pricing & Timelines",
    color: "var(--color-soft-purple)",
    icon: "/images/better.webp",
    text: "Nonprofit technology budgets are typically fixed grant or operating funds with no room for a late surprise on the final invoice. Every quote we share breaks down scope, timeline, and cost in plain terms before any work begins.",
  },
  {
    title: "User Adoption Training & Support",
    color: "var(--color-salesforce-blue)",
    icon: "/images/salesforce-partner.webp",
    text: "A well-configured Salesforce org only pays back when your team actually uses it. We create training documentation for your team and align it to your existing workflows for smoother, faster user adoption.",
  },
];

const npFaqs = [
  {
    question:
      "Is Salesforce actually free for nonprofits, and what is the catch?",
    answer:
      "Salesforce's Power of Us programme provides eligible nonprofits with ten free Sales Cloud and Service Cloud licences, and discounted pricing on additional licences and Nonprofit Cloud itself. The catch, in a sense, is that implementation, configuration, data migration, integrations, and ongoing support all carry a cost. The software may be free or discounted, but the setup work is what a Salesforce implementation costs at that scope in any sector.",
  },
  {
    question:
      "What is the difference between NPSP and Nonprofit Cloud, and which one do we need?",
    answer:
      "NPSP (Nonprofit Success Pack) is a managed package that sits on top of the Salesforce Platform. Nonprofit Cloud is Salesforce's newer native industry cloud, built for nonprofits from the ground up. NPSP is proven and stable. Nonprofit Cloud is where Salesforce is investing in new features. The right choice depends on your data model, programme complexity, and integration needs. Our consultants advise honestly on both.",
  },
  {
    question:
      "How does the Power of Us programme eligibility work?",
    answer:
      "Power of Us is available to nonprofits, higher education institutions, and other eligible organisations that meet Salesforce's criteria, which typically include registered charitable status and use of the platform for mission-related work. Applications are processed directly through Salesforce's dedicated validation channels. Our consultants can walk you through UK charity status verification, Gift Aid readiness, and help you navigate the application process as part of our initial scoping conversation.",
  },
  {
    question:
      "Can Nonprofit Cloud integrate with Accounting Seed, QuickBooks, or NetSuite for fund accounting?",
    answer:
      "Yes. Our consultants set up integrations with UK-standard financial tools including Sage Intacct, Xero, QuickBooks, NetSuite, and Accounting Seed (which runs natively on Salesforce) to ensure seamless reconciliation of restricted and unrestricted funds. The right choice depends on your finance team's current stack and reporting requirements.",
  },
  {
    question:
      "How do we track restricted versus unrestricted funds properly?",
    answer:
      "Fund tracking gets configured at the donation level, so donor intent, restrictions, and programme allocation are traceable from the gift receipt through to disbursement. Reporting then shows restricted balances by fund and unrestricted totals separately. This is the piece boards ask about most, so we set it up carefully.",
  },
  {
    question:
      "Can we tie individual donations to specific programme outcomes for donor reporting?",
    answer:
      "Yes, when donation records, programme records, and outcome measurements are connected in Nonprofit Cloud. This is one of the strongest arguments for moving off scattered spreadsheets: the “how is my donation being spent” question becomes answerable in specific detail without a week of manual work.",
  },
  {
    question:
      "How does grant milestone tracking actually work in the system?",
    answer:
      "Each grant becomes a record with linked milestone, spending, and reporting records. Deadlines trigger automated reminders. Documentation attaches to the specific milestone rather than a shared drive. Grantees can update their reporting through a portal if the funder requires it.",
  },
  {
    question:
      "How long does a Nonprofit Cloud implementation take?",
    answer:
      "A focused implementation runs eight to sixteen weeks. Complex projects with multiple programmes, grant management, fund accounting integration, and portals typically run four to six months. Our consultants give a realistic timeline after discovery, based on your programme model and integration landscape.",
  },
  {
    question:
      "How much does implementation actually cost if the licences are free?",
    answer:
      "Cost depends on scope, integration complexity, and whether ongoing managed services sit inside the engagement. A focused NPSP or Nonprofit Cloud implementation typically starts in the low tens of thousands of pounds. Complex multi-programme implementations with fund accounting integration and portals run higher. Our consultants share a specific quote after scoping.",
  },
  {
    question:
      "Can volunteers and donors access a self-service portal without IT overhead?",
    answer:
      "Yes. Our consultants build donor, volunteer, and grantee portals on Experience Cloud with the maintenance overhead scoped from the start. Access rules, page templates, and content structures get configured so your team can update the portal without a developer for routine changes.",
  },
];

export const nonprofitPage: SeedPage = {
  slug: "industries/salesforce-nonprofit-consulting",
  title: "Industries — Nonprofit",
  legacyKey: "salesforce-nonprofit-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Nonprofit Consulting & Implementation Partner",
    description:
      "Certified Salesforce Nonprofit Cloud and NPSP consultants in the UK. We connect donor, programme, grant, and volunteer data in one system with reporting that holds up in a board meeting.",
  },
  jsonLdFallback: npSchema,
  sections: [
    // L59 <SalesforceServiceHero badgeTitle badgeSubtitle kicker title description bullets formTitle formButtonLabel /> (no backgroundImage: the component default applies)
    {
      _type: "salesforceServiceHero",
      kicker: "Salesforce Nonprofit Consulting & Implementation Partner",
      badgeTitle: "Certified",
      badgeSubtitle: "Salesforce Partner in the UK",
      title: "Your Fundraising, Programme & Grant Data In One Place",
      description:
        "Create lasting donor relationships, pull presentable reports, and track grant milestones with our Salesforce Nonprofit Cloud consulting and implementation services. We configure Salesforce NPC and NPSP so donor, program, grant, and volunteer data live in one connected system.",
      bullets: npHeroBullets,
      formTitle: "Fill a form today",
      formButtonLabel: "Let's Connect",
    },
    // L76 <PartnersSection />
    partnersSection(),
    // L79 <TrueCostSection heading subtitle intro cards panelTitle highlights />
    {
      _type: "trueCostSection",
      heading: heading("What\u2019s The True Cost of Salesforce for Nonprofits", { mark: "after", markStyle: "section", markSpace: true }),
      subtitle: "Not sure what “free for nonprofits” really means? Here’s a breakdown to help you plan your Salesforce investment.",
      intro: npTrueCostIntro,
      cards: npTrueCostCards.map((c) => ({
        title: c.title,
        text: c.text,
        bullets: c.bullets,
        background: c.background,
        iconColor: c.iconColor,
        icon: img(c.icon),
      })),
      panelTitle: "Simplifying Salesforce for Nonprofits",
      highlights: npTrueCostHighlights,
    },
    // L143 <ComparisonSection heading subtitle negativeTitle negativeItems positiveTitle positiveItems footnote buttonLabel buttonHref />
    {
      _type: "comparisonSection",
      heading: heading("DIY Implementation vs Certified Salesforce Nonprofit Cloud Partner", { mark: "after", markStyle: "section", markSpace: true }),
      subtitle: "Salesforce's free licences make DIY implementation tempting. Here is what typically works and what usually breaks, so you can make a more informed decision.",
      negativeTitle: "What DIY Implementation Costs",
      negativeItems: npNegativeItems,
      positiveTitle: "What ProvidusCRM Brings",
      positiveItems: npPositiveItems,
      footnote: "Reach out to our consultants to discuss the impact Salesforce Nonprofit Cloud and ProvidusCRM can deliver for your organisation.",
      buttonLabel: "Book a Call",
      buttonHref: "/contact",
    },
    // L175 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-nonprofit-consulting") },
    // L183 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Nonprofit Cloud Services We Offer",
      tabs: tabsOf(npTabs),
      backgroundOverlayColor: "#616161",
    },
    // L274 <IndustryCtaSection title buttonLabel buttonHref image /> (the route passes no imageAlt, so the component's empty default applies)
    {
      _type: "industryCtaSection",
      title: "Schedule a consultation with our certified Salesforce Nonprofit Cloud consultants.",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      image: img("/images/industries-pages/industry-cta-1.png"),
    },
    // L282 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Salesforce Expertise Beyond Nonprofit Cloud",
      items: platformCards(npPlatforms),
    },
    // L325 <SolutionTypesSection heading subtitle cards />
    {
      _type: "solutionTypesSection",
      heading: heading("Solutions We’ve Delivered For Different Types of Nonprofits"),
      subtitle: "Every nonprofit runs differently. Configuration reflects what your specific type of organisation needs.",
      cards: npSolutionCards.map((c) => ({ title: c.title, text: c.text, icon: img(c.icon), color: c.color })),
    },
    // L363 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("You Can Count On Our Certified Salesforce Nonprofit Cloud Expertise"),
      text:
        "Our team consists of experienced talent holding certifications across the Salesforce ecosystem, including Nonprofit Cloud, and delivering implementations across fundraising, programme, and grant management contexts. We work in the specific technical territory where donor, program, grant, and fund accounting data need to hold together under audit and board scrutiny, and where the operating reality is usually a small team wearing several hats each.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L370 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L386 <WhyChooseSection title customReasons image backgroundOverlayColor />
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Nonprofit Cloud Partner",
      reasons: reasonCards(npWhyChoose),
      image: img("/images/platform-expertise/expertise-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L413 <FaqSection title faqs />
    { _type: "faqSection", title: "Frequently Asked Questions", faqs: npFaqs },
    // L479 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-nonprofit-consulting") },
    // L484 <CtaSection title buttonLabel buttonHref backgroundImage /> 
    ctaSection(
      "Bring Your Nonprofit to Salesforce With ProvidusCRM",
      "Let's Connect",
      "/contact",
      "/images/cta-bg.webp",
    ),
  ],
};
