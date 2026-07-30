import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import {
  HeroSection,
  PartnersSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  ExplainerCardsSection,
  ExpertiseCtaSection,
  WhyChooseSection,
  ServiceBenefitsSection,
  ExpertisePlatformsSection,
  ExpertiseImplementationSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-agentforce-consulting", {
    title: "Salesforce Agentforce Consulting | ProvidusCRM",
    description: "Salesforce Agentforce Consulting Services",
    canonicalPath: "/platform-expertise/salesforce-agentforce-consulting",
  });
}

export default async function SalesforceAgentforceConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-agentforce-consulting"
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Salesforce Agentforce Consulting | ProvidusCRM",
    "description": "Salesforce Agentforce Consulting Services",
    "url": "https://providuscrm.co.uk/platform-expertise/salesforce-agentforce-consulting",
    "provider": {
      "@type": "Organization",
      "name": "ProvidusCRM",
      "url": "https://providuscrm.co.uk",
      "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd(
    "salesforce-agentforce-consulting",
    schema
  );

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Automate Your Workflows With Agentforce.
            <br />
            Scale ROI With Salesforce & ProvidusCRM{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Agentforce Consulting & Implementation"
        subtitleAsH1
        description="Work with certified Agentforce specialists to configure agents that handle tasks like case resolution, lead qualification, and appointment scheduling using your Salesforce data. We set clear rules about what the agents can and cannot do on their own."
        image="/images/platform-expertise/agentforce-hero.webp"
        bullets={[
          "Certified Salesforce Agentforce specialists",
          "Agents built around one clearly defined task at a time",
          "Human escalation built in for anything outside the rules",
          "Start with a working pilot",
        ]}
        hideCta
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 3. Case Studies (Our Success Stories) — selected in Sanity ("Page case studies" → Agentforce) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 4. What Agentforce Is (And What It Isn't) — Figma 268:6 */}
      <ExplainerCardsSection
        heading="What Agentforce Is (And What It Isn't)"
        cards={[
          {
            title: (
              <>
                It automates,
                <br />
                not just responds
              </>
            ),
            text: "Agentforce is a lot more than a chatbot that provides intelligent, accurate responses. It independently executes multi-step, complex business-critical tasks. It uses advanced reasoning via the Atlas Reasoning Engine to analyze context, build execution plans, and carry out tasks with your existing business data.",
            icon: "/images/platform-expertise/agentforce-what-is/automates-icon.png",
          },
          {
            title: (
              <>
                It works within
                <br />
                your defined boundaries
              </>
            ),
            text: "Our Salesforce administrators configure exact rules, instructions, topics, and guardrails via the visual Agentforce Builder to ensure the AI aligns with your rules and company policies. We connect your agents to Salesforce Data Cloud, enabling them to access real-time structured and unstructured data to provide accurate, context-rich responses.",
            icon: "/images/platform-expertise/agentforce-what-is/boundaries-icon.png",
          },
          {
            title: (
              <>
                It has a clear
                <br />
                escalation path
              </>
            ),
            text: "When requests become too complex or urgent, the system seamlessly transfers the conversation to a human team member using Omni-Channel routing, providing the human with the full context history.",
            icon: "/images/platform-expertise/agentforce-what-is/escalation-icon.png",
          },
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Start With A Pre-Built Agent and Customise"
        tabs={[
          {
            id: "service-agent",
            label: "Service Agent",
            content: {
              heading: "Service Agent",
              text: "Handles routine case inquiries, status checks, and common resolutions. Our specialists configure the agent to work on a defined set of case types, escalating anything outside that scope to a human agent with full context.",
              bullets: [
                "Case status and resolution for defined case types",
                "Knowledge base lookup and article surfacing",
                "Escalation to a human for out-of-scope cases",
                "Full case context handed over on escalation",
              ],
            },
          },
          {
            id: "sdr-agent",
            label: "SDR Agent",
            content: {
              heading: "SDR Agent",
              text: "Qualifies inbound leads against your criteria and books qualified meetings on your reps' calendars. Our specialists configure the agent around your ideal customer profile, disqualification rules, and meeting types. Ambiguous leads or edge cases hand off to a human SDR rather than getting force-qualified.",
              bullets: [
                "Lead qualification against defined criteria",
                "Meeting booking on reps' actual calendars",
                "Handover for ambiguous or edge cases",
                "Full conversation history passed to the rep",
              ],
            },
          },
          {
            id: "sales-coach",
            label: "Sales Coach",
            content: {
              heading: "Sales Coach",
              text: "Reviews deal and call data to surface coaching suggestions for reps and managers. Our specialists configure the agent to analyse against your sales methodology and named opportunity fields. The agent surfaces suggestions rather than taking actions on deals itself, so reps stay in control of their pipeline.",
              bullets: [
                "Deal review against your sales methodology",
                "Call transcript analysis for coaching moments",
                "Suggestions surfaced to reps and managers",
                "No autonomous action on deals or forecasts",
              ],
            },
          },
          {
            id: "campaign-agent",
            label: "Campaign Agent",
            content: {
              heading: "Campaign Agent",
              text: "Manages campaign tracking and optimisation suggestions within rules you set. Our specialists configure the agent to monitor campaign performance, surface underperformance early, and suggest changes. The agent does not launch spend changes or activate audiences without human approval.",
              bullets: [
                "Campaign performance monitoring",
                "Early flagging of underperformance",
                "Optimisation suggestions surfaced to marketers",
                "Human approval required for spend and audience changes",
              ],
            },
          },
          {
            id: "custom-agent",
            label: "Custom Agent",
            content: {
              heading: "Custom Agent",
              text: "Built around a specific task unique to your business, following the same principles as the templates above. Our specialists scope the agent's job, its data access, its escalation path, and its measurable outcome before configuration starts. Therefore, you know exactly what the agent will do and where it will stop before the build begins.",
              bullets: [
                "Task scoped to one clear job",
                "Data access defined explicitly",
                "Escalation path documented from the start",
                "Success measured against a specific outcome",
              ],
            },
          },
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Expertise CTA — TODO: replace images with real assets */}
      <ExpertiseCtaSection
        title="Discuss Your CRM Automation Goals With Our Certified Agentforce Specialists and Consultants."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 7. Why Choose Section */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Agentforce Partner?"
        customReasons={[
          {
            title: "Operational Excellence",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "We help you build and implement Salesforce orgs that are designed around your processes, delivering business value from day one. Our goal is to drive successful rollouts, enable adoption across your teams, and ensure Salesforce aligns perfectly with your operations and objectives.",
          },
          {
            title: "Technical Depth",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "Our team of Salesforce consultants is highly skilled and technically proficient, while boasting certifications across the Salesforce ecosystem. From sales to marketing to service operations, we help you reinvent your processes, boost revenue, and drive operational efficiency.",
          },
          {
            title: "Business-First Approach",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "No generic solutions. No one-size-fits-all orgs. Your business is unique. Your requirements are different. We provide you with a viable solution that's not only intuitive but also supports your growth initiatives and innovation goals.",
          },
        ]}
        image="/images/platform-expertise/why-choose-agentforce.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 8. Benefit Section */}
      <ServiceBenefitsSection
        title="How Our Salesforce Consulting Services Help You"
        items={[
          {
            title: "Improve ROI",
            description: "If not deployed the right way, Salesforce can burn your CRM budget and turn out to be one of your largest business expenses. You deserve better value against your investments. We ensure Salesforce delivers significant ROI for your business. Our CRM strategies are aligned with your goals, processes, scope, and budget.",
            iconKey: "roi",
            colorTheme: "blue",
          },
          {
            title: "User Adoption",
            description: "The best-configured Salesforce org in the world is useless if the people who need it refuse to use it. Adoption is a design problem before it is a training problem, and that is where our consultants start.",
            iconKey: "adoption",
            colorTheme: "green",
          },
          {
            title: "Platform Maturity",
            description: "Most Salesforce orgs grow by accident. Patches on patches, workarounds layered over workarounds, until nobody remembers why anything was built. Our consultants help organisations move past that, into something stable enough to scale on.",
            iconKey: "maturity",
            colorTheme: "yellow",
          },
          {
            title: "Lifecycle Visibility",
            description: "When the journey from first enquiry to renewal lives across six systems, leadership ends up guessing. Our consultants design the reporting and dashboards that pull the whole picture into one place.",
            iconKey: "view360",
            colorTheme: "peach",
          },
        ]}
      />

      {/* 9. Expertise Platforms */}
      <ExpertisePlatformsSection
        title="Our Platform Expertise"
        items={[
          {
            title: "Sales Cloud",
            text: "We configure Sales Cloud around how your sales team works day to day. Our consultants map lead routing, opportunity stages, and forecasting views to your process, so reps sell more and managers coach better with cleaner data at the base.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Service Cloud",
            text: "Case resolution improves when we set up Service Cloud properly around agent workflows. Managers see the full picture of service performance in one place, and Agentforce agents perform best when case data sits structured cleanly underneath them.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Journeys, data extensions, and reporting need to connect properly to your CRM data before Marketing Cloud can deliver. We configure the platform cleanly underneath, so Campaign Agents work against reliable data rather than a fragmented setup.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "Data Cloud unifies customer records across systems. Agentforce agents run on Data Cloud profiles, so identity resolution and unified data directly shape how reliably those agents perform in production.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Portals connect properly to your Salesforce data, so customers and partners get a working self-service experience. Our consultants configure Agentforce agents to operate inside portals with the same governance and escalation rules applied consistently.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Revenue Cloud",
            text: "We configure Revenue Cloud and CPQ against your actual product catalogue and pricing logic. Quoting stays fast and accurate, and Sales Coach agents surface pipeline insights that reflect actual revenue logic rather than assumed pricing.",
            icon: "/images/revenue-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
        ]}
      />

      {/* 10. Expertise Implementation (Industries) */}
      <ExpertiseImplementationSection
        heading={<>How We Setup Agentforce Across Industries</>}
        items={[
          {
            title: "Non-Profit",
            text: "A donor inquiry agent that answers and routes complex requests to your staff. This frees fundraising teams for relationship-building work that should not be automated. Our consultants configure the agent within your donor data access rules, so supporters see their own history and nothing else. Escalation goes to the right team member based on the request type, with full context.",
            image: "/images/platform-expertise/non-profit.webp",
          },
          {
            title: "Healthcare",
            text: "An appointment scheduling and inquiry agent operating within strict patient data access rules. The agent handles booking, rescheduling, cancellations, and general inquiries, escalating anything clinical to a person immediately. We configure the agent against Health Cloud consent scopes and access rules, so the agent respects the same privacy boundaries as the clinical team.",
            image: "/images/platform-expertise/health.webp",
          },
          {
            title: "Financial Services",
            text: "A client service agent handling routine account queries within compliance-defined boundaries. Every action gets logged for audit trail purposes. Our consultants configure the agent with KYC-aware access rules and product suitability boundaries built in. Anything requiring advice or a licensed decision escalates to an adviser, with the client's context ready.",
            image: "/images/platform-expertise/finance.webp",
          },
          {
            title: "Retail & eCommerce",
            text: "An order status and returns agent handling routine inquiries at volume. The agent handles the common cases quickly, escalating disputes or exceptions to a human. We configure the agent against Commerce Cloud data, so responses reflect live order status. Returns policies get encoded as rules the agent follows rather than as guidance it interprets.",
            image: "/images/platform-expertise/commerce.webp",
          },
        ]}
      />

      {/* 11. FAQs */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How does Agentforce drive automation across my workflows with Salesforce AI agents?",
            answer: "Agentforce doesn't rely on rigid, pre-built decision trees. It is driven by the Atlas Reasoning Engine. Think of Atlas as the \"brain\" of the system. It uses a design framework called ReAct to complete complex goals.",
          },
          {
            question: "How much access do Agentforce agents have to our data?",
            answer: "They only access data permitted by your Salesforce security model, including Sharing Rules and Permission Sets. The Einstein Trust Layer masks PII and guarantees zero data retention by external LLMs.",
          },
          {
            question: "Do we need Salesforce Data Cloud to use Agentforce?",
            answer: "No. You can ground agents using standard CRM records and Knowledge. However, Data Cloud acts as a major force multiplier for searching massive, unstructured, or real-time external data lakes.",
          },
          {
            question: "What are the differences between Agentforce and Salesforce Einstein?",
            answer: "Einstein is an AI assistant that helps humans work faster. Agentforce is Salesforce's very own autonomous agentic AI platform that independently reasons, triggers workflows, and completes entire tasks from start to finish.",
          },
          {
            question: "Is Agentforce secure enough for regulated environments?",
            answer: "Yes. Built on Hyperforce, it meets strict compliance standards. It features the Einstein Trust Layer for PII masking, rigorous system guardrails, and audit-ready reasoning logs.",
          },
        ]}
      />

      {/* 12. Footer CTA */}
      <CtaSection
        title="Automate Your Workflows With ProvidusCRM"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
