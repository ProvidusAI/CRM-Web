import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

const PILL_VARIANTS = {
  blue: {
    icon: "/images/staff-augmentation/talent-icon-blue.svg",
    border: "border-migration-blue",
    bg: "bg-cost-card-blue",
    text: "text-[#0e3767]",
  },
  green: {
    icon: "/images/staff-augmentation/talent-icon-green.svg",
    border: "border-brand-green",
    bg: "bg-[#f7fff5]",
    text: "text-[#1a590a]",
  },
} as const;

export type TalentPillVariant = keyof typeof PILL_VARIANTS;

export interface TalentPillRow {
  roles: string[];
  variant?: TalentPillVariant;
  /** Scrolls the other way. */
  reverse?: boolean;
}

export const DEFAULT_TALENT_PILL_ROWS: (TalentPillRow & { variant: TalentPillVariant })[] = [
  {
    variant: "blue",
    roles: [
      "Salesforce Developers",
      "Salesforce Administrators",
      "Salesforce Solution Architects",
      "Salesforce Technical Architects",
      "Salesforce Business Analysts",
      "Salesforce Project Managers",
      "Agentforce Specialists",
    ],
  },
  {
    variant: "green",
    reverse: true,
    roles: [
      "Salesforce Product Managers",
      "Salesforce Delivery Managers",
      "Salesforce CPQ & Revenue Cloud Specialists",
      "Salesforce Marketing Cloud Specialists",
      "Salesforce Service Cloud Specialists",
      "Salesforce Data Cloud Specialists",
    ],
  },
];

interface TalentPillsSectionProps {
  title?: string;
  rows?: TalentPillRow[];
}

function TalentPillsRow({ roles, variant = "blue", reverse }: TalentPillRow) {
  const styles = PILL_VARIANTS[variant];
  // Duplicated for a seamless marquee loop (see ExpertiseCertifiedSection for the same pattern).
  const items = [...roles, ...roles];

  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-fit items-center gap-4 animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {items.map((role, index) => (
          <span
            key={`${role}-${index}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-3 rounded-full border py-2 pl-2 pr-6",
              styles.border,
              styles.bg
            )}
          >
            <Image
              src={styles.icon}
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
            <Text
              variant="p2"
              as="span"
              className={cn("!font-semibold whitespace-nowrap", styles.text)}
            >
              {role}
            </Text>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TalentPillsSection({
  title = "Salesforce Talent We Offer",
  rows = DEFAULT_TALENT_PILL_ROWS,
}: TalentPillsSectionProps) {
  return (
    <Section className="overflow-hidden">
      <Container size="xl">
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
      </Container>

      <div className="mt-12 flex flex-col gap-6">
        {rows.map((row, index) => (
          <TalentPillsRow key={index} {...row} />
        ))}
      </div>
    </Section>
  );
}
