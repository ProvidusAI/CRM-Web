import { randomUUID } from "node:crypto";
import type { SanityClient } from "@sanity/client";
import { pageDocumentId } from "../../src/lib/pagePaths";
import type { ImagePlaceholder, LegacyValues, SeedPage } from "./types";

export type { ImagePlaceholder, LegacyEntry, LegacyValues, SeedPage, SeedSection } from "./types";

export const img = (path: string, alt?: string): ImagePlaceholder => ({ __seedImage: path, ...(alt !== undefined && { alt }) });
export const ref = (id: string) => ({ _type: "reference" as const, _ref: id });
export const heading = (
  text: string,
  opts: { mark?: "after"; markStyle?: "hero" | "heroSmall" | "section"; markSpace?: boolean } = {}
) => ({ text, mark: opts.mark ?? "none", ...(opts.mark && { markStyle: opts.markStyle ?? "hero", markSpace: opts.markSpace ?? true }) });

export type SeedDocument = Record<string, unknown> & { _id: string; _type: "page"; slug: { _type: "slug"; current: string } };

type Ref = { _type: "reference"; _ref: string };

/** Read-only: the CMS's current curated case studies / posts for a legacy page key. */
export async function legacyRefs(client: SanityClient, key: string) {
  const [cs, pb] = await Promise.all([
    client.fetch<{ sectionTitle?: string; ids?: string[] } | null>(
      `*[_type=="pageCaseStudies" && pageKey==$key][0]{sectionTitle, "ids": caseStudies[]._ref}`,
      { key }
    ),
    client.fetch<{ sectionTitle?: string; ids?: string[] } | null>(
      `*[_type=="pageBlogs" && pageKey==$key][0]{sectionTitle, "ids": posts[]._ref}`,
      { key }
    ),
  ]);
  return {
    caseStudies: (cs?.ids ?? []).map(ref) as Ref[],
    posts: (pb?.ids ?? []).map(ref) as Ref[],
    caseStudiesTitle: cs?.sectionTitle,
    postsTitle: pb?.sectionTitle,
  };
}

function isPlaceholder(v: unknown): v is ImagePlaceholder {
  return typeof v === "object" && v !== null && "__seedImage" in v;
}

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Replace image placeholders (uploading each path once) and key every array object. */
async function walk(value: unknown, upload: (p: string) => Promise<string>, cache: Map<string, Promise<string>>): Promise<unknown> {
  if (isPlaceholder(value)) {
    if (!cache.has(value.__seedImage)) cache.set(value.__seedImage, upload(value.__seedImage));
    const assetId = await cache.get(value.__seedImage)!;
    return { _type: "image", asset: { _type: "reference", _ref: assetId }, ...(value.alt !== undefined && { alt: value.alt }) };
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      const walked = await walk(item, upload, cache);
      // Sanity requires a _key on every object in an array (images included);
      // plain string arrays (bullets, pill rows) stay as they are.
      out.push(walked && typeof walked === "object" && !Array.isArray(walked) ? { _key: key(), ...(walked as object) } : walked);
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = await walk(v, upload, cache);
    }
    return out;
  }
  return value;
}

export async function prepareDocument(
  page: SeedPage,
  opts: { prefix: string; upload: (path: string) => Promise<string>; legacy: LegacyValues; cache?: Map<string, Promise<string>> }
): Promise<SeedDocument> {
  const cache = opts.cache ?? new Map<string, Promise<string>>();
  const slug = `${opts.prefix}${page.slug}`;
  const legacy = page.legacyKey ? opts.legacy[page.legacyKey] ?? {} : {};
  // Code fallbacks first, then any non-empty CMS value on top (field by field),
  // so the seeded page reproduces exactly what generateStaticPageMetadata served.
  const seo: Record<string, unknown> = {
    metaTitle: page.seoFallback.title,
    ...(page.seoFallback.description && { metaDescription: page.seoFallback.description }),
    ...(page.seoFallback.image && { ogImage: img(page.seoFallback.image) }),
  };
  for (const [k, v] of Object.entries(legacy.seo ?? {})) {
    if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)) seo[k] = v;
  }
  const jsonLd = legacy.jsonLd?.schemaJson || legacy.jsonLd?.enabled === false
    ? legacy.jsonLd
    : page.jsonLdFallback
      ? { enabled: true, schemaJson: JSON.stringify(page.jsonLdFallback, null, 2) }
      : undefined;

  const body = await walk(
    { title: page.title, clipOverflowX: page.clipOverflowX || undefined, sections: page.sections, seo: { _type: "seo", ...seo }, jsonLd: jsonLd && { _type: "jsonLd", ...jsonLd } },
    opts.upload,
    cache
  );
  return {
    _id: pageDocumentId(slug),
    _type: "page" as const,
    slug: { _type: "slug" as const, current: slug },
    ...(body as Record<string, unknown>),
  };
}
