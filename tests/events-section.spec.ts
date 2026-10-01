import { test, expect } from "@playwright/test";

const HEADING = "Events & Industry Conferences We Attend";

test.describe("Events section", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("sits before Platforms We Work With and has four event slides", async ({ page }) => {
    const region = page.getByRole("region", { name: "Events" });
    await expect(region.locator('[aria-roledescription="slide"]')).toHaveCount(4);

    const order = await page.evaluate((heading) => {
      const titles = [...document.querySelectorAll("h2")].map((h) => h.textContent?.trim());
      return [titles.indexOf(heading), titles.indexOf("Platforms We Work With")];
    }, HEADING);
    expect(order[0]).toBeGreaterThan(-1);
    expect(order[0]).toBeLessThan(order[1]);
  });

  test("arrows move between events and loop", async ({ page }) => {
    const status = page.getByTestId("events-status");
    await status.scrollIntoViewIfNeeded();
    await expect(status).toHaveText("TechCrunch Disrupt, event 1 of 4");

    await page.getByRole("button", { name: "Next event" }).click();
    await expect(status).toHaveText("Singapore FinTech Festival, event 2 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("TechCrunch Disrupt, event 1 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("AI Everything Middle East & Africa, Egypt, event 4 of 4");
  });
});
