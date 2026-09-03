import { defineQuery } from "next-sanity";

const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  },
  alt
`;

const seoProjection = `
  metaTitle,
  metaDescription,
  keywords,
  canonicalUrl,
  noIndex,
  noFollow,
  ogTitle,
  ogDescription,
  ogImage {
    ${imageProjection}
  },
  twitterTitle,
  twitterDescription,
  twitterImage {
    ${imageProjection}
  }
`;

const jsonLdProjection = `
  enabled,
  schemaJson
`;

export const SITE_PAGE_JSON_LD_QUERY = defineQuery(`
  *[_type == "sitePageJsonLd" && pageKey == $pageKey][0] {
    title,
    pageKey,
    jsonLd {
      ${jsonLdProjection}
    }
  }
`);

export const STATIC_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "staticPageSeo" && pageKey == $pageKey][0] {
    title,
    pageKey,
    seo {
      ${seoProjection}
    },
    jsonLd {
      ${jsonLdProjection}
    }
  }
`);

export const PAGE_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "pageCaseStudies" && pageKey == $pageKey][0] {
    pageKey,
    sectionTitle,
    caseStudies[]->{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      clientName,
      industry,
      technologies,
      resultSummary,
      coverImage {
        ${imageProjection}
      }
    }
  }
`);

export const PAGE_BLOGS_QUERY = defineQuery(`
  *[_type == "pageBlogs" && pageKey == $pageKey][0] {
    pageKey,
    sectionTitle,
    posts[]->{
      _id,
      title,
      slug,
      publishedAt,
      "categories": categories[]->title,
      heroImage {
        ${imageProjection}
      }
    }
  }
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    title,
    slug
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    heroImage {
      ${imageProjection}
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      role,
      linkedinUrl,
      xUrl,
      slug,
      image {
        ${imageProjection}
      }
    }
  }
`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    heroImage {
      ${imageProjection}
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      role,
      linkedinUrl,
      xUrl,
      slug,
      image {
        ${imageProjection}
      }
    },
    body[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    seo {
      ${seoProjection}
    },
    jsonLd {
      ${jsonLdProjection}
    }
  }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    clientName,
    industry,
    technologies,
    resultSummary,
    coverImage {
      ${imageProjection}
    }
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    clientName,
    industry,
    technologies,
    resultSummary,
    coverImage {
      ${imageProjection}
    },
    challenge[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    solution[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    results[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    body[] {
      ...,
      _type == "image" => {
        ${imageProjection},
        caption
      }
    },
    seo {
      ${seoProjection}
    },
    jsonLd {
      ${jsonLdProjection}
    }
  }
`);

export const SERVICE_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "servicePage" && status == "published" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const SERVICE_NAV_QUERY = defineQuery(`
  *[_type == "servicePage" && status == "published" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current
  }
`);

export const SERVICE_PAGE_QUERY = defineQuery(`
  *[_type == "servicePage" && status == "published" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    seo {
      ${seoProjection}
    },
    jsonLd {
      ${jsonLdProjection}
    },
    sectionOrder,
    hero {
      badgeTitle,
      badgeSubtitle,
      heading,
      description,
      bullets,
      formTitle,
      formButtonLabel,
      backgroundImage {
        ${imageProjection}
      }
    },
    certified,
    blogs[]->{
      _id,
      title,
      slug,
      publishedAt,
      "categories": categories[]->title,
      heroImage {
        ${imageProjection}
      }
    },
    caseStudies[]->{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      clientName,
      industry,
      technologies,
      resultSummary,
      coverImage {
        ${imageProjection}
      }
    },
    tabsSection {
      title,
      tabs[] {
        label,
        heading,
        text,
        bullets,
        link {
          linkType,
          internalLink->{
            _type,
            "slug": slug.current
          },
          externalUrl
        }
      }
    },
    benefitsSection,
    consultantCta {
      title,
      buttonLabel,
      buttonHref,
      backgroundColor,
      image {
        ${imageProjection}
      }
    },
    processSection,
    migrationPlatformsSection {
      title,
      items[] {
        name,
        text,
        colorTheme,
        logo {
          ${imageProjection}
        }
      }
    },
    expertiseSection {
      title,
      items[] {
        title,
        text,
        accentColor,
        icon {
          ${imageProjection}
        }
      }
    },
    industriesSection {
      title,
      items[] {
        title,
        description,
        link,
        image {
          ${imageProjection}
        }
      }
    },
    whyChooseSection {
      title,
      reasons[] {
        title,
        text,
        color,
        icon {
          ${imageProjection}
        }
      },
      image {
        ${imageProjection}
      }
    },
    faqSection {
      title,
      faqs[] {
        question,
        answer
      }
    },
    painPointsSection {
      title,
      items[] {
        title,
        text,
        icon {
          ${imageProjection}
        }
      }
    },
    splitChecklistSection {
      title,
      text,
      ctaLabel,
      ctaHref,
      images[] {
        ${imageProjection}
      },
      items
    },
    offerCarouselSection {
      title,
      items[] {
        title,
        text,
        icon {
          ${imageProjection}
        }
      }
    },
    pricingSection {
      title,
      subtitle,
      plans[] {
        name,
        description,
        includes,
        featured
      }
    },
    cta {
      title,
      buttonLabel,
      buttonHref,
      backgroundImage {
        ${imageProjection}
      }
    }
  }
`);
