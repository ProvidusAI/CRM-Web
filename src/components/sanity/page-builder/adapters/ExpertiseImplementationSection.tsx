import { ExpertiseImplementationSection } from "@/components/sections/ExpertiseImplementationSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseImplementationSectionData extends SectionBase {
  _type: "expertiseImplementationSection";
  heading?: MarkHeadingValue;
  items?: { _key: string; title?: string; text?: string; image?: SanityImageValue }[];
}

export const expertiseImplementationSectionAdapter: SectionAdapter<ExpertiseImplementationSectionData> = (s) => (
  <ExpertiseImplementationSection
    heading={renderMarkHeading(s.heading)}
    // next/image throws on an empty src, so an item without an upload is skipped.
    items={(s.items ?? []).flatMap((item) => {
      const image = imageSrc(item.image);
      return image ? [{ title: item.title ?? "", text: item.text ?? "", image }] : [];
    })}
  />
);
