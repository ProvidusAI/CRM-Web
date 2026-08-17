import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Handshake,
  Layers,
  RotateCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import type {
  ServiceBenefitColorTheme,
  ServiceBenefitIconKey,
} from "@/sanity/lib/types";

export interface ServiceBenefitCard {
  title: string;
  description: string;
  iconKey?: ServiceBenefitIconKey;
  /** Wins over `iconKey`. For pages whose steps have no matching CMS icon key. */
  icon?: LucideIcon;
  colorTheme?: ServiceBenefitColorTheme;
}

interface ServiceBenefitsSectionProps {
  title?: string;
  items: ServiceBenefitCard[];
}

const iconMap: Record<ServiceBenefitIconKey, LucideIcon> = {
  roi: TrendingUp,
  adoption: Users,
  maturity: Layers,
  visibility: Eye,
  view360: RotateCw,
  partnership: Handshake,
};

const themeClasses: Record<ServiceBenefitColorTheme, string> = {
  blue: "from-brand-blue-light to-white",
  green: "from-[#E8FFE2] to-white",
  yellow: "from-[#FFF8D8] to-white",
  peach: "from-[#FFF0E7] to-white",
  pink: "from-[#FFE8F8] to-white",
  purple: "from-[#EFE9FF] to-white",
};

export function ServiceBenefitsSection({
  title = "How Our Salesforce Consulting Services Help You",
  items,
}: ServiceBenefitsSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container size="lg">
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            aria-hidden="true"
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mx-auto mt-5 max-w-2xl text-black">
            {title}
          </Heading>
        </div>

        <div className="relative mt-14 space-y-8">
          {items.map((item, index) => {
            const Icon = item.icon ?? iconMap[item.iconKey || "roi"];
            const theme = themeClasses[item.colorTheme || "blue"];

            return (
              <article
                key={`${item.title}-${index}`}
                className={`relative rounded-[22px] bg-linear-to-r ${theme} p-6 shadow-sm md:p-8`}
              >
                {/* Dashed line connecting to next card */}
                {index !== items.length - 1 && (
                  <div className="absolute left-[63px] top-[64px] z-0 hidden h-[calc(100%+32px)] w-[2px] border-l-2 border-dashed border-brand-green-light md:block" />
                )}

                <div className="relative z-10 flex flex-row items-start gap-4 md:gap-6 lg:gap-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg md:h-16 md:w-16 md:rounded-2xl">
                    <Icon className="h-6 w-6 text-black md:h-7 md:w-7" />
                  </div>
                  <div className="flex-1 md:pt-1">
                    <Text variant="p1" className="text-brand-blue">
                      {item.title}
                    </Text>
                    <Text variant="p3" className="mt-2 text-black md:mt-3">
                      {item.description}
                    </Text>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
