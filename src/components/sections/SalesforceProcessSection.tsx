"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  DraftingCompass,
  Target,
  CodeXml,
  Rocket,
  Headset,
} from "lucide-react";

export interface SalesforceProcessStep {
  title: string;
  description?: string;
  iconKey?: string;
  colorTheme?: string;
}

interface SalesforceProcessSectionProps {
  title?: string;
  steps?: SalesforceProcessStep[];
}

const iconMap = {
  analysis: ClipboardCheck,
  design: DraftingCompass,
  strategy: Target,
  development: CodeXml,
  release: Rocket,
  support: Headset,
};

export function SalesforceProcessSection({
  title = "Our Salesforce\nDevelopment Process",
  steps,
}: SalesforceProcessSectionProps) {
  const displaySteps = (steps ?? []).filter((step) => step.title?.trim());

  if (displaySteps.length === 0) {
    return null;
  }

  return (
    <Section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          {/* Green logo icon to match the image header */}
          <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          <Heading as="h2" className="text-slate-900 mb-6 font-bold">
            {title.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </Heading>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 relative mx-auto z-10">
          {displaySteps.map((step, index) => {
            const Icon =
              iconMap[step.iconKey as keyof typeof iconMap] || ClipboardCheck;
            const isGreen = step.colorTheme === "green";
            const isLeft = index % 2 === 0;
            const isLast = index === displaySteps.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "relative w-full md:w-[calc(50%-2rem)]",
                  isLeft ? "self-start" : "self-end"
                )}
              >
                <div
                  className={cn(
                    "relative rounded-[1.5rem] p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 h-full z-10",
                    isGreen
                      ? "bg-[#F5FFF2] border-[#D9D9D9] shadow-[0px_4px_23px_10px_rgba(0,0,0,0.05)]"
                      : "bg-[#F0F7FF] border-[#D9D9D9] shadow-[0px_4px_23px_10px_rgba(0,0,0,0.05)]"
                  )}
                  style={{ borderWidth: "1px" }}
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center shadow-sm text-white shrink-0",
                        isGreen ? "bg-[#2FA113]" : "bg-[#2271CE]"
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <Heading as="h3" level="h4" className="text-slate-900 m-0">
                      0{index + 1} - {step.title}
                    </Heading>
                  </div>
                  <Text variant="p2" className="text-slate-800 leading-relaxed">
                    {step.description}
                  </Text>
                </div>

                {/* Connector Line for Left Card */}
                {!isLast && isLeft && (
                  <div
                    className="hidden md:block absolute border-t-2 border-r-2 border-dashed border-slate-300 rounded-tr-[1.5rem] z-[-1]"
                    style={{
                      top: "50%",
                      left: "100%",
                      width: "calc(50% + 4rem)",
                      height: "calc(50% + 3rem)",
                    }}
                  >
                    <svg
                      className="absolute -bottom-[2px] -right-[11px] w-5 h-5 text-slate-300 translate-y-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                )}

                {/* Connector Line for Right Card */}
                {!isLast && !isLeft && (
                  <div
                    className="hidden md:block absolute border-t-2 border-l-2 border-dashed border-slate-300 rounded-tl-[1.5rem] z-[-1]"
                    style={{
                      top: "50%",
                      right: "100%",
                      width: "calc(50% + 4rem)",
                      height: "calc(50% + 3rem)",
                    }}
                  >
                    <svg
                      className="absolute -bottom-[1px] -left-[11px] w-5 h-5 text-slate-300 translate-y-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
