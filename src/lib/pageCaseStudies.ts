import "server-only";

import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PAGE_CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import type { PageCaseStudies, SanityImage } from "@/sanity/lib/types";

export type PageCaseStudyKey =
  | "home"
  | "about"
  | "services"
  | "platform-expertise"
  | "industries"
  | "partnership"
  | "salesforce-sales-cloud-consulting"
  | "salesforce-service-cloud-consulting"
  | "salesforce-marketing-cloud-consulting"
  | "salesforce-experience-cloud-consulting"
  | "salesforce-data-cloud-consulting"
  | "salesforce-agentforce-consulting"
  | "salesforce-commerce-cloud-consulting"
  | "salesforce-health-cloud-consulting"
  | "salesforce-nonprofit-consulting"
  | "salesforce-financial-services-cloud-consulting"
  | "staff-augmentation";

interface PageCaseStudiesResult {
  /** Optional heading override. Undefined falls back to the section default. */
  title?: string;
  /** Empty when no document exists or none are selected — the section then hides. */
  cards: ServiceCaseStudyCard[];
}

function imageUrl(image?: SanityImage) {
  return image?.asset?.url;
}

/**
 * Fetches the case studies an editor selected for a given page in Sanity
 * ("Page case studies" document, keyed by pageKey).
 */
export async function getPageCaseStudies(
  pageKey: PageCaseStudyKey
): Promise<PageCaseStudiesResult> {
  const data = await sanityFetch<PageCaseStudies>({
    query: PAGE_CASE_STUDIES_QUERY,
    params: { pageKey },
    tags: ["page-case-studies", "case-studies"],
  });

  const cards = (data?.caseStudies ?? []).map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    image: imageUrl(caseStudy.coverImage) || "/images/case-study.webp",
    label: caseStudy.technologies?.[0] || "Salesforce Consulting",
    category: caseStudy.industry,
  }));

  return { title: data?.sectionTitle, cards };
}
