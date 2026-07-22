import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import {
  SalesforceServiceHero,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseChallengesSection,
  WhatWeDoSection,
  ServiceCaseStudiesSection,
  IndustryCtaSection,
  ExpertisePlatformsSection,
  OrganisationTypesSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata(
    "salesforce-financial-services-cloud-consulting",
    {
      title:
        "Salesforce Financial Services Cloud Consultant & Implementation Partner in the UK",
      description:
        "Certified Salesforce Financial Services Cloud consultants in the UK. We model households, financial accounts, and policies correctly and integrate with your core banking, portfolio, or policy systems.",
      canonicalPath:
        "/industries/salesforce-financial-services-cloud-consulting",
    }
  );
}

export default async function SalesforceFinancialServicesCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-financial-services-cloud-consulting"
  );

  const schema = {
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
  const jsonLd = await getSitePageJsonLd("salesforce-financial-services-cloud-consulting", schema);

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero Section (with form) */}
      <SalesforceServiceHero
        badgeTitle="Certified"
        badgeSubtitle="Salesforce Partner in the UK"
        title="One Household Record, Zero Disconnected Accounts"
        description="With ProvidusCRM, you get to work with certified consultants who configure Salesforce Financial Services Cloud around your actual client structure: households, financial accounts, assets, liabilities, and policies, connected to your core banking, portfolio, or policy administration systems."
        bullets={[
          "Certified Salesforce Financial Services Cloud consultants",
          "Household and financial account data modelled correctly",
          "Compliance and audit trail requirements built into the configuration",
          "Integration with the core banking, portfolio, or policy systems you already use",
        ]}
        formTitle="Fill a form today"
        formButtonLabel="Let's Connect"
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 3. Expertise Description */}
      <ExpertiseDescriptionSection
        heading={
          <>
            Where Financial Client Data Breaks Down{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "Here\u2019s a scenario: your client\u2019s spouse has a separate account, opened through a different channel or adviser. Nothing in the system connects the two records, so an adviser reviewing the client is looking at half the financial relationship.",
          "Meanwhile, the client\u2019s tax preparer, insurance broker, and adult children each hold pieces of the picture that never surface anywhere. The full household stays invisible to the person supposed to advise on it.",
          "Here are the challenges Financial Services Cloud\u2019s data model was built to solve:",
        ]}
      />

      {/* 4. Challenges (staggered cards) */}
      <ExpertiseChallengesSection
        items={[
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
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Financial Services Cloud Solutions & Services We Offer"
        tabs={[
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
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Financial Services) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Industry CTA */}
      <IndustryCtaSection
        title="Not sure if your current setup is seeing the household? Talk to a consultant."
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        image="/images/industries-pages/industry-cta-1.png"
      />

      {/* 8. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Our Salesforce Platform Expertise Beyond Financial Services Cloud"
        items={[
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
        ]}
      />

      {/* 9. Organisation Types accordion — "What Makes ProvidusCRM Stand Out" */}
      <OrganisationTypesSection
        title="What Makes ProvidusCRM Stand Out As A Salesforce Financial Services Cloud Partner"
        items={[
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
        ]}
        images={["/images/industries/in-finance-types.png"]}
      />

      {/* 12. Salesforce / Certified Partner Section */}
      <ExpertiseSalesforceSection
        heading="On-Demand, Certified Salesforce FSC Talent At Your Service"
        text="Our Salesforce talent boasts certifications and implementation expertise across the Salesforce ecosystem, not just Financial Services Cloud. We have delivered successful implementations and solutions across wealth management, retail and commercial banking, insurance, lending, and investment firm use cases and challenges."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 13. Certified Badges Marquee */}
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

      {/* 15. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
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
        ]}
      />

      {/* 16. Footer CTA */}
      <CtaSection
        title="Connect With Our Salesforce Financial Services Cloud Consultants Today!"
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
