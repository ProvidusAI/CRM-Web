import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Typography";

const logos = [
  "/images/partners/1.webp",
  "/images/partners/2.webp",
  "/images/partners/3.webp",
  "/images/partners/4.webp",
  "/images/partners/5.webp",
  "/images/partners/6.webp",
  "/images/partners/7.webp",
  "/images/partners/8.webp",
  "/images/partners/9.webp",
  "/images/partners/10.webp",
  "/images/partners/11.webp",
  "/images/partners/12.webp",
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="bg-brand-green-pale shadow-partner rounded-3xl py-6 px-8 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden">
          <Heading as="h2" level="h4" className="shrink-0 text-[#2D2D2D] whitespace-nowrap text-[22px] md:text-[24px]">
            Trusted by.
          </Heading>

          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-12 md:gap-24 animate-marquee w-fit">
              {/* First set of logos */}
              {logos.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className="shrink-0 h-[60px] md:h-[100px] w-[140px] md:w-[220px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner ${idx + 1} logo`}
                    width={220}
                    height={100}
                    className="max-h-[50px] md:max-h-[85px] max-w-full w-auto object-contain brightness-0 opacity-70 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className="shrink-0 h-[60px] md:h-[100px] w-[140px] md:w-[220px] flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner ${idx + 1} logo`}
                    width={220}
                    height={100}
                    className="max-h-[50px] md:max-h-[85px] max-w-full w-auto object-contain brightness-0 opacity-70 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
