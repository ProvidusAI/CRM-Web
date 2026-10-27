import { SplitComparisonSection } from "@/components/sections/SplitComparisonSection";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface SplitComparisonSectionData extends SectionBase {
  _type: "splitComparisonSection";
  heading?: MarkHeadingValue;
  subtitle?: string;
  cards?: { _key: string; title?: MarkHeadingValue; text?: string; color?: string }[];
  className?: string;
}

export const splitComparisonSectionAdapter: SectionAdapter<SplitComparisonSectionData> = (s) => (
  <SplitComparisonSection
    heading={renderMarkHeading(s.heading)}
    subtitle={s.subtitle || undefined}
    // No cards stay an empty list, which the component renders as nothing.
    cards={(s.cards ?? []).map((card) => ({
      title: renderMarkHeading(card.title),
      text: card.text ?? "",
      color: card.color ?? "",
    }))}
    className={s.className || undefined}
  />
);
