import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    title: "Salesforce Consulting",
    text: "First, we learn how the business actually runs. Then, we build a CRM strategy around that reality. Our consultants assess workflows, spot gaps, and map out Salesforce roadmaps tied to clear business goals. In other words, no guesswork.",
    icon: "/images/salesforce-consulting.svg",
    boxGradient: "linear-gradient(174.14deg, rgba(220, 239, 255, 0) 8.64%, #DCEFFF 105.18%)",
    iconGradient: "linear-gradient(180deg, #8BC9FF 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-consulting-services",
  },
  {
    title: "Salesforce Development",
    text: "Sometimes, out-of-the-box Salesforce is not enough. That is where custom development comes in. Our developers build Apex classes, Lightning Web Components, and custom APIs. Additionally, every build is reviewed, tested, and documented for long-term use.",
    icon: "/images/salesforce-development.svg",
    boxGradient: "linear-gradient(185.05deg, rgba(222, 220, 255, 0) 8.14%, #DEDCFF 99.18%)",
    iconGradient: "linear-gradient(180deg, #D4D1FF 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-development-services",
  },
  {
    title: "Salesforce Implementation",
    text: "A good implementation means teams can start using Salesforce on day one. Therefore, we follow a structured process covering discovery, solution design, configuration, data migration, and training. After go-live, we also provide post-launch support to keep things stable.",
    icon: "/images/salesforce-implementation.svg",
    boxGradient: "linear-gradient(185.05deg, rgba(220, 255, 229, 0) 8.14%, #DCFFE5 99.18%)",
    iconGradient: "linear-gradient(180deg, #9EFFB8 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-implementation-services",
  },
  {
    title: "Salesforce Migration",
    text: "Moving from a legacy CRM or messy spreadsheets is risky if done wrong. However, our team handles the full migration process. This includes data audits, field mapping, deduplication, and validation testing. As a result, every record arrives clean and intact.",
    icon: "/images/salesforce-migration.svg",
    boxGradient: "linear-gradient(174.14deg, rgba(255, 237, 220, 0) 8.64%, #FFEDDC 105.18%)",
    iconGradient: "linear-gradient(180deg, #F6CBA5 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-migration-services",
  },
  {
    title: "Salesforce Integration",
    text: "Salesforce works best when it connects to other tools. For this reason, we integrate it with ERPs, marketing platforms, payment systems, and databases using MuleSoft or native APIs. Moreover, every integration is built to handle real volumes and log errors properly.",
    icon: "/images/salesforce-integration.svg",
    boxGradient: "linear-gradient(174.14deg, rgba(220, 239, 255, 0) 8.64%, #DCEFFF 105.18%)",
    iconGradient: "linear-gradient(180deg, #8BC9FF 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-integration-services",
  },
  {
    title: "Salesforce Customisation",
    text: "Every organisation works differently. Because of that, we customise page layouts, record types, permission sets, flows, and automation rules to match how teams actually operate. Furthermore, every change follows Salesforce best practices to avoid technical debt later.",
    icon: "/images/salesforce-customisation.svg",
    boxGradient: "linear-gradient(185.05deg, rgba(222, 220, 255, 0) 8.14%, #DEDCFF 99.18%)",
    iconGradient: "linear-gradient(180deg, #D4D1FF 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-customisation-services",
  },
  {
    title: "Salesforce Managed Services",
    text: "After go-live, Salesforce keeps pushing updates you need to optimise your org for. Three major releases land every year. Your org needs ongoing attention. Our managed services provide a dedicated certified team on retainer for health monitoring, feature requests, and quarterly platform reviews.",
    icon: "/images/salesforce-managed-services.svg",
    boxGradient: "linear-gradient(185.05deg, rgba(220, 255, 229, 0) 8.14%, #DCFFE5 99.18%)",
    iconGradient: "linear-gradient(180deg, #9EFFB8 0%, #F8FBFF 136.56%)",
    href: "/services/salesforce-managed-services",
  },
  {
    title: "Salesforce Support and Maintenance",
    text: "When something breaks, speed matters. That is why our support service runs on defined SLAs with ticketed workflows. Certified specialists handle bug fixes, access issues, and broken flows. In addition, we maintain documentation alongside every resolution.",
    icon: "/images/salesforce-support.svg",
    boxGradient: "linear-gradient(174.14deg, rgba(255, 237, 220, 0) 8.64%, #FFEDDC 105.18%)",
    iconGradient: "linear-gradient(180deg, #F6CBA5 0%, #F8FBFF 136.56%)",
  },
];

const iconShadow = `
  0px 30.08px 30.08px -3.26px #ABABAB59,
  0px 13.68px 13.68px -2.72px #ABABAB82,
  0px 6.88px 6.88px -2.17px #ABABAB94,
  0px 3.63px 3.63px -1.63px #ABABAB9C,
  0px 1.81px 1.81px -1.09px #ABABABA1,
  0px 0.71px 0.71px -0.54px #ABABABA3
`;

export function CategoriesSection() {
  // Group categories into pairs for alternating rows
  const rows = [];
  for (let i = 0; i < categories.length; i += 2) {
    rows.push(categories.slice(i, i + 2));
  }

  return (
    <Section className="bg-white py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:gap-12">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 ${rowIndex % 2 === 0 ? 'lg:grid-cols-[1.22fr_1fr]' : 'lg:grid-cols-[1fr_1.22fr]'} gap-8 lg:gap-12`}
            >
              {row.map((category, colIndex) => {
                const index = rowIndex * 2 + colIndex;
                return (
                  <Reveal
                    key={index}
                    direction="up"
                    delay={0.1 * (colIndex + 1)}
                    height="100%"
                    className="h-full"
                  >
                    <div
                      className="group p-10 md:p-12 flex flex-col items-start h-full"
                      style={{
                        background: category.boxGradient,
                        borderRadius: "36px",
                      }}
                    >
                      {/* Icon Box */}
                      <div
                        className="mb-8 flex items-center justify-center transition-shadow duration-300 hover:!shadow-none group-hover:!shadow-none"
                        style={{
                          width: "72px",
                          height: "64px",
                          borderRadius: "12px",
                          background: category.iconGradient,
                          boxShadow: iconShadow,
                        }}
                      >
                        <div className="relative w-8 h-8">
                          <Image
                            src={category.icon}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {category.href ? (
                        <a href={category.href} className="inline-block hover:opacity-80 transition-opacity">
                          <Heading as="h3" level="h4" className="text-black mb-6">
                            {category.title}
                          </Heading>
                        </a>
                      ) : (
                        <Heading as="h3" level="h4" className="text-black mb-6">
                          {category.title}
                        </Heading>
                      )}

                      <Text variant="p3" className="text-black leading-relaxed">
                        {category.text}
                      </Text>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
