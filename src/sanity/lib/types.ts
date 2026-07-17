import type { PortableTextBlock } from "next-sanity";

export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
}

export interface SanityImage {
  alt?: string;
  asset?: SanityImageAsset;
}

export interface Category {
  title: string;
  slug: SanitySlug;
}

export interface Author {
  name: string;
  role?: string;
  linkedinUrl?: string;
  xUrl?: string;
  slug?: SanitySlug;
  image?: SanityImage;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: SanityImage;
}

export interface JsonLdField {
  enabled?: boolean;
  schemaJson?: string;
}

export interface SitePageJsonLd {
  title: string;
  pageKey: string;
  jsonLd?: JsonLdField;
}

export interface StaticPageSeo {
  title: string;
  pageKey: string;
  seo?: SeoFields;
  jsonLd?: JsonLdField;
}

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  heroImage?: SanityImage;
  categories?: Category[];
  author?: Author;
}

export interface BlogPost extends BlogPostListItem {
  body?: PortableTextBlock[];
  seo?: SeoFields;
  jsonLd?: JsonLdField;
}

export interface CaseStudyListItem {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  clientName?: string;
  industry?: string;
  coverImage?: SanityImage;
  technologies?: string[];
  resultSummary?: string;
}

export interface CaseStudy extends CaseStudyListItem {
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  body?: PortableTextBlock[];
  seo?: SeoFields;
  jsonLd?: JsonLdField;
}

export interface PageCaseStudies {
  pageKey: string;
  sectionTitle?: string;
  caseStudies?: CaseStudyListItem[];
}

export type ServicePageStatus = "published" | "draft";

export type ServicePageSectionKey =
  | "partners"
  | "certified"
  | "caseStudies"
  | "tabs"
  | "consultantCta"
  | "benefits"
  | "process"
  | "migrationPlatforms"
  | "expertise"
  | "industries"
  | "whyChoose"
  | "faqs"
  | "cta";

export type ServiceBenefitIconKey =
  | "roi"
  | "adoption"
  | "maturity"
  | "visibility"
  | "view360"
  | "partnership";

export type ServiceBenefitColorTheme =
  | "blue"
  | "green"
  | "yellow"
  | "peach"
  | "pink"
  | "purple";

export interface ServiceHeroContent {
  badgeTitle?: string;
  badgeSubtitle?: string;
  heading: string;
  description?: string;
  bullets?: string[];
  formTitle?: string;
  formButtonLabel?: string;
  backgroundImage?: SanityImage;
}

export interface ServiceCertifiedContent {
  title?: string;
  description?: string;
}

export interface ServiceTabLink {
  linkType?: "none" | "internal" | "external";
  internalLink?: {
    _type: string;
    slug: string;
  };
  externalUrl?: string;
}

export interface ServiceTabItem {
  label: string;
  heading: string;
  text?: string;
  bullets?: string[];
  link?: ServiceTabLink;
}

export interface ServiceTabsContent {
  title?: string;
  tabs?: ServiceTabItem[];
}

export interface ServiceBenefitItem {
  title: string;
  description?: string;
  iconKey?: ServiceBenefitIconKey;
  colorTheme?: ServiceBenefitColorTheme;
}

export interface ServiceBenefitsContent {
  title?: string;
  items?: ServiceBenefitItem[];
}

export interface ServiceConsultantCtaContent {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundColor?: string;
  image?: SanityImage;
}

export interface ServiceProcessStep {
  title: string;
  description?: string;
  iconKey?: string;
  colorTheme?: string;
}

export interface ServiceProcessContent {
  title?: string;
  steps?: ServiceProcessStep[];
}

export interface ServiceMigrationPlatformItem {
  name: string;
  logo?: SanityImage;
  text?: string;
  colorTheme?: "blue" | "green";
}

export interface ServiceMigrationPlatformsContent {
  title?: string;
  items?: ServiceMigrationPlatformItem[];
}

export interface ServiceExpertiseItem {
  title: string;
  text?: string;
  icon?: SanityImage;
  accentColor?: string;
}

export interface ServiceExpertiseContent {
  title?: string;
  items?: ServiceExpertiseItem[];
}

export interface ServiceIndustryItem {
  title: string;
  description?: string;
  image?: SanityImage;
}

export interface ServiceIndustriesContent {
  title?: string;
  items?: ServiceIndustryItem[];
}

export interface ServiceWhyChooseReason {
  title: string;
  text?: string;
  icon?: SanityImage;
  color?: string;
}

export interface ServiceWhyChooseContent {
  title?: string;
  reasons?: ServiceWhyChooseReason[];
  image?: SanityImage;
}

export interface ServiceCtaContent {
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backgroundImage?: SanityImage;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceFaqContent {
  title?: string;
  faqs?: ServiceFaqItem[];
}

export interface ServicePage {
  _id: string;
  title: string;
  slug: SanitySlug;
  status?: ServicePageStatus;
  seo?: SeoFields;
  jsonLd?: JsonLdField;
  sectionOrder?: ServicePageSectionKey[];
  hero?: ServiceHeroContent;
  certified?: ServiceCertifiedContent;
  caseStudies?: CaseStudyListItem[];
  tabsSection?: ServiceTabsContent;
  benefitsSection?: ServiceBenefitsContent;
  consultantCta?: ServiceConsultantCtaContent;
  processSection?: ServiceProcessContent;
  migrationPlatformsSection?: ServiceMigrationPlatformsContent;
  expertiseSection?: ServiceExpertiseContent;
  industriesSection?: ServiceIndustriesContent;
  whyChooseSection?: ServiceWhyChooseContent;
  faqSection?: ServiceFaqContent;
  cta?: ServiceCtaContent;
}
