import Image from "next/image";
import {
  HeroSection,
  PartnersSection,
  ServiceCaseStudiesSection,
  SalesforceConsultCtaSection,
  CtaSection,
} from "@/components/sections";
import { FeaturedRolesCarousel } from "./FeaturedRolesCarousel";
import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
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
];

const SPECIALIST_ROLES = [
  "Salesforce Delivery Managers",
  "Salesforce Product Managers",
  "Salesforce CPQ & Revenue Cloud Specialists",
  "Salesforce Marketing Cloud Specialists",
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
}

// Figma 460:26–460:164 — same dashed-connector/icon-card recipe as
// ServiceBenefitsSection, but the six icons are custom raster images rather
// than Lucide glyphs, so this stays a local block reusing its gradient values.
const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Kickoff call",
    text: "We analyse your requirements and define the Salesforce role, required certifications, technical stack, project scope, seniority, availability, and timeline.",
    icon: "/images/staff-augmentation/process-icon-kickoff-call.png",
  },
  {
    title: "Choose from our talent pool",
    text: "Browse through our network of Salesforce developers, administrators, consultants, architects, and project managers. We match candidates against your technical and business requirements.",
    icon: "/images/staff-augmentation/process-icon-choose-talent.png",
  },
  {
    title: "Review talent profiles",
    text: "We provide detailed candidate profiles with relevant experience, Salesforce expertise, certifications, technical capabilities, and per-hour rates.",
    icon: "/images/staff-augmentation/process-icon-review-profiles.png",
  },
  {
    title: "Agreement and onboarding",
    text: "Once you choose to hire a Salesforce professional, ProvidusCRM handles the agreement, invoicing, payment, compliance, and onboarding process.",
    icon: "/images/staff-augmentation/process-icon-agreement-onboarding.png",
  },
  {
    title: "Scale on demand",
    text: "Add specialists when project demand increases. Reduce capacity when it decreases. Build a larger delivery team when your Salesforce roadmap expands.",
    icon: "/images/staff-augmentation/process-icon-scale-on-demand.png",
  },
  {
    title: "Continuous support",
    text: "ProvidusCRM stays involved even after equipping you with the Salesforce talent of your choice. We support communication, collaboration, performance, and resource requirements.",
    icon: "/images/staff-augmentation/process-icon-continuous-support.png",
  },
];

// Figma gradient fills (top-transparent to bottom-solid), one per step, in
// source order. None land on an exact @theme token, so they're copied
// verbatim from Figma rather than forced onto a near-miss token.
const PROCESS_STEP_GRADIENTS = [
  "to-[#dcf1ff]",
  "to-[#dcffee]",
  "to-[#fffbdc]",
  "to-[#ffebdc]",
  "to-[#ffdcf8]",
  "to-[#e5dcff]",
] as const;

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
  return generateStaticPageMetadata("salesforce-staff-augmentation", {
    title: "Salesforce Staff Augmentation Services",
    description: DESCRIPTION,
    canonicalPath: "/services/salesforce-staff-augmentation",
    image: "/images/staff-augmentation/hero.webp",
  });
}

export default async function SalesforceStaffAugmentationPage() {
  const caseStudies = await getPageCaseStudies("salesforce-staff-augmentation");
  const caseStudyCards =
    caseStudies.cards.length > 0 ? caseStudies.cards : FALLBACK_CASE_STUDIES;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Salesforce Staff Augmentation Services",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/services/salesforce-staff-augmentation",
    serviceType: "Salesforce Staff Augmentation",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd(
    "salesforce-staff-augmentation",
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
                    <Heading as="h4" className="text-black">
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
                    PROCESS_STEP_GRADIENTS[index]
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
        backgroundColor="linear-gradient(60deg, #38a81b 37.293%, #a0ff88 91.441%)"
        image="/images/staff-augmentation/recruitment-experts.webp"
        imageAlt="A ProvidusCRM recruiter, with a list of the Salesforce roles she places"
      />

      {/* 9. Featured roles */}
      <FeaturedRolesCarousel />

      {/* 10. CTA */}
      <CtaSection
        title="Ready To Scale Your Salesforce Team?"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
