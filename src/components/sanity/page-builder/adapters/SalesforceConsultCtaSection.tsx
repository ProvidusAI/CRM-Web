import { SalesforceConsultCtaSection } from "@/components/sections/SalesforceConsultCtaSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface SalesforceConsultCtaSectionData extends SectionBase {
  _type: "salesforceConsultCtaSection";
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundColor?: string;
  buttonVariant?: "filled" | "white";
  image?: SanityImageValue;
}

export const salesforceConsultCtaSectionAdapter: SectionAdapter<SalesforceConsultCtaSectionData> = (s) => (
  <SalesforceConsultCtaSection
    title={s.title || undefined}
    buttonLabel={s.buttonLabel || undefined}
    buttonHref={s.buttonHref || undefined}
    backgroundColor={s.backgroundColor || undefined}
    image={imageSrc(s.image)}
    imageAlt={imageAlt(s.image)}
    buttonVariant={s.buttonVariant || undefined}
  />
);
