import {
  HeroSection,
  CtaSection,
  CertifiedSection,
  WhatWeDoSection,
  EcosystemSection,
  ExpertiseSection,
  IndustriesSection,
  WhyChooseSection,
  PageBlogsSection,
} from "@/components/sections";
import NextDynamic from "next/dynamic";

const PartnersSection = NextDynamic(() => import("@/components/sections/PartnersSection").then((mod) => mod.PartnersSection));
const TeamSection = NextDynamic(() => import("@/components/sections/TeamSection").then((mod) => mod.TeamSection));
const BentoSection = NextDynamic(() => import("@/components/sections/BentoSection").then((mod) => mod.BentoSection));

import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { getPageBlogs } from "@/lib/pageBlogs";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export const dynamic = "force-static";

export async function generateMetadata() {
  return generateStaticPageMetadata("home", {
    title: "ProvidusCRM | Certified Salesforce Partner UK",
    description:
      "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
    canonicalPath: "/",
    image: "/images/salesforce-partner.webp",
  });
}

export default async function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://providuscrm.co.uk/#organization",
        "name": "ProvidusCRM",
        "url": "https://providuscrm.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://providuscrm.co.uk/images/salesforce-partner.webp"
        },
        "description": "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
        "email": "info@providuscrm.co.uk",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GB"
        },
        "knowsAbout": [
          "Salesforce Consulting",
          "Salesforce Development",
          "Salesforce Implementation",
          "Salesforce Integration",
          "Salesforce Migration",
          "Salesforce Managed Services",
          "CRM Consulting"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://providuscrm.co.uk/#website",
        "url": "https://providuscrm.co.uk",
        "name": "ProvidusCRM",
        "publisher": {
          "@id": "https://providuscrm.co.uk/#organization"
        }
      }
    ]
  };
  const jsonLd = await getSitePageJsonLd("home", schema);
  const blogs = await getPageBlogs("home");

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection />
      <PartnersSection />
      <CertifiedSection />
      <EcosystemSection />
      <BentoSection />
      <WhatWeDoSection />
      <ExpertiseSection />
      <IndustriesSection />
      <WhyChooseSection />
      <TeamSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection />
    </>
  );
}
