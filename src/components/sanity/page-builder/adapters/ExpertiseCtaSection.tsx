import { ExpertiseCtaSection } from "@/components/sections/ExpertiseCtaSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseCtaSectionData extends SectionBase {
  _type: "expertiseCtaSection";
  title?: string;
  titleHref?: string;
  buttonText?: string;
  buttonHref?: string;
  image1?: SanityImageValue;
  image2?: SanityImageValue;
}

export const expertiseCtaSectionAdapter: SectionAdapter<ExpertiseCtaSectionData> = (s) => {
  const image1 = imageSrc(s.image1);
  const image2 = imageSrc(s.image2);
  // next/image throws on an empty src, so an unfinished section renders nothing.
  if (!image1 || !image2) return null;
  return (
    <ExpertiseCtaSection
      title={s.title ?? ""}
      titleHref={s.titleHref || undefined}
      buttonText={s.buttonText ?? ""}
      buttonHref={s.buttonHref ?? ""}
      image1={image1}
      image2={image2}
      image1Alt={imageAlt(s.image1)}
      image2Alt={imageAlt(s.image2)}
    />
  );
};
