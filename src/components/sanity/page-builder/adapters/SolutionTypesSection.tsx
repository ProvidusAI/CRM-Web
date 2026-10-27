import { SolutionTypesSection } from "@/components/sections/SolutionTypesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface SolutionTypesSectionData extends SectionBase {
  _type: "solutionTypesSection";
  heading?: MarkHeadingValue;
  subtitle?: string;
  cards?: { _key: string; title?: string; text?: string; icon?: SanityImageValue; color?: string }[];
}

export const solutionTypesSectionAdapter: SectionAdapter<SolutionTypesSectionData> = (s) => (
  <SolutionTypesSection
    heading={renderMarkHeading(s.heading)}
    subtitle={s.subtitle || undefined}
    cards={
      s.cards?.length
        ? s.cards.map((card) => ({
            title: card.title ?? "",
            text: card.text ?? "",
            // Drawn as a CSS mask, not next/image, so a missing icon is harmless.
            icon: imageSrc(card.icon) ?? "",
            color: card.color ?? "",
          }))
        : undefined
    }
  />
);
