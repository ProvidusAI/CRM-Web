import { ExpertiseSalesforceSection } from "@/components/sections/ExpertiseSalesforceSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseSalesforceSectionData extends SectionBase {
  _type: "expertiseSalesforceSection";
  heading?: MarkHeadingValue;
  text?: string;
  paragraphs?: string[];
  image?: SanityImageValue;
  imageVariant?: "contain" | "framed" | "framed-wide";
  hideMark?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export const expertiseSalesforceSectionAdapter: SectionAdapter<ExpertiseSalesforceSectionData> = (s) => {
  const image = imageSrc(s.image);
  // next/image throws on an empty src, so an unfinished section renders nothing.
  if (!image) return null;
  return (
    <ExpertiseSalesforceSection
      heading={renderMarkHeading(s.heading)}
      text={s.text || undefined}
      paragraphs={s.paragraphs?.length ? s.paragraphs : undefined}
      image={image}
      imageAlt={imageAlt(s.image)}
      imageVariant={s.imageVariant || undefined}
      hideMark={s.hideMark}
      ctaLabel={s.ctaLabel || undefined}
      ctaHref={s.ctaHref || undefined}
    />
  );
};
