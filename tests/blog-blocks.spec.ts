import { test, expect, type Page } from "@playwright/test";

// Both blocks are editor-driven, so the test looks for a post that has them
// and skips (rather than fails) when the dataset has none yet. Direct-render
// cases live in scripts/check-blog-blocks.ts.
async function findPostWith(page: Page, testId: string): Promise<string | null> {
  await page.goto("/blog");
  const hrefs = await page
    .locator('main a[href^="/blog/"]')
    .evaluateAll((links) =>
      Array.from(new Set(links.map((a) => a.getAttribute("href") ?? "")))
        .filter((href) => href.split("/").length === 3)
        .slice(0, 8)
    );

  for (const href of hrefs) {
    await page.goto(href);
    if ((await page.getByTestId(testId).count()) > 0) return href;
  }
  return null;
}

test.describe("Blog summary card and CTA banner", () => {
  test("summary card sits inside the article above the body", async ({ page }) => {
    const href = await findPostWith(page, "blog-summary-card");
    test.skip(href === null, "no post has a summary card yet");

    const card = page.locator("article").getByTestId("blog-summary-card");
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /let's connect/i })).toHaveAttribute("href", "/contact");

    // The card must be the article's first child.
    const isFirst = await card.evaluate((el) => el.parentElement?.firstElementChild === el);
    expect(isFirst).toBe(true);
  });

  test("CTA banner renders inside the article body", async ({ page }) => {
    const href = await findPostWith(page, "blog-cta-banner");
    test.skip(href === null, "no post has a CTA banner yet");

    const banner = page.locator("article").getByTestId("blog-cta-banner").first();
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("heading")).not.toBeEmpty();
    await expect(banner.getByRole("img")).toBeVisible();
    await expect(banner.getByRole("link", { name: /let's connect/i })).toHaveAttribute("href", "/contact");
  });
});
