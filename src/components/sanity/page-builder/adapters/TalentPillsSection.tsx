import { TalentPillsSection, type TalentPillVariant } from "@/components/sections/TalentPillsSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface TalentPillsSectionData extends SectionBase {
  _type: "talentPillsSection";
  title?: string;
  rows?: {
    _key: string;
    variant?: TalentPillVariant;
    reverse?: boolean;
    roles?: string[];
  }[];
}

export const talentPillsSectionAdapter: SectionAdapter<TalentPillsSectionData> = (s) => {
  // A row without roles would render an empty strip, so it is dropped.
  const rows = (s.rows ?? []).filter((row) => row.roles?.length);
  return (
    <TalentPillsSection
      title={s.title || undefined}
      rows={
        rows.length
          ? rows.map((row) => ({
              roles: row.roles ?? [],
              variant: row.variant || undefined,
              reverse: row.reverse || undefined,
            }))
          : undefined
      }
    />
  );
};
