import type { defineSection } from "./defineSection";
import { contactSection } from "./contactSection";
import { ctaSection } from "./ctaSection";
import { expertiseCtaSection } from "./expertiseCtaSection";
import { heroSection } from "./heroSection";
import { industryCtaSection } from "./industryCtaSection";
import { partnersSection } from "./partnersSection";
import { salesforceConsultCtaSection } from "./salesforceConsultCtaSection";
import { salesforceServiceHero } from "./salesforceServiceHero";
import { expertiseSalesforceSection } from "./expertiseSalesforceSection";
import { expertisePlatformsSection } from "./expertisePlatformsSection";
import { expertiseDescriptionSection } from "./expertiseDescriptionSection";
import { expertiseCertifiedSection } from "./expertiseCertifiedSection";
import { expertiseImplementationSection } from "./expertiseImplementationSection";
import { expertiseChallengesSection } from "./expertiseChallengesSection";
import { expertiseFeaturesSection } from "./expertiseFeaturesSection";
import { expertiseStackSection } from "./expertiseStackSection";
import { expertiseSection } from "./expertiseSection";
import { identityResolutionSection } from "./identityResolutionSection";
import { pageBlogsSection } from "./pageBlogsSection";
import { serviceCaseStudiesSection } from "./serviceCaseStudiesSection";
import { whyChooseSection } from "./whyChooseSection";
import { faqSection } from "./faqSection";
import { whatWeDoSection } from "./whatWeDoSection";
import { certifiedSection } from "./certifiedSection";
import { platformsSection } from "./platformsSection";
import { industriesSection } from "./industriesSection";
import { believeSection } from "./believeSection";
import { teamThoughtsSection } from "./teamThoughtsSection";
import { teamGallerySection } from "./teamGallerySection";
import { exploreSection } from "./exploreSection";
import { eventsSection } from "./eventsSection";
import { categoriesSection } from "./categoriesSection";
import { splitComparisonSection } from "./splitComparisonSection";
import { serviceBenefitsSection } from "./serviceBenefitsSection";
import { organisationTypesSection } from "./organisationTypesSection";
import { outcomeCardsSection } from "./outcomeCardsSection";
import { explainerCardsSection } from "./explainerCardsSection";
import { trueCostSection } from "./trueCostSection";
import { solutionTypesSection } from "./solutionTypesSection";
import { industryDetailSection } from "./industryDetailSection";
import { comparisonSection } from "./comparisonSection";
import { richTextSection } from "./richTextSection";
import { recruitmentIntroSection } from "./recruitmentIntroSection";
import { talentPillsSection } from "./talentPillsSection";
import { hiringModelsSection } from "./hiringModelsSection";
import { processStepsSection } from "./processStepsSection";
import { whyBandSection } from "./whyBandSection";
import { featuredRolesSection } from "./featuredRolesSection";

// Every page-builder section type. Section tasks append to this list.
export const sectionTypes: ReturnType<typeof defineSection>[] = [
  heroSection,
  salesforceServiceHero,
  ctaSection,
  expertiseCtaSection,
  industryCtaSection,
  salesforceConsultCtaSection,
  contactSection,
  partnersSection,
  expertiseSalesforceSection,
  expertisePlatformsSection,
  expertiseDescriptionSection,
  expertiseCertifiedSection,
  expertiseImplementationSection,
  expertiseChallengesSection,
  expertiseFeaturesSection,
  expertiseStackSection,
  expertiseSection,
  identityResolutionSection,
  pageBlogsSection,
  serviceCaseStudiesSection,
  whyChooseSection,
  faqSection,
  whatWeDoSection,
  certifiedSection,
  platformsSection,
  industriesSection,
  believeSection,
  teamThoughtsSection,
  teamGallerySection,
  exploreSection,
  eventsSection,
  categoriesSection,
  splitComparisonSection,
  serviceBenefitsSection,
  organisationTypesSection,
  outcomeCardsSection,
  explainerCardsSection,
  trueCostSection,
  solutionTypesSection,
  industryDetailSection,
  comparisonSection,
  richTextSection,
  recruitmentIntroSection,
  talentPillsSection,
  hiringModelsSection,
  processStepsSection,
  whyBandSection,
  featuredRolesSection,
];

export const pageSectionMembers = sectionTypes.map((t) => ({ type: t.name }));
