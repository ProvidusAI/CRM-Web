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
  ExplainerCardsSection,
  SplitComparisonSection,
  ServiceBenefitsSection,
  ExpertiseSalesforceSection,
  CtaSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "ProvidusCRM implements Dotdigital and connects it with Salesforce, helping your marketing and sales teams work with consistent customer data.";

export async function generateMetadata() {
  return generateStaticPageMetadata("partnership-dotdigital", {
    title: "Dotdigital Implementation Partner",
    description: DESCRIPTION,
    canonicalPath: "/partnership/dotdigital",
    image: "/images/dotdigital/hero-visual.webp",
  });
}

const helpCards = [
  {
    title: "Implement Dotdigital",
    icon: "/images/dotdigital/help-implement.webp",
    text: "Set up Dotdigital and connect it with your Salesforce org from the start.",
    cta: { label: "Plan a New Implementation", href: "/contact" },
  },
  {
    title: "Fix an Existing Integration",
    icon: "/images/dotdigital/help-fix.webp",
    text: "Find and correct data, sync, consent, access, and reporting issues.",
    cta: { label: "Request an Integration Review", href: "/contact" },
  },
  {
    title: "Improve Marketing Automation",
    icon: "/images/dotdigital/help-automation.webp",
    text: "Use Salesforce data to build better audiences and support timely communication.",
    cta: { label: "Discuss Marketing Automation", href: "/contact" },
  },
];

const marketingProcess = [
  {
    title: (
      <>
        Build Audiences
        <br />
        From Salesforce
      </>
    ),
    color: "#33FF00",
    text: "Use trusted CRM data to group Contacts and Leads by their needs, interests, status, location, or relationship with your business.",
  },
  {
    title: (
      <>
        Run Marketing
        <br />
        Through Dotdigital
      </>
    ),
    color: "#308FFF",
    text: "Manage email, SMS, WhatsApp, forms, and automated programmes using agreed audience and consent rules.",
  },
  {
    title: (
      <>
        Return Useful Results
        <br />
        to Salesforce
      </>
    ),
    color: "#8800FF",
    text: "Send selected campaign and engagement information back to Salesforce, giving marketing and sales a shared view without storing data they do not need.",
  },
  {
    title: (
      <>
        Keep Preferences
        <br />
        Up to Date
      </>
    ),
    color: "#FFB030",
    text: "Record opt-ins, suppressions, and preference changes correctly across both platforms.",
  },
];

const steps = [
  {
    title: "Review",
    icon: ClipboardList,
    colorTheme: "blue" as const,
    description:
      "We assess your Salesforce org, Dotdigital account, customer data, campaigns, forms, consent process, and reporting needs.",
  },
  {
    title: "Plan",
    icon: Workflow,
    colorTheme: "green" as const,
    description:
      "We agree on field ownership, sync direction, user access, audience rules, campaign links, and the information that should return to Salesforce.",
  },
  {
    title: "Configure",
    icon: Cog,
    colorTheme: "yellow" as const,
    description:
      "We connect the platforms, map the required fields, apply permissions, and set up the agreed marketing processes.",
  },
  {
    title: "Test",
    icon: FileCheck2,
    colorTheme: "peach" as const,
    description:
      "We check record updates, consent changes, forms, campaign data, user access, and sync errors before launch.",
  },
  {
    title: "Launch and Support",
    icon: HeartHandshake,
    colorTheme: "pink" as const,
    description:
      "We monitor the live connection, resolve issues, and help your team manage changes after release.",
  },
];

export default async function DotdigitalPartnerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dotdigital Implementation and Salesforce Integration",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/partnership/dotdigital",
    serviceType: "Dotdigital Implementation",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd("partnership-dotdigital", schema);

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="Dotdigital Implementation Partner"
        subtitleAsH1
        title={
          <>
            Make Dotdigital
            <br />
            &amp; Salesforce Work Better Together{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        image="/images/dotdigital/hero-visual.webp"
        imageClassName="object-contain p-4"
        ctaLabel="Discuss Your Project"
        ctaHref="/contact"
        ctaVariant="filled"
        ctaSize="sm"
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. What do you need help with */}
      <ExplainerCardsSection
        heading="What Do You Need Help With?"
        cards={helpCards}
        iconVariant="plain"
      />

      {/* 4. One connected marketing process */}
      <SplitComparisonSection
        heading="One Connected Marketing Process"
        cards={marketingProcess}
        className="bg-linear-to-b from-white to-brand-blue-light"
      />

      {/* 5. How we implement it */}
      <ServiceBenefitsSection
        title="How We Implement Dotdigital"
        items={steps}
      />

      {/* 6. Why ProvidusCRM */}
      <ExpertiseSalesforceSection
        heading={
          <>
            Why Work With
            <br />
            ProvidusCRM?{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        hideMark
        paragraphs={[
          "Our certified Salesforce experts focus on data quality, practical automation, consent control, and long-term system management.",
          "Your team receives a tested setup and clear records of how the connection works.",
        ]}
        image="/images/dotdigital/why-choose.webp"
        imageAlt="ProvidusCRM consultants reviewing a Dotdigital and Salesforce setup"
        imageVariant="framed"
        ctaLabel="Start Your Dotdigital Implementation"
        ctaHref="/contact"
      />

      {/* 7. CTA */}
      <CtaSection
        title="Ready to Connect Dotdigital With Salesforce?"
        backgroundImage="/images/partnership/cta-bg.webp"
      />
    </>
  );
}
