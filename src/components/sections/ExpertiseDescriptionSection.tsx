import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ExpertiseDescriptionSectionProps {
  heading: React.ReactNode;
  paragraphs: string[];
  ctaText?: string;
  ctaHref?: string;
  /** For pages where this block leads straight into cards and a button would crowd it. */
  hideCta?: boolean;
}

export function ExpertiseDescriptionSection({
  heading,
  paragraphs,
  ctaText = "Let's Connect",
  ctaHref = "/contact",
  hideCta = false,
}: ExpertiseDescriptionSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
          {/* Left Column: Heading and CTA */}
          <div className="flex flex-col items-start gap-10">
            <Heading as="h2" className="text-black max-w-md">
              {heading}
            </Heading>

            {!hideCta && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-3 bg-brand-green text-white rounded-full py-2 pr-6 pl-2 hover:bg-[#2d8716] transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-brand-green" />
                </div>
                <span className="font-medium text-[16px] font-body">{ctaText}</span>
              </Link>
            )}
          </div>

          {/* Right Column: Paragraphs */}
          <div className="flex flex-col gap-8">
            {paragraphs.map((text, idx) => (
              <Text key={idx} variant="p2" className="text-gray-700">
                {text}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
