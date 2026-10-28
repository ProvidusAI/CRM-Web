import { HiringModelsSection } from "@/components/sections/HiringModelsSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface HiringModelsSectionData extends SectionBase {
  _type: "hiringModelsSection";
  title?: string;
  models?: {
    _key: string;
    title?: string;
    text?: string;
    borderClass?: string;
    shadowClass?: string;
  }[];
  image?: SanityImageValue;
}

export const hiringModelsSectionAdapter: SectionAdapter<HiringModelsSectionData> = (s) => {
  const image = imageSrc(s.image);
  return (
    <HiringModelsSection
      title={s.title || undefined}
      models={
        s.models?.length
          ? s.models.map((model) => ({
              title: model.title ?? "",
              text: model.text ?? "",
              borderClass: model.borderClass || undefined,
              shadowClass: model.shadowClass || undefined,
            }))
          : undefined
      }
      image={image}
      // A new photo takes its own alt, even an empty (decorative) one, never
      // the default photo's description.
      imageAlt={image ? (imageAlt(s.image) ?? "") : undefined}
    />
  );
};
