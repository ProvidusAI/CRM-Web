import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";
import { curated, heading, img } from "./lib";
import type { SeedPage, SeedSection } from "./types";

// Sources: the three pages under src/app/(site)/partnership/{dotdigital,findock,fundraise-up}.
// The section bodies were generated from each route's JSX by a script that reads the
// TypeScript AST (no retyping): every string, list and heading is the route's own
// value, every component prop the route passes is seeded with the same value, and a
// prop the route omits is omitted here too, except images whose alt falls back to the
// component's own default (seeded explicitly so editors see it). The routes have no
// wrapper div, hence no clipOverflowX. Each ServiceBenefits step passes a lucide icon
// component; its CMS key (ClipboardList=review, Workflow=plan, Cog=configure,
// FileCheck2=test, HeartHandshake=launch) is seeded instead.

// <PartnersSection /> (defaults)
const partnersSection = (): SeedSection => ({
  _type: "partnersSection",
  logos: DEFAULT_PARTNER_LOGOS.map((l) => img(l.src, l.alt)),
});

// ---------------------------------------------------------------------------
// /partnership/dotdigital

const dotdigitalDescription =
  "ProvidusCRM implements Dotdigital and connects it with Salesforce, helping your marketing and sales teams work with consistent customer data.";

// getSitePageJsonLd("partnership-dotdigital", schema)
const dotdigitalSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dotdigital Implementation and Salesforce Integration",
  description: dotdigitalDescription,
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

export const dotdigitalPage: SeedPage = {
  slug: "partnership/dotdigital",
  title: "Partnership — Dotdigital",
  legacyKey: "partnership-dotdigital",
  seoFallback: {
    title: "Dotdigital Implementation Partner",
    description: dotdigitalDescription,
    image: "/images/dotdigital/hero-visual.webp",
  },
  jsonLdFallback: dotdigitalSchema,
  sections: [
    // L166 <HeroSection subtitle subtitleAsH1 title description image imageClassName ctaLabel ctaHref ctaVariant ctaSize /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "Dotdigital Implementation Partner",
      subtitleAsH1: true,
      title: heading("Make Dotdigital\n& Salesforce Work Better Together", { mark: "after", markStyle: "hero", markSpace: true }),
      description: dotdigitalDescription,
      image: img("/images/dotdigital/hero-visual.webp", "Business meeting"),
      imageClassName: "object-contain p-4",
      ctaLabel: "Discuss Your Project",
      ctaHref: "/contact",
      ctaVariant: "filled",
      ctaSize: "sm",
    },
    // L187 <PartnersSection />
    partnersSection(),
    // L190 <ExplainerCardsSection heading cards iconVariant />
    {
      _type: "explainerCardsSection",
      heading: heading("What Do You Need Help With?"),
      iconVariant: "plain",
      cards: [
        {
          title: heading("Implement Dotdigital"),
          text: "Set up Dotdigital and connect it with your Salesforce org from the start.",
          icon: img("/images/dotdigital/help-implement.webp"),
          cta: {
            label: "Plan a New Implementation",
            href: "/contact",
          },
        },
        {
          title: heading("Fix an Existing Integration"),
          text: "Find and correct data, sync, consent, access, and reporting issues.",
          icon: img("/images/dotdigital/help-fix.webp"),
          cta: {
            label: "Request an Integration Review",
            href: "/contact",
          },
        },
        {
          title: heading("Improve Marketing Automation"),
          text: "Use Salesforce data to build better audiences and support timely communication.",
          icon: img("/images/dotdigital/help-automation.webp"),
          cta: {
            label: "Discuss Marketing Automation",
            href: "/contact",
          },
        },
      ],
    },
    // L197 <SplitComparisonSection heading cards className />
    {
      _type: "splitComparisonSection",
      heading: heading("One Connected Marketing Process"),
      cards: [
        {
          title: heading("Build Audiences\nFrom Salesforce"),
          text: "Use trusted CRM data to group Contacts and Leads by their needs, interests, status, location, or relationship with your business.",
          color: "#33FF00",
        },
        {
          title: heading("Run Marketing\nThrough Dotdigital"),
          text: "Manage email, SMS, WhatsApp, forms, and automated programmes using agreed audience and consent rules.",
          color: "#308FFF",
        },
        {
          title: heading("Return Useful Results\nto Salesforce"),
          text: "Send selected campaign and engagement information back to Salesforce, giving marketing and sales a shared view without storing data they do not need.",
          color: "#8800FF",
        },
        {
          title: heading("Keep Preferences\nUp to Date"),
          text: "Record opt-ins, suppressions, and preference changes correctly across both platforms.",
          color: "#FFB030",
        },
      ],
      className: "bg-linear-to-b from-white to-brand-blue-light",
    },
    // L204 <ServiceBenefitsSection title items />
    {
      _type: "serviceBenefitsSection",
      title: "How We Implement Dotdigital",
      items: [
        {
          title: "Review",
          description: "We assess your Salesforce org, Dotdigital account, customer data, campaigns, forms, consent process, and reporting needs.",
          iconKey: "review",
          colorTheme: "blue",
        },
        {
          title: "Plan",
          description: "We agree on field ownership, sync direction, user access, audience rules, campaign links, and the information that should return to Salesforce.",
          iconKey: "plan",
          colorTheme: "green",
        },
        {
          title: "Configure",
          description: "We connect the platforms, map the required fields, apply permissions, and set up the agreed marketing processes.",
          iconKey: "configure",
          colorTheme: "yellow",
        },
        {
          title: "Test",
          description: "We check record updates, consent changes, forms, campaign data, user access, and sync errors before launch.",
          iconKey: "test",
          colorTheme: "peach",
        },
        {
          title: "Launch and Support",
          description: "We monitor the live connection, resolve issues, and help your team manage changes after release.",
          iconKey: "launch",
          colorTheme: "pink",
        },
      ],
    },
    // L210 <ExpertiseSalesforceSection heading hideMark paragraphs image imageAlt imageVariant />
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Why Work With\nProvidusCRM?", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      hideMark: true,
      paragraphs: [
        "Dotdigital provides the Salesforce connector. ProvidusCRM makes sure it works with the Salesforce org, data, users, and marketing processes around it.",
        "Our certified Salesforce experts focus on data quality, practical automation, consent control, and long-term system management. Your team receives a tested setup and clear records of how the connection works.",
      ],
      image: img("/images/dotdigital-image.webp", "ProvidusCRM consultants reviewing a Dotdigital and Salesforce setup"),
      imageVariant: "framed-wide",
    },
    // L230 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "partnership-dotdigital") },
    // L235 <CtaSection title />
    {
      _type: "ctaSection",
      title: "Ready to Connect Dotdigital With Salesforce?",
    },
  ],
};

// ---------------------------------------------------------------------------
// /partnership/findock

const findockDescription =
  "ProvidusCRM implements FinDock for organisations that need better control over payment collection, recurring donations, Gift Aid, failed payments, and reconciliation.";

// getSitePageJsonLd("partnership-findock", schema)
const findockSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FinDock Implementation and Consulting",
  description: findockDescription,
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

export const findockPage: SeedPage = {
  slug: "partnership/findock",
  title: "Partnership — FinDock",
  legacyKey: "partnership-findock",
  seoFallback: {
    title: "FinDock Implementation and Consulting Partner",
    description: findockDescription,
    image: "/images/findock/hero-visual.webp",
  },
  jsonLdFallback: findockSchema,
  sections: [
    // L197 <HeroSection subtitle subtitleAsH1 title description image imageClassName ctaLabel ctaHref ctaVariant ctaSize /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "FinDock Implementation and Consulting Partner",
      subtitleAsH1: true,
      title: heading("Manage Donations and Payments Inside Salesforce", { mark: "after", markStyle: "hero", markSpace: true }),
      description: findockDescription,
      image: img("/images/findock/hero-visual.webp", "Business meeting"),
      imageClassName: "object-contain p-4",
      ctaLabel: "Book a FinDock Consultation",
      ctaHref: "/contact",
      ctaVariant: "filled",
      ctaSize: "sm",
    },
    // L216 <PartnersSection />
    partnersSection(),
    // L219 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("When Salesforce Doesn’t Hold the Full Payment Story", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      paragraphs: [
        "A donation may begin on your website, pass through a payment provider, appear in your bank account, and reach Salesforce in a different format.",
        "When these records do not stay connected, teams spend more time checking payment reports, correcting supporter data, reviewing failed collections, and matching income by hand.",
        "FinDock brings payment activity into Salesforce so each transaction can remain linked to the right supporter, gift, campaign, mandate, and payment schedule.",
      ],
    },
    // L234 <OutcomeCardsSection cards />
    {
      _type: "outcomeCardsSection",
      cards: [
        {
          title: "Connect\nPayment Data",
          text: "Keep supporter, donation, payment, and finance records aligned across your systems.",
          icon: img("/images/findock/outcome-connect.webp"),
        },
        {
          title: "Manage Recurring\nPayments",
          text: "Give your teams a clear process for payment schedules, mandates, failed collections, changes, and cancellations.",
          icon: img("/images/findock/outcome-recurring.webp"),
        },
        {
          title: "Reduce\nReconciliation Work",
          text: "Match bank and payment provider records with Salesforce payments using clear rules and review processes.",
          icon: img("/images/findock/outcome-reconciliation.webp"),
        },
        {
          title: "Simplify\nGift Aid",
          text: "Keep declarations, eligible donations, claims, and reversals connected to the related fundraising records.",
          icon: img("/images/findock/outcome-gift-aid.webp"),
        },
      ],
    },
    // L237 <ExpertiseSalesforceSection heading hideMark paragraphs image imageAlt imageVariant ctaLabel ctaHref />
    {
      _type: "expertiseSalesforceSection",
      heading: heading("Build One Connected\nPayment Process", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      hideMark: true,
      paragraphs: [
        "A sound FinDock setup starts before a payment is made and continues after the money reaches your organisation.",
        "ProvidusCRM plans how payment requests are created, how FinDock connects with your chosen payment providers, and how payment results return to Salesforce.",
        "We also define what should happen when a payment succeeds, fails, is refunded, or cannot be matched. Salesforce can then start the correct finance review, supporter message, recovery process, or internal task.",
        "The result is a connected payment process that gives fundraising, finance, and supporter care teams access to the information they need.",
      ],
      image: img("/images/findock/connected-process.webp", "Two colleagues reviewing payment paperwork together"),
      imageVariant: "framed",
      ctaLabel: "Plan Your FinDock Setup",
      ctaHref: "/contact",
    },
    // L261 <WhyChooseSection title customReasons image imageAlt />
    {
      _type: "whyChooseSection",
      title: "What Our FinDock Implementation Covers",
      reasons: [
        {
          title: "Payment Setup",
          text: "We configure how FinDock identifies supporters, creates payment records, links gifts with campaigns, and updates Salesforce when a payment provider responds. The setup can include Giving Pages, PayLinks, payment methods, processors, merchant accounts, contact matching, payment statuses, permissions, and Salesforce automation.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/findock/icon-payment-setup.webp"),
        },
        {
          title: "Recurring Payments",
          text: "We keep recurring commitments, payment schedules, mandates, payment profiles, and collection results connected as amounts, dates, or payment details change. The process can cover new recurring donations, planned collections, payment changes, cancellations, failed payments, and staff follow-up.",
          color: "var(--color-soft-purple)",
          icon: img("/images/findock/icon-recurring-payments.webp"),
        },
        {
          title: "Payment Reconciliation",
          text: "We configure how bank transactions and payment provider records are matched with payments in Salesforce. Clear rules help finance teams track received income, processing fees, refunds, reversals, and payments that need manual review. Exceptions remain visible so staff can find and resolve them.",
          color: "var(--color-brand-green)",
          icon: img("/images/findock/icon-reconciliation.webp"),
        },
        {
          title: "Gift Aid",
          text: "We connect Gift Aid declarations with eligible donation records and the claims in which they are included. The setup can account for declaration dates, historic donations, claim preparation, payment reversals, and records that need to be checked before submission.",
          color: "#A9714B",
          icon: img("/images/findock/icon-gift-aid.webp"),
        },
      ],
      image: img("/images/findock/implementation.webp", "Consultants reviewing a FinDock payment setup in Salesforce"),
    },
    // L269 <ServiceBenefitsSection title items />
    {
      _type: "serviceBenefitsSection",
      title: "How We Implement FinDock",
      items: [
        {
          title: "Review",
          description: "We assess your payment methods, providers, donation forms, recurring giving, Gift Aid process, Salesforce data, and finance requirements.",
          iconKey: "review",
          colorTheme: "blue",
        },
        {
          title: "Plan",
          description: "We define the payment records, matching rules, statuses, provider connections, Salesforce automation, permissions, and reports required.",
          iconKey: "plan",
          colorTheme: "green",
        },
        {
          title: "Configure",
          description: "We set up FinDock, connect the agreed payment services, and configure the related Salesforce records and processes.",
          iconKey: "configure",
          colorTheme: "yellow",
        },
        {
          title: "Test",
          description: "We check successful and failed payments, recurring collections, refunds, reversals, cancellations, supporter matching, reconciliation, and user access.",
          iconKey: "test",
          colorTheme: "peach",
        },
        {
          title: "Launch and Support",
          description: "We complete the production setup, check the first live transactions, and provide clear operating guidance for your teams.",
          iconKey: "launch",
          colorTheme: "pink",
        },
      ],
    },
    // L275 <SplitComparisonSection heading subtitle cards className />
    {
      _type: "splitComparisonSection",
      heading: heading("Why Work With ProvidusCRM?"),
      subtitle: "FinDock provides the payment technology. ProvidusCRM makes sure it works with your Salesforce data, fundraising processes, finance controls, and supporter care requirements.",
      cards: [
        {
          title: heading("Salesforce and Payment\nProcesses Planned Together"),
          text: "We consider the full payment process rather than treating FinDock as a separate donation form or payment connector.",
          color: "#33FF00",
        },
        {
          title: heading("Clear Data and\nMatching Rules"),
          text: "We define how supporters, gifts, campaigns, payments, mandates, and recurring commitments should be created and linked.",
          color: "#308FFF",
        },
        {
          title: heading("Testing Beyond\nSuccessful Payments"),
          text: "We test failures, cancellations, refunds, reversals, duplicate supporters, unmatched income, and changes to recurring donations before launch.",
          color: "#8800FF",
        },
        {
          title: heading("A Handover Your\nTeam Can Use"),
          text: "Your team receives the approved setup, data mapping, test results, and guidance needed to manage FinDock after go-live.",
          color: "#FFB030",
        },
      ],
      className: "bg-linear-to-b from-white to-brand-blue-light",
    },
    // L283 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "partnership-findock") },
    // L288 <CtaSection title buttonLabel />
    {
      _type: "ctaSection",
      title: "Bring Payment Management Into Salesforce",
      buttonLabel: "Book a FinDock Consultation",
    },
  ],
};

// ---------------------------------------------------------------------------
// /partnership/fundraise-up

const fundraiseUpDescription =
  "ProvidusCRM implements Fundraise Up and connects it with your Salesforce data, planning the donation experience, campaign structure, data mapping, recurring giving, CRM rules, and testing required for a reliable launch.";

// getSitePageJsonLd("partnership-fundraise-up", schema)
const fundraiseUpSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fundraise Up Implementation and Salesforce Integration",
  description: fundraiseUpDescription,
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

export const fundraiseUpPage: SeedPage = {
  slug: "partnership/fundraise-up",
  title: "Partnership — Fundraise Up",
  legacyKey: "partnership-fundraise-up",
  seoFallback: {
    title: "Fundraise Up Implementation Partner",
    description: fundraiseUpDescription,
    image: "/images/fundraiseup/hero-visual.webp",
  },
  jsonLdFallback: fundraiseUpSchema,
  sections: [
    // L169 <HeroSection subtitle subtitleAsH1 title description image imageClassName ctaLabel ctaHref ctaVariant ctaSize /> (no imageAlt: the component default)
    {
      _type: "heroSection",
      subtitle: "Fundraise Up Implementation",
      subtitleAsH1: true,
      title: heading("Turn Online Donations Into Reliable Salesforce Data", { mark: "after", markStyle: "hero", markSpace: true }),
      description: fundraiseUpDescription,
      image: img("/images/fundraiseup/hero-visual.webp", "Business meeting"),
      imageClassName: "object-contain p-4",
      ctaLabel: "Book a Fundraise Up Consultation",
      ctaHref: "/contact",
      ctaVariant: "filled",
      ctaSize: "sm",
    },
    // L188 <PartnersSection />
    partnersSection(),
    // L191 <ExpertiseDescriptionSection heading paragraphs />
    {
      _type: "expertiseDescriptionSection",
      heading: heading("The Donation Form Is Only Half of the Setup", { mark: "after", markStyle: "heroSmall", markSpace: true }),
      paragraphs: [
        "Fundraise Up gives supporters a simple way to donate. Salesforce must then receive each donation in a form your teams can use.",
        "Without the right setup, your CRM may contain duplicate supporters, incorrect campaign links, incomplete consent data, or recurring gifts that do not match your Salesforce data model.",
        "We plan the donation process and Salesforce integration together. Each piece of information collected through Fundraise Up has an agreed place and purpose inside your CRM.",
      ],
    },
    // L206 <OutcomeCardsSection cards />
    {
      _type: "outcomeCardsSection",
      cards: [
        {
          title: "Make It Easy to Give",
          text: "We configure your Fundraise Up campaigns, donation forms, payment choices, recurring giving options, and confirmation content around the needs of your supporters.",
          icon: img("/images/fundraiseup/outcome-give.webp"),
        },
        {
          title: "Make the Data Useful",
          text: "We define how supporter, donation, campaign, consent, designation, payment, and recurring giving data should be stored in Salesforce.",
          icon: img("/images/fundraiseup/outcome-data.webp"),
        },
      ],
    },
    // L209 <WhyChooseSection title customReasons image imageAlt />
    {
      _type: "whyChooseSection",
      title: "Choose the Right Fundraise Up Salesforce Integration",
      reasons: [
        {
          title: "Standard Salesforce",
          text: "Supporters are connected with Salesforce Contacts and Accounts, while donations are recorded as Opportunities. Recurring gifts use the Fundraise Up Recurring Plans object. We configure the connection, matching rules, field mapping, campaign rules, permissions, and page layouts.",
          color: "var(--color-salesforce-blue)",
          icon: img("/images/fundraiseup/integration-standard.webp"),
        },
        {
          title: "Salesforce NPSP",
          text: "The NPSP integration uses the nonprofit records already in your Salesforce org. Donations are recorded as Opportunities, while recurring giving uses the NPSP Recurring Donation object. We account for household records, campaigns, fund allocation, soft credits, and your current Salesforce automation.",
          color: "var(--color-soft-purple)",
          icon: img("/images/fundraiseup/integration-npsp.webp"),
        },
        {
          title: "Agentforce for Nonprofits",
          text: "This integration works with Salesforce fundraising records, including Gift Transactions and Gift Commitments. It can also import supported external donations from Salesforce into Fundraise Up. We plan the record mapping, supporter matching, campaign rules, fund allocation, permissions, and reporting.",
          color: "var(--color-soft-indigo)",
          icon: img("/images/fundraiseup/integration-agentforce.webp"),
        },
      ],
      image: img("/images/fundraiseup/integration-image.webp", "Fundraising manager reviewing donation data in Salesforce"),
    },
    // L217 <ServiceBenefitsSection title items />
    {
      _type: "serviceBenefitsSection",
      title: "From Requirements to a Successful Fundraise Up Implementation",
      items: [
        {
          title: "Review",
          description: "We assess your donation process, campaigns, payment methods, recurring giving, Salesforce setup, consent rules, and reporting needs.",
          iconKey: "review",
          colorTheme: "blue",
        },
        {
          title: "Plan",
          description: "We define the Fundraise Up structure, Salesforce records, matching rules, field mapping, permissions, and test cases.",
          iconKey: "plan",
          colorTheme: "green",
        },
        {
          title: "Configure",
          description: "We set up the agreed Fundraise Up features and connect the correct Salesforce integration.",
          iconKey: "configure",
          colorTheme: "yellow",
        },
        {
          title: "Test",
          description: "We check donations, recurring plans, refunds, duplicate behaviour, campaign rules, currencies, permissions, and sync errors.",
          iconKey: "test",
          colorTheme: "peach",
        },
        {
          title: "Launch and Support",
          description: "We activate the live connection, check the first transactions, and provide clear operating notes for your teams.",
          iconKey: "launch",
          colorTheme: "pink",
        },
      ],
    },
    // L223 <SplitComparisonSection heading subtitle cards className />
    {
      _type: "splitComparisonSection",
      heading: heading("Why Work With ProvidusCRM?"),
      subtitle: "Fundraise Up provides the Salesforce connection. ProvidusCRM makes sure it works with the data, processes, users, and reporting already present in your Salesforce org.",
      cards: [
        {
          title: heading("Nonprofit Salesforce\nExperience"),
          text: "We understand donations, recurring giving, campaigns, supporter relationships, consent, fund allocation, and nonprofit reporting.",
          color: "#33FF00",
        },
        {
          title: heading("Complete\nIntegration Testing"),
          text: "We do not stop after a successful donation. We check the Salesforce records, matching behaviour, campaign links, recurring data, permissions, automation, refunds, and reports.",
          color: "#308FFF",
        },
        {
          title: heading("Clear\nHandover"),
          text: "Your team receives the approved mapping, configuration details, test results, and guidance needed to manage the integration after launch.",
          color: "#8800FF",
        },
      ],
      className: "bg-linear-to-b from-white to-brand-blue-light",
    },
    // L231 {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "partnership-fundraise-up") },
    // L236 <CtaSection title />
    {
      _type: "ctaSection",
      title: "Plan Fundraise Up and Salesforce Together",
    },
  ],
};
