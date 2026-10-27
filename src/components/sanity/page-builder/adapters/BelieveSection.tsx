import { BelieveSection } from "@/components/sections/BelieveSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface BelieveSectionData extends SectionBase {
  _type: "believeSection";
  title?: string;
  cards?: {
    _key: string;
    title?: string;
    description?: string;
    icon?: SanityImageValue;
    bgImage?: SanityImageValue;
    bgColor?: string;
    href?: string;
  }[];
}

export const believeSectionAdapter: SectionAdapter<BelieveSectionData> = (s) => {
  const cards = (s.cards ?? []).flatMap((card) => {
    const icon = imageSrc(card.icon);
    // next/image throws on an empty src, so a card without an icon is skipped.
    if (!icon) return [];
    return [
      {
        title: card.title ?? "",
        description: card.description ?? "",
        icon,
        // Without a cover image the card falls back to bgColor, then the default blue.
        bgImage: imageSrc(card.bgImage),
        bgColor: card.bgColor || undefined,
        href: card.href || undefined,
      },
    ];
  });
  return <BelieveSection title={s.title || undefined} cards={cards.length ? cards : undefined} />;
};
