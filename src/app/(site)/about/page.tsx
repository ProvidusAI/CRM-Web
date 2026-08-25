import {
  HeroSection,
  PartnersSection,
  CertifiedSection,
  BelieveSection,
  TeamThoughtsSection,
  PlatformsSection,
  ExploreSection,
  CtaSection,
  PageBlogsSection
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("about", {
    title: "About Us",
    description:
      "Professional Salesforce services grounded in certified expertise from a UK Salesforce partner.",
    canonicalPath: "/about",
    image: "/images/about-us-hero.webp",
  });
}

export default async function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us | ProvidusCRM",
    "description": "Professional Salesforce Services Grounded in Certified Expertise. We are a certified Salesforce partner in the UK, specializing in tailored CRM consulting.",
    "url": "https://providuscrm.co.uk/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ProvidusCRM",
      "url": "https://providuscrm.co.uk",
      "logo": "https://providuscrm.co.uk/images/salesforce-partner.webp",
      "description": "Certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more."
    }
  };
  const jsonLd = await getSitePageJsonLd("about", schema);
  const blogs = await getPageBlogs("about");

  const heroTitle = (
    <>
      Get to Know Your <br />
      CRM Experts{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection
        title={heroTitle}
        description="Professional Salesforce Services Grounded in Certified Expertise"
        image="/images/about-us-hero.webp"
        imageClassName="object-contain p-4"
      />
      <PartnersSection />
      <CertifiedSection
        title="Who We Are"
        description="We're not a generic Salesforce consultancy providing run-of-the-mill implementations. We align your CRM org with your challenges, building solutions that drive impact. ProvidusCRM, a subsidiary of Providus, is a certified Salesforce partner based in the UK, working with organisations across nonprofit, financial services, healthcare, and more to implement Salesforce effectively across their workflows, challenges, and goals."
      />
      <BelieveSection />
      <PlatformsSection
        title="Built On Partnerships With the World's Top Platforms"
        limit={4}
      />
      <TeamThoughtsSection />
      <ExploreSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to Reinvent Your CRM?" />
    </>
  );
}

