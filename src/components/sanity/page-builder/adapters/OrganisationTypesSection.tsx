import { OrganisationTypesSection } from "@/components/sections/OrganisationTypesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface OrganisationTypesSectionData extends SectionBase {
  _type: "organisationTypesSection";
  title?: string;
  subtitle?: string;
  items?: { _key: string; title?: string; paragraphs?: string[] }[];
  images?: SanityImageValue[];
}

export const organisationTypesSectionAdapter: SectionAdapter<OrganisationTypesSectionData> = (s) => {
  // next/image throws on an empty src, so an image without an upload is skipped.
  const images = (s.images ?? []).flatMap((image) => imageSrc(image) ?? []);
  return (
    <OrganisationTypesSection
      title={s.title ?? ""}
      subtitle={s.subtitle || undefined}
      // No items stay an empty list, which the component renders as nothing.
      items={(s.items ?? []).map((item) => ({ title: item.title ?? "", paragraphs: item.paragraphs ?? [] }))}
      images={images.length ? images : undefined}
    />
  );
};
