import { ExpertisePlatformsSection } from "@/components/sections/ExpertisePlatformsSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertisePlatformsSectionData extends SectionBase {
  _type: "expertisePlatformsSection";
  title?: string;
  items?: {
    _key: string;
    title?: string;
    text?: string;
    icon?: SanityImageValue;
    bgGradient?: string;
    href?: string;
  }[];
}

export const expertisePlatformsSectionAdapter: SectionAdapter<ExpertisePlatformsSectionData> = (s) => (
  <ExpertisePlatformsSection
    title={s.title ?? ""}
    items={(s.items ?? []).map((item) => ({
      title: item.title ?? "",
      text: item.text ?? "",
      // The card draws the icon only when it has one.
      icon: imageSrc(item.icon) ?? "",
      bgGradient: item.bgGradient ?? "",
      // Empty means "use the title lookup", exactly like a page still in code.
      href: item.href || undefined,
    }))}
  />
);
