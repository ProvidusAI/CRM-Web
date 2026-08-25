import { chromium } from "@playwright/test";
import { mkdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3002";
const OUT_DIR = path.join(process.cwd(), "public", "studio-thumbnails");
const MIN_BYTES = 1024;

type Source = { url: string; selector?: string };

// The fallback page renders 10 of the 13 sections with no Sanity content.
// `caseStudies`, `migrationPlatforms`, and `process` need explicit sources
// because they render null (or empty) on the consulting-services fallback.
const DEFAULT_URL = "/services/salesforce-consulting-services";

const SOURCES: Record<string, Source> = {
  partners: { url: DEFAULT_URL },
  certified: { url: DEFAULT_URL },
  caseStudies: {
    url: "/platform-expertise/salesforce-sales-cloud-consulting",
    selector: 'section:has(a[href^="/case-studies/"])',
  },
  tabs: { url: DEFAULT_URL },
  consultantCta: { url: DEFAULT_URL },
  benefits: { url: DEFAULT_URL },
  process: { url: "/services/salesforce-migration-services" },
  migrationPlatforms: { url: "/services/salesforce-migration-services" },
  expertise: { url: DEFAULT_URL },
  industries: { url: DEFAULT_URL },
  whyChoose: { url: DEFAULT_URL },
  faqs: { url: DEFAULT_URL },
  cta: { url: DEFAULT_URL },
};

const captured: string[] = [];
const missed: string[] = [];

// Playwright's screenshot API only emits png|jpeg, never webp. Capture the
// element as PNG, then re-encode to WebP inside the browser via canvas — no
// external tool or new dependency required.
async function encodeWebp(page: import("@playwright/test").Page, locator: import("@playwright/test").Locator, filePath: string) {
  const png = await locator.screenshot({ type: "png" });
  const webpBase64 = await page.evaluate(async (pngBase64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${pngBase64}`;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d context unavailable");
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.75),
    );
    if (!blob) throw new Error("canvas.toBlob webp failed");
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }, png.toString("base64"));
  await writeFile(filePath, Buffer.from(webpBase64, "base64"));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    for (const [key, source] of Object.entries(SOURCES)) {
      const selector = source.selector ?? `[data-section-key="${key}"]`;
      const filePath = path.join(OUT_DIR, `${key}.webp`);
      try {
        await page.goto(`${BASE_URL}${source.url}`, { waitUntil: "load" });
        const locator = page.locator(selector).first();
        await locator.waitFor({ state: "visible", timeout: 15000 });
        await locator.scrollIntoViewIfNeeded();
        // Let lazy images and in-view (Reveal) animations settle.
        await page.waitForTimeout(600);

        await encodeWebp(page, locator, filePath);
        const { size } = await stat(filePath);
        if (size < MIN_BYTES) {
          missed.push(`${key} (${size} bytes < ${MIN_BYTES})`);
          await unlink(filePath).catch(() => {});
        } else {
          captured.push(key);
        }
      } catch (error) {
        missed.push(`${key}: ${error instanceof Error ? error.message : String(error)}`);
        await unlink(filePath).catch(() => {});
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`Captured ${captured.length}/${Object.keys(SOURCES).length}: ${captured.join(", ")}`);
  if (missed.length > 0) {
    console.error(`Missed ${missed.length}: ${missed.join("; ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
