import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

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

// Figma 369:625 — left content column + right blue gradient checklist panel,
// stacked below on smaller screens.
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
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              {title ? (
                <Heading as="h2" className="text-black">
                  {title} <GreenLineMark className="ml-2 inline-block h-8 w-auto align-baseline" />
                </Heading>
              ) : null}
              {text ? (
                <Text variant="p2" className="mt-6 text-[#3e3e3e]">
                  {text}
                </Text>
              ) : null}
              {ctaLabel && ctaHref ? (
                <Link href={ctaHref} className="mt-8 inline-block">
                  <CtaButton variant="filled" size="sm">
                    {ctaLabel}
                  </CtaButton>
                </Link>
              ) : null}
              {images && images.length > 0 ? (
                <div className="mt-10 flex gap-4">
                  {images.map((image) => (
                    <div
                      key={image.src}
                      className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-[12px]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rounded-[29px] p-6"
              style={{
                background: "linear-gradient(132deg, #1C95DA 7%, #236FAB 88%)",
              }}
            >
              <ul className="flex flex-col gap-3">
                {items.map((row) => (
                  <li
                    key={row}
                    className="flex min-h-[56px] items-center gap-3 rounded-[16px] bg-gradient-to-r from-[rgba(255,255,255,0.12)] to-transparent px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[25px] w-[25px] shrink-0 bg-brand-green-light"
                      style={{
                        maskImage: 'url("/images/check-bold-mask.png")',
                        WebkitMaskImage: 'url("/images/check-bold-mask.png")',
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <span className="typography-p4 font-medium text-white">
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
