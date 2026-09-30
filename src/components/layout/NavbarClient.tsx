"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import type { NavItem } from "@/types";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { buildNav } from "./navConfig";

interface DropdownNavItem extends NavItem {
  children?: NavItem[];
}

interface NavbarClientProps {
  salesforceServices: NavItem[];
}

export function NavbarClient({ salesforceServices }: NavbarClientProps) {
  const pathname = usePathname();
  const navItems = getNavItems(salesforceServices);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <Container>
        <div className="flex h-18 items-center justify-between gap-8 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="ProvidusCRM"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown item={item} key={item.href} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-p3 whitespace-nowrap text-[#2E2E2E] transition-colors hover:text-[#1D70C5]"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link href="/contact">
              <CtaButton variant="filled" size="sm">
                Let&apos;s Connect
              </CtaButton>
            </Link>
          </div>

          <MobileNav entries={buildNav(salesforceServices)} />
        </div>
      </Container>
    </header>
  );
}

function DesktopDropdown({ item }: { item: DropdownNavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
        className="text-p3 flex items-center gap-1 whitespace-nowrap text-[#2E2E2E] transition-colors hover:text-[#1D70C5]"
      >
        {item.label}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      <div
        className={`invisible absolute left-1/2 top-full z-50 min-w-[300px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 ${isOpen ? "visible opacity-100" : ""
          }`}
      >
        <div className="rounded-[8px] border border-gray-100 bg-white p-2 shadow-xl">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="text-p3 block rounded-[6px] px-4 py-3 text-[#2E2E2E] transition-colors hover:bg-brand-blue-light hover:text-[#1D70C5]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const industryPages: NavItem[] = [
  {
    label: "Salesforce Health Cloud Consulting",
    href: "/industries/salesforce-health-cloud-consulting",
  },
  {
    label: "Salesforce Nonprofit Consulting",
    href: "/industries/salesforce-nonprofit-consulting",
  },
  {
    label: "Salesforce Financial Services Cloud Consulting",
    href: "/industries/salesforce-financial-services-cloud-consulting",
  },
  {
    label: "Salesforce Education Cloud Consulting",
    href: "/industries/salesforce-education-cloud-consulting",
  },
  {
    label: "Salesforce Commerce Cloud Consulting",
    href: "/industries/salesforce-commerce-cloud-consulting",
  },
];

const platformExpertisePages: NavItem[] = [
  {
    label: "Salesforce Sales Cloud Consulting",
    href: "/platform-expertise/salesforce-sales-cloud-consulting",
  },
  {
    label: "Salesforce Service Cloud Consulting",
    href: "/platform-expertise/salesforce-service-cloud-consulting",
  },
  {
    label: "Salesforce Marketing Cloud Consulting",
    href: "/platform-expertise/salesforce-marketing-cloud-consulting",
  },
  {
    label: "Salesforce Experience Cloud Consulting",
    href: "/platform-expertise/salesforce-experience-cloud-consulting",
  },
  {
    label: "Salesforce Data Cloud Consulting",
    href: "/platform-expertise/salesforce-data-cloud-consulting",
  },
  {
    label: "Salesforce Agentforce Consulting",
    href: "/platform-expertise/salesforce-agentforce-consulting",
  },
];

const partnerPages: NavItem[] = [
  { label: "FinDock", href: "/partnership/findock" },
  { label: "Fundraise Up", href: "/partnership/fundraise-up" },
  { label: "Dotdigital", href: "/partnership/dotdigital" },
];

function getNavItems(salesforceServices: NavItem[]): DropdownNavItem[] {
  return [
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: salesforceServices,
    },
    {
      label: "Industry",
      href: "/industries",
      children: industryPages,
    },
    {
      label: "Platform Expertise",
      href: "/platform-expertise",
      children: platformExpertisePages,
    },
    {
      label: "Partnership",
      href: "/partnership",
      children: partnerPages,
    },
    { label: "Hire Talent", href: "/salesforce-recruitment-agency" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
  ];
}
