import { WhyBandSection } from "@/components/sections/WhyBandSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface WhyBandSectionData extends SectionBase {
  _type: "whyBandSection";
  title?: string;
  backgroundImage?: SanityImageValue;
  reasons?: {
    _key: string;
    title?: string;
    text?: string;
    icon?: SanityImageValue;
    titleClass?: string;
  }[];
  image?: SanityImageValue;
}

export const whyBandSectionAdapter: SectionAdapter<WhyBandSectionData> = (s) => {
  const image = imageSrc(s.image);
  return (
    <WhyBandSection
      title={s.title || undefined}
      backgroundImage={imageSrc(s.backgroundImage)}
      reasons={
        s.reasons?.length
          ? s.reasons.map((reason) => ({
              title: reason.title ?? "",
              text: reason.text ?? "",
              icon: imageSrc(reason.icon),
              titleClass: reason.titleClass || undefined,
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
