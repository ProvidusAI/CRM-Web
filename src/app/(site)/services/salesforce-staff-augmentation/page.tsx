import Image from "next/image";
import {
  HeroSection,
  PartnersSection,
  ServiceCaseStudiesSection,
  CtaSection,
} from "@/components/sections";
import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
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

      {/* 6. CTA */}
      <CtaSection
        title="Ready To Scale Your Salesforce Team?"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
