import type { BlogPost, JsonLdField } from "@/sanity/lib/types";

export type JsonLdValue =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export function resolveJsonLd(
  jsonLd?: JsonLdField,
  fallback?: JsonLdValue
): JsonLdValue | null {
  if (jsonLd?.enabled === false) {
    return null;
  }

  if (jsonLd?.schemaJson) {
    try {
      return JSON.parse(jsonLd.schemaJson) as JsonLdValue;
    } catch {
      return fallback || null;
    }
  }

  return fallback || null;
}

export function stringifyJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ORGANISATION_NAME = "ProvidusCRM";

/**
 * BlogPosting schema derived from the post itself.
 *
 * Posts carry an optional hand-written `jsonLd` field, but most are published
 * without one — and `resolveJsonLd` with no fallback then renders nothing at
 * all, leaving the article with no structured data. This gives every post a
 * baseline; an editor's hand-written JSON still wins.
 */
export function blogPostingJsonLd(
  post: BlogPost,
  siteUrl: string
): JsonLdValue {
  const url = `${siteUrl}/blog/${post.slug.current}`;
  const asset = post.heroImage?.asset;
  const dimensions = asset?.metadata?.dimensions;

  const publisher = {
    "@type": "Organization",
    name: ORGANISATION_NAME,
    url: `${siteUrl}/`,
    logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.svg` },
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(asset?.url
      ? {
          image: {
            "@type": "ImageObject",
            url: asset.url,
            ...(dimensions?.width && dimensions?.height
              ? { width: dimensions.width, height: dimensions.height }
              : {}),
          },
        }
      : {}),
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : publisher,
    publisher,
    ...(post.publishedAt
      ? { datePublished: post.publishedAt, dateModified: post.publishedAt }
      : {}),
    ...(post.categories?.[0]?.title
      ? { articleSection: post.categories[0].title }
      : {}),
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    url,
  };
}
