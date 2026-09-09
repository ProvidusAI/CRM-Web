"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface MigrationPlatformItem {
  name: string;
  logo?: string;
  logoAlt?: string;
  colorTheme?: string;
  text?: string;
}

interface MigrationPlatformsSectionProps {
  title?: string;
  items?: MigrationPlatformItem[];
}

const defaultPlatforms: MigrationPlatformItem[] = [
  {
    name: "Dynamics 365",
    logo: "/images/migration-logos/dynamics.webp",
    colorTheme: "blue",
    text: "Dynamics migrations are complex because its data model differs sharply from Salesforce. We handle that mapping carefully, moving entities, relationships, and records across cleanly. We move your org from Dynamics accurately, with nothing lost in configurations, data, and integrations between two very different underlying systems.",
  },
  {
    name: "Pipedrive",
    logo: "/images/migration-logos/pipedrive.webp",
    colorTheme: "green",
    text: "Pipedrive is built for simple pipelines, so growing teams quickly need more depth and control. We migrate your deals, contacts, and pipeline history into Salesforce. You keep your momentum while gaining the reporting and automation that Pipedrive simply cannot offer.",
  },
  {
    name: "monday sales CRM",
    logo: "/images/migration-logos/monday-sales-crm.webp",
    colorTheme: "blue",
    text: "Monday CRM suits basic use cases, but scaling teams soon need a deeper, purpose-built platform. We map your boards, items, and relationships to the right Salesforce objects. Your data moves across in a structure that makes proper sense, ready for serious CRM work.",
  },
  {
    name: "SugarCRM",
    logo: "/images/migration-logos/sugarcrm.webp",
    colorTheme: "green",
    text: "We migrate your legacy SugarCRM systems into modern Salesforce environments. We carefully map your custom modules, fields, and historical activity data so your team can hit the ground running without missing a beat.",
  },
  {
    name: "HubSpot",
    logo: "/images/migration-logos/hubspot.webp",
    colorTheme: "blue",
    text: "We migrate your entire HubSpot CRM, bringing across contacts, companies, deals, and activities into Salesforce. Our process ensures that your sales team doesn't skip a beat and immediately benefits from Salesforce's advanced reporting and scalable architecture.",
  },
  {
    name: "Zoho CRM",
    logo: "/images/migration-logos/zohocrm.webp",
    colorTheme: "green",
    text: "Move away from Zoho's rigid structures into Salesforce's scalable ecosystem. We carefully extract and transform your modules and custom fields, giving your sales operations the flexibility and enterprise-grade tools they need to grow.",
  },
  {
    name: "NetSuite",
    logo: "/images/migration-logos/netsuite.webp",
    colorTheme: "blue",
    text: "When NetSuite CRM no longer scales with your sales operations, we seamlessly migrate your data to Salesforce. We ensure complex account hierarchies and financial relationships remain intact during the transition.",
  }
];

export function MigrationPlatformsSection({
  title = "Platforms We Migrate\nYour CRM Org From",
  items = defaultPlatforms,
}: MigrationPlatformsSectionProps) {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const platforms = items.filter((item) => item.name?.trim());

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

  if (platforms.length === 0) {
    return null;
  }

  return (
    <Section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <div className="text-brand-green-light mb-4">
            <svg
              width="64"
              height="32"
              viewBox="0 0 64 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
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
          <Heading as="h2" className="text-slate-900 font-bold">
            {title.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </Heading>
        </div>
      </Container>

      <div className="relative">
        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          setApi={setEmblaApi}
          className="w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselContent className="px-4 md:px-8 py-8 -ml-4 md:-ml-8">
          {platforms.map((item, index) => (
            <CarouselItem
              key={`${item.name}-${index}`}
              className="pl-4 md:pl-8 basis-[90%] sm:basis-[60%] md:basis-[45%] lg:basis-[30%] xl:basis-[28%]"
            >
              <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 h-full min-h-[420px] flex flex-col bg-white transition-transform hover:-translate-y-1 shadow-[0px_4px_23px_10px_rgba(0,0,0,0.05)] border border-slate-100">
                {/* Background Glows */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent opacity-40 pointer-events-none",
                    item.colorTheme === "green" ? "from-[#A0FF88]" : "from-[#308FFF]",
                    "via-white/0"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent opacity-20 pointer-events-none",
                    item.colorTheme === "green" ? "from-[#A0FF88]" : "from-[#308FFF]"
                  )}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-start flex-1">
                  <div className="w-full h-20 relative mb-10 flex items-center justify-center shrink-0">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.logoAlt || item.name}
                        fill
                        className="object-contain object-center"
                      />
                    ) : (
                      <Heading as="h3" level="h4" className="text-center text-slate-800">
                        {item.name}
                      </Heading>
                    )}
                  </div>

                  <Text variant="p3" className="text-slate-600 text-center leading-relaxed">
                    {item.text}
                  </Text>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

        {/* Pause/Play toggle button — visually hidden but accessible */}
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? "Play marquee" : "Pause marquee"}
          className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2h3.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
              <path d="M9.5 2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.5 2h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
              <path d="M9.5 2h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
            </svg>
          )}
        </button>
      </div>
    </Section>
  );
}
