import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
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
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-sales-cloud-consulting", {
    title: "Salesforce Sales Cloud Consulting | ProvidusCRM",
    description: "Salesforce Sales Cloud Consulting Services",
    canonicalPath: "/platform-expertise/salesforce-sales-cloud-consulting",
  });
}

export default async function SalesforceSalesCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-sales-cloud-consulting"
  );

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
        image="/images/platform-expertise/pe-cloud-hero.webp"
        bullets={[
          "Certified Sales Cloud consultants",
          "Setup matched to your sales process",
          "Clean pipeline data and accurate forecasts",
          "AI and Agentforce-ready solutions"
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
            icon: "/images/platform-expertise/Mask group (1).webp"
          },
          {
            title: "Unclear Sales Pipeline\nStructure",
            description: "When your stages and sales paths are vague or inconsistent, every rep ends up tracking deals slightly differently. Reports stop matching reality, forecasts slip from one week to the next, and your managers chase status updates instead of coaching the team properly to close.",
            icon: "/images/platform-expertise/Mask group (2).webp"
          },
          {
            title: "Manual\nAdministration",
            description: "Your sales reps spend hours each week updating fields, logging activities, and chasing approvals through email threads that nobody actually reads. Without proper automation, Sales Cloud becomes an admin tax on your team rather than a productivity boost.",
            icon: "/images/platform-expertise/Mask group (3).webp"
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

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Sales Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Expertise CTA */}
      <ExpertiseCtaSection
        title="Connect With Our Salesforce Sales Cloud Consultants To Discuss Your Challenges And Goals."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 8. Salesforce Section */}
      <ExpertiseSalesforceSection
        heading="We're a Certified Salesforce Sales Cloud Consulting & Implementation Partner"
        text="Our team holds numerous Salesforce certifications and has set up Sales Cloud in complex business environments. Our consultants know which approach fits your situation best, which to avoid carefully, and how to build an org that holds up well long after go-live."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 9. Certified Marque */}
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

      {/* 10. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Explore Our Expertise Across The Salesforce Ecosystem"
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
        heading={<>Industries We Impact</>}
        items={[
          {
            title: "Non-Profit",
            text: "Charities run on relationships rather than transactions, and standard CRMs rarely fit that operating reality well. Our consultants implement Nonprofit Cloud to handle donor records, gift processing, and grant tracking in one connected place, so your fundraising teams spend less time on admin and more on the mission.",
            image: "/images/platform-expertise/non-profit.webp"
          },
          {
            title: "Retail & eCommerce",
            text: "Online selling needs joined-up stock, pricing, and customer data across every channel and physical store. Our consultants configure Commerce Cloud and the connected tools around it so the buying experience matches what the rest of your business already knows about each individual customer.",
            image: "/images/platform-expertise/commerce.webp"
          },
          {
            title: "Healthcare",
            text: "Patient data is genuinely sensitive, and care coordination is complex across providers, settings, and time. Our consultants set up Health Cloud with consent tracking and access rules built in from the very start, so your clinical teams see one trusted record without ever compromising compliance.",
            image: "/images/platform-expertise/health.webp"
          },
          {
            title: "Education",
            text: "Students move from prospect to applicant to student to alumnus across systems that rarely talk to each other properly. Our consultants implement Education Cloud to connect that full lifecycle journey, so advisers, fundraisers, and faculty work from the same history without any gaps between departments.",
            image: "/images/platform-expertise/education.webp"
          },
          {
            title: "Financial Services",
            text: "Banks, lenders, and wealth firms need a CRM built around households and financial accounts rather than just individual contacts. Our consultants set up Financial Services Cloud with KYC workflows and compliance steps embedded inside the process, not bolted on as an afterthought later in the project.",
            image: "/images/platform-expertise/finance.webp"
          },
          {
            title: "Manufacturing",
            text: "Manufacturers plan against sales agreements and production capacity at the same time, and the two rarely sit together cleanly inside one system. Our consultants implement Manufacturing Cloud to connect commercial forecasts with operations data, so your teams forecast against what the business can actually deliver each month.",
            image: "/images/platform-expertise/manufacturing.webp"
          }
        ]}
      />

      {/* 12. Why Choose Section */}
      <WhyChooseSection
        title="Why Implement Salesforce Sales Cloud With ProvidusCRM"
        customReasons={[
          {
            title: "Certified, Experienced Teams",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "Our consultants hold Salesforce certifications and have delivered Sales Cloud projects across multiple industries and company sizes. You get guidance and expertise that only comes from complex, successful implementations."
          },
          {
            title: "Proven Implementation Process",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "We follow a structured process from initial discovery through configuration, testing, training, and final release into production. Each phase has clear ownership and defined outputs, so your project moves forward predictably from kickoff to go-live."
          },
          {
            title: "Long-Term Support After Go-Live",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "Our team stays close to your business after launch. We monitor the org, fix issues quickly when they appear, and adjust the setup as your business changes over time. Your Sales Cloud investment keeps paying off year after year."
          }
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 13. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "What does a Salesforce Sales Cloud consultant do?",
            answer: "A Salesforce Sales Cloud consultant maps how your sales team works today, and then configures Sales Cloud to match that process step by step. They handle setup, training, integrations, and the careful design choices that decide whether your team adopts the system properly or quietly avoids using it."
          },
          {
            question: "What Salesforce Sales Cloud solutions does ProvidusCRM offer in the UK?",
            answer: "Our Salesforce Sales Cloud consultants in the UK offer consulting, implementation, customisation, data migration, AI-enabled sales automation with Einstein and Agentforce, and analytics setup. We configure every solution around your sales process and team structure."
          },
          {
            question: "What Salesforce Sales Cloud services do you provide in the UK?",
            answer: "The Sales Cloud services we provide in the UK cover advisory, implementation, optimisation of existing orgs, integrations with your finance and marketing tools, ongoing managed services, user training, and post-go-live support across releases. We work with you across every stage of your Sales Cloud implementation lifecycle."
          },
          {
            question: "What does a Salesforce Sales Cloud Implementation Partner do?",
            answer: "A Salesforce Sales Cloud implementation partner takes you from licensing to deployment to user adoption. They configure objects, automation, reports, and integrations to fit your specific business, then train your team properly so user adoption holds up well after go-live and beyond the first review."
          },
          {
            question: "What is the difference between a Salesforce Sales Cloud consultant and an implementation partner?",
            answer: "A consultant advises on what Sales Cloud should do for you and how to design it properly. An implementation partner actually builds the configured system you need. ProvidusCRM does both well, so your strategy and the build never drift apart across the course of the project."
          },
          {
            question: "How long does a Salesforce Sales Cloud implementation take?",
            answer: "Sales Cloud implementation typically runs eight to sixteen weeks from kickoff to go-live, depending on scope and integrations involved. Larger, multi-region, or integration-heavy projects can take longer. Our consultants give you a realistic timeline after the discovery phase."
          },
          {
            question: "What industries do your Salesforce Sales Cloud consultants in the UK work with?",
            answer: "Our consultants work across nonprofit, retail and ecommerce, healthcare, education, financial services, and manufacturing sectors regularly. We bring sector context and relevant prior experience to each Sales Cloud project, so the configuration fits how your industry actually sells and serves its end customers."
          },
          {
            question: "How much do Salesforce Sales Cloud services cost in the UK?",
            answer: "Consulting and implementation costs depend on factors such as scope, integrations needed, licence counts, and the size of your sales team. Pricing starts at around £30,000 and goes upwards for complex multi-cloud projects with integrations. At ProvidusCRM, our consultants share a clear quote after discovery."
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
