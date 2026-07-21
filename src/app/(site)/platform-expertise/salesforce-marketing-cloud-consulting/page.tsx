import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import {
  HeroSection,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseChallengesSection,
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
  return generateStaticPageMetadata("salesforce-marketing-cloud-consulting", {
    title: "Salesforce Marketing Cloud Consulting | ProvidusCRM",
    description: "Salesforce Marketing Cloud Consulting Services",
    canonicalPath: "/platform-expertise/salesforce-marketing-cloud-consulting",
  });
}

export default async function SalesforceMarketingCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-marketing-cloud-consulting"
  );

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Make Every Campaign Convert With Salesforce Marketing Cloud{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Certified Salesforce Marketing Cloud Consultants"
        description="We're ProvidusCRM, your trusted Salesforce Marketing Cloud consulting and implementation partner, reinventing your marketing campaigns and workflows so every journey, email, and ad drives engagement and conversions consistently."
        image="/images/platform-expertise/pr-marketing-cloud-hero.webp"
        bullets={[
          "Certified Marketing Cloud consultants",
          "Journeys built on connected customer data",
          "Higher deliverability and tighter targeting",
          "GDPR-ready consent and preference management",
        ]}
        hideCta
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 3. Expertise Description */}
      <ExpertiseDescriptionSection
        heading={
          <>
            Marketing Cloud is Powerful. But Is Yours Working?{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "Marketing Cloud can run journeys, ads, and emails at scale, but only when the setup underneath is solid. Configured badly, campaigns miss the mark, and reports mislead. Set up properly, every message reaches the right person at the right moment for the right reason.",
        ]}
      />

      {/* 4. Challenges (staggered cards) — TODO: replace placeholder icons with real assets */}
      <ExpertiseChallengesSection
        items={[
          {
            title: "Fragmented\nCustomer Data",
            text: "Your website, CRM, ecommerce store, and support desk each hold a different version of the same customer. Therefore, journeys fire on stale data, subject lines feel generic, and unsubscribes climb. Without unified data underneath, Marketing Cloud runs on guesses rather than actual signals.",
            icon: "/images/platform-expertise/Mask group (1).webp",
          },
          {
            title: "Generic Marketing\nCommunications",
            text: "When every subscriber gets the same email at the same time, engagement drops and inboxes filter you out. Meanwhile, competitors send messages that match what customers actually want. Marketing Cloud can fix this, but only if segmentation and dynamic content are configured properly first.",
            icon: "/images/platform-expertise/Mask group (2).webp",
          },
          {
            title: "Unproven\nMarketing ROI",
            text: "Leadership keeps asking whether marketing spend actually drives revenue. If your reports cannot connect email opens to closed deals, or ad spend to pipeline, you cannot answer. Therefore, budgets get cut on gut feel rather than facts, and marketing loses the boardroom argument.",
            icon: "/images/platform-expertise/Mask group (3).webp",
          },
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Marketing Cloud Solutions & Services We Offer"
        tabs={[
          {
            id: "consulting",
            label: "Salesforce Marketing Cloud Consulting",
            content: {
              heading: "Salesforce Marketing Cloud Consulting",
              text: "Most Marketing Cloud problems start well before configuration. Someone chose the wrong edition, skipped data mapping, or bought Journey Builder without a use case for it. Our consulting engagement gets these decisions right the first time.\n\nOur Marketing Cloud consultants review your marketing stack, audience data, and channel mix, then recommend the right edition and studios for your goals. We plan the data flows into and out of Marketing Cloud carefully, map your first journeys, and set clear success metrics so you know what good looks like ninety days in.",
              bullets: [
                "Marketing Cloud edition and studio recommendations",
                "Data flow mapping across CRM, ecommerce, and web",
                "First journey design with clear success metrics",
                "Phased roadmap covering ninety days and beyond",
              ],
            },
          },
          {
            id: "implementation",
            label: "Salesforce Marketing Cloud Implementation",
            content: {
              heading: "Salesforce Marketing Cloud Implementation",
              text: "Marketing Cloud has many moving parts: Email Studio, Journey Builder, Mobile Studio, Advertising Studio, Content Builder, and Data Extensions all need to fit together. Our implementation service builds them into one working system.\n\nOur consultants configure your business units, sender authentication, data extensions, and preference centres. We build the first set of journeys around your priority use cases, connect Marketing Cloud to Sales Cloud or your CRM, and set up subscriber management that respects consent from day one. Every setup gets tested end to end before it goes live.",
              bullets: [
                "Business units, sender authentication, and data extensions configured",
                "First journeys built around priority use cases",
                "Marketing Cloud connected to Sales Cloud or your CRM",
                "End-to-end testing before every journey goes live",
              ],
            },
          },
          {
            id: "data-migration",
            label: "Data Migration, Management & Unification",
            content: {
              heading: "Data Migration, Management & Unification",
              text: "Marketing Cloud is only as good as the data flowing into it. Bring across a messy list, and you will send messy campaigns. Our Marketing Cloud consultants clean, structure, and connect your data before it touches a subscriber record.\n\nWe migrate your subscriber lists, campaign history, and consent records into Marketing Cloud accurately. Our team then sets up ongoing data flows from Sales Cloud, Data Cloud, ecommerce, or web analytics, so each customer profile updates as behaviour changes. We build de-duplication and validation rules into these flows, so quality holds up over time.",
              bullets: [
                "Subscriber, campaign, and consent history migrated accurately",
                "Ongoing data flows from CRM, ecommerce, and web sources",
                "De-duplication and validation rules built into every flow",
                "One connected view of the customer across every channel",
              ],
            },
          },
          {
            id: "automation",
            label: "AI-enabled Automation & Personalisation",
            content: {
              heading: "AI-enabled Automation & Personalisation",
              text: "Einstein and Agentforce turn Marketing Cloud into a system that adapts in the moment, rather than one that fires the same message at everyone. Our consultants set this up in a way you keep control of.\n\nWe configure Einstein Send Time Optimisation, Content Selection, and Copy Insights inside Marketing Cloud, so messages land at the right time with the right content per subscriber. Where suitable, we build Agentforce agents that handle marketing operations tasks like list checks, journey audits, and preference updates. Every AI feature runs on your rules, your data, and your brand voice.",
              bullets: [
                "Einstein Send Time Optimisation and Content Selection configured",
                "Copy Insights connected to your subject line performance",
                "Agentforce agents for marketing operations tasks",
                "AI features running on your rules and brand voice",
              ],
            },
          },
          {
            id: "analytics",
            label: "Marketing Campaign Analytics",
            content: {
              heading: "Marketing Campaign Analytics",
              text: "Marketing spend keeps getting harder to defend without proper measurement. Our consultants build the analytics layer that connects Marketing Cloud activity to pipeline, revenue, and retention, so your team stops guessing at ROI.\n\nWe configure Intelligence Reports, Datorama connections where relevant, and cross-channel attribution across email, ads, mobile, and web. Our team also builds executive dashboards that show marketing performance in the same language leadership uses in board meetings: pipeline created, deals closed, cost per acquisition, and customer lifetime value.",
              bullets: [
                "Intelligence Reports and cross-channel attribution set up properly",
                "Executive dashboards in the language leadership uses",
                "Pipeline, revenue, and CLV connected to campaign spend",
                "Reporting that stands up to boardroom questions",
              ],
            },
          },
          {
            id: "managed-services",
            label: "Managed Services",
            content: {
              heading: "Managed Services",
              text: "Marketing Cloud does not stand still. New releases arrive quarterly, deliverability rules keep tightening, and journeys break quietly when a data source changes. Our managed services keep your platform working through all of it.\n\nOur team monitors journey health, sender reputation, deliverability rates, and consent workflows week to week. We handle release updates carefully, test upcoming changes on a copy first, and adjust configurations as your marketing programme grows. Where your team needs execution help, our consultants build campaigns, journeys, or templates on request.",
              bullets: [
                "Ongoing monitoring of journeys, deliverability, and consent",
                "Careful handling of Salesforce release updates",
                "Campaign, journey, and template execution on request",
                "Continuous improvements as your programme grows",
              ],
            },
          },
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Marketing Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Expertise CTA — TODO: replace images with real assets */}
      <ExpertiseCtaSection
        title="Reach Out To ProvidusCRM's Salesforce Marketing Cloud Consultants To Discuss Your Initiatives And Challenges."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 8. Salesforce / Certified Partner Section — TODO: replace image with real asset */}
      <ExpertiseSalesforceSection
        heading="We're a Team of Certified Marketing Cloud Consultants & Implementation Experts"
        text="Our Marketing Cloud consultants hold Salesforce certifications and have delivered projects across the UK, USA, and GCC markets. We work across email, mobile, web, and advertising studios, and connect Marketing Cloud cleanly to Sales Cloud, Data Cloud, and third-party sources. Our team understands the full picture from data source to inbox to reporting, building journeys that resonate with your subscriber behaviour."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 9. Certified Badges Marquee */}
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

      {/* 10. Platforms Expertise — Explore Our Expertise Across The Salesforce Ecosystem */}
      <ExpertisePlatformsSection
        title="Explore Our Expertise Across The Salesforce Ecosystem"
        items={[
          {
            title: "Service Cloud",
            text: "We set up Service Cloud so support agents resolve cases faster and managers see the full picture of service performance. Our team configures case routing, escalation paths, and knowledge articles that reduce handling time.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Sales Cloud",
            text: "Our consultants configure Sales Cloud around how your sales team works day to day. We map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "Our Salesforce Revenue Cloud consultants configure CPQ so quoting stays fast and accurate as your business gets more complex. We set up product catalogues, price rules, discount governance, and approval flows.",
            icon: "/images/revenue-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "We build Experience Cloud portals for customers, partners, and employees that connect properly to your Salesforce data. Our certified experts configure sharing rules, page templates, and self-service flows carefully.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "We implement Data Cloud to pull web, transaction, and third-party data into one unified customer profile that updates continuously. This single source of truth makes every report, dashboard, and downstream Salesforce feature far more reliable.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Most AI tools answer questions and stop there. Agentforce goes further and actually automates tasks across your Salesforce processes. We build agents that handle qualifying, routing, and repetitive updates inside your workflows. Each agent runs on rules you set and data you control.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
        ]}
      />

      {/* 11. Expertise Implementation (Industries) — TODO: replace images with real assets */}
      <ExpertiseImplementationSection
        heading={<>Industries We Deliver Marketing Cloud Solutions For</>}
        items={[
          {
            title: "Non-Profit",
            text: "Fundraising campaigns need supporter data that connects donations, event attendance, and volunteering activity in one view. Our Non-Profit Cloud consultants implement NPC alongside Marketing Cloud so appeals reach the right supporters with the right ask, and stewardship messages actually feel personal rather than automated.",
            image: "/images/platform-expertise/non-profit.webp",
          },
          {
            title: "Retail & eCommerce",
            text: "Retail marketing needs joined-up product, order, and browsing data across every channel and store. We configure Commerce Cloud and connected tools so abandoned baskets, replenishment prompts, and loyalty offers reflect what shoppers actually did.",
            image: "/images/platform-expertise/commerce.webp",
          },
          {
            title: "Healthcare",
            text: "Patient communication is sensitive, and consent rules apply differently to marketing than to care. We set up Health Cloud alongside compliant messaging flows, so appointment reminders, wellness content, and outreach all respect the patient's preferences and the regulator's requirements.",
            image: "/images/platform-expertise/health.webp",
          },
          {
            title: "Education",
            text: "We implement Education Cloud to connect the student lifecycle with your marketing efforts, so admissions campaigns, term-time communications, and donation appeals each land with the right audience at the right time in their journey with the institution.",
            image: "/images/platform-expertise/education.webp",
          },
          {
            title: "Financial Services",
            text: "Banks, lenders, and wealth firms need marketing that respects households, product suitability, and regulatory rules on every message. We set up Financial Services Cloud so campaign audiences reflect financial context accurately, and disclosure requirements sit inside the journey design.",
            image: "/images/platform-expertise/finance.webp",
          },
          {
            title: "Manufacturing",
            text: "We implement Salesforce Manufacturing Cloud so account-based marketing, partner nurture programmes, and product launches each reach the right audience with content that reflects how they buy and use the products.",
            image: "/images/platform-expertise/manufacturing.webp",
          },
        ]}
      />

      {/* 12. Why Choose Section */}
      <WhyChooseSection
        title="What Makes ProvidusCRM The Perfect Choice For Marketing Cloud Consulting"
        customReasons={[
          {
            title: "Certified Marketing Cloud Consultants",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "Our consultants hold Marketing Cloud certifications and have delivered projects across email, mobile, and advertising studios. You get guidance from teams who have built journeys that pass compliance review, hold up at scale, and actually move the metrics leadership tracks each quarter.",
          },
          {
            title: "Refined Implementation Approach",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "We follow a structured approach from discovery through data setup, journey build, testing, and go-live. Each phase has defined outputs and quality gates before it closes. Therefore, your Marketing Cloud implementation moves forward predictably, with journeys that go live tested.",
          },
          {
            title: "Reliable, Ongoing Support",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "Our team stays involved long after launch, monitoring journey performance, deliverability, and consent workflows through every Salesforce release. We fix issues quickly and adjust configurations as your programme grows.",
          },
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 13. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "What does a Salesforce Marketing Cloud consultant do?",
            answer: "A Marketing Cloud consultant maps your marketing goals, data sources, and channel needs, then configures Marketing Cloud to align with them. They plan journeys, connect data, set up compliance, and train your team, so campaigns actually run properly rather than just look good on slides.",
          },
          {
            question: "What Salesforce Marketing Cloud solutions and services does ProvidusCRM offer in the UK?",
            answer: "Our Salesforce Marketing Cloud consultants in the UK offer services and solutions like consulting and strategy, implementation, development, data migration and unification, AI-enabled personalisation, campaign analytics, and managed services. We configure every solution around your marketing campaigns.",
          },
          {
            question: "What is the difference between a Salesforce Marketing Cloud consultant and an implementation partner?",
            answer: "A consultant advises on what Marketing Cloud should do and how to set it up. An implementation partner actually builds the configuration, journeys, and integrations for you. The best partners do both, so strategy and delivery never drift apart across the course of the project.",
          },
          {
            question: "What industries do your Salesforce Marketing Cloud consultants in the UK work with?",
            answer: "Our consultants work across nonprofit, retail and ecommerce, healthcare, education, financial services, and manufacturing sectors. We bring sector context to each Marketing Cloud project, so consent handling, message tone, and campaign timing fit how your industry actually communicates with its customers.",
          },
          {
            question: "How long does a Salesforce Marketing Cloud implementation take?",
            answer: "A well-executed Marketing Cloud implementation usually runs eight to sixteen weeks from kickoff to first live journey. Complex programmes with multiple business units, Data Cloud connections, or advertising studios take longer. Our consultants share a clear timeline after discovery.",
          },
          {
            question: "Does Salesforce Marketing Cloud integrate with Sales Cloud and other CRMs?",
            answer: "Yes. Our consultants connect Marketing Cloud with Sales Cloud through Marketing Cloud Connect and integrate with HubSpot, Dynamics 365, and other CRMs through APIs, middleware, or Data Cloud.",
          },
        ]}
      />

      {/* 14. Footer CTA */}
      <CtaSection
        title="Reach Out To Our Marketing Cloud Consultants"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
