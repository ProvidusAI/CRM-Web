import { test, expect, type Page } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the ProvidusCRM logo", async ({ page }) => {
    // Header renders desktop + mobile logo variants; assert the first.
    const logo = page.getByRole("img", { name: "ProvidusCRM" }).first();
    await expect(logo).toBeVisible();
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

    const toggle = page.getByLabel("Navigation menu", { exact: true });
    const menu = page.getByRole("navigation", { name: "Main navigation" });
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Our Work", exact: true })).toHaveAttribute(
      "href",
      "/case-studies"
    );

    // Services is a collapsed accordion holding three labelled groups.
    const child = menu.getByRole("link", { name: "Salesforce Sales Cloud Consulting" });
    await expect(child).not.toBeVisible();
    await menu.getByText("Services", { exact: true }).click();
    await expect(child).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Platform Expertise", exact: true })
    ).toHaveAttribute("href", "/platform-expertise");

    // Sections share a <details> name, so opening Company closes Services.
    await menu.getByText("Company", { exact: true }).click();
    await expect(child).not.toBeVisible();
    await expect(menu.getByRole("link", { name: "About Us", exact: true })).toHaveAttribute(
      "href",
      "/about"
    );

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

test.describe("Desktop mega menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
  });

  const panel = (page: Page) => page.locator('[data-slot="nav-panel"]');

  // Move like a real pointer. Base UI's hover safe-polygon disables sibling
  // triggers while one is hover-open, so Playwright's teleporting .hover()
  // fails its hit-test; a stepped move leaves the polygon first, as a user does.
  async function hoverTrigger(page: Page, name: string) {
    const box = await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name, exact: true })
      .boundingBox();
    if (!box) throw new Error(`${name} trigger not rendered`);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  }

  test("top level has three panel triggers and two links", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const label of ["Services", "Partnership", "Company"]) {
      await expect(nav.getByRole("button", { name: label, exact: true })).toBeVisible();
    }
    await expect(nav.getByRole("link", { name: "Our Work", exact: true })).toHaveAttribute(
      "href",
      "/case-studies"
    );
    await expect(nav.getByRole("link", { name: "Hire Talent", exact: true })).toHaveAttribute(
      "href",
      "/salesforce-recruitment-agency"
    );
  });

  test("Services panel switches category on hover", async ({ page }) => {
    await hoverTrigger(page, "Services");
    const link = (name: string) => panel(page).getByRole("link", { name, exact: true });

    await expect(link("Salesforce Consulting Services")).toBeVisible();
    await expect(link("Salesforce Services")).toHaveAttribute("href", "/services");

    await link("Industries We Serve").hover();
    await expect(link("Salesforce Health Cloud Consulting")).toBeVisible();
    await expect(link("Salesforce Consulting Services")).toHaveCount(0);

    await link("Platform Expertise").hover();
    await expect(link("Salesforce Agentforce Consulting")).toHaveAttribute(
      "href",
      "/platform-expertise/salesforce-agentforce-consulting"
    );
  });

  test("Partnership and Company panels", async ({ page }) => {
    const link = (name: string) => panel(page).getByRole("link", { name, exact: true });

    await hoverTrigger(page, "Partnership");
    await expect(link("FinDock")).toHaveAttribute("href", "/partnership/findock");
    await expect(link("Fundraise Up")).toHaveAttribute("href", "/partnership/fundraise-up");
    await expect(link("Dotdigital")).toHaveAttribute("href", "/partnership/dotdigital");
    await expect(link("Partnership")).toHaveAttribute("href", "/partnership");

    await hoverTrigger(page, "Company");
    await expect(link("About Us")).toHaveAttribute("href", "/about");
    await expect(link("Blog")).toHaveAttribute("href", "/blog");
  });

  test("Escape closes the panel", async ({ page }) => {
    await page.getByRole("button", { name: "Services", exact: true }).click();
    await expect(panel(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
  });

  test("keyboard reaches a category's links", async ({ page }) => {
    await page.getByRole("button", { name: "Services", exact: true }).click();
    await panel(page).getByRole("link", { name: "Industries We Serve", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(
      panel(page).getByRole("link", { name: "Salesforce Health Cloud Consulting", exact: true })
    ).toBeFocused();
  });

  test("clicking a panel link navigates and closes the panel", async ({ page }) => {
    await hoverTrigger(page, "Company");
    await panel(page).getByRole("link", { name: "Blog", exact: true }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(panel(page)).toBeHidden();
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
    await expect(page.locator('header a[href="/case-studies"]').last()).toBeVisible();
  });
});
