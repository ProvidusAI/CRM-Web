"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Heading, Text } from "@/components/ui/Typography";
import { PLATFORM_HREFS } from "@/lib/platformPages";

export interface ExpertiseItem {
  id: number | string;
  title: string;
  icon: string;
  text: string;
  shadow: string;
}

export const expertiseItems: ExpertiseItem[] = [
  {
    id: 1,
    title: "Agentforce",
    icon: "/images/agent-force.webp",
    text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-ups without human input. At ProvidusCRM, we configure Agentforce to work within existing Salesforce workflows so automation runs on real business rules.",
    shadow: "0px 4.36px 0px 0px #0D9DDA",
  },
  {
    id: 2,
    title: "Sales Cloud",
    icon: "/images/sales-cloud.webp",
    text: "Give sales teams full visibility into every deal, from first touch to closed-won. Our team configures Sales Cloud around actual pipeline stages, forecast categories, and reporting needs so reps spend less time on admin and more time selling.",
    shadow: "0px 4.36px 0px 0px #1D70C5",
  },
  {
    id: 3,
    title: "Marketing Cloud",
    icon: "/images/marketing-cloud.webp",
    text: "Run email campaigns, build automated journeys, and segment audiences based on real CRM data. We implement Marketing Cloud with proper data extensions, journey logic, and attribution tracking so every campaign connects back to a measurable pipeline.",
    shadow: "0px 4.36px 0px 0px #F4AC3B",
  },
  {
    id: 4,
    title: "Service Cloud",
    icon: "/images/service-cloud.webp",
    text: "Resolve cases faster with structured queues, automated escalations, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing response times and giving agents the context they need before picking up the phone.",
    shadow: "0px 4.36px 0px 0px #3276BA",
  },
  {
    id: 5,
    title: "Experience Cloud",
    icon: "/images/experience-cloud.webp",
    text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
    shadow: "0px 4.36px 0px 0px #F45A3E",
  },
  {
    id: 6,
    title: "Data Cloud",
    icon: "/images/data-cloud.webp",
    text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
    shadow: "0px 4.36px 0px 0px #8A8FD2",
  },
];

interface ExpertiseSectionProps {
  title?: string;
  items?: ExpertiseItem[];
}

export function ExpertiseSection({ title, items }: ExpertiseSectionProps) {
  const displayItems = items || expertiseItems;
  const carouselItems =
    displayItems.length > 0 && displayItems.length < 8
      ? [...displayItems, ...displayItems]
      : displayItems;
  const defaultTitle = "Our End-to-End Salesforce Platform Expertise";

  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="max-w-lg">
            {title || defaultTitle}
          </Heading>
        </div>
      </Container>

      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full"
        aria-label="Salesforce platform expertise"
      >
        <CarouselContent className="pb-2 pt-2">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              className="basis-[84%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div
                className="flex min-h-[310px] h-full w-full flex-col items-center rounded-[8px] bg-gradient-to-b from-white to-brand-blue-light p-8 text-center transition-transform hover:-translate-y-1"
                style={{
                  boxShadow: item.shadow,
                }}
              >
                <div className="w-[60px] h-[60px] relative mb-8 shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {PLATFORM_HREFS[item.title] ? (
                  <Link
                    href={PLATFORM_HREFS[item.title]}
                    className="mb-4 shrink-0 hover:underline"
                    aria-label={`Explore ${item.title} consulting`}
                  >
                    <Text as="span" variant="p1" className="text-black">
                      {item.title}
                    </Text>
                  </Link>
                ) : (
                  <Text variant="p1" className="text-black mb-4 shrink-0">
                    {item.title}
                  </Text>
                )}

                <div className="w-full h-[1px] bg-gray-200 mb-6 shrink-0" />

                <Text variant="p4" className="text-gray-600 flex-1">
                  {item.text}
                </Text>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-10 flex justify-center gap-4">
          <CarouselPrevious className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
          <CarouselNext className="static h-12 w-12 translate-y-0 border-0 bg-brand-blue text-white shadow-lg hover:bg-blue-600 disabled:opacity-100" />
        </div>
      </Carousel>
    </Section>
  );
}
