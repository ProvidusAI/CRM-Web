import { OutcomeCardsSection } from "@/components/sections/OutcomeCardsSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface OutcomeCardsSectionData extends SectionBase {
  _type: "outcomeCardsSection";
  cards?: { _key: string; title?: string; text?: string; icon?: SanityImageValue }[];
}

export const outcomeCardsSectionAdapter: SectionAdapter<OutcomeCardsSectionData> = (s) => (
  <OutcomeCardsSection
    // next/image throws on an empty src, so a card without an icon is skipped.
    // No cards stay an empty list, which the component renders as nothing.
    cards={(s.cards ?? []).flatMap((card) => {
      const icon = imageSrc(card.icon);
      return icon ? [{ title: card.title ?? "", text: card.text ?? "", icon }] : [];
    })}
  />
);
