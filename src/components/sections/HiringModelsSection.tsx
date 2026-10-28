import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface HiringModelCard {
  title: string;
  text: string;
  borderClass?: string;
  shadowClass?: string;
}

// Figma 457:412 — card recipe (16px radius, 1px colored border, tinted
// drop shadow) matches SplitComparisonCard's, but the stacked-cards-beside-
// a-photo layout doesn't, so this stays its own block.
export const DEFAULT_HIRING_MODELS: (HiringModelCard & { borderClass: string; shadowClass: string })[] = [
  {
    title: "Hourly",
    text: "We equip you with on-demand Salesforce expertise whenever you need it, without having to hire a full-time professional. Best for project-based talent needs, support, and maintenance. You pay for the hours you use and can scale your Salesforce capacity as project requirements change.",
    borderClass: "border-[#33ff00]",
    shadowClass: "shadow-[0_7px_14px_0_rgba(51,255,0,0.21)]",
  },
  {
    title: "Full Time",
    text: "If you're looking for certified Salesforce professionals for long-term implementation, development, and delivery initiatives, we recommend hiring full-time talent. We enable you to hire dedicated Salesforce professionals who integrate with your internal team and work according to your long-term CRM roadmap.",
    borderClass: "border-migration-blue",
    shadowClass: "shadow-[0_7px_14px_0_rgba(48,143,255,0.21)]",
  },
];

export const DEFAULT_HIRING_MODEL_IMAGE = "/images/staff-augmentation/hiring-model-photo.webp";
export const DEFAULT_HIRING_MODEL_IMAGE_ALT =
  "A recruiter reviewing a candidate's CV during a video interview";

interface HiringModelsSectionProps {
  title?: string;
  models?: HiringModelCard[];
  image?: string;
  imageAlt?: string;
}

export function HiringModelsSection({
  title = "Choose The Right Hiring Model",
  models = DEFAULT_HIRING_MODELS,
  image = DEFAULT_HIRING_MODEL_IMAGE,
  imageAlt = DEFAULT_HIRING_MODEL_IMAGE_ALT,
}: HiringModelsSectionProps) {
  return (
    <Section className="border-y border-brand-green bg-[#f6f6f6]">
      <Container>
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            aria-hidden="true"
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mt-5 text-black">
            {title}
          </Heading>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            {models.map((model, index) => (
              <Reveal key={model.title} delay={index * 0.1}>
                <div
                  className={cn(
                    "rounded-2xl border bg-white p-8 md:p-10",
                    model.borderClass,
                    model.shadowClass
                  )}
                >
                  <Heading as="h3" level="h4" className="text-black">
                    {model.title}
                  </Heading>
                  <Text
                    variant="p4"
                    className="mt-4 text-text-body leading-relaxed"
                  >
                    {model.text}
                  </Text>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right">
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[420px] lg:h-[500px]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
