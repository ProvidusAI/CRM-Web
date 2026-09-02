import type { Metadata } from "next";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import {
  SalesforceServiceHero,
  PartnersSection,
  TrueCostSection,
  ComparisonSection,
  SolutionTypesSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  IndustryCtaSection,
  ExpertisePlatformsSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  WhyChooseSection,
  FaqSection,
  PageBlogsSection,
} from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaSection } from "@/components/sections/CtaSection";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("salesforce-nonprofit-consulting", {
    title: "Salesforce Nonprofit Consulting & Implementation Partner",
    description:
      "Certified Salesforce Nonprofit Cloud and NPSP consultants in the UK. We connect donor, programme, grant, and volunteer data in one system with reporting that holds up in a board meeting.",
    canonicalPath: "/industries/salesforce-nonprofit-consulting",
  });
}

export default async function SalesforceNonprofitConsultingPage() {
  const caseStudies = await getPageCaseStudies("salesforce-nonprofit-consulting");
  const blogs = await getPageBlogs("salesforce-nonprofit-consulting");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Salesforce Nonprofit Consulting & Implementation Partner",
    "description": "Certified Salesforce Nonprofit Cloud and NPSP consultants in the UK. We connect donor, programme, grant, and volunteer data in one system with reporting that holds up in a board meeting.",
    "url": "https://providuscrm.co.uk/industries/salesforce-nonprofit-consulting",
    "provider": {
      "@type": "Organization",
      "name": "ProvidusCRM",
      "url": "https://providuscrm.co.uk",
      "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd("salesforce-nonprofit-consulting", schema);

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero Section (with form) */}
      <SalesforceServiceHero
        badgeTitle="Certified"
        badgeSubtitle="Salesforce Partner in the UK"
        title="Your Fundraising, Programme & Grant Data In One Place"
        description="Create lasting donor relationships, pull presentable reports, and track grant milestones with our Salesforce Nonprofit Cloud consulting and implementation services. We configure Salesforce NPC and NPSP so donor, program, grant, and volunteer data live in one connected system."
        bullets={[
          "Certified Salesforce Nonprofit Cloud and NPSP consultants",
          "Donor, program, and grant data connected in one system",
          "Reporting that holds up in a board meeting, not just a dashboard",
          "Ongoing support so the system does not quietly drift back into spreadsheets",
        ]}
        formTitle="Fill a form today"
        formButtonLabel="Let's Connect"
      />

      {/* 2. Trusted / Partners Section */}
      <PartnersSection />

      {/* 5. True Cost of Salesforce for Nonprofits (Figma 172:4) */}
      <TrueCostSection
        heading={
          <>
            What&rsquo;s The True Cost of Salesforce for Nonprofits{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        subtitle="Not sure what “free for nonprofits” really means? Here’s a breakdown to help you plan your Salesforce investment."
        intro={[
          "Many nonprofits hear “Salesforce is free for nonprofits” at some point when choosing the right CRM platform. Well, this is partially true.",
          "Salesforce’s Power of Us programme gives eligible nonprofits ten free Sales Cloud and Service Cloud licences, plus discounted pricing on additional licences and Nonprofit Cloud itself.",
          "But implementation, configuration, migration, integrations, and support all carry costs.",
        ]}
        cards={[
          {
            title: "Salesforce Power of Us",
            text: "Power of Us covers ten free Salesforce licences and discounted pricing for eligible nonprofits.\n\nThe true cost of setting up Nonprofit Cloud successfully involves specialised consulting, implementation, customisation, configuration, data migration, integrations, and ongoing support.",
            background: "var(--color-cost-card-green)",
            iconColor: "var(--color-brand-green)",
            icon: "/images/salesforce-power.svg",
          },
          {
            title: "Types of Salesforce Nonprofit Implementations",
            text: "Most Salesforce Nonprofit implementations ProvidusCRM’s certified team has worked on fall into one of these three bands:",
            bullets: [
              "End-to-end NPSP setups",
              "Mid-sized Nonprofit Cloud implementations",
              "Enterprise-scale, multi-programme custom orgs with, for instance, grant management and fund accounting integration.",
            ],
            background: "var(--color-cost-card-blue)",
            iconColor: "var(--color-cost-icon-blue)",
            icon: "/images/non-profit-imp.svg",
          },
        ]}
        panelTitle="Simplifying Salesforce for Nonprofits"
        highlights={[
          {
            label: "Licensing Benefit",
            text: "Ten free Sales Cloud and Service Cloud licences through the Power of Us programme for eligible nonprofits.",
          },
          {
            label: "Discounted Additional Licences",
            text: "Additional licences beyond the free ten and Nonprofit Cloud itself at reduced pricing for eligible UK-registered charities and third-sector organisations.",
          },
          {
            label: "What You Pay For",
            text: "Salesforce Nonprofit implementation, customisation, configuration, data migration, integrations, managed services, user adoption, and ongoing support.",
          },
          {
            label: "Typical Salesforce Nonprofit Implementation Cost",
            text: "End-to-end Salesforce Nonprofit Cloud or NPSP implementations start from £30,000, with cost rising with further complexity, customisation, features, and scale.",
          },
          {
            label: "Project Timeline",
            text: "NPSP or Nonprofit Cloud implementations take around eight to sixteen weeks on average, based on the projects we’ve worked on. Complex builds may run four to six months.",
          },
          {
            label: "Eligibility Verification",
            text: "Free scoping and Power of Us eligibility review before any commitment, so you know your actual costs up front.",
          },
        ]}
      />

      {/* 6. DIY vs Certified Partner comparison (Figma 53:123) */}
      <ComparisonSection
        heading={
          <>
            DIY Implementation vs Certified Salesforce Nonprofit Cloud Partner{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        subtitle="Salesforce's free licences make DIY implementation tempting. Here is what typically works and what usually breaks, so you can make a more informed decision."
        negativeTitle="What DIY Implementation Costs"
        negativeItems={[
          "Months of admin time learning while building",
          "Reconfiguration cost when the build cannot scale",
          "Data migration errors that surface months later",
          "Broken sharing rules that expose donor data",
          "Manual workarounds because reporting was not scoped properly",
          "Dependency on one admin",
        ]}
        positiveTitle="What ProvidusCRM Brings"
        positiveItems={[
          "Configuration was built once successfully with Salesforce NPC best practices",
          "Validated data migration from any legacy platform",
          "Sharing rules designed before launch, not an afterthought",
          "Board-ready reporting scoped to leadership's actual questions",
          "Documentation and training built for team handoff",
          "Customising Salesforce Nonprofit Cloud to your workflows and goals",
        ]}
        footnote="Reach out to our consultants to discuss the impact Salesforce Nonprofit Cloud and ProvidusCRM can deliver for your organisation."
        buttonLabel="Book a Call"
        buttonHref="/contact"
      />

      {/* 7. Case Studies — selected in Sanity ("Page case studies" → Nonprofit) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}

      {/* 8. Tabs Section (What We Do) */}
      <WhatWeDoSection
        title="Salesforce Nonprofit Cloud Services We Offer"
        tabs={[
          {
            id: "donor-fundraising",
            label: "Donor & Fundraising",
            content: {
              heading: "Donor & Fundraising Management",
              text: "Unify donor records across all donation channels. We configure Nonprofit Cloud so that online donations, direct mail responses, event ticketing, and donor-advised fund gifts all resolve to the same constituent record.\n\nMoves management workflows track major gift pipelines properly, while recurring donation automation handles processing through FinDock or your preferred partner. We build automated Gift Aid tracking and HMRC claim processing directly into your system, ensuring your organisation automatically maximises its eligible revenue.",
              bullets: [
                "Unified donor profiles across online giving, direct mail, events, and donor-advised funds",
                "Moves management and major gift pipeline tracking",
                "Recurring donation automation and payment processing",
                "Donor segmentation that distinguishes giving capacity and pattern",
              ],
            },
          },
          {
            id: "grant-management",
            label: "Grant Management",
            content: {
              heading: "Grant Management",
              text: "At ProvidusCRM, our consultants configure grant management so that applications, awards, milestones, and spending documentation all sit against the grant record in Nonprofit Cloud.\n\nCompliance deadlines trigger automated reminders. Documentation is attached to the specific milestone. Where funders require a grantee reporting portal, we build one on Experience Cloud connected to live grant data, so grantees report against the same record your team works from.",
              bullets: [
                "Grant application and award tracking",
                "Milestone and spending documentation tied to the actual grant record",
                "Compliance deadline tracking and automated reminders",
                "Grantee portal setup where funder reporting requires it",
              ],
            },
          },
          {
            id: "programme-beneficiary",
            label: "Programme & Beneficiary",
            content: {
              heading: "Programme & Beneficiary Management",
              text: "Get a single view of who you are serving and what is actually changing for them. Our consultants configure beneficiary and case tracking around your specific programme model.\n\nIndividual donations connect to individual programme outcomes, so the \u201chow is my donation being spent?\u201d question becomes answerable in specific detail rather than in aggregate figures that satisfy nobody.",
              bullets: [
                "Beneficiary and case tracking configured around your specific programme model",
                "Outcome and impact measurement tied to individual programmes",
                "Service delivery tracking across multiple programme sites or cohorts",
                "Reporting that ties individual donations to individual programme outcomes",
              ],
            },
          },
          {
            id: "volunteer-event",
            label: "Volunteer & Event",
            content: {
              heading: "Volunteer & Event Management",
              text: "Match volunteers to the tasks that need the most attention. We configure volunteer management to track skills, availability, and previous assignments, so volunteer coordinators find the right person for each opportunity rather than emailing everyone.\n\nEvent registration, payment, and attendance sit in the same system. Volunteer hours count toward programme impact reporting rather than being kept in a separate log.",
              bullets: [
                "Volunteer skills, availability, and assignment tracking",
                "Event registration, payment, and attendance management",
                "Volunteer hour tracking tied to programme impact reporting",
                "Communication workflows for volunteer coordination",
              ],
            },
          },
          {
            id: "fund-accounting",
            label: "Fund Accounting",
            content: {
              heading: "Fund Accounting & Financial Integration",
              text: "Track restricted and unrestricted funds the way your finance team needs them. We set up and configure fund accounting, so donor intent, restrictions, and programme allocations are traceable from gift receipt through disbursement.\n\nWhether native Salesforce fund accounting fits your setup or an integration with Accounting Seed, QuickBooks, or NetSuite makes more sense, we build it so the audit trail exists.",
              bullets: [
                "Fund accounting setup",
                "Restricted vs unrestricted fund tracking tied to donor intent",
                "Board-ready financial reporting without manual reconciliation",
                "Audit-ready documentation built into the system",
              ],
            },
          },
          {
            id: "communities-portals",
            label: "Communities & Portals",
            content: {
              heading: "Communities & Portals",
              text: "We create self-service portals on Experience Cloud for donors, volunteers, and grantees, connected to live Nonprofit Cloud data.\n\nDonor portals show giving history and programme impact. Grantee portals handle application and milestone reporting. Volunteer self-service covers scheduling and hour logging. Access rules follow the same governance principles as any Experience Cloud project, defined and tested before launch.",
              bullets: [
                "Donor portals showing giving history and programme impact",
                "Grantee portals for application and milestone reporting",
                "Volunteer self-service scheduling and hour logging",
              ],
            },
          },
        ]}
        backgroundOverlayColor="#616161"
      />

      {/* 9. Industry CTA */}
      <IndustryCtaSection
        title="Schedule a consultation with our certified Salesforce Nonprofit Cloud consultants."
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        image="/images/industries-pages/industry-cta-1.png"
      />

      {/* 10. Platforms Expertise */}
      <ExpertisePlatformsSection
        title="Our Salesforce Expertise Beyond Nonprofit Cloud"
        items={[
          {
            title: "Sales Cloud",
            text: "We execute end-to-end Sales Cloud configuration with Nonprofit Cloud to track prospective major donors and volunteer recruitment the way a sales team tracks a pipeline, often using the free licences available through the Power of Us programme.",
            icon: "/images/sales-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Our consultants build segmented donor journeys and appeal campaigns tied to giving history. A lapsed donor gets a different message than a major gift prospect, and event attendees get relevant follow-up sequences.",
            icon: "/images/marketing-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Create donor, volunteer, and grantee portals connected to live Nonprofit Cloud data. Self-service means self-service on your actual records, with sharing rules that respect donor privacy and grantee reporting boundaries.",
            icon: "/images/experience-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Service Cloud",
            text: "We set up constituent support so donor inquiries and beneficiary requests get routed and resolved without falling through the cracks of a general inbox. Case history connects to the constituent record, so context does not get lost between interactions.",
            icon: "/images/service-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "Our consultants unify donor, volunteer, and beneficiary data from every source into one profile. Segmentation and reporting rest on one accurate picture rather than five partial ones that quietly contradict each other.",
            icon: "/images/data-cloud.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Agentforce",
            text: "We build donor inquiry agents with Agentforce that answer routine questions and route anything sensitive to a staff member. This frees up relationship-building work for the people who do it well.",
            icon: "/images/agent-force.webp",
            bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
        ]}
      />

      {/* 11. Solutions by nonprofit type (Figma 54:394) */}
      <SolutionTypesSection
        heading={
          <>
            Solutions We&rsquo;ve Delivered For Different Types of Nonprofits{" "}
            <GreenLineMark className="inline-block -mb-2 ml-1" />
          </>
        }
        subtitle="Every nonprofit runs differently. Configuration reflects what your specific type of organisation needs."
        cards={[
          {
            title: "Grantmaking Foundations",
            text: "Configuration centred on application intake, milestone-based disbursement, and compliance reporting across a portfolio of grantees. Application scoring workflows, grant lifecycle tracking from award to closeout, and grantee reporting portals that surface funder requirements clearly.",
            icon: "/images/industries-pages/nonprofit-types/grantmaking.png",
            color: "var(--color-brand-green)",
          },
          {
            title: "UK-Registered Charities & Relief Organisations",
            text: "Beneficiary case tracking, service delivery metrics, and rapid-response donation processing are built to scale without losing data integrity. We configure case management, surge-capable donation flows, and reporting frameworks that align directly with Charity Commission requirements.",
            icon: "/images/industries-pages/nonprofit-types/charities.png",
            color: "var(--color-type-teal)",
          },
          {
            title: "Faith-Based Organisations",
            text: "Membership, tithing, and congregation communication are tracked alongside broader fundraising and outreach. Household relationships that reflect how congregations actually work, giving history connected to member records, and pastoral communication workflows.",
            icon: "/images/industries-pages/nonprofit-types/faith-based.png",
            color: "var(--color-type-purple)",
          },
          {
            title: "Higher Education Advancement Offices",
            text: "Alumni relationship tracking and major gift pipeline management across a donor base spanning decades. Nonprofit Cloud, alongside Education Cloud, connects alumni engagement, career milestones, event attendance, and giving history in one view.",
            icon: "/images/industries-pages/nonprofit-types/education.png",
            color: "var(--color-type-magenta)",
          },
          {
            title: "Arts & Cultural Institutions",
            text: "Membership, ticketing, and patron giving are connected in one system, since a season ticket holder, a gala donor, and a member are often the same person. Nonprofit Cloud is configured to hold these as one supporter view.",
            icon: "/images/industries-pages/nonprofit-types/arts-culture.png",
            color: "var(--color-type-amber)",
          },
        ]}
      />

      {/* 12. Salesforce / Certified Partner Section */}
      <ExpertiseSalesforceSection
        heading="You Can Count On Our Certified Salesforce Nonprofit Cloud Expertise"
        text="Our team consists of experienced talent holding certifications across the Salesforce ecosystem, including Nonprofit Cloud, and delivering implementations across fundraising, programme, and grant management contexts. We work in the specific technical territory where donor, program, grant, and fund accounting data need to hold together under audit and board scrutiny, and where the operating reality is usually a small team wearing several hats each."
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

      {/* 14. Why Choose Section */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Nonprofit Cloud Partner"
        customReasons={[
          {
            title: "A Single Point of Contact",
            color: "var(--color-soft-indigo)",
            icon: "/images/different.webp",
            text: "Our consultant leads your engagement from kickoff through go-live and stays involved long enough to see what actually happened after launch. Escalations, decisions, and progress questions all go through one place.",
          },
          {
            title: "Clarity Over Pricing & Timelines",
            color: "var(--color-soft-purple)",
            icon: "/images/better.webp",
            text: "Nonprofit technology budgets are typically fixed grant or operating funds with no room for a late surprise on the final invoice. Every quote we share breaks down scope, timeline, and cost in plain terms before any work begins.",
          },
          {
            title: "User Adoption Training & Support",
            color: "var(--color-salesforce-blue)",
            icon: "/images/salesforce-partner.webp",
            text: "A well-configured Salesforce org only pays back when your team actually uses it. We create training documentation for your team and align it to your existing workflows for smoother, faster user adoption.",
          },
        ]}
        image="/images/platform-expertise/expertise-choose.webp"
        backgroundOverlayColor="#616161"
      />

      {/* 15. FAQs Section */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question:
              "Is Salesforce actually free for nonprofits, and what is the catch?",
            answer:
              "Salesforce's Power of Us programme provides eligible nonprofits with ten free Sales Cloud and Service Cloud licences, and discounted pricing on additional licences and Nonprofit Cloud itself. The catch, in a sense, is that implementation, configuration, data migration, integrations, and ongoing support all carry a cost. The software may be free or discounted, but the setup work is what a Salesforce implementation costs at that scope in any sector.",
          },
          {
            question:
              "What is the difference between NPSP and Nonprofit Cloud, and which one do we need?",
            answer:
              "NPSP (Nonprofit Success Pack) is a managed package that sits on top of the Salesforce Platform. Nonprofit Cloud is Salesforce's newer native industry cloud, built for nonprofits from the ground up. NPSP is proven and stable. Nonprofit Cloud is where Salesforce is investing in new features. The right choice depends on your data model, programme complexity, and integration needs. Our consultants advise honestly on both.",
          },
          {
            question:
              "How does the Power of Us programme eligibility work?",
            answer:
              "Power of Us is available to nonprofits, higher education institutions, and other eligible organisations that meet Salesforce's criteria, which typically include registered charitable status and use of the platform for mission-related work. Applications are processed directly through Salesforce's dedicated validation channels. Our consultants can walk you through UK charity status verification, Gift Aid readiness, and help you navigate the application process as part of our initial scoping conversation.",
          },
          {
            question:
              "Can Nonprofit Cloud integrate with Accounting Seed, QuickBooks, or NetSuite for fund accounting?",
            answer:
              "Yes. Our consultants set up integrations with UK-standard financial tools including Sage Intacct, Xero, QuickBooks, NetSuite, and Accounting Seed (which runs natively on Salesforce) to ensure seamless reconciliation of restricted and unrestricted funds. The right choice depends on your finance team's current stack and reporting requirements.",
          },
          {
            question:
              "How do we track restricted versus unrestricted funds properly?",
            answer:
              "Fund tracking gets configured at the donation level, so donor intent, restrictions, and programme allocation are traceable from the gift receipt through to disbursement. Reporting then shows restricted balances by fund and unrestricted totals separately. This is the piece boards ask about most, so we set it up carefully.",
          },
          {
            question:
              "Can we tie individual donations to specific programme outcomes for donor reporting?",
            answer:
              "Yes, when donation records, programme records, and outcome measurements are connected in Nonprofit Cloud. This is one of the strongest arguments for moving off scattered spreadsheets: the “how is my donation being spent” question becomes answerable in specific detail without a week of manual work.",
          },
          {
            question:
              "How does grant milestone tracking actually work in the system?",
            answer:
              "Each grant becomes a record with linked milestone, spending, and reporting records. Deadlines trigger automated reminders. Documentation attaches to the specific milestone rather than a shared drive. Grantees can update their reporting through a portal if the funder requires it.",
          },
          {
            question:
              "How long does a Nonprofit Cloud implementation take?",
            answer:
              "A focused implementation runs eight to sixteen weeks. Complex projects with multiple programmes, grant management, fund accounting integration, and portals typically run four to six months. Our consultants give a realistic timeline after discovery, based on your programme model and integration landscape.",
          },
          {
            question:
              "How much does implementation actually cost if the licences are free?",
            answer:
              "Cost depends on scope, integration complexity, and whether ongoing managed services sit inside the engagement. A focused NPSP or Nonprofit Cloud implementation typically starts in the low tens of thousands of pounds. Complex multi-programme implementations with fund accounting integration and portals run higher. Our consultants share a specific quote after scoping.",
          },
          {
            question:
              "Can volunteers and donors access a self-service portal without IT overhead?",
            answer:
              "Yes. Our consultants build donor, volunteer, and grantee portals on Experience Cloud with the maintenance overhead scoped from the start. Access rules, page templates, and content structures get configured so your team can update the portal without a developer for routine changes.",
          },
        ]}
      />

      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}

      {/* 16. Footer CTA */}
      <CtaSection
        title="Bring Your Nonprofit to Salesforce With ProvidusCRM"
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        backgroundImage="/images/cta-bg.webp"
      />
    </div>
  );
}
