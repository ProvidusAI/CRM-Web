import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { PageSections } from "@/components/sanity/page-builder/PageSections";
import type { PageSectionData } from "@/components/sanity/page-builder/types";
import { resolveJsonLd } from "@/lib/jsonLd";
import { pageSlugError, segmentsToSlug, slugToPath } from "@/lib/pagePaths";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { PageDocument } from "@/sanity/lib/types";

type Params = Promise<{ slug?: string[] }>;

// Case studies and posts shown in sections are dereferenced, so their tags
// refresh pages too.
const tagsFor = (slug: string) => ["pages", `page:${slug}`, "case-studies", "posts"];

async function getPage(slug: string, metadata = false) {
  return sanityFetch<PageDocument>({ query: PAGE_QUERY, params: { slug }, tags: tagsFor(slug), metadata });
}

export async function generateStaticParams() {
  const slugs = (await sanityFetch<string[]>({ query: PAGE_SLUGS_QUERY, tags: ["pages"], metadata: true })) ?? [];
  // Every site page lives in Sanity: a build without config or documents would ship an all-404 site.
  if (process.env.NODE_ENV === "production" && !slugs.includes("home")) {
    throw new Error(
      'Sanity page documents missing — check NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET and that the "home" page exists.'
    );
  }
  // "home" is served by the optional catch-all's empty segment ("/").
  return slugs.map((s) => ({ slug: s === "home" ? [] : s.split("/") }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = segmentsToSlug((await params).slug);
  // Studio cannot publish such slugs, so skip the fetch for junk paths (/wp-login.php, /.env).
  if (!slug || pageSlugError(slug)) return {};
  const page = await getPage(slug, true);
  if (!page) return {};
  const metadata = buildPageMetadata({ seo: page.seo, title: page.title, canonicalPath: slugToPath(page.slug) });
  return slug.startsWith("preview/") ? { ...metadata, robots: { index: false, follow: false } } : metadata;
}

export default async function SanityPage({ params }: { params: Params }) {
  const slug = segmentsToSlug((await params).slug);
  if (!slug || pageSlugError(slug)) notFound();
  const page = await getPage(slug);
  if (!page) notFound();

  const body = (
    <>
      <JsonLdScript data={resolveJsonLd(page.jsonLd, null)} />
      <PageSections sections={page.sections as PageSectionData[] | undefined} />
    </>
  );

  return page.clipOverflowX ? <div className="overflow-x-hidden bg-white">{body}</div> : body;
}
