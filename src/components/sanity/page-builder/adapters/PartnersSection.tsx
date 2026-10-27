import NextDynamic from "next/dynamic";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { PartnerLogo } from "@/components/sections/PartnersSection";
import type { SectionAdapter, SectionBase } from "../types";

// Same split-point the home page uses, so the bundle is unchanged.
const PartnersSection = NextDynamic(() =>
  import("@/components/sections/PartnersSection").then((m) => m.PartnersSection),
);

export interface PartnersSectionData extends SectionBase {
  _type: "partnersSection";
  logos?: SanityImageValue[];
}

export const partnersSectionAdapter: SectionAdapter<PartnersSectionData> = (s) => {
  const logos = (s.logos ?? []).flatMap((logo, i): PartnerLogo[] => {
    const src = imageSrc(logo);
    return src ? [{ src, alt: imageAlt(logo, `Partner ${i + 1} logo`) ?? "" }] : [];
  });
  return <PartnersSection logos={logos.length ? logos : undefined} />;
};
