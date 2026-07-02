import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ExpertiseCtaSectionProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  image1: string;
  image2: string;
}

export function ExpertiseCtaSection({
  title,
  buttonText,
  buttonHref,
  image1,
  image2,
}: ExpertiseCtaSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Side-by-side Images */}
          <div className="flex flex-row items-stretch gap-4 md:gap-6 w-full min-h-[280px] md:min-h-[360px]">
            {/* Image 1 (Team Meeting) */}
            <div className="relative flex-1 rounded-[24px] overflow-hidden shadow-md">
              <Image
                src={image1}
                alt="Consultation Team"
                fill
                className="object-cover"
              />
            </div>
            {/* Image 2 (Astro) */}
            <div className="relative flex-1 rounded-[24px] overflow-hidden">
              <Image
                src={image2}
                alt="Salesforce Astro"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-start lg:pl-16 gap-8">
            <GreenLineMark className="w-16 h-auto -mb-4" />

            <Heading as="h3" className="text-black font-bold! max-w-xl">
              {title}
            </Heading>

            <Link
              href={buttonHref}
              className="inline-flex items-center gap-3 bg-brand-green text-white rounded-full py-2 pr-6 pl-2 hover:bg-[#2d8716] transition-colors mt-2"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-brand-green" />
              </div>
              <span className="font-medium text-[16px] font-body">{buttonText}</span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
