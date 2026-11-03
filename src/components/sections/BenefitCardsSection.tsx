import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";

export interface BenefitCardItem {
  title: string;
  description: string;
  /** White 36px icon on the blue chip. */
  iconSrc?: string;
}

export interface BenefitCardsImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface BenefitCardsSectionProps {
  title: string;
  image?: BenefitCardsImage;
  items: BenefitCardItem[];
}

export function BenefitCardsSection({ title, image, items }: BenefitCardsSectionProps) {
  if (items.length === 0) return null;

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center">
            <Image src="/images/green-line.svg" alt="" aria-hidden="true" width={64} height={24} className="mx-auto h-auto w-16" />
            <Heading as="h2" className="mx-auto mt-5 max-w-3xl text-black">
              {title}
            </Heading>
          </div>

          <div className="mt-12 flex flex-col gap-8 md:mt-[70px] xl:flex-row xl:items-stretch xl:gap-[39px]">
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 640px) 320px, 100vw"
                className="mx-auto h-auto w-full max-w-[320px] shrink-0 rounded-2xl object-cover xl:mx-0 xl:w-[320px]"
              />
            )}
            {/* The image sets the row height; the list fills it and scrolls past the bottom. */}
            <div className="relative flex-1">
              <ul className="flex flex-col gap-5 xl:absolute xl:inset-0 xl:overflow-y-auto xl:pr-2 [scrollbar-width:thin]">
                {items.map((item, index) => (
                  <li
                    key={`${item.title}-${index}`}
                    className="flex flex-col items-start gap-5 rounded-[20px] border border-card-border bg-cost-card-blue px-6 py-6 shadow-[0_4px_11.5px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:gap-0 md:px-[37px] md:py-[33px]"
                  >
                    <div className="flex items-center gap-5 sm:gap-10 md:w-[370px] md:shrink-0">
                      <div className="flex h-[60px] w-[67px] shrink-0 items-center justify-center rounded-[9px] bg-cost-icon-blue shadow-[0_6px_12px_-2px_rgba(171,171,171,0.6)]">
                        {item.iconSrc && <Image src={item.iconSrc} alt="" aria-hidden="true" width={36} height={36} unoptimized />}
                      </div>
                      <Heading as="h3" level="h4" className="text-text-heading md:!leading-[33px] md:!tracking-[-0.24px]">
                        {item.title}
                      </Heading>
                    </div>
                    <Text variant="p4" className="flex-1 text-black !text-[12px] !leading-[20px] md:!text-[12px] md:!leading-[20px]">
                      {item.description}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
