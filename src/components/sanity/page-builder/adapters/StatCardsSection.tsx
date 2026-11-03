import { StatCardsSection } from "@/components/sections/StatCardsSection";
import { imageSize, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface StatCardsSectionData extends SectionBase {
  _type: "statCardsSection";
  title?: string;
  items?: {
    _key: string;
    value?: string;
    image?: SanityImageValue;
    label?: string;
  }[];
}

export const statCardsSectionAdapter: SectionAdapter<StatCardsSectionData> = (s) => (
  <StatCardsSection
    title={s.title ?? ""}
    // No cards render nothing, like an unfinished section.
    items={(s.items ?? []).map((item) => {
      const src = imageSrc(item.image);
      const size = imageSize(item.image);
      return {
        label: item.label ?? "",
        value: item.value || undefined,
        image: src && size ? { src, ...size } : undefined,
      };
    })}
  />
);
