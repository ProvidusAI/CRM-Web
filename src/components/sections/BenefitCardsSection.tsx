"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";

export interface BenefitCardItem {
  title: string;
  description: string;
  /** White 36px icon on the blue chip. */
  iconSrc?: string;
}

export interface BenefitCardsImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface BenefitCardsSectionProps {
  title: string;
  image?: BenefitCardsImage;
  items: BenefitCardItem[];
}

// Height of the fixed navbar the pinned block sits under.
const PIN_TOP = 88;
// Pin only where the whole block fits beside the navbar; elsewhere, and for
// reduced motion, the cards just stack and the page scrolls normally.
const PIN_QUERY = "(min-width: 1280px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

export function BenefitCardsSection({ title, image, items }: BenefitCardsSectionProps) {
  const outer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  // How far the list has to travel to show its last card.
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned || !viewport.current || !list.current) return;
    const measure = () =>
      setOverflow(Math.max(0, (list.current?.scrollHeight ?? 0) - (viewport.current?.clientHeight ?? 0)));
    const ro = new ResizeObserver(measure);
    ro.observe(viewport.current);
    ro.observe(list.current);
    return () => ro.disconnect();
  }, [pinned]);

  // While the block is pinned, page scroll drives the list 1:1 instead of a nested scrollbar.
  const y = useMotionValue(0);
  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const top = outer.current?.getBoundingClientRect().top ?? PIN_TOP;
      y.set(-Math.min(overflow, Math.max(0, PIN_TOP - top)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinned, overflow, y]);

  if (items.length === 0) return null;

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container>
        <div
          ref={outer}
          className="mx-auto max-w-[1240px]"
          style={pinned ? { height: `calc(100vh - ${PIN_TOP}px + ${overflow}px)` } : undefined}
        >
          <div
            className={pinned ? "sticky flex flex-col justify-center" : undefined}
            style={pinned ? { top: PIN_TOP, height: `calc(100vh - ${PIN_TOP}px)` } : undefined}
          >
            <div className="text-center">
              <Image src="/images/green-line.svg" alt="" aria-hidden="true" width={64} height={24} className="mx-auto h-auto w-16" />
              <Heading as="h2" className="mx-auto mt-5 max-w-3xl text-black">
                {title}
              </Heading>
            </div>

            <div className="mt-12 flex flex-col gap-8 md:mt-[70px] xl:flex-row xl:items-stretch xl:gap-[39px]">
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 320px, 100vw"
                  className="mx-auto h-auto w-full max-w-[320px] shrink-0 rounded-2xl object-cover xl:mx-0 xl:w-[320px]"
                />
              )}
              {/* Pinned: the image sets the row height and the list slides through it. */}
              <div
                ref={viewport}
                className={
                  pinned
                    ? "relative flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
                    : "flex-1"
                }
              >
                <motion.ul
                  ref={list}
                  style={pinned ? { y } : undefined}
                  // Bottom padding lets the last card clear the fade before the pin releases.
                  className={pinned ? "absolute inset-x-0 top-0 flex flex-col gap-5 pb-14" : "flex flex-col gap-5"}
                >
                  {items.map((item, index) => (
                    <li
                      key={`${item.title}-${index}`}
                      className="flex flex-col items-start gap-5 rounded-[20px] border border-card-border bg-cost-card-blue px-6 py-6 shadow-[0_4px_11.5px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:gap-0 md:px-[37px] md:py-[33px]"
                    >
                      <div className="flex items-center gap-5 sm:gap-10 md:w-[370px] md:shrink-0">
                        <div className="flex h-[60px] w-[67px] shrink-0 items-center justify-center rounded-[9px] bg-cost-icon-blue shadow-[0_6px_12px_-2px_rgba(171,171,171,0.6)]">
                          {item.iconSrc && <Image src={item.iconSrc} alt="" aria-hidden="true" width={36} height={36} unoptimized />}
                        </div>
                        <Heading as="h3" level="h4" className="text-text-heading md:!leading-[33px] md:!tracking-[-0.24px]">
                          {item.title}
                        </Heading>
                      </div>
                      <Text variant="p4" className="flex-1 text-black !text-[12px] !leading-[20px] md:!text-[12px] md:!leading-[20px]">
                        {item.description}
                      </Text>
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
