import {
  HeroSection,
  IndustryDetailSection,
  PlatformsSection,
  ServiceCaseStudiesSection,
  CtaSection,
  PageBlogsSection
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("industries", {
    title: "Industries We Serve",
    description:
      "Salesforce implementation and CRM consulting for nonprofit, education, commerce, healthcare, financial services, and manufacturing organisations.",
    canonicalPath: "/industries",
    image: "/images/industries.webp",
  });
}

export default async function IndustriesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Industries We Serve | ProvidusCRM",
    "description": "Deep technical knowledge across every core Salesforce platform. We implement Salesforce effectively for Nonprofit, Education, Commerce, Healthcare, Financial Services, and Manufacturing industries.",
    "url": "https://providuscrm.co.uk/industries",
    "about": [
      {
        "@type": "Service",
        "name": "Salesforce for Nonprofit",
        "description": "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Education",
        "description": "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Commerce",
        "description": "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Healthcare",
        "description": "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Financial Services",
        "description": "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts."
      },
      {
        "@type": "Service",
        "name": "Salesforce for Manufacturing",
        "description": "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning."
      }
    ]
  };
  const [jsonLd, caseStudies, blogs] = await Promise.all([
    getSitePageJsonLd("industries", schema),
    getPageCaseStudies("industries"),
    getPageBlogs("industries"),
  ]);

  const heroTitle = (
    <>
      Industries We Serve{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection
        title={heroTitle}
        description="Explore how we help businesses across different industries make the most out of their Salesforce investments."
        image="/images/industries.webp"
        imageClassName="object-contain"
      />
      <IndustryDetailSection />
      <PlatformsSection />
      {/* Case Studies — selected in Sanity ("Page case studies" → Industries) */}
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to See How Salesforce Fits Your Industry?" />
    </>
  );
}

