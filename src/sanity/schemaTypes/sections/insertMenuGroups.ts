// Groups for the page builder's "Add item" menu, by what an editor is trying to
// add rather than by component family. Every section type belongs to exactly one
// group; tests/page-builder/insert-menu.spec.ts fails if a new type is left out.
export const sectionInsertMenuGroups = [
  { name: "heroes", title: "Heroes", of: ["heroSection", "salesforceServiceHero"] },
  {
    name: "cta",
    title: "Calls to action & forms",
    of: ["ctaSection", "expertiseCtaSection", "industryCtaSection", "salesforceConsultCtaSection", "contactSection"],
  },
  {
    name: "trust",
    title: "Logos & trust",
    of: [
      "partnersSection",
      "platformsSection",
      "certifiedSection",
      "expertiseCertifiedSection",
      "expertiseSalesforceSection",
      "eventsSection",
    ],
  },
  {
    name: "services",
    title: "Services & platforms",
    of: [
      "whatWeDoSection",
      "categoriesSection",
      "expertiseSection",
      "expertiseStackSection",
      "expertisePlatformsSection",
      "expertiseImplementationSection",
      "expertiseFeaturesSection",
      "serviceBenefitsSection",
    ],
  },
  {
    name: "industries",
    title: "Industries",
    of: ["industriesSection", "industryDetailSection", "organisationTypesSection", "solutionTypesSection"],
  },
  {
    name: "problems",
    title: "Problems & comparisons",
    of: [
      "expertiseChallengesSection",
      "splitComparisonSection",
      "comparisonSection",
      "trueCostSection",
      "explainerCardsSection",
      "outcomeCardsSection",
      "identityResolutionSection",
    ],
  },
  {
    name: "about",
    title: "Why us & team",
    of: ["whyChooseSection", "whyBandSection", "believeSection", "teamThoughtsSection", "teamGallerySection", "exploreSection"],
  },
  {
    name: "hiring",
    title: "Hiring & recruitment",
    of: ["recruitmentIntroSection", "talentPillsSection", "hiringModelsSection", "processStepsSection", "featuredRolesSection"],
  },
  {
    name: "content",
    title: "Text & listings",
    of: ["expertiseDescriptionSection", "richTextSection", "faqSection", "serviceCaseStudiesSection", "pageBlogsSection"],
  },
];
