import { ExpertiseFeaturesSection } from "@/components/sections/ExpertiseFeaturesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseFeaturesSectionData extends SectionBase {
  _type: "expertiseFeaturesSection";
  features?: { _key: string; title?: string; description?: string; icon?: SanityImageValue }[];
}

export const expertiseFeaturesSectionAdapter: SectionAdapter<ExpertiseFeaturesSectionData> = (s) => (
  <ExpertiseFeaturesSection
    // next/image throws on an empty src, so a feature without an upload is skipped.
    features={(s.features ?? []).flatMap((feature) => {
      const icon = imageSrc(feature.icon);
      return icon ? [{ title: feature.title ?? "", description: feature.description ?? "", icon }] : [];
    })}
  />
);
