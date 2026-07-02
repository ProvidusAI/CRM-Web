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
        title="Salesforce Sales Cloud Solutions & Services We Offer"
        tabs={[
          {
            id: "consulting",
            label: "Salesforce Sales Cloud Consulting",
            content: {
              heading: "Salesforce Sales Cloud Consulting",
              text: "Sales Cloud setups often go off the rails quickly when nobody inside the business agrees on what the platform should actually do. Our Salesforce consulting service settles that question properly at the very start, before any configuration begins or any licence costs start running.\n\nOur Salesforce Sales Cloud consultants work with your sales, operations, and IT teams to map how deals genuinely flow today, including the quiet workarounds people have built up over the years. We then decide which Sales Cloud features fit your situation, which licences make sense, what to build first, and what to deploy later.",
              bullets: [
                "Discovery sessions with sales, ops, and leadership",
                "Licence and feature recommendations that fit your budget",
                "A phased roadmap with timelines and priorities",
                "Defined scope, so costs stay predictable from day one"
              ]
            }
          },
          {
            id: "implementation",
            label: "Salesforce Sales Cloud Implementation",
            content: {
              heading: "Salesforce Sales Cloud Implementation",
              text: "Salesforce Sales Cloud implementation goes way beyond basic setup. It’s about customising and configuring Sales Cloud around your processes so your sales team genuinely wants to use it from day one, rather than quietly going back to the spreadsheets.\n\nOur certified consultants configure Sales Cloud end to end, covering lead capture, lead routing, opportunity stages, sales paths, and the approvals and validations that keep records clean over time.\n\nWe build dashboards to train your sales reps effectively and create AI-enabled workflows to improve operational efficiency.",
              bullets: [
                "Sales path, stages, and opportunity Kanban configured properly",
                "Lead routing and auto-assignment that match your team structure",
                "Approval flows and validation rules to keep records clean",
                "Salesforce mobile setup for sales teams working in the field"
              ]
            }
          },
          {
            id: "data-migration",
            label: "Data Migration & Management",
            content: {
              heading: "Data Migration & Management",
              text: "Moving years of accounts, contacts, opportunities, and history to Salesforce Sales Cloud can be a rather risky hassle. You can’t afford to lose your data during migration nor can you risk user adoption.\n\nOur consultants migrate your records carefully, mapping each field to the correct Sales Cloud object and cleaning out duplicates as we move data across.\n\nWe also set up de-duplication rules, validation rules, and ongoing data hygiene processes that keep your records accurate well after go-live.",
              bullets: [
                "Accurate field mapping from your old CRM into Sales Cloud",
                "De-duplication during the move and ongoing afterwards",
                "Validation rules to keep records clean over time",
                "Data hygiene processes built into daily workflows"
              ]
            }
          },
          {
            id: "automation",
            label: "AI-enabled Sales Automation",
            content: {
              heading: "AI-enabled Sales Automation",
              text: "Clean data and clear rules are crucial for accurate AI automation. Integrate AI into a messy org, and you’ll be working with hallucinations.\n\nWe configure Agentforce Sales Cloud and Einstein AI on top of a properly structured org. Einstein scores leads based on real signals and predicts which deals are most likely to close inside the quarter.\n\nAgentforce handles qualifying, follow-ups, and the routine record updates that drain rep time across the working week. Each agent runs on your rules and your data, so you stay in full control of what it does and does not do.",
              bullets: [
                "Einstein lead scoring and opportunity insights set up properly",
                "Agentforce configured around your sales rules",
                "Automation built on clean, structured data",
                "AI that frees reps to sell, not just answer prompts"
              ]
            }
          },
          {
            id: "analytics",
            label: "Sales Analytics & Reporting",
            content: {
              heading: "Sales Analytics & Reporting",
              text: "Your sales team and stakeholders must have complete visibility into your workflows and campaigns. Our consultants build the reporting layer Sales Cloud should genuinely deliver out of the box, but rarely does without proper setup\n\nWe design custom report types, dashboards, and forecasting views around the real questions your leaders ask in meetings: pipeline by stage, win rates by source, rep performance over time, deal velocity, and forecast accuracy across the quarter.\n\nWe then layer in CRM Analytics where deeper analysis is genuinely needed for the business, rather than just for show or to fill slides.",
              bullets: [
                "Custom report types built around your real KPIs",
                "Dashboards for reps, managers, and leadership",
                "Forecasting views that match how you actually forecast",
                "CRM Analytics where deeper insight is needed"
              ]
            }
          },
          {
            id: "managed-services",
            label: "Managed Services",
            content: {
              heading: "Managed Services",
              text: "A Sales Cloud org needs ongoing support, maintenance, and upgrades. Without that, technical debt builds up quietly in the background, automations break in unexpected ways, and the system slowly drifts away from how your team actually works today.\n\nOur managed services for Sales Cloud help keep your org healthy over the course of time. We handle releases, monitor automation, fix issues quickly when they appear, and tune the setup as your sales process evolves with the business.\n\nWith each Salesforce platform release, our team checks what is changing and makes sure nothing important breaks for your users during the update window or in the days after it.",
              bullets: [
                "Ongoing admin, support, and configuration changes",
                "Release management aligned to Salesforce updates",
                "Proactive monitoring and quick issue resolution",
                "Continuous improvements as your business evolves"
              ]
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
            text: "Our consultants set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance. We configure case routing, escalation rules, and consoles your support teams genuinely want to use day after day, not just in the first week after launch.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data. We configure sharing and access rules carefully so each user sees only what they should, with self-service that genuinely works without raising support tickets every time.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "Our consultants implement Data Cloud to pull web, transaction, and third-party data sources into one unified customer profile that updates in real time. That single view then makes every other cloud, report, dashboard, and AI feature you run on top of it far more reliable and useful.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Most AI tools answer questions and stop there. Agentforce agents go further and actually do the work. Our consultants build agents that qualify leads, route cases, and complete routine tasks inside your workflows. Each agent runs on rules you control and data you genuinely trust.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting all connect properly to your CRM data. We build campaigns that target the right people at the right time, track real engagement across every channel, and tie back cleanly to revenue rather than vanity metrics.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "Our consultants configure Revenue Cloud and CPQ so quotes stay fast and accurate, even as your product catalogue and business grow more complex over time. Discounts follow clear, agreed rules, contracts move smoothly through approvals, and revenue logic holds clean from quote to cash.",
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
