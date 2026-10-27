import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/sections/BlogIndexClient";
import { CtaSection, HeroSection } from "@/components/sections";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { formatDate } from "@/lib/format";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import type { BlogPostListItem } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("blog", {
    title: "Blog",
    description:
      "Read ProvidusCRM insights on Salesforce implementation, CRM strategy, automation, and customer operations.",
    canonicalPath: "/blog",
    image: "/images/case-study.webp",
  });
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPostListItem[]>({
    query: BLOG_POSTS_QUERY,
    tags: ["posts"],
  });

  const blogItems = (posts ?? []).map((post) => ({
    title: post.title,
    slug: post.slug.current,
    date: formatDate(post.publishedAt),
    excerpt: post.excerpt ?? "",
    image: post.heroImage?.asset?.url ?? "/images/case-study.webp",
    categories: post.categories?.map((category) => category.title) ?? [],
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog | ProvidusCRM",
    "description": "Read ProvidusCRM insights on Salesforce implementation, CRM strategy, automation, and customer operations.",
    "url": "https://providuscrm.co.uk/blog",
    "blogPost": (posts ?? []).map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt ?? "",
      "image": post.heroImage?.asset?.url ?? "https://providuscrm.co.uk/images/case-study.webp",
      "datePublished": post.publishedAt,
      "url": `https://providuscrm.co.uk/blog/${post.slug.current}`,
      "publisher": {
        "@type": "Organization",
        "name": "ProvidusCRM",
        "logo": {
          "@type": "ImageObject",
          "url": "https://providuscrm.co.uk/images/salesforce-partner.webp"
        }
      }
    }))
  };
  const jsonLd = await getSitePageJsonLd("blog", schema);
  const heroTitle = (
    <>
      Insights And Impact
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection title={heroTitle} hideImage />
      <BlogIndexClient posts={blogItems} />
      <CtaSection />
    </>
  );
}
