import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface StatCardItem {
  label: string;
  value?: string;
  /** Shown on the tile instead of the value (e.g. a partner logo). */
  image?: { src: string; width: number; height: number };
}

interface StatCardsSectionProps {
  title: string;
  items: StatCardItem[];
}

// The Figma tiles share one navy-to-sky gradient lit from different corners.
const TILE_GRADIENTS = ["bg-linear-to-br", "bg-linear-to-tl", "bg-linear-to-bl", "bg-linear-to-tr"];

export function StatCardsSection({ title, items }: StatCardsSectionProps) {
  if (items.length === 0) return null;

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <Image src="/images/green-line.svg" alt="" aria-hidden="true" width={64} height={24} className="mx-auto h-auto w-16" />
          <Heading as="h2" className="mx-auto mt-5 max-w-2xl text-black">
            {title}
          </Heading>
        </div>

        <ul className="mx-auto mt-12 grid max-w-[1218px] grid-cols-2 gap-4 sm:gap-[30px] md:mt-16 xl:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className="overflow-hidden rounded-[30px] border border-card-border/60 bg-white shadow-[0_12px_26px_rgba(0,0,0,0.04),0_46px_46px_rgba(0,0,0,0.04)]"
            >
              <div
                className={cn(
                  "flex h-[120px] items-center justify-center rounded-[24px] from-stat-navy via-brand-blue to-stat-sky px-4 md:h-[169px]",
                  TILE_GRADIENTS[index % TILE_GRADIENTS.length],
                )}
              >
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt=""
                    aria-hidden="true"
                    width={item.image.width}
                    height={item.image.height}
                    className="h-auto w-[100px] md:w-[141px]"
                  />
                ) : (
                  <Text as="span" variant="p1" className="font-bold text-white !text-[36px] !leading-none md:!text-[60px] [text-shadow:0_7px_9px_rgba(0,0,0,0.3)]">
                    {item.value}
                  </Text>
                )}
              </div>
              <Heading
                as="h3"
                level="h4"
                className="flex min-h-[90px] items-center justify-center px-3 py-4 text-center text-text-heading !text-[20px] !leading-[24px] md:min-h-[111px] md:!text-[29px] md:!leading-[30px] md:!tracking-[-0.24px]"
              >
                {item.label}
              </Heading>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
