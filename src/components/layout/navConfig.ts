import type { NavItem } from "@/types";

export interface NavIcon {
  src: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  href: string;
  icon: NavIcon;
}

export interface NavCategory {
  label: string;
  /** Overview page. Company has none. */
  href?: string;
  icon: NavIcon;
  links: NavLink[];
}

interface NavEntryBase {
  label: string;
  /** Path prefixes of the pages this item is highlighted on. */
  section: string[];
}

export type NavEntry =
  | (NavEntryBase & { kind: "link"; href: string })
  | (NavEntryBase & { kind: "panel"; categories: NavCategory[] });

// White glyphs exported from Figma (j8xHI1PKviupVUOnQwdVUr), drawn at their
// intrinsic size (rounded) inside a 25px green circle. health-cloud.svg is
// already a full 25px icon, circle included.
function icon(name: string, width: number, height: number): NavIcon {
  return { src: `/images/nav/${name}.svg`, width, height };
}

const CATEGORY_ICONS = {
  salesforceServices: icon("cat-salesforce-services", 18, 13),
  industries: icon("cat-industries", 16, 16),
  platformExpertise: icon("cat-platform-expertise", 15, 15),
  partnership: icon("partnership", 19, 13),
  company: icon("cat-company", 17, 17),
};

// Service pages come from Sanity, so their icons are matched by URL. A new
// service page shows the category glyph until it gets an entry here.
const SERVICE_ICONS: Record<string, NavIcon> = {
  "/services/salesforce-consulting-services": icon("consulting", 15, 15),
  "/services/salesforce-customisation-services": icon("customisation", 19, 19),
  "/services/salesforce-development-services": icon("development", 17, 17),
  "/services/salesforce-implementation-services": icon("implementation", 17, 17),
  "/services/salesforce-integration-services": icon("integration", 19, 19),
  "/services/salesforce-managed-services": icon("managed-services", 15, 15),
  "/services/salesforce-migration-services": icon("migration", 17, 14),
};

// Labels follow Figma, which shortens a few page titles.
const INDUSTRY_LINKS: NavLink[] = [
  {
    label: "Salesforce Health Cloud Consulting",
    href: "/industries/salesforce-health-cloud-consulting",
    icon: icon("health-cloud", 25, 25),
  },
  {
    label: "Salesforce Nonprofit Consulting",
    href: "/industries/salesforce-nonprofit-consulting",
    icon: icon("nonprofit", 17, 16),
  },
  {
    label: "Salesforce Financial Services",
    href: "/industries/salesforce-financial-services-cloud-consulting",
    icon: icon("financial-services", 15, 18),
  },
  {
    label: "Salesforce Education Cloud Consulting",
    href: "/industries/salesforce-education-cloud-consulting",
    icon: icon("education-cloud", 17, 17),
  },
  {
    label: "Salesforce Commerce Cloud Consulting",
    href: "/industries/salesforce-commerce-cloud-consulting",
    icon: icon("commerce-cloud", 16, 17),
  },
];

const PLATFORM_LINKS: NavLink[] = [
  {
    label: "Salesforce Sales Cloud Consulting",
    href: "/platform-expertise/salesforce-sales-cloud-consulting",
    icon: icon("sales-cloud", 15, 15),
  },
  {
    label: "Salesforce Service Cloud Consulting",
    href: "/platform-expertise/salesforce-service-cloud-consulting",
    icon: icon("service-cloud", 15, 15),
  },
  {
    label: "Salesforce Marketing Cloud Consulting",
    href: "/platform-expertise/salesforce-marketing-cloud-consulting",
    icon: icon("marketing-cloud", 17, 17),
  },
  {
    label: "Salesforce Experience Cloud Consulting",
    href: "/platform-expertise/salesforce-experience-cloud-consulting",
    icon: icon("experience-cloud", 17, 17),
  },
  {
    label: "Salesforce Data Cloud Consulting",
    href: "/platform-expertise/salesforce-data-cloud-consulting",
    icon: icon("data-cloud", 15, 15),
  },
  {
    label: "Salesforce Agentforce Consulting",
    href: "/platform-expertise/salesforce-agentforce-consulting",
    icon: icon("agentforce", 17, 16),
  },
];

const PARTNER_LINKS: NavLink[] = [
  { label: "FinDock", href: "/partnership/findock", icon: CATEGORY_ICONS.partnership },
  { label: "Fundraise Up", href: "/partnership/fundraise-up", icon: CATEGORY_ICONS.partnership },
  { label: "Dotdigital", href: "/partnership/dotdigital", icon: CATEGORY_ICONS.partnership },
];

const COMPANY_LINKS: NavLink[] = [
  { label: "About Us", href: "/about", icon: icon("about-us", 15, 17) },
  { label: "Blog", href: "/blog", icon: icon("blog", 15, 16) },
];

export function buildNav(salesforceServices: NavItem[]): NavEntry[] {
  return [
    {
      kind: "panel",
      label: "Services",
      section: ["/services", "/industries", "/platform-expertise"],
      categories: [
        {
          label: "Salesforce Services",
          href: "/services",
          icon: CATEGORY_ICONS.salesforceServices,
          links: salesforceServices.map((service) => ({
            ...service,
            icon: SERVICE_ICONS[service.href] ?? CATEGORY_ICONS.salesforceServices,
          })),
        },
        {
          label: "Industries We Serve",
          href: "/industries",
          icon: CATEGORY_ICONS.industries,
          links: INDUSTRY_LINKS,
        },
        {
          label: "Platform Expertise",
          href: "/platform-expertise",
          icon: CATEGORY_ICONS.platformExpertise,
          links: PLATFORM_LINKS,
        },
      ],
    },
    { kind: "link", label: "Our Work", href: "/case-studies", section: ["/case-studies"] },
    {
      kind: "link",
      label: "Hire Talent",
      href: "/salesforce-recruitment-agency",
      section: ["/salesforce-recruitment-agency"],
    },
    {
      kind: "panel",
      label: "Partnership",
      section: ["/partnership"],
      categories: [
        {
          label: "Partnership",
          href: "/partnership",
          icon: CATEGORY_ICONS.partnership,
          links: PARTNER_LINKS,
        },
      ],
    },
    {
      kind: "panel",
      label: "Company",
      section: ["/about", "/blog"],
      categories: [{ label: "Company", icon: CATEGORY_ICONS.company, links: COMPANY_LINKS }],
    },
  ];
}

export function isInSection(pathname: string, section: string[]): boolean {
  return section.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
