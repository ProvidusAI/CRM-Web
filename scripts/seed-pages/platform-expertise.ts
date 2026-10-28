import { DEFAULT_IDENTITY_RESOLUTION } from "@/components/sections/IdentityResolutionSection";
import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { curated, heading, img } from "./lib";
import type { SeedPage, SeedSection } from "./types";

// Sources: the six pages under src/app/(site)/platform-expertise/salesforce-*-consulting.
// The section bodies were generated from each route's JSX by a script that reads the
// TypeScript AST (no retyping): every string, list and heading is the route's own
// value, every component prop the route passes is seeded with the same value, and a
// prop the route omits is omitted here too, except images whose alt falls back to the
// component's own default (seeded explicitly so editors see it). A route's wrapper div
// is `overflow-x-hidden bg-white`, hence clipOverflowX on all six. None of the routes
// pass a hero imageAlt or imageClassName.

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

// <IdentityResolutionSection /> (no props: the component's own defaults, written out)
const identityResolutionSection = (): SeedSection => ({
  _type: "identityResolutionSection",
  headingStart: DEFAULT_IDENTITY_RESOLUTION.headingStart,
  headingEnd: DEFAULT_IDENTITY_RESOLUTION.headingEnd,
  introParagraphs: DEFAULT_IDENTITY_RESOLUTION.introParagraphs,
  desktopImage: img(DEFAULT_IDENTITY_RESOLUTION.desktopImage, DEFAULT_IDENTITY_RESOLUTION.desktopImageAlt),
  mobileImage: img(DEFAULT_IDENTITY_RESOLUTION.mobileImage, DEFAULT_IDENTITY_RESOLUTION.mobileImageAlt),
  columns: DEFAULT_IDENTITY_RESOLUTION.columns,
});

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-agentforce-consulting

// getSitePageJsonLd("salesforce-agentforce-consulting", schema)
const agentforceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Agentforce Consulting | ProvidusCRM",
  "description": "Salesforce Agentforce Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-agentforce-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const agentforcePage: SeedPage = {
  slug: "platform-expertise/salesforce-agentforce-consulting",
  title: "Platform Expertise — Agentforce",
  legacyKey: "salesforce-agentforce-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Agentforce Consulting | ProvidusCRM",
    description: "Salesforce Agentforce Consulting Services",
  },
  jsonLdFallback: agentforceSchema,
  sections: [
    // L61 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Agentforce Consulting & Implementation",
      subtitleAsH1: true,
      title: heading("Automate Your Workflows with Agentforce & ProvidusCRM", { mark: "after", markStyle: "hero", markSpace: false }),
      description: "Work with certified Agentforce specialists to configure agents that handle tasks like case resolution, lead qualification, and appointment scheduling using your Salesforce data. We set clear rules about what the agents can and cannot do on their own.",
      bullets: [
        "Certified Salesforce Agentforce specialists",
        "Agents built around one clearly defined task at a time",
        "Human escalation built in for anything outside the rules",
        "Start with a working pilot",
      ],
      image: img("/images/platform-expertise/agentforce-hero.webp", "Business meeting"),
    },
    // L81 <PartnersSection />
    partnersSection(),
    // L84 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-agentforce-consulting") },
    // L92 <ExplainerCardsSection heading cards /> (iconVariant unset: the tile default)
    {
      _type: "explainerCardsSection",
      heading: heading("What Agentforce Is (And What It Isn't)"),
      cards: [
        {
          title: heading("It automates,\nnot just responds"),
          text: "Agentforce is a lot more than a chatbot that provides intelligent, accurate responses. It independently executes multi-step, complex business-critical tasks. It uses advanced reasoning via the Atlas Reasoning Engine to analyze context, build execution plans, and carry out tasks with your existing business data.",
          icon: img("/images/platform-expertise/agentforce-what-is/automates-icon.png"),
        },
        {
          title: heading("It works within\nyour defined boundaries"),
          text: "Our Salesforce administrators configure exact rules, instructions, topics, and guardrails via the visual Agentforce Builder to ensure the AI aligns with your rules and company policies. We connect your agents to Salesforce Data Cloud, enabling them to access real-time structured and unstructured data to provide accurate, context-rich responses.",
          icon: img("/images/platform-expertise/agentforce-what-is/boundaries-icon.png"),
        },
        {
          title: heading("It has a clear\nescalation path"),
          text: "When requests become too complex or urgent, the system seamlessly transfers the conversation to a human team member using Omni-Channel routing, providing the human with the full context history.",
          icon: img("/images/platform-expertise/agentforce-what-is/escalation-icon.png"),
        },
      ],
    },
    // L132 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Start With A Pre-Built Agent and Customise",
      tabs: [
        {
          label: "Service Agent",
          heading: "Service Agent",
          text: "Handles routine case inquiries, status checks, and common resolutions. Our specialists configure the agent to work on a defined set of case types, escalating anything outside that scope to a human agent with full context.",
          bullets: [
            "Case status and resolution for defined case types",
            "Knowledge base lookup and article surfacing",
            "Escalation to a human for out-of-scope cases",
            "Full case context handed over on escalation",
          ],
        },
        {
          label: "SDR Agent",
          heading: "SDR Agent",
          text: "Qualifies inbound leads against your criteria and books qualified meetings on your reps' calendars. Our specialists configure the agent around your ideal customer profile, disqualification rules, and meeting types. Ambiguous leads or edge cases hand off to a human SDR rather than getting force-qualified.",
          bullets: [
            "Lead qualification against defined criteria",
            "Meeting booking on reps' actual calendars",
            "Handover for ambiguous or edge cases",
            "Full conversation history passed to the rep",
          ],
        },
        {
          label: "Sales Coach",
          heading: "Sales Coach",
          text: "Reviews deal and call data to surface coaching suggestions for reps and managers. Our specialists configure the agent to analyse against your sales methodology and named opportunity fields. The agent surfaces suggestions rather than taking actions on deals itself, so reps stay in control of their pipeline.",
          bullets: [
            "Deal review against your sales methodology",
            "Call transcript analysis for coaching moments",
            "Suggestions surfaced to reps and managers",
            "No autonomous action on deals or forecasts",
          ],
        },
        {
          label: "Campaign Agent",
          heading: "Campaign Agent",
          text: "Manages campaign tracking and optimisation suggestions within rules you set. Our specialists configure the agent to monitor campaign performance, surface underperformance early, and suggest changes. The agent does not launch spend changes or activate audiences without human approval.",
          bullets: [
            "Campaign performance monitoring",
            "Early flagging of underperformance",
            "Optimisation suggestions surfaced to marketers",
            "Human approval required for spend and audience changes",
          ],
        },
        {
          label: "Custom Agent",
          heading: "Custom Agent",
          text: "Built around a specific task unique to your business, following the same principles as the templates above. Our specialists scope the agent's job, its data access, its escalation path, and its measurable outcome before configuration starts. Therefore, you know exactly what the agent will do and where it will stop before the build begins.",
          bullets: [
            "Task scoped to one clear job",
            "Data access defined explicitly",
            "Escalation path documented from the start",
            "Success measured against a specific outcome",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L210 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Discuss Your CRM Automation Goals With Our Certified Agentforce Specialists and Consultants.",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L219 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Agentforce Partner?",
      reasons: [
        {
          title: "Operational Excellence",
          text: "We help you build and implement Salesforce orgs that are designed around your processes, delivering business value from day one. Our goal is to drive successful rollouts, enable adoption across your teams, and ensure Salesforce aligns perfectly with your operations and objectives.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "Technical Depth",
          text: "Our team of Salesforce consultants is highly skilled and technically proficient, while boasting certifications across the Salesforce ecosystem. From sales to marketing to service operations, we help you reinvent your processes, boost revenue, and drive operational efficiency.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Business-First Approach",
          text: "No generic solutions. No one-size-fits-all orgs. Your business is unique. Your requirements are different. We provide you with a viable solution that's not only intuitive but also supports your growth initiatives and innovation goals.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/why-choose-agentforce.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L246 <ServiceBenefitsSection title items />
    {
      _type: "serviceBenefitsSection",
      title: "How Our Salesforce Consulting Services Help You",
      items: [
        {
          title: "Improve ROI",
          description: "If not deployed the right way, Salesforce can burn your CRM budget and turn out to be one of your largest business expenses. You deserve better value against your investments. We ensure Salesforce delivers significant ROI for your business. Our CRM strategies are aligned with your goals, processes, scope, and budget.",
          iconKey: "roi",
          colorTheme: "blue",
        },
        {
          title: "User Adoption",
          description: "The best-configured Salesforce org in the world is useless if the people who need it refuse to use it. Adoption is a design problem before it is a training problem, and that is where our consultants start.",
          iconKey: "adoption",
          colorTheme: "green",
        },
        {
          title: "Platform Maturity",
          description: "Most Salesforce orgs grow by accident. Patches on patches, workarounds layered over workarounds, until nobody remembers why anything was built. Our consultants help organisations move past that, into something stable enough to scale on.",
          iconKey: "maturity",
          colorTheme: "yellow",
        },
        {
          title: "Lifecycle Visibility",
          description: "When the journey from first enquiry to renewal lives across six systems, leadership ends up guessing. Our consultants design the reporting and dashboards that pull the whole picture into one place.",
          iconKey: "view360",
          colorTheme: "peach",
        },
      ],
    },
    // L277 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Platform Expertise",
      items: [
        {
          title: "Sales Cloud",
          text: "We configure Sales Cloud around how your sales team works day to day. Our consultants map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better with cleaner data at the base.",
          icon: img("/images/sales-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Service Cloud",
          text: "Case resolution improves when we set up Service Cloud properly around agent workflows. Managers see the full picture of service performance in one place, and Agentforce agents perform best when case data sits structured cleanly underneath them.",
          icon: img("/images/service-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Marketing Cloud",
          text: "Journeys, data extensions, and reporting need to connect properly to your CRM data before Marketing Cloud can deliver. We configure the platform cleanly underneath, so Campaign Agents work against reliable data rather than a fragmented setup.",
          icon: img("/images/marketing-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Data Cloud",
          text: "Data Cloud unifies customer records across systems. Agentforce agents run on Data Cloud profiles, so identity resolution and unified data directly shape how reliably those agents perform in production.",
          icon: img("/images/data-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "Portals connect properly to your Salesforce data, so customers and partners get a working self-service experience. Our consultants configure Agentforce agents to operate inside portals with the same governance and escalation rules applied consistently.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Revenue Cloud",
          text: "We configure Revenue Cloud and CPQ against your actual product catalogue and pricing logic. Quoting stays fast and accurate, and Sales Coach agents surface pipeline insights that reflect actual revenue logic rather than assumed pricing.",
          icon: img("/images/revenue-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
      ],
    },
    // L320 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("How We Setup Agentforce Across Industries"),
      items: [
        {
          title: "Non-Profit",
          text: "A donor inquiry agent that answers and routes complex requests to your staff. This frees fundraising teams for relationship-building work that should not be automated. Our consultants configure the agent within your donor data access rules, so supporters see their own history and nothing else. Escalation goes to the right team member based on the request type, with full context.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Healthcare",
          text: "An appointment scheduling and inquiry agent operating within strict patient data access rules. The agent handles booking, rescheduling, cancellations, and general inquiries, escalating anything clinical to a person immediately. We configure the agent against Health Cloud consent scopes and access rules, so the agent respects the same privacy boundaries as the clinical team.",
          image: img("/images/platform-expertise/health.webp"),
        },
        {
          title: "Financial Services",
          text: "A client service agent handling routine account queries within compliance-defined boundaries. Every action gets logged for audit trail purposes. Our consultants configure the agent with KYC-aware access rules and product suitability boundaries built in. Anything requiring advice or a licensed decision escalates to an adviser, with the client's context ready.",
          image: img("/images/platform-expertise/finance.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "An order status and returns agent handling routine inquiries at volume. The agent handles the common cases quickly, escalating disputes or exceptions to a human. We configure the agent against Commerce Cloud data, so responses reflect live order status. Returns policies get encoded as rules the agent follows rather than as guidance it interprets.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
      ],
    },
    // L347 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How does Agentforce drive automation across my workflows with Salesforce AI agents?",
          answer: "Agentforce doesn't rely on rigid, pre-built decision trees. It is driven by the Atlas Reasoning Engine. Think of Atlas as the \"brain\" of the system. It uses a design framework called ReAct to complete complex goals.",
        },
        {
          question: "How much access do Agentforce agents have to our data?",
          answer: "They only access data permitted by your Salesforce security model, including Sharing Rules and Permission Sets. The Einstein Trust Layer masks PII and guarantees zero data retention by external LLMs.",
        },
        {
          question: "Do we need Salesforce Data Cloud to use Agentforce?",
          answer: "No. You can ground agents using standard CRM records and Knowledge. However, Data Cloud acts as a major force multiplier for searching massive, unstructured, or real-time external data lakes.",
        },
        {
          question: "What are the differences between Agentforce and Salesforce Einstein?",
          answer: "Einstein is an AI assistant that helps humans work faster. Agentforce is Salesforce's very own autonomous agentic AI platform that independently reasons, triggers workflows, and completes entire tasks from start to finish.",
        },
        {
          question: "Is Agentforce secure enough for regulated environments?",
          answer: "Yes. Built on Hyperforce, it meets strict compliance standards. It features the Einstein Trust Layer for PII masking, rigorous system guardrails, and audit-ready reasoning logs.",
        },
      ],
    },
    // L373 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-agentforce-consulting") },
    // L378 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Automate Your Workflows With ProvidusCRM",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-data-cloud-consulting

// getSitePageJsonLd("salesforce-data-cloud-consulting", schema)
const dataCloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Data Cloud Consulting | ProvidusCRM",
  "description": "Salesforce Data Cloud Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-data-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const dataCloudPage: SeedPage = {
  slug: "platform-expertise/salesforce-data-cloud-consulting",
  title: "Platform Expertise — Data Cloud",
  legacyKey: "salesforce-data-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Data Cloud Consulting | ProvidusCRM",
    description: "Salesforce Data Cloud Consulting Services",
  },
  jsonLdFallback: dataCloudSchema,
  sections: [
    // L63 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Salesforce Data Cloud Consulting & Implementation Partner",
      subtitleAsH1: true,
      title: heading("Salesforce Data Cloud Consulting", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "At ProvidusCRM, we configure Salesforce Data Cloud so that customer records from your CRM, website, transactions, and other tools merge correctly into a single profile. Your segments, reports, and AI features run on data your team can actually trust.",
      bullets: [
        "Certified Data Cloud expertise",
        "Identity resolution that merges records correctly",
        "Data accurate enough for reports and AI features",
        "Ongoing monitoring so accuracy does not drift",
      ],
      image: img("/images/platform-expertise/data-cloud-hero.webp", "Business meeting"),
    },
    // L83 <PartnersSection />
    partnersSection(),
    // L86 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Data Cloud Delivers What Your Setup Around It Allows", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: [
        "Data Cloud can unify all your customer signals and stream them in real time to Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce.",
        "But that promise only holds when identity resolution, ingestion, and governance are configured with care.",
        "Three problems quietly break most implementations before they deliver value.",
      ],
    },
    // L101 <ExpertiseFeaturesSection features />
    {
      _type: "expertiseFeaturesSection",
      features: [
        {
          title: "Fragmented Customer\nRecords",
          description: "Your website, CRM, ecommerce, and support tools each hold a different version of the same customer. Segments target the wrong people, reports contradict each other, and AI features surface confident recommendations built on records that should never have existed as separate profiles.",
          icon: img("/images/platform-expertise/Mask group (1).webp"),
        },
        {
          title: "Unclear Sales\nPipeline Structure",
          description: "The same customer sits in your systems three times, sometimes five. Each duplicate carries partial history and partial preferences. So your reports overcount, your marketing sends the same email twice with different subject lines, and your customer notices the amateur hour.",
          icon: img("/images/platform-expertise/Mask group (2).webp"),
        },
        {
          title: "Manual\nAdministration",
          description: "Einstein and Agentforce run on the data you give them. Feed them fragmented records, and they generate confident nonsense your team quickly learns to ignore. The result? Your AI investment stalls, not because the technology fails, but because the underlying data quietly undermines it.",
          icon: img("/images/platform-expertise/Mask group (3).webp"),
        },
      ],
    },
    // L122 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Count On Our Certified Salesforce Data Cloud Prowess"),
      text: "ProvidusCRM houses a team of Salesforce architects, developers, and consultants with expertise across the platform’s ecosystem, including Data Cloud. We ensure your CRM works with a single source of truth, driving efficient workflows and reliable automation",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L129 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L145 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Data Cloud Services & Solutions We Offer",
      tabs: [
        {
          label: "Consulting",
          heading: "Salesforce Data Cloud Consulting",
          text: "Most Data Cloud problems start before configuration. Someone chose the wrong data sources to bring in first, skipped identity resolution planning, or bought Data Cloud without a clear activation goal. Our consulting engagement gets these decisions right at the start.\n\nOur consultants map your source systems, review your existing data quality, and design the identity resolution and governance approach that fits your business. We plan the ingestion sequence carefully, so the identity backbone is built before behavioural data floods in. Therefore, you start the build with a foundation on which the rest of the project can actually rest.",
          bullets: [
            "Source system audit and data quality review",
            "Identity resolution and match rule strategy",
            "Ingestion sequencing plan built for accuracy",
            "Governance framework aligned with your data owners",
          ],
        },
        {
          label: "Implementation",
          heading: "Salesforce Data Cloud Implementation",
          text: "Data Cloud has many moving parts: data streams, data lake objects, unified profiles, calculated insights, segments, and activation targets all need to fit together. Our implementation service integrates them into a single working system rather than a scattered set of components.\n\nOur consultants configure your data spaces, ingest the priority sources, and build the match rules and survivorship logic that create accurate unified profiles. We connect Data Cloud to Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce, so the unified layer actually powers your downstream tools. Every rule gets tested against sample data before it touches production.",
          bullets: [
            "Data spaces, streams, and lake objects configured properly",
            "Match rules and survivorship logic tuned to your data",
            "Downstream activation into Sales, Service, and Marketing Cloud",
            "Testing against sample data before production goes live",
          ],
        },
        {
          label: "Enablement",
          heading: "Data Cloud Enablement",
          text: "Unified profiles only pay back when they are actually used. Activation turns Data Cloud from a data project into a business capability that your marketing, sales, and service teams feel every day.\n\nOur consultants set up segmentation, calculated insights, and real-time triggers so unified profiles drive live journeys, sales alerts, and service context. We build activation across email, ads, mobile, web, and inside the Salesforce consoles your teams already work in.",
          bullets: [
            "Segmentation and audience design built on unified profiles",
            "Calculated insights configured for priority use cases",
            "Real-time triggers into Marketing Cloud journeys and Sales Cloud",
            "Activation across email, ads, mobile, and web channels",
          ],
        },
        {
          label: "Integration",
          heading: "Data Cloud Integration",
          text: "Data Cloud only works when the systems around it feed it accurately. Our integration service connects your data sources cleanly, so unified profiles stay current rather than drifting away from reality between syncs.\n\nOur consultants build ingestion from Sales Cloud, Service Cloud, ecommerce platforms, web analytics, and third-party tools using native connectors and APIs. We support zero-copy sharing with Snowflake and Databricks where relevant, so your warehouse and Data Cloud work together rather than duplicating storage. Every connection includes error handling and monitoring from day one.",
          bullets: [
            "Native connectors to Salesforce, ecommerce, and web sources",
            "Zero-copy sharing with Snowflake and Databricks",
            "API integration for custom and legacy systems",
            "Error handling and monitoring built into every connection",
          ],
        },
        {
          label: "Security & Governance",
          heading: "Data Security, Governance & Compliance",
          text: "Data Cloud sits at the centre of your customer data, which makes governance a compliance obligation rather than a nice-to-have. Our consultants build the security, consent, and governance layer that keeps your Data Cloud implementation audit-ready as regulations shift.\n\nWe configure role-based access controls, field-level security, and consent capture aligned to GDPR, UK GDPR, and sector regulations. Our team documents data lineage, sets up audit logging, and builds the consent flows that keep marketing activation compliant. Therefore, your Data Cloud implementation holds up under review, not just under normal use.",
          bullets: [
            "Role-based access and field-level security configured properly",
            "Consent capture aligned to GDPR, UK GDPR, and sector rules",
            "Data lineage documentation and audit logging in place",
            "Consent flows that keep activation compliant",
          ],
        },
        {
          label: "Managed Services",
          heading: "Managed Services",
          text: "A Data Cloud org needs ongoing care more than most Salesforce products. Match rules drift as data patterns shift, new source systems arrive quarterly, and identity accuracy quietly degrades without monitoring. Our managed services keep your Data Cloud platform performing over time.\n\nOur team monitors match confidence, duplicate rates, and consent flow health week by week. We handle release updates carefully, adjust match rules as new sources come in, and support your team as activation use cases grow. Therefore, your Data Cloud investment keeps paying off long after go-live rather than needing rescue work in a year.",
          bullets: [
            "Ongoing match accuracy and consent monitoring",
            "Careful handling of Salesforce release updates",
            "Match rule adjustments as new sources come in",
            "Support for new activation use cases as they grow",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L237 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-data-cloud-consulting") },
    // L245 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Still struggling to have a single source of truth for your customer data? Reach out to our team today!",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L254 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our End-to-End Salesforce Platform Expertise",
      items: [
        {
          title: "Service Cloud",
          text: "Our consultants set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance.",
          icon: img("/images/service-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Sales Cloud",
          text: "Our consultants configure Sales Cloud around how your sales team works day to day. We map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better.",
          icon: img("/images/sales-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Agentforce",
          text: "Most AI tools answer questions and stop there. Agentforce agents go further and actually do the work. Our consultants build agents that qualify leads, route cases, and complete routine tasks inside your workflows.",
          icon: img("/images/agent-force.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Marketing Cloud",
          text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting all connect properly to your CRM data.",
          icon: img("/images/marketing-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Revenue Cloud",
          text: "Our consultants configure Revenue Cloud and CPQ so quotes stay fast and accurate, even as your product catalogue and business grow more complex over time.",
          icon: img("/images/revenue-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
      ],
    },
    // L297 <IdentityResolutionSection /> (defaults, written out)
    identityResolutionSection(),
    // L300 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM For Salesforce Data Cloud Consulting",
      reasons: [
        {
          title: "Certified Data Cloud Consultants",
          text: "Our consultants hold Salesforce Data Cloud certifications and have delivered projects across financial services, retail, and healthcare markets. Therefore, you get judgment from teams who have configured match rules and survivorship logic under production conditions rather than in training scenarios.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "Identity Resolution Expertise",
          text: "Match rule design and governance are their own discipline inside Data Cloud, not a subtask of a broader Salesforce implementation. Our consultants treat them accordingly, designing against sample data and documenting each decision with your data owners.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Ongoing Match Accuracy Monitoring",
          text: "Data Cloud accuracy degrades quietly without oversight. Our team monitors match confidence, duplicate rates, and consent flow health week by week after go-live. Therefore, your Data Cloud investment keeps performing rather than needing rescue work later.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/data-cloud-why-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L327 <SplitComparisonSection heading cards />
    {
      _type: "splitComparisonSection",
      heading: heading("Data Cloud vs Your Data Warehouse, Do You Need Both?"),
      cards: [
        {
          title: heading("Data Cloud Is\nThe Operational Layer"),
          text: "It keeps a live, unified view of each customer that Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce can read from within seconds. Its strength is the speed of activation across your Salesforce ecosystem.",
          color: "#33FF00",
        },
        {
          title: heading("Your Data Warehouse Is\nThe Analytical Layer"),
          text: "It holds large volumes of structured data across the whole business, so analysts can query it flexibly for reports, dashboards, and modelling. Its strength is analytical depth across every function, not just customer records.",
          color: "#308FFF",
        },
        {
          title: heading("Most Businesses Need Both,\nConnected Properly"),
          text: "Data Cloud handles operational customer activation. The warehouse handles cross-business analysis. Zero-copy sharing with Snowflake and Databricks lets both platforms reference data without duplicating storage.",
          color: "#8800FF",
        },
        {
          title: heading("The Common Mistake"),
          text: "Businesses purchase the Data Cloud license, expecting data warehouse-style reporting end up disappointed. Businesses that refuse Data Cloud because they already have a warehouse end up with Salesforce activation gaps. Our consultants map which layer holds which workload, based on how your business actually operates.",
          color: "#FFB030",
        },
      ],
    },
    // L372 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("Industries We Impact"),
      items: [
        {
          title: "Non-Profit",
          text: "Donor, supporter, volunteer, and beneficiary data often live in separate systems. Our consultants configure Data Cloud alongside Nonprofit Cloud so fundraising, programme delivery, and stewardship teams share one accurate view of each supporter across the organisation.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "Retail customers move across mobile, desktop, in-store, and support in a single week. Our consultants configure Data Cloud and align it with Commerce Cloud to resolve these signals against a unified profile in real time, so loyalty attributes and browsing behaviour sit under one identity.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
        {
          title: "Healthcare",
          text: "Patient identity resolution carries higher stakes than any other sector. Our consultants configure Data Cloud alongside Health Cloud with match rules that respect patient identifiers and consent scopes, treating identity accuracy as a compliance obligation rather than a marketing optimisation.",
          image: img("/images/platform-expertise/health.webp"),
        },
        {
          title: "Education",
          text: "Students, applicants, alumni, and donors sit inside education data. Our consultants implement Data Cloud alongside Education Cloud to connect that lifecycle, so recruitment and advancement teams work from the same view without gaps between departments.",
          image: img("/images/platform-expertise/education.webp"),
        },
        {
          title: "Financial Services",
          text: "Banks, lenders, and wealth firms need household matching under regulatory constraints. Our consultants configure Data Cloud match and household rules that reflect these relationships accurately, while keeping KYC and consent boundaries intact for compliance teams.",
          image: img("/images/platform-expertise/finance.webp"),
        },
        {
          title: "Manufacturing",
          text: "Manufacturers hold customer data across sales, distributors, service, and IoT signals from installed products. Our consultants implement Data Cloud alongside Manufacturing Cloud to unify these signals, so account teams work from a full picture rather than fragments.",
          image: img("/images/platform-expertise/manufacturing.webp"),
        },
      ],
    },
    // L413 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Is Salesforce Data Cloud the same as Data 360?",
          answer: "No. Salesforce Data Cloud is the official, current name for the platform. In the past, Salesforce has referred to its underlying data unification vision as \"Customer 360\" or \"Data 360,\" and the product was briefly codenamed \"Genie.\" Today, the standalone, enterprise product is officially called Salesforce Data Cloud.",
        },
        {
          question: "Do we need Data Cloud if we already have a data warehouse?",
          answer: "Often yes, since they do different jobs. Data Cloud is the operational activation layer inside Salesforce. Your warehouse is the analytical layer across the business. They connect through zero-copy sharing with Snowflake and Databricks.",
        },
        {
          question: "How is identity resolution different from deduplication?",
          answer: "Deduplication finds identical records in one system. Identity resolution links records across many systems using multi-attribute logic, and decides which field values survive the merge. It is a bigger, more deliberate decision than deduplication.",
        },
        {
          question: "Can Data Cloud integrate with Snowflake, Databricks, or BigQuery?",
          answer: "Yes. Data Cloud supports zero-copy sharing with Snowflake and Databricks, so data can be referenced across platforms without duplicating storage. BigQuery integration works through connectors. Our consultants design the sync pattern based on your setup.",
        },
        {
          question: "How does Agentforce actually use Data Cloud data?",
          answer: "Agentforce reads Data Cloud as its source of unified customer context. Agents use it through Retrieval-Augmented Generation to ground responses in current customer data rather than static knowledge. The quality of Agentforce depends on Data Cloud accuracy.",
        },
        {
          question: "How long does a Data Cloud implementation take?",
          answer: "A focused first-activation build runs eight to twelve weeks. A full enterprise deployment with multiple data spaces and warehouse integration typically takes sixteen to twenty-four weeks. Our consultants give a realistic timeline after discovery.",
        },
        {
          question: "How do you stop identity resolution accuracy from drifting after go-live?",
          answer: "We build monitoring into every Data Cloud implementation: match confidence trends, duplicate rate alerts, and consent flow audits. Our managed services team reviews these weekly and adjusts match rules as new source systems come in.",
        },
        {
          question: "How much do Data Cloud services cost?",
          answer: "Cost depends on scope, source system count, and whether governance and managed services sit inside the engagement. An end-to-end implementation project starts at £30,000, with the cost going upwards with increasing complexity, scale, customisation, and integrations.",
        },
      ],
    },
    // L451 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-data-cloud-consulting") },
    // L456 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Transform Your Data Strategy Today",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-experience-cloud-consulting

// getSitePageJsonLd("salesforce-experience-cloud-consulting", schema)
const experienceCloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Experience Cloud Consulting | ProvidusCRM",
  "description": "Salesforce Experience Cloud Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-experience-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const experienceCloudPage: SeedPage = {
  slug: "platform-expertise/salesforce-experience-cloud-consulting",
  title: "Platform Expertise — Experience Cloud",
  legacyKey: "salesforce-experience-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Experience Cloud Consulting | ProvidusCRM",
    description: "Salesforce Experience Cloud Consulting Services",
  },
  jsonLdFallback: experienceCloudSchema,
  sections: [
    // L60 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Salesforce Experience Cloud Consulting & Implementation Partner",
      subtitleAsH1: true,
      title: heading("Intuitive Portals Connected To Your Data", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Configure Salesforce Experience Cloud so customer, partner, and employee portals connect directly to Salesforce records, permissions, and workflows with our ProvidusCRM. Our consultants define sharing rules and test them before launch, ensuring users see exactly the records they should and the portal reflects live Salesforce data.",
      bullets: [
        "Certified Salesforce Experience Cloud consultants",
        "Sharing rules and access models defined and tested before launch",
        "Portals connected to live Salesforce data",
        "Ongoing governance so access stays accurate as the portal grows",
      ],
      image: img("/images/platform-expertise/pe-cloud-consult.webp", "Business meeting"),
    },
    // L80 <PartnersSection />
    partnersSection(),
    // L83 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Why Most Portals Fail To Deliver Value", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: [
        "Portal projects rarely fail because a feature is missing. They fail because sharing rules and data access decisions get made quickly at the start of a build, then surface as problems months after launch.",
        "Data ends up exposed to users who should never have seen it, or users get locked out of records they should be seeing. Both damage trust in the portal.",
      ],
    },
    // L97 <ExpertiseFeaturesSection features />
    {
      _type: "expertiseFeaturesSection",
      features: [
        {
          title: "Who has looked at the sharing rules recently, and does everyone agree on what they should do?",
          description: "Sharing rules often get set up by a technical lead and never reviewed. That is fine until an audit or a support ticket makes them everyone's problem.",
          icon: img("/images/platform-expertise/Mask group (1).webp"),
        },
        {
          title: "Are page design and branding getting more attention than authentication and record visibility?",
          description: "Design decisions are visible, so they attract time. Access decisions are invisible until they break, so they get skipped.",
          icon: img("/images/platform-expertise/Mask group (2).webp"),
        },
        {
          title: "When the portal grows, does access stay accurate, or does it drift?",
          description: "Adding users, roles, or new content typically breaks assumptions built into the original sharing model. Without ongoing governance, the drift compounds.",
          icon: img("/images/platform-expertise/Mask group (3).webp"),
        },
      ],
    },
    // L118 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Experience Cloud Solutions & Services We Offer",
      tabs: [
        {
          label: "Experience Architecture",
          heading: "Experience Architecture & Access Design",
          text: "Defining how users authenticate, which Salesforce records they can see, and how sharing rules are structured before any template or branding decisions are made. Our consultants treat this as the foundation of the build, not a configuration afterthought.\n\nThis includes guest access, authenticated user access, and partner licence configuration. We match this security model with the optimal platform framework, using Lightning Web Runtime (LWR) for high-speed, SEO-optimised public sites or Aura for complex out-of-the-box feature sets.\n\nThe portal launches with access rules that hold up under audit, not ones that get discovered as system vulnerabilities six months down the line.",
          bullets: [
            "User access models and authentication setup",
            "Data visibility and sharing rule design",
            "Guest, authenticated, and partner licence configuration",
            "Access rules tested before launch, not discovered after",
          ],
        },
        {
          label: "Customer Portals",
          heading: "Customer Service Portals",
          text: "Self-service portals connected directly to real case, order, and knowledge data in Salesforce. Our consultants build customer portals that resolve issues rather than redirect them, so support tickets go down instead of shifting from one channel to another.\n\nWe configure case submission and status tracking, connect self-service to Service Cloud cases and flows, and set up knowledge access with the correct visibility for logged-in customers. Portals are built responsive-first so mobile users can navigate as smoothly as desktop users.\n\nAs a result, your service team handles fewer routine tickets, and customers get faster resolution on the items requiring human intervention.",
          bullets: [
            "Case submission and status tracking",
            "Knowledge base and self-service actions",
            "Connection to Service Cloud cases and flows",
            "Branded, mobile-responsive templates",
          ],
        },
        {
          label: "Partner Portals",
          heading: "Partner & PRM Portals",
          text: "Controlled sharing of leads, opportunities, and deal workflows with your partners, without exposing internal sales data. Our consultants configure the access rules that protect what should stay internal while enabling what needs to flow to partners.\n\nWe build partner portals with opportunity-sharing rules, deal registration workflows, and lead-sharing flows that match how your channel actually operates. Partner dashboards give visibility into their pipeline and rewards. Onboarding flows help new partners get productive quickly.\n\nYour partner channel gets the tools it needs while your internal sales data stays inside your team.",
          bullets: [
            "Partner access rules and opportunity sharing",
            "Deal registration and lead-sharing workflows",
            "Partner dashboards and productivity tools",
            "Onboarding flows for new partners",
          ],
        },
        {
          label: "Employee Communities",
          heading: "Employee Communities & Internal Hubs",
          text: "Internal portals for requests, resources, and collaboration, tied to real Salesforce data. Employees are often harder to satisfy than customers because they use the tool every day. Our consultants build employee portals that respect that.\n\nWe configure request and approval flows, shared resource access, team collaboration pages, and workflow-driven actions that connect back to Salesforce records. Access follows role, not just licence, so people see what their job requires and nothing else.\n\nYour internal teams get a hub that speeds up daily work rather than one that becomes another system they avoid.",
          bullets: [
            "Internal request and approval flows",
            "Shared resource and knowledge access",
            "Team collaboration pages",
            "Workflow-driven internal actions",
          ],
        },
        {
          label: "Personalisation & AI",
          heading: "Personalisation & AI-Enabled Self-Service",
          text: "Relevant content and guided actions without always needing an agent. Our consultants configure personalisation and AI, so users see what fits their role, their history, and their current task.\n\nWe set up Einstein-powered content recommendations, Agentforce handles guided self-service and case deflection, and audience targeting so each user segment sees appropriate content. Every AI feature runs on governed Salesforce data, so recommendations stay accurate, and access rules stay respected.\n\nPersonalisation works reliably rather than surfacing content users should not be seeing.",
          bullets: [
            "Einstein-powered content recommendations",
            "Agentforce-enabled self-service and case deflection",
            "Audience targeting so each user sees what is relevant",
            "Guided actions and workflow prompts tied to governed data",
          ],
        },
        {
          label: "Governance & Support",
          heading: "Governance & Ongoing Support",
          text: "Keeping access rules and page structure stable as users, content, and requirements evolve. Our consultants build the governance layer that keeps portals reliable long after launch, rather than letting them drift into problems.\n\nWe run access rule audits as the user base grows, manage page and audience-targeting versions, and handle Salesforce release updates carefully. Every enhancement gets checked against existing access rules before deployment, so new features do not accidentally break old permissions.\n\nYour portal stays predictable as it grows rather than needing rescue work every eighteen months.",
          bullets: [
            "Access rule audits as the user base grows",
            "Page and audience-targeting version control",
            "Release management aligned to Salesforce updates",
            "Safe enhancements that do not disrupt existing access",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L210 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-experience-cloud-consulting") },
    // L218 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Connect with our consultant to get the best-aligned Experience Cloud solution.",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L227 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Certified & Experienced Salesforce Experience Cloud Talent"),
      text: "Our consultants hold Salesforce Experience Cloud certifications and have delivered customer, partner, and employee portals across the UK, USA, and GCC markets. We work in multi-cloud environments where Experience Cloud sits alongside Sales Cloud, Service Cloud, and Data Cloud, and where access governance decisions carry regulatory weight.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L234 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L250 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("Industries We Serve"),
      items: [
        {
          title: "Non-Profit",
          text: "Donor and volunteer engagement runs on trust and self-service. Supporters expect to update their details, check their giving history, and register for events without emailing your team. But donor data is sensitive: exposing giving amounts or gift histories to the wrong user damages the relationship fast.\n\nOur consultants build non-profit portals connected to your real fundraising data, with sharing rules that let supporters see their own history and nothing else. Volunteers get event and shift access relevant to them.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "Customer and loyalty portals in retail connect to commerce and order data in real time. Shoppers expect to check order status, manage returns, track loyalty points, and see personalised offers. Our consultants configure Experience Cloud portals connected to Commerce Cloud and Service Cloud data live, so what customers see in the portal matches what your teams see internally.\n\nLoyalty programmes reflect real activity. Support requests link back to actual orders, and public-facing brand pages benefit from native Experience Cloud SEO management, clean URL structures, and automated sitemap indexing to maximize organic search discovery.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
        {
          title: "Healthcare",
          text: "Patient portals are where the access-governance argument gets sharpest. Patients need convenience: appointment booking, results, messaging their care team. Regulations demand strict access rules: no accidental exposure of another patient's records, no sharing beyond consent. A portal that gets this wrong becomes a compliance incident.\n\nOur consultants configure Health Cloud alongside Experience Cloud with sharing rules and consent scopes built in from the start, not added later. Patient portals give convenience without compromising the rules that protect them.",
          image: img("/images/platform-expertise/health.webp"),
        },
        {
          title: "Financial Services",
          text: "Client portals in banking, wealth, and insurance carry the same tension as healthcare: self-service convenience against strict access boundaries. KYC obligations, product suitability rules, and household relationships all shape what each client should and should not see. Getting this wrong exposes the business to regulatory action.\n\nOur consultants configure Financial Services Cloud alongside Experience Cloud with KYC-aware sharing rules, household access models, and audit trails built into every portal interaction. Clients get the self-service they expect. Compliance teams get the trail they need.",
          image: img("/images/platform-expertise/finance.webp"),
        },
      ],
    },
    // L281 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "What Makes ProvidusCRM A Leading Salesforce Experience Cloud Partner",
      reasons: [
        {
          title: "Defined Weekly Updates",
          text: "You get a working session and a written summary each week. The call covers progress, blockers, and decisions that need your input. The summary is in writing, so anyone on your side who missed the call knows where things stand.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "A Single Point of Contact",
          text: "You get access to an experienced, certified Salesforce Experience Cloud consultant, leading engagement from kickoff to go-live. They know your project, your team, and the access decisions we have made together. They stay on the account long enough to ensure a successful launch and a hassle-free post-launch.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Post-Launch Support",
          text: "We schedule reviews at certain intervals after go-live. These cover engagement metrics and a re-check of access rules as the user base grows. Our ongoing support keeps your portals intuitive and impactful.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/expertise-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L308 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Is Salesforce Experience Cloud the same as Community Cloud?",
          answer: "Yes. Experience Cloud is the current Salesforce name for what was previously called Community Cloud and Salesforce Communities. The underlying product is the same, with substantial feature additions since the rename. Our consultants work with it under either name.",
        },
        {
          question: "What is the difference between a customer portal, partner community, and employee community?",
          answer: "The core platform is the same. The difference is who accesses it, what data they can see, and which Salesforce licence type they use. Customer portals use external customer licences, partner communities use partner licences with lead and opportunity access, and employee communities use internal licences. Our consultants configure each type differently.",
        },
        {
          question: "How do sharing rules actually work, and what happens if they are configured incorrectly?",
          answer: "Sharing rules in Experience Cloud combine organisation-wide defaults, role hierarchy, criteria-based rules, and sharing sets specific to Experience Cloud licences. Configured incorrectly, users see records they should not or lose access to records they should see. Our consultants design and test these together before launch.",
        },
        {
          question: "Can Experience Cloud connect to our existing Sales, Service, or Marketing Cloud data?",
          answer: "Yes. Experience Cloud reads directly from your Salesforce objects, so cases, opportunities, orders, and marketing preferences appear live in the portal rather than as a copy. This is the core of the platform, not an integration project.",
        },
        {
          question: "What is the difference between authenticated users and guest users?",
          answer: "Authenticated users log in with credentials and get access based on their profile and sharing rules. Guest users browse without logging in and get access based on the guest user profile, which needs careful configuration to avoid exposing internal data. Our consultants design both together.",
        },
        {
          question: "How long does an Experience Cloud implementation actually take?",
          answer: "A focused portal build runs eight to twelve weeks. Complex projects with multiple audience types, custom components, or heavy integrations typically run three to six months. Our consultants give a realistic timeline after discovery, based on your actual audience and access requirements.",
        },
        {
          question: "What is the difference between a Salesforce Experience Cloud consultant and an implementation partner?",
          answer: "A consultant advises on architecture, access design, and portal strategy. An implementation partner actually builds the portal. Our consultants deliver both together, so the strategy and the build never drift apart across the project.",
        },
        {
          question: "How much do Experience Cloud services cost?",
          answer: "Cost depends on scope, audience types, custom development needs, and integration complexity. A focused portal build starts from £15,000-£20,000, with the cost rising with complexity, customisation needs, and scale. Our consultants share a clear quote after discovery, not a rushed guess upfront.",
        },
        {
          question: "Is Experience Cloud secure enough for a public-facing community?",
          answer: "Yes, when configured properly. Salesforce provides a robust security architecture, including field-level security, sharing sets, strict guest user record access policies, and data encryption. However, public portals are only secure if these tools are configured correctly, which is why our rigorous pre-launch access testing phase is foundational to every build.",
        },
        {
          question: "What industries do your Experience Cloud consultants work with?",
          answer: "Our consultants work across non-profit, healthcare, financial services, retail and ecommerce, education, and manufacturing sectors. We bring sector context to each project, so access rules, compliance requirements, and portal design fit how your industry actually operates.",
        },
      ],
    },
    // L354 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-experience-cloud-consulting") },
    // L359 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Transform Your Data Strategy Today",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-marketing-cloud-consulting

// getSitePageJsonLd("salesforce-marketing-cloud-consulting", schema)
const marketingCloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Marketing Cloud Consulting | ProvidusCRM",
  "description": "Salesforce Marketing Cloud Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-marketing-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const marketingCloudPage: SeedPage = {
  slug: "platform-expertise/salesforce-marketing-cloud-consulting",
  title: "Platform Expertise — Marketing Cloud",
  legacyKey: "salesforce-marketing-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Marketing Cloud Consulting | ProvidusCRM",
    description: "Salesforce Marketing Cloud Consulting Services",
  },
  jsonLdFallback: marketingCloudSchema,
  sections: [
    // L60 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Certified Salesforce Marketing Cloud Consultants",
      subtitleAsH1: true,
      title: heading("Make Every Campaign Convert With Salesforce Marketing Cloud", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "We're ProvidusCRM, your trusted Salesforce Marketing Cloud consulting and implementation partner, reinventing your marketing campaigns and workflows so every journey, email, and ad drives engagement and conversions consistently.",
      bullets: [
        "Certified Marketing Cloud consultants",
        "Journeys built on connected customer data",
        "Higher deliverability and tighter targeting",
        "GDPR-ready consent and preference management",
      ],
      image: img("/images/platform-expertise/pr-marketing-cloud-hero.webp", "Business meeting"),
    },
    // L80 <PartnersSection />
    partnersSection(),
    // L83 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("Marketing Cloud is Powerful. But Is Yours Working?", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: [
        "Marketing Cloud can run journeys, ads, and emails at scale, but only when the setup underneath is solid. Configured badly, campaigns miss the mark, and reports mislead. Set up properly, every message reaches the right person at the right moment for the right reason.",
      ],
    },
    // L96 <ExpertiseChallengesSection items /> (the route passes no title)
    {
      _type: "expertiseChallengesSection",
      items: [
        {
          title: "Fragmented\nCustomer Data",
          text: "Your website, CRM, ecommerce store, and support desk each hold a different version of the same customer. Therefore, journeys fire on stale data, subject lines feel generic, and unsubscribes climb. Without unified data underneath, Marketing Cloud runs on guesses rather than actual signals.",
          icon: img("/images/platform-expertise/Mask group (1).webp"),
        },
        {
          title: "Generic Marketing\nCommunications",
          text: "When every subscriber gets the same email at the same time, engagement drops and inboxes filter you out. Meanwhile, competitors send messages that match what customers actually want. Marketing Cloud can fix this, but only if segmentation and dynamic content are configured properly first.",
          icon: img("/images/platform-expertise/Mask group (2).webp"),
        },
        {
          title: "Unproven\nMarketing ROI",
          text: "Leadership keeps asking whether marketing spend actually drives revenue. If your reports cannot connect email opens to closed deals, or ad spend to pipeline, you cannot answer. Therefore, budgets get cut on gut feel rather than facts, and marketing loses the boardroom argument.",
          icon: img("/images/platform-expertise/Mask group (3).webp"),
        },
      ],
    },
    // L117 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Marketing Cloud Solutions & Services We Offer",
      tabs: [
        {
          label: "Salesforce Marketing Cloud Consulting",
          heading: "Salesforce Marketing Cloud Consulting",
          text: "Most Marketing Cloud problems start well before configuration. Someone chose the wrong edition, skipped data mapping, or bought Journey Builder without a use case for it. Our consulting engagement gets these decisions right the first time.\n\nOur Marketing Cloud consultants review your marketing stack, audience data, and channel mix, then recommend the right edition and studios for your goals. We plan the data flows into and out of Marketing Cloud carefully, map your first journeys, and set clear success metrics so you know what good looks like ninety days in.",
          bullets: [
            "Marketing Cloud edition and studio recommendations",
            "Data flow mapping across CRM, ecommerce, and web",
            "First journey design with clear success metrics",
            "Phased roadmap covering ninety days and beyond",
          ],
        },
        {
          label: "Salesforce Marketing Cloud Implementation",
          heading: "Salesforce Marketing Cloud Implementation",
          text: "Marketing Cloud has many moving parts: Email Studio, Journey Builder, Mobile Studio, Advertising Studio, Content Builder, and Data Extensions all need to fit together. Our implementation service builds them into one working system.\n\nOur consultants configure your business units, sender authentication, data extensions, and preference centres. We build the first set of journeys around your priority use cases, connect Marketing Cloud to Sales Cloud or your CRM, and set up subscriber management that respects consent from day one. Every setup gets tested end to end before it goes live.",
          bullets: [
            "Business units, sender authentication, and data extensions configured",
            "First journeys built around priority use cases",
            "Marketing Cloud connected to Sales Cloud or your CRM",
            "End-to-end testing before every journey goes live",
          ],
        },
        {
          label: "Data Migration, Management & Unification",
          heading: "Data Migration, Management & Unification",
          text: "Marketing Cloud is only as good as the data flowing into it. Bring across a messy list, and you will send messy campaigns. Our Marketing Cloud consultants clean, structure, and connect your data before it touches a subscriber record.\n\nWe migrate your subscriber lists, campaign history, and consent records into Marketing Cloud accurately. Our team then sets up ongoing data flows from Sales Cloud, Data Cloud, ecommerce, or web analytics, so each customer profile updates as behaviour changes. We build de-duplication and validation rules into these flows, so quality holds up over time.",
          bullets: [
            "Subscriber, campaign, and consent history migrated accurately",
            "Ongoing data flows from CRM, ecommerce, and web sources",
            "De-duplication and validation rules built into every flow",
            "One connected view of the customer across every channel",
          ],
        },
        {
          label: "AI-enabled Automation & Personalisation",
          heading: "AI-enabled Automation & Personalisation",
          text: "Einstein and Agentforce turn Marketing Cloud into a system that adapts in the moment, rather than one that fires the same message at everyone. Our consultants set this up in a way you keep control of.\n\nWe configure Einstein Send Time Optimisation, Content Selection, and Copy Insights inside Marketing Cloud, so messages land at the right time with the right content per subscriber. Where suitable, we build Agentforce agents that handle marketing operations tasks like list checks, journey audits, and preference updates. Every AI feature runs on your rules, your data, and your brand voice.",
          bullets: [
            "Einstein Send Time Optimisation and Content Selection configured",
            "Copy Insights connected to your subject line performance",
            "Agentforce agents for marketing operations tasks",
            "AI features running on your rules and brand voice",
          ],
        },
        {
          label: "Marketing Campaign Analytics",
          heading: "Marketing Campaign Analytics",
          text: "Marketing spend keeps getting harder to defend without proper measurement. Our consultants build the analytics layer that connects Marketing Cloud activity to pipeline, revenue, and retention, so your team stops guessing at ROI.\n\nWe configure Intelligence Reports, Datorama connections where relevant, and cross-channel attribution across email, ads, mobile, and web. Our team also builds executive dashboards that show marketing performance in the same language leadership uses in board meetings: pipeline created, deals closed, cost per acquisition, and customer lifetime value.",
          bullets: [
            "Intelligence Reports and cross-channel attribution set up properly",
            "Executive dashboards in the language leadership uses",
            "Pipeline, revenue, and CLV connected to campaign spend",
            "Reporting that stands up to boardroom questions",
          ],
        },
        {
          label: "Managed Services",
          heading: "Managed Services",
          text: "Marketing Cloud does not stand still. New releases arrive quarterly, deliverability rules keep tightening, and journeys break quietly when a data source changes. Our managed services keep your platform working through all of it.\n\nOur team monitors journey health, sender reputation, deliverability rates, and consent workflows week to week. We handle release updates carefully, test upcoming changes on a copy first, and adjust configurations as your marketing programme grows. Where your team needs execution help, our consultants build campaigns, journeys, or templates on request.",
          bullets: [
            "Ongoing monitoring of journeys, deliverability, and consent",
            "Careful handling of Salesforce release updates",
            "Campaign, journey, and template execution on request",
            "Continuous improvements as your programme grows",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L209 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-marketing-cloud-consulting") },
    // L217 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Reach Out To ProvidusCRM's Salesforce Marketing Cloud Consultants To Discuss Your Initiatives And Challenges.",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L226 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("We're a Team of Certified Marketing Cloud Consultants & Implementation Experts"),
      text: "Our Marketing Cloud consultants hold Salesforce certifications and have delivered projects across the UK, USA, and GCC markets. We work across email, mobile, web, and advertising studios, and connect Marketing Cloud cleanly to Sales Cloud, Data Cloud, and third-party sources. Our team understands the full picture from data source to inbox to reporting, building journeys that resonate with your subscriber behaviour.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L233 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L249 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Explore Our Expertise Across The Salesforce Ecosystem",
      items: [
        {
          title: "Service Cloud",
          text: "We set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance. Our team configures case routing, escalation paths, and knowledge articles that reduce handling time.",
          icon: img("/images/service-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Sales Cloud",
          text: "Our consultants configure Sales Cloud around how your sales team works day to day. We map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better.",
          icon: img("/images/sales-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Revenue Cloud",
          text: "Our Salesforce Revenue Cloud consultants configure CPQ so quoting stays fast and accurate as your business gets more complex. We set up product catalogues, price rules, discount governance, and approval flows.",
          icon: img("/images/revenue-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "We build Experience Cloud portals for customers, partners, and employees that connect properly to your Salesforce data. Our certified experts configure sharing rules, page templates, and self-service flows carefully.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Data Cloud",
          text: "We implement Data Cloud to pull web, transaction, and third-party data into one unified customer profile that updates continuously. This single source of truth makes every report, dashboard, and downstream Salesforce feature far more reliable.",
          icon: img("/images/data-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Agentforce",
          text: "Most AI tools answer questions and stop there. Agentforce goes further and actually automates tasks across your Salesforce processes. We build agents that handle qualifying, routing, and repetitive updates inside your workflows. Each agent runs on rules you set and data you control.",
          icon: img("/images/agent-force.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
      ],
    },
    // L292 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("Industries We Deliver Marketing Cloud Solutions For"),
      items: [
        {
          title: "Non-Profit",
          text: "Fundraising campaigns need supporter data that connects donations, event attendance, and volunteering activity in one view. Our Non-Profit Cloud consultants implement NPC alongside Marketing Cloud so appeals reach the right supporters with the right ask, and stewardship messages actually feel personal rather than automated.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "Retail marketing needs joined-up product, order, and browsing data across every channel and store. We configure Commerce Cloud and connected tools so abandoned baskets, replenishment prompts, and loyalty offers reflect what shoppers actually did.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
        {
          title: "Healthcare",
          text: "Patient communication is sensitive, and consent rules apply differently to marketing than to care. We set up Health Cloud alongside compliant messaging flows, so appointment reminders, wellness content, and outreach all respect the patient's preferences and the regulator's requirements.",
          image: img("/images/platform-expertise/health.webp"),
        },
        {
          title: "Education",
          text: "We implement Education Cloud to connect the student lifecycle with your marketing efforts, so admissions campaigns, term-time communications, and donation appeals each land with the right audience at the right time in their journey with the institution.",
          image: img("/images/platform-expertise/education.webp"),
        },
        {
          title: "Financial Services",
          text: "Banks, lenders, and wealth firms need marketing that respects households, product suitability, and regulatory rules on every message. We set up Financial Services Cloud so campaign audiences reflect financial context accurately, and disclosure requirements sit inside the journey design.",
          image: img("/images/platform-expertise/finance.webp"),
        },
        {
          title: "Manufacturing",
          text: "We implement Salesforce Manufacturing Cloud so account-based marketing, partner nurture programmes, and product launches each reach the right audience with content that reflects how they buy and use the products.",
          image: img("/images/platform-expertise/manufacturing.webp"),
        },
      ],
    },
    // L329 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "What Makes ProvidusCRM The Perfect Choice For Marketing Cloud Consulting",
      reasons: [
        {
          title: "Certified Marketing Cloud Consultants",
          text: "Our consultants hold Marketing Cloud certifications and have delivered projects across email, mobile, and advertising studios. You get guidance from teams who have built journeys that pass compliance review, hold up at scale, and actually move the metrics leadership tracks each quarter.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "Refined Implementation Approach",
          text: "We follow a structured approach from discovery through data setup, journey build, testing, and go-live. Each phase has defined outputs and quality gates before it closes. Therefore, your Marketing Cloud implementation moves forward predictably, with journeys that go live tested.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Reliable, Ongoing Support",
          text: "Our team stays involved long after launch, monitoring journey performance, deliverability, and consent workflows through every Salesforce release. We fix issues quickly and adjust configurations as your programme grows.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/expertise-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L356 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What does a Salesforce Marketing Cloud consultant do?",
          answer: "A Marketing Cloud consultant maps your marketing goals, data sources, and channel needs, then configures Marketing Cloud to align with them. They plan journeys, connect data, set up compliance, and train your team, so campaigns actually run properly rather than just look good on slides.",
        },
        {
          question: "What Salesforce Marketing Cloud solutions and services does ProvidusCRM offer in the UK?",
          answer: "Our Salesforce Marketing Cloud consultants in the UK offer services and solutions like consulting and strategy, implementation, development, data migration and unification, AI-enabled personalisation, campaign analytics, and managed services. We configure every solution around your marketing campaigns.",
        },
        {
          question: "What is the difference between a Salesforce Marketing Cloud consultant and an implementation partner?",
          answer: "A consultant advises on what Marketing Cloud should do and how to set it up. An implementation partner actually builds the configuration, journeys, and integrations for you. The best partners do both, so strategy and delivery never drift apart across the course of the project.",
        },
        {
          question: "What industries do your Salesforce Marketing Cloud consultants in the UK work with?",
          answer: "Our consultants work across nonprofit, retail and ecommerce, healthcare, education, financial services, and manufacturing sectors. We bring sector context to each Marketing Cloud project, so consent handling, message tone, and campaign timing fit how your industry actually communicates with its customers.",
        },
        {
          question: "How long does a Salesforce Marketing Cloud implementation take?",
          answer: "A well-executed Marketing Cloud implementation usually runs eight to sixteen weeks from kickoff to first live journey. Complex programmes with multiple business units, Data Cloud connections, or advertising studios take longer. Our consultants share a clear timeline after discovery.",
        },
        {
          question: "Does Salesforce Marketing Cloud integrate with Sales Cloud and other CRMs?",
          answer: "Yes. Our consultants connect Marketing Cloud with Sales Cloud through Marketing Cloud Connect and integrate with HubSpot, Dynamics 365, and other CRMs through APIs, middleware, or Data Cloud.",
        },
      ],
    },
    // L386 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-marketing-cloud-consulting") },
    // L391 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Reach Out To Our Marketing Cloud Consultants",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-sales-cloud-consulting

// getSitePageJsonLd("salesforce-sales-cloud-consulting", schema)
const salesCloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Sales Cloud Consulting | ProvidusCRM",
  "description": "Salesforce Sales Cloud Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-sales-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const salesCloudPage: SeedPage = {
  slug: "platform-expertise/salesforce-sales-cloud-consulting",
  title: "Platform Expertise — Sales Cloud",
  legacyKey: "salesforce-sales-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Sales Cloud Consulting | ProvidusCRM",
    description: "Salesforce Sales Cloud Consulting Services",
  },
  jsonLdFallback: salesCloudSchema,
  sections: [
    // L61 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Salesforce Sales Cloud Consulting & Implementation",
      subtitleAsH1: true,
      title: heading("Get More Out Of Salesforce Sales Cloud", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "Partner with ProvidusCRM's certified consultants to set up Sales Cloud around how your sales team functions and plans to grow. Sell more and forecast better with our end-to-end Sales Cloud consulting and implementation services.",
      bullets: [
        "Certified Sales Cloud consultants",
        "Setup matched to your sales process",
        "Clean pipeline data and accurate forecasts",
        "AI and Agentforce-ready solutions",
      ],
      image: img("/images/platform-expertise/pe-cloud-hero.webp", "Business meeting"),
    },
    // L81 <PartnersSection />
    partnersSection(),
    // L84 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("You Invested in Sales Cloud, But Was It Worth It?", { mark: "after", markStyle: "section", markSpace: true }),
      paragraphs: [
        "Sales Cloud can do wonders for your sales workflows and campaigns. It's genuinely powerful and packed with valuable features. But it'll only deliver value for your business if it's setup the way your sales teams work everyday.",
        "Implemented poorly, and you're looking at a system you paid an expensive licensing fee for but is just slowing down your sales reps and frustrating managers and stakeholders.",
        "Implemented right with ProvidusCRM, it not only pays back its dividends, but completely redefines your sales processes.",
      ],
    },
    // L99 <ExpertiseFeaturesSection features />
    {
      _type: "expertiseFeaturesSection",
      features: [
        {
          title: "Messy,\nDuplicated Data",
          description: "Duplicate accounts, half-finished records, and contacts spread across different touchpoints ruin forecast efficiency. Your sales reps stop trusting the system within weeks of go-live. Investing in Sales Cloud stops making sense when your team ultimately goes back to spreadsheets and your underlying data quality only gets worse.",
          icon: img("/images/platform-expertise/Mask group (1).webp"),
        },
        {
          title: "Unclear Sales Pipeline\nStructure",
          description: "When your stages and sales paths are vague or inconsistent, every rep ends up tracking deals slightly differently. Reports stop matching reality, forecasts slip from one week to the next, and your managers chase status updates instead of coaching the team properly to close.",
          icon: img("/images/platform-expertise/Mask group (2).webp"),
        },
        {
          title: "Manual\nAdministration",
          description: "Your sales reps spend hours each week updating fields, logging activities, and chasing approvals through email threads that nobody actually reads. Without proper automation, Sales Cloud becomes an admin tax on your team rather than a productivity boost.",
          icon: img("/images/platform-expertise/Mask group (3).webp"),
        },
      ],
    },
    // L120 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Sales Cloud Solutions & Services We Offer",
      tabs: [
        {
          label: "Salesforce Sales Cloud Consulting",
          heading: "Salesforce Sales Cloud Consulting",
          text: "Sales Cloud setups often go off the rails quickly when nobody inside the business agrees on what the platform should actually do. Our Salesforce consulting service settles that question properly at the very start, before any configuration begins or any licence costs start running.\n\nOur Salesforce Sales Cloud consultants work with your sales, operations, and IT teams to map how deals genuinely flow today, including the quiet workarounds people have built up over the years. We then decide which Sales Cloud features fit your situation, which licences make sense, what to build first, and what to deploy later.",
          bullets: [
            "Discovery sessions with sales, ops, and leadership",
            "Licence and feature recommendations that fit your budget",
            "A phased roadmap with timelines and priorities",
            "Defined scope, so costs stay predictable from day one",
          ],
        },
        {
          label: "Salesforce Sales Cloud Implementation",
          heading: "Salesforce Sales Cloud Implementation",
          text: "Salesforce Sales Cloud implementation goes way beyond basic setup. It’s about customising and configuring Sales Cloud around your processes so your sales team genuinely wants to use it from day one, rather than quietly going back to the spreadsheets.\n\nOur certified consultants configure Sales Cloud end to end, covering lead capture, lead routing, opportunity stages, sales paths, and the approvals and validations that keep records clean over time.\n\nWe build dashboards to train your sales reps effectively and create AI-enabled workflows to improve operational efficiency.",
          bullets: [
            "Sales path, stages, and opportunity Kanban configured properly",
            "Lead routing and auto-assignment that match your team structure",
            "Approval flows and validation rules to keep records clean",
            "Salesforce mobile setup for sales teams working in the field",
          ],
        },
        {
          label: "Data Migration & Management",
          heading: "Data Migration & Management",
          text: "Moving years of accounts, contacts, opportunities, and history to Salesforce Sales Cloud can be a rather risky hassle. You can’t afford to lose your data during migration nor can you risk user adoption.\n\nOur consultants migrate your records carefully, mapping each field to the correct Sales Cloud object and cleaning out duplicates as we move data across.\n\nWe also set up de-duplication rules, validation rules, and ongoing data hygiene processes that keep your records accurate well after go-live.",
          bullets: [
            "Accurate field mapping from your old CRM into Sales Cloud",
            "De-duplication during the move and ongoing afterwards",
            "Validation rules to keep records clean over time",
            "Data hygiene processes built into daily workflows",
          ],
        },
        {
          label: "AI-enabled Sales Automation",
          heading: "AI-enabled Sales Automation",
          text: "Clean data and clear rules are crucial for accurate AI automation. Integrate AI into a messy org, and you’ll be working with hallucinations.\n\nWe configure Agentforce Sales Cloud and Einstein AI on top of a properly structured org. Einstein scores leads based on real signals and predicts which deals are most likely to close inside the quarter.\n\nAgentforce handles qualifying, follow-ups, and the routine record updates that drain rep time across the working week. Each agent runs on your rules and your data, so you stay in full control of what it does and does not do.",
          bullets: [
            "Einstein lead scoring and opportunity insights set up properly",
            "Agentforce configured around your sales rules",
            "Automation built on clean, structured data",
            "AI that frees reps to sell, not just answer prompts",
          ],
        },
        {
          label: "Sales Analytics & Reporting",
          heading: "Sales Analytics & Reporting",
          text: "Your sales team and stakeholders must have complete visibility into your workflows and campaigns. Our consultants build the reporting layer Sales Cloud should genuinely deliver out of the box, but rarely does without proper setup\n\nWe design custom report types, dashboards, and forecasting views around the real questions your leaders ask in meetings: pipeline by stage, win rates by source, rep performance over time, deal velocity, and forecast accuracy across the quarter.\n\nWe then layer in CRM Analytics where deeper analysis is genuinely needed for the business, rather than just for show or to fill slides.",
          bullets: [
            "Custom report types built around your real KPIs",
            "Dashboards for reps, managers, and leadership",
            "Forecasting views that match how you actually forecast",
            "CRM Analytics where deeper insight is needed",
          ],
        },
        {
          label: "Managed Services",
          heading: "Managed Services",
          text: "A Sales Cloud org needs ongoing support, maintenance, and upgrades. Without that, technical debt builds up quietly in the background, automations break in unexpected ways, and the system slowly drifts away from how your team actually works today.\n\nOur managed services for Sales Cloud help keep your org healthy over the course of time. We handle releases, monitor automation, fix issues quickly when they appear, and tune the setup as your sales process evolves with the business.\n\nWith each Salesforce platform release, our team checks what is changing and makes sure nothing important breaks for your users during the update window or in the days after it.",
          bullets: [
            "Ongoing admin, support, and configuration changes",
            "Release management aligned to Salesforce updates",
            "Proactive monitoring and quick issue resolution",
            "Continuous improvements as your business evolves",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L212 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-sales-cloud-consulting") },
    // L220 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Connect With Our Salesforce Sales Cloud Consultants To Discuss Your Challenges And Goals.",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L229 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("We're a Certified Salesforce Sales Cloud Consulting & Implementation Partner"),
      text: "Our team holds numerous Salesforce certifications and has set up Sales Cloud in complex business environments. Our consultants know which approach fits your situation best, which to avoid carefully, and how to build an org that holds up well long after go-live.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L236 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L252 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Explore Our Expertise Across The Salesforce Ecosystem",
      items: [
        {
          title: "Service Cloud",
          text: "Our consultants set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance. We configure case routing, escalation rules, and consoles your support teams genuinely want to use day after day, not just in the first week after launch.",
          icon: img("/images/service-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data. We configure sharing and access rules carefully so each user sees only what they should, with self-service that genuinely works without raising support tickets every time.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Data Cloud",
          text: "Our consultants implement Data Cloud to pull web, transaction, and third-party data sources into one unified customer profile that updates in real time. That single view then makes every other cloud, report, dashboard, and AI feature you run on top of it far more reliable and useful.",
          icon: img("/images/data-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Agentforce",
          text: "Most AI tools answer questions and stop there. Agentforce agents go further and actually do the work. Our consultants build agents that qualify leads, route cases, and complete routine tasks inside your workflows. Each agent runs on rules you control and data you genuinely trust.",
          icon: img("/images/agent-force.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Marketing Cloud",
          text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting all connect properly to your CRM data. We build campaigns that target the right people at the right time, track real engagement across every channel, and tie back cleanly to revenue rather than vanity metrics.",
          icon: img("/images/marketing-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Revenue Cloud",
          text: "Our consultants configure Revenue Cloud and CPQ so quotes stay fast and accurate, even as your product catalogue and business grow more complex over time. Discounts follow clear, agreed rules, contracts move smoothly through approvals, and revenue logic holds clean from quote to cash.",
          icon: img("/images/revenue-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
      ],
    },
    // L295 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("Industries We Impact"),
      items: [
        {
          title: "Non-Profit",
          text: "Charities run on relationships rather than transactions, and standard CRMs rarely fit that operating reality well. Our consultants implement Nonprofit Cloud to handle donor records, gift processing, and grant tracking in one connected place, so your fundraising teams spend less time on admin and more on the mission.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "Online selling needs joined-up stock, pricing, and customer data across every channel and physical store. Our consultants configure Commerce Cloud and the connected tools around it so the buying experience matches what the rest of your business already knows about each individual customer.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
        {
          title: "Healthcare",
          text: "Patient data is genuinely sensitive, and care coordination is complex across providers, settings, and time. Our consultants set up Health Cloud with consent tracking and access rules built in from the very start, so your clinical teams see one trusted record without ever compromising compliance.",
          image: img("/images/platform-expertise/health.webp"),
        },
        {
          title: "Education",
          text: "Students move from prospect to applicant to student to alumnus across systems that rarely talk to each other properly. Our consultants implement Education Cloud to connect that full lifecycle journey, so advisers, fundraisers, and faculty work from the same history without any gaps between departments.",
          image: img("/images/platform-expertise/education.webp"),
        },
        {
          title: "Financial Services",
          text: "Banks, lenders, and wealth firms need a CRM built around households and financial accounts rather than just individual contacts. Our consultants set up Financial Services Cloud with KYC workflows and compliance steps embedded inside the process, not bolted on as an afterthought later in the project.",
          image: img("/images/platform-expertise/finance.webp"),
        },
        {
          title: "Manufacturing",
          text: "Manufacturers plan against sales agreements and production capacity at the same time, and the two rarely sit together cleanly inside one system. Our consultants implement Manufacturing Cloud to connect commercial forecasts with operations data, so your teams forecast against what the business can actually deliver each month.",
          image: img("/images/platform-expertise/manufacturing.webp"),
        },
      ],
    },
    // L332 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "Why Implement Salesforce Sales Cloud With ProvidusCRM",
      reasons: [
        {
          title: "Certified, Experienced Teams",
          text: "Our consultants hold Salesforce certifications and have delivered Sales Cloud projects across multiple industries and company sizes. You get guidance and expertise that only comes from complex, successful implementations.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "Proven Implementation Process",
          text: "We follow a structured process from initial discovery through configuration, testing, training, and final release into production. Each phase has clear ownership and defined outputs, so your project moves forward predictably from kickoff to go-live.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Long-Term Support After Go-Live",
          text: "Our team stays close to your business after launch. We monitor the org, fix issues quickly when they appear, and adjust the setup as your business changes over time. Your Sales Cloud investment keeps paying off year after year.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/expertise-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L359 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What does a Salesforce Sales Cloud consultant do?",
          answer: "A Salesforce Sales Cloud consultant maps how your sales team works today, and then configures Sales Cloud to match that process step by step. They handle setup, training, integrations, and the careful design choices that decide whether your team adopts the system properly or quietly avoids using it.",
        },
        {
          question: "What Salesforce Sales Cloud solutions does ProvidusCRM offer in the UK?",
          answer: "Our Salesforce Sales Cloud consultants in the UK offer consulting, implementation, customisation, data migration, AI-enabled sales automation with Einstein and Agentforce, and analytics setup. We configure every solution around your sales process and team structure.",
        },
        {
          question: "What Salesforce Sales Cloud services do you provide in the UK?",
          answer: "The Sales Cloud services we provide in the UK cover advisory, implementation, optimisation of existing orgs, integrations with your finance and marketing tools, ongoing managed services, user training, and post-go-live support across releases. We work with you across every stage of your Sales Cloud implementation lifecycle.",
        },
        {
          question: "What does a Salesforce Sales Cloud Implementation Partner do?",
          answer: "A Salesforce Sales Cloud implementation partner takes you from licensing to deployment to user adoption. They configure objects, automation, reports, and integrations to fit your specific business, then train your team properly so user adoption holds up well after go-live and beyond the first review.",
        },
        {
          question: "What is the difference between a Salesforce Sales Cloud consultant and an implementation partner?",
          answer: "A consultant advises on what Sales Cloud should do for you and how to design it properly. An implementation partner actually builds the configured system you need. ProvidusCRM does both well, so your strategy and the build never drift apart across the course of the project.",
        },
        {
          question: "How long does a Salesforce Sales Cloud implementation take?",
          answer: "Sales Cloud implementation typically runs eight to sixteen weeks from kickoff to go-live, depending on scope and integrations involved. Larger, multi-region, or integration-heavy projects can take longer. Our consultants give you a realistic timeline after the discovery phase.",
        },
        {
          question: "What industries do your Salesforce Sales Cloud consultants in the UK work with?",
          answer: "Our consultants work across nonprofit, retail and ecommerce, healthcare, education, financial services, and manufacturing sectors regularly. We bring sector context and relevant prior experience to each Sales Cloud project, so the configuration fits how your industry actually sells and serves its end customers.",
        },
        {
          question: "How much do Salesforce Sales Cloud services cost in the UK?",
          answer: "Consulting and implementation costs depend on factors such as scope, integrations needed, licence counts, and the size of your sales team. Pricing starts at around £30,000 and goes upwards for complex multi-cloud projects with integrations. At ProvidusCRM, our consultants share a clear quote after discovery.",
        },
      ],
    },
    // L397 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-sales-cloud-consulting") },
    // L402 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Transform Your Sales Process Today",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};

// ---------------------------------------------------------------------------
// /platform-expertise/salesforce-service-cloud-consulting

// getSitePageJsonLd("salesforce-service-cloud-consulting", schema)
const serviceCloudSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Service Cloud Consulting | ProvidusCRM",
  "description": "Salesforce Service Cloud Consulting Services",
  "url": "https://providuscrm.co.uk/platform-expertise/salesforce-service-cloud-consulting",
  "provider": {
    "@type": "Organization",
    "name": "ProvidusCRM",
    "url": "https://providuscrm.co.uk",
    "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
  },
};

export const serviceCloudPage: SeedPage = {
  slug: "platform-expertise/salesforce-service-cloud-consulting",
  title: "Platform Expertise — Service Cloud",
  legacyKey: "salesforce-service-cloud-consulting",
  clipOverflowX: true,
  seoFallback: {
    title: "Salesforce Service Cloud Consulting | ProvidusCRM",
    description: "Salesforce Service Cloud Consulting Services",
  },
  jsonLdFallback: serviceCloudSchema,
  sections: [
    // L58 <HeroSection title subtitle subtitleAsH1 description image bullets /> (no imageAlt: the component default; no imageClassName)
    {
      _type: "heroSection",
      subtitle: "Salesforce Service Cloud Consulting & Implementation",
      subtitleAsH1: true,
      title: heading("Route Cases Correctly.\nReport On Them Honestly.", { mark: "after", markStyle: "hero", markSpace: true }),
      description: "At ProvidusCRM, we leverage our extensive Salesforce Service Cloud expertise to configure and optimise case routing, the agent console, and reporting so cases reach the right agent and metrics reflect what really happened.",
      bullets: [
        "Certified Salesforce Service Cloud consultants",
        "Routing rules matched to the real case volume and channel mix",
        "Reporting that reflects actual resolutions",
        "Ongoing monitoring so routing and reporting stay aligned",
      ],
      image: img("/images/platform-expertise/pr-service-cloud-hero.webp", "Business meeting"),
    },
    // L80 <PartnersSection />
    partnersSection(),
    // L83 <ExpertiseSalesforceSection heading text image /> (imageAlt is the component default)
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Certified Salesforce Service Cloud Expertise You Can't Go Wrong With"),
      text: "Our diverse team of Salesforce experts hold certifications and have experience working on projects across the Salesforce ecosystem, including Salesforce Service Cloud. We have delivered case management, omnichannel routing, and reporting rebuilds across the UK, USA, and GCC markets.",
      image: img("/images/platform-expertise/salesforce-partner.webp", "Salesforce Partner"),
    },
    // L90 <ExpertiseCertifiedSection images /> (alts are the component's "Certification N" defaults)
    { _type: "expertiseCertifiedSection", images: certifiedBadges.map((p) => img(p)) },
    // L106 {caseStudies.cards.length > 0 && <ServiceCaseStudiesSection title caseStudies />}
    { _type: "serviceCaseStudiesSection", ...curated("caseStudies", "salesforce-service-cloud-consulting") },
    // L114 <WhatWeDoSection title tabs backgroundOverlayColor />
    {
      _type: "whatWeDoSection",
      title: "Salesforce Service Cloud Services & Solutions We Offer",
      tabs: [
        {
          label: "Case Routing & Omnichannel Setup",
          heading: "Case Routing & Omnichannel Setup",
          text: "Getting cases to the right agent, on the right channel, the first time. Our consultants build routing as one engine with shared context across chat, social, voice, and email, rather than five separate queues that happen to share a login screen.\n\nWe configure skills-based assignment, AI-assisted routing where it fits, and SLA-driven escalation rules that reflect how your team actually structures its shifts. Case queues get rebuilt around your real team structure, not the template that came with the sandbox.",
          bullets: [
            "Skills-based and AI-assisted case assignment",
            "True omnichannel routing across chat, voice, email, and social",
            "SLA automation and escalation rules matched to your shifts",
            "Case queues rebuilt around your real team structure",
          ],
        },
        {
          label: "Agent Experience",
          heading: "Agent Experience",
          text: "A console that helps agents resolve faster, rather than one they fight against every day. Our consultants configure the Service Console around the workflows your team actually follows, not the demo layout from the sales cycle.\n\nWe set up macros, quick actions, and case templates for the case types your team handles most often. Knowledge articles get connected to those case types so agents surface answers without leaving the console. Where field service applies, we configure the mobile app for engineers working away from the desk.",
          bullets: [
            "Service Console configured for your actual workflows",
            "Knowledge base tied to your most common case types",
            "Macros, quick actions, and case templates that save agent clicks",
            "Field service and mobile setup, where relevant",
          ],
        },
        {
          label: "Automation & AI",
          heading: "Automation & AI",
          text: "Automation only works when it runs on clean data and clear rules. Bolt AI onto messy case records and it produces confident nonsense that agents quickly learn to ignore. Our consultants prepare the ground first, then add the intelligence on top.\n\nWe configure Einstein bots and predictive case routing so they solve a specific problem, and build Agentforce agents that handle triage, follow-ups, and status updates inside your service rules. Every automation gets validated against actual case outcomes before it rolls out, so you know it works before your customers do.",
          bullets: [
            "Einstein bots and predictive case routing are configured properly",
            "Agentforce agents are built around your service rules",
            "Automated triage and suggested responses for common patterns",
            "Automation validated against actual case outcomes before rollout",
          ],
        },
        {
          label: "Self-Service & Honest Deflection",
          heading: "Self-Service & Honest Deflection",
          text: "Self-service that reduces load on your team, measured against confirmed resolution rather than article impressions. Our consultants build the portal, knowledge base, and community setup so customers can actually solve their own problems.\n\nWe configure knowledge structures around the questions customers actually ask, set up self-service portals with case submission and status tracking, and connect communities where partner or peer support genuinely helps. Deflection tracking then measures whether the customer came back with the same case, not whether they viewed the page.",
          bullets: [
            "Knowledge base and self-service portal setup",
            "Customer and partner community configuration",
            "Deflection tracked against confirmed resolution",
            "Case submission and status tracking for customers",
          ],
        },
        {
          label: "Ongoing Optimisation",
          heading: "Ongoing Optimisation",
          text: "Most engagements start by identifying the specific breakdown affecting your team, rather than running a generic health check. Routing accuracy, reporting definitions, automation trust, or console usability each have their own diagnostic path.\n\nOur team runs quarterly reviews of routing rules and reporting accuracy, handles Salesforce release updates carefully, and adjusts the setup as your case volume, channels, and team structure change. As new problems surface, we prioritise them alongside you rather than adding them to a queue.",
          bullets: [
            "Quarterly reviews of routing rules and reporting accuracy",
            "Release management aligned to Salesforce updates",
            "Proactive monitoring and quick issue resolution",
            "Continuous improvement as case volume and channels grow",
          ],
        },
      ],
      backgroundOverlayColor: "#616161",
    },
    // L192 <ExpertiseCtaSection title buttonText buttonHref image1 image2 /> (alts are the component defaults)
    {
      _type: "expertiseCtaSection",
      title: "Reinvent Your Support Workflows With Our Salesforce Service Cloud Consultants.",
      buttonText: "Let's Connect",
      buttonHref: "/contact",
      image1: img("/images/platform-expertise/expertise-cta-1.webp", "Consultation Team"),
      image2: img("/images/platform-expertise/expertise-cta-2.webp", "Salesforce Astro"),
    },
    // L201 <ExpertisePlatformsSection title items />
    {
      _type: "expertisePlatformsSection",
      title: "Our Expertise Beyond Salesforce Service Cloud",
      items: [
        {
          title: "Sales Cloud",
          text: "We configure Salesforce Sales Cloud around your day to day workflows. This helps your sales reps sell more and improve customer retention. Our team maps lead routing, opportunity stages, and forecasting views to your sales process.",
          icon: img("/images/sales-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Marketing Cloud",
          text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting connect properly to your CRM data. We build campaigns that target the right people and tie back cleanly to revenue instead of vanity metrics.",
          icon: img("/images/marketing-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
        {
          title: "Revenue Cloud",
          text: "Make quoting faster and more accurate as your business grows with our Salesforce CPQ and Revenue Cloud consultants. Discounts follow clear rules, contracts move smoothly through approvals, and revenue logic holds from quote to cash.",
          icon: img("/images/revenue-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
        },
        {
          title: "Experience Cloud",
          text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data. We configure sharing rules and self-service flows so each user type sees only what they should.",
          icon: img("/images/experience-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
        },
        {
          title: "Data Cloud",
          text: "We configure Salesforce Data Cloud to unify customer records across your CRM, website, transactions, and support tools. As a result, your service and marketing teams work from one accurate profile rather than five conflicting ones.",
          icon: img("/images/data-cloud.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
        },
        {
          title: "Agentforce",
          text: "Drive agentic AI automation across your Salesforce org with Salesforce. We set up and configure agents to perform tasks across your service processes. They qualify, route, and complete tasks inside your workflows, running on rules and data you control.",
          icon: img("/images/agent-force.webp"),
          bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
        },
      ],
    },
    // L244 <ExpertiseImplementationSection heading items />
    {
      _type: "expertiseImplementationSection",
      heading: heading("Industries We Impact"),
      items: [
        {
          title: "Non-Profit",
          text: "Manage consequent support and service delivery with our Salesforce Service Cloud and Nonprofit Cloud consultants. We replace siloed spreadsheets with a 360-degree stakeholder view, enabling organizations to resolve issues faster and operate more efficiently.",
          image: img("/images/platform-expertise/non-profit.webp"),
        },
        {
          title: "Retail & eCommerce",
          text: "During peak seasons, your support tickets rise with your sales. Case volume can quadruple in a week, then returns season starts the day the holiday shopping stops. We build routing that scales with seasonal patterns, self-service flows that handle common promotional queries without an agent, and reporting that shows where the queue actually is during peak.",
          image: img("/images/platform-expertise/commerce.webp"),
        },
        {
          title: "Financial Services",
          text: "Case handling in banking and insurance needs a clear audit trail. Regulators want to see who touched a case, what they decided, and why. We configure case handling with complete audit trails, escalation paths that meet regulatory requirements, and reporting that satisfies both operations managers and compliance teams.",
          image: img("/images/platform-expertise/finance.webp"),
        },
        {
          title: "Manufacturing",
          text: "Manufacturers rarely support end customers directly. Cases usually flow through dealers, distributors, and service partners, each with their own SLA expectations and their own view of what \"resolved\" means. Our consultants configure Service Cloud with partner community access, cross-network case visibility, and reporting that shows where cases sit across the whole distribution chain.",
          image: img("/images/platform-expertise/manufacturing.webp"),
        },
      ],
    },
    // L271 <WhyChooseSection title customReasons image backgroundOverlayColor /> (imageAlt is the component default)
    {
      _type: "whyChooseSection",
      title: "Why Choose ProvidusCRM As Your Salesforce Service Cloud Partner?",
      reasons: [
        {
          title: "Certified Expertise. Single POC",
          text: "We equip you with talent certified across the Salesforce ecosystem, not just Service Cloud. Our Service Cloud consultant leads your project from kick-off to go-live. We understand your team, culture, workflows, decisions, and goals.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/different.webp"),
        },
        {
          title: "Weekly Standups & Updates",
          text: "Our consultant provides you with an update regarding your project, our deliverables, progress, challenges, and key decisions. After every phase, we provide you with a detailed project summary to update all your stakeholders regarding project status.",
          color: "var(--color-soft-purple)",
          icon: img("/images/better.webp"),
        },
        {
          title: "Post-Launch Support & Growth Plan",
          text: "We schedule org reviews after regular intervals after go-live, with an end-to-end action plan. Support does not disappear when the contract ends. Your Service Cloud setup keeps improving because someone is watching it.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/salesforce-partner.webp"),
        },
      ],
      image: img("/images/platform-expertise/expertise-choose.webp", "Salesforce Specialist"),
      backgroundOverlayColor: "#616161",
    },
    // L298 <FaqSection title faqs />
    {
      _type: "faqSection",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How is Salesforce case deflection rate actually calculated?",
          answer: "Salesforce reports deflection as the count of interactions where a customer engaged with self-service and did not go on to submit a case within a defined window. However, most defaults measure article views rather than confirmed non-resolution. Our consultants set the window and definitions carefully so the number reflects reality.",
        },
        {
          question: "What is the real difference between omnichannel and multichannel support?",
          answer: "Multichannel means your team supports chat, email, voice, and social, each with its own queue and context. Omnichannel means one routing engine handles all channels, agents see the full customer history regardless of channel, and cases move between channels without losing thread. Most setups labelled omnichannel are actually multichannel.",
        },
        {
          question: "Why does our support dashboard not match what our team actually experiences?",
          answer: "Usually one of three things: case status definitions drift after go-live; routing rules changed without corresponding reporting updates; or the team is reporting off Service Cloud directly rather than a governed reporting layer. Our consultants diagnose which one and fix it.",
        },
        {
          question: "How long does a Service Cloud routing and reporting rebuild actually take?",
          answer: "A focused rebuild runs six to ten weeks. A full omnichannel cleanup with knowledge base restructuring and warehouse integration typically runs twelve to sixteen weeks. Our consultants share a realistic timeline after discovery, based on your actual case volumes and channels.",
        },
        {
          question: "What is the difference between a Service Cloud consultant and an implementation partner?",
          answer: "A consultant advises on how Service Cloud should be configured for your team. An implementation partner actually builds it. Our consultants deliver both together, so the strategy and the build never drift apart across the course of the project.",
        },
        {
          question: "How do you stop reporting and routing rules from drifting apart again after go-live?",
          answer: "We document each metric definition and the routing rule it depends on, then run quarterly reviews that check whether they still match. When routing changes for a good reason, reporting changes with it rather than being noticed six months later when the dashboard stops making sense.",
        },
        {
          question: "Do you integrate Service Cloud with a data warehouse for deeper reporting?",
          answer: "Yes. We move support data into Snowflake, BigQuery, or Databricks through Fivetran, Airbyte, or custom pipelines, then build reporting on top. This matters when your questions need historical depth or cross-business analysis that Service Cloud reporting cannot support directly.",
        },
        {
          question: "How much do Service Cloud services cost?",
          answer: "For a complete Salesforce Service Cloud consulting and implementation project, the cost starts at £30,000. However, as project scope and complexity rises, the cost goes higher as well. We provide complete clarity and transparency on project pricing and ensure you're getting exceptional value for your investment.",
        },
        {
          question: "What does a proper omnichannel setup actually require, technically?",
          answer: "One routing engine with skills-based rules, unified case object structure across channels, shared agent presence across channel queues, and reporting that treats a customer's chat and email as one interaction rather than two. Anything less is multichannel with a shared login screen.",
        },
      ],
    },
    // L340 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "salesforce-service-cloud-consulting") },
    // L345 <CtaSection title buttonLabel buttonHref backgroundImage />
    {
      _type: "ctaSection",
      title: "Reinvent Your Support Workflows With ProvidusCRM",
      buttonLabel: "Talk to an Expert",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};
