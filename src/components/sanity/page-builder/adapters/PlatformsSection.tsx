import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface PlatformsSectionData extends SectionBase {
  _type: "platformsSection";
  title?: string;
  logos?: SanityImageValue[];
}

export const platformsSectionAdapter: SectionAdapter<PlatformsSectionData> = (s) => {
  // next/image throws on an empty src, so a logo without an upload is skipped.
  const logos = (s.logos ?? []).flatMap((logo) => {
    const src = imageSrc(logo);
    return src ? [{ src, alt: imageAlt(logo, "Platform Logo") ?? "Platform Logo" }] : [];
  });
  return (
    <PlatformsSection
      title={s.title || undefined}
      logos={logos.length ? logos.map((l) => l.src) : undefined}
      alts={logos.length ? logos.map((l) => l.alt) : undefined}
    />
  );
};
