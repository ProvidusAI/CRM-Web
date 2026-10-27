import { ExpertiseStackSection } from "@/components/sections/ExpertiseStackSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExpertiseStackSectionData extends SectionBase {
  _type: "expertiseStackSection";
  items?: {
    _key: string;
    title?: string;
    subtitle?: string;
    text?: string;
    color?: string;
    icon?: SanityImageValue;
    image?: SanityImageValue;
    href?: string;
    hidden?: boolean;
  }[];
}

export const expertiseStackSectionAdapter: SectionAdapter<ExpertiseStackSectionData> = (s) => (
  <ExpertiseStackSection
    // No items keeps the component's DEFAULT_STACK_ITEMS, like an omitted prop.
    items={
      s.items?.length
        ? s.items.flatMap((item) => {
            const icon = imageSrc(item.icon);
            const image = imageSrc(item.image);
            // next/image throws on an empty src, so an unfinished item is skipped.
            if (!icon || !image) return [];
            return [
              {
                title: item.title ?? "",
                subtitle: item.subtitle ?? "",
                text: item.text ?? "",
                color: item.color ?? "",
                icon,
                image,
                href: item.href || undefined,
                hidden: item.hidden,
              },
            ];
          })
        : undefined
    }
  />
);
