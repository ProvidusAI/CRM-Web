"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

const believeCards: CardItem[] = [
  {
    title: "Build What Matters",
    description: "We dig past surface-level requirements to understand what the business actually needs. As a result, the solutions we deliver fix root causes, not symptoms.",
    icon: "/images/build-matters.webp",
    bgImage: "/images/build-matters-bg.webp"
  },
  {
    title: "Get It Right",
    description: "Every configuration, integration, and line of code follows Salesforce best practices. Consequently, our work holds up under pressure and remains easy to maintain over time.",
    icon: "/images/get-it-right.webp",
    bgImage: "/images/get-it-right-bg.webp"
  },
  {
    title: "Own Every Outcome",
    description: "We take responsibility for what we deliver. From scoping to post-launch support, our team stays accountable to the timelines, budgets, and results we commit to.",
    icon: "/images/outcome.webp",
    bgImage: "/images/outcome-bg.webp"
  },
  {
    title: "Drive Self-Sufficiency",
    description: "We do not build dependency. Instead, we transfer knowledge through documentation and training so client teams can run their Salesforce platform with confidence.",
    icon: "/images/drive-self.webp",
    bgImage: "/images/drive-self-bg.webp"
  }
];

interface BelieveSectionProps {
  title?: string;
  cards?: CardItem[];
}

export function BelieveSection({
  title = "What We Believe In",
  cards = believeCards,
}: BelieveSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 bg-white">
      <Image
        src="/images/believe-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
        quality={78}
      />
      <Container className="relative z-10">
        {/* Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-24">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="w-16 h-auto mb-6"
            />
            <Heading as="h2" className="text-black font-bold">
              {title}
            </Heading>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pt-8">
          {cards.map((card, index) => (
            <Reveal
              key={index}
              direction="up"
              delay={0.1 + index * 0.1}
              height="100%"
            >
              <BelieveCard card={card} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface CardItem {
  title: string;
  description: string;
  icon: string;
  bgImage?: string;
  bgColor?: string;
}

function BelieveCard({ card }: { card: CardItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static White Card Container with Fixed/Equal Height */}
      <div
        className="bg-white flex flex-col items-center w-full h-full min-h-[435px] border border-[#eee] transition-all duration-300"
        style={{
          borderRadius: "24px",
          boxShadow: "0px 11.81px 25.83px 0px #0000000A, 0px 46.49px 46.49px 0px #0000000A, 0px 104.79px 62.73px 0px #00000005, 0px 185.97px 74.53px 0px #00000003, 0px 290.02px 81.18px 0px #00000000",
          backdropFilter: "blur(23.614662170410156px)",
          // The container will not crop elements that slide out of it at the top
          overflow: "visible",
        }}
      >
        {/* Blue Cover Card - Slides UP on hover */}
        <motion.div
          className="w-full h-[220px] relative flex items-center justify-center cursor-pointer shrink-0"
          style={{
            ...(card.bgImage
              ? {
                  backgroundImage: `url('${card.bgImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: card.bgColor || "var(--color-brand-blue-light)" }),
            boxShadow: "0px 11.81px 25.83px 0px #0000000A, 0px 46.49px 46.49px 0px #0000000A, 0px 104.79px 62.73px 0px #00000005, 0px 185.97px 74.53px 0px #00000003, 0px 290.02px 81.18px 0px #00000000",
            backdropFilter: "blur(23.614662170410156px)",
            borderRadius: "24px",
            // Position absolute relative to top of the card to enable smooth overlap/overflow
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10
          }}
          animate={{
            y: isHovered ? -35 : 0,
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered
              ? "0px 20px 40px 0px rgba(0, 0, 0, 0.15)"
              : "0px 11.81px 25.83px 0px #0000000A, 0px 46.49px 46.49px 0px #0000000A, 0px 104.79px 62.73px 0px #00000005, 0px 185.97px 74.53px 0px #00000003, 0px 290.02px 81.18px 0px #00000000"
          }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Inner Card Icon Container - centered inside blue cover */}
          <div className="w-[156px] h-[112px] rounded-2xl bg-white p-4">
            <div className="relative size-full">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                sizes="156px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Content Section - positioned below the blue cover height to clear space */}
        <div
          className="flex flex-col items-center text-center px-6 pb-12 pt-[240px] flex-1"
        >
          <Text variant="p1" className="text-black font-semibold mb-3">
            {card.title}
          </Text>
          <Text variant="p4" className="text-[#4F4D4B] leading-relaxed flex-1 flex items-center justify-center">
            {card.description}
          </Text>
        </div>
      </div>
    </div>
  );
}
