import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";
import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: string;
}

export function CtaSection({
  title,
  buttonLabel,
  buttonHref,
  backgroundImage,
}: CtaSectionProps) {
  // Sanity sends "" for a field an editor left blank or cleared, and a default
  // parameter only fires on undefined — which rendered a labelless button.
  // Fall back with `||` so empty strings resolve too, as `title` already does.
  const displayTitle = title || "Explore How We Align Your CRM Systems With Your Business Initiatives.";
  const displayButtonLabel = buttonLabel || "Let's Connect";
  const displayButtonHref = buttonHref || "/contact";
  const displayBackgroundImage = backgroundImage || "/images/cta-bg.webp";

  return (
    <section className="relative h-[386px] flex items-center overflow-hidden mt-24 md:mt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayBackgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={82}
        />
        {/* Overlay Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(270deg, rgba(255, 255, 255, 0) 14.76%, #FFFFFF 80.37%)"
          }}
        />
      </div>

      <Container className="relative z-20">
        <div className="max-w-2xl">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="text-black mb-8 !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[50px]">
            {displayTitle.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </Heading>

          <Link
            href={displayButtonHref}
            className="inline-flex items-center gap-3 bg-brand-green text-white rounded-full py-2 pr-6 pl-2 hover:bg-[#2d8716] transition-colors mt-2"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </div>
            <span className="font-medium text-[16px] font-body">{displayButtonLabel}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
