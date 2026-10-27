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
};
