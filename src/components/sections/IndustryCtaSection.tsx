import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Typography";

interface IndustryCtaSectionProps {
  title: string;
  buttonLabel: string;
  buttonHref: string;
  image: string;
  imageAlt?: string;
}

// Cyan gradient behind the card (Figma node 12:5).
const CTA_GRADIENT =
  "linear-gradient(180deg, rgba(48,238,255,0) 11.68%, #30EEFF 267.35%)";

export function IndustryCtaSection({
  title,
  buttonLabel,
  buttonHref,
  image,
  imageAlt = "",
}: IndustryCtaSectionProps) {
  return (
    // Extra top padding leaves room for the image to overflow above the card.
    <Section className="bg-white pb-16 pt-24 md:pb-24 md:pt-28">
      <Container>
        <div
          className="relative rounded-[13px] lg:min-h-[300px]"
          style={{ background: CTA_GRADIENT }}
        >
          <div className="grid grid-cols-1 items-center lg:grid-cols-2">
            {/* Left: heading + CTA button */}
            <div className="flex flex-col items-start gap-8 px-8 py-12 md:px-12 md:py-14 lg:px-14">
              <Heading as="h2" className="max-w-xl text-[#12233B]">
                {title}
              </Heading>

              <Link
                href={buttonHref}
                className="inline-flex items-center gap-3 rounded-full bg-brand-green py-2 pl-2 pr-6 text-white transition-colors hover:bg-[#2d8716]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <ArrowRight className="h-4 w-4 text-brand-green" />
                </span>
                <span className="font-body text-[16px] font-medium">
                  {buttonLabel}
                </span>
              </Link>
            </div>

            {/* Right column — image sits in-flow on mobile */}
            <div className="px-8 pb-10 lg:hidden">
              <Image
                src={image}
                alt={imageAlt}
                width={659}
                height={415}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="mx-auto h-auto w-full max-w-[520px]"
              />
            </div>
          </div>

          {/* Desktop: image bottom-flush with the card, overflowing the top edge */}
          <div className="pointer-events-none absolute bottom-0 right-8 hidden w-[46%] max-w-[560px] lg:block xl:right-14">
            <Image
              src={image}
              alt={imageAlt}
              width={659}
              height={415}
              sizes="45vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
