"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface OrganisationTypeItem {
  title: string;
  paragraphs: string[];
}

interface OrganisationTypesSectionProps {
  title: string;
  items: OrganisationTypeItem[];
  /** Stacked images shown alongside the accordion (the design uses two). */
  images?: string[];
}

export function OrganisationTypesSection({
  title,
  items,
  images = [],
}: OrganisationTypesSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <GreenLineMark className="mb-6 h-auto w-20" />
          <Heading as="h2" className="max-w-3xl text-black">
            {title}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14">
          {/* Accordion */}
          <div className="flex flex-col">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "py-6",
                    index > 0 && "border-t border-gray-200"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-5 text-left"
                  >
                    <span className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full border border-[#2d2d2d]/40 font-body text-[20px] text-[#2d2d2d]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <Heading
                      as="h3"
                      className="flex-1 font-body font-semibold text-[#0d0901] !text-[22px] !leading-[30px] !tracking-normal md:!text-[28px] md:!leading-[36px]"
                    >
                      {item.title}
                    </Heading>

                    <span className="mt-3 shrink-0 text-[#2d2d2d]">
                      {isOpen ? (
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "mt-4 max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-4 sm:pl-[68px] sm:pr-6">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <Text
                          key={paragraphIndex}
                          variant="p3"
                          className="text-[#4f4d4b] !text-[14px] !leading-[24px]"
                        >
                          {paragraph}
                        </Text>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stacked images */}
          {images.length > 0 && (
            <div className="flex flex-col gap-6">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
