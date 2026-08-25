import type { Metadata } from "next";
import {
  HeroSection,
  PartnersSection,
  ServiceCaseStudiesSection,
  SplitComparisonSection,
  WhatWeDoSection,
  ExpertiseCtaSection,
  ExpertisePlatformsSection,
  WhyChooseSection,
  CertifiedSection,
  FaqSection,
  CtaSection,
  PageBlogsSection,
} from "@/components/sections";
import type { WhyChooseReason } from "@/components/sections/WhyChooseSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "Whether your current Commerce Cloud setup needs a fix, customisation, optimisation, or a setup from scratch, you can count on ProvidusCRM's certified team. We streamline order management, after-sales support, and a lot more for B2C and B2B retailers.";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-commerce-cloud-consulting", {
    title: "Salesforce Commerce Cloud Consulting & Implementation",
    description: DESCRIPTION,
    canonicalPath: "/industries/salesforce-commerce-cloud-consulting",
    image: "/images/industries/commerce-cloud/hero.webp",
  });
}

/**
 * The Figma pairs these bodies with the wrong headings — each body sits one
 * card away from the heading it describes. Paired here by what the copy
 * actually says.
 */
const whyChoose: WhyChooseReason[] = [
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

export default async function SalesforceCommerceCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-commerce-cloud-consulting"
  );
  const blogs = await getPageBlogs("salesforce-commerce-cloud-consulting");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Salesforce Commerce Cloud Consulting & Implementation",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/industries/salesforce-commerce-cloud-consulting",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd(
    "salesforce-commerce-cloud-consulting",
    schema
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="Salesforce Commerce Cloud Consulting & Implementation"
        subtitleAsH1
        title={
          <>
            Custom CRM Solutions
            <br />
            for 3X Retail Growth{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        bullets={[
          "Certified Salesforce Commerce Cloud Consultants",
          "Transparent project scoping",
          "Integration with order management, ERP, and your Salesforce data",
        ]}
        image="/images/industries/commerce-cloud/hero.webp"
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. Case studies — selected in Sanity ("Page case studies" → Commerce Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 4. Scoping questions */}
      <SplitComparisonSection
        heading="What You Need to Ask Before Any Salesforce Commerce Cloud Implementation"
        subtitle="Most CRM solution providers struggle to understand your specific Commerce Cloud challenges and scope the implementation. Before you go ahead with our Salesforce Commerce Cloud services, we require answers to the following questions."
        cards={[
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
        ]}
      />

      {/* 5. Services */}
      <WhatWeDoSection
        title="Our Salesforce Commerce Cloud Services"
        tabs={[
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
        ]}
      />

      {/* 6. Mid-page CTA */}
      <ExpertiseCtaSection
        title="Book A CRM Audit For Your Store"
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 7. Platform expertise carousel */}
      <ExpertisePlatformsSection
        title="Our Platform Expertise Beyond Salesforce Commerce Cloud"
        items={[
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
        ]}
      />

      {/* 8. Why ProvidusCRM */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Consulting Partner"
        customReasons={whyChoose}
        image="/images/industries/commerce-cloud/why-choose.webp"
        imageAlt="Consultant reviewing store performance on a tablet"
      />

      {/* 9. Certified expertise */}
      <CertifiedSection
        title="Certified Salesforce Expertise You Can Count On"
        description="Our team holds certifications across the Salesforce ecosystem and has experience across Storefront Reference Architecture (SFRA) implementations, replatforming, integrations, and peak-trading performance work for B2B and B2C commerce."
      />

      {/* 10. FAQs */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
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
        ]}
      />

      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}

      {/* 11. CTA */}
      <CtaSection
        title="Connect With Our Salesforce Consultants Today!"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
