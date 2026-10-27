import { ExpertiseDescriptionSection } from "@/components/sections/ExpertiseDescriptionSection";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseDescriptionSectionData extends SectionBase {
  _type: "expertiseDescriptionSection";
  heading?: MarkHeadingValue;
  paragraphs?: string[];
  ctaText?: string;
  ctaHref?: string;
  hideCta?: boolean;
}

export const expertiseDescriptionSectionAdapter: SectionAdapter<ExpertiseDescriptionSectionData> = (s) => (
  <ExpertiseDescriptionSection
    heading={renderMarkHeading(s.heading)}
    paragraphs={s.paragraphs ?? []}
    ctaText={s.ctaText || undefined}
    ctaHref={s.ctaHref || undefined}
    hideCta={s.hideCta}
  />
);
