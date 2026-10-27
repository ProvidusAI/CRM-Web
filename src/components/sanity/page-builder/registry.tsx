import { contactSectionAdapter } from "./adapters/ContactSection";
import { ctaSectionAdapter } from "./adapters/CtaSection";
import { expertiseCtaSectionAdapter } from "./adapters/ExpertiseCtaSection";
import { heroSectionAdapter } from "./adapters/HeroSection";
import { industryCtaSectionAdapter } from "./adapters/IndustryCtaSection";
import { partnersSectionAdapter } from "./adapters/PartnersSection";
import { salesforceConsultCtaSectionAdapter } from "./adapters/SalesforceConsultCtaSection";
import { salesforceServiceHeroAdapter } from "./adapters/SalesforceServiceHero";
import { expertiseSalesforceSectionAdapter } from "./adapters/ExpertiseSalesforceSection";
import { expertisePlatformsSectionAdapter } from "./adapters/ExpertisePlatformsSection";
import { expertiseDescriptionSectionAdapter } from "./adapters/ExpertiseDescriptionSection";
import { expertiseCertifiedSectionAdapter } from "./adapters/ExpertiseCertifiedSection";
import { expertiseImplementationSectionAdapter } from "./adapters/ExpertiseImplementationSection";
import { expertiseChallengesSectionAdapter } from "./adapters/ExpertiseChallengesSection";
import { expertiseFeaturesSectionAdapter } from "./adapters/ExpertiseFeaturesSection";
import { expertiseStackSectionAdapter } from "./adapters/ExpertiseStackSection";
import { expertiseSectionAdapter } from "./adapters/ExpertiseSection";
import { identityResolutionSectionAdapter } from "./adapters/IdentityResolutionSection";
import { pageBlogsSectionAdapter } from "./adapters/PageBlogsSection";
import { serviceCaseStudiesSectionAdapter } from "./adapters/ServiceCaseStudiesSection";
import { whyChooseSectionAdapter } from "./adapters/WhyChooseSection";
import { faqSectionAdapter } from "./adapters/FaqSection";
import { whatWeDoSectionAdapter } from "./adapters/WhatWeDoSection";
import { certifiedSectionAdapter } from "./adapters/CertifiedSection";
import { platformsSectionAdapter } from "./adapters/PlatformsSection";
import { industriesSectionAdapter } from "./adapters/IndustriesSection";
import { believeSectionAdapter } from "./adapters/BelieveSection";
import { teamThoughtsSectionAdapter } from "./adapters/TeamThoughtsSection";
import { teamGallerySectionAdapter } from "./adapters/TeamGallerySection";
import { exploreSectionAdapter } from "./adapters/ExploreSection";
import { eventsSectionAdapter } from "./adapters/EventsSection";
import { categoriesSectionAdapter } from "./adapters/CategoriesSection";
import { splitComparisonSectionAdapter } from "./adapters/SplitComparisonSection";
import { serviceBenefitsSectionAdapter } from "./adapters/ServiceBenefitsSection";
import { organisationTypesSectionAdapter } from "./adapters/OrganisationTypesSection";
import { outcomeCardsSectionAdapter } from "./adapters/OutcomeCardsSection";
import { explainerCardsSectionAdapter } from "./adapters/ExplainerCardsSection";
import { trueCostSectionAdapter } from "./adapters/TrueCostSection";
import { solutionTypesSectionAdapter } from "./adapters/SolutionTypesSection";
import { industryDetailSectionAdapter } from "./adapters/IndustryDetailSection";
import { comparisonSectionAdapter } from "./adapters/ComparisonSection";
import type { SectionAdapter } from "./types";

// _type → adapter. Section tasks add one entry each.
export const SECTION_ADAPTERS: Record<string, SectionAdapter<never>> = {
  heroSection: heroSectionAdapter,
  salesforceServiceHero: salesforceServiceHeroAdapter,
  ctaSection: ctaSectionAdapter,
  expertiseCtaSection: expertiseCtaSectionAdapter,
  industryCtaSection: industryCtaSectionAdapter,
  salesforceConsultCtaSection: salesforceConsultCtaSectionAdapter,
  contactSection: contactSectionAdapter,
  partnersSection: partnersSectionAdapter,
  expertiseSalesforceSection: expertiseSalesforceSectionAdapter,
  expertisePlatformsSection: expertisePlatformsSectionAdapter,
  expertiseDescriptionSection: expertiseDescriptionSectionAdapter,
  expertiseCertifiedSection: expertiseCertifiedSectionAdapter,
  expertiseImplementationSection: expertiseImplementationSectionAdapter,
  expertiseChallengesSection: expertiseChallengesSectionAdapter,
  expertiseFeaturesSection: expertiseFeaturesSectionAdapter,
  expertiseStackSection: expertiseStackSectionAdapter,
  expertiseSection: expertiseSectionAdapter,
  identityResolutionSection: identityResolutionSectionAdapter,
  pageBlogsSection: pageBlogsSectionAdapter,
  serviceCaseStudiesSection: serviceCaseStudiesSectionAdapter,
  whyChooseSection: whyChooseSectionAdapter,
  faqSection: faqSectionAdapter,
  whatWeDoSection: whatWeDoSectionAdapter,
  certifiedSection: certifiedSectionAdapter,
  platformsSection: platformsSectionAdapter,
  industriesSection: industriesSectionAdapter,
  believeSection: believeSectionAdapter,
  teamThoughtsSection: teamThoughtsSectionAdapter,
  teamGallerySection: teamGallerySectionAdapter,
  exploreSection: exploreSectionAdapter,
  eventsSection: eventsSectionAdapter,
  categoriesSection: categoriesSectionAdapter,
  splitComparisonSection: splitComparisonSectionAdapter,
  serviceBenefitsSection: serviceBenefitsSectionAdapter,
  organisationTypesSection: organisationTypesSectionAdapter,
  outcomeCardsSection: outcomeCardsSectionAdapter,
  explainerCardsSection: explainerCardsSectionAdapter,
  trueCostSection: trueCostSectionAdapter,
  solutionTypesSection: solutionTypesSectionAdapter,
  industryDetailSection: industryDetailSectionAdapter,
  comparisonSection: comparisonSectionAdapter,
};
