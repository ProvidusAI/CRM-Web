"use client";

import Image from "next/image";
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
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading, Text } from "@/components/ui/Typography";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface OfferCarouselItem {
  title: string;
  text: string;
  icon?: string;
  iconAlt?: string;
}

interface OfferCarouselSectionProps {
  title?: string;
  items: OfferCarouselItem[];
}

export function OfferCarouselSection({
  title,
  items,
}: OfferCarouselSectionProps) {
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
      {title ? (
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center"
          >
            <GreenLineMark className="mb-4 h-auto w-16" />
            <Heading as="h2" className="text-slate-900 font-bold leading-tight">
              {title}
            </Heading>
          </motion.div>
        </Container>
      ) : null}

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
                <div className="relative overflow-hidden rounded-[18px] border border-white bg-gradient-to-br from-[#f4f4f4] to-white shadow-[0px_7px_9px_rgba(0,0,0,0.05)] p-7 min-h-[287px] h-full flex flex-col items-start transition-transform hover:-translate-y-1">
                  {item.icon && (
                    <div className="absolute top-7 right-7 h-[76px] w-[76px]">
                      <Image
                        src={item.icon}
                        alt={item.iconAlt ?? ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="mt-auto w-full pt-24">
                    <h4 className="typography-p1 font-semibold text-type-title mb-4">
                      {item.title}
                    </h4>

                    <Text variant="p4" className="text-type-body">
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
