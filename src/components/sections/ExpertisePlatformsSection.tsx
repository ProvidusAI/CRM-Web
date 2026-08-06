"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/Carousel";
import { Heading, Text } from "@/components/ui/Typography";
import { PLATFORM_HREFS } from "@/lib/platformPages";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface ExpertisePlatformItem {
  title: string;
  text: string;
  icon: string;
  bgGradient: string;
}

interface ExpertisePlatformsSectionProps {
  title: string;
  items: ExpertisePlatformItem[];
}

export function ExpertisePlatformsSection({
  title,
  items,
}: ExpertisePlatformsSectionProps) {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>(undefined);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) setIsPaused(true);
  }, []);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  if (!items || items.length === 0) return null;

  return (
    <Section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="text-[#A0FF88] mb-4">
            <svg
              width="64"
              height="32"
              viewBox="0 0 64 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 28L20 8L32 20L48 4L56 12"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 28L36 12L44 20L60 4"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
            </svg>
          </div>
          <Heading as="h2" className="text-slate-900 font-bold leading-tight">
            {title}
          </Heading>
        </motion.div>
      </Container>

      <div className="relative">
        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          setApi={setEmblaApi}
          className="w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselContent className="pb-2 pt-2">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.title}-${index}`}
                className="basis-[84%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div 
                  className="relative overflow-hidden rounded-[24px] p-8 md:p-10 h-full min-h-[380px] flex flex-col items-start transition-transform hover:-translate-y-1 shadow-sm"
                  style={{ background: item.bgGradient }}
                >
                  {item.icon && (
                    <div className="absolute top-8 right-8 w-[64px] h-[64px] md:w-[80px] md:h-[80px]">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="mt-auto w-full pt-20">
                    {PLATFORM_HREFS[item.title] ? (
                      <Link
                        href={PLATFORM_HREFS[item.title]}
                        className="inline-block hover:underline"
                        aria-label={`Explore ${item.title} consulting`}
                      >
                        <h4 className="typography-p1 text-black font-semibold mb-4">
                          {item.title}
                        </h4>
                      </Link>
                    ) : (
                      <h4 className="typography-p1 text-black font-semibold mb-4">
                        {item.title}
                      </h4>
                    )}

                    <Text variant="p4" className="text-gray-800 leading-relaxed">
                      {item.text}
                    </Text>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-10 flex justify-center gap-4">
            <CarouselPrevious className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
            <CarouselNext className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
}
