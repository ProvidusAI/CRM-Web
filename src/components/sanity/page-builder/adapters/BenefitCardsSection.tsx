import { BenefitCardsSection } from "@/components/sections/BenefitCardsSection";
import { imageAlt, imageSize, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface BenefitCardsSectionData extends SectionBase {
  _type: "benefitCardsSection";
  title?: string;
  image?: SanityImageValue;
  items?: {
    _key: string;
    title?: string;
    description?: string;
    icon?: SanityImageValue;
  }[];
}

export const benefitCardsSectionAdapter: SectionAdapter<BenefitCardsSectionData> = (s) => {
  const src = imageSrc(s.image);
  const size = imageSize(s.image);
  return (
    <BenefitCardsSection
      title={s.title ?? ""}
      image={src && size ? { src, alt: imageAlt(s.image, s.title) ?? "", ...size } : undefined}
      // No cards render nothing, like an unfinished section.
      items={(s.items ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
        iconSrc: imageSrc(item.icon),
      }))}
    />
  );
};
