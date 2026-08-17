import {
  ClipboardList,
  Cog,
  FileCheck2,
  HeartHandshake,
  Workflow,
} from "lucide-react";
import {
  HeroSection,
  PartnersSection,
  ExpertiseDescriptionSection,
  OutcomeCardsSection,
  WhyChooseSection,
  ServiceBenefitsSection,
  SplitComparisonSection,
  CtaSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "ProvidusCRM implements Fundraise Up and connects it with your Salesforce data, planning the donation experience, campaign structure, data mapping, recurring giving, CRM rules, and testing required for a reliable launch.";

export async function generateMetadata() {
  return generateStaticPageMetadata("partnership-fundraise-up", {
    title: "Fundraise Up Implementation Partner",
    description: DESCRIPTION,
    canonicalPath: "/partnership/fundraise-up",
    image: "/images/fundraiseup/hero-visual.webp",
  });
}

const outcomes = [
  {
    title: "Make It Easy to Give",
    icon: "/images/fundraiseup/outcome-give.webp",
    text: "We configure your Fundraise Up campaigns, donation forms, payment choices, recurring giving options, and confirmation content around the needs of your supporters.",
  },
  {
    title: "Make the Data Useful",
    icon: "/images/fundraiseup/outcome-data.webp",
    text: "We define how supporter, donation, campaign, consent, designation, payment, and recurring giving data should be stored in Salesforce.",
  },
];

const integrations = [
  {
    title: "Standard Salesforce",
    color: "var(--color-salesforce-blue)",
    icon: "/images/fundraiseup/integration-standard.webp",
    text: "Supporters are connected with Salesforce Contacts and Accounts, while donations are recorded as Opportunities. Recurring gifts use the Fundraise Up Recurring Plans object. We configure the connection, matching rules, field mapping, campaign rules, permissions, and page layouts.",
  },
  {
    title: "Salesforce NPSP",
    color: "var(--color-soft-purple)",
    icon: "/images/fundraiseup/integration-npsp.webp",
    text: "The NPSP integration uses the nonprofit records already in your Salesforce org. Donations are recorded as Opportunities, while recurring giving uses the NPSP Recurring Donation object. We account for household records, campaigns, fund allocation, soft credits, and your current Salesforce automation.",
  },
  {
    title: "Agentforce for Nonprofits",
    color: "var(--color-soft-indigo)",
    icon: "/images/fundraiseup/integration-agentforce.webp",
    text: "This integration works with Salesforce fundraising records, including Gift Transactions and Gift Commitments. It can also import supported external donations from Salesforce into Fundraise Up. We plan the record mapping, supporter matching, campaign rules, fund allocation, permissions, and reporting.",
  },
];

const steps = [
  {
    title: "Review",
    icon: ClipboardList,
    colorTheme: "blue" as const,
    description:
      "We assess your donation process, campaigns, payment methods, recurring giving, Salesforce setup, consent rules, and reporting needs.",
  },
  {
    title: "Plan",
    icon: Workflow,
    colorTheme: "green" as const,
    description:
      "We define the Fundraise Up structure, Salesforce records, matching rules, field mapping, permissions, and test cases.",
  },
  {
    title: "Configure",
    icon: Cog,
    colorTheme: "yellow" as const,
    description:
      "We set up the agreed Fundraise Up features and connect the correct Salesforce integration.",
  },
  {
    title: "Test",
    icon: FileCheck2,
    colorTheme: "peach" as const,
    description:
      "We check donations, recurring plans, refunds, duplicate behaviour, campaign rules, currencies, permissions, and sync errors.",
  },
  {
    title: "Launch and Support",
    icon: HeartHandshake,
    colorTheme: "pink" as const,
    description:
      "We activate the live connection, check the first transactions, and provide clear operating notes for your teams.",
  },
];

const whyProvidus = [
  {
    title: (
      <>
        Nonprofit Salesforce
        <br />
        Experience
      </>
    ),
    color: "#33FF00",
    text: "We understand donations, recurring giving, campaigns, supporter relationships, consent, fund allocation, and nonprofit reporting.",
  },
  {
    title: (
      <>
        Complete
        <br />
        Integration Testing
      </>
    ),
    color: "#308FFF",
    text: "We do not stop after a successful donation. We check the Salesforce records, matching behaviour, campaign links, recurring data, permissions, automation, refunds, and reports.",
  },
  {
    title: (
      <>
        Clear
        <br />
        Handover
      </>
    ),
    color: "#8800FF",
    text: "Your team receives the approved mapping, configuration details, test results, and guidance needed to manage the integration after launch.",
  },
];

export default async function FundraiseUpPartnerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fundraise Up Implementation and Salesforce Integration",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/partnership/fundraise-up",
    serviceType: "Fundraise Up Implementation",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd("partnership-fundraise-up", schema);

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="Fundraise Up Implementation"
        subtitleAsH1
        title={
          <>
            Turn Online Donations Into Reliable Salesforce Data{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        image="/images/fundraiseup/hero-visual.webp"
        imageClassName="object-contain p-4"
        ctaLabel="Book a Fundraise Up Consultation"
        ctaHref="/contact"
        ctaVariant="filled"
        ctaSize="sm"
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. The problem */}
      <ExpertiseDescriptionSection
        heading={
          <>
            The Donation Form Is Only Half of the Setup{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        paragraphs={[
          "Fundraise Up gives supporters a simple way to donate. Salesforce must then receive each donation in a form your teams can use.",
          "Without the right setup, your CRM may contain duplicate supporters, incorrect campaign links, incomplete consent data, or recurring gifts that do not match your Salesforce data model.",
          "We plan the donation process and Salesforce integration together. Each piece of information collected through Fundraise Up has an agreed place and purpose inside your CRM.",
        ]}
      />

      {/* 4. Outcome cards */}
      <OutcomeCardsSection cards={outcomes} />

      {/* 5. Which integration */}
      <WhyChooseSection
        title="Choose the Right Fundraise Up Salesforce Integration"
        customReasons={integrations}
        image="/images/fundraiseup/integration-image.webp"
        imageAlt="Fundraising manager reviewing donation data in Salesforce"
      />

      {/* 6. How we implement it */}
      <ServiceBenefitsSection
        title="From Requirements to a Successful Fundraise Up Implementation"
        items={steps}
      />

      {/* 7. Why ProvidusCRM */}
      <SplitComparisonSection
        heading="Why Work With ProvidusCRM?"
        subtitle="Fundraise Up provides the Salesforce connection. ProvidusCRM makes sure it works with the data, processes, users, and reporting already present in your Salesforce org."
        cards={whyProvidus}
        className="bg-linear-to-b from-white to-brand-blue-light"
      />

      {/* 8. CTA */}
      <CtaSection
        title="Plan Fundraise Up and Salesforce Together"
        backgroundImage="/images/partnership/cta-bg.webp"
      />
    </>
  );
}
