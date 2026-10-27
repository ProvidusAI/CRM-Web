import type { Metadata } from "next";
import {
  HeroSection,
  PartnersSection,
  CaseStudiesSection,
  CtaSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import type { CaseStudyListItem } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("case-studies", {
    title: "Case Studies",
    description:
      "Explore real-world ProvidusCRM Salesforce implementations, automation projects, and customer operations success stories.",
    canonicalPath: "/case-studies",
    image: "/images/case-study.webp",
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await sanityFetch<CaseStudyListItem[]>({
    query: CASE_STUDIES_QUERY,
    tags: ["case-studies"],
  });

  const caseStudyCards = (caseStudies ?? []).map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    description: caseStudy.excerpt ?? "",
    image: caseStudy.coverImage?.asset?.url ?? "/images/case-study.webp",
    badges: caseStudy.technologies ?? [],
    resultSummary: caseStudy.resultSummary,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Studies | ProvidusCRM",
    "description": "Explore real-world ProvidusCRM Salesforce implementations, automation projects, and customer operations success stories.",
    "url": "https://providuscrm.co.uk/case-studies",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": caseStudyCards.length,
      "itemListElement": caseStudyCards.map((cs, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Article",
          "headline": cs.title,
          "description": cs.description,
          "image": cs.image,
          "url": `https://providuscrm.co.uk/case-studies/${cs.slug}`
        }
      }))
    }
  };
  const jsonLd = await getSitePageJsonLd("case-studies", schema);

  const heroTitle = (
    <>
      Our Case Studies
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection title={heroTitle} hideImage />
      <PartnersSection />
      <CaseStudiesSection caseStudies={caseStudyCards} />
      <CtaSection />
    </>
  );
}

