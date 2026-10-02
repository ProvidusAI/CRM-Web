import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";

interface CertifiedSectionProps {
  title?: string;
  description?: string;
}

export function CertifiedSection({ title, description }: CertifiedSectionProps) {
  const defaultDescription =
    "ProvidusCRM consultants hold certifications across the Salesforce platform and industry clouds. We translate our certified expertise into CRM solutions that solve key business challenges and drive better engagement and revenue generation.";

  return (
    <Section
      className="relative overflow-hidden rounded-b-[60px] bg-linear-to-b from-transparent to-certified-blue py-0 md:rounded-b-[120px] md:py-0 px-2"
    >
      <div className="relative mx-auto min-h-[460px] max-w-[1440px] sm:min-h-[520px] md:min-h-[clamp(515px,50vw,720px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block"
        >
          <Image
            src="/images/certified-left.webp"
            alt=""
            width={1236}
            height={1385}
            className="absolute bottom-0 left-[7%] h-auto w-[42.5%]"
          />
          <Image
            src="/images/certified-right.webp"
            alt=""
            width={1236}
            height={1385}
            className="absolute bottom-0 right-[7%] h-auto w-[42.5%]"
          />
        </div>

        <div className="m-auto mb-4 lg:m-0 lg:absolute lg:left-1/2 lg:top-[5%] lg:z-20 w-[112px] lg:-translate-x-1/2 sm:w-[128px] md:w-[13%] md:max-w-[160px]">
          <Image
            src="/images/salesforce-partner.webp"
            alt="Salesforce Partner"
            width={446}
            height={474}
            className="h-auto w-full"
          />
        </div>

        <div className="lg:absolute inset-x-4 bottom-[16%] z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="h-auto w-16"
            />
          </div>

          <Heading as="h2" className="mb-4 text-black">
            {title || (
              <>
                Professional Salesforce <br /> Services Grounded in <br /> Certified Expertise
              </>
            )}
          </Heading>

          <Text variant="p3" className="mx-auto text-black">
            {description || defaultDescription}
          </Text>
        </div>
      </div>
    </Section>
  );
}
