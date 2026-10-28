import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { PageSections } from "@/components/sanity/page-builder/PageSections";
import type { PageSectionData } from "@/components/sanity/page-builder/types";
import { resolveJsonLd } from "@/lib/jsonLd";
import { segmentsToSlug, slugToPath } from "@/lib/pagePaths";
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
  // "home" is served by the optional catch-all's empty segment ("/").
  return slugs.map((s) => ({ slug: s === "home" ? [] : s.split("/") }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = segmentsToSlug((await params).slug);
  if (!slug) return {};
  const page = await getPage(slug, true);
  if (!page) return {};
  const metadata = buildPageMetadata({ seo: page.seo, title: page.title, canonicalPath: slugToPath(page.slug) });
  return slug.startsWith("preview/") ? { ...metadata, robots: { index: false, follow: false } } : metadata;
}

export default async function SanityPage({ params }: { params: Params }) {
  const slug = segmentsToSlug((await params).slug);
  if (!slug) notFound();
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
