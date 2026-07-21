import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import {
  HeroSection,
  PartnersSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  ExpertiseCtaSection,
  ExpertisePlatformsSection,
  ExpertiseImplementationSection,
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-service-cloud-consulting", {
    title: "Salesforce Service Cloud Consulting | ProvidusCRM",
    description: "Salesforce Service Cloud Consulting Services",
    canonicalPath: "/platform-expertise/salesforce-service-cloud-consulting",
  });
}

export default async function SalesforceServiceCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-service-cloud-consulting"
  );

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Route Cases Correctly.
            <br />
            Report On Them Honestly.{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Salesforce Service Cloud Consulting & Implementation"
        description="At ProvidusCRM, we leverage our extensive Salesforce Service Cloud expertise to configure and optimise case routing, the agent console, and reporting so cases reach the right agent and metrics reflect what really happened."
        image="/images/platform-expertise/pr-service-cloud-hero.webp"
        bullets={[
          "Certified Salesforce Service Cloud consultants",
          "Routing rules matched to the real case volume and channel mix",
          "Reporting that reflects actual resolutions",
          "Ongoing monitoring so routing and reporting stay aligned",
        ]}
        hideCta
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 3. Salesforce / Certified Partner Section — TODO: replace image with real asset */}
      <ExpertiseSalesforceSection
        heading="Certified Salesforce Service Cloud Expertise You Can't Go Wrong With"
        text="Our diverse team of Salesforce experts hold certifications and have experience working on projects across the Salesforce ecosystem, including Salesforce Service Cloud. We have delivered case management, omnichannel routing, and reporting rebuilds across the UK, USA, and GCC markets."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 4. Certified Badges Marquee */}
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

      {/* 5. Case Studies (Our Success Stories) — selected in Sanity ("Page case studies" → Service Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 6. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Service Cloud Services & Solutions We Offer"
        tabs={[
          {
            id: "case-routing",
            label: "Case Routing & Omnichannel Setup",
            content: {
              heading: "Case Routing & Omnichannel Setup",
              text: "Getting cases to the right agent, on the right channel, the first time. Our consultants build routing as one engine with shared context across chat, social, voice, and email, rather than five separate queues that happen to share a login screen.\n\nWe configure skills-based assignment, AI-assisted routing where it fits, and SLA-driven escalation rules that reflect how your team actually structures its shifts. Case queues get rebuilt around your real team structure, not the template that came with the sandbox.",
              bullets: [
                "Skills-based and AI-assisted case assignment",
                "True omnichannel routing across chat, voice, email, and social",
                "SLA automation and escalation rules matched to your shifts",
                "Case queues rebuilt around your real team structure",
              ],
            },
          },
          {
            id: "agent-experience",
            label: "Agent Experience",
            content: {
              heading: "Agent Experience",
              text: "A console that helps agents resolve faster, rather than one they fight against every day. Our consultants configure the Service Console around the workflows your team actually follows, not the demo layout from the sales cycle.\n\nWe set up macros, quick actions, and case templates for the case types your team handles most often. Knowledge articles get connected to those case types so agents surface answers without leaving the console. Where field service applies, we configure the mobile app for engineers working away from the desk.",
              bullets: [
                "Service Console configured for your actual workflows",
                "Knowledge base tied to your most common case types",
                "Macros, quick actions, and case templates that save agent clicks",
                "Field service and mobile setup, where relevant",
              ],
            },
          },
          {
            id: "automation-ai",
            label: "Automation & AI",
            content: {
              heading: "Automation & AI",
              text: "Automation only works when it runs on clean data and clear rules. Bolt AI onto messy case records and it produces confident nonsense that agents quickly learn to ignore. Our consultants prepare the ground first, then add the intelligence on top.\n\nWe configure Einstein bots and predictive case routing so they solve a specific problem, and build Agentforce agents that handle triage, follow-ups, and status updates inside your service rules. Every automation gets validated against actual case outcomes before it rolls out, so you know it works before your customers do.",
              bullets: [
                "Einstein bots and predictive case routing are configured properly",
                "Agentforce agents are built around your service rules",
                "Automated triage and suggested responses for common patterns",
                "Automation validated against actual case outcomes before rollout",
              ],
            },
          },
          {
            id: "self-service",
            label: "Self-Service & Honest Deflection",
            content: {
              heading: "Self-Service & Honest Deflection",
              text: "Self-service that reduces load on your team, measured against confirmed resolution rather than article impressions. Our consultants build the portal, knowledge base, and community setup so customers can actually solve their own problems.\n\nWe configure knowledge structures around the questions customers actually ask, set up self-service portals with case submission and status tracking, and connect communities where partner or peer support genuinely helps. Deflection tracking then measures whether the customer came back with the same case, not whether they viewed the page.",
              bullets: [
                "Knowledge base and self-service portal setup",
                "Customer and partner community configuration",
                "Deflection tracked against confirmed resolution",
                "Case submission and status tracking for customers",
              ],
            },
          },
          {
            id: "ongoing-optimisation",
            label: "Ongoing Optimisation",
            content: {
              heading: "Ongoing Optimisation",
              text: "Most engagements start by identifying the specific breakdown affecting your team, rather than running a generic health check. Routing accuracy, reporting definitions, automation trust, or console usability each have their own diagnostic path.\n\nOur team runs quarterly reviews of routing rules and reporting accuracy, handles Salesforce release updates carefully, and adjusts the setup as your case volume, channels, and team structure change. As new problems surface, we prioritise them alongside you rather than adding them to a queue.",
              bullets: [
                "Quarterly reviews of routing rules and reporting accuracy",
                "Release management aligned to Salesforce updates",
                "Proactive monitoring and quick issue resolution",
                "Continuous improvement as case volume and channels grow",
              ],
            },
          },
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 7. Expertise CTA — TODO: replace images with real assets */}
      <ExpertiseCtaSection
        title="Reinvent Your Support Workflows With Our Salesforce Service Cloud Consultants."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 8. Platforms Expertise — Our Expertise Beyond Salesforce Service Cloud */}
      <ExpertisePlatformsSection
        title="Our Expertise Beyond Salesforce Service Cloud"
        items={[
          {
            title: "Sales Cloud",
            text: "We configure Salesforce Sales Cloud around your day to day workflows. This helps your sales reps sell more and improve customer retention. Our team maps lead routing, opportunity stages, and forecasting views to your sales process.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Our consultants implement Marketing Cloud so journeys, data extensions, and reporting connect properly to your CRM data. We build campaigns that target the right people and tie back cleanly to revenue instead of vanity metrics.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "Make quoting faster and more accurate as your business grows with our Salesforce CPQ and Revenue Cloud consultants. Discounts follow clear rules, contracts move smoothly through approvals, and revenue logic holds from quote to cash.",
            icon: "/images/revenue-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Our consultants build Experience Cloud portals for customers, partners, and employees that connect properly to your underlying Salesforce data. We configure sharing rules and self-service flows so each user type sees only what they should.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "We configure Salesforce Data Cloud to unify customer records across your CRM, website, transactions, and support tools. As a result, your service and marketing teams work from one accurate profile rather than five conflicting ones.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Drive agentic AI automation across your Salesforce org with Salesforce. We set up and configure agents to perform tasks across your service processes. They qualify, route, and complete tasks inside your workflows, running on rules and data you control.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
        ]}
      />

      {/* 9. Expertise Implementation (Industries) — TODO: replace images with real assets */}
      <ExpertiseImplementationSection
        heading={<>Industries We Impact</>}
        items={[
          {
            title: "Non-Profit",
            text: "Manage consequent support and service delivery with our Salesforce Service Cloud and Nonprofit Cloud consultants. We replace siloed spreadsheets with a 360-degree stakeholder view, enabling organizations to resolve issues faster and operate more efficiently.",
            image: "/images/platform-expertise/non-profit.webp",
          },
          {
            title: "Retail & eCommerce",
            text: "During peak seasons, your support tickets rise with your sales. Case volume can quadruple in a week, then returns season starts the day the holiday shopping stops. We build routing that scales with seasonal patterns, self-service flows that handle common promotional queries without an agent, and reporting that shows where the queue actually is during peak.",
            image: "/images/platform-expertise/commerce.webp",
          },
          {
            title: "Financial Services",
            text: "Case handling in banking and insurance needs a clear audit trail. Regulators want to see who touched a case, what they decided, and why. We configure case handling with complete audit trails, escalation paths that meet regulatory requirements, and reporting that satisfies both operations managers and compliance teams.",
            image: "/images/platform-expertise/finance.webp",
          },
          {
            title: "Manufacturing",
            text: "Manufacturers rarely support end customers directly. Cases usually flow through dealers, distributors, and service partners, each with their own SLA expectations and their own view of what \"resolved\" means. Our consultants configure Service Cloud with partner community access, cross-network case visibility, and reporting that shows where cases sit across the whole distribution chain.",
            image: "/images/platform-expertise/manufacturing.webp",
          },
        ]}
      />

      {/* 10. Why Choose Section — NOTE: PDF said "Experience Cloud" (copy-paste slip); corrected to Service Cloud */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Service Cloud Partner?"
        customReasons={[
          {
            title: "Certified Expertise. Single POC",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "We equip you with talent certified across the Salesforce ecosystem, not just Service Cloud. Our Service Cloud consultant leads your project from kick-off to go-live. We understand your team, culture, workflows, decisions, and goals.",
          },
          {
            title: "Weekly Standups & Updates",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "Our consultant provides you with an update regarding your project, our deliverables, progress, challenges, and key decisions. After every phase, we provide you with a detailed project summary to update all your stakeholders regarding project status.",
          },
          {
            title: "Post-Launch Support & Growth Plan",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "We schedule org reviews after regular intervals after go-live, with an end-to-end action plan. Support does not disappear when the contract ends. Your Service Cloud setup keeps improving because someone is watching it.",
          },
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 11. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
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
        ]}
      />

      {/* 12. Footer CTA — reused the Expertise CTA line (no dedicated footer copy in the PDF) */}
      <CtaSection
        title="Reinvent Your Support Workflows With ProvidusCRM"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
