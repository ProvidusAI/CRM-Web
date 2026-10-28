import { RecruitmentIntroSection } from "@/components/sections/RecruitmentIntroSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface RecruitmentIntroSectionData extends SectionBase {
  _type: "recruitmentIntroSection";
  icon?: SanityImageValue;
  lead?: string;
  highlight?: string;
}

export const recruitmentIntroSectionAdapter: SectionAdapter<RecruitmentIntroSectionData> = (s) => (
  <RecruitmentIntroSection
    icon={imageSrc(s.icon)}
    lead={s.lead || undefined}
    highlight={s.highlight || undefined}
  />
);
