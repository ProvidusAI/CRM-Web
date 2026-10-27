import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ComparisonSectionData extends SectionBase {
  _type: "comparisonSection";
  heading?: MarkHeadingValue;
  subtitle?: string;
  negativeTitle?: string;
  negativeItems?: string[];
  positiveTitle?: string;
  positiveItems?: string[];
  footnote?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export const comparisonSectionAdapter: SectionAdapter<ComparisonSectionData> = (s) => (
  <ComparisonSection
    heading={renderMarkHeading(s.heading)}
    subtitle={s.subtitle || undefined}
    negativeTitle={s.negativeTitle ?? ""}
    negativeItems={s.negativeItems ?? []}
    positiveTitle={s.positiveTitle ?? ""}
    positiveItems={s.positiveItems ?? []}
    footnote={s.footnote || undefined}
    buttonLabel={s.buttonLabel || undefined}
    buttonHref={s.buttonHref || undefined}
  />
);
