import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseSectionData extends SectionBase {
  _type: "expertiseSection";
  title?: string;
  items?: {
    _key: string;
    title?: string;
    text?: string;
    icon?: SanityImageValue;
    shadow?: string;
    href?: string;
  }[];
}

export const expertiseSectionAdapter: SectionAdapter<ExpertiseSectionData> = (s) => (
  <ExpertiseSection
    title={s.title || undefined}
    // No items keeps the component's default expertiseItems, like an omitted prop.
    items={
      s.items?.length
        ? s.items.flatMap((item) => {
            const icon = imageSrc(item.icon);
            // next/image throws on an empty src, so an item without an upload is skipped.
            if (!icon) return [];
            return [
              {
                id: item._key,
                title: item.title ?? "",
                text: item.text ?? "",
                icon,
                shadow: item.shadow ?? "",
                href: item.href || undefined,
              },
            ];
          })
        : undefined
    }
  />
);
