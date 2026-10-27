"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface IdentityResolutionColumn {
  title: string;
  /** Two paragraphs today; any number renders. */
  paragraphs: string[];
}

export interface IdentityResolutionContent {
  /** First heading line; a line break (desktop only) follows it. */
  headingStart: string;
  /** Second heading line; the green squiggle follows it. */
  headingEnd: string;
  introParagraphs: string[];
  desktopImage: string;
  desktopImageAlt: string;
  mobileImage: string;
  mobileImageAlt: string;
  /** Laid out as three columns (md and up). */
  columns: IdentityResolutionColumn[];
}

const DIAGRAM_ALT = "How Identity Resolution Works Diagram";

export const DEFAULT_IDENTITY_RESOLUTION: IdentityResolutionContent = {
  headingStart: "How Identity",
  headingEnd: "Resolution Works",
  introParagraphs: [
    "Identity resolution decides whether two records belong to the same person.",
    "Get it right, and every dashboard, segment, and AI feature downstream becomes trustworthy. Get it wrong, and you cannot trust anything Data Cloud produces.",
  ],
  desktopImage: "/images/data-cloud-identity.svg",
  desktopImageAlt: DIAGRAM_ALT,
  mobileImage: "/images/platform-expertise/identiy-mob.png",
  mobileImageAlt: DIAGRAM_ALT,
  columns: [
    {
      title: "The Two Failure modes",
      paragraphs: [
        "Exact-match-only rules miss obvious duplicates: \"John Smith\" and \"J. Smith\" pointing at the same phone number stay as separate profiles.",
        "Loose, misdirected matching goes the other way, merging two different people who share a common name and a nearby postcode. The right configuration sits between these extremes.",
      ],
    },
    {
      title: "Here's An Example",
      paragraphs: [
        "Consider \"J. Smith, jsmith@email.com, mobile ending 4471, London SW1\" and \"John Smith, john.smith@personalemail.com, mobile ending 4471, London SW1\".",
        "A default configuration keeps them as two profiles. A properly configured multi-attribute rule merges them into one unified profile with two known email addresses, tuned against real sample data.",
      ],
    },
    {
      title: "Survivorship Rules",
      paragraphs: [
        "Once records merge, Data Cloud picks which field values win. Consent should use \"most restrictive wins\" to avoid contacting opt-outs.",
        "Loyalty status should use \"highest value wins\" to avoid downgrading customers. Our consultants make these decisions field by field, documented with your data owners.",
      ],
    },
  ],
};

// Column rhythm by position, as the three hand-written columns had it.
function columnClass(index: number, count: number) {
  if (index === 0) return "md:pr-12 md:border-r border-gray-300";
  if (index === count - 1) return "md:pl-12";
  return "md:px-12 md:border-r border-gray-300";
}

type IdentityResolutionSectionProps = Partial<IdentityResolutionContent>;

export function IdentityResolutionSection({
  headingStart = DEFAULT_IDENTITY_RESOLUTION.headingStart,
  headingEnd = DEFAULT_IDENTITY_RESOLUTION.headingEnd,
  introParagraphs = DEFAULT_IDENTITY_RESOLUTION.introParagraphs,
  desktopImage = DEFAULT_IDENTITY_RESOLUTION.desktopImage,
  desktopImageAlt = DEFAULT_IDENTITY_RESOLUTION.desktopImageAlt,
  mobileImage = DEFAULT_IDENTITY_RESOLUTION.mobileImage,
  mobileImageAlt = DEFAULT_IDENTITY_RESOLUTION.mobileImageAlt,
  columns = DEFAULT_IDENTITY_RESOLUTION.columns,
}: IdentityResolutionSectionProps) {
  return (
    <Section className="py-20 md:py-32 bg-white">
      <Container>
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heading as="h2" className="text-black font-bold leading-tight">
              {headingStart} <br className="hidden md:block" />
              {headingEnd}{" "}
              <GreenLineMark className="inline-block h-8 md:h-10 w-auto align-baseline" />
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {introParagraphs.map((paragraph, index) => (
              <Text key={index} variant="p2" className="text-gray-700">
                {paragraph}
              </Text>
            ))}
          </motion.div>
        </div>

        {/* Middle Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full mb-16 md:mb-24"
        >
          {/* Desktop: wide horizontal diagram */}
          <div className="relative hidden md:block w-full aspect-[1236/193] min-h-[190px]">
            <Image
              src={desktopImage}
              alt={desktopImageAlt}
              fill
              className="object-contain"
            />
          </div>
          {/* Mobile: tall vertical diagram */}
          <div className="relative md:hidden w-full max-w-[420px] mx-auto aspect-[599/1323]">
            <Image
              src={mobileImage}
              alt={mobileImageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Bottom 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {columns.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={columnClass(index, columns.length)}
            >
              <Heading as="h3" level="h4" className="text-black font-bold mb-6">
                {column.title}
              </Heading>
              {column.paragraphs.map((paragraph, pIndex) => (
                <Text
                  key={pIndex}
                  variant="p4"
                  className={cn("text-gray-600 leading-relaxed", pIndex < column.paragraphs.length - 1 && "mb-6")}
                >
                  {paragraph}
                </Text>
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
