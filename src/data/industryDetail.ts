// Not a "use client" module: the page-builder adapter and the seed read these on the server.

// `href` is set only for industries that have a dedicated internal page; those
// headings link, the rest stay plain text.
export interface IndustryDetailItem {
  title: string;
  image: string;
  description: string;
  href?: string;
}

export const DEFAULT_INDUSTRIES: IndustryDetailItem[] = [
  {
    title: "Nonprofit",
    image: "/images/industries/non-profit.webp",
    description: "We help charities and nonprofit organisations manage donor relationships, automate fundraising workflows, track programme outcomes, and consolidate grant data. Teams spend less time on admin and more time on mission delivery.",
    href: "/industries/salesforce-nonprofit-consulting"
  },
  {
    title: "Education",
    image: "/images/industries/education.webp",
    description: "We help universities, colleges, and training providers connect recruitment, admissions, student success, and alumni engagement in one platform. No student record falls through the gaps, and no department works in isolation.",
    href: "/industries/salesforce-education-cloud-consulting"
  },
  {
    title: "Commerce",
    image: "/images/industries/commerce.webp",
    description: "We help retail and eCommerce businesses launch B2B and B2C storefronts connected directly to CRM data, order management, and marketing automation. One platform powers the full buying experience.",
    href: "/industries/salesforce-commerce-cloud-consulting"
  },
  {
    title: "Healthcare",
    image: "/images/industries/healthcare.webp",
    description: "We help healthcare providers manage patient records, coordinate care plans, track referrals, and maintain compliance. Additionally, clinical and non-clinical teams work from the same data, so nothing gets lost between departments.",
    href: "/industries/salesforce-health-cloud-consulting"
  },
  {
    title: "Financial Services",
    image: "/images/industries/financial-services.webp",
    description: "We help banks, lenders, wealth managers, and fintechs manage client relationships, automate compliance workflows, and track financial accounts. Furthermore, KYC processes and advisor dashboards run from one platform built for how regulators expect firms to operate.",
    href: "/industries/salesforce-financial-services-cloud-consulting"
  },
  {
    title: "Manufacturing",
    image: "/images/industries/manufacturing.webp",
    description: "We help manufacturers connect sales forecasts with operations data, manage account-based agreements, and improve demand planning. As a result, commercial teams get accurate visibility into the pipeline and run-rate business without relying on disconnected spreadsheets."
  }
];
