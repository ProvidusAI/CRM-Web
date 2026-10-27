import { ExplainerCardsSection } from "@/components/sections/ExplainerCardsSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExplainerCardsSectionData extends SectionBase {
  _type: "explainerCardsSection";
  heading?: MarkHeadingValue;
  iconVariant?: "tile" | "plain";
  cards?: {
    _key: string;
    title?: MarkHeadingValue;
    text?: string;
    icon?: SanityImageValue;
    cta?: { label?: string; href?: string };
  }[];
}

export const explainerCardsSectionAdapter: SectionAdapter<ExplainerCardsSectionData> = (s) => {
  const plain = s.iconVariant === "plain";
  const cards = (s.cards ?? []).flatMap((card) => {
    const icon = imageSrc(card.icon);
    // The plain variant draws the icon with next/image, which throws on an
    // empty src, so a card without an upload is skipped. The tile variant
    // draws it as a CSS mask, where a missing one is harmless.
    if (plain && !icon) return [];
    return [
      {
        title: renderMarkHeading(card.title),
        text: card.text ?? "",
        icon: icon ?? "",
        // A button needs both a label and a link.
        cta: card.cta?.label && card.cta.href ? { label: card.cta.label, href: card.cta.href } : undefined,
      },
    ];
  });
  // `cards` has no default, and an empty list would still draw the heading.
  if (!cards.length) return null;
  return <ExplainerCardsSection heading={renderMarkHeading(s.heading)} cards={cards} iconVariant={s.iconVariant || undefined} />;
};
