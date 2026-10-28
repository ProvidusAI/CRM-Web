import {
  HeroSection,
  PartnersSection,
  ServiceCaseStudiesSection,
  SalesforceConsultCtaSection,
  IndustriesSection,
  ExpertisePlatformsSection,
  FaqSection,
  PageBlogsSection,
  CtaSection,
  RecruitmentIntroSection,
  TalentPillsSection,
  HiringModelsSection,
  ProcessStepsSection,
  WhyBandSection,
  FeaturedRolesSection,
} from "@/components/sections";
import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import type { IndustrySectionItem } from "@/components/sections/IndustriesSection";
import type { ExpertisePlatformItem } from "@/components/sections/ExpertisePlatformsSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "Your CRM innovation goals can't wait. Hire top 1% Salesforce talent from ProvidusCRM's global team, boasting certifications across the Salesforce ecosystem and implementation expertise spanning industries.";

// Fallback shown until an editor picks case studies in Sanity for this page.
const FALLBACK_CASE_STUDIES: ServiceCaseStudyCard[] = [
  {
    title: "Implementing Financial Services Cloud with Agentforce",
    slug: "implementing-financial-services-cloud-with-agentforce",
    image: "/images/staff-augmentation/case-study-financial-services.webp",
    label: "Financial Services Cloud",
    category: "Financial Services",
  },
  {
    title:
      "Improving Student Experience and Driving Lifecycle Visibility With Education Cloud",
    slug:
      "improving-student-experience-and-driving-lifecycle-visibility-with-education-cloud",
    image: "/images/staff-augmentation/case-study-education.webp",
    label: "Education Cloud",
    category: "EdTech",
  },
  {
    title: "Migrating to Commerce Cloud and Unifying Customer Data Across Channels",
    slug: "migrating-to-commerce-cloud-and-unifying-customer-data-across-channels",
    image: "/images/staff-augmentation/case-study-retail.webp",
    label: "Commerce Cloud",
    category: "Retail",
  },
  {
    title: "Health Cloud & Service Cloud Implementation for a Leading Hospital Network",
    slug: "health-cloud-and-service-cloud-implementation-for-a-leading-hospital-network",
    image: "/images/staff-augmentation/case-study-healthcare.webp",
    label: "Health Cloud",
    category: "Healthcare",
  },
];

// Figma 462:554 — same gradient-card recipe as IndustriesSection's own
// default items, with the body copy matching word for word. Local (rather
// than the shared default) so the shorter Figma titles ("Non-Profit" not
// "Non-Profit Cloud") don't fork the array the homepage and /salesforce/[slug]
// render via <IndustriesSection /> with no props.
const INDUSTRIES: IndustrySectionItem[] = [
  {
    title: "Non-Profit",
    image: "/images/non-profit.webp",
    description:
      "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day.",
    href: "/industries/salesforce-nonprofit-consulting",
  },
  {
    title: "Education",
    image: "/images/education-cloud.webp",
    description:
      "Universities, colleges, and training providers manage thousands of relationships across recruitment, admissions, student success, and alumni engagement. Our Education Cloud specialists connect every stage of the student lifecycle in one platform. Recruitment pipelines, application tracking, student case management, and alumni fundraising all run from the same data, so no department works in isolation, and no student record falls through the gaps.",
    href: "/industries/salesforce-education-cloud-consulting",
  },
  {
    title: "Commerce",
    image: "/images/commerce-cloud.webp",
    description:
      "Selling online gets complicated fast. Product catalogues grow, pricing rules multiply, and customers expect the same experience across every channel. Our Commerce Cloud consultants build B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. Inventory visibility, pricing logic, checkout flows, and post-purchase journeys all live inside one platform, so the commerce experience matches what the rest of the business already knows about the customer.",
    href: "/industries/salesforce-commerce-cloud-consulting",
  },
  {
    title: "Health",
    image: "/images/health-cloud.webp",
    description:
      "Patient data is sensitive, care coordination is complex, and compliance is not optional. Our Health Cloud implementation experts give healthcare providers a complete view of every patient across referrals, appointments, care plans, and follow-ups. Clinical and non-clinical teams work from the same record, consent tracking is built into every workflow, and reporting meets regulatory standards. Better care coordination with less administrative overhead.",
    href: "/industries/salesforce-health-cloud-consulting",
  },
  {
    title: "Financial Services",
    image: "/images/finance-services-cloud.webp",
    description:
      "Banks, lenders, wealth managers, and fintechs need CRM that understands financial relationships, not just contacts and opportunities. Our Financial Services Cloud consultants set up client household management, financial account tracking, compliance workflow automation, and full advisor dashboards. KYC processes, referral tracking, and pipeline management all operate within a platform built specifically for how financial services teams work and what regulators expect.",
    href: "/industries/salesforce-financial-services-cloud-consulting",
  },
  {
    title: "Manufacturing",
    image: "/images/manufacturing-cloud.webp",
    description:
      "Manufacturers deal with long sales cycles, complex account hierarchies, and forecasting that depends on both sales agreements and actual production capacity. Our Manufacturing Cloud specialists connect sales forecasts with operations data, manage account-based agreements, and give commercial teams accurate visibility into run-rate business and new opportunities. Rebate management, partner collaboration, and demand planning all run from one system instead of five disconnected spreadsheets.",
  },
];

// Figma 462:555 — five platform cards (no sixth/Marketing Cloud card exists
// in this carousel node). Copy and gradients match verbatim; icons reuse the
// site-wide cloud icons already used by ExpertisePlatformsSection elsewhere.
const PLATFORM_EXPERTISE: ExpertisePlatformItem[] = [
  {
    title: "Service Cloud",
    text: "Resolve cases faster with structured queues, automated escalations, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing response times and giving agents the context they need before picking up the phone.",
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
    text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-ups without human input. At ProvidusCRM, we configure Agentforce to work within existing Salesforce workflows so automation runs on real business rules.",
    icon: "/images/agent-force.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
  },
  {
    title: "Sales Cloud",
    text: "Give sales teams full visibility into every deal, from first touch to closed-won. Our team configures Sales Cloud around actual pipeline stages, forecast categories, and reporting needs so reps spend less time on admin and more time selling.",
    icon: "/images/sales-cloud.webp",
    bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #DBFFFB 119.24%)",
  },
];

// Figma 463:910 — four Q&As, questions and answers verbatim from the design.
const FAQS = [
  {
    question: "What to look out for during Salesforce hiring in the UK?",
    answer:
      "Assess the candidate's Salesforce experience, relevant cloud expertise, implementation background, technical capability, communication skills, problem-solving ability, and experience working within teams like yours.",
  },
  {
    question: "What if I want to build a dedicated Salesforce team?",
    answer:
      "We can build a team around the capabilities your roadmap requires. Start with a Salesforce developer and administrator, then add consultants, architects, project managers, Revenue Cloud specialists, Data Cloud specialists, or other Salesforce professionals (based on your requirements).",
  },
  {
    question:
      "Can ProvidusCRM support both contract and permanent Salesforce staffing needs?",
    answer:
      "Choose hourly Salesforce talent for flexible requirements or full-time Salesforce professionals for ongoing delivery. You can also scale the engagement when your Salesforce workload changes.",
  },
  {
    question:
      "How quickly can ProvidusCRM deliver Salesforce recruitment solutions?",
    answer:
      "Get on a discovery call with our Salesforce consultants and business analysts. We review the profiles and capabilities you require and pick out the best-matched candidates from our global talent pool. You get a faster route to relevant Salesforce candidates because the search starts with your technical requirements.",
  },
];

export async function generateMetadata() {
  return generateStaticPageMetadata("staff-augmentation", {
    title: "Staff Augmentation Services",
    description: DESCRIPTION,
    canonicalPath: "/salesforce-recruitment-agency",
    image: "/images/staff-augmentation/hero.webp",
  });
}

export default async function SalesforceStaffAugmentationPage() {
  const caseStudies = await getPageCaseStudies("staff-augmentation");
  const caseStudyCards =
    caseStudies.cards.length > 0 ? caseStudies.cards : FALLBACK_CASE_STUDIES;
  const blogs = await getPageBlogs("staff-augmentation");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Staff Augmentation Services",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/salesforce-recruitment-agency",
    serviceType: "Staff Augmentation",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd(
    "staff-augmentation",
    schema
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="Salesforce Recruitment Company"
        subtitleAsH1
        title={
          <>
            Certified.
            <br />
            Pre-Vetted.
            <br />
            Salesforce Talent.{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        hideCta
        image="/images/staff-augmentation/hero.webp"
        // Landscape artwork with a transparent background: contain, not the
        // default cover, which crops the panel off both edges.
        imageClassName="object-contain object-center"
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. Intro band */}
      <RecruitmentIntroSection />

      {/* 4. Case studies — selected in Sanity ("Page case studies" → Staff Augmentation) */}
      <ServiceCaseStudiesSection
        title={caseStudies.title}
        caseStudies={caseStudyCards}
        viewAllHref="/case-studies"
      />

      {/* 5. Salesforce talent we offer */}
      <TalentPillsSection />

      {/* 6. Choose the right hiring model */}
      <HiringModelsSection />

      {/* 7. How Salesforce recruitment works at ProvidusCRM */}
      <ProcessStepsSection />

      {/* 8. Recruitment experts CTA */}
      <SalesforceConsultCtaSection
        title="Reach Out To Our Salesforce Recruitment Experts To Hire Top CRM Talent!"
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        backgroundColor="linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)"
        image="/images/staff-augmentation/recruitment-experts.webp"
        imageAlt="A ProvidusCRM recruiter, with a list of the Salesforce roles she places"
        buttonVariant="white"
      />

      {/* 9. Featured roles */}
      <FeaturedRolesSection />

      {/* 10. Industries we serve */}
      <IndustriesSection
        title="How We Implement Salesforce Across Industries"
        items={INDUSTRIES}
      />

      {/* 11. Platform expertise */}
      <ExpertisePlatformsSection
        title="Our End-to-End Salesforce Platform Expertise"
        items={PLATFORM_EXPERTISE}
      />

      {/* 12. Why ProvidusCRM */}
      <WhyBandSection />

      {/* 13. FAQs */}
      <FaqSection title="Frequently Asked Questions" faqs={FAQS} />

      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}

      {/* 14. CTA */}
      <CtaSection
        title="Ready To Scale Your Salesforce Team?"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
