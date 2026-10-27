import { ExpertiseChallengesSection } from "@/components/sections/ExpertiseChallengesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseChallengesSectionData extends SectionBase {
  _type: "expertiseChallengesSection";
  title?: MarkHeadingValue;
  items?: { _key: string; title?: string; text?: string; icon?: SanityImageValue }[];
}

export const expertiseChallengesSectionAdapter: SectionAdapter<ExpertiseChallengesSectionData> = (s) => (
  <ExpertiseChallengesSection
    title={renderMarkHeading(s.title)}
    items={(s.items ?? []).map((item) => ({
      title: item.title ?? "",
      text: item.text ?? "",
      // Rendered as a CSS mask, not next/image, so a missing icon is harmless.
      icon: imageSrc(item.icon) ?? "",
    }))}
  />
);
