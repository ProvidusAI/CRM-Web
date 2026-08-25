import type { BlogTeaserCard } from "@/components/sections/PageBlogsSection";
import type { PageBlogPost } from "@/sanity/lib/types";

/**
 * Maps the Sanity response onto card props.
 *
 * Deliberately kept out of `pageBlogs.ts`: that module is `server-only`, which
 * cannot be loaded by `tsx`, and this logic needs a runnable check.
 */
export function toBlogTeaserCards(posts?: PageBlogPost[]): BlogTeaserCard[] {
  return (posts ?? []).map((post) => ({
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    image: post.heroImage?.asset?.url ?? "/images/case-study.webp",
    imageAlt: post.heroImage?.alt ?? post.title,
    publishedAt: post.publishedAt,
    category: post.categories?.[0],
  }));
}
