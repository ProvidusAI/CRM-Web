// Load-bearing for `pnpm check:blog-blocks`: tsx uses the classic JSX transform here.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heading, Text } from "@/components/ui/Typography";

type ButtonVariant = "filled" | "white";

interface SummaryButton {
  label?: string;
  link?: string;
  variant?: ButtonVariant;
}

interface BlogSummaryCardProps {
  heading?: string;
  text?: string;
  primaryButton?: SummaryButton;
  secondaryButton?: SummaryButton;
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

/** The first button falls back to "Let's Connect" → /contact; the second shows only when fully filled. */
export function summaryButtons(primary?: SummaryButton, secondary?: SummaryButton) {
  const buttons: { label: string; link: string; variant: ButtonVariant }[] = [
    {
      label: primary?.label?.trim() || "Let's Connect",
      link: primary?.link?.trim() || "/contact",
      variant: "filled",
    },
  ];
  const label = secondary?.label?.trim();
  const link = secondary?.link?.trim();
  if (label && link) buttons.push({ label, link, variant: secondary?.variant ?? "filled" });
  return buttons;
}

export function BlogSummaryCard({ heading, text, primaryButton, secondaryButton }: BlogSummaryCardProps) {
  const displayHeading = heading?.trim();
  const paragraphs = splitParagraphs(text ?? "");

  if (!displayHeading || paragraphs.length === 0) {
    return null;
  }

  return (
    <aside
      data-testid="blog-summary-card"
      aria-labelledby="blog-summary-heading"
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
        <Heading as="h2" level="h3" id="blog-summary-heading" className="text-white">
          {displayHeading}
        </Heading>
        <div className="mt-5 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <Text key={index} variant="p3" className="text-white">
              {paragraph}
            </Text>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {summaryButtons(primaryButton, secondaryButton).map((button) => (
            <Link
              key={button.label}
              href={button.link}
              {...(button.link.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-block"
            >
              <CtaButton variant={button.variant} size="sm">
                {button.label}
              </CtaButton>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
