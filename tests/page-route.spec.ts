import { test, expect } from "@playwright/test";

test.describe("page catch-all route", () => {
  test("an unknown top-level path renders the site 404 inside the layout", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist-xyz");
    expect(res?.status()).toBe(404);
    await expect(page.locator("footer")).toBeVisible();
  });

  test("/home is not a page", async ({ page }) => {
    const res = await page.goto("/home");
    expect(res?.status()).toBe(404);
  });

  test("an unknown nested path 404s", async ({ page }) => {
    const res = await page.goto("/industries/does-not-exist-xyz");
    expect(res?.status()).toBe(404);
  });
});
