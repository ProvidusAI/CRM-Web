import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

export interface IndustrySectionItem {
  title: string;
  image: string;
  description: string;
  /** Optional — makes the card heading clickable. Editors set this per item in Sanity for dynamic pages. */
  href?: string;
}

interface IndustriesSectionProps {
  title?: string;
  items?: IndustrySectionItem[];
}

const industries: IndustrySectionItem[] = [
  {
    title: "Non-Profit Cloud",
    image: "/images/non-profit.webp",
    description: "Charities and nonprofit organisations run on relationships, but most CRM systems were never built for how nonprofits actually work. Our Nonprofit Cloud consultants configure donor lifecycles, track programme outcomes, automate gift processing, and consolidate fundraising data in one place. From donation pages and recurring giving to grant tracking and volunteer management, every setup reflects how nonprofit teams operate day to day.",
    href: "/industries/salesforce-nonprofit-consulting",
  },
  {
    title: "Education Cloud",
    image: "/images/education-cloud.webp",
    description: "Universities, colleges, and training providers manage thousands of relationships across recruitment, admissions, student success, and alumni engagement. Our Education Cloud specialists connect every stage of the student lifecycle in one platform. Recruitment pipelines, application tracking, student case management, and alumni fundraising all run from the same data, so no department works in isolation, and no student record falls through the gaps.",
    href: "/industries/salesforce-education-cloud-consulting",
  },
  {
    title: "Commerce Cloud",
    image: "/images/commerce-cloud.webp",
    description: "Selling online gets complicated fast. Product catalogues grow, pricing rules multiply, and customers expect the same experience across every channel. Our Commerce Cloud consultants build B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. Inventory visibility, pricing logic, checkout flows, and post-purchase journeys all live inside one platform, so the commerce experience matches what the rest of the business already knows about the customer.",
    href: "/industries/salesforce-commerce-cloud-consulting",
  },
  {
    title: "Health Cloud",
    image: "/images/health-cloud.webp",
    description: "Patient data is sensitive, care coordination is complex, and compliance is not optional. Our Health Cloud implementation experts give healthcare providers a complete view of every patient across referrals, appointments, care plans, and follow-ups. Clinical and non-clinical teams work from the same record, consent tracking is built into every workflow, and reporting meets regulatory standards. Better care coordination with less administrative overhead.",
    href: "/industries/salesforce-health-cloud-consulting",
  },
  {
    title: "Financial Services Cloud",
    image: "/images/finance-services-cloud.webp",
    description: "Banks, lenders, wealth managers, and fintechs need CRM that understands financial relationships, not just contacts and opportunities. Our Financial Services Cloud consultants set up client household management, financial account tracking, compliance workflow automation, and full advisor dashboards. KYC processes, referral tracking, and pipeline management all operate within a platform built specifically for how financial services teams work and what regulators expect.",
    href: "/industries/salesforce-financial-services-cloud-consulting",
  },
  {
    title: "Manufacturing Cloud",
    image: "/images/manufacturing-cloud.webp",
    description: "Manufacturers deal with long sales cycles, complex account hierarchies, and forecasting that depends on both sales agreements and actual production capacity. Our Manufacturing Cloud specialists connect sales forecasts with operations data, manage account-based agreements, and give commercial teams accurate visibility into run-rate business and new opportunities. Rebate management, partner collaboration, and demand planning all run from one system instead of five disconnected spreadsheets."
  }
];

export function IndustriesSection({ title, items }: IndustriesSectionProps) {
  const displayItems = items && items.length > 0 ? items : industries;

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto mb-6"
          />
          <Heading as="h2" className="max-w-4xl !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[45px]">
            {title || "How We Implement Salesforce Across Industries"}
          </Heading>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="flex h-full flex-col gap-5 rounded-[28px] p-2 transition-transform duration-300 hover:-translate-y-1 md:flex-row md:gap-8 md:rounded-[50px] md:pr-10"
              style={{
                background: "linear-gradient(221.48deg, #F6FFE8 26.54%, #C7EA92 118.63%)",
                boxShadow: "0px 4.55px 24.57px 0px #0000001C",
              }}
            >
              {/* Image Container */}
              <div className="w-full shrink-0 md:w-[202px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] md:aspect-auto md:h-[294px] md:rounded-[43.68px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 48px), 202px"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center px-4 pb-7 md:px-0 md:pb-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mb-4 w-fit hover:underline"
                    aria-label={`Explore ${item.title} consulting`}
                  >
                    <Text as="span" variant="p1" className="text-black font-bold">
                      {item.title}
                    </Text>
                  </Link>
                ) : (
                  <Text variant="p1" className="text-black font-bold mb-4">
                    {item.title}
                  </Text>
                )}
                <Text variant="p4" className="text-[#4F4D4B] leading-relaxed">
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
