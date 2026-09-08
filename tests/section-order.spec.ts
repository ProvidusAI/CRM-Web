import { test, expect } from "@playwright/test";

const VALID_KEYS = [
  "partners",
  "certified",
  "caseStudies",
  "tabs",
  "consultantCta",
  "benefits",
  "process",
  "migrationPlatforms",
  "expertise",
  "industries",
  "whyChoose",
  "faqs",
  "blogs",
  "painPoints",
  "splitChecklist",
  "offerCarousel",
  "pricing",
  "description",
  "cta",
];

// The exact section set is CMS-driven — an editor's sectionOrder is
// authoritative, and local runs see draft documents through the read token —
// so this asserts the wrapper mechanism, not a fixed count: every rendered
// section carries a valid, unique data-section-key marker.
test("service page wraps every section in a data-section-key marker", async ({
  page,
}) => {
  await page.goto("/services/salesforce-consulting-services");

  const keys = await page
    .locator("[data-section-key]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("data-section-key")));

  expect(keys.length).toBeGreaterThan(0);
  expect(new Set(keys).size).toBe(keys.length);
  for (const key of keys) {
    expect(VALID_KEYS).toContain(key);
  }
});
