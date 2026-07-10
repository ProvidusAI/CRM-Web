import type { Metadata } from "next";
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
  DataCloudVsWarehouseSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Salesforce Data Cloud Consulting | ProvidusCRM",
  description: "Salesforce Data Cloud Consulting Services",
};

export default function SalesforceDataCloudConsultingPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Salesforce Data Cloud Consulting{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="& Implementation Partner"
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
            icon: "/images/platform-expertise/Mask group (1).png"
          },
          {
            title: "Unclear Sales\nPipeline Structure",
            description: "The same customer sits in your systems three times, sometimes five. Each duplicate carries partial history and partial preferences. So your reports overcount, your marketing sends the same email twice with different subject lines, and your customer notices the amateur hour.",
            icon: "/images/platform-expertise/Mask group (2).png"
          },
          {
            title: "Manual\nAdministration",
            description: "Einstein and Agentforce run on the data you give them. Feed them fragmented records, and they generate confident nonsense your team quickly learns to ignore. The result? Your AI investment stalls, not because the technology fails, but because the underlying data quietly undermines it.",
            icon: "/images/platform-expertise/Mask group (3).png"
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
          "/images/certified-badges/1.png",
          "/images/certified-badges/2.png",
          "/images/certified-badges/3.png",
          "/images/certified-badges/4.png",
          "/images/certified-badges/5.png",
          "/images/certified-badges/6.png",
          "/images/certified-badges/7.png",
          "/images/certified-badges/8.png",
          "/images/certified-badges/9.png",
          "/images/certified-badges/10.png",
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

      {/* 8. Case Studies (First 4 fallback) */}
      <ServiceCaseStudiesSection
        caseStudies={[
          {
            title: "Global Manufacturing Firm Transforms Data",
            slug: "global-manufacturing-firm",
            image: "/images/platform-expertise/0882dc9511818687452216a90ddac20a710efcf0.png",
            label: "Data Cloud",
            category: "Manufacturing",
          },
          {
            title: "Financial Services Provider Increases Win Rates by 30%",
            slug: "financial-services-provider",
            image: "/images/platform-expertise/0d003666468f3b3b463f19926696c6228525fc0c.png",
            label: "Data Cloud",
            category: "Financial Services",
          },
          {
            title: "Retail Brand Achieves 360-Degree Customer View",
            slug: "retail-brand-360",
            image: "/images/platform-expertise/40de88188cc45b6c279db8314135b88f97be49f0.png",
            label: "Data Cloud",
            category: "Retail",
          },
          {
            title: "Tech Startup Automates Lead Routing",
            slug: "tech-startup-lead-routing",
            image: "/images/platform-expertise/7280b567b367bac0947be408373273e6553327eb.png",
            label: "Data Cloud",
            category: "Technology",
          }
        ]}
      />

      {/* 9. Expertise CTA */}
      <ExpertiseCtaSection
        title="Still struggling to have a single source of truth for your customer data? Reach out to our team today!"
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.png"
        image2="/images/platform-expertise/expertise-cta-2.png"
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
            title: "Data Cloud",
            text: "Our consultants implement Data Cloud to pull web, transaction, and third-party data sources into one unified customer profile that updates in real time.",
            icon: "/images/data-cloud.webp",
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
      <DataCloudVsWarehouseSection />

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
            image: "/images/platform-expertise/non-profit.png"
          },
          {
            title: "Retail & eCommerce",
            text: "Retail customers move across mobile, desktop, in-store, and support in a single week. Our consultants configure Data Cloud and align it with Commerce Cloud to resolve these signals against a unified profile in real time, so loyalty attributes and browsing behaviour sit under one identity.",
            image: "/images/platform-expertise/commerce.png"
          },
          {
            title: "Healthcare",
            text: "Patient identity resolution carries higher stakes than any other sector. Our consultants configure Data Cloud alongside Health Cloud with match rules that respect patient identifiers and consent scopes, treating identity accuracy as a compliance obligation rather than a marketing optimisation.",
            image: "/images/platform-expertise/health.png"
          },
          {
            title: "Education",
            text: "Students, applicants, alumni, and donors sit inside education data. Our consultants implement Data Cloud alongside Education Cloud to connect that lifecycle, so recruitment and advancement teams work from the same view without gaps between departments.",
            image: "/images/platform-expertise/education.png"
          },
          {
            title: "Financial Services",
            text: "Banks, lenders, and wealth firms need household matching under regulatory constraints. Our consultants configure Data Cloud match and household rules that reflect these relationships accurately, while keeping KYC and consent boundaries intact for compliance teams.",
            image: "/images/platform-expertise/finance.png"
          },
          {
            title: "Manufacturing",
            text: "Manufacturers hold customer data across sales, distributors, service, and IoT signals from installed products. Our consultants implement Data Cloud alongside Manufacturing Cloud to unify these signals, so account teams work from a full picture rather than fragments.",
            image: "/images/platform-expertise/manufacturing.png"
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
