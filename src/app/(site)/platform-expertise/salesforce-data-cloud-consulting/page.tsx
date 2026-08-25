import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { Fragment } from "react";
import {
  HeroSection,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseFeaturesSection,
  WhatWeDoSection,
  ServiceCaseStudiesSection,
  ExpertiseCtaSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  ExpertisePlatformsSection,
  ExpertiseImplementationSection,
  WhyChooseSection,
  FaqSection,
  IdentityResolutionSection,
  SplitComparisonSection,
  PageBlogsSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-data-cloud-consulting", {
    title: "Salesforce Data Cloud Consulting | ProvidusCRM",
    description: "Salesforce Data Cloud Consulting Services",
    canonicalPath: "/platform-expertise/salesforce-data-cloud-consulting",
  });
}

export default async function SalesforceDataCloudConsultingPage() {
  const blogs = await getPageBlogs("salesforce-data-cloud-consulting");
  const caseStudies = await getPageCaseStudies(
    "salesforce-data-cloud-consulting"
  );

  const schema = {
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
  const jsonLd = await getSitePageJsonLd("salesforce-data-cloud-consulting", schema);

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Salesforce Data Cloud Consulting{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Salesforce Data Cloud Consulting & Implementation Partner"
        subtitleAsH1
        description="At ProvidusCRM, we configure Salesforce Data Cloud so that customer records from your CRM, website, transactions, and other tools merge correctly into a single profile. Your segments, reports, and AI features run on data your team can actually trust."
        image="/images/platform-expertise/data-cloud-hero.webp"
        bullets={[
          "Certified Data Cloud expertise",
          "Identity resolution that merges records correctly",
          "Data accurate enough for reports and AI features",
          "Ongoing monitoring so accuracy does not drift"
        ]}
        hideCta
      />

      {/* 2. Trusted Section */}
      <PartnersSection />

      {/* 3. Expertise Description */}
      <ExpertiseDescriptionSection
        heading={
          <>
            Data Cloud Delivers What Your Setup Around It Allows{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "Data Cloud can unify all your customer signals and stream them in real time to Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce.",
          "But that promise only holds when identity resolution, ingestion, and governance are configured with care.",
          "Three problems quietly break most implementations before they deliver value."
        ]}
      />

      {/* 4. Expertise Features */}
      <ExpertiseFeaturesSection
        features={[
          {
            title: "Fragmented Customer\nRecords",
            description: "Your website, CRM, ecommerce, and support tools each hold a different version of the same customer. Segments target the wrong people, reports contradict each other, and AI features surface confident recommendations built on records that should never have existed as separate profiles.",
            icon: "/images/platform-expertise/Mask group (1).webp"
          },
          {
            title: "Unclear Sales\nPipeline Structure",
            description: "The same customer sits in your systems three times, sometimes five. Each duplicate carries partial history and partial preferences. So your reports overcount, your marketing sends the same email twice with different subject lines, and your customer notices the amateur hour.",
            icon: "/images/platform-expertise/Mask group (2).webp"
          },
          {
            title: "Manual\nAdministration",
            description: "Einstein and Agentforce run on the data you give them. Feed them fragmented records, and they generate confident nonsense your team quickly learns to ignore. The result? Your AI investment stalls, not because the technology fails, but because the underlying data quietly undermines it.",
            icon: "/images/platform-expertise/Mask group (3).webp"
          }
        ]}
      />

      {/* 5. Salesforce Section */}
      <ExpertiseSalesforceSection
        heading="Count On Our Certified Salesforce Data Cloud Prowess"
        text="ProvidusCRM houses a team of Salesforce architects, developers, and consultants with expertise across the platform’s ecosystem, including Data Cloud. We ensure your CRM works with a single source of truth, driving efficient workflows and reliable automation"
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 6. Certified Marque */}
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

      {/* 7. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Data Cloud Services & Solutions We Offer"
        tabs={[
          {
            id: "consulting",
            label: "Consulting",
            content: {
              heading: "Salesforce Data Cloud Consulting",
              text: "Most Data Cloud problems start before configuration. Someone chose the wrong data sources to bring in first, skipped identity resolution planning, or bought Data Cloud without a clear activation goal. Our consulting engagement gets these decisions right at the start.\n\nOur consultants map your source systems, review your existing data quality, and design the identity resolution and governance approach that fits your business. We plan the ingestion sequence carefully, so the identity backbone is built before behavioural data floods in. Therefore, you start the build with a foundation on which the rest of the project can actually rest.",
              bullets: [
                "Source system audit and data quality review",
                "Identity resolution and match rule strategy",
                "Ingestion sequencing plan built for accuracy",
                "Governance framework aligned with your data owners"
              ]
            }
          },
          {
            id: "implementation",
            label: "Implementation",
            content: {
              heading: "Salesforce Data Cloud Implementation",
              text: "Data Cloud has many moving parts: data streams, data lake objects, unified profiles, calculated insights, segments, and activation targets all need to fit together. Our implementation service integrates them into a single working system rather than a scattered set of components.\n\nOur consultants configure your data spaces, ingest the priority sources, and build the match rules and survivorship logic that create accurate unified profiles. We connect Data Cloud to Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce, so the unified layer actually powers your downstream tools. Every rule gets tested against sample data before it touches production.",
              bullets: [
                "Data spaces, streams, and lake objects configured properly",
                "Match rules and survivorship logic tuned to your data",
                "Downstream activation into Sales, Service, and Marketing Cloud",
                "Testing against sample data before production goes live"
              ]
            }
          },
          {
            id: "enablement",
            label: "Enablement",
            content: {
              heading: "Data Cloud Enablement",
              text: "Unified profiles only pay back when they are actually used. Activation turns Data Cloud from a data project into a business capability that your marketing, sales, and service teams feel every day.\n\nOur consultants set up segmentation, calculated insights, and real-time triggers so unified profiles drive live journeys, sales alerts, and service context. We build activation across email, ads, mobile, web, and inside the Salesforce consoles your teams already work in.",
              bullets: [
                "Segmentation and audience design built on unified profiles",
                "Calculated insights configured for priority use cases",
                "Real-time triggers into Marketing Cloud journeys and Sales Cloud",
                "Activation across email, ads, mobile, and web channels"
              ]
            }
          },
          {
            id: "integration",
            label: "Integration",
            content: {
              heading: "Data Cloud Integration",
              text: "Data Cloud only works when the systems around it feed it accurately. Our integration service connects your data sources cleanly, so unified profiles stay current rather than drifting away from reality between syncs.\n\nOur consultants build ingestion from Sales Cloud, Service Cloud, ecommerce platforms, web analytics, and third-party tools using native connectors and APIs. We support zero-copy sharing with Snowflake and Databricks where relevant, so your warehouse and Data Cloud work together rather than duplicating storage. Every connection includes error handling and monitoring from day one.",
              bullets: [
                "Native connectors to Salesforce, ecommerce, and web sources",
                "Zero-copy sharing with Snowflake and Databricks",
                "API integration for custom and legacy systems",
                "Error handling and monitoring built into every connection"
              ]
            }
          },
          {
            id: "security",
            label: "Security & Governance",
            content: {
              heading: "Data Security, Governance & Compliance",
              text: "Data Cloud sits at the centre of your customer data, which makes governance a compliance obligation rather than a nice-to-have. Our consultants build the security, consent, and governance layer that keeps your Data Cloud implementation audit-ready as regulations shift.\n\nWe configure role-based access controls, field-level security, and consent capture aligned to GDPR, UK GDPR, and sector regulations. Our team documents data lineage, sets up audit logging, and builds the consent flows that keep marketing activation compliant. Therefore, your Data Cloud implementation holds up under review, not just under normal use.",
              bullets: [
                "Role-based access and field-level security configured properly",
                "Consent capture aligned to GDPR, UK GDPR, and sector rules",
                "Data lineage documentation and audit logging in place",
                "Consent flows that keep activation compliant"
              ]
            }
          },
          {
            id: "managed-services",
            label: "Managed Services",
            content: {
              heading: "Managed Services",
              text: "A Data Cloud org needs ongoing care more than most Salesforce products. Match rules drift as data patterns shift, new source systems arrive quarterly, and identity accuracy quietly degrades without monitoring. Our managed services keep your Data Cloud platform performing over time.\n\nOur team monitors match confidence, duplicate rates, and consent flow health week by week. We handle release updates carefully, adjust match rules as new sources come in, and support your team as activation use cases grow. Therefore, your Data Cloud investment keeps paying off long after go-live rather than needing rescue work in a year.",
              bullets: [
                "Ongoing match accuracy and consent monitoring",
                "Careful handling of Salesforce release updates",
                "Match rule adjustments as new sources come in",
                "Support for new activation use cases as they grow"
              ]
            }
          }
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 8. Case Studies — selected in Sanity ("Page case studies" → Data Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 9. Expertise CTA */}
      <ExpertiseCtaSection
        title="Still struggling to have a single source of truth for your customer data? Reach out to our team today!"
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 10. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Our End-to-End Salesforce Platform Expertise"
        items={[
          {
            title: "Service Cloud",
            text: "Our consultants set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Sales Cloud",
            text: "Our consultants configure Sales Cloud around how your sales team works day to day. We map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Most AI tools answer questions and stop there. Agentforce agents go further and actually do the work. Our consultants build agents that qualify leads, route cases, and complete routine tasks inside your workflows.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting all connect properly to your CRM data.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "Our consultants configure Revenue Cloud and CPQ so quotes stay fast and accurate, even as your product catalogue and business grow more complex over time.",
            icon: "/images/revenue-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          }
        ]}
      />

      {/* 11. Identity Resolution Section */}
      <IdentityResolutionSection />

      {/* 12. Why Choose Section */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM For Salesforce Data Cloud Consulting"
        customReasons={[
          {
            title: "Certified Data Cloud Consultants",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "Our consultants hold Salesforce Data Cloud certifications and have delivered projects across financial services, retail, and healthcare markets. Therefore, you get judgment from teams who have configured match rules and survivorship logic under production conditions rather than in training scenarios."
          },
          {
            title: "Identity Resolution Expertise",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "Match rule design and governance are their own discipline inside Data Cloud, not a subtask of a broader Salesforce implementation. Our consultants treat them accordingly, designing against sample data and documenting each decision with your data owners."
          },
          {
            title: "Ongoing Match Accuracy Monitoring",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "Data Cloud accuracy degrades quietly without oversight. Our team monitors match confidence, duplicate rates, and consent flow health week by week after go-live. Therefore, your Data Cloud investment keeps performing rather than needing rescue work later."
          }
        ]}
        image="/images/platform-expertise/data-cloud-why-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 13. Data Cloud vs Warehouse Section */}
      <SplitComparisonSection
        heading="Data Cloud vs Your Data Warehouse, Do You Need Both?"
        cards={[
          {
            title: (
              <>
                Data Cloud Is
                <br />
                The Operational Layer
              </>
            ),
            color: "#33FF00",
            text: "It keeps a live, unified view of each customer that Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce can read from within seconds. Its strength is the speed of activation across your Salesforce ecosystem.",
          },
          {
            title: (
              <>
                Your Data Warehouse Is
                <br />
                The Analytical Layer
              </>
            ),
            color: "#308FFF",
            text: "It holds large volumes of structured data across the whole business, so analysts can query it flexibly for reports, dashboards, and modelling. Its strength is analytical depth across every function, not just customer records.",
          },
          {
            title: (
              <>
                Most Businesses Need Both,
                <br />
                Connected Properly
              </>
            ),
            color: "#8800FF",
            text: "Data Cloud handles operational customer activation. The warehouse handles cross-business analysis. Zero-copy sharing with Snowflake and Databricks lets both platforms reference data without duplicating storage.",
          },
          {
            title: "The Common Mistake",
            color: "#FFB030",
            text: "Businesses purchase the Data Cloud license, expecting data warehouse-style reporting end up disappointed. Businesses that refuse Data Cloud because they already have a warehouse end up with Salesforce activation gaps. Our consultants map which layer holds which workload, based on how your business actually operates.",
          },
        ]}
      />

      {/* 14. Expertise Implementation */}
      <ExpertiseImplementationSection
        heading={
          <>
            Industries We Impact
          </>
        }
        items={[
          {
            title: "Non-Profit",
            text: "Donor, supporter, volunteer, and beneficiary data often live in separate systems. Our consultants configure Data Cloud alongside Nonprofit Cloud so fundraising, programme delivery, and stewardship teams share one accurate view of each supporter across the organisation.",
            image: "/images/platform-expertise/non-profit.webp"
          },
          {
            title: "Retail & eCommerce",
            text: "Retail customers move across mobile, desktop, in-store, and support in a single week. Our consultants configure Data Cloud and align it with Commerce Cloud to resolve these signals against a unified profile in real time, so loyalty attributes and browsing behaviour sit under one identity.",
            image: "/images/platform-expertise/commerce.webp"
          },
          {
            title: "Healthcare",
            text: "Patient identity resolution carries higher stakes than any other sector. Our consultants configure Data Cloud alongside Health Cloud with match rules that respect patient identifiers and consent scopes, treating identity accuracy as a compliance obligation rather than a marketing optimisation.",
            image: "/images/platform-expertise/health.webp"
          },
          {
            title: "Education",
            text: "Students, applicants, alumni, and donors sit inside education data. Our consultants implement Data Cloud alongside Education Cloud to connect that lifecycle, so recruitment and advancement teams work from the same view without gaps between departments.",
            image: "/images/platform-expertise/education.webp"
          },
          {
            title: "Financial Services",
            text: "Banks, lenders, and wealth firms need household matching under regulatory constraints. Our consultants configure Data Cloud match and household rules that reflect these relationships accurately, while keeping KYC and consent boundaries intact for compliance teams.",
            image: "/images/platform-expertise/finance.webp"
          },
          {
            title: "Manufacturing",
            text: "Manufacturers hold customer data across sales, distributors, service, and IoT signals from installed products. Our consultants implement Data Cloud alongside Manufacturing Cloud to unify these signals, so account teams work from a full picture rather than fragments.",
            image: "/images/platform-expertise/manufacturing.webp"
          }
        ]}
      />

      {/* 15. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "Is Salesforce Data Cloud the same as Data 360?",
            answer: "No. Salesforce Data Cloud is the official, current name for the platform. In the past, Salesforce has referred to its underlying data unification vision as \"Customer 360\" or \"Data 360,\" and the product was briefly codenamed \"Genie.\" Today, the standalone, enterprise product is officially called Salesforce Data Cloud."
          },
          {
            question: "Do we need Data Cloud if we already have a data warehouse?",
            answer: "Often yes, since they do different jobs. Data Cloud is the operational activation layer inside Salesforce. Your warehouse is the analytical layer across the business. They connect through zero-copy sharing with Snowflake and Databricks."
          },
          {
            question: "How is identity resolution different from deduplication?",
            answer: "Deduplication finds identical records in one system. Identity resolution links records across many systems using multi-attribute logic, and decides which field values survive the merge. It is a bigger, more deliberate decision than deduplication."
          },
          {
            question: "Can Data Cloud integrate with Snowflake, Databricks, or BigQuery?",
            answer: "Yes. Data Cloud supports zero-copy sharing with Snowflake and Databricks, so data can be referenced across platforms without duplicating storage. BigQuery integration works through connectors. Our consultants design the sync pattern based on your setup."
          },
          {
            question: "How does Agentforce actually use Data Cloud data?",
            answer: "Agentforce reads Data Cloud as its source of unified customer context. Agents use it through Retrieval-Augmented Generation to ground responses in current customer data rather than static knowledge. The quality of Agentforce depends on Data Cloud accuracy."
          },
          {
            question: "How long does a Data Cloud implementation take?",
            answer: "A focused first-activation build runs eight to twelve weeks. A full enterprise deployment with multiple data spaces and warehouse integration typically takes sixteen to twenty-four weeks. Our consultants give a realistic timeline after discovery."
          },
          {
            question: "How do you stop identity resolution accuracy from drifting after go-live?",
            answer: "We build monitoring into every Data Cloud implementation: match confidence trends, duplicate rate alerts, and consent flow audits. Our managed services team reviews these weekly and adjusts match rules as new source systems come in."
          },
          {
            question: "How much do Data Cloud services cost?",
            answer: "Cost depends on scope, source system count, and whether governance and managed services sit inside the engagement. An end-to-end implementation project starts at £30,000, with the cost going upwards with increasing complexity, scale, customisation, and integrations."
          }
        ]}
      />

      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}

      {/* 16. Footer CTA */}
      <CtaSection
        title="Transform Your Data Strategy Today"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
