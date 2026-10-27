import type { ReactNode } from "react";
import type { ContactSectionData } from "./adapters/ContactSection";
import type { CtaSectionData } from "./adapters/CtaSection";
import type { ExpertiseCtaSectionData } from "./adapters/ExpertiseCtaSection";
import type { HeroSectionData } from "./adapters/HeroSection";
import type { IndustryCtaSectionData } from "./adapters/IndustryCtaSection";
import type { PartnersSectionData } from "./adapters/PartnersSection";
import type { SalesforceConsultCtaSectionData } from "./adapters/SalesforceConsultCtaSection";
import type { ExpertiseSalesforceSectionData } from "./adapters/ExpertiseSalesforceSection";
import type { ExpertisePlatformsSectionData } from "./adapters/ExpertisePlatformsSection";
import type { ExpertiseDescriptionSectionData } from "./adapters/ExpertiseDescriptionSection";
import type { ExpertiseCertifiedSectionData } from "./adapters/ExpertiseCertifiedSection";
import type { ExpertiseImplementationSectionData } from "./adapters/ExpertiseImplementationSection";
import type { ExpertiseChallengesSectionData } from "./adapters/ExpertiseChallengesSection";
import type { ExpertiseFeaturesSectionData } from "./adapters/ExpertiseFeaturesSection";
import type { ExpertiseStackSectionData } from "./adapters/ExpertiseStackSection";
import type { ExpertiseSectionData } from "./adapters/ExpertiseSection";
import type { IdentityResolutionSectionData } from "./adapters/IdentityResolutionSection";
import type { SalesforceServiceHeroData } from "./adapters/SalesforceServiceHero";
import type { PageBlogsSectionData } from "./adapters/PageBlogsSection";
import type { ServiceCaseStudiesSectionData } from "./adapters/ServiceCaseStudiesSection";
import type { WhyChooseSectionData } from "./adapters/WhyChooseSection";
import type { FaqSectionData } from "./adapters/FaqSection";
import type { WhatWeDoSectionData } from "./adapters/WhatWeDoSection";
import type { CertifiedSectionData } from "./adapters/CertifiedSection";
import type { PlatformsSectionData } from "./adapters/PlatformsSection";

export interface SectionSpacing {
  top?: number;
  bottom?: number;
}

export interface SectionBase {
  _key: string;
  _type: string;
  spacing?: SectionSpacing;
  anchorId?: string;
}

export type SectionAdapter<T> = (section: T) => ReactNode;

/**
 * Union of every section's data type. Section tasks add a member here, e.g.
 * `| CtaSectionData`, when they register an adapter.
 */
export type PageSectionData =
  | HeroSectionData
  | SalesforceServiceHeroData
  | CtaSectionData
  | ExpertiseCtaSectionData
  | IndustryCtaSectionData
  | SalesforceConsultCtaSectionData
  | ContactSectionData
  | PartnersSectionData
  | ExpertiseSalesforceSectionData
  | ExpertisePlatformsSectionData
  | ExpertiseDescriptionSectionData
  | ExpertiseCertifiedSectionData
  | ExpertiseImplementationSectionData
  | ExpertiseChallengesSectionData
  | ExpertiseFeaturesSectionData
  | ExpertiseStackSectionData
  | ExpertiseSectionData
  | IdentityResolutionSectionData
  | PageBlogsSectionData
  | ServiceCaseStudiesSectionData
  | WhyChooseSectionData
  | FaqSectionData
  | WhatWeDoSectionData
  | CertifiedSectionData
  | PlatformsSectionData;
