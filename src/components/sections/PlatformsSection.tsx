import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

const defaultLogos = [
  "/images/platform-logos/1.webp",
  "/images/platform-logos/2.webp",
  "/images/platform-logos/3.webp",
  "/images/platform-logos/4.webp",
  "/images/platform-logos/5.webp",
  "/images/platform-logos/6.webp",
  "/images/platform-logos/7.webp",
  "/images/platform-logos/8.webp",
  "/images/platform-logos/9.webp",
  "/images/platform-logos/10.webp",
  "/images/platform-logos/11.webp",
  "/images/platform-logos/12.webp",
];

/** "Built On Partnerships…" — About page and homepage. */
export const partnerLogos = [
  ...defaultLogos.slice(0, 4),
  "/images/partnership-logos/pledge.webp",
  "/images/partnership-logos/digital-data-cloud.webp",
  "/images/partnership-logos/stripe.webp",
];

interface PlatformsSectionProps {
  title?: string;
  logos?: string[];
}

export function PlatformsSection({
  title = "Platforms We Work With",
  logos = defaultLogos,
}: PlatformsSectionProps) {

  return (
    <section
      className="pt-24 pb-32 bg-[#EEFFEA] border-y border-[#38A81B]"
    >
      <Container>
        <div className="flex flex-col items-center mb-16">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/green-line.svg"
                alt=""
                width={60}
                height={20}
                className="w-16 h-auto mb-6"
              />
              <Heading as="h2" className="text-black font-bold">
                {title}
              </Heading>
            </div>
          </Reveal>
        </div>

        {/* Flex, not grid, so a short last row centres (Figma 4 + 3). Widths
            mirror a 2/3/4-column grid with the 24px gap. */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
          {logos.map((logo, index) => (
            // Reveal pins an inline width: 100%, so the column width lives on a wrapper.
            <div
              key={index}
              className="w-[calc(50%-12px)] md:w-[calc((100%-48px)/3)] lg:w-[calc(25%-18px)]"
            >
              <Reveal direction="up" delay={0.1 + (index % 4) * 0.1}>
                {/* Shrinks to its column on phones (a fixed 258px pair made every
                    page ~480px wide, which also stretched the fixed mobile menu
                    past the screen); still exactly 258x138 once the column fits. */}
                <div
                  className="mx-auto flex items-center justify-center bg-white p-4 transition-all hover:scale-105 md:p-6"
                  style={{
                    width: "100%",
                    maxWidth: "258px",
                    aspectRatio: "258 / 138",
                    borderRadius: "20px",
                    boxShadow: "16.77px 25.15px 25.15px 0px #38A81B0D, -16.77px 25.15px 25.15px 0px #38A81B0D"
                  }}
                >
                  <div className="relative w-full h-full max-w-[180px] max-h-[80px]">
                    <Image
                      src={logo}
                      alt="Platform Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
