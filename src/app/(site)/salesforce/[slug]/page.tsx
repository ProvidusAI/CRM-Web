import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";
import {
  CertifiedSection,
  ExpertiseSection,
  IndustriesSection,
  MigrationPlatformsSection,
  PartnersSection,
  SalesforceConsultCtaSection,
  SalesforceProcessSection,
  SalesforceServiceHero,
  ServiceBenefitsSection,
  PageBlogsSection,
  ServiceCaseStudiesSection,
  WhatWeDoSection,
  WhyChooseSection,
  FaqSection,
} from "@/components/sections";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import type {
  ExpertiseItem,
} from "@/components/sections/ExpertiseSection";
import type {
  IndustrySectionItem,
} from "@/components/sections/IndustriesSection";
import type {
  MigrationPlatformItem,
} from "@/components/sections/MigrationPlatformsSection";
import type {
  WhatWeDoTab,
} from "@/components/sections/WhatWeDoSection";
import type {
  WhyChooseReason,
} from "@/components/sections/WhyChooseSection";
import {
  SALESFORCE_CONSULTING_SERVICES_SLUG,
  salesforceConsultingServicesFallback,
} from "@/data/salesforceServicePage";
import { resolveJsonLd } from "@/lib/jsonLd";
import { toBlogTeaserCards } from "@/lib/blogTeaserCards";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  CASE_STUDIES_QUERY,
  SERVICE_PAGE_QUERY,
  SERVICE_PAGE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  CaseStudyListItem,
  SanityImage,
  ServiceBenefitItem,
  ServicePage,
  ServicePageSectionKey,
} from "@/sanity/lib/types";

interface SalesforceServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

const DEFAULT_SERVICE_SECTION_ORDER: ServicePageSectionKey[] = [
  "partners",
  "certified",
  "caseStudies",
  "tabs",
  "consultantCta",
  "benefits",
  "process",
  "migrationPlatforms",
  "expertise",
  "industries",
  "whyChoose",
  "faqs",
  "blogs",
  "cta",
];

const SERVICE_SECTION_KEY_SET = new Set<string>(DEFAULT_SERVICE_SECTION_ORDER);

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: SERVICE_PAGE_SLUGS_QUERY,
    tags: ["service-pages"],
    revalidate: 60,
    metadata: true,
  });

  const uniqueSlugs = new Set([
    SALESFORCE_CONSULTING_SERVICES_SLUG,
    ...(slugs ?? []).map((item) => item.slug),
  ]);

  return Array.from(uniqueSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SalesforceServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const fetchedPage = await getServicePage(slug, true);

  if (!fetchedPage) {
    return {
      title: "Service Not Found | ProvidusCRM",
    };
  }

  return buildPageMetadata({
    seo: fetchedPage.seo,
    title: fetchedPage.title,
    description: fetchedPage.hero?.description,
    image: fetchedPage.hero?.backgroundImage?.asset?.url,
    canonicalPath: `/services/${fetchedPage.slug.current}`,
  });
}

export default async function SalesforceServicePage({
  params,
}: SalesforceServicePageProps) {
  const { slug } = await params;
  const [fetchedPage, fallbackCaseStudies] = await Promise.all([
    getServicePage(slug),
    sanityFetch<CaseStudyListItem[]>({
      query: CASE_STUDIES_QUERY,
      tags: ["case-studies"],
    }),
  ]);

  const page =
    fetchedPage ||
    (slug === SALESFORCE_CONSULTING_SERVICES_SLUG
      ? salesforceConsultingServicesFallback
      : null);

  if (!page) {
    notFound();
  }

  const caseStudySource =
    page.caseStudies && page.caseStudies.length > 0
      ? page.caseStudies
      : fetchedPage
        ? []
        : fallbackCaseStudies ?? [];

  const serviceCaseStudies = caseStudySource.map((caseStudy) => ({
    title: caseStudy.title,
    slug: caseStudy.slug.current,
    image: imageUrl(caseStudy.coverImage) || "/images/case-study.webp",
    label: caseStudy.technologies?.[0] || "Salesforce Consulting",
    category: caseStudy.industry,
  }));
  const consultantCta = page.consultantCta;
  const legacyCta = page.cta;
  const processSteps = page.processSection?.steps?.filter((step) =>
    step.title?.trim()
  );
  const migrationPlatforms = toMigrationPlatformItems(page);
  const jsonLd = resolveJsonLd(page.jsonLd);
  const orderedSectionKeys = getOrderedServiceSectionKeys(page.sectionOrder);
  const sectionRenderers: Record<ServicePageSectionKey, ReactNode> = {
    partners: <PartnersSection />,
    certified: (
      <CertifiedSection
        title={page.certified?.title}
        description={page.certified?.description}
      />
    ),
    caseStudies: <ServiceCaseStudiesSection caseStudies={serviceCaseStudies} />,
    blogs: <PageBlogsSection posts={toBlogTeaserCards(page.blogs)} />,
    tabs: (
      <WhatWeDoSection
        title={page.tabsSection?.title}
        tabs={toWhatWeDoTabs(page)}
        backgroundOverlayColor="#616161"
      />
    ),
    consultantCta: (
      <SalesforceConsultCtaSection
        title={consultantCta?.title}
        buttonLabel={consultantCta?.buttonLabel}
        buttonHref={consultantCta?.buttonHref}
        backgroundColor={consultantCta?.backgroundColor}
        image={imageUrl(consultantCta?.image)}
        imageAlt={consultantCta?.image?.alt}
      />
    ),
    benefits: (
      <ServiceBenefitsSection
        title={page.benefitsSection?.title}
        items={toBenefitCards(page.benefitsSection?.items)}
      />
    ),
    process:
      processSteps && processSteps.length > 0 ? (
        <SalesforceProcessSection
          title={page.processSection?.title}
          steps={processSteps}
        />
      ) : null,
    migrationPlatforms:
      migrationPlatforms && migrationPlatforms.length > 0 ? (
        <MigrationPlatformsSection
          title={page.migrationPlatformsSection?.title}
          items={migrationPlatforms}
        />
      ) : null,
    expertise: (
      <ExpertiseSection
        title={page.expertiseSection?.title}
        items={toExpertiseItems(page)}
      />
    ),
    industries: page.industriesSection ? (
      <IndustriesSection
        title={page.industriesSection.title}
        items={toIndustryItems(page)}
      />
    ) : null,
    whyChoose: (
      <WhyChooseSection
        title={page.whyChooseSection?.title}
        customReasons={toWhyChooseReasons(page)}
        image={imageUrl(page.whyChooseSection?.image)}
        imageAlt={page.whyChooseSection?.image?.alt}
        backgroundOverlayColor="#616161"
      />
    ),
    faqs: page.faqSection ? (
      <FaqSection
        title={page.faqSection.title}
        faqs={page.faqSection.faqs}
      />
    ) : null,
    cta: (
      <CtaSection
        title={legacyCta?.title}
        buttonLabel={legacyCta?.buttonLabel}
        buttonHref={legacyCta?.buttonHref}
        backgroundImage={imageUrl(legacyCta?.backgroundImage)}
      />
    ),
  };

  return (
    <div className="overflow-x-hidden bg-white">
      <JsonLdScript data={jsonLd} />
      <SalesforceServiceHero
        badgeTitle={page.hero?.badgeTitle}
        badgeSubtitle={page.hero?.badgeSubtitle}
        title={page.hero?.heading || page.title}
        description={page.hero?.description}
        bullets={page.hero?.bullets}
        formTitle={page.hero?.formTitle}
        formButtonLabel={page.hero?.formButtonLabel}
        backgroundImage={imageUrl(page.hero?.backgroundImage)}
      />
      {orderedSectionKeys.map((sectionKey) => (
        <div key={sectionKey} data-section-key={sectionKey}>
          {sectionRenderers[sectionKey]}
        </div>
      ))}
    </div>
  );
}

async function getServicePage(slug: string, metadata = false) {
  return sanityFetch<ServicePage>({
    query: SERVICE_PAGE_QUERY,
    params: { slug },
    tags: ["service-pages"],
    metadata,
  });
}

function imageUrl(image?: SanityImage) {
  return image?.asset?.url;
}

function getOrderedServiceSectionKeys(sectionOrder?: readonly string[]) {
  const orderedKeys: ServicePageSectionKey[] = [];
  const seenKeys = new Set<ServicePageSectionKey>();

  for (const sectionKey of sectionOrder ?? []) {
    if (
      isServicePageSectionKey(sectionKey) &&
      !seenKeys.has(sectionKey)
    ) {
      orderedKeys.push(sectionKey);
      seenKeys.add(sectionKey);
    }
  }

  for (const sectionKey of DEFAULT_SERVICE_SECTION_ORDER) {
    if (!seenKeys.has(sectionKey)) {
      orderedKeys.push(sectionKey);
    }
  }

  return orderedKeys;
}

function isServicePageSectionKey(value: string): value is ServicePageSectionKey {
  return SERVICE_SECTION_KEY_SET.has(value);
}

function toWhatWeDoTabs(page: ServicePage): WhatWeDoTab[] | undefined {
  const tabs = page.tabsSection?.tabs;

  if (!tabs || tabs.length === 0) {
    return undefined;
  }

  return tabs.map((tab, index) => {
    let linkObj: { href: string; isExternal: boolean } | undefined = undefined;

    if (tab.link?.linkType === "external" && tab.link.externalUrl) {
      linkObj = { href: tab.link.externalUrl, isExternal: true };
    } else if (tab.link?.linkType === "internal" && tab.link.internalLink?.slug) {
      const type = tab.link.internalLink._type;
      const targetSlug = tab.link.internalLink.slug;
      let href = `/${targetSlug}`;
      if (type === "servicePage") href = `/services/${targetSlug}`;
      else if (type === "caseStudy") href = `/case-studies/${targetSlug}`;
      else if (type === "post") href = `/blog/${targetSlug}`;
      linkObj = { href, isExternal: false };
    }

    return {
      id: slugify(tab.label) || `service-tab-${index}`,
      label: tab.label,
      content: {
        heading: tab.heading,
        text: tab.text || "",
        bullets: tab.bullets,
      },
      link: linkObj,
    };
  });
}

function toBenefitCards(items?: ServiceBenefitItem[]) {
  return (items ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title,
      description: item.description || "",
      iconKey: item.iconKey,
      colorTheme: item.colorTheme,
    }));
}

function toExpertiseItems(page: ServicePage): ExpertiseItem[] | undefined {
  const items = page.expertiseSection?.items;

  if (!items || items.length === 0) {
    return undefined;
  }

  return items.map((item, index) => ({
    id: `${slugify(item.title)}-${index}`,
    title: item.title,
    text: item.text || "",
    icon: imageUrl(item.icon) || "/images/service-cloud.webp",
    shadow: `0px 4.36px 0px 0px ${item.accentColor || "#1D70C5"}`,
  }));
}

function toMigrationPlatformItems(
  page: ServicePage
): MigrationPlatformItem[] | undefined {
  const items = page.migrationPlatformsSection?.items;

  if (!items || items.length === 0) {
    return undefined;
  }

  return items
    .filter((item) => item.name)
    .map((item) => ({
      name: item.name,
      text: item.text || "",
      logo: imageUrl(item.logo),
      logoAlt: item.logo?.alt,
      colorTheme: item.colorTheme,
    }));
}

function toIndustryItems(page: ServicePage): IndustrySectionItem[] | undefined {
  const items = page.industriesSection?.items;

  if (!items || items.length === 0) {
    return undefined;
  }

  return items.map((item) => ({
    title: item.title,
    description: item.description || "",
    image: imageUrl(item.image) || "/images/industries.webp",
    href: item.link,
  }));
}

function toWhyChooseReasons(page: ServicePage): WhyChooseReason[] | undefined {
  const reasons = page.whyChooseSection?.reasons;

  if (!reasons || reasons.length === 0) {
    return undefined;
  }

  const fallbackIcons = [
    "/images/different.webp",
    "/images/better.webp",
    "/images/salesforce-partner.webp",
  ];

  return reasons.map((reason, index) => ({
    title: reason.title,
    text: reason.text || "",
    color: reason.color || "#1D70C5",
    icon: imageUrl(reason.icon) || fallbackIcons[index % fallbackIcons.length],
  }));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
