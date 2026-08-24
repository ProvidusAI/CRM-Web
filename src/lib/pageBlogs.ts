import "server-only";

import type { BlogTeaserCard } from "@/components/sections/PageBlogsSection";
import { toBlogTeaserCards } from "@/lib/blogTeaserCards";
import type { PageBlogKey } from "@/lib/pageKeys";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PAGE_BLOGS_QUERY } from "@/sanity/lib/queries";
import type { PageBlogs } from "@/sanity/lib/types";

interface PageBlogsResult {
  /** Optional heading override. Undefined falls back to the section default. */
  title?: string;
  /** Empty when no document exists or none are selected — the section then hides. */
  posts: BlogTeaserCard[];
}

/**
 * Fetches the blog posts an editor selected for a given page in Sanity
 * ("Page blogs" document, keyed by pageKey).
 */
export async function getPageBlogs(
  pageKey: PageBlogKey
): Promise<PageBlogsResult> {
  const data = await sanityFetch<PageBlogs>({
    query: PAGE_BLOGS_QUERY,
    params: { pageKey },
    tags: ["page-blogs", "posts"],
  });

  return { title: data?.sectionTitle, posts: toBlogTeaserCards(data?.posts) };
}
