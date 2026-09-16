import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface SplitChecklistImage {
  src: string;
  alt: string;
}

interface SplitChecklistSectionProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: SplitChecklistImage[];
  items: string[];
}

// Figma 369:625 — left content column + right pink "pain point" panel of
// red-cross rows, stacked below on smaller screens. The CMS allows at most two
// images, shown in the design's 338:204 split.
const IMAGE_BOXES = [
  { aspect: "aspect-[338/254]", sizes: "(min-width: 1024px) 26vw, 60vw" },
  { aspect: "aspect-[204/254]", sizes: "(min-width: 1024px) 16vw, 38vw" },
];

export function SplitChecklistSection({
  title,
  text,
  ctaLabel,
  ctaHref,
  images,
  items,
}: SplitChecklistSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section background="white">
      <Container>
        {/* Columns stretch to the same height so the images can sit on the
            panel's bottom edge. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal height="100%">
            <div className="flex h-full flex-col">
              {title ? (
                <Heading as="h2" className="text-black">
                  {title} <GreenLineMark className="ml-2 inline-block h-8 w-auto align-baseline" />
                </Heading>
              ) : null}
              {text ? (
                <Text variant="p2" className="mt-6 text-text-body">
                  {text}
                </Text>
              ) : null}
              {ctaLabel && ctaHref ? (
                <Link href={ctaHref} className="mt-8 self-start">
                  <CtaButton variant="filled" size="sm">
                    {ctaLabel}
                  </CtaButton>
                </Link>
              ) : null}
              {images && images.length > 0 ? (
                // pt-10 keeps the gap when the column has no spare height;
                // mt-auto pushes the row down when it does.
                <div className="mt-auto grid grid-cols-[338fr_204fr] gap-5 pt-10">
                  {images.slice(0, IMAGE_BOXES.length).map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className={cn(
                        "relative overflow-hidden rounded-[22px]",
                        IMAGE_BOXES[index].aspect
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes={IMAGE_BOXES[index].sizes}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1} height="100%">
            <div className="h-full rounded-[29px] bg-linear-to-b from-transparent from-[15%] to-checklist-red-end to-[109%] p-[25px]">
              <ul className="flex flex-col gap-[25px]">
                {items.map((row, index) => (
                  <li
                    key={`${row}-${index}`}
                    className="flex min-h-[56px] items-center gap-3.5 rounded-[16px] bg-linear-to-r from-white/12 to-transparent pr-4"
                  >
                    <Image
                      src="/images/checklist-cross.webp"
                      alt=""
                      aria-hidden="true"
                      width={50}
                      height={50}
                      className="-ml-[3px] size-[50px] shrink-0"
                    />
                    <span className="text-[16px] leading-[20px] font-medium text-gray-500">
                      {row}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
