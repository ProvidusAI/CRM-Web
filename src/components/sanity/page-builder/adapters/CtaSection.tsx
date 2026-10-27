import { CtaSection } from "@/components/sections/CtaSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface CtaSectionData extends SectionBase {
  _type: "ctaSection";
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: SanityImageValue;
}

export const ctaSectionAdapter: SectionAdapter<CtaSectionData> = (s) => (
  <CtaSection
    title={s.title || undefined}
    buttonLabel={s.buttonLabel || undefined}
    buttonHref={s.buttonHref || undefined}
    backgroundImage={imageSrc(s.backgroundImage)}
  />
);
