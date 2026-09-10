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

  test("mobile menu opens, collapses child pages, and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // The desktop nav is hidden on mobile.
    const desktopNav = page.locator("header").getByRole("navigation").first();
    await expect(desktopNav).not.toBeVisible();

    const toggle = page.getByLabel("Navigation menu", { exact: true });
    const menu = page.getByRole("navigation", { name: "Main navigation" });
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "About", exact: true })).toBeVisible();

    // Sections with child pages are collapsed accordions.
    const child = menu.getByRole("link", { name: "Salesforce Sales Cloud Consulting" });
    await expect(child).not.toBeVisible();
    await menu.getByText("Platform Expertise", { exact: true }).click();
    await expect(child).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Platform Expertise overview" })
    ).toHaveAttribute("href", "/platform-expertise");

    await toggle.click();
    await expect(menu).not.toBeVisible();
  });

  // Inline in the sticky header the menu was pinned with it, so on a short
  // screen its lower items could never be scrolled into view.
  test("mobile menu scrolls to its last item on a short screen", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 480 });
    await page.goto("/");
    await page.locator("header").getByLabel(/navigation menu/i).click();

    const cta = page.locator('header a[href="/contact"]').last();
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
  });
});

// The mobile menu is position: fixed, so it sizes to the layout viewport, which
// phones widen to the page's scroll width. Anything that makes a page wider
// than the screen — a fixed-width card, a slide-in animation's starting offset
// — stretches the menu past the screen edge.
test.describe("Mobile page width", () => {
  const paths = [
    "/",
    "/about",
    "/industries/salesforce-education-cloud-consulting",
    "/partnership/findock",
  ];

  for (const path of paths) {
    test(`${path} is no wider than a 375px screen`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }
});

test.describe("Navbar without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  // The server-rendered burger shows seconds before the JS bundles run (or
  // indefinitely if one stalls), so it must open natively, not on hydration.
  test("mobile menu opens before hydration", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.locator("header").getByLabel(/navigation menu/i).click();
    await expect(page.locator('header a[href="/about"]').last()).toBeVisible();
  });
});
