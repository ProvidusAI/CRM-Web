import Link from "next/link";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Container } from "./Container";
import { Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface FooterColumn {
  title: string;
  /** Figma spaces the short lists wider (35px rows) than the long ones (30px). */
  loose?: boolean;
  links: { label: string; href: string }[];
}

// Figma 870:1704 — five link columns, in this order.
const columns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Salesforce Consulting Services", href: "/services/salesforce-consulting-services" },
      { label: "Salesforce Customisation Services", href: "/services/salesforce-customisation-services" },
      { label: "Salesforce Development Services", href: "/services/salesforce-development-services" },
      { label: "Salesforce Implementation Services", href: "/services/salesforce-implementation-services" },
      { label: "Salesforce Integration Services", href: "/services/salesforce-integration-services" },
      { label: "Salesforce Managed Services", href: "/services/salesforce-managed-services" },
      { label: "Salesforce Migration Services", href: "/services/salesforce-migration-services" },
    ],
  },
  {
    title: "Industry",
    links: [
      { label: "Salesforce Health Cloud Consulting", href: "/industries/salesforce-health-cloud-consulting" },
      { label: "Salesforce Nonprofit Consulting", href: "/industries/salesforce-nonprofit-consulting" },
      { label: "Salesforce Financial Services Cloud Consulting", href: "/industries/salesforce-financial-services-cloud-consulting" },
      { label: "Salesforce Education Cloud Consulting", href: "/industries/salesforce-education-cloud-consulting" },
      { label: "Salesforce Commerce Cloud Consulting", href: "/industries/salesforce-commerce-cloud-consulting" },
    ],
  },
  {
    title: "Platform Expertise",
    links: [
      { label: "Salesforce Sales Cloud Consulting", href: "/platform-expertise/salesforce-sales-cloud-consulting" },
      { label: "Salesforce Service Cloud Consulting", href: "/platform-expertise/salesforce-service-cloud-consulting" },
      { label: "Salesforce Marketing Cloud Consulting", href: "/platform-expertise/salesforce-marketing-cloud-consulting" },
      { label: "Salesforce Experience Cloud Consulting", href: "/platform-expertise/salesforce-experience-cloud-consulting" },
      { label: "Salesforce Data Cloud Consulting", href: "/platform-expertise/salesforce-data-cloud-consulting" },
      { label: "Salesforce Agentforce Consulting", href: "/platform-expertise/salesforce-agentforce-consulting" },
    ],
  },
  {
    title: "Partnerships",
    loose: true,
    links: [
      { label: "FinDock", href: "/partnership/findock" },
      { label: "Fundraise Up", href: "/partnership/fundraise-up" },
      { label: "Dotdigital", href: "/partnership/dotdigital" },
    ],
  },
  {
    title: "Quicklinks",
    loose: true,
    links: [
      { label: "Hire Talent", href: "/salesforce-recruitment-agency" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "About Us", href: "/about" },
    ],
  },
];

const badges = [
  { src: "/images/footer-badges/1.webp", alt: "Google five-star reviews", width: 236, height: 121, wordmark: true },
  { src: "/images/footer-badges/2.webp", alt: "GoodFirms", width: 198, height: 192 },
  { src: "/images/footer-badges/3.webp", alt: "G2 High Performer, Spring 2026", width: 171, height: 195 },
  { src: "/images/footer-badges/4.webp", alt: "DesignRush Verified Agency 2026", width: 152, height: 210 },
  { src: "/images/footer-badges/5.webp", alt: "Slashdot Top Performer, Spring 2024", width: 183, height: 194 },
  { src: "/images/footer-badges/6.webp", alt: "Software Advice Best Customer Support 2025", width: 198, height: 210 },
  { src: "/images/footer-badges/7.webp", alt: "G2 Highest User Adoption, Small Business, Spring 2025", width: 169, height: 195 },
  { src: "/images/footer-badges/8.webp", alt: "SourceForge Customers Love Us", width: 189, height: 171 },
  { src: "/images/footer-badges/9.webp", alt: "G2 Best Meets Requirements, Spring 2025", width: 158, height: 181 },
];

const linkedInUrl = "https://www.linkedin.com/showcase/providuscrmuk/";

// Figma shows FAQ, Term of Service and Privacy Policy here. Those pages don't
// exist yet, so the links stay out until they do (add { label, href } entries).
const legalLinks: { label: string; href: string }[] = [];

export function Footer() {
  return (
    <footer className="bg-footer-blue pt-14 pb-14 text-white">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:flex lg:justify-between lg:gap-8">
          {columns.map((column) => (
            // Phones: the long lists take a full row, the two short ones share one.
            <div key={column.title} className={column.loose ? undefined : "col-span-2 sm:col-span-1"}>
              <Text as="h2" variant="p2" className="mb-5 text-white">
                {column.title}
              </Text>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "typography-p4 text-footer-link transition-colors hover:text-white motion-reduce:transition-none",
                        column.loose ? "!leading-[35px]" : "!leading-[30px]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Figma: no rule above the badges — they sit straight under the columns. */}
        <ul
          aria-label="Awards and reviews"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:justify-between"
        >
          {badges.map((badge) => (
            <li key={badge.src}>
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className={cn("w-auto", "wordmark" in badge ? "h-12 lg:h-[58px]" : "h-[72px] lg:h-[92px]")}
              />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={linkedInUrl}
            aria-label="ProvidusCRM on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 motion-reduce:transition-none"
          >
            <Image src="/images/linkedin.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
          </Link>

          <p className="flex items-center gap-3 text-footer-link">
            <span className="sr-only">Rated 4.9 out of 5</span>
            <Image src="/images/providus-mark.svg" alt="" width={22} height={25} className="h-6 w-auto" />
            <span aria-hidden="true" className="font-heading text-[26px] font-semibold leading-none">
              Rating: 4.9
            </span>
            <span aria-hidden="true" className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="h-6 w-6 fill-current" strokeWidth={0} />
              ))}
              <span className="relative h-6 w-6">
                <Star className="absolute inset-0 h-6 w-6" strokeWidth={1.75} />
                <StarHalf className="absolute inset-0 h-6 w-6 fill-current" strokeWidth={0} />
              </span>
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="typography-p4 !text-[12px] text-white/80">
            © Copyright 2026, All Rights Reserved
          </p>
          {legalLinks.length > 0 && (
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="typography-p4 !text-[12px] text-white/80 transition-colors hover:text-white motion-reduce:transition-none"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </Container>
    </footer>
  );
}
