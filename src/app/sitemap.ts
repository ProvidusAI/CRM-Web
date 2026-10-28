import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { sitemapPageEntries } from '@/lib/sitemapPages'

const SITEMAP_QUERY = `*[
  _type == "post" && defined(slug.current)
  || _type == "caseStudy" && defined(slug.current)
  || (_type == "servicePage" && status == "published" && defined(slug.current))
  || (_type == "page" && defined(slug.current))
]{
  _type,
  "slug": slug.current,
  "noIndex": seo.noIndex,
  publishedAt,
  _updatedAt
}`

type SitemapItem = {
  _type: string;
  slug: string;
  noIndex?: boolean;
  publishedAt?: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only routes still served from code; every Sanity `page` comes from the query below.
  const staticUrls: MetadataRoute.Sitemap = [
    { url: 'https://providuscrm.co.uk/case-studies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
  ]

  const allItems = (await sanityFetch<SitemapItem[]>({
    query: SITEMAP_QUERY,
    tags: ['posts', 'case-studies', 'service-pages', 'pages'],
    revalidate: 3600,
  })) ?? []

  const dynamicUrls = [
    ...sitemapPageEntries(allItems.filter((i) => i._type === 'page')),
    ...allItems
      .filter((i) => i._type === 'post')
      .map((p) => ({
        url: `https://providuscrm.co.uk/blog/${p.slug}`,
        lastModified: new Date(p.publishedAt || p._updatedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
    ...allItems
      .filter((i) => i._type === 'caseStudy')
      .map((cs) => ({
        url: `https://providuscrm.co.uk/case-studies/${cs.slug}`,
        lastModified: new Date(cs._updatedAt || cs.publishedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
    ...allItems
      .filter((i) => i._type === 'servicePage')
      .map((s) => ({
        url: `https://providuscrm.co.uk/services/${s.slug}`,
        lastModified: new Date(s._updatedAt || s.publishedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
  ]

  return [...staticUrls, ...dynamicUrls]
}
