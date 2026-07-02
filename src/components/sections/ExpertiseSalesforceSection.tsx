import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import Image from "next/image";

interface ExpertiseSalesforceSectionProps {
  heading: string;
  text: string;
  image: string;
}

export function ExpertiseSalesforceSection({
  heading,
  text,
  image,
}: ExpertiseSalesforceSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start gap-6">
            <GreenLineMark className="w-16 h-auto -mb-2" />
            <Heading as="h2" className="text-[#000000] leading-tight">
              {heading}
            </Heading>
            <Text variant="p2" className="text-gray-700 leading-relaxed mt-2">
              {text}
            </Text>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full max-w-md mx-auto aspect-square">
             <Image
                src={image}
                alt="Salesforce Partner"
                fill
                className="object-contain"
              />
          </div>
        </div>
      </Container>
    </Section>
  );
}
