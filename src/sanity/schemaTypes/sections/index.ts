import type { defineSection } from "./defineSection";
import { contactSection } from "./contactSection";
import { ctaSection } from "./ctaSection";
import { expertiseCtaSection } from "./expertiseCtaSection";
import { heroSection } from "./heroSection";
import { industryCtaSection } from "./industryCtaSection";
import { partnersSection } from "./partnersSection";
import { salesforceConsultCtaSection } from "./salesforceConsultCtaSection";
import { salesforceServiceHero } from "./salesforceServiceHero";

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
];

export const pageSectionMembers = sectionTypes.map((t) => ({ type: t.name }));
