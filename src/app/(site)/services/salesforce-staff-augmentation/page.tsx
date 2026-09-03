import Image from "next/image";
import { HeroSection, PartnersSection, CtaSection } from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Text } from "@/components/ui/Typography";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "Your CRM innovation goals can't wait. Hire top 1% Salesforce talent from ProvidusCRM's global team, boasting certifications across the Salesforce ecosystem and implementation expertise spanning industries.";

export async function generateMetadata() {
  return generateStaticPageMetadata("salesforce-staff-augmentation", {
    title: "Salesforce Staff Augmentation Services",
    description: DESCRIPTION,
    canonicalPath: "/services/salesforce-staff-augmentation",
    image: "/images/staff-augmentation/hero.webp",
  });
}

export default async function SalesforceStaffAugmentationPage() {
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

      {/* 4. CTA */}
      <CtaSection
        title="Ready To Scale Your Salesforce Team?"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
