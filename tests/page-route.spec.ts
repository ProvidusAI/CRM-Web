import { test, expect } from "@playwright/test";

test.describe("page catch-all route", () => {
  test("an unknown top-level path renders the site 404 inside the layout", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist-xyz");
    expect(res?.status()).toBe(404);
    await expect(page.locator("footer")).toBeVisible();
  });

  test("/ is served from the home page document", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      /Custom Salesforce Solutions For Your CRM Innovation Goals/
    );
    await expect(page.getByRole("img", { name: "Salesforce Partner" }).first()).toBeVisible();
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
