/**
 * ONE-SHOT seed: writes Sanity `page` documents from the static route content.
 * Deleted with the static code (Task 13). Re-running it after editors change
 * pages would overwrite their work with the old static copy.
 *
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages --dry-run
 *   SEED_SLUG_PREFIX=preview/ pnpm seed:pages
 *   pnpm seed:pages                       # final slugs
 *   pnpm seed:pages --force               # final slugs, overwriting existing pages
 *   --only=<slug>                         # seed a single page
 *
 * Always run --dry-run first: it is the gate for missing image files (it checks
 * every public/ path exists, with no network write). Without --force, a run with
 * no prefix refuses if any target document already exists.
 */
import { createReadStream, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { pageDocumentId } from "../src/lib/pagePaths";
import { describeError, mergeLegacy, prepareDocument, validateTargets, type LegacyValues } from "./seed-pages/lib";
import { SEED_PAGES } from "./seed-pages/index"; // explicit: "./seed-pages" would resolve to this file

// Same .env / .env.local loading as import-migration-page.ts, but with Next's
// precedence: shell env > .env.local > .env. Keys set by the shell are never touched.
const shellKeys = new Set(Object.keys(process.env));
for (const file of [".env", ".env.local"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !shellKeys.has(m[1])) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const dryRun = process.argv.includes("--dry-run");
const prefix = process.env.SEED_SLUG_PREFIX ?? "";
const force = process.argv.includes("--force");
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
  return mergeLegacy(seoDocs, jsonLdDocs);
}

async function upload(publicPath: string): Promise<string> {
  const file = path.join(process.cwd(), "public", publicPath);
  if (dryRun) {
    // No network, but a missing file must fail the dry run, not the real one.
    if (!existsSync(file)) throw new Error(`Image not found: public${publicPath}`);
    return `image-dryrun${publicPath.length}-1x1-png`;
  }
  const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
  return asset._id;
}

async function main() {
  const pages = SEED_PAGES.filter((p) => !only || p.slug === only);
  const problems = validateTargets(pages, prefix);
  if (problems.length) throw new Error(`Invalid seed targets:\n  ${problems.join("\n  ")}`);
  if (SEED_PAGES.length === 0 && dryRun && !only) {
    console.log("Dry run: 0 documents (SEED_PAGES is empty)");
    return;
  }
  if (pages.length === 0) {
    throw new Error(only ? `--only=${only} matches no seed page.` : "SEED_PAGES is empty; nothing to seed.");
  }

  // Non-dry runs: confirm the target and refuse overwrites BEFORE loadLegacy or any asset upload.
  if (!dryRun) {
    const { projectId, dataset } = client.config();
    console.log(`Target: project ${projectId}, dataset ${dataset}, prefix "${prefix}", ${pages.length} documents`);
    if (prefix === "" && !force) {
      // Final slugs: refuse to overwrite live pages (published or draft) without --force.
      const ids = pages.flatMap((p) => {
        const id = pageDocumentId(prefix + p.slug);
        return [id, `drafts.${id}`];
      });
      const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids });
      if (existing.length) throw new Error(`Refusing to overwrite existing documents (pass --force): ${existing.join(", ")}`);
    }
  }

  const legacy = await loadLegacy();
  const cache = new Map<string, Promise<string>>();
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
  // Never log the error object: network errors carry the request, including the Authorization header.
  console.error(describeError(err));
  process.exit(1);
});
