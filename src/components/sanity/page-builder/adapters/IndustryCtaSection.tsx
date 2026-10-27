import { IndustryCtaSection } from "@/components/sections/IndustryCtaSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface IndustryCtaSectionData extends SectionBase {
  _type: "industryCtaSection";
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  image?: SanityImageValue;
}

export const industryCtaSectionAdapter: SectionAdapter<IndustryCtaSectionData> = (s) => {
  const image = imageSrc(s.image);
  // next/image throws on an empty src, so an unfinished section renders nothing.
  if (!image) return null;
  return (
    <IndustryCtaSection
      title={s.title ?? ""}
      buttonLabel={s.buttonLabel ?? ""}
      buttonHref={s.buttonHref ?? ""}
      image={image}
      imageAlt={imageAlt(s.image)}
    />
  );
};
