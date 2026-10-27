import { TeamThoughtsSection } from "@/components/sections/TeamThoughtsSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface TeamThoughtsSectionData extends SectionBase {
  _type: "teamThoughtsSection";
  title?: string;
  subtitle?: string;
  members?: {
    _key: string;
    name?: string;
    designation?: string;
    displayName?: string;
    fullDesignation?: string;
    quote?: string;
    image?: SanityImageValue;
  }[];
}

export const teamThoughtsSectionAdapter: SectionAdapter<TeamThoughtsSectionData> = (s) => {
  const members = (s.members ?? []).flatMap((m) => {
    const image = imageSrc(m.image);
    // next/image throws on an empty src, so a member without a photo is skipped.
    if (!image) return [];
    const name = m.name ?? "";
    const designation = m.designation ?? "";
    return [
      {
        id: m._key,
        name,
        designation,
        displayName: m.displayName || name,
        fullDesignation: m.fullDesignation || designation,
        quote: m.quote ?? "",
        image,
      },
    ];
  });
  return (
    <TeamThoughtsSection
      title={s.title || undefined}
      subtitle={s.subtitle || undefined}
      members={members.length ? members : undefined}
    />
  );
};
