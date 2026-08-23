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
} from "@/components/sections";
import type { WhyChooseReason } from "@/components/sections/WhyChooseSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "Whether your current Commerce Cloud setup needs a fix, customisation, optimisation, or a setup from scratch, you can count on ProvidusCRM's certified team. We streamline order management, after-sales support, and a lot more for B2C and B2B retailers.";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-commerce-cloud-consulting", {
    title: "Salesforce Commerce Cloud Consulting & Implementation",
    description: DESCRIPTION,
    canonicalPath: "/platform-expertise/salesforce-commerce-cloud-consulting",
    image: "/images/platform-expertise/commerce-cloud/hero.webp",
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Salesforce Commerce Cloud Consulting & Implementation",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/platform-expertise/salesforce-commerce-cloud-consulting",
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
        image="/images/platform-expertise/commerce-cloud/hero.webp"
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
              text: "B2B and B2C commerce run on different rules. A B2C storefront optimises for browsing, promotion, and one-off conversion. A B2B store runs on account hierarchies, contract pricing, and reorder behaviour that a consumer storefront has no concept of.\n\nOur consultants configure the model your business actually sells under, and where you sell through both, we keep them on shared product and customer data rather than running two disconnected stores.",
              bullets: [
                "B2C storefronts built around browsing, promotion, and checkout conversion",
                "B2B account hierarchies, contract pricing, and quote workflows",
                "Reorder, bulk order, and buyer-specific catalogue configuration",
                "Shared product and customer data across both commerce models",
              ],
            },
          },
          {
            id: "migration",
            label: "Platform Migration & Replatforming",
            content: {
              heading: "Platform Migration & Replatforming",
              text: "Replatforming goes wrong when the migration is treated as a data transfer rather than a commercial event. Product catalogues, customer accounts, order history, and search rankings all have to land intact, and the cutover has to happen without losing trading days.\n\nOur consultants map what moves, what gets rebuilt, and what gets retired, then run the migration in stages you can verify before the switch.",
              bullets: [
                "Migration from Magento, Shopify Plus, BigCommerce, and custom platforms",
                "Catalogue, customer, and order history migration with validation",
                "URL, redirect, and search equity preservation through cutover",
                "Staged cutover planning that protects trading days",
              ],
            },
          },
          {
            id: "integration",
            label: "Integration & Order Management",
            content: {
              heading: "Integration & Order Management",
              text: "A storefront that cannot see stock, or an ERP that learns about an order hours later, creates problems your customer service team absorbs. Commerce Cloud has to sit inside the systems that actually fulfil the order.\n\nOur consultants connect Commerce Cloud to your order management, ERP, and payment systems, then define what happens when those systems disagree rather than leaving it to be discovered in production.",
              bullets: [
                "Salesforce Order Management implementation and configuration",
                "ERP, warehouse, and inventory integration with agreed sync direction",
                "Payment gateway, tax, and shipping provider connections",
                "Error handling and reconciliation for orders that fail mid-flow",
              ],
            },
          },
          {
            id: "performance",
            label: "Store Performance Optimisation",
            content: {
              heading: "Store Performance Optimisation",
              text: "Peak trading is when performance problems become revenue problems. Slow category pages, a checkout that stalls under load, and search that returns the wrong products all cost conversion at exactly the moment traffic is highest.\n\nOur consultants profile your storefront against real traffic patterns, fix what is measurably slow, and prepare the org for peak-season load before the season starts.",
              bullets: [
                "Storefront performance profiling and Core Web Vitals work",
                "Cart and checkout conversion analysis",
                "Search, merchandising, and product recommendation tuning",
                "Peak-season load readiness and release freeze planning",
              ],
            },
          },
          {
            id: "managed-services",
            label: "Salesforce Managed Services & Support",
            content: {
              heading: "Salesforce Managed Services & Support",
              text: "Commerce orgs drift. Promotions change, catalogues grow, integrations get patched, and the configuration that fitted at launch stops matching how you trade a year later.\n\nOur consultants provide ongoing support across Salesforce releases, with a team that already knows your implementation rather than one reading it for the first time on every ticket.",
              bullets: [
                "Ongoing support from consultants who know your implementation",
                "Salesforce release management and regression testing",
                "Catalogue, promotion, and merchandising change support",
                "Monitoring, incident response, and post-incident fixes",
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
        image="/images/platform-expertise/commerce-cloud/why-choose.webp"
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
              "Salesforce is repositioning Commerce Cloud as Agentforce Commerce, similar to how Nonprofit Cloud became Agentforce Nonprofit and Education Cloud became Agentforce Education. The underlying product is the same, with deeper Agentforce agent integration. Our consultants work with it under either name, depending on which term matches your Salesforce contact.",
          },
          {
            question:
              "What's the difference between Salesforce B2B Commerce and B2C Commerce?",
            answer:
              "B2C Commerce is built for selling to consumers: browsing, promotions, and high-volume one-off checkout. B2B Commerce is built for selling to businesses, with account hierarchies, contract pricing, negotiated terms, and repeat ordering. They share the Salesforce platform but model buying behaviour differently, so the right choice depends on who places the order, not only on what you sell.",
          },
          {
            question:
              "Can you migrate us from Magento or Shopify Plus to Commerce Cloud?",
            answer:
              "Yes. We migrate product catalogues, customer accounts, and order history from Magento, Shopify Plus, BigCommerce, and custom platforms, and preserve URL structure and redirects so search rankings survive the move. The migration runs in stages you can verify before cutover, which is what keeps a replatform from costing you trading days.",
          },
          {
            question: "Does Commerce Cloud support headless architecture?",
            answer:
              "Yes. Commerce Cloud supports headless and composable builds through its APIs and PWA Kit, so you can run a custom front end while Commerce Cloud remains the commerce engine. Headless is worth the cost when you genuinely need front-end freedom; when you do not, SFRA is faster to build and cheaper to maintain. Our consultants tell you which case you are actually in.",
          },
          {
            question: "Can Commerce Cloud integrate with our OMS or ERP?",
            answer:
              "Yes. We connect Commerce Cloud to Salesforce Order Management, third-party order management platforms, and ERP systems including SAP, NetSuite, and Microsoft Dynamics. The part that matters is deciding which system owns which record and what happens when they disagree, and we agree that before the build rather than discovering it in production.",
          },
          {
            question: "How long does a Commerce Cloud implementation take?",
            answer:
              "A straightforward B2C storefront on SFRA usually takes three to five months. Replatforming with catalogue and order history migration, or a build with several ERP and order management integrations, typically runs six to nine months. We scope the timeline against your integrations and your trading calendar, and plan around your peak season rather than through it.",
          },
          {
            question:
              "What's the difference between a Commerce Cloud consultant and an implementation partner?",
            answer:
              "A consultant advises on what your storefront should do and how it should be architected. An implementation partner builds and deploys it. ProvidusCRM does both, so the commercial thinking and the build never drift apart over the course of the project.",
          },
          {
            question: "How much do Commerce Cloud consulting services cost?",
            answer:
              "Cost depends on scope: the commerce model you sell under, how many systems have to be integrated, whether you are migrating an existing catalogue, and how much ongoing support you need after go-live. We scope transparently and give you a breakdown before any work starts, so you can see what drives the number rather than receiving a single figure.",
          },
        ]}
      />

      {/* 11. CTA */}
      <CtaSection
        title="Connect With Our Salesforce Consultants Today!"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
