"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

// `href` is set only for industries that have a dedicated internal page; those
// headings link, the rest stay plain text.
interface Industry {
  title: string;
  image: string;
  description: string;
  href?: string;
}

const industries: Industry[] = [
  {
    title: "Nonprofit",
    image: "/images/industries/non-profit.webp",
    description: "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data. Teams spend less time on admin and more time on mission delivery.",
    href: "/industries/salesforce-nonprofit-consulting"
  },
  {
    title: "Education",
    image: "/images/industries/education.webp",
    description: "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform. No student record falls through the gaps, and no department works in isolation."
  },
  {
    title: "Commerce",
    image: "/images/industries/commerce.webp",
    description: "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. One platform powers the full buying experience."
  },
  {
    title: "Healthcare",
    image: "/images/industries/healthcare.webp",
    description: "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance. Additionally, clinical and non-clinical teams work from the same data, so nothing gets lost between departments.",
    href: "/industries/salesforce-health-cloud-consulting"
  },
  {
    title: "Financial Services",
    image: "/images/industries/financial-services.webp",
    description: "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts. Furthermore, KYC processes and advisor dashboards run from one platform built for how regulators expect firms to operate.",
    href: "/industries/salesforce-financial-services-cloud-consulting"
  },
  {
    title: "Manufacturing",
    image: "/images/industries/manufacturing.webp",
    description: "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning. As a result, commercial teams get accurate visibility into the pipeline and run-rate business without relying on disconnected spreadsheets."
  }
];

export function IndustryDetailSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative py-24 bg-white pb-32">
      <Container>
        <div className="flex flex-col relative">
          {industries.map((item, index) => (
            <IndustryCard
              key={item.title}
              item={item}
              index={index}
              progress={scrollYProgress}
              totalCards={industries.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface IndustryCardProps {
  item: Industry;
  index: number;
  progress: MotionValue<number>;
  totalCards: number;
}

function IndustryCard({ item, index, progress, totalCards }: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isImageLeft = index % 2 === 0;
  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const isFirstCard = index === 0;
  const entryStart = (index - 1) / totalCards;
  const entryEnd = index / totalCards;

  const scaleInputRange = isFirstCard
    ? [0, 1]
    : entryStart === 0
      ? [0, entryEnd, 1]
      : [0, entryStart, entryEnd, 1];
  const scaleOutputRange = isFirstCard
    ? [1, targetScale]
    : entryStart === 0
      ? [0.85, 1, targetScale]
      : [0.85, 0.85, 1, targetScale];

  const scale = useTransform(progress, scaleInputRange, scaleOutputRange);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(cardScrollProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div
      ref={cardContainerRef}
      className="h-[70vh] md:h-[80vh] flex items-start justify-center sticky pt-4"
      style={{
        zIndex: index,
        top: `calc(5.5rem + ${index * 24}px)`,
      }}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-8 md:gap-16 p-6 md:p-8 md:pl-8 md:pr-16 overflow-hidden transition-shadow duration-500",
          !isImageLeft && "md:flex-row-reverse md:pr-8 md:pl-16",
          isHovered && "shadow-2xl border-white/30"
        )}
        style={{
          scale,
          background: "linear-gradient(217.87deg, #FFFFFF -13.97%, #1D70C5 78.47%)",
          boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.15), inset 0px 1px 1px rgba(255,255,255,0.2)",
          borderRadius: "40px",
        }}
      >


        {/* Image Container */}
        <div className="w-full md:w-[48%] shrink-0 overflow-hidden rounded-[30px]">
          <div className="relative aspect-[4/3] w-full h-full overflow-hidden border border-white/10">
            <motion.div
              style={{ scale: imageScale }}
              className="relative w-full h-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index < 2}
              />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-white py-4 flex flex-col gap-4">
          {item.href ? (
            <Link
              href={item.href}
              className="w-fit transition-opacity hover:opacity-80"
              aria-label={`Explore Salesforce for ${item.title}`}
            >
              <Heading as="h3" className="text-white !text-[28px] !leading-[32px] md:!text-[40px] md:!leading-[25px] font-heading font-bold underline-offset-4 hover:underline">
                {item.title}
              </Heading>
            </Link>
          ) : (
            <Heading as="h3" className="text-white !text-[28px] !leading-[32px] md:!text-[40px] md:!leading-[25px] font-heading font-bold">
              {item.title}
            </Heading>
          )}
          <Text variant="p2" className="text-white/90 !text-[15px] md:!text-[18px] leading-relaxed">
            {item.description}
          </Text>
        </div>
      </motion.div>
    </div>
  );
}

