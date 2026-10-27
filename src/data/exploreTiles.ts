// Not a "use client" module: the page-builder adapter reads these on the server.
export interface ExploreTile {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
}

/** In layout order: the tall tile on the left, then the two stacked on the right. */
export const DEFAULT_EXPLORE_TILES: ExploreTile[] = [
  { title: "Our Services", href: "/services", image: "/images/our-services.webp", imageAlt: "Our Services" },
  { title: "Our Industry Expertise", href: "/industries", image: "/images/our-industry.webp", imageAlt: "Industry Expertise" },
  { title: "Our Platform Expertise", href: "/platform-expertise", image: "/images/our-platform.webp", imageAlt: "Platform Expertise" },
];
