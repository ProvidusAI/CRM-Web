import { EventsSection, type EventSlide } from "@/components/sections/EventsSection";
import { imageAlt, imageSize, imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface EventsSectionData extends SectionBase {
  _type: "eventsSection";
  title?: string;
  events?: {
    _key: string;
    name?: string;
    description?: string;
    bg?: SanityImageValue;
    logo?: SanityImageValue;
    logoWidth?: number;
    logoHeight?: number;
    photos?: SanityImageValue[];
  }[];
}

export const eventsSectionAdapter: SectionAdapter<EventsSectionData> = (s) => {
  const events = (s.events ?? []).flatMap((event): EventSlide[] => {
    const bg = imageSrc(event.bg);
    const logoSrc = imageSrc(event.logo);
    // Logos are 2x exports: unless the editor sets a display size, show half.
    const half = imageSize(event.logo, { half: true });
    // next/image throws on an empty src, so an event without a background or logo is skipped.
    if (!bg || !logoSrc || !half) return [];
    return [
      {
        name: event.name ?? "",
        description: event.description ?? "",
        bg,
        logo: {
          src: logoSrc,
          width: event.logoWidth || half.width,
          height: event.logoHeight || half.height,
          alt: imageAlt(event.logo),
        },
        photos: (event.photos ?? []).flatMap((photo) => imageSrc(photo) ?? []),
      },
    ];
  });
  return <EventsSection title={s.title || undefined} events={events.length ? events : undefined} />;
};
