import { test, expect } from "@playwright/test";

test("footer rating is announced without a prohibited aria-label", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByText("Rated 4.9 out of 5", { exact: true })).toBeAttached();
  await expect(footer.locator("p[aria-label]")).toHaveCount(0);
});
