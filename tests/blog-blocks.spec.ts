import { test, expect, type Page } from "@playwright/test";

// Both blocks are editor-driven, so the test looks for a post that has them
// and skips (rather than fails) when the dataset has none yet. Direct-render
// cases live in scripts/check-blog-blocks.ts.
//
// This crawls via page.request (plain HTTP fetches of the server-rendered
// HTML) rather than page.goto for each candidate post: against the dev
// server a single post page can take longer than the test timeout to reach
// "load" (route compile + Sanity fetch + third-party scripts), so a
// browser-driven crawl over several posts can exceed the timeout and fail
// the test instead of skipping it. Both blocks are server-rendered, so the
// marker is present in the HTML without a browser; only the matching post
// (if any) is then loaded with page.goto for the real assertions.
async function findPostWith(page: Page, testId: string): Promise<string | null> {
  const index = await page.request.get("/blog");
  const hrefs = Array.from(
    new Set((await index.text()).match(/href="(\/blog\/[^"/]+)"/g) ?? [])
  ).map((m) => m.slice(6, -1));

  for (const href of hrefs.slice(0, 12)) {
    const html = await (await page.request.get(href)).text();
    if (html.includes(`data-testid="${testId}"`)) return href;
  }
  return null;
}

test.describe("Blog summary card and CTA banner", () => {
  test.setTimeout(120_000);

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
