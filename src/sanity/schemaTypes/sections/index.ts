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
];

export const pageSectionMembers = sectionTypes.map((t) => ({ type: t.name }));
