import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  title: string;
  text: string;
  /** Raster icon shown in the white tile. */
  icon?: string;
  /** Tailwind `to-[…]` end colour of the card's gradient. */
  gradient?: string;
}

// Figma 460:26–460:164 — same dashed-connector/icon-card recipe as
// ServiceBenefitsSection, but the six icons are custom raster images rather
// than Lucide glyphs, so this stays its own block reusing its gradient values.
// Each step's `gradient` is a Figma gradient fill (top-transparent to
// bottom-solid); none land on an exact @theme token, so they're copied
// verbatim from Figma rather than forced onto a near-miss token.
export const DEFAULT_PROCESS_STEPS: (ProcessStep & { gradient: string })[] = [
  {
    title: "Kickoff call",
    text: "We analyse your requirements and define the Salesforce role, required certifications, technical stack, project scope, seniority, availability, and timeline.",
    icon: "/images/staff-augmentation/process-icon-kickoff-call.png",
    gradient: "to-[#dcf1ff]",
  },
  {
    title: "Choose from our talent pool",
    text: "Browse through our network of Salesforce developers, administrators, consultants, architects, and project managers. We match candidates against your technical and business requirements.",
    icon: "/images/staff-augmentation/process-icon-choose-talent.png",
    gradient: "to-[#dcffee]",
  },
  {
    title: "Review talent profiles",
    text: "We provide detailed candidate profiles with relevant experience, Salesforce expertise, certifications, technical capabilities, and per-hour rates.",
    icon: "/images/staff-augmentation/process-icon-review-profiles.png",
    gradient: "to-[#fffbdc]",
  },
  {
    title: "Agreement and onboarding",
    text: "Once you choose to hire a Salesforce professional, ProvidusCRM handles the agreement, invoicing, payment, compliance, and onboarding process.",
    icon: "/images/staff-augmentation/process-icon-agreement-onboarding.png",
    gradient: "to-[#ffebdc]",
  },
  {
    title: "Scale on demand",
    text: "Add specialists when project demand increases. Reduce capacity when it decreases. Build a larger delivery team when your Salesforce roadmap expands.",
    icon: "/images/staff-augmentation/process-icon-scale-on-demand.png",
    gradient: "to-[#ffdcf8]",
  },
  {
    title: "Continuous support",
    text: "ProvidusCRM stays involved even after equipping you with the Salesforce talent of your choice. We support communication, collaboration, performance, and resource requirements.",
    icon: "/images/staff-augmentation/process-icon-continuous-support.png",
    gradient: "to-[#e5dcff]",
  },
];

interface ProcessStepsSectionProps {
  title?: string;
  steps?: ProcessStep[];
}

export function ProcessStepsSection({
  title = "How Salesforce Recruitment Works At ProvidusCRM",
  steps = DEFAULT_PROCESS_STEPS,
}: ProcessStepsSectionProps) {
  return (
    <Section className="overflow-hidden bg-white">
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
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <article
                className={cn(
                  "relative rounded-[22px] bg-linear-to-b from-white p-6 shadow-sm md:p-8",
                  step.gradient
                )}
              >
                {index !== steps.length - 1 && (
                  <div className="absolute left-[63px] top-[64px] z-0 hidden h-[calc(100%+32px)] w-[2px] border-l-2 border-dashed border-brand-green-light md:block" />
                )}

                <div className="relative z-10 flex flex-row items-start gap-4 md:gap-6 lg:gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f7fcff] shadow-[0px_1px_1px_-1px_rgba(171,171,171,0.64),0px_2px_2px_-1px_rgba(171,171,171,0.63),0px_4px_4px_-2px_rgba(171,171,171,0.61),0px_7px_7px_-2px_rgba(171,171,171,0.58),0px_14px_14px_-3px_rgba(171,171,171,0.51)] md:h-[72px] md:w-[72px]">
                    {step.icon && (
                      <Image
                        src={step.icon}
                        alt=""
                        aria-hidden="true"
                        width={40}
                        height={40}
                        className="h-9 w-9 object-contain md:h-10 md:w-10"
                      />
                    )}
                  </div>
                  <div className="flex-1 md:pt-1">
                    <Heading as="h3" level="h4" className="text-[#19689f]">
                      {step.title}
                    </Heading>
                    <Text variant="p2" className="mt-2 text-black md:mt-3">
                      {step.text}
                    </Text>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
