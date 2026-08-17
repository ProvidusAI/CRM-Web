import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
  image?: string;
  imageClassName?: string;
  hideImage?: boolean;
  /** Without `ctaHref` the button stays unlinked, as on the older pages. */
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "white" | "filled";
  /** "sm" keeps a primary + secondary pair on one line. */
  ctaSize?: "sm" | "md";
  secondaryCta?: { label: string; href: string };
  subtitle?: string;
  /**
   * Promotes the subtitle to the page <h1> and drops the title to <h2>, keeping
   * both visual sizes unchanged. Used by the platform-expertise detail pages,
   * where the kicker carries the target keyword. Explicit rather than inferred
   * from `subtitle` so adding a kicker elsewhere never moves the h1 silently.
   */
  subtitleAsH1?: boolean;
  bullets?: string[];
  hideCta?: boolean;
}

interface BlurScaleHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurScaleHeading({ children, className }: BlurScaleHeadingProps) {
  let animatedIndex = 0;

  const renderNode = (node: React.ReactNode, path: string): React.ReactNode => {
    if (!node) return null;

    if (typeof node === "string" || typeof node === "number") {
      const tokens = String(node).split(/(\s+)/).filter(Boolean);

      return (
        <React.Fragment key={path}>
          {tokens.map((token, tokenIndex) => {
            const tokenPath = `${path}-${tokenIndex}`;

            if (/^\s+$/.test(token)) {
              return (
                <React.Fragment key={tokenPath}>
                  {token}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={tokenPath}>
                {/* Screen reader accessible text */}
                <span className="sr-only">{token}</span>
                {/* Animated visual text (hidden from screen readers) */}
                <span
                  className="inline-block whitespace-nowrap hero-heading-word"
                  aria-hidden="true"
                >
                  {token.split("").map((character, characterIndex) => (
                    <span
                      key={`${tokenPath}-${characterIndex}`}
                      className="inline-block hero-heading-letter"
                      style={{
                        animationDelay: `${Math.min(animatedIndex++ * 18, 720)}ms`,
                        transformOrigin: "center bottom",
                      }}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      if (node.type === "br") {
        return <br key={path} />;
      }

      if (node.props.children !== undefined) {
        const parsedChildren = React.Children.map(
          node.props.children,
          (child, childIndex) => renderNode(child, `${path}-${childIndex}`)
        );

        return React.cloneElement(node, {
          key: path,
          children: parsedChildren,
        });
      }

      return (
        <span
          key={path}
          className="inline-block align-middle hero-heading-letter"
          style={{ animationDelay: `${Math.min(animatedIndex++ * 18, 720)}ms` }}
        >
          {node}
        </span>
      );
    }

    return node;
  };

  return (
    <span className={className}>
      {React.Children.map(children, (child, index) =>
        renderNode(child, String(index))
      )}
    </span>
  );
}


export function HeroSection({
  title,
  description,
  image = "/images/hero-img.webp",
  imageClassName = "object-cover object-center",
  hideImage = false,
  ctaLabel = "Book a Call",
  ctaHref,
  ctaVariant = "white",
  ctaSize = "md",
  secondaryCta,
  subtitle,
  subtitleAsH1 = false,
  bullets,
  hideCta = false,
}: HeroSectionProps) {
  const defaultTitle = (
    <>
      Custom Salesforce Solutions For Your CRM Innovation Goals{" "}
      <Image
        src="/images/green-line.svg"
        alt=""
        aria-hidden="true"
        width={60}
        height={20}
        className="inline-block h-10 w-auto align-baseline ml-1"
      />
    </>
  );

  const defaultDescription = "Future-proof customer operations and business processes with ProvidusCRM, a certified Salesforce partner, reinventing CRM systems for organisations in the UK.";

  return (
    <section className="mt-4">
      <Container>
        <div
          className={`relative rounded-3xl flex flex-col overflow-hidden bg-brand-blue contain-layout ${hideImage ? "min-h-[350px] lg:min-h-[450px]" : "min-h-[620px] lg:min-h-[calc(100vh-120px)]"
            }`}
        >
          <Image
            src="/images/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1800px) 1696px, calc(100vw - 48px)"
            className="absolute inset-0 z-0 object-cover object-center"
            quality={78}
          />
          {hideImage ? (
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 py-12 text-center gap-6">
              <div className="flex items-center justify-center">
                <Heading as="h1" className="text-white text-center flex items-center justify-center flex-wrap gap-x-4 max-w-[680px]">
                  <BlurScaleHeading>
                    {title || defaultTitle}
                  </BlurScaleHeading>
                </Heading>
              </div>
            </div>
          ) : (
            <div className="relative z-10 grid lg:grid-cols-2 flex-1">
              {/* Left — content */}
              <div className="flex flex-col justify-center gap-8 px-8 py-16 md:px-12 lg:px-16 lg:py-20">
                {/* Salesforce Partner Badge */}
                <div className="flex items-center gap-4 w-fit">
                  <div className="shrink-0 bg-white rounded-sm overflow-hidden">
                    <Image
                      src="/images/salesforce-partner.webp"
                      alt="Salesforce Partner"
                      width={66}
                      height={71}
                      className="h-auto w-[66px] object-contain bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Text variant="p4" className="text-white/90 leading-tight">
                      Certified
                    </Text>
                    <Text variant="p4" className="text-white font-semibold leading-snug">
                      Salesforce Partner
                    </Text>
                    <Text variant="p4" className="text-white/90 leading-tight">
                      in the UK
                    </Text>
                  </div>
                </div>

                {/* Subtitle */}
                {subtitle && (
                  <Text
                    as={subtitleAsH1 ? "h1" : "p"}
                    variant="p4"
                    className="text-white font-medium"
                  >
                    {subtitle}
                  </Text>
                )}

                {/* Heading + squiggle */}
                <div>
                  <Heading
                    as={subtitleAsH1 ? "h2" : "h1"}
                    level="h1"
                    className="text-white max-w-[560px]"
                  >
                    <BlurScaleHeading>
                      {title || defaultTitle}
                    </BlurScaleHeading>
                  </Heading>
                </div>

                {/* Subtext */}
                <Text variant="p3" className="text-white/90 max-w-md">
                  {description || defaultDescription}
                </Text>

                {/* Bullets */}
                {bullets && bullets.length > 0 && (
                  <ul className="text-white/90 flex flex-col gap-2 list-none p-0 m-0">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-white mt-1">•</span>
                        <Text variant="p3" className="text-white/90">{bullet}</Text>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {!hideCta && (
                  <div className="flex flex-wrap items-center gap-4">
                    {ctaHref ? (
                      <Link href={ctaHref}>
                        <CtaButton variant={ctaVariant} size={ctaSize}>
                          {ctaLabel}
                        </CtaButton>
                      </Link>
                    ) : (
                      <CtaButton variant={ctaVariant} size={ctaSize}>
                        {ctaLabel}
                      </CtaButton>
                    )}

                    {secondaryCta && (
                      <Link
                        href={secondaryCta.href}
                        className={cn(
                          "inline-flex items-center rounded-full border-2 border-white font-body font-semibold text-white transition-colors hover:bg-white/10",
                          ctaSize === "sm"
                            ? "px-5 py-2 text-p3"
                            : "px-7 py-3 text-p2"
                        )}
                      >
                        {secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Right — image */}
              <div className="relative hidden lg:block p-4 pl-0 py-4 pr-4 h-full">
                <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                  <Image
                    src={image}
                    alt="Business meeting"
                    fill
                    sizes="(min-width: 1800px) 824px, (min-width: 1280px) 46vw, (min-width: 1024px) 50vw, 0px"
                    className={imageClassName}
                    quality={82}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
