import { test, expect } from "@playwright/test";

const HEADING = "Events & Industry Conferences We Attend";

test.describe("Events section", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("sits before Platforms We Work With and has four event slides", async ({ page }) => {
    const region = page.getByRole("region", { name: "Events", exact: true });
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
    // Silent until the visitor interacts, so autoplay never speaks.
    await expect(status).toHaveText("");
    await expect(page.getByText("01/04", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Next event" }).click();
    await expect(status).toHaveText("Singapore FinTech Festival, event 2 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("TechCrunch Disrupt, event 1 of 4");

    await page.getByRole("button", { name: "Previous event" }).click();
    await expect(status).toHaveText("AI Everything Middle East & Africa, Egypt, event 4 of 4");
  });

  test("autoplay advances every 8s and stops after the visitor takes over", async ({ page }) => {
    // The default clock isn't installed until after beforeEach's goto, so
    // reload with a fake one. The mouse starts at 0,0, outside the slider.
    await page.clock.install();
    await page.goto("/");
    const next = page.getByRole("button", { name: "Next event" });
    await expect(next).toBeEnabled();

    await page.clock.fastForward(8500);
    await expect(page.getByText("02/04", { exact: true })).toBeVisible();

    await next.click();
    await expect(page.getByText("03/04", { exact: true })).toBeVisible();

    await page.clock.fastForward(17000);
    await expect(page.getByText("03/04", { exact: true })).toBeVisible();
  });
});
