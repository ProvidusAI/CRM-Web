import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface ExpertiseChallenge {
  title: string;
  text: string;
  icon: string; // URL/path to the image icon
}

interface ExpertiseChallengesSectionProps {
  title?: ReactNode;
  items: ExpertiseChallenge[];
}

// Vertical "staircase" offset applied per card on large screens.
// Cards stack normally (no offset) on mobile/tablet.
const staggerClasses = ["lg:mt-0", "lg:mt-14", "lg:mt-28"];

export function ExpertiseChallengesSection({
  title,
  items,
}: ExpertiseChallengesSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        {title ? (
          <Heading as="h2" className="text-brand-blue mb-12 md:mb-16 max-w-3xl">
            {title}
          </Heading>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col items-start rounded-[16px] border-[6px] border-[#C0DDFF] bg-white p-6 md:p-8",
                staggerClasses[idx % staggerClasses.length]
              )}
            >
              {/* Icon Box */}
              <div
                className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px]"
                style={{
                  background:
                    "radial-gradient(93.3% 93.3% at 50% 48.89%, #BADAFF 0%, rgba(59, 180, 240, 0.00) 100%)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="block h-6 w-6"
                  style={{
                    backgroundColor: "#18689F",
                    maskImage: `url("${item.icon}")`,
                    WebkitMaskImage: `url("${item.icon}")`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              </div>

              {/* Text Content */}
              <Heading as="h4" className="text-brand-blue mb-3 whitespace-pre-line">
                {item.title}
              </Heading>

              <Text variant="p4" className="text-gray-600 leading-relaxed">
                {item.text}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
