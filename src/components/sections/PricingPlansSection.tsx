import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  description: string;
  includes: string[];
  featured?: boolean;
}

interface PricingPlansSectionProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
}

// Figma 593:28 — centered header over a 3-col grid of plan cards, one
// optionally featured with a green border.
export function PricingPlansSection({
  title,
  subtitle,
  plans,
}: PricingPlansSectionProps) {
  if (!plans || plans.length === 0) return null;

  return (
    <Section background="white">
      <Container>
        <div className="mx-auto mb-12 flex max-w-[1010px] flex-col items-center text-center md:mb-16">
          <GreenLineMark className="mb-4 h-7 w-auto" />
          {title ? (
            <Heading as="h2" className="text-black">
              {title}
            </Heading>
          ) : null}
          {subtitle ? (
            <Text variant="p2" className="mt-5 text-text-body">
              {subtitle}
            </Text>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={`${plan.name}-${index}`} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[20px] bg-white p-10 shadow-[1px_7px_15px_rgba(115,115,115,0.1),4px_27px_27px_rgba(115,115,115,0.09),9px_60px_37px_rgba(115,115,115,0.05)]",
                  plan.featured && "border-2 border-[#92ff77]"
                )}
              >
                <div>
                  <Heading as="h3" level="h3" className="text-black">
                    {plan.name}
                  </Heading>
                  <GreenLineMark className="-mt-2 ml-14 block h-5 w-auto" />
                </div>
                <Text variant="p4" className="mt-6 text-text-body">
                  {plan.description}
                </Text>

                <Text
                  as="p"
                  variant="p2"
                  className="mt-10 text-[#a9a9aa]"
                >
                  Includes:
                </Text>
                <ul className="mt-5 flex flex-col gap-5">
                  {plan.includes.map((row, rowIndex) => (
                    <li
                      key={`${row}-${rowIndex}`}
                      className="flex items-start gap-2"
                    >
                      <Image
                        src="/images/check-circle-dark.svg"
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0"
                      />
                      <Text as="span" variant="p3" className="text-[#35353f]">
                        {row}
                      </Text>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-dashed border-card-border pt-0" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
