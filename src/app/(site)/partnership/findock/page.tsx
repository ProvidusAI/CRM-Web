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
  ExpertiseSalesforceSection,
  WhyChooseSection,
  ServiceBenefitsSection,
  SplitComparisonSection,
  OutcomeCardsSection,
  CtaSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "ProvidusCRM implements FinDock for organisations that need better control over payment collection, recurring donations, Gift Aid, failed payments, and reconciliation.";

export async function generateMetadata() {
  return generateStaticPageMetadata("partnership-findock", {
    title: "FinDock Implementation and Consulting Partner",
    description: DESCRIPTION,
    canonicalPath: "/partnership/findock",
    image: "/images/findock/hero-visual.webp",
  });
}

const outcomes = [
  {
    title: "Connect\nPayment Data",
    icon: "/images/findock/outcome-connect.webp",
    text: "Keep supporter, donation, payment, and finance records aligned across your systems.",
  },
  {
    title: "Manage Recurring\nPayments",
    icon: "/images/findock/outcome-recurring.webp",
    text: "Give your teams a clear process for payment schedules, mandates, failed collections, changes, and cancellations.",
  },
  {
    title: "Reduce\nReconciliation Work",
    icon: "/images/findock/outcome-reconciliation.webp",
    text: "Match bank and payment provider records with Salesforce payments using clear rules and review processes.",
  },
  {
    title: "Simplify\nGift Aid",
    icon: "/images/findock/outcome-gift-aid.webp",
    text: "Keep declarations, eligible donations, claims, and reversals connected to the related fundraising records.",
  },
];

const coverage = [
  {
    title: "Payment Setup",
    color: "var(--color-soft-indigo)",
    icon: "/images/findock/icon-payment-setup.webp",
    text: "We configure how FinDock identifies supporters, creates payment records, links gifts with campaigns, and updates Salesforce when a payment provider responds. The setup can include Giving Pages, PayLinks, payment methods, processors, merchant accounts, contact matching, payment statuses, permissions, and Salesforce automation.",
  },
  {
    title: "Recurring Payments",
    color: "var(--color-soft-purple)",
    icon: "/images/findock/icon-recurring-payments.webp",
    text: "We keep recurring commitments, payment schedules, mandates, payment profiles, and collection results connected as amounts, dates, or payment details change. The process can cover new recurring donations, planned collections, payment changes, cancellations, failed payments, and staff follow-up.",
  },
  {
    title: "Payment Reconciliation",
    color: "var(--color-brand-green)",
    icon: "/images/findock/icon-reconciliation.webp",
    text: "We configure how bank transactions and payment provider records are matched with payments in Salesforce. Clear rules help finance teams track received income, processing fees, refunds, reversals, and payments that need manual review. Exceptions remain visible so staff can find and resolve them.",
  },
  {
    title: "Gift Aid",
    color: "#A9714B",
    icon: "/images/findock/icon-gift-aid.webp",
    text: "We connect Gift Aid declarations with eligible donation records and the claims in which they are included. The setup can account for declaration dates, historic donations, claim preparation, payment reversals, and records that need to be checked before submission.",
  },
];

const steps = [
  {
    title: "Review",
    icon: ClipboardList,
    colorTheme: "blue" as const,
    description:
      "We assess your payment methods, providers, donation forms, recurring giving, Gift Aid process, Salesforce data, and finance requirements.",
  },
  {
    title: "Plan",
    icon: Workflow,
    colorTheme: "green" as const,
    description:
      "We define the payment records, matching rules, statuses, provider connections, Salesforce automation, permissions, and reports required.",
  },
  {
    title: "Configure",
    icon: Cog,
    colorTheme: "yellow" as const,
    description:
      "We set up FinDock, connect the agreed payment services, and configure the related Salesforce records and processes.",
  },
  {
    title: "Test",
    icon: FileCheck2,
    colorTheme: "peach" as const,
    description:
      "We check successful and failed payments, recurring collections, refunds, reversals, cancellations, supporter matching, reconciliation, and user access.",
  },
  {
    title: "Launch and Support",
    icon: HeartHandshake,
    colorTheme: "pink" as const,
    description:
      "We complete the production setup, check the first live transactions, and provide clear operating guidance for your teams.",
  },
];

const whyProvidus = [
  {
    title: (
      <>
        Salesforce and Payment
        <br />
        Processes Planned Together
      </>
    ),
    color: "#33FF00",
    text: "We consider the full payment process rather than treating FinDock as a separate donation form or payment connector.",
  },
  {
    title: (
      <>
        Clear Data and
        <br />
        Matching Rules
      </>
    ),
    color: "#308FFF",
    text: "We define how supporters, gifts, campaigns, payments, mandates, and recurring commitments should be created and linked.",
  },
  {
    title: (
      <>
        Testing Beyond
        <br />
        Successful Payments
      </>
    ),
    color: "#8800FF",
    text: "We test failures, cancellations, refunds, reversals, duplicate supporters, unmatched income, and changes to recurring donations before launch.",
  },
  {
    title: (
      <>
        A Handover Your
        <br />
        Team Can Use
      </>
    ),
    color: "#FFB030",
    text: "Your team receives the approved setup, data mapping, test results, and guidance needed to manage FinDock after go-live.",
  },
];

export default async function FinDockPartnerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FinDock Implementation and Consulting",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/partnership/findock",
    serviceType: "FinDock Implementation",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd("partnership-findock", schema);

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="FinDock Implementation and Consulting Partner"
        subtitleAsH1
        title={
          <>
            Manage Donations and Payments Inside Salesforce{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        image="/images/findock/hero-visual.webp"
        imageClassName="object-contain p-4"
        ctaLabel="Book a FinDock Consultation"
        ctaHref="/contact"
        ctaVariant="filled"
        ctaSize="sm"
        secondaryCta={{
          label: "Check Beyond NPSP Eligibility",
          href: "/industries/salesforce-nonprofit-consulting",
        }}
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. The problem FinDock solves */}
      <ExpertiseDescriptionSection
        heading={
          <>
            When Salesforce Doesn&rsquo;t Hold the Full Payment Story{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        paragraphs={[
          "A donation may begin on your website, pass through a payment provider, appear in your bank account, and reach Salesforce in a different format.",
          "When these records do not stay connected, teams spend more time checking payment reports, correcting supporter data, reviewing failed collections, and matching income by hand.",
          "FinDock brings payment activity into Salesforce so each transaction can remain linked to the right supporter, gift, campaign, mandate, and payment schedule.",
        ]}
      />

      {/* 4. Outcome cards */}
      <OutcomeCardsSection cards={outcomes} />

      {/* 5. What a sound setup looks like */}
      <ExpertiseSalesforceSection
        heading={
          <>
            Build One Connected
            <br />
            Payment Process{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        hideMark
        paragraphs={[
          "A sound FinDock setup starts before a payment is made and continues after the money reaches your organisation.",
          "ProvidusCRM plans how payment requests are created, how FinDock connects with your chosen payment providers, and how payment results return to Salesforce.",
          "We also define what should happen when a payment succeeds, fails, is refunded, or cannot be matched. Salesforce can then start the correct finance review, supporter message, recovery process, or internal task.",
          "The result is a connected payment process that gives fundraising, finance, and supporter care teams access to the information they need.",
        ]}
        image="/images/findock/connected-process.webp"
        imageAlt="Two colleagues reviewing payment paperwork together"
        imageVariant="framed"
        ctaLabel="Plan Your FinDock Setup"
        ctaHref="/contact"
      />

      {/* 6. What the implementation covers */}
      <WhyChooseSection
        title="What Our FinDock Implementation Covers"
        customReasons={coverage}
        image="/images/findock/implementation.webp"
        imageAlt="Consultants reviewing a FinDock payment setup in Salesforce"
      />

      {/* 7. How we implement it */}
      <ServiceBenefitsSection
        title="How We Implement FinDock"
        items={steps}
      />

      {/* 8. Why ProvidusCRM */}
      <SplitComparisonSection
        heading="Why Work With ProvidusCRM?"
        subtitle="FinDock provides the payment technology. ProvidusCRM makes sure it works with your Salesforce data, fundraising processes, finance controls, and supporter care requirements."
        cards={whyProvidus}
        className="bg-linear-to-b from-white to-brand-blue-light"
      />

      {/* 9. CTA */}
      <CtaSection
        title="Bring Payment Management Into Salesforce"
        buttonLabel="Book a FinDock Consultation"
        backgroundImage="/images/partnership/cta-bg.webp"
      />
    </>
  );
}
