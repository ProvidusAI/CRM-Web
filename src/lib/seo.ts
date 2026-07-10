import type { Metadata } from "next";
import type { SeoFields } from "@/sanity/lib/types";

interface PageMetadataInput {
  seo?: SeoFields;
  title: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
  openGraphType?: "website" | "article";
}

const defaultSiteUrl = "https://providuscrm.co.uk";

export function buildPageMetadata({
  seo,
  title: fallbackTitle,
  description: fallbackDescription,
  image: fallbackImage,
  canonicalPath,
  openGraphType = "website",
}: PageMetadataInput): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;
  const canonicalUrl = seo?.canonicalUrl || toAbsoluteUrl(canonicalPath);
  const image =
    seo?.ogImage?.asset?.url || seo?.twitterImage?.asset?.url || fallbackImage;
  const imageUrl = toAbsoluteUrl(image);
  const openGraphTitle = seo?.ogTitle || title;
  const openGraphDescription = seo?.ogDescription || description;
  const twitterTitle = seo?.twitterTitle || openGraphTitle;
  const twitterDescription = seo?.twitterDescription || openGraphDescription;
  const twitterImageUrl =
    toAbsoluteUrl(seo?.twitterImage?.asset?.url) || imageUrl;

  return {
    title: title.includes("ProvidusCRM") ? { absolute: title } : title,
    description,
    keywords: seo?.keywords,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    robots:
      seo?.noIndex || seo?.noFollow
        ? {
            index: !seo?.noIndex,
            follow: !seo?.noFollow,
          }
        : undefined,
    openGraph: {
      type: openGraphType,
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl, alt: openGraphTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
    },
  };
}

function toAbsoluteUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(
    /\/$/,
    ""
  );
  const path = value.startsWith("/") ? value : `/${value}`;

  return `${siteUrl}${path}`;
}
