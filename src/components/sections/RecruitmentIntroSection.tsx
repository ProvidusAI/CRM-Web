import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Typography";

export const DEFAULT_RECRUITMENT_INTRO = {
  icon: "/images/staff-augmentation/intro-icon.webp",
  lead: "We don't just provide you with certified Salesforce talent. Every Salesforce professional at ProvidusCRM is a problem solver, difference maker, and team player.",
  highlight:
    "You get access to top 1% global CRM talent with certifications across the Salesforce ecosystem and implementation expertise spanning industries.",
};

interface RecruitmentIntroSectionProps {
  icon?: string;
  /** The sentence before the bold part. */
  lead?: string;
  /** The bold, blue closing sentence. */
  highlight?: string;
}

export function RecruitmentIntroSection({
  icon = DEFAULT_RECRUITMENT_INTRO.icon,
  lead = DEFAULT_RECRUITMENT_INTRO.lead,
  highlight = DEFAULT_RECRUITMENT_INTRO.highlight,
}: RecruitmentIntroSectionProps) {
  return (
    <Section className="border-y border-migration-blue bg-recruitment-intro">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            src={icon}
            alt=""
            aria-hidden="true"
            width={88}
            height={88}
            className="h-[88px] w-[88px] object-contain"
          />
          <Text
            variant="p1"
            className="max-w-5xl !text-[22px] !leading-snug text-black md:!text-[37px]"
          >
            {lead}{" "}
            <span className="font-bold text-migration-blue">{highlight}</span>
          </Text>
        </div>
      </Container>
    </Section>
  );
}
