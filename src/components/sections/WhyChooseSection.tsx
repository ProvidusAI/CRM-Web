import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

export interface WhyChooseReason {
  title: string;
  color: string;
  icon: string;
  text: string;
}

export const reasons: WhyChooseReason[] = [
  {
    title: "Operational Excellence",
    color: "var(--color-soft-indigo)",
    icon: "/images/different.webp",
    text: "We help you build and implement Salesforce orgs that’re designed around your processes, delivering business value from day one. Our goal is to drive successful roll-outs, enable adoption across your teams, and ensure Salesforce aligns perfectly with your operations and objectives."
  },
  {
    title: "Technical Depth",
    color: "var(--color-soft-purple)",
    icon: "/images/better.webp",
    text: "Our team of Salesforce consultants is highly skilled and technically proficient, while boasting certifications across the Salesforce ecosystem. From sales to marketing to service operations, we help you reinvent your processes, boost revenue, and drive operational efficiency."
  },
  {
    title: "Business-First Approach",
    color: "var(--color-salesforce-blue)",
    icon: "/images/salesforce-partner.webp",
    text: "No generic solutions. No one-size-fits-all orgs. Your business is unique. Your requirements are different. We provide you with a viable solution that’s not only intuitive but also supports your growth initiatives and innovation goals."
  }
];

interface WhyChooseSectionProps {
  title?: string;
  customReasons?: WhyChooseReason[];
  image?: string;
  imageAlt?: string;
  backgroundOverlayColor?: string;
}

export function WhyChooseSection({
  title,
  customReasons,
  image,
  imageAlt = "Salesforce Specialist",
  backgroundOverlayColor = "var(--color-tab-highlight)",
}: WhyChooseSectionProps) {
  const displayReasons = customReasons || reasons;
  const defaultTitle = "Why Choose ProvidusCRM As Your Salesforce Solutions Partner";

  return (
    <section className="relative py-24 min-h-[900px] flex items-center overflow-hidden">
      {/* Background and Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/why-choose-bg.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0 mix-blend-darken"
          style={{ backgroundColor: backgroundOverlayColor, opacity: 0.9 }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: backgroundOverlayColor, opacity: 0.8 }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="text-white max-w-4xl leading-tight">
            {title || defaultTitle}
          </Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side - 3 Boxes */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-4">
              {displayReasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-md flex flex-col md:flex-row gap-6 shadow-sm flex-1"
                >
                  <div className="shrink-0">
                    <Image
                      src={reason.icon}
                      alt=""
                      width={70}
                      height={70}
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Heading as="h4" style={{ color: reason.color }} className="mb-2">
                      {reason.title}
                    </Heading>
                    <Text variant="p4" className="text-gray-600 leading-relaxed">
                      {reason.text}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Large Image with White Border */}
          <div className="bg-white p-3 rounded-md shadow-2xl h-full min-h-[600px] lg:min-h-0">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image
                src={image || "/images/why-choose.webp"}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
