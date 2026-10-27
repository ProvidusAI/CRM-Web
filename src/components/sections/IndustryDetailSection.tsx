"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { DEFAULT_INDUSTRIES, type IndustryDetailItem } from "@/data/industryDetail";

interface IndustryDetailSectionProps {
  industries?: IndustryDetailItem[];
}

export function IndustryDetailSection({ industries = DEFAULT_INDUSTRIES }: IndustryDetailSectionProps) {
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
              key={index}
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
  item: IndustryDetailItem;
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

