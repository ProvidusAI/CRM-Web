import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import Image from "next/image";

export interface ExpertiseFeature {
  title: string;
  description: string;
  icon: string; // URL to the image icon
}

interface ExpertiseFeaturesSectionProps {
  features: ExpertiseFeature[];
}

export function ExpertiseFeaturesSection({ features }: ExpertiseFeaturesSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-[16px] p-8 flex flex-col items-start bg-[#F9FFF8]"
              style={{
                boxShadow: `
                  0px 29px 12px 0px rgba(108, 113, 128, 0.01),
                  0px 17px 10px 0px rgba(108, 113, 128, 0.04),
                  0px 7px 7px 0px rgba(108, 113, 128, 0.07),
                  0px 2px 4px 0px rgba(108, 113, 128, 0.08)
                `,
              }}
            >
              {/* Icon Circle */}
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 shrink-0"
                style={{
                  background: "radial-gradient(84.8% 84.8% at 50% 15.2%, #6DE14F 0%, #297017 100%)",
                }}
              >
                <div className="w-[40px] h-[40px] relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text Content */}
              <Heading as="h4" className="text-[#19689F] mb-4 whitespace-pre-line">
                {feature.title}
              </Heading>
              
              <Text variant="p4" className="text-[#000000] opacity-80">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
