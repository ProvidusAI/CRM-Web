import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface GalleryPhoto {
  src: string;
  alt: string;
  /** Box shape from the Figma frame, where every box is 346px tall. */
  aspect: string;
  /** object-position (and zoom) reproducing the Figma crop. */
  imageClassName?: string;
  sizes: string;
}

// Figma 723:4. Within a row the aspect ratios share the 346 denominator, so
// the boxes stay equal-height as the grid scales; max-h caps them at 346px
// once the container outgrows the 1240px design width.
const topRow: GalleryPhoto[] = [
  {
    src: "/images/gallery/1.webp",
    alt: "The ProvidusCRM team together at the office",
    aspect: "aspect-[752/346]",
    sizes: "(min-width: 768px) 60vw, 100vw",
  },
  {
    src: "/images/gallery/2.webp",
    alt: "ProvidusCRM leadership at a formal signing",
    aspect: "aspect-[466/346]",
    // Figma shows this photo at 1.29x its cover fit; scaling about the same
    // point object-position anchors reproduces that crop.
    imageClassName: "object-[32%_69%] origin-[32%_69%] scale-[1.29]",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
];

const bottomRow: GalleryPhoto[] = [
  {
    src: "/images/gallery/3.webp",
    alt: "Two ProvidusCRM consultants working through a solution on a laptop",
    aspect: "aspect-[400/346]",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/gallery/4.webp",
    alt: "Three ProvidusCRM team members at the office",
    aspect: "aspect-[400/346]",
    imageClassName: "object-[center_68%]",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/gallery/5.webp",
    alt: "ProvidusCRM consultants reviewing work together at a desk",
    aspect: "aspect-[400/346]",
    imageClassName: "object-[center_84%]",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

function GalleryTile({ photo, delay }: { photo: GalleryPhoto; delay: number }) {
  return (
    <Reveal direction="up" delay={delay}>
      {/* isolate keeps Safari clipping the zoomed image to the rounded corners */}
      <div
        className={cn(
          "relative isolate w-full max-h-[346px] overflow-hidden rounded-md",
          photo.aspect
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={photo.sizes}
          className={cn("object-cover", photo.imageClassName)}
        />
      </div>
    </Reveal>
  );
}

export function TeamGallerySection() {
  return (
    <Section>
      <Container>
        <Reveal direction="up" delay={0.1}>
          <div className="mb-10 flex flex-col items-center text-center md:mb-16">
            <GreenLineMark className="mb-6 h-auto w-16" />
            <Heading as="h2" className="text-black">
              <span className="md:block">Work With Experts Across CRM,</span>{" "}
              <span className="md:block">AI, Sales, Marketing, and More!</span>
            </Heading>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[752fr_466fr]">
            {topRow.map((photo, index) => (
              <GalleryTile key={photo.src} photo={photo} delay={0.1 + index * 0.1} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {bottomRow.map((photo, index) => (
              <GalleryTile key={photo.src} photo={photo} delay={0.1 + index * 0.1} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
