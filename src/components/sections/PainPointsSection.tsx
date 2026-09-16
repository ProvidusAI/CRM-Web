import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

export interface PainPointItem {
  title: string;
  text: string;
  /** Uploaded icon URL; without one the card gets a default by position. */
  icon?: string;
}

interface PainPointsSectionProps {
  title?: string;
  items: PainPointItem[];
}

// White glyphs (2x exports) drawn at their Figma sizes, in the Figma card
// order; they repeat for grids longer than four cards.
const DEFAULT_ICONS = [
  { src: "/images/uncontrolled.webp", size: 26 },
  { src: "/images/inconsistent.webp", size: 24 },
  { src: "/images/poor-salesforce.webp", size: 26 },
  { src: "/images/sluggish.webp", size: 30 },
];
const UPLOADED_ICON_SIZE = 28;

// Figma 593:16 — 2-col grid of cards. A 48px gradient badge sits in the top
// right corner; the title starts level with its lower half, 14px/25px body
// copy underneath. Badge and text share the same inset from the card edge.
export function PainPointsSection({ title, items }: PainPointsSectionProps) {
  if (items.length === 0) return null;

  return (
    <Section background="white">
      <Container>
        {title ? (
          <Reveal>
            <Heading as="h2" className="mb-10 text-center text-black md:mb-14">
              {title}
            </Heading>
          </Reveal>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const icon = item.icon
              ? { src: item.icon, size: UPLOADED_ICON_SIZE }
              : DEFAULT_ICONS[index % DEFAULT_ICONS.length];

            return (
              <Reveal key={`${item.title}-${index}`} delay={index * 0.08} height="100%">
                <div className="relative flex h-full flex-col rounded-[16px] border-[6px] border-gray-100-bg bg-pain-card p-6 shadow-[0px_2px_2px_rgba(108,113,128,0.08),0px_7px_3.5px_rgba(108,113,128,0.07),0px_17px_5px_rgba(108,113,128,0.04)] md:min-h-[241px]">
                  {/* Decorative: the title says what the card is about. */}
                  <span
                    aria-hidden="true"
                    className="absolute right-[22px] top-[21px] flex size-12 items-center justify-center rounded-full bg-radial-[84.8%_84.8%_at_50%_15.2%] from-icon-badge-start to-icon-badge-end"
                  >
                    <Image
                      src={icon.src}
                      alt=""
                      width={icon.size}
                      height={icon.size}
                      className="object-contain"
                    />
                  </span>
                  <Heading as="h3" level="h4" className="mt-[26px] pr-16 text-pain-title">
                    {item.title}
                  </Heading>
                  <Text variant="p4" className="mt-5 leading-[25px] text-black">
                    {item.text}
                  </Text>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
