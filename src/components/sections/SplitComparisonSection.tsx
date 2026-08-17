"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface SplitComparisonCard {
  title: ReactNode;
  text: string;
  /** Hex driving the border and its matching soft shadow. */
  color: string;
}

interface SplitComparisonSectionProps {
  heading: ReactNode;
  subtitle?: string;
  cards: SplitComparisonCard[];
  /** Replaces the default background and outer spacing wholesale. */
  className?: string;
}

/**
 * Two columns of cards either side of a vertical rule. Cards alternate left and
 * right in source order. An odd count centres the trailing card across both
 * columns, and the rule is dropped — it would otherwise cut straight through it.
 */
export function SplitComparisonSection({
  heading,
  subtitle,
  cards,
  className = "bg-[#F6F6F6] border-y border-[#38A81B] mt-20",
}: SplitComparisonSectionProps) {
  if (cards.length === 0) return null;

  const hasOddTail = cards.length % 2 === 1;

  return (
    <section className={cn("py-20 md:py-32", className)}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto mb-16 md:mb-24 flex flex-col items-center"
        >
          <GreenLineMark className="mb-4 h-auto w-16" />
          <Heading as="h2" className="text-black font-bold leading-tight">
            {heading}
          </Heading>
          {subtitle && (
            <Text variant="p2" className="mt-6 max-w-3xl text-gray-700">
              {subtitle}
            </Text>
          )}
        </motion.div>

        <div className="relative w-full">
          {/* Vertical divider on desktop */}
          {!hasOddTail && (
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 transform -translate-x-1/2" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-y-12 md:gap-y-16 gap-x-0 relative z-10">
            {cards.map((card, index) => {
              const isLeft = index % 2 === 0;
              const isCentredTail = hasOddTail && index === cards.length - 1;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    isCentredTail
                      ? "md:col-span-2 md:mx-auto md:w-1/2 md:px-8"
                      : isLeft
                        ? "md:pr-16 lg:pr-24"
                        : "md:pl-16 lg:pl-24"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    style={{
                      borderRadius: "16px",
                      border: `1px solid ${card.color}`,
                      backgroundColor: "#FFF",
                      boxShadow: `0 7px 14px 0 ${card.color}36`,
                    }}
                    className="p-8 md:p-10 flex flex-col w-full h-full"
                  >
                    <Heading as="h4" className="text-black font-bold mb-4">
                      {card.title}
                    </Heading>
                    <Text variant="p4" className="text-gray-600 leading-relaxed">
                      {card.text}
                    </Text>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
