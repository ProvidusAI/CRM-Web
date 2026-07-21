import Image from "next/image";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface TrueCostCard {
  title: string;
  /** Paragraphs are split on a blank line, matching the Figma copy blocks. */
  text: string;
  bullets?: string[];
  /** CSS custom property for the card background, e.g. "var(--color-cost-card-green)". */
  background: string;
  /** CSS custom property for the icon tile, e.g. "var(--color-brand-green)". */
  iconColor: string;
  /** Optional glyph rendered inside the icon tile. Without it the tile is a solid colour, as in the design. */
  icon?: string;
}

export interface TrueCostHighlight {
  label: string;
  text: string;
}

interface TrueCostSectionProps {
  heading: ReactNode;
  subtitle?: string;
  /** Left-column lead-in paragraphs, above the cards. */
  intro?: string[];
  cards?: TrueCostCard[];
  panelTitle?: string;
  highlights?: TrueCostHighlight[];
}

// Figma 172:4 — icon tile is 66.79 x 59.81 with a 9.276px radius.
const ICON_TILE = "h-[59.81px] w-[66.79px] rounded-[9.276px]";

export function TrueCostSection({
  heading,
  subtitle,
  intro = [],
  cards = [],
  panelTitle,
  highlights = [],
}: TrueCostSectionProps) {
  return (
    <Section background="white">
      <Container>
        <div className="mx-auto max-w-[1241px]">
          {/* Heading block */}
          <div className="flex flex-col items-center text-center">
            <Heading as="h2" className="max-w-[689px] text-black">
              {heading}
            </Heading>
            {subtitle && (
              <Text
                variant="p2"
                className="mt-6 max-w-[1036px] text-[color:var(--color-text-body)]"
              >
                {subtitle}
              </Text>
            )}
          </div>

          {/* Two columns: 543px cards / 647px panel, 50px gap (Figma) */}
          <div className="mt-12 flex flex-col gap-[50px] lg:mt-16 lg:flex-row lg:items-start">
            {/* Left column */}
            <div className="w-full lg:max-w-[543px]">
              {intro.map((paragraph, index) => (
                <Text
                  key={index}
                  variant="p3"
                  className={cn(index > 0 && "mt-6", "text-[color:var(--color-text-body)]")}
                >
                  {paragraph}
                </Text>
              ))}

              <div className="mt-10 flex flex-col gap-10">
                {cards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[29px] border border-[color:var(--color-card-border)] p-8 shadow-[var(--shadow-cost-card)] sm:p-10"
                    style={{ backgroundColor: card.background }}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                      <div
                        className={`${ICON_TILE} flex shrink-0 items-center justify-center shadow-[var(--shadow-cost-icon)]`}
                        style={{ backgroundColor: card.iconColor }}
                      >
                        {card.icon && (
                          <Image
                            src={card.icon}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                        )}
                      </div>
                      <Heading
                        as="h3"
                        level="h4"
                        className="text-[color:var(--color-text-heading)]"
                      >
                        {card.title}
                      </Heading>
                    </div>

                    <div className="mt-6">
                      {card.text.split("\n\n").map((paragraph, index) => (
                        <Text
                          key={index}
                          variant="p3"
                          className={cn(index > 0 && "mt-6", "text-black")}
                        >
                          {paragraph}
                        </Text>
                      ))}

                      {card.bullets && card.bullets.length > 0 && (
                        <ul className="mt-4 list-disc space-y-1 pl-6">
                          {card.bullets.map((bullet) => (
                            <Text key={bullet} as="li" variant="p3" className="text-black">
                              {bullet}
                            </Text>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right panel */}
            {(panelTitle || highlights.length > 0) && (
              <div
                className="w-full rounded-[36px] p-8 sm:p-12 lg:max-w-[647px]"
                style={{
                  backgroundImage:
                    "linear-gradient(187.77deg, rgba(255, 235, 220, 0) 17.772%, var(--color-cost-panel) 51.703%)",
                }}
              >
                {panelTitle && (
                  <Heading
                    as="h3"
                    level="h4"
                    className="text-[color:var(--color-text-heading)]"
                  >
                    {panelTitle}
                  </Heading>
                )}

                <dl className="mt-8 space-y-6">
                  {highlights.map((highlight) => (
                    <div key={highlight.label}>
                      <Text
                        as="dt"
                        variant="p2"
                        className="font-semibold text-[color:var(--color-cost-label)]"
                      >
                        {highlight.label}
                      </Text>
                      <Text
                        as="dd"
                        variant="p2"
                        className="mt-1 text-[color:var(--color-text-body)]"
                      >
                        {highlight.text}
                      </Text>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
