import { ExpertiseCertifiedSection } from "@/components/sections/ExpertiseCertifiedSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseCertifiedSectionData extends SectionBase {
  _type: "expertiseCertifiedSection";
  images?: SanityImageValue[];
}

export const expertiseCertifiedSectionAdapter: SectionAdapter<ExpertiseCertifiedSectionData> = (s) => {
  // next/image throws on an empty src, so a badge without an upload is skipped.
  const badges = (s.images ?? []).flatMap((image) => {
    const src = imageSrc(image);
    return src ? [{ src, alt: imageAlt(image) ?? "" }] : [];
  });
  return <ExpertiseCertifiedSection images={badges.map((b) => b.src)} alts={badges.map((b) => b.alt)} />;
};
