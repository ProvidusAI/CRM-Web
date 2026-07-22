import { test, expect } from "@playwright/test";

test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the Salesforce Partner badge", async ({ page }) => {
    // The badge image is present twice (responsive variants); assert the first.
    const badge = page.getByRole("img", { name: "Salesforce Partner" }).first();
    await expect(badge).toBeVisible();
  });

  test("renders badge text — Certified Salesforce Partner in the UK", async ({
    page,
  }) => {
    const hero = page.locator("section").first();
    await expect(hero.getByText("Certified").first()).toBeVisible();
    await expect(hero.getByText("Salesforce Partner").first()).toBeVisible();
    await expect(hero.getByText("in the UK").first()).toBeVisible();
  });

  test("renders H1 heading with correct text", async ({ page }) => {
    // The hero H1 animates per-character, so its visible textContent is
    // doubled ("CustomCustom …"). The accessible name (via sr-only words,
    // with the animated glyphs aria-hidden) carries the real copy.
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAccessibleName(
      /Custom Salesforce Solutions For Your CRM Innovation Goals/
    );
  });

  test("H1 heading has large font size (≥ 50px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const heading = page.getByRole("heading", { level: 1 });
    const fontSize = await heading.evaluate(
      (el) => parseFloat(getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(50);
  });

  test("renders subtext paragraph", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(
      hero.getByText(/Future-proof customer operations/i)
    ).toBeVisible();
  });

  test("renders Book a Call CTA button", async ({ page }) => {
    const cta = page.getByRole("button", { name: /book a call/i });
    await expect(cta).toBeVisible();
  });

  test("renders hero image", async ({ page }) => {
    const heroImg = page.getByRole("img", { name: "Business meeting" });
    await expect(heroImg).toBeVisible();
  });

  test("hero section has blue gradient background", async ({ page }) => {
    const hero = page.locator("section").first();
    const bg = await hero.evaluate(
      (el) => getComputedStyle(el).backgroundImage
    );
    // Background is either a gradient or a background-image
    expect(bg.length).toBeGreaterThan(0);
  });

  test("hero section is fully visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const hero = page.locator("section").first();
    await expect(hero).toBeInViewport();
  });
});
