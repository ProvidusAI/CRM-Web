import { DEFAULT_BOTTOM_ROW, DEFAULT_TOP_ROW, TeamGallerySection, type TeamGalleryPhoto } from "@/components/sections/TeamGallerySection";
import { imageAlt, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

interface GalleryPhotoData {
  _key: string;
  image?: SanityImageValue;
  /** An object-position / zoom class from the schema's list. */
  crop?: string;
}

export interface TeamGallerySectionData extends SectionBase {
  _type: "teamGallerySection";
  headingStart?: string;
  headingEnd?: string;
  topRow?: GalleryPhotoData[];
  bottomRow?: GalleryPhotoData[];
}

// Box shape and responsive sizes belong to the position in the Figma grid, so a
// photo takes them from the standard photo at the same place.
function toRow(photos: GalleryPhotoData[] | undefined, standard: TeamGalleryPhoto[]): TeamGalleryPhoto[] | undefined {
  const row = (photos ?? []).flatMap((photo) => {
    const src = imageSrc(photo.image);
    // next/image throws on an empty src, so a photo without an upload is skipped.
    return src ? [{ src, alt: imageAlt(photo.image) ?? "", crop: photo.crop || undefined }] : [];
  });
  return row.length
    ? row.map(({ crop, ...photo }, i) => ({ ...standard[Math.min(i, standard.length - 1)], ...photo, imageClassName: crop }))
    : undefined;
}

export const teamGallerySectionAdapter: SectionAdapter<TeamGallerySectionData> = (s) => (
  <TeamGallerySection
    headingStart={s.headingStart || undefined}
    headingEnd={s.headingEnd || undefined}
    topRow={toRow(s.topRow, DEFAULT_TOP_ROW)}
    bottomRow={toRow(s.bottomRow, DEFAULT_BOTTOM_ROW)}
  />
);
