import { HeroSection } from "@/components/sections/HeroSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface HeroSectionData extends SectionBase {
  _type: "heroSection";
  title?: MarkHeadingValue;
  subtitle?: string;
  subtitleAsH1?: boolean;
  description?: string;
  bullets?: string[];
  image?: SanityImageValue;
  imageClassName?: string;
  hideImage?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "white" | "filled";
  ctaSize?: "sm" | "md";
  hideCta?: boolean;
}

export const heroSectionAdapter: SectionAdapter<HeroSectionData> = (s) => (
  <HeroSection
    title={renderMarkHeading(s.title)}
    subtitle={s.subtitle || undefined}
    subtitleAsH1={s.subtitleAsH1}
    description={s.description || undefined}
    bullets={s.bullets?.length ? s.bullets : undefined}
    image={imageSrc(s.image)}
    imageAlt={imageAlt(s.image)}
    imageClassName={s.imageClassName || undefined}
    hideImage={s.hideImage}
    ctaLabel={s.ctaLabel || undefined}
    ctaHref={s.ctaHref || undefined}
    ctaVariant={s.ctaVariant || undefined}
    ctaSize={s.ctaSize || undefined}
    hideCta={s.hideCta}
  />
);
