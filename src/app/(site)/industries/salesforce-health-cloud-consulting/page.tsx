import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
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
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-health-cloud-consulting", {
    title: "Salesforce Health Cloud Consultant & Implementation Partner in the UK",
    description:
      "Certified Salesforce Health Cloud consultants in the UK. We connect Health Cloud to your EHR, telehealth, and clinical systems with UK GDPR and NHS DSPT-compliant configuration.",
    canonicalPath: "/industries/salesforce-health-cloud-consulting",
  });
}

export default async function SalesforceHealthCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-health-cloud-consulting"
  );

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section (with form) */}
      <SalesforceServiceHero
        badgeTitle="Certified"
        badgeSubtitle="Salesforce Partner in the UK"
        title="Patient Data Synced Across Your Systems With Salesforce Health Cloud"
        description="At ProvidusCRM, we configure Salesforce Health Cloud and connect it to your EHR, telehealth platform, and other clinical systems. Healthcare teams see clinical and non-clinical information, including medical history, social determinants of health, and care plan status, in one place."
        bullets={[
          "Certified Salesforce Health Cloud consultants",
          "EHR and clinical system integration that reduces manual re-entry",
          "UK GDPR and NHS DSPT-compliant configuration",
          "Ongoing support as care protocols and integrations evolve",
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
            Where Your Patient Data Is Getting Lost{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "A patient's clinical history lives in the EHR. Their insurance and billing details live in a separate system. Their social determinants of health and care plan notes live in a spreadsheet or the case manager's personal notes.",
          "None of it reconciles automatically into one view for the person actually coordinating their care. Front-desk staff, care coordinators, and clinicians each work from an incomplete picture and re-enter the same information across multiple touchpoints.",
          "Here are the issues and challenges healthcare teams face that Salesforce Health Cloud was built to solve:",
        ]}
      />

      {/* 4. Challenges (staggered cards) */}
      <ExpertiseChallengesSection
        items={[
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
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Health Cloud Solutions & Services We Offer"
        tabs={[
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
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Health Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Industry CTA */}
      <IndustryCtaSection
        title="Not sure if your current setup meets NHS DSPT and UK GDPR standards?"
        buttonLabel="Talk to a Consultant"
        buttonHref="/contact"
        image="/images/industries-pages/industry-cta-1.png"
      />

      {/* 8. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Beyond Health Cloud: Explore ProvidusCRM's Expertise Across The Salesforce Platform"
        items={[
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
        ]}
      />

      {/* 9. Organisation Types accordion */}
      <OrganisationTypesSection
        title="Types of Organisations We Build & Deliver Health Cloud Solutions For"
        items={[
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
        ]}
        images={[
          "/images/industries-pages/industy-types-1.png",
          "/images/industries-pages/industy-types-2.png",
        ]}
      />

      {/* 10. Salesforce / Certified Partner Section */}
      <ExpertiseSalesforceSection
        heading="Work With Certified, Experienced Salesforce Health Cloud Consultants in the UK"
        text="ProvidusCRM provides you access to a team of experts holding certifications across the Salesforce ecosystem and having delivered successful implementations and solutions across healthcare providers, insurance, home health, telehealth, and life sciences organisations. We have enabled our clients to seamlessly connect Health Cloud to their systems, tools, and workflows while ensuring UK GDPR and DSPT-compliant access rules."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 11. Certified Badges Marquee */}
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

      {/* 12. Why Choose Section */}
      <WhyChooseSection
        title="What Makes ProvidusCRM a Trusted Salesforce Health Cloud Partner"
        customReasons={[
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
        ]}
        image="/images/industries-pages/i-why-choose-health.jpg"
        backgroundOverlayColor="#616161"
      />

      {/* 13. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
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
        ]}
      />

      {/* 14. Footer CTA */}
      <CtaSection
        title="Ready to connect your patient data across every system?"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
