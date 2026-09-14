import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heading, Text } from "@/components/ui/Typography";

interface BlogSummaryCardProps {
  heading?: string;
  text?: string;
}

// Figma 602:856 shows nine badges; the site ships ten, so the tenth is unused.
const CERTIFIED_BADGES = Array.from({ length: 9 }, (_, i) => `/images/certified-badges/${i + 1}.webp`);

/** Editors separate paragraphs with a blank line; single line breaks stay inside one paragraph. */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function BlogSummaryCard({ heading, text }: BlogSummaryCardProps) {
  const displayHeading = heading?.trim();
  const paragraphs = splitParagraphs(text ?? "");

  if (!displayHeading || paragraphs.length === 0) {
    return null;
  }

  return (
    <aside
      data-testid="blog-summary-card"
      aria-label={displayHeading}
      className="mb-10 grid gap-8 rounded-[10px] bg-linear-[192deg] from-summary-blue-start from-[7%] to-summary-blue-end to-[108%] p-7 text-white md:grid-cols-[152px_minmax(0,1fr)]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-[162px] w-[152px] items-center justify-center rounded-md bg-white">
          <Image
            src="/images/salesforce-partner.webp"
            alt="Salesforce Partner"
            width={140}
            height={150}
            className="h-auto w-[140px] object-contain"
          />
        </div>
        <ul className="grid w-[152px] grid-cols-3 gap-3" aria-hidden="true">
          {CERTIFIED_BADGES.map((src) => (
            <li key={src}>
              <Image src={src} alt="" width={43} height={43} className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading as="h2" level="h3" className="text-white">
          {displayHeading}
        </Heading>
        <div className="mt-5 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <Text key={index} variant="p3" className="text-white">
              {paragraph}
            </Text>
          ))}
        </div>
        <Link href="/contact" className="mt-8 inline-block">
          <CtaButton variant="filled" size="sm">
            Let&apos;s Connect
          </CtaButton>
        </Link>
      </div>
    </aside>
  );
}
