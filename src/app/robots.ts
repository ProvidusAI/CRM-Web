import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/preview/'],
    },
    sitemap: 'https://providuscrm.co.uk/sitemap.xml',
  }
}
