import { IdentityResolutionSection } from "@/components/sections/IdentityResolutionSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface IdentityResolutionSectionData extends SectionBase {
  _type: "identityResolutionSection";
  headingStart?: string;
  headingEnd?: string;
  introParagraphs?: string[];
  desktopImage?: SanityImageValue;
  mobileImage?: SanityImageValue;
  columns?: { _key: string; title?: string; paragraphs?: string[] }[];
}

// Every field is optional: an empty one leaves the component's own default.
export const identityResolutionSectionAdapter: SectionAdapter<IdentityResolutionSectionData> = (s) => (
  <IdentityResolutionSection
    headingStart={s.headingStart || undefined}
    headingEnd={s.headingEnd || undefined}
    introParagraphs={s.introParagraphs?.length ? s.introParagraphs : undefined}
    desktopImage={imageSrc(s.desktopImage)}
    desktopImageAlt={imageAlt(s.desktopImage)}
    mobileImage={imageSrc(s.mobileImage)}
    mobileImageAlt={imageAlt(s.mobileImage)}
    columns={s.columns?.length ? s.columns.map((c) => ({ title: c.title ?? "", paragraphs: c.paragraphs ?? [] })) : undefined}
  />
);
