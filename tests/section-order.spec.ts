import { test, expect } from "@playwright/test";

const EXPECTED_KEYS = [
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
  "cta",
];

test("service page wraps every section in a data-section-key marker", async ({
  page,
}) => {
  await page.goto("/services/salesforce-consulting-services");

  const keys = await page
    .locator("[data-section-key]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("data-section-key")));

  expect(keys).toHaveLength(18);
  expect([...new Set(keys)].sort()).toEqual([...EXPECTED_KEYS].sort());
});
