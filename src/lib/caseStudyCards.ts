import type { ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";

/** The fields a card needs; both the page-case-studies query and the page builder's projection supply them. */
export interface CaseStudyCardSource {
  title: string;
  slug: { current: string };
  coverImage?: { asset?: { url?: string } };
  technologies?: string[];
  industry?: string;
}

/**
 * Maps case-study documents onto card props.
 *
 * Kept out of `pageCaseStudies.ts` (which is `server-only`) so the page-builder
 * adapter and its spec can use the same mapping.
 */
export function toServiceCaseStudyCards(caseStudies?: CaseStudyCardSource[]): ServiceCaseStudyCard[] {
  return (caseStudies ?? []).map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    image: caseStudy.coverImage?.asset?.url || "/images/case-study.webp",
    label: caseStudy.technologies?.[0] || "Salesforce Consulting",
    category: caseStudy.industry,
  }));
}
