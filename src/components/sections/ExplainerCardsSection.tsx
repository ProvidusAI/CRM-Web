import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

export interface ExplainerCard {
  title: ReactNode;
  text: string;
  /** Path to the glyph. Used as an alpha mask over the gradient icon tile. */
  icon: string;
}

interface ExplainerCardsSectionProps {
  heading: ReactNode;
  cards: ExplainerCard[];
}

// Figma 268:6 — 16px radius, 6px #F8F8F8 border, 72px radial-gradient icon tile.
function maskStyle(icon: string): CSSProperties {
  return {
    maskImage: `url(${icon})`,
    WebkitMaskImage: `url(${icon})`,
    maskSize: "60%",
    WebkitMaskSize: "60%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
}

export function ExplainerCardsSection({
  heading,
  cards,
}: ExplainerCardsSectionProps) {
  return (
    <Section background="white">
      <Container>
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            aria-hidden="true"
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mx-auto mt-5 max-w-3xl text-black">
            {heading}
          </Heading>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={index}
              className="rounded-[16px] border-[6px] border-[#F8F8F8] p-8"
            >
              <div className="relative size-[72px]">
                <Image
                  src="/images/platform-expertise/agentforce-what-is/icon-bg.svg"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="rounded-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-white"
                  style={maskStyle(card.icon)}
                />
              </div>
              <Heading as="h4" className="mt-6 text-[#19689F]">
                {card.title}
              </Heading>
              <Text variant="p3" className="mt-4 text-black">
                {card.text}
              </Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
