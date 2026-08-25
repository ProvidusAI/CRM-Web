import { test, expect } from "@playwright/test";

// The section is editor-driven: it must stay completely absent on any page
// with no "Page blogs" document, rather than rendering an empty heading.
// The "renders nothing with no posts" / "renders something with posts" cases
// live in scripts/check-page-blogs.ts, which calls PageBlogsSection directly
// instead of depending on live CMS content.
test.describe("Per-page blog strip", () => {
  test("does not break the closing CTA", async ({ page }) => {
    await page.goto("/");
    // The home page renders <CtaSection /> with no title prop, so this is
    // CtaSection's built-in default heading.
    await expect(
      page.getByRole("heading", { name: /explore how we align your crm systems/i })
    ).toBeVisible();
  });
});
