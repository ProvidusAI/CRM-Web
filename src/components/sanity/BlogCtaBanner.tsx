import React from "react";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heading } from "@/components/ui/Typography";
import type { CtaBannerBlock } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";

interface BlogCtaBannerProps {
  value: CtaBannerBlock;
}

// Figma 605:920 background; layout from the client's screenshot. The image
// is pinned to the bottom-right corner and clipped by the rounded panel.
export function BlogCtaBanner({ value }: BlogCtaBannerProps) {
  const heading = value.heading?.trim();

  if (!heading || !value.image?.asset?.url) {
    return null;
  }

  return (
    <div
      data-testid="blog-cta-banner"
      className="relative my-4 overflow-hidden rounded-[10px] bg-linear-[100deg] from-banner-grey-start from-[6%] to-banner-grey-end to-[97%] md:min-h-[260px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[10%] h-[260px] w-[260px] rounded-full bg-brand-green-light opacity-60 blur-2xl"
      />

      <div className="relative z-10 max-w-[420px] p-7 md:p-8">
        <Heading as="h3" level="h4" className="text-white">
          {heading}
        </Heading>
        <Link href="/contact" className="mt-6 inline-block">
          <CtaButton variant="filled" size="sm">
            Let&apos;s Connect
          </CtaButton>
        </Link>
      </div>

      {/* Static and right-aligned on phones; pinned to the corner from md up. */}
      <div className="relative ml-auto mt-4 aspect-[4/3] w-[70%] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[min(52%,340px)]">
        <SanityImage
          image={value.image}
          altFallback={heading}
          className="object-contain object-right-bottom"
          sizes="(min-width: 768px) 340px, 70vw"
        />
      </div>
    </div>
  );
}
