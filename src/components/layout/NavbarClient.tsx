"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import type { NavItem } from "@/types";
import { Container } from "./Container";

interface DropdownNavItem extends NavItem {
  children?: NavItem[];
}

interface NavbarClientProps {
  salesforceServices: NavItem[];
}

export function NavbarClient({ salesforceServices }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(salesforceServices);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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

          <button
            className="p-2 text-[#2E2E2E] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="flex flex-col gap-3 border-t border-gray-100 py-4 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-p3 px-2 py-1 text-[#2E2E2E] transition-colors hover:text-[#1D70C5]"
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  <div className="ml-4 flex flex-col gap-2 border-l border-gray-100 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-p4 px-2 py-1 text-[#5F5F5F] transition-colors hover:text-[#1D70C5]"
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive(child.href) ? "page" : undefined}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-p3 px-2 py-1 text-[#2E2E2E] transition-colors hover:text-[#1D70C5]"
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="border-t border-gray-100 pt-3">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <CtaButton variant="filled" size="sm" className="w-full">
                  Let&apos;s Connect
                </CtaButton>
              </Link>
            </div>
          </div>
        )}
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
