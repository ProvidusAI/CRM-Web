"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ExpertiseSalesforceSectionProps {
  heading: ReactNode;
  /** Single block of copy. Ignored when `paragraphs` is supplied. */
  text?: string;
  /** Multi-paragraph copy, used by the partner pages. */
  paragraphs?: string[];
  image: string;
  imageAlt?: string;
  /**
   * "contain" is the original transparent-badge treatment. "framed" is the
   * partner-page photo: a white rounded card with the image cropped to fill.
   */
  imageVariant?: "contain" | "framed";
  /** Drop the mark when the heading already carries an inline one. */
  hideMark?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ExpertiseSalesforceSection({
  heading,
  text,
  paragraphs,
  image,
  imageAlt = "Salesforce Partner",
  imageVariant = "contain",
  hideMark = false,
  ctaLabel,
  ctaHref,
}: ExpertiseSalesforceSectionProps) {
  const copy = paragraphs?.length ? paragraphs : text ? [text] : [];
  const isFramed = imageVariant === "framed";

  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-6"
          >
            {!hideMark && <GreenLineMark className="w-16 h-auto -mb-2" />}
            <Heading as="h2" className="text-[#000000] leading-tight">
              {heading}
            </Heading>
            {copy.map((paragraph, index) => (
              <Text
                key={index}
                variant="p2"
                className="text-gray-700 leading-relaxed"
              >
                {paragraph}
              </Text>
            ))}

            {ctaLabel && ctaHref && (
              <Link href={ctaHref} className="mt-2">
                <CtaButton size="md">{ctaLabel}</CtaButton>
              </Link>
            )}
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={
              isFramed
                ? "relative mx-auto w-full max-w-md rounded-[28px] bg-white p-3 shadow-[0px_4px_34px_0px_rgba(0,0,0,0.12)]"
                : "relative w-full max-w-md mx-auto aspect-square"
            }
          >
            {isFramed ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain"
              />
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
