import { WhyChooseSection, reasons as DEFAULT_REASONS } from "@/components/sections/WhyChooseSection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface WhyChooseSectionData extends SectionBase {
  _type: "whyChooseSection";
  title?: string;
  reasons?: {
    _key: string;
    title?: string;
    text?: string;
    color?: string;
    icon?: SanityImageValue;
  }[];
  image?: SanityImageValue;
  backgroundOverlayColor?: string;
}

export const whyChooseSectionAdapter: SectionAdapter<WhyChooseSectionData> = (s) => {
  const reasons = (s.reasons ?? []).map((r, i) => {
    // A reason always draws an icon and a title colour, so an unset one takes
    // the standard reason's at the same position.
    const fallback = DEFAULT_REASONS[i % DEFAULT_REASONS.length];
    return {
      title: r.title ?? "",
      text: r.text ?? "",
      color: r.color || fallback.color,
      icon: imageSrc(r.icon) ?? fallback.icon,
    };
  });
  return (
    <WhyChooseSection
      title={s.title || undefined}
      customReasons={reasons.length ? reasons : undefined}
      image={imageSrc(s.image)}
      imageAlt={imageAlt(s.image)}
      backgroundOverlayColor={s.backgroundOverlayColor || undefined}
    />
  );
};
