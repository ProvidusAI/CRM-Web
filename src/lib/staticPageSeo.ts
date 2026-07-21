import "server-only";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_SEO_QUERY } from "@/sanity/lib/queries";
import type { StaticPageSeo } from "@/sanity/lib/types";
import type { StaticPageKey } from "@/lib/pageKeys";

export type { StaticPageKey };

interface StaticPageMetadataFallback {
  title: string;
  description?: string;
  image?: string;
  canonicalPath: string;
}

export async function getStaticPageSeo(pageKey: StaticPageKey) {
  return sanityFetch<StaticPageSeo>({
    query: STATIC_PAGE_SEO_QUERY,
    params: { pageKey },
    tags: ["static-page-seo"],
    metadata: true,
  });
}

export async function generateStaticPageMetadata(
  pageKey: StaticPageKey,
  fallback: StaticPageMetadataFallback
): Promise<Metadata> {
  const pageSeo = await getStaticPageSeo(pageKey);

  return buildPageMetadata({
    seo: pageSeo?.seo,
    title: fallback.title,
    description: fallback.description,
    image: fallback.image,
    canonicalPath: fallback.canonicalPath,
  });
}
