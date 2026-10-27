import { contactSectionAdapter } from "./adapters/ContactSection";
import { ctaSectionAdapter } from "./adapters/CtaSection";
import { expertiseCtaSectionAdapter } from "./adapters/ExpertiseCtaSection";
import { heroSectionAdapter } from "./adapters/HeroSection";
import { industryCtaSectionAdapter } from "./adapters/IndustryCtaSection";
import { partnersSectionAdapter } from "./adapters/PartnersSection";
import { salesforceConsultCtaSectionAdapter } from "./adapters/SalesforceConsultCtaSection";
import { salesforceServiceHeroAdapter } from "./adapters/SalesforceServiceHero";
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
};
