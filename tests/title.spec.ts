import { test, expect } from "@playwright/test";

// The root layout applies a "%s | ProvidusCRM" template. buildPageMetadata marks
// already-branded titles absolute so the template does not double up. CMS values
// spell it "Providus CRM" with a space, which an exact-match check missed.
const PATHS = [
  "/",
  "/about",
  "/services",
  "/platform-expertise",
  "/platform-expertise/salesforce-sales-cloud-consulting",
  "/platform-expertise/salesforce-service-cloud-consulting",
  "/platform-expertise/salesforce-marketing-cloud-consulting",
  "/platform-expertise/salesforce-experience-cloud-consulting",
  "/platform-expertise/salesforce-data-cloud-consulting",
  "/industries",
  "/industries/salesforce-health-cloud-consulting",
  "/industries/salesforce-nonprofit-consulting",
  "/blog",
  "/case-studies",
  "/contact",
];

test.describe("Page titles", () => {
  for (const path of PATHS) {
    test(`${path} names the brand exactly once`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      const brandMentions = title.match(/providus\s*crm/gi) ?? [];
      expect(brandMentions.length, `title was: ${title}`).toBe(1);
    });
  }
});

// The platform-expertise detail pages promote the hero kicker to <h1> via
// HeroSection's subtitleAsH1 prop; the display title drops to <h2>.
const PLATFORM_PAGES = [
  [
    "/platform-expertise/salesforce-sales-cloud-consulting",
    "Salesforce Sales Cloud Consulting & Implementation",
  ],
  [
    "/platform-expertise/salesforce-service-cloud-consulting",
    "Salesforce Service Cloud Consulting & Implementation",
  ],
  [
    "/platform-expertise/salesforce-marketing-cloud-consulting",
    "Certified Salesforce Marketing Cloud Consultants",
  ],
  [
    "/platform-expertise/salesforce-experience-cloud-consulting",
    "Salesforce Experience Cloud Consulting & Implementation Partner",
  ],
  [
    "/platform-expertise/salesforce-data-cloud-consulting",
    "Salesforce Data Cloud Consulting & Implementation Partner",
  ],
] as const;

test.describe("Heading hierarchy", () => {
  for (const path of PATHS) {
    test(`${path} has exactly one h1`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  // The kicker is the SEO-critical h1, so assert the exact copy: if it changes,
  // that should be a deliberate edit here rather than a silent drift.
  for (const [path, kicker] of PLATFORM_PAGES) {
    test(`${path} uses the kicker as h1`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(kicker);
    });
  }
});
