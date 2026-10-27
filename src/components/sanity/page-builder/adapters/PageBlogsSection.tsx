import { PageBlogsSection } from "@/components/sections/PageBlogsSection";
import { toBlogTeaserCards } from "@/lib/blogTeaserCards";
import type { PageBlogPost } from "@/sanity/lib/types";
import type { SectionAdapter, SectionBase } from "../types";

export interface PageBlogsSectionData extends SectionBase {
  _type: "pageBlogsSection";
  title?: string;
  /** Dereferenced by the page query; a reference to a deleted document arrives as null. */
  posts?: (PageBlogPost | null)[];
}

export const pageBlogsSectionAdapter: SectionAdapter<PageBlogsSectionData> = (s) => {
  const posts = toBlogTeaserCards((s.posts ?? []).filter((p) => p != null));
  // No posts, no section: same as the page's `posts.length > 0 &&` guard today.
  if (posts.length === 0) return null;
  return <PageBlogsSection title={s.title || undefined} posts={posts} />;
};
