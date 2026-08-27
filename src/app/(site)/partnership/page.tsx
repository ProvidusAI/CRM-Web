import {
  HeroSection,
  PartnersSection,
  CertifiedSection,
  BelieveSection,
  PlatformsSection,
  ServiceCaseStudiesSection,
  CtaSection,
  PageBlogsSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("partnership", {
    title: "Partnership",
    description:
      "Certified Salesforce expertise backed by a wider partner ecosystem — FinDock, FundraiseUp, Dotdigital, and the platforms we build on.",
    canonicalPath: "/partnership",
    image: "/images/partnership-hero.webp",
  });
}

const partnershipCards = [
  {
    title: "Salesforce",
    description:
      "Providus (operating as ProvidusCRM in the UK) is a certified Salesforce consulting partner, having successfully delivered proven CRM solutions across Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Agentforce, and industry clouds including Nonprofit Cloud, Health Cloud, and Financial Services Cloud.",
    icon: "/images/partnership-logos/salesforce.png",
    bgImage: "/images/build-matters-bg.webp",
  },
  {
    title: "FinDock",
    description:
      "As a FinDock partner, we configure payment architecture inside Salesforce for nonprofits and subscription-based businesses. FinDock connects Salesforce to payment processors, direct debit systems, and recurring giving platforms, keeping payment data inside your CRM rather than in disconnected finance systems.",
    icon: "/images/partnership-logos/findock.png",
    bgImage: "/images/get-it-right-bg.webp",
  },
  {
    title: "FundraiseUp",
    description:
      "We are a certified FundraiseUp partner, implementing conversion-optimised donation experiences for nonprofits, connected directly to Salesforce Nonprofit Cloud and NPSP. Donation forms, recurring giving, and donor facing checkout flows sit within FundraiseUp while donor data lands cleanly in Salesforce.",
    icon: "/images/partnership-logos/fundraiseup.png",
    bgImage: "/images/outcome-bg.webp",
  },
  {
    title: "DotDigital",
    description:
      "As a Dotdigital partner, we deliver marketing automation for organisations that need something between Marketing Cloud and lightweight email tools. Dotdigital integrates with Salesforce for segmentation, journeys, and reporting, particularly well-suited to nonprofits, higher education, and mid-market businesses.",
    icon: "/images/partnership-logos/dotdigital.png",
    bgImage: "/images/drive-self-bg.webp",
  },
];

const partnershipPlatformLogos = [
  "/images/partnership-logos/salesforce.png",
  "/images/partnership-logos/fundraiseup.png",
  "/images/partnership-logos/findock.png",
  "/images/partnership-logos/dotdigital.png",
  "/images/partnership-logos/mulesoft.png",
  "/images/partnership-logos/heroku.png",
  "/images/partnership-logos/aws.png",
  "/images/partnership-logos/azure.png",
  "/images/partnership-logos/kafka.png",
  "/images/partnership-logos/snowflake.png",
  "/images/partnership-logos/redshift.png",
  "/images/partnership-logos/elastic.png",
];

export default async function PartnershipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Partnership | ProvidusCRM",
    "description":
      "Certified Salesforce expertise backed by a wider partner ecosystem — FinDock, FundraiseUp, Dotdigital, and the platforms we build on.",
    "url": "https://providuscrm.co.uk/partnership",
    "mainEntity": {
      "@type": "Organization",
      "name": "ProvidusCRM",
      "url": "https://providuscrm.co.uk",
      "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
      "description":
        "Certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more.",
    },
  };
  const jsonLd = await getSitePageJsonLd("partnership", schema);
  const blogs = await getPageBlogs("partnership");
  const caseStudies = await getPageCaseStudies("partnership");

  const heroTitle = (
    <>
      Our Certified Expertise{" "}
      <br />
      & Partner Ecosystem{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection
        title={heroTitle}
        description="Certified Salesforce experts working alongside the platforms and partners that make CRM strategies whole."
        image="/images/partnership-hero.webp"
        imageClassName="object-contain p-4"
      />
      <PartnersSection />
      <CertifiedSection
        title="Certified Salesforce Expertise You Can Count On"
        description="Every Salesforce expert you'll come across when working with ProvidusCRM boasts several years of industry-wide experience and multiple certifications across Salesforce and our partner platforms."
      />
      <BelieveSection title="Our Partnerships" cards={partnershipCards} />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <PlatformsSection
        title="Platforms We Work With"
        logos={partnershipPlatformLogos}
      />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready To Talk About Your CRM Needs?" />
    </>
  );
}
