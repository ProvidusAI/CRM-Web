"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/Carousel";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DEFAULT_FEATURED_ROLES, type FeaturedRole } from "@/data/featuredRoles";

export type { FeaturedRole };

interface FeaturedRolesSectionProps {
  title?: string;
  roles?: FeaturedRole[];
}

export function FeaturedRolesSection({
  title = "Featured Roles",
  roles = DEFAULT_FEATURED_ROLES,
}: FeaturedRolesSectionProps) {
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

  return (
    <Section className="overflow-hidden bg-white">
      <Container>
        <div className="text-center">
          <GreenLineMark className="mx-auto h-auto w-16" />
          <Heading as="h2" className="mt-5 text-black">
            {title}
          </Heading>
        </div>
      </Container>

      <div className="relative mt-14">
        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          setApi={setEmblaApi}
          className="w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Container>
            <CarouselContent className="pb-2 pt-2">
              {roles.map((role, index) => (
                <CarouselItem
                  key={`${role.title}-${index}`}
                  className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="flex h-full min-h-[449px] flex-col rounded-[18px] bg-linear-to-b from-[#fafdff] to-[#eaf7ff] p-6 shadow-[0px_4px_0px_0px_#3276ba]">
                    <Heading as="h3" level="h4" className="text-type-title">
                      {role.title}
                    </Heading>

                    <ul className="mt-6 list-disc space-y-1 pl-5 text-[#3276ba]">
                      {role.details.map((detail, detailIndex) => (
                        <li key={`${detail}-${detailIndex}`}>
                          <Text
                            variant="p3"
                            as="span"
                            className="!font-semibold"
                          >
                            {detail}
                          </Text>
                        </li>
                      ))}
                    </ul>

                    <hr className="mt-6 w-20 border-t-2 border-[#3276ba]" />

                    <Text variant="p4" className="mt-6 text-type-body">
                      {role.description}
                    </Text>

                    <Link
                      href="/contact"
                      className="mt-auto inline-flex w-fit items-center gap-2 self-start rounded-full bg-migration-blue px-5 py-2.5 text-white transition-colors hover:bg-blue-600"
                    >
                      <Text variant="p3" as="span" className="!font-medium">
                        Apply Now
                      </Text>
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Container>

          <div className="mt-10 flex justify-center gap-4">
            <CarouselPrevious className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
            <CarouselNext className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
}
