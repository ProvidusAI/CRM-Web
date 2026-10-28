import { ServiceCaseStudiesSection, type ServiceCaseStudyCard } from "@/components/sections/ServiceCaseStudiesSection";
import { toServiceCaseStudyCards, type CaseStudyCardSource } from "@/lib/caseStudyCards";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ServiceCaseStudiesSectionData extends SectionBase {
  _type: "serviceCaseStudiesSection";
  title?: string;
  /** Dereferenced by the page query; a reference to a deleted document arrives as null. */
  caseStudies?: (CaseStudyCardSource | null)[];
  /** Typed-in cards; used only when no (valid) case study is referenced. */
  inlineCards?: {
    _key: string;
    title?: string;
    slug?: string;
    image?: SanityImageValue;
    label?: string;
    category?: string;
  }[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

export const serviceCaseStudiesSectionAdapter: SectionAdapter<ServiceCaseStudiesSectionData> = (s) => {
  let cards = toServiceCaseStudyCards((s.caseStudies ?? []).filter((c) => c != null));
  if (cards.length === 0) {
    cards = (s.inlineCards ?? []).flatMap((c): ServiceCaseStudyCard[] => {
      const image = imageSrc(c.image);
      // next/image throws on an empty src, so a card without a cover is skipped.
      if (!image || !c.title || !c.slug) return [];
      return [{ title: c.title, slug: c.slug, image, label: c.label || undefined, category: c.category || undefined }];
    });
  }
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
