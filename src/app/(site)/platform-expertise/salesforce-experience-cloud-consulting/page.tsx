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
  ExpertiseImplementationSection,
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export const metadata: Metadata = {
  title: "Salesforce Experience Cloud Consulting | ProvidusCRM",
  description: "Salesforce Experience Cloud Consulting Services",
};

export default async function SalesforceExperienceCloudConsultingPage() {
  const caseStudies = await getPageCaseStudies(
    "salesforce-experience-cloud-consulting"
  );

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            Intuitive Portals Connected To Your Data{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        subtitle="Salesforce Experience Cloud Consulting & Implementation Partner"
        description="Configure Salesforce Experience Cloud so customer, partner, and employee portals connect directly to Salesforce records, permissions, and workflows with our ProvidusCRM. Our consultants define sharing rules and test them before launch, ensuring users see exactly the records they should and the portal reflects live Salesforce data."
        image="/images/platform-expertise/pe-cloud-consult.webp"
        bullets={[
          "Certified Salesforce Experience Cloud consultants",
          "Sharing rules and access models defined and tested before launch",
          "Portals connected to live Salesforce data",
          "Ongoing governance so access stays accurate as the portal grows"
        ]}
        hideCta
      />

      {/* 2. Trusted Section */}
      <PartnersSection />

      {/* 3. Expertise Description */}
      <ExpertiseDescriptionSection
        heading={
          <>
            Why Most Portals Fail To Deliver Value{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        paragraphs={[
          "Portal projects rarely fail because a feature is missing. They fail because sharing rules and data access decisions get made quickly at the start of a build, then surface as problems months after launch.",
          "Data ends up exposed to users who should never have seen it, or users get locked out of records they should be seeing. Both damage trust in the portal."
        ]}
      />

      {/* 4. Expertise Features */}
      <ExpertiseFeaturesSection
        features={[
          {
            title: "Who has looked at the sharing rules recently, and does everyone agree on what they should do?",
            description: "Sharing rules often get set up by a technical lead and never reviewed. That is fine until an audit or a support ticket makes them everyone's problem.",
            icon: "/images/platform-expertise/Mask group (1).webp"
          },
          {
            title: "Are page design and branding getting more attention than authentication and record visibility?",
            description: "Design decisions are visible, so they attract time. Access decisions are invisible until they break, so they get skipped.",
            icon: "/images/platform-expertise/Mask group (2).webp"
          },
          {
            title: "When the portal grows, does access stay accurate, or does it drift?",
            description: "Adding users, roles, or new content typically breaks assumptions built into the original sharing model. Without ongoing governance, the drift compounds.",
            icon: "/images/platform-expertise/Mask group (3).webp"
          }
        ]}
      />

      {/* 5. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Experience Cloud Solutions & Services We Offer"
        tabs={[
          {
            id: "experience-architecture",
            label: "Experience Architecture",
            content: {
              heading: "Experience Architecture & Access Design",
              text: "Defining how users authenticate, which Salesforce records they can see, and how sharing rules are structured before any template or branding decisions are made. Our consultants treat this as the foundation of the build, not a configuration afterthought.\n\nThis includes guest access, authenticated user access, and partner licence configuration. We match this security model with the optimal platform framework, using Lightning Web Runtime (LWR) for high-speed, SEO-optimised public sites or Aura for complex out-of-the-box feature sets.\n\nThe portal launches with access rules that hold up under audit, not ones that get discovered as system vulnerabilities six months down the line.",
              bullets: [
                "User access models and authentication setup",
                "Data visibility and sharing rule design",
                "Guest, authenticated, and partner licence configuration",
                "Access rules tested before launch, not discovered after"
              ]
            }
          },
          {
            id: "customer-portals",
            label: "Customer Portals",
            content: {
              heading: "Customer Service Portals",
              text: "Self-service portals connected directly to real case, order, and knowledge data in Salesforce. Our consultants build customer portals that resolve issues rather than redirect them, so support tickets go down instead of shifting from one channel to another.\n\nWe configure case submission and status tracking, connect self-service to Service Cloud cases and flows, and set up knowledge access with the correct visibility for logged-in customers. Portals are built responsive-first so mobile users can navigate as smoothly as desktop users.\n\nAs a result, your service team handles fewer routine tickets, and customers get faster resolution on the items requiring human intervention.",
              bullets: [
                "Case submission and status tracking",
                "Knowledge base and self-service actions",
                "Connection to Service Cloud cases and flows",
                "Branded, mobile-responsive templates"
              ]
            }
          },
          {
            id: "partner-portals",
            label: "Partner Portals",
            content: {
              heading: "Partner & PRM Portals",
              text: "Controlled sharing of leads, opportunities, and deal workflows with your partners, without exposing internal sales data. Our consultants configure the access rules that protect what should stay internal while enabling what needs to flow to partners.\n\nWe build partner portals with opportunity-sharing rules, deal registration workflows, and lead-sharing flows that match how your channel actually operates. Partner dashboards give visibility into their pipeline and rewards. Onboarding flows help new partners get productive quickly.\n\nYour partner channel gets the tools it needs while your internal sales data stays inside your team.",
              bullets: [
                "Partner access rules and opportunity sharing",
                "Deal registration and lead-sharing workflows",
                "Partner dashboards and productivity tools",
                "Onboarding flows for new partners"
              ]
            }
          },
          {
            id: "employee-communities",
            label: "Employee Communities",
            content: {
              heading: "Employee Communities & Internal Hubs",
              text: "Internal portals for requests, resources, and collaboration, tied to real Salesforce data. Employees are often harder to satisfy than customers because they use the tool every day. Our consultants build employee portals that respect that.\n\nWe configure request and approval flows, shared resource access, team collaboration pages, and workflow-driven actions that connect back to Salesforce records. Access follows role, not just licence, so people see what their job requires and nothing else.\n\nYour internal teams get a hub that speeds up daily work rather than one that becomes another system they avoid.",
              bullets: [
                "Internal request and approval flows",
                "Shared resource and knowledge access",
                "Team collaboration pages",
                "Workflow-driven internal actions"
              ]
            }
          },
          {
            id: "personalisation-ai",
            label: "Personalisation & AI",
            content: {
              heading: "Personalisation & AI-Enabled Self-Service",
              text: "Relevant content and guided actions without always needing an agent. Our consultants configure personalisation and AI, so users see what fits their role, their history, and their current task.\n\nWe set up Einstein-powered content recommendations, Agentforce handles guided self-service and case deflection, and audience targeting so each user segment sees appropriate content. Every AI feature runs on governed Salesforce data, so recommendations stay accurate, and access rules stay respected.\n\nPersonalisation works reliably rather than surfacing content users should not be seeing.",
              bullets: [
                "Einstein-powered content recommendations",
                "Agentforce-enabled self-service and case deflection",
                "Audience targeting so each user sees what is relevant",
                "Guided actions and workflow prompts tied to governed data"
              ]
            }
          },
          {
            id: "governance-support",
            label: "Governance & Support",
            content: {
              heading: "Governance & Ongoing Support",
              text: "Keeping access rules and page structure stable as users, content, and requirements evolve. Our consultants build the governance layer that keeps portals reliable long after launch, rather than letting them drift into problems.\n\nWe run access rule audits as the user base grows, manage page and audience-targeting versions, and handle Salesforce release updates carefully. Every enhancement gets checked against existing access rules before deployment, so new features do not accidentally break old permissions.\n\nYour portal stays predictable as it grows rather than needing rescue work every eighteen months.",
              bullets: [
                "Access rule audits as the user base grows",
                "Page and audience-targeting version control",
                "Release management aligned to Salesforce updates",
                "Safe enhancements that do not disrupt existing access"
              ]
            }
          }
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 6. Case Studies — selected in Sanity ("Page case studies" → Experience Cloud) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 7. Expertise CTA */}
      <ExpertiseCtaSection
        title="Connect with our consultant to get the best-aligned Experience Cloud solution."
        buttonText="Let's Connect"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 8. Salesforce Section */}
      <ExpertiseSalesforceSection
        heading="Certified & Experienced Salesforce Experience Cloud Talent"
        text="Our consultants hold Salesforce Experience Cloud certifications and have delivered customer, partner, and employee portals across the UK, USA, and GCC markets. We work in multi-cloud environments where Experience Cloud sits alongside Sales Cloud, Service Cloud, and Data Cloud, and where access governance decisions carry regulatory weight."
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

      {/* 10. Expertise Implementation */}
      <ExpertiseImplementationSection
        heading={
          <>
            Industries We Serve
          </>
        }
        items={[
          {
            title: "Non-Profit",
            text: "Donor and volunteer engagement runs on trust and self-service. Supporters expect to update their details, check their giving history, and register for events without emailing your team. But donor data is sensitive: exposing giving amounts or gift histories to the wrong user damages the relationship fast.\n\nOur consultants build non-profit portals connected to your real fundraising data, with sharing rules that let supporters see their own history and nothing else. Volunteers get event and shift access relevant to them.",
            image: "/images/platform-expertise/non-profit.webp"
          },
          {
            title: "Retail & eCommerce",
            text: "Customer and loyalty portals in retail connect to commerce and order data in real time. Shoppers expect to check order status, manage returns, track loyalty points, and see personalised offers. Our consultants configure Experience Cloud portals connected to Commerce Cloud and Service Cloud data live, so what customers see in the portal matches what your teams see internally.\n\nLoyalty programmes reflect real activity. Support requests link back to actual orders, and public-facing brand pages benefit from native Experience Cloud SEO management, clean URL structures, and automated sitemap indexing to maximize organic search discovery.",
            image: "/images/platform-expertise/commerce.webp"
          },
          {
            title: "Healthcare",
            text: "Patient portals are where the access-governance argument gets sharpest. Patients need convenience: appointment booking, results, messaging their care team. Regulations demand strict access rules: no accidental exposure of another patient's records, no sharing beyond consent. A portal that gets this wrong becomes a compliance incident.\n\nOur consultants configure Health Cloud alongside Experience Cloud with sharing rules and consent scopes built in from the start, not added later. Patient portals give convenience without compromising the rules that protect them.",
            image: "/images/platform-expertise/health.webp"
          },
          {
            title: "Financial Services",
            text: "Client portals in banking, wealth, and insurance carry the same tension as healthcare: self-service convenience against strict access boundaries. KYC obligations, product suitability rules, and household relationships all shape what each client should and should not see. Getting this wrong exposes the business to regulatory action.\n\nOur consultants configure Financial Services Cloud alongside Experience Cloud with KYC-aware sharing rules, household access models, and audit trails built into every portal interaction. Clients get the self-service they expect. Compliance teams get the trail they need.",
            image: "/images/platform-expertise/finance.webp"
          }
        ]}
      />

      {/* 11. Why Choose Section */}
      <WhyChooseSection
        title="What Makes ProvidusCRM A Leading Salesforce Experience Cloud Partner"
        customReasons={[
          {
            title: "Defined Weekly Updates",
            text: "You get a working session and a written summary each week. The call covers progress, blockers, and decisions that need your input. The summary is in writing, so anyone on your side who missed the call knows where things stand.",
            icon: "/images/different.webp",
            color: "var(--color-soft-indigo)"
          },
          {
            title: "A Single Point of Contact",
            text: "You get access to an experienced, certified Salesforce Experience Cloud consultant, leading engagement from kickoff to go-live. They know your project, your team, and the access decisions we have made together. They stay on the account long enough to ensure a successful launch and a hassle-free post-launch.",
            icon: "/images/better.webp",
            color: "var(--color-soft-purple)"
          },
          {
            title: "Post-Launch Support",
            text: "We schedule reviews at certain intervals after go-live. These cover engagement metrics and a re-check of access rules as the user base grows. Our ongoing support keeps your portals intuitive and impactful.",
            icon: "/images/salesforce-partner.webp",
            color: "var(--color-salesforce-blue)"
          }
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 12. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "Is Salesforce Experience Cloud the same as Community Cloud?",
            answer: "Yes. Experience Cloud is the current Salesforce name for what was previously called Community Cloud and Salesforce Communities. The underlying product is the same, with substantial feature additions since the rename. Our consultants work with it under either name."
          },
          {
            question: "What is the difference between a customer portal, partner community, and employee community?",
            answer: "The core platform is the same. The difference is who accesses it, what data they can see, and which Salesforce licence type they use. Customer portals use external customer licences, partner communities use partner licences with lead and opportunity access, and employee communities use internal licences. Our consultants configure each type differently."
          },
          {
            question: "How do sharing rules actually work, and what happens if they are configured incorrectly?",
            answer: "Sharing rules in Experience Cloud combine organisation-wide defaults, role hierarchy, criteria-based rules, and sharing sets specific to Experience Cloud licences. Configured incorrectly, users see records they should not or lose access to records they should see. Our consultants design and test these together before launch."
          },
          {
            question: "Can Experience Cloud connect to our existing Sales, Service, or Marketing Cloud data?",
            answer: "Yes. Experience Cloud reads directly from your Salesforce objects, so cases, opportunities, orders, and marketing preferences appear live in the portal rather than as a copy. This is the core of the platform, not an integration project."
          },
          {
            question: "What is the difference between authenticated users and guest users?",
            answer: "Authenticated users log in with credentials and get access based on their profile and sharing rules. Guest users browse without logging in and get access based on the guest user profile, which needs careful configuration to avoid exposing internal data. Our consultants design both together."
          },
          {
            question: "How long does an Experience Cloud implementation actually take?",
            answer: "A focused portal build runs eight to twelve weeks. Complex projects with multiple audience types, custom components, or heavy integrations typically run three to six months. Our consultants give a realistic timeline after discovery, based on your actual audience and access requirements."
          },
          {
            question: "What is the difference between a Salesforce Experience Cloud consultant and an implementation partner?",
            answer: "A consultant advises on architecture, access design, and portal strategy. An implementation partner actually builds the portal. Our consultants deliver both together, so the strategy and the build never drift apart across the project."
          },
          {
            question: "How much do Experience Cloud services cost?",
            answer: "Cost depends on scope, audience types, custom development needs, and integration complexity. A focused portal build starts from £15,000-£20,000, with the cost rising with complexity, customisation needs, and scale. Our consultants share a clear quote after discovery, not a rushed guess upfront."
          },
          {
            question: "Is Experience Cloud secure enough for a public-facing community?",
            answer: "Yes, when configured properly. Salesforce provides a robust security architecture, including field-level security, sharing sets, strict guest user record access policies, and data encryption. However, public portals are only secure if these tools are configured correctly, which is why our rigorous pre-launch access testing phase is foundational to every build."
          },
          {
            question: "What industries do your Experience Cloud consultants work with?",
            answer: "Our consultants work across non-profit, healthcare, financial services, retail and ecommerce, education, and manufacturing sectors. We bring sector context to each project, so access rules, compliance requirements, and portal design fit how your industry actually operates."
          }
        ]}
      />

      {/* 13. Footer CTA */}
      <CtaSection
        title="Transform Your Data Strategy Today"
        buttonLabel="Talk to an Expert"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
