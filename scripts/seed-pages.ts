/**
 * ONE-SHOT seed: writes Sanity `page` documents from the static route content.
 * Deleted with the static code (Task 13). Re-running it after editors change
 * pages would overwrite their work with the old static copy.
 *
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages
 *   pnpm seed:pages                       # final slugs
 */
import { createReadStream, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { prepareDocument, type LegacyValues } from "./seed-pages/lib";
import { SEED_PAGES } from "./seed-pages/index"; // explicit: "./seed-pages" would resolve to this file

// Same .env / .env.local loading as import-migration-page.ts (existing vars win).
for (const file of [".env", ".env.local"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const dryRun = process.argv.includes("--dry-run");
const prefix = process.env.SEED_SLUG_PREFIX ?? "";
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token && !dryRun) {
  console.error("SANITY_API_WRITE_TOKEN is not set (.env.local). Refusing to fall back to the read token.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  // Dry runs only read, so the read token is fine there; real runs use the write token.
  token: dryRun ? process.env.SANITY_API_READ_TOKEN : token,
  useCdn: false,
});

async function loadLegacy(): Promise<LegacyValues> {
  // Raw (unprojected) values so image fields stay asset references.
  const [seoDocs, jsonLdDocs] = await Promise.all([
    client.fetch<{ pageKey: string; seo?: Record<string, unknown>; jsonLd?: LegacyValues[string]["jsonLd"] }[]>(`*[_type == "staticPageSeo"]{ pageKey, seo, jsonLd }`),
    client.fetch<{ pageKey: string; jsonLd?: LegacyValues[string]["jsonLd"] }[]>(`*[_type == "sitePageJsonLd"]{ pageKey, jsonLd }`),
  ]);
  const legacy: LegacyValues = {};
  for (const d of jsonLdDocs) legacy[d.pageKey] = { ...legacy[d.pageKey], jsonLd: d.jsonLd };
  // staticPageSeo.jsonLd wins over sitePageJsonLd, matching getSitePageJsonLd.
  for (const d of seoDocs) legacy[d.pageKey] = { seo: d.seo, jsonLd: d.jsonLd?.schemaJson ? d.jsonLd : legacy[d.pageKey]?.jsonLd };
  return legacy;
}

async function upload(publicPath: string): Promise<string> {
  if (dryRun) return `image-dryrun${publicPath.length}-1x1-png`; // no network
  const file = path.join(process.cwd(), "public", publicPath);
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
  return asset._id;
}

async function main() {
  const legacy = await loadLegacy();
  const cache = new Map<string, Promise<string>>();
  const pages = SEED_PAGES.filter((p) => !only || p.slug === only);
  const docs = [];
  for (const page of pages) docs.push(await prepareDocument(page, { prefix, upload, legacy, cache }));

  if (dryRun) {
    const out = path.join(process.env.TMPDIR ?? "/tmp", "seed-pages.json");
    writeFileSync(out, JSON.stringify(docs, null, 2));
    console.log(`Dry run: ${docs.length} documents written to ${out}`);
    return;
  }
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${docs.length} pages with prefix "${prefix}": ${docs.map((d) => d.slug.current).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
