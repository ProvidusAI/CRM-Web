// A slug containing whitespace silently 404s: the listing links to
// `/blog/my-post ` but the browser normalises the space away, so the article
// route's `slug.current == $slug` lookup finds nothing. The Studio validation
// in schemaTypes/slugField.ts guards new edits; this catches documents that
// were already saved before that rule existed.
interface SlugRow {
  _type: string;
  _id: string;
  slug: string;
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-01";

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set — cannot check slugs.");
  }

  const query = '*[defined(slug.current)]{_type, _id, "slug": slug.current}';
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
      `?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`);
  }

  const { result } = (await response.json()) as { result: SlugRow[] };
  const bad = result.filter((row) => /\s/.test(row.slug));

  if (bad.length > 0) {
    console.error(`${bad.length} of ${result.length} slugs contain whitespace:`);
    for (const row of bad) {
      console.error(`  ${row._type} ${row._id} -> ${JSON.stringify(row.slug)}`);
    }
    process.exit(1);
  }

  console.log(`All ${result.length} slugs are whitespace-free.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
