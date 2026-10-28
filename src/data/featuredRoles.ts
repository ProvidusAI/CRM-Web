export interface FeaturedRole {
  title: string;
  details: string[];
  description: string;
}

// Figma 462:341, 462:342, 462:352, 462:446, 462:456 — copy verbatim, in
// left-to-right Figma order.
export const DEFAULT_FEATURED_ROLES: FeaturedRole[] = [
  {
    title: "Salesforce Product Manager",
    details: ["£65,000 - £85,000 + Bonus", "Remote", "Full Time"],
    description:
      "ProvidusCRM is hiring a Salesforce Product Manager to own Salesforce strategy, roadmap, governance, adoption and delivery across commercial teams in a global payments environment.",
  },
  {
    title: "Senior Salesforce Architect",
    details: ["£90,000 - £110,000", "Remote", "Full Time"],
    description:
      "ProvidusCRM is hiring a Senior Salesforce Architect to shape Salesforce CRM strategy, lead platform architecture, and support digital transformation across customer technology services.",
  },
  {
    title: "Salesforce Project Manager",
    details: ["£65,000 - £85,000 + Bonus", "Remote", "Full Time"],
    description:
      "ProvidusCRM is hiring a Salesforce Project Manager to lead full lifecycle implementations, manage stakeholders, and deliver large-scale Salesforce transformation projects across enterprise and mid-market clients.",
  },
  {
    title: "Salesforce CPQ Specialist & Revenue Cloud Consultant",
    details: ["£65,000 - £85,000 + Bonus", "Remote", "Full Time"],
    description:
      "ProvidusCRM is hiring a Salesforce RCA / CPQ Technical Consultant to design Revenue Cloud solutions, build complex CPQ functionality, and deliver enterprise Quote-to-Cash transformations.",
  },
  {
    title: "Salesforce Delivery Manager",
    details: ["£75,000 - £95,000", "Remote", "12 Month Fixed-Term Contract"],
    description:
      "ProvidusCRM is hiring a Salesforce Delivery Manager to lead enterprise Salesforce transformation, manage governance, stakeholders and partners, and drive successful business adoption.",
  },
];
