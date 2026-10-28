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
import type { IndustriesSectionData } from "./adapters/IndustriesSection";
import type { BelieveSectionData } from "./adapters/BelieveSection";
import type { TeamThoughtsSectionData } from "./adapters/TeamThoughtsSection";
import type { TeamGallerySectionData } from "./adapters/TeamGallerySection";
import type { ExploreSectionData } from "./adapters/ExploreSection";
import type { EventsSectionData } from "./adapters/EventsSection";
import type { CategoriesSectionData } from "./adapters/CategoriesSection";
import type { SplitComparisonSectionData } from "./adapters/SplitComparisonSection";
import type { ServiceBenefitsSectionData } from "./adapters/ServiceBenefitsSection";
import type { OrganisationTypesSectionData } from "./adapters/OrganisationTypesSection";
import type { OutcomeCardsSectionData } from "./adapters/OutcomeCardsSection";
import type { ExplainerCardsSectionData } from "./adapters/ExplainerCardsSection";
import type { TrueCostSectionData } from "./adapters/TrueCostSection";
import type { SolutionTypesSectionData } from "./adapters/SolutionTypesSection";
import type { IndustryDetailSectionData } from "./adapters/IndustryDetailSection";
import type { ComparisonSectionData } from "./adapters/ComparisonSection";
import type { RichTextSectionData } from "./adapters/RichTextSection";
import type { RecruitmentIntroSectionData } from "./adapters/RecruitmentIntroSection";
import type { TalentPillsSectionData } from "./adapters/TalentPillsSection";
import type { HiringModelsSectionData } from "./adapters/HiringModelsSection";
import type { ProcessStepsSectionData } from "./adapters/ProcessStepsSection";
import type { WhyBandSectionData } from "./adapters/WhyBandSection";
import type { FeaturedRolesSectionData } from "./adapters/FeaturedRolesSection";

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
  | PlatformsSectionData
  | IndustriesSectionData
  | BelieveSectionData
  | TeamThoughtsSectionData
  | TeamGallerySectionData
  | ExploreSectionData
  | EventsSectionData
  | CategoriesSectionData
  | SplitComparisonSectionData
  | ServiceBenefitsSectionData
  | OrganisationTypesSectionData
  | OutcomeCardsSectionData
  | ExplainerCardsSectionData
  | TrueCostSectionData
  | SolutionTypesSectionData
  | IndustryDetailSectionData
  | ComparisonSectionData
  | RichTextSectionData
  | RecruitmentIntroSectionData
  | TalentPillsSectionData
  | HiringModelsSectionData
  | ProcessStepsSectionData
  | WhyBandSectionData
  | FeaturedRolesSectionData;
