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
