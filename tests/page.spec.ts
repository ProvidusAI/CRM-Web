import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("loads successfully with 200 status", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("has correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ProvidusCRM/i);
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("renders navbar and hero section in correct order", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    const hero = page.locator("section").first();

    const headerBox = await header.boundingBox();
    const heroBox = await hero.boundingBox();

    expect(headerBox).not.toBeNull();
    expect(heroBox).not.toBeNull();
    // Hero must appear below the header
    expect(heroBox!.y).toBeGreaterThan(headerBox!.y);
  });

  test("page is responsive on mobile (375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("section").first()).toBeVisible();
  });

  test("page is responsive on tablet (768px)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("section").first()).toBeVisible();
  });

  test("no image renders with a broken src", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // A lazy image that is still below the fold legitimately reports
    // naturalWidth 0 because it has not been fetched yet. Only assert images
    // that the browser has actually attempted to load — anything eager or
    // scrolled into view must decode successfully.
    const broken = await page.locator("img").evaluateAll((imgs) =>
      (imgs as HTMLImageElement[])
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          const inViewport =
            rect.top < window.innerHeight && rect.bottom > 0;
          const isLazy = el.getAttribute("loading") === "lazy";
          const attempted = !isLazy || inViewport;
          return attempted && el.complete && el.naturalWidth === 0;
        })
        .map((el) => el.currentSrc || el.src)
    );
    expect(broken, `broken images: ${broken.join(", ")}`).toHaveLength(0);
  });

  test("no image has an empty src", async ({ page }) => {
    await page.goto("/");
    const empty = await page.locator("img").evaluateAll((imgs) =>
      (imgs as HTMLImageElement[])
        .filter((el) => !el.getAttribute("src")?.trim())
        .map((el) => el.outerHTML.slice(0, 80))
    );
    expect(empty, `images with empty src: ${empty.join(", ")}`).toHaveLength(0);
  });

  test("CtaButton arrow icon is visible in hero", async ({ page }) => {
    await page.goto("/");
    const ctaButton = page.getByRole("button", { name: /book a call/i });
    await expect(ctaButton).toBeVisible();
    // Arrow SVG inside the button
    const svg = ctaButton.locator("svg");
    await expect(svg.first()).toBeVisible();
  });
});
