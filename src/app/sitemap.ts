import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'

const SITEMAP_QUERY = `*[
  _type == "post" && defined(slug.current)
  || _type == "caseStudy" && defined(slug.current)
  || (_type == "servicePage" && status == "published" && defined(slug.current))
]{
  _type,
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`

type SitemapItem = {
  _type: string;
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    { url: 'https://providuscrm.co.uk', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://providuscrm.co.uk/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/partnership', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/partnership/findock', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/partnership/fundraise-up', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/partnership/dotdigital', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/services', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://providuscrm.co.uk/industries', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/industries/salesforce-health-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/industries/salesforce-nonprofit-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/industries/salesforce-financial-services-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-sales-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-service-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-marketing-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-experience-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-data-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-agentforce-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/platform-expertise/salesforce-education-cloud-consulting', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/case-studies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const allItems = (await sanityFetch<SitemapItem[]>({
    query: SITEMAP_QUERY,
    tags: ['posts', 'case-studies', 'service-pages'],
    revalidate: 3600,
  })) ?? []

  const dynamicUrls = [
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
