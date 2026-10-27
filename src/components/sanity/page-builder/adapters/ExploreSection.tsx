import { ExploreSection } from "@/components/sections/ExploreSection";
import { DEFAULT_EXPLORE_TILES } from "@/data/exploreTiles";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ExploreSectionData extends SectionBase {
  _type: "exploreSection";
  title?: string;
  tiles?: {
    _key: string;
    title?: string;
    href?: string;
    image?: SanityImageValue;
  }[];
}

export const exploreSectionAdapter: SectionAdapter<ExploreSectionData> = (s) => (
  <ExploreSection
    title={s.title || undefined}
    // The three tiles are laid out by position, so an unset field takes the
    // standard tile's value at that position instead of dropping the tile.
    tiles={
      s.tiles?.length
        ? DEFAULT_EXPLORE_TILES.map((standard, i) => {
            const tile = s.tiles?.[i];
            const image = imageSrc(tile?.image);
            return {
              title: tile?.title || standard.title,
              href: tile?.href || standard.href,
              image: image ?? standard.image,
              imageAlt: image ? (imageAlt(tile?.image) ?? "") : standard.imageAlt,
            };
          })
        : undefined
    }
  />
);
