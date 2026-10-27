import { ServiceCaseStudiesSection } from "@/components/sections/ServiceCaseStudiesSection";
import { toServiceCaseStudyCards, type CaseStudyCardSource } from "@/lib/caseStudyCards";
import type { SectionAdapter, SectionBase } from "../types";

export interface ServiceCaseStudiesSectionData extends SectionBase {
  _type: "serviceCaseStudiesSection";
  title?: string;
  /** Dereferenced by the page query; a reference to a deleted document arrives as null. */
  caseStudies?: (CaseStudyCardSource | null)[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export const serviceCaseStudiesSectionAdapter: SectionAdapter<ServiceCaseStudiesSectionData> = (s) => {
  const cards = toServiceCaseStudyCards((s.caseStudies ?? []).filter((c) => c != null));
  // No case studies, no section: same as the page's `cards.length > 0 &&` guard today.
  if (cards.length === 0) return null;
  return (
    <ServiceCaseStudiesSection
      title={s.title || undefined}
      caseStudies={cards}
      viewAllHref={s.viewAllHref || undefined}
      viewAllLabel={s.viewAllLabel || undefined}
    />
  );
};
