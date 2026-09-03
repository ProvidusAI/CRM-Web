import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

export interface PainPointItem {
  title: string;
  text: string;
  icon?: string;
  iconAlt?: string;
}

interface PainPointsSectionProps {
  title?: string;
  items: PainPointItem[];
}

// Figma 593:16 — 2-col grid of cards, blue circular icon badge floated
// against a bold title, 14px/25px body copy underneath.
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
          {items.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={index * 0.08}>
              <div className="rounded-[16px] border-[6px] border-[#F8F8F8] bg-[#f6faff] p-8 shadow-[0px_2px_2px_rgba(108,113,128,0.08),0px_7px_3.5px_rgba(108,113,128,0.07),0px_17px_5px_rgba(108,113,128,0.04)] md:min-h-[241px]">
                <div className="flex items-start justify-between gap-4">
                  <Heading as="h3" level="h4" className="text-[#19689f]">
                    {item.title}
                  </Heading>
                  {item.icon ? (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                      <Image
                        src={item.icon}
                        alt={item.iconAlt ?? ""}
                        width={26}
                        height={26}
                        className="h-[26px] w-[26px] object-contain"
                      />
                    </span>
                  ) : null}
                </div>
                <Text variant="p4" className="mt-4 leading-[25px] text-black">
                  {item.text}
                </Text>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
