import Image from "next/image";
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
} from "@/components/sections";
import { FeaturedRolesCarousel } from "./FeaturedRolesCarousel";
import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import type { IndustrySectionItem } from "@/components/sections/IndustriesSection";
import type { ExpertisePlatformItem } from "@/components/sections/ExpertisePlatformsSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { cn } from "@/lib/utils";

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

const DEVELOPER_ROLES = [
  "Salesforce Developers",
  "Salesforce Administrators",
  "Salesforce Solution Architects",
  "Salesforce Technical Architects",
  "Salesforce Business Analysts",
  "Salesforce Project Managers",
  "Agentforce Specialists",
];

const SPECIALIST_ROLES = [
  "Salesforce Product Managers",
  "Salesforce Delivery Managers",
  "Salesforce CPQ & Revenue Cloud Specialists",
  "Salesforce Marketing Cloud Specialists",
  "Salesforce Service Cloud Specialists",
  "Salesforce Data Cloud Specialists",
];

interface HiringModelCard {
  title: string;
  text: string;
  borderClass: string;
  shadowClass: string;
}

// Figma 457:412 — card recipe (16px radius, 1px colored border, tinted
// drop shadow) matches SplitComparisonCard's, but the stacked-cards-beside-
// a-photo layout doesn't, so this stays a local, one-off block.
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

interface WhyReasonCard {
  title: string;
  text: string;
  icon: string;
  titleClass: string;
}

// Figma 462:566 / 463:708 / 463:710 — a full-bleed blue band (the backdrop is
// the exported, blue-tinted Figma render) carrying four white reason cards
// beside a photo panel. Only the last title colour lands on a token
// (--color-salesforce-blue); the other three are copied from Figma verbatim.
const WHY_REASONS: WhyReasonCard[] = [
  {
    title: "Certified Salesforce Expertise",
    text: "You get access to professionals with certifications across the Salesforce ecosystem, matched to the technical requirements of the role you need filled.",
    icon: "/images/staff-augmentation/why-icon-certified.webp",
    titleClass: "text-[#54a9da]",
  },
  {
    title: "Global Talent Pool",
    text: "You get access to a global Salesforce talent network when you are hiring in the UK. We don't limit you to candidates who only happen to be available in one specific region.",
    icon: "/images/staff-augmentation/why-icon-global.webp",
    titleClass: "text-[#769aeb]",
  },
  {
    title: "Flexible Hiring",
    text: "Not sure about hiring a complete team with Salesforce architects, developers, consultants, project managers, etc.? Start with one specialist before committing to a large team.",
    icon: "/images/staff-augmentation/why-icon-flexible.webp",
    titleClass: "text-[#eb8c3f]",
  },
  {
    title: "Salesforce Implementation Experience",
    text: "ProvidusCRM works across Salesforce consulting, implementation, development, integration, migration, and managed services. We understand the technical requirements behind the roles we recruit for.",
    icon: "/images/staff-augmentation/why-icon-implementation.webp",
    titleClass: "text-salesforce-blue",
  },
];

const HIRING_MODELS: HiringModelCard[] = [
  {
    title: "Hourly",
    text: "We equip you with on-demand Salesforce expertise whenever you need it, without having to hire a full-time professional. Best for project-based talent needs, support, and maintenance. You pay for the hours you use and can scale your Salesforce capacity as project requirements change.",
    borderClass: "border-[#33ff00]",
    shadowClass: "shadow-[0_7px_14px_0_rgba(51,255,0,0.21)]",
  },
  {
    title: "Full Time",
    text: "If you're looking for certified Salesforce professionals for long-term implementation, development, and delivery initiatives, we recommend hiring full-time talent. We enable you to hire dedicated Salesforce professionals who integrate with your internal team and work according to your long-term CRM roadmap.",
    borderClass: "border-migration-blue",
    shadowClass: "shadow-[0_7px_14px_0_rgba(48,143,255,0.21)]",
  },
];

interface ProcessStep {
  title: string;
  text: string;
  icon: string;
  gradient: string;
}

// Figma 460:26–460:164 — same dashed-connector/icon-card recipe as
// ServiceBenefitsSection, but the six icons are custom raster images rather
// than Lucide glyphs, so this stays a local block reusing its gradient values.
// Each step's `gradient` is a Figma gradient fill (top-transparent to
// bottom-solid); none land on an exact @theme token, so they're copied
// verbatim from Figma rather than forced onto a near-miss token.
const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Kickoff call",
    text: "We analyse your requirements and define the Salesforce role, required certifications, technical stack, project scope, seniority, availability, and timeline.",
    icon: "/images/staff-augmentation/process-icon-kickoff-call.png",
    gradient: "to-[#dcf1ff]",
  },
  {
    title: "Choose from our talent pool",
    text: "Browse through our network of Salesforce developers, administrators, consultants, architects, and project managers. We match candidates against your technical and business requirements.",
    icon: "/images/staff-augmentation/process-icon-choose-talent.png",
    gradient: "to-[#dcffee]",
  },
  {
    title: "Review talent profiles",
    text: "We provide detailed candidate profiles with relevant experience, Salesforce expertise, certifications, technical capabilities, and per-hour rates.",
    icon: "/images/staff-augmentation/process-icon-review-profiles.png",
    gradient: "to-[#fffbdc]",
  },
  {
    title: "Agreement and onboarding",
    text: "Once you choose to hire a Salesforce professional, ProvidusCRM handles the agreement, invoicing, payment, compliance, and onboarding process.",
    icon: "/images/staff-augmentation/process-icon-agreement-onboarding.png",
    gradient: "to-[#ffebdc]",
  },
  {
    title: "Scale on demand",
    text: "Add specialists when project demand increases. Reduce capacity when it decreases. Build a larger delivery team when your Salesforce roadmap expands.",
    icon: "/images/staff-augmentation/process-icon-scale-on-demand.png",
    gradient: "to-[#ffdcf8]",
  },
  {
    title: "Continuous support",
    text: "ProvidusCRM stays involved even after equipping you with the Salesforce talent of your choice. We support communication, collaboration, performance, and resource requirements.",
    icon: "/images/staff-augmentation/process-icon-continuous-support.png",
    gradient: "to-[#e5dcff]",
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

const PILL_VARIANTS = {
  blue: {
    icon: "/images/staff-augmentation/talent-icon-blue.svg",
    border: "border-migration-blue",
    bg: "bg-cost-card-blue",
    text: "text-[#0e3767]",
  },
  green: {
    icon: "/images/staff-augmentation/talent-icon-green.svg",
    border: "border-brand-green",
    bg: "bg-[#f7fff5]",
    text: "text-[#1a590a]",
  },
} as const;

function TalentPillsRow({
  roles,
  variant,
  reverse,
}: {
  roles: string[];
  variant: keyof typeof PILL_VARIANTS;
  reverse?: boolean;
}) {
  const styles = PILL_VARIANTS[variant];
  // Duplicated for a seamless marquee loop (see ExpertiseCertifiedSection for the same pattern).
  const items = [...roles, ...roles];

  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-fit items-center gap-4 animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {items.map((role, index) => (
          <span
            key={`${role}-${index}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-3 rounded-full border py-2 pl-2 pr-6",
              styles.border,
              styles.bg
            )}
          >
            <Image
              src={styles.icon}
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
            <Text
              variant="p2"
              as="span"
              className={cn("!font-semibold whitespace-nowrap", styles.text)}
            >
              {role}
            </Text>
          </span>
        ))}
      </div>
    </div>
  );
}

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
      <Section className="border-y border-migration-blue bg-[#eff6ff]">
        <Container>
          <div className="flex flex-col items-center gap-8 text-center">
            <Image
              src="/images/staff-augmentation/intro-icon.webp"
              alt=""
              aria-hidden="true"
              width={88}
              height={88}
              className="h-[88px] w-[88px] object-contain"
            />
            <Text
              variant="p1"
              className="max-w-5xl !text-[22px] !leading-snug text-black md:!text-[37px]"
            >
              We don&apos;t just provide you with certified Salesforce
              talent. Every Salesforce professional at ProvidusCRM is a
              problem solver, difference maker, and team player.{" "}
              <span className="font-bold text-migration-blue">
                You get access to top 1% global CRM talent with
                certifications across the Salesforce ecosystem and
                implementation expertise spanning industries.
              </span>
            </Text>
          </div>
        </Container>
      </Section>

      {/* 4. Case studies — selected in Sanity ("Page case studies" → Staff Augmentation) */}
      <ServiceCaseStudiesSection
        title={caseStudies.title}
        caseStudies={caseStudyCards}
        viewAllHref="/case-studies"
      />

      {/* 5. Salesforce talent we offer */}
      <Section className="overflow-hidden">
        <Container size="xl">
          <div className="text-center">
            <Image
              src="/images/green-line.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={24}
              className="mx-auto h-auto w-16"
            />
            <Heading as="h2" className="mt-5 text-black">
              Salesforce Talent We Offer
            </Heading>
          </div>
        </Container>

        <div className="mt-12 flex flex-col gap-6">
          <TalentPillsRow roles={DEVELOPER_ROLES} variant="blue" />
          <TalentPillsRow roles={SPECIALIST_ROLES} variant="green" reverse />
        </div>
      </Section>

      {/* 6. Choose the right hiring model */}
      <Section className="border-y border-brand-green bg-[#f6f6f6]">
        <Container>
          <div className="text-center">
            <Image
              src="/images/green-line.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={24}
              className="mx-auto h-auto w-16"
            />
            <Heading as="h2" className="mt-5 text-black">
              Choose The Right Hiring Model
            </Heading>
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              {HIRING_MODELS.map((model, index) => (
                <Reveal key={model.title} delay={index * 0.1}>
                  <div
                    className={cn(
                      "rounded-2xl border bg-white p-8 md:p-10",
                      model.borderClass,
                      model.shadowClass
                    )}
                  >
                    <Heading as="h3" level="h4" className="text-black">
                      {model.title}
                    </Heading>
                    <Text
                      variant="p4"
                      className="mt-4 text-text-body leading-relaxed"
                    >
                      {model.text}
                    </Text>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction="right">
              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[420px] lg:h-[500px]">
                <Image
                  src="/images/staff-augmentation/hiring-model-photo.webp"
                  alt="A recruiter reviewing a candidate's CV during a video interview"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. How Salesforce recruitment works at ProvidusCRM */}
      <Section className="overflow-hidden bg-white">
        <Container size="lg">
          <div className="text-center">
            <Image
              src="/images/green-line.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={24}
              className="mx-auto h-auto w-16"
            />
            <Heading as="h2" className="mx-auto mt-5 max-w-2xl text-black">
              How Salesforce Recruitment Works At ProvidusCRM
            </Heading>
          </div>

          <div className="relative mt-14 space-y-8">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <article
                  className={cn(
                    "relative rounded-[22px] bg-linear-to-b from-white p-6 shadow-sm md:p-8",
                    step.gradient
                  )}
                >
                  {index !== PROCESS_STEPS.length - 1 && (
                    <div className="absolute left-[63px] top-[64px] z-0 hidden h-[calc(100%+32px)] w-[2px] border-l-2 border-dashed border-brand-green-light md:block" />
                  )}

                  <div className="relative z-10 flex flex-row items-start gap-4 md:gap-6 lg:gap-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f7fcff] shadow-[0px_1px_1px_-1px_rgba(171,171,171,0.64),0px_2px_2px_-1px_rgba(171,171,171,0.63),0px_4px_4px_-2px_rgba(171,171,171,0.61),0px_7px_7px_-2px_rgba(171,171,171,0.58),0px_14px_14px_-3px_rgba(171,171,171,0.51)] md:h-[72px] md:w-[72px]">
                      <Image
                        src={step.icon}
                        alt=""
                        aria-hidden="true"
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain md:h-10 md:w-10"
                      />
                    </div>
                    <div className="flex-1 md:pt-1">
                      <Heading as="h3" level="h4" className="text-[#19689f]">
                        {step.title}
                      </Heading>
                      <Text variant="p2" className="mt-2 text-black md:mt-3">
                        {step.text}
                      </Text>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Recruitment experts CTA */}
      <SalesforceConsultCtaSection
        title="Reach Out To Our Salesforce Recruitment Experts To Hire Top CRM Talent!"
        buttonLabel="Let's Connect"
        buttonHref="/contact"
        backgroundColor="linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)"
        image="/images/staff-augmentation/recruitment-experts.webp"
        imageAlt="A ProvidusCRM recruiter, with a list of the Salesforce roles she places"
      />

      {/* 9. Featured roles */}
      <FeaturedRolesCarousel />

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
      <section className="relative overflow-hidden py-16 md:py-24">
        <Image
          src="/images/staff-augmentation/why-band-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        <Container className="relative z-10">
          <div className="text-center">
            <Image
              src="/images/green-line.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={24}
              className="mx-auto h-auto w-16"
            />
            <Heading as="h2" className="mx-auto mt-5 max-w-4xl text-white">
              What Makes ProvidusCRM A Leading Salesforce Recruitment Company in
              the UK
            </Heading>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col gap-4">
              {WHY_REASONS.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 0.08}>
                  <article className="rounded-[13px] bg-white p-6 md:p-7">
                    <div className="flex items-center gap-4">
                      <Image
                        src={reason.icon}
                        alt=""
                        aria-hidden="true"
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 object-contain"
                      />
                      <Heading
                        as="h3"
                        level="h4"
                        className={reason.titleClass}
                      >
                        {reason.title}
                      </Heading>
                    </div>
                    <Text variant="p4" className="mt-4 text-type-body">
                      {reason.text}
                    </Text>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal direction="right" height="100%" className="h-full">
              <div className="h-full rounded-[13px] bg-white p-3.5">
                <div className="relative h-full min-h-[280px] overflow-hidden rounded-[8px] sm:min-h-[400px]">
                  <Image
                    src="/images/staff-augmentation/checklist-handshake.webp"
                    alt="A recruiter and hiring manager shaking hands after a successful Salesforce placement"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

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
