import { TrueCostSection } from "@/components/sections/TrueCostSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface TrueCostSectionData extends SectionBase {
  _type: "trueCostSection";
  heading?: MarkHeadingValue;
  subtitle?: string;
  intro?: string[];
  cards?: {
    _key: string;
    title?: string;
    text?: string;
    bullets?: string[];
    background?: string;
    iconColor?: string;
    icon?: SanityImageValue;
  }[];
  panelTitle?: string;
  highlights?: { _key: string; label?: string; text?: string }[];
}

export const trueCostSectionAdapter: SectionAdapter<TrueCostSectionData> = (s) => (
  <TrueCostSection
    heading={renderMarkHeading(s.heading)}
    subtitle={s.subtitle || undefined}
    intro={s.intro?.length ? s.intro : undefined}
    cards={
      s.cards?.length
        ? s.cards.map((card) => ({
            title: card.title ?? "",
            text: card.text ?? "",
            bullets: card.bullets?.length ? card.bullets : undefined,
            background: card.background ?? "",
            iconColor: card.iconColor ?? "",
            // Without it the tile is a solid colour, as in the design.
            icon: imageSrc(card.icon),
          }))
        : undefined
    }
    panelTitle={s.panelTitle || undefined}
    highlights={s.highlights?.length ? s.highlights.map((h) => ({ label: h.label ?? "", text: h.text ?? "" })) : undefined}
  />
);
