import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface IndustriesSectionData extends SectionBase {
  _type: "industriesSection";
  title?: string;
  items?: {
    _key: string;
    title?: string;
    description?: string;
    image?: SanityImageValue;
    href?: string;
  }[];
}

export const industriesSectionAdapter: SectionAdapter<IndustriesSectionData> = (s) => {
  const items = (s.items ?? []).flatMap((item) => {
    const image = imageSrc(item.image);
    // next/image throws on an empty src, so an item without an upload is skipped.
    if (!image) return [];
    return [{ title: item.title ?? "", description: item.description ?? "", image, href: item.href || undefined }];
  });
  return <IndustriesSection title={s.title || undefined} items={items.length ? items : undefined} />;
};
