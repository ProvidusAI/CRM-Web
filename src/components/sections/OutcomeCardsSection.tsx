import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface OutcomeCard {
  /** Line breaks in the title are honoured, matching the two-line design. */
  title: string;
  text: string;
  /** Monochrome glyph shown above the title. */
  icon: string;
}

interface OutcomeCardsSectionProps {
  cards: OutcomeCard[];
}

// Cards fill the row whatever their number, so two cards read as halves rather
// than sitting in the first two slots of a four-wide grid.
const columnClasses: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
};

/**
 * A row of outcome cards — icon, blue title, supporting line. Sits directly
 * under a lead-in section rather than carrying its own heading.
 */
export function OutcomeCardsSection({ cards }: OutcomeCardsSectionProps) {
  if (cards.length === 0) return null;

  return (
    <Section className="bg-white pb-16 md:pb-24">
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            columnClasses[Math.min(cards.length, 4)]
          )}
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col rounded-[16px] bg-linear-to-b from-white to-[#EDF4FC] p-7 shadow-[0px_4px_24px_0px_rgba(29,112,197,0.08)]"
            >
              <div className="relative mb-8 size-11 shrink-0">
                <Image
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="44px"
                  className="object-contain object-left"
                />
              </div>

              <Heading
                as="h3"
                level="h4"
                className="mb-5 whitespace-pre-line text-brand-blue"
              >
                {card.title}
              </Heading>

              <Text variant="p4" className="text-[#4F4D4B]">
                {card.text}
              </Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
