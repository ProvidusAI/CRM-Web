import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

interface ComparisonSectionProps {
  heading: ReactNode;
  subtitle?: string;
  /** Left card — the "what it costs you" column. */
  negativeTitle: string;
  negativeItems: string[];
  /** Right card — the branded blue column. */
  positiveTitle: string;
  positiveItems: string[];
  footnote?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

// Figma 53:123 — both cards use a 29.14px radius.
const CARD_RADIUS = "rounded-[29.14px]";

const NEGATIVE_GRADIENT =
  "linear-gradient(117.51deg, var(--color-compare-grey) 0%, var(--color-compare-grey) 45.542%, #ffffff 100%)";

const POSITIVE_GRADIENT =
  "linear-gradient(135deg, var(--color-compare-blue-start) 7.3718%, var(--color-compare-blue-end) 87.939%)";

// Row pills fade left-to-right from 12% white to transparent.
const PILL_GRADIENT =
  "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)";

// The tick is an alpha mask filled with brand-green-light, matching the design.
const CHECK_MASK: CSSProperties = {
  maskImage: "url(/images/industries-pages/check-mask.png)",
  WebkitMaskImage: "url(/images/industries-pages/check-mask.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ComparisonSection({
  heading,
  subtitle,
  negativeTitle,
  negativeItems,
  positiveTitle,
  positiveItems,
  footnote,
  buttonLabel,
  buttonHref,
}: ComparisonSectionProps) {
  return (
    <Section background="white">
      <Container>
        {/* Heading block */}
        <div className="flex flex-col items-center text-center">
          <Heading as="h2" className="max-w-[689px] text-black">
            {heading}
          </Heading>
          {subtitle && (
            <Text
              variant="p2"
              className="mt-6 max-w-[806px] text-[color:var(--color-text-body)]"
            >
              {subtitle}
            </Text>
          )}
        </div>

        {/* Cards. The blue card sits 80px higher on desktop, as in the design. */}
        <div className="relative mt-12 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-start lg:gap-[80px]">
          {/* Left — DIY */}
          <div
            className={`${CARD_RADIUS} w-full px-8 py-10 sm:px-[70px] sm:py-[34px] lg:mt-20 lg:flex-1`}
            style={{ backgroundImage: NEGATIVE_GRADIENT }}
          >
            <Heading
              as="h3"
              level="h4"
              className="text-[color:var(--color-text-heading)]"
            >
              {negativeTitle}
            </Heading>
            <ul className="mt-8 space-y-[30px]">
              {negativeItems.map((item) => (
                <Text
                  key={item}
                  as="li"
                  variant="p3"
                  className="font-medium text-[color:var(--color-compare-muted)]"
                >
                  {item}
                </Text>
              ))}
            </ul>
          </div>

          {/* V/S badge — centred in the gap on desktop, between cards on mobile */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <div className="rotate-10">
              <div
                className="flex size-[46.832px] items-center justify-center rounded-[12.488px] bg-brand-green shadow-[var(--shadow-vs-badge)]"
              >
                <span className="text-[17.692px] font-medium leading-none text-white">
                  V/S
                </span>
              </div>
            </div>
          </div>

          {/* Right — ProvidusCRM */}
          <div
            className={`${CARD_RADIUS} w-full p-[25px] lg:flex-1`}
            style={{ backgroundImage: POSITIVE_GRADIENT }}
          >
            <Heading as="h3" level="h4" className="px-[7px] pt-[10px] text-white">
              {positiveTitle}
            </Heading>

            <ul className="mt-[38px] space-y-[12.488px]">
              {positiveItems.map((item) => (
                <li
                  key={item}
                  className="flex h-[56.198px] items-center gap-[9px] rounded-[16.651px] pl-[12.64px] pr-4"
                  style={{ backgroundImage: PILL_GRADIENT }}
                >
                  <span
                    className="size-[37.93px] shrink-0 bg-brand-green-light"
                    style={CHECK_MASK}
                  />
                  <Text variant="p3" className="font-medium text-white">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote + CTA */}
        {(footnote || (buttonLabel && buttonHref)) && (
          <div className="mt-14 flex flex-col items-center text-center">
            {footnote && (
              <Text
                variant="p2"
                className="max-w-[1191px] text-[color:var(--color-text-body)]"
              >
                {footnote}
              </Text>
            )}
            {buttonLabel && buttonHref && (
              <Link
                href={buttonHref}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-green py-2 pl-2 pr-6 text-white transition-colors hover:bg-[color:var(--color-box-green-end)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <ArrowRight className="h-4 w-4 text-brand-green" />
                </span>
                <Text as="span" variant="p3" className="font-medium">
                  {buttonLabel}
                </Text>
              </Link>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
