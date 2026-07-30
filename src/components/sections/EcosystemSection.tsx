import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

interface EcosystemCard {
  logo: string;
  alt: string;
  logoWidth: number;
  text: string;
}

const ECOSYSTEM_CARDS: EcosystemCard[] = [
  {
    logo: "/images/providus-logo.webp",
    alt: "Providus",
    logoWidth: 180,
    text: "Providus Technologies is the parent company behind Providus AI and ProvidusCRM",
  },
  {
    logo: "/images/providus-ai-logo.webp",
    alt: "Providus AI",
    logoWidth: 220,
    text: "Providus AI is built and operated by Providus Technologies for enterprises.",
  },
];

// Figma 268:543 — blue-to-white-to-blue backdrop, glass cards with dual soft shadow.
export function EcosystemSection() {
  return (
    <section
      className="relative mt-16 py-16 md:mt-24 md:py-24"
      style={{
        background:
          "linear-gradient(to bottom, rgba(86,172,253,0.35) 0%, #FFFFFF 35%, #FFFFFF 65%, rgba(86,172,253,0.35) 100%)",
      }}
    >
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
          <Heading as="h2" className="mx-auto mt-5 max-w-3xl text-black">
            Meet the Ecosystem Behind Providus CRM
          </Heading>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {ECOSYSTEM_CARDS.map((card) => (
            <div
              key={card.alt}
              className="flex flex-col items-center gap-6 rounded-[42.069px] bg-white/20 p-10 text-center md:p-14"
              style={{
                boxShadow:
                  "-32.211px 48.316px 48.316px 0px rgba(0,166,255,0.05), 32.211px 48.316px 48.316px 0px rgba(31,86,148,0.05)",
              }}
            >
              <Image
                src={card.logo}
                alt={card.alt}
                width={card.logoWidth}
                height={54}
                className="h-[54px] w-auto"
              />
              <Text variant="p3" className="max-w-[359px] text-[#595959]">
                {card.text}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
