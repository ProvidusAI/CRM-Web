"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading } from "@/components/ui/Typography";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";

interface EventSlide {
  name: string;
  folder: string;
  /** Display size: half the 2x logo export. */
  logo: { width: number; height: number };
  photoCount: number;
  description: string;
}

// Figma 725:3235 and its three sibling frames. Images live in
// public/images/events/<folder>/ as bg.webp, logo.webp and 1..N.webp.
const EVENTS: EventSlide[] = [
  {
    name: "TechCrunch Disrupt",
    folder: "disrupt",
    logo: { width: 416, height: 82 },
    photoCount: 8,
    description:
      "The world's leading gathering of startups, investors, and tech innovators. ProvidusCRM attends to connect with growing businesses looking to scale smarter with Salesforce.",
  },
  {
    name: "Singapore FinTech Festival",
    folder: "singapore-fintect",
    logo: { width: 342, height: 158 },
    photoCount: 4,
    description:
      "The largest fintech event in the world, bringing together banks, regulators, and technology providers across Asia and beyond. ProvidusCRM joins to explore how Salesforce is shaping financial services and CRM strategy in the fintech space.",
  },
  {
    name: "GITEX Asia Singapore",
    folder: "gitex-singapre",
    logo: { width: 254, height: 147 },
    photoCount: 4,
    description:
      "One of the largest technology exhibitions globally, held in Dubai, covering everything from AI to enterprise software. ProvidusCRM attends to showcase our Salesforce consulting and implementation expertise to businesses across the Middle East and beyond.",
  },
  {
    name: "AI Everything Middle East & Africa, Egypt",
    folder: "ai-egypt",
    logo: { width: 170, height: 194 },
    photoCount: 4,
    description:
      "A leading AI-focused event bringing together innovators, enterprises, and government bodies across the MENA region. ProvidusCRM takes part to discuss how AI and Salesforce, including Agentforce, are transforming customer relationship management.",
  },
];

const AUTOPLAY_MS = 8000;
// One copy of a column's photo set must be taller than the slide (703px), or
// the loop shows empty space: three 323px rows is 970px.
const MIN_PHOTOS_PER_SET = 3;
const SECONDS_PER_PHOTO = 8;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function photosFor(event: EventSlide) {
  return Array.from(
    { length: event.photoCount },
    (_, i) => `/images/events/${event.folder}/${i + 1}.webp`
  );
}

function PhotoColumn({ photos, direction }: { photos: string[]; direction: "up" | "down" }) {
  const set = Array.from(
    { length: Math.ceil(MIN_PHOTOS_PER_SET / photos.length) },
    () => photos
  ).flat();
  // The second copy makes the -50% translate seamless.
  const loop = [...set, ...set];

  return (
    <div className="h-full overflow-hidden">
      <ul
        className={cn(
          "flex flex-col",
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        )}
        style={{ animationDuration: `${set.length * SECONDS_PER_PHOTO}s` }}
      >
        {loop.map((src, i) => (
          // pb (not gap) keeps both copies the same height, so -50% lands exactly.
          <li key={`${src}-${i}`} className="pb-[38px]">
            <div className="relative aspect-[263/285.5] w-full overflow-hidden rounded-[15px]">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 263px, 45vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "right" ? "rotate-180" : undefined}
    >
      <path
        d="M9.5 6.5L4.14142 11.8586C4.06332 11.9367 4.06332 12.0633 4.14142 12.1414L9.5 17.5M4.08284 12H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ARROW_BUTTON =
  "-m-2.5 flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

export function EventsSection() {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [selected, setSelected] = useState(0);
  // Autoplay stops for good once the visitor takes over, or never starts
  // under reduced motion.
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStopped(true);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onPointerDown = () => setStopped(true);
    onSelect();
    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);
    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onPointerDown);
    };
  }, [api]);

  // `selected` restarts the timer, so every slide gets the full interval.
  useEffect(() => {
    if (!api || stopped || hovered) return;
    const timer = setTimeout(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [api, stopped, hovered, selected]);

  const current = EVENTS[selected];

  return (
    <section aria-labelledby="events-heading" className="pt-24 pb-20">
      <div className="mx-auto mb-12 flex max-w-[1440px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <GreenLineMark className="mb-6 h-auto w-16" />
        <Heading as="h2" id="events-heading" className="text-black">
          Events &amp; Industry Conferences We Attend
        </Heading>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Carousel opts={{ loop: true }} setApi={setApi} aria-label="Events">
          <CarouselContent className="ml-0">
            {EVENTS.map((event, index) => {
              const photos = photosFor(event);
              return (
                <CarouselItem
                  key={event.folder}
                  className="pl-0"
                  aria-label={`Event ${index + 1} of ${EVENTS.length}: ${event.name}`}
                >
                  <div className="relative h-full overflow-hidden xl:h-[703px]">
                    <Image
                      src={`/images/events/${event.folder}/bg.webp`}
                      alt=""
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                    {/* Figma 725:3235: 494px text column at x=101/y=86; photo
                        columns 263px wide, 38px apart, 100px from the right. */}
                    <div className="relative mx-auto flex h-full max-w-[1440px] flex-col gap-10 px-4 pt-12 pb-44 sm:px-6 xl:flex-row xl:justify-between xl:gap-12 xl:px-[100px] xl:py-0">
                      <div className="flex max-w-[494px] flex-col gap-6 xl:gap-[45px] xl:pt-[86px]">
                        <Image
                          src={`/images/events/${event.folder}/logo.webp`}
                          alt={event.name}
                          width={event.logo.width}
                          height={event.logo.height}
                          style={{ "--logo-w": `${event.logo.width}px` } as CSSProperties}
                          className="h-auto max-h-24 w-auto max-w-full self-start xl:max-h-none xl:w-(--logo-w)"
                        />
                        <p className="typography-p3 text-white xl:typography-p2 xl:!leading-8">
                          {event.description}
                        </p>
                      </div>
                      <div
                        role="img"
                        aria-label={`ProvidusCRM at ${event.name}`}
                        className="grid h-[360px] w-full max-w-[564px] shrink-0 grid-cols-2 gap-[38px] xl:h-full xl:w-[564px]"
                      >
                        <PhotoColumn photos={photos.filter((_, i) => i % 2 === 0)} direction="up" />
                        <PhotoColumn photos={photos.filter((_, i) => i % 2 === 1)} direction="down" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* One shared set of controls, so offscreen slides add no tab stops.
            Desktop: arrow 100px from the left; the counter's 104px blue fill
            has its 10px ring outside it, 36px above the slide bottom. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 xl:bottom-9">
          <div className="mx-auto flex max-w-[1440px] justify-center px-4 sm:px-6 xl:justify-start xl:px-[100px]">
            <div className="pointer-events-auto flex items-center">
              <button
                type="button"
                aria-label="Previous event"
                className={ARROW_BUTTON}
                onClick={() => {
                  setStopped(true);
                  api?.scrollPrev();
                }}
              >
                <ArrowIcon direction="left" />
              </button>
              <div
                aria-hidden="true"
                className="mx-1.5 flex size-[124px] items-center justify-center rounded-full border-[10px] border-migration-blue/30 bg-migration-blue bg-clip-padding"
              >
                <span className="typography-p3 !text-[18px] !leading-7 !font-semibold text-white">
                  {pad(selected + 1)}/{pad(EVENTS.length)}
                </span>
              </div>
              <button
                type="button"
                aria-label="Next event"
                className={ARROW_BUTTON}
                onClick={() => {
                  setStopped(true);
                  api?.scrollNext();
                }}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        {/* Announced only once autoplay has stopped, so it doesn't speak every 8s. */}
        <p
          data-testid="events-status"
          aria-live={stopped ? "polite" : "off"}
          className="sr-only"
        >
          {current.name}, event {selected + 1} of {EVENTS.length}
        </p>
      </div>
    </section>
  );
}
