import type { CSSProperties, ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

export interface SolutionTypeCard {
  title: string;
  text: string;
  /** Path to the glyph. Used as an alpha mask so it takes the card colour. */
  icon: string;
  /** CSS custom property driving both the border and the icon, e.g. "var(--color-type-teal)". */
  color: string;
}

interface SolutionTypesSectionProps {
  heading: ReactNode;
  subtitle?: string;
  cards?: SolutionTypeCard[];
}

// Figma 54:394 — 399.608 x 269.342 cards, 22px radius, 1px coloured border.
const CARD = "w-full max-w-[399.608px] min-h-[269.342px] rounded-[22px] border";

function maskStyle(icon: string): CSSProperties {
  return {
    maskImage: `url(${icon})`,
    WebkitMaskImage: `url(${icon})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
}

export function SolutionTypesSection({
  heading,
  subtitle,
  cards = [],
}: SolutionTypesSectionProps) {
  return (
    <Section background="white">
      <Container>
        {/* Heading block */}
        <div className="flex flex-col items-center text-center">
          <Heading as="h2" className="max-w-[604px] text-black">
            {heading}
          </Heading>
          {subtitle && (
            <Text
              variant="p2"
              className="mt-6 max-w-[902px] text-[color:var(--color-text-body)]"
            >
              {subtitle}
            </Text>
          )}
        </div>

        {/* 3 + 2 layout: wrapping keeps the trailing row centred, as in the design. */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-[21px] gap-y-[29px] lg:mt-16">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`${CARD} flex flex-col p-[26px]`}
              style={{ borderColor: card.color }}
            >
              <span
                aria-hidden="true"
                className="ml-auto block size-[41px] shrink-0"
                style={{ ...maskStyle(card.icon), backgroundColor: card.color }}
              />
              <Text
                as="div"
                variant="p1"
                className="mt-4 font-semibold text-[color:var(--color-type-title)]"
              >
                {card.title}
              </Text>
              <Text
                variant="p4"
                className="mt-5 text-[color:var(--color-type-body)]"
              >
                {card.text}
              </Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
