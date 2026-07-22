import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the ProvidusCRM logo", async ({ page }) => {
    // Header renders desktop + mobile logo variants; assert the first.
    const logo = page.getByRole("img", { name: "ProvidusCRM" }).first();
    await expect(logo).toBeVisible();
  });

  test("renders all navigation links", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // The primary nav lives in the header. Footer also has <nav> elements,
    // so scope to the header to avoid matching those.
    const nav = page.locator("header").getByRole("navigation").first();
    await expect(nav).toBeVisible();

    const links = [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Industry", href: "/industries" },
      { label: "Platform Expertise", href: "/platform-expertise" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ];

    for (const { label, href } of links) {
      const link = nav.getByRole("link", { name: label, exact: true }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
  });

  test("renders Let's Connect CTA button", async ({ page }) => {
    const cta = page.getByRole("button", { name: /let's connect/i });
    await expect(cta.first()).toBeVisible();
  });

  test("navbar is sticky (stays at top on scroll)", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    const header = page.locator("header");
    await expect(header).toBeVisible();
    const box = await header.boundingBox();
    expect(box?.y).toBe(0);
  });

  test("mobile menu toggle shows and hides nav links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // The desktop nav is hidden on mobile.
    const desktopNav = page.locator("header").getByRole("navigation").first();
    await expect(desktopNav).not.toBeVisible();

    // Open the menu.
    const toggle = page.getByRole("button", { name: /open navigation menu/i });
    await toggle.click();

    // The mobile dialog and its links are now visible.
    const dialog = page.getByRole("dialog", { name: "Main navigation" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "About", exact: true })
    ).toBeVisible();

    // Close the menu.
    await page
      .getByRole("button", { name: /close navigation menu/i })
      .click();
    await expect(dialog).not.toBeVisible();
  });
});
