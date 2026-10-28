import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Text } from "@/components/ui/Typography";

export interface WhyReasonCard {
  title: string;
  text: string;
  icon?: string;
  /** Tailwind text-colour class for the card title. */
  titleClass?: string;
}

// Figma 462:566 / 463:708 / 463:710 — a full-bleed blue band (the backdrop is
// the exported, blue-tinted Figma render) carrying four white reason cards
// beside a photo panel. Only the last title colour lands on a token
// (--color-salesforce-blue); the other three are copied from Figma verbatim.
export const DEFAULT_WHY_REASONS: (WhyReasonCard & { titleClass: string })[] = [
  {
    title: "Certified Salesforce Expertise",
    text: "You get access to professionals with certifications across the Salesforce ecosystem, matched to the technical requirements of the role you need filled.",
    icon: "/images/staff-augmentation/why-icon-certified.webp",
    titleClass: "text-[#54a9da]",
  },
  {
    title: "Global Talent Pool",
    text: "You get access to a global Salesforce talent network when you are hiring in the UK. We don't limit you to candidates who only happen to be available in one specific region.",
    icon: "/images/staff-augmentation/why-icon-global.webp",
    titleClass: "text-[#769aeb]",
  },
  {
    title: "Flexible Hiring",
    text: "Not sure about hiring a complete team with Salesforce architects, developers, consultants, project managers, etc.? Start with one specialist before committing to a large team.",
    icon: "/images/staff-augmentation/why-icon-flexible.webp",
    titleClass: "text-[#eb8c3f]",
  },
  {
    title: "Salesforce Implementation Experience",
    text: "ProvidusCRM works across Salesforce consulting, implementation, development, integration, migration, and managed services. We understand the technical requirements behind the roles we recruit for.",
    icon: "/images/staff-augmentation/why-icon-implementation.webp",
    titleClass: "text-salesforce-blue",
  },
];

export const DEFAULT_WHY_BAND_BACKGROUND = "/images/staff-augmentation/why-band-bg.webp";
export const DEFAULT_WHY_BAND_IMAGE = "/images/staff-augmentation/checklist-handshake.webp";
export const DEFAULT_WHY_BAND_IMAGE_ALT =
  "A recruiter and hiring manager shaking hands after a successful Salesforce placement";

interface WhyBandSectionProps {
  title?: string;
  reasons?: WhyReasonCard[];
  backgroundImage?: string;
  image?: string;
  imageAlt?: string;
}

export function WhyBandSection({
  title = "What Makes ProvidusCRM A Leading Salesforce Recruitment Company in the UK",
  reasons = DEFAULT_WHY_REASONS,
  backgroundImage = DEFAULT_WHY_BAND_BACKGROUND,
  image = DEFAULT_WHY_BAND_IMAGE,
  imageAlt = DEFAULT_WHY_BAND_IMAGE_ALT,
}: WhyBandSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Image
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <Container className="relative z-10">
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            aria-hidden="true"
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mx-auto mt-5 max-w-4xl text-white">
            {title}
          </Heading>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.08}>
                <article className="rounded-[13px] bg-white p-6 md:p-7">
                  <div className="flex items-center gap-4">
                    {reason.icon && (
                      <Image
                        src={reason.icon}
                        alt=""
                        aria-hidden="true"
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 object-contain"
                      />
                    )}
                    <Heading
                      as="h3"
                      level="h4"
                      className={reason.titleClass}
                    >
                      {reason.title}
                    </Heading>
                  </div>
                  <Text variant="p4" className="mt-4 text-type-body">
                    {reason.text}
                  </Text>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" height="100%" className="h-full">
            <div className="h-full rounded-[13px] bg-white p-3.5">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-[8px] sm:min-h-[400px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
