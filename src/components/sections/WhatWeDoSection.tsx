"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface WhatWeDoTabLink {
  href: string;
  isExternal: boolean;
}

export interface WhatWeDoTab {
  id?: string;
  label: string;
  content: {
    heading: string;
    text: string;
    bullets?: string[];
  };
  link?: WhatWeDoTabLink;
}

interface WhatWeDoSectionProps {
  title?: string;
  tabs?: WhatWeDoTab[];
  backgroundOverlayColor?: string;
}

const tabs: WhatWeDoTab[] = [
  {
    id: "consulting",
    label: "Salesforce Consulting",
    content: {
      heading: "Salesforce Consulting",
      text: "Not every CRM challenge needs more third-party tools or software. Sometimes it needs clearer thinking and a more actionable CRM strategy. ProvidusCRM's Salesforce consulting services start with understanding how the business actually runs, then building a CRM strategy around that reality.\n\nCertified consultants assess existing workflows, identify process gaps, and design Salesforce roadmaps tied to real commercial outcomes.",
      bullets: [
        "CRM strategy and Salesforce platform assessments",
        "Process mapping across sales, service, and marketing workflows",
        "Licence and cost optimisation reviews",
        "Agentforce readiness evaluation and AI adoption planning",
      ],
    },
    link: {
      href: "/services/salesforce-consulting-services",
      isExternal: false,
    },
  },
  {
    id: "development",
    label: "Salesforce Development",
    content: {
      heading: "Salesforce Development",
      text: "Out-of-the-box Salesforce covers the basics. Custom development covers everything else. ProvidusCRM builds Apex classes, Lightning Web Components, and custom APIs that extend Salesforce into the exact tool the organisation needs.\n\nEvery build follows Salesforce development best practices, passes security review standards, and is documented for long-term maintainability.",
      bullets: [
        "Custom Apex triggers, batch jobs, and scheduled processes",
        "Lightning Web Component development for internal and external users",
        "REST and SOAP API development for third-party connectivity",
        "Code review, refactoring, and technical debt remediation",
      ],
    },
    link: {
      href: "/services/salesforce-development-services",
      isExternal: false,
    },
  },
  {
    id: "implementation",
    label: "Salesforce Implementation",
    content: {
      heading: "Salesforce Implementation",
      text: "A Salesforce implementation done right means your teams won’t have to struggle adjusting their workflows around your new CRM org. ProvidusCRM runs structured implementations from discovery through go-live, covering solution design, configuration, data migration, user training, and post-launch support.\n\nEvery project follows a defined delivery framework with clear milestones, documented decisions, and smooth handovers. If you’re new to Salesforce, we handle first-time implementations and full platform rebuilds just as well.",
      bullets: [
        "End-to-end delivery from scoping workshops to production launch",
        "Multi-cloud implementations across Sales, Service, Marketing, and Experience Cloud",
        "User acceptance testing and adoption-focused training programmes",
        "Post-go-live hypercare and stabilisation support",
      ],
    },
    link: {
      href: "/services/salesforce-implementation-services",
      isExternal: false,
    },
  },
  {
    id: "migration",
    label: "Salesforce Migration",
    content: {
      heading: "Salesforce Migration",
      text: "Moving from a legacy CRM, spreadsheets, or a poorly configured Salesforce org to a clean, optimised environment is high-stakes work.\n\nProvidusCRM handles the entire migration lifecycle: data audit, field mapping, deduplication, validation testing, and cutover planning. Every record is accounted for. Every workflow is rebuilt to match current business needs.",
      bullets: [
        "Migration from HubSpot, Dynamics, Zoho, or legacy Salesforce orgs",
        "Full data audit with deduplication and field-level mapping",
        "Parallel-run testing to validate data integrity before cutover",
        "Workflow and automation rebuild on the target environment",
      ],
    },
    link: {
      href: "/services/salesforce-migration-services",
      isExternal: false,
    },
  },
  {
    id: "integration",
    label: "Salesforce Integration",
    content: {
      heading: "Salesforce Integration",
      text: "Salesforce becomes far more powerful when your tools and systems are well-synced and “talk” to each other. At ProvidusCRM, we connect your Salesforce org to ERPs, accounting tools, marketing platforms, payment gateways, and custom databases using MuleSoft, native Salesforce APIs, or middleware.\n\nEvery integration is designed to handle real production volumes, log errors properly, and stay maintainable as both systems evolve.",
      bullets: [
        "MuleSoft and native Salesforce API integration architecture",
        "ERP, accounting, and marketing platform connectivity",
        "Real-time and batch data synchronisation",
        "Error handling, logging, and integration monitoring setup",
      ],
    },
    link: {
      href: "/services/salesforce-integration-services",
      isExternal: false,
    },
  },
  {
    id: "customisation",
    label: "Salesforce Customisation",
    content: {
      heading: "Salesforce Customisation",
      text: "Basic Salesforce orgs work for businesses with mundane processes and no proper growth initiatives. Your organisation is built differently, and so will be your Salesforce org. ProvidusCRM customises page layouts, record types, permission sets, validation rules, flows, and automation to match the way teams actually work.\n\nEvery customisation is built within Salesforce governance best practices, avoiding the configuration debt that makes orgs fragile and expensive to maintain over time.",
      bullets: [
        "Custom objects, fields, page layouts, and record types",
        "Flow Builder automation for approvals, notifications, and record updates",
        "Role hierarchies, permission sets, and sharing rule configuration",
        "Validation rules and data quality enforcement at the field level",
      ],
    },
    link: {
      href: "/services/salesforce-customisation-services",
      isExternal: false,
    },
  },
  {
    id: "managed",
    label: "Salesforce Managed Services",
    content: {
      heading: "Salesforce Managed Services",
      text: "Something broke. A report looks wrong. A user is locked out. A flow stopped firing. ProvidusCRM’s support and maintenance service handles the everyday operational issues that slow teams down. Defined SLAs, ticketed support, and certified specialists who understand your Salesforce org and challenges.\n\nKnowledge base and user documentation are maintained alongside every fix.",
      bullets: [
        "Tiered SLA-based support with defined response and resolution times",
        "Bug fixes, configuration adjustments, and user access management",
        "Proactive health checks and system monitoring",
        "Knowledge base and user documentation are maintained alongside every fix",
      ],
    },
  },
  {
    id: "support",
    label: "Salesforce Support and Maintenance",
    content: {
      heading: "Salesforce Support and Maintenance",
      text: "Ensuring your Salesforce environment remains stable, secure, and up-to-date is critical for long-term success. Our support and maintenance services provide the peace of mind that your CRM is always performing at its best, with expert help just a ticket away.\n\nWe proactively monitor system health and implement necessary updates to prevent issues before they impact your business operations.",
      bullets: [
        "24/7 critical system monitoring and alerting",
        "Regular security audits and permission reviews",
        "Seasonal release management and feature impact analysis",
        "Performance tuning and database maintenance",
      ],
    },
  },
];

export function WhatWeDoSection({
  title,
  tabs: customTabs,
  backgroundOverlayColor = "var(--color-tab-highlight)",
}: WhatWeDoSectionProps) {
  const displayTabs = (customTabs && customTabs.length > 0 ? customTabs : tabs).map(
    (tab, index) => ({
      ...tab,
      id: tab.id || `tab-${index}`,
    })
  );
  const [activeTab, setActiveTab] = useState(displayTabs[0]?.id || "tab-0");

  const activeTabObj = displayTabs.find((t) => t.id === activeTab) || displayTabs[0];
  const activeContent = activeTabObj?.content;
  const activeLink = activeTabObj?.link;

  return (
    <section className="relative py-24 min-h-[800px] flex items-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/what-we-do-bg.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: backgroundOverlayColor, opacity: 0.9 }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: backgroundOverlayColor, opacity: 0.4 }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={60}
            height={20}
            className="w-16 h-auto"
          />
          <Heading as="h2" className="text-white !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[45px]">
            {title || "What We Do"}
          </Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs List */}
          <div className="lg:col-span-5">
            {/* Mobile: horizontal scrollable row with touch snap */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {displayTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "snap-start shrink-0 text-left px-6 py-5 transition-all duration-300 flex justify-between items-center",
                    activeTab === tab.id
                      ? "bg-brand-green-light text-black rounded-[12px] shadow-lg translate-x-0"
                      : "bg-white text-black rounded-[12px] hover:bg-white/90"
                  )}
                >
                  <Text variant="p1" className="font-semibold !leading-tight font-heading">
                    {tab.label}
                  </Text>
                  {activeTab === tab.id && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop: vertical column */}
            <div className="hidden md:flex flex-col gap-2">
              {displayTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full text-left px-6 py-5 transition-all duration-300 flex justify-between items-center",
                    activeTab === tab.id
                      ? "bg-brand-green-light text-black rounded-[12px] shadow-lg translate-x-2"
                      : "bg-white text-black rounded-[12px] hover:bg-white/90"
                  )}
                >
                  <Text variant="p1" className="font-semibold !leading-tight font-heading">
                    {tab.label}
                  </Text>
                  {activeTab === tab.id && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-[16px] p-8 md:p-16 relative overflow-hidden min-h-[600px] shadow-2xl">
            {/* Content Background Image */}
            <div className="absolute top-0 right-0 pointer-events-none h-full w-full">
              <Image
                src="/images/tab-content-bg.webp"
                alt=""
                fill
                className="object-cover object-top opacity-30"
              />
            </div>

            <div className="relative z-10">
              {activeLink ? (
                activeLink.isExternal ? (
                  <a href={activeLink.href} target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                    <Heading as="h3" className="text-black mb-8 !text-[28px] !leading-[32px] md:!text-[45px] md:!leading-[50px]">
                      {activeContent?.heading}
                    </Heading>
                  </a>
                ) : (
                  <a href={activeLink.href} className="inline-block hover:opacity-80 transition-opacity">
                    <Heading as="h3" className="text-black mb-8 !text-[28px] !leading-[32px] md:!text-[45px] md:!leading-[50px]">
                      {activeContent?.heading}
                    </Heading>
                  </a>
                )
              ) : (
                <Heading as="h3" className="text-black mb-8 !text-[28px] !leading-[32px] md:!text-[45px] md:!leading-[50px]">
                  {activeContent?.heading}
                </Heading>
              )}

              <div className="space-y-6">
                {activeContent?.text.split('\n\n').map((p, i) => (
                  <Text key={i} variant="p2" className="text-gray-700 leading-relaxed">
                    {p}
                  </Text>
                ))}
              </div>

              {activeContent?.bullets && (
                <ul className="mt-8 space-y-4">
                  {activeContent.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      <Text variant="p2" className="text-gray-600">
                        {bullet}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
