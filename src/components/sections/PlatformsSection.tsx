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

interface PlatformsSectionProps {
  title?: string;
  logos?: string[];
  limit?: number;
}

export function PlatformsSection({
  title = "Platforms We Work With",
  logos = defaultLogos,
  limit,
}: PlatformsSectionProps) {
  const displayLogos = limit ? logos.slice(0, limit) : logos;

  return (
    <section 
      className="py-24 bg-[#EEFFEA] border-y border-[#38A81B]"
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
          {displayLogos.map((logo, index) => (
            <Reveal 
              key={index} 
              direction="up" 
              delay={0.1 + (index % 4) * 0.1}
            >
              <div
                className="bg-white flex items-center justify-center p-6 transition-all hover:scale-105"
                style={{
                  width: "258px",
                  height: "138px",
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
          ))}
        </div>
      </Container>
    </section>
  );
}
