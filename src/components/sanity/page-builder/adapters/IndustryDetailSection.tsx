import { IndustryDetailSection } from "@/components/sections/IndustryDetailSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface IndustryDetailSectionData extends SectionBase {
  _type: "industryDetailSection";
  industries?: {
    _key: string;
    title?: string;
    image?: SanityImageValue;
    description?: string;
    href?: string;
  }[];
}

export const industryDetailSectionAdapter: SectionAdapter<IndustryDetailSectionData> = (s) => {
  const industries = (s.industries ?? []).flatMap((industry) => {
    const image = imageSrc(industry.image);
    // next/image throws on an empty src, so an industry without an upload is skipped.
    if (!image) return [];
    return [{ title: industry.title ?? "", image, description: industry.description ?? "", href: industry.href || undefined }];
  });
  // No industries keep the component's default six, like an omitted prop.
  return <IndustryDetailSection industries={industries.length ? industries : undefined} />;
};
