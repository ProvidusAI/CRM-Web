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
  reasons as whyChooseReasonsFallback,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Salesforce Sales Cloud Consulting | ProvidusCRM",
  description: "Salesforce Sales Cloud Consulting Services",
};

export default function SalesforceSalesCloudConsultingPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Get More Out Of Salesforce Sales Cloud{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Salesforce Sales Cloud Consulting & Implementation"
        description="Partner with ProvidusCRM's certified consultants to set up Sales Cloud around how your sales team functions and plans to grow. Sell more and forecast better with our end-to-end Sales Cloud consulting and implementation services."
        image="/images/platform-expertise/pe-cloud-hero.png"
        bullets={[
          "Certified Sales Cloud consultants",
          "Setup matched to your sales process",
          "Clean pipeline data and accurate forecasts",
          "AI and Agentforce ready solutions"
        ]}
        hideCta
      />

      {/* 2. Trusted Section */}
      <PartnersSection />

      {/* 3. Expertise Description */}
      <ExpertiseDescriptionSection
        heading={
          <>
            You Invested in Sales Cloud, But Was It Worth It?{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "Sales Cloud can do wonders for your sales workflows and campaigns. It's genuinely powerful and packed with valuable features. But it'll only deliver value for your business if it's setup the way your sales teams work everyday.",
          "Implemented poorly, and you're looking at a system you paid an expensive licensing fee for but is just slowing down your sales reps and frustrating managers and stakeholders.",
          "Implemented right with ProvidusCRM, it not only pays back its dividends, but completely redefines your sales processes."
        ]}
      />

      {/* 4. Expertise Features */}
      <ExpertiseFeaturesSection
        features={[
          {
            title: "Messy,\nDuplicated Data",
            description: "Duplicate accounts, half-finished records, and contacts spread across different touchpoints ruin forecast efficiency. Your sales reps stop trusting the system within weeks of go-live. Investing in Sales Cloud stops making sense when your team ultimately goes back to spreadsheets and your underlying data quality only gets worse.",
            icon: "/images/platform-expertise/Mask group (1).png"
          },
          {
            title: "Unclear Sales Pipeline\nStructure",
            description: "When your stages and sales paths are vague or inconsistent, every rep ends up tracking deals slightly differently. Reports stop matching reality, forecasts slip from one week to the next, and your managers chase status updates instead of coaching the team properly to close.",
            icon: "/images/platform-expertise/Mask group (2).png"
          },
          {
            title: "Manual\nAdministration",
            description: "Your sales reps spend hours each week updating fields, logging activities, and chasing approvals through email threads that nobody actually reads. Without proper automation, Sales Cloud becomes an admin tax on your team rather than a productivity boost.",
            icon: "/images/platform-expertise/Mask group (3).png"
          }
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Our Sales Cloud Services"
        tabs={[
          {
            id: "implementation",
            label: "Implementation",
            content: {
              heading: "Sales Cloud Implementation",
              text: "We configure Sales Cloud to match your exact business requirements from day one.",
              bullets: ["Requirement Gathering", "Data Migration", "Custom Configuration"]
            }
          },
          {
            id: "optimization",
            label: "Optimization",
            content: {
              heading: "Org Optimization & Audit",
              text: "We review your existing setup and restructure it for better performance and adoption.",
              bullets: ["Health Checks", "Code Refactoring", "Process Improvement"]
            }
          }
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Case Studies (First 4 fallback) */}
      <ServiceCaseStudiesSection
        caseStudies={[
          {
            title: "Global Manufacturing Firm Transforms Sales Cycle",
            slug: "global-manufacturing-firm",
            image: "/images/platform-expertise/0882dc9511818687452216a90ddac20a710efcf0.png",
            label: "Sales Cloud",
            category: "Manufacturing",
          },
          {
            title: "Financial Services Provider Increases Win Rates by 30%",
            slug: "financial-services-provider",
            image: "/images/platform-expertise/0d003666468f3b3b463f19926696c6228525fc0c.png",
            label: "Sales Cloud",
            category: "Financial Services",
          },
          {
            title: "Retail Brand Achieves 360-Degree Customer View",
            slug: "retail-brand-360",
            image: "/images/platform-expertise/40de88188cc45b6c279db8314135b88f97be49f0.png",
            label: "Sales Cloud",
            category: "Retail",
          },
          {
            title: "Tech Startup Automates Lead Routing",
            slug: "tech-startup-lead-routing",
            image: "/images/platform-expertise/7280b567b367bac0947be408373273e6553327eb.png",
            label: "Sales Cloud",
            category: "Technology",
          }
        ]}
      />

      {/* 7. Expertise CTA */}
      <ExpertiseCtaSection
        title="Connect With Our Salesforce Consultants To Discuss Your CRM Needs And Business Goals."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.png"
        image2="/images/platform-expertise/expertise-cta-2.png"
      />

      {/* 8. Salesforce Section */}
      <ExpertiseSalesforceSection
        heading="Salesforce Consulting Services That Secure Your CRM Investments"
        text="ProvidusCRM is a certified Salesforce consulting partner, helping organizations in the UK drive operational efficiency, reduce costs, and integrate their CRM systems securely and reliably with other tools and platforms. Every project we work on involves our experienced, certified teams and their relentless efforts towards meeting your specific needs and goals, enabling you to derive maximum value from your Salesforce investments."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 9. Certified Marque */}
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

      {/* 10. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Our End-to-End Salesforce Platform Expertise"
        items={[
          {
            title: "Service Cloud",
            text: "Transform customer service with structured queues, automated routing, and a 360-degree customer history on every ticket. We implement robust Service Cloud configurations around actual support processes, reducing resolution times and giving agents the context they need to help clients on their first touch.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-up tasks without human input. At ProvidusCRM, we configure Agentforce to act securely within existing Salesforce workflows so AI operates within your real business rules.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Create personalised, cross-channel customer journeys that deliver the right message at the right time. We configure Marketing Cloud to align your marketing and sales efforts, driving engagement and maximizing ROI across email, mobile, social, and web.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "Streamline your quote-to-cash process and accelerate revenue growth. We implement Revenue Cloud to automate pricing, quoting, and billing, giving your sales team the tools they need to close complex deals faster and more accurately.",
            icon: "/images/revenue-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          }
        ]}
      />

      {/* 11. Expertise Implementation */}
      <ExpertiseImplementationSection
        heading={
          <>
            How We Implement<br />Salesforce Across Industries
          </>
        }
        items={[
          {
            title: "Non-Profit Cloud",
            text: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day.",
            image: "/images/platform-expertise/non-profit.png"
          },
          {
            title: "Education Cloud",
            text: "Universities, colleges, and training providers manage thousands of relationships across recruitment, admissions, student success, and alumni engagement. Our Education Cloud specialists connect every stage of the student lifecycle in one platform. Recruitment pipelines, application tracking, student case management, and alumni fundraising all run from the same data, so no department works in isolation, and no student record falls through the gaps.",
            image: "/images/platform-expertise/education.png"
          },
          {
            title: "Commerce Cloud",
            text: "Selling online gets complicated fast. Product catalogues grow, pricing rules multiply, and customers expect the same experience across every channel. Our Commerce Cloud consultants build B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. Inventory visibility, pricing logic, checkout flows, and post-purchase journeys all live inside one platform, so the commerce experience matches what the rest of the business already knows about the customer.",
            image: "/images/platform-expertise/commerce.png"
          },
          {
            title: "Health Cloud",
            text: "Patient data is sensitive, care coordination is complex, and compliance is not optional. Our Health Cloud implementation experts give healthcare providers a complete view of every patient across referrals, appointments, care plans, and follow-ups. Clinical and non-clinical teams work from the same record, consent tracking is built into every workflow, and reporting meets regulatory standards. Better care coordination with less administrative overhead.",
            image: "/images/platform-expertise/health.png"
          },
          {
            title: "Financial Services Cloud",
            text: "Banks, lenders, wealth managers, and fintechs need CRM that understands financial relationships, not just contacts and opportunities. Our Financial Services Cloud consultants set up client household management, financial account tracking, compliance workflow automation, and full advisor dashboards. KYC processes, referral tracking, and pipeline management all operate within a platform built specifically for how financial services teams work and what regulators expect.",
            image: "/images/platform-expertise/finance.png"
          },
          {
            title: "Manufacturing Cloud",
            text: "Manufacturers deal with long sales cycles, complex account hierarchies, and forecasting that depends on both sales agreements and actual production capacity. Our Manufacturing Cloud specialists connect sales forecasts with operations data, manage account-based agreements, and give commercial teams accurate visibility into run-rate business and new opportunities. Rebate management, partner collaboration, and demand planning all run from one system instead of five disconnected spreadsheets.",
            image: "/images/platform-expertise/manufacturing.png"
          }
        ]}
      />

      {/* 12. Why Choose Section */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM for Sales Cloud?"
        customReasons={whyChooseReasonsFallback}
        image="/images/platform-expertise/expertise-choose.png"
        backgroundOverlayColor="#616161"
      />

      {/* 13. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How long does a typical Sales Cloud implementation take?",
            answer: "A standard implementation usually takes between 4 to 8 weeks, depending on the complexity of your processes, the amount of data to migrate, and any custom integrations required."
          },
          {
            question: "Do you provide user training after implementation?",
            answer: "Yes, we offer comprehensive, role-based training sessions for your sales reps, managers, and system administrators to ensure smooth adoption."
          },
          {
            question: "Can Sales Cloud integrate with our existing ERP?",
            answer: "Absolutely. Salesforce has robust APIs, and our team has extensive experience integrating Sales Cloud with various ERPs like NetSuite, SAP, and Microsoft Dynamics."
          }
        ]}
      />

      {/* 14. Footer CTA */}
      <CtaSection
        title="Transform Your Sales Process Today"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
