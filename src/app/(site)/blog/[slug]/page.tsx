import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { BlogAuthorCard } from "@/components/sanity/BlogAuthorCard";
import {
  BlogArticleLeftSidebar,
  BlogArticleRightSidebar,
} from "@/components/sanity/BlogArticleSidebars";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableContent } from "@/components/sanity/PortableContent";
import { CtaSection } from "@/components/sections";
import { formatDate } from "@/lib/format";
import { blogPostingJsonLd, resolveJsonLd } from "@/lib/jsonLd";
import { getArticleHeadings } from "@/lib/portableText";
import { getSanityImageAspectRatio } from "@/lib/sanityImage";
import { buildPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: BLOG_POST_SLUGS_QUERY,
    tags: ["posts"],
    revalidate: 60,
    metadata: true,
  });

  return (slugs ?? []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_QUERY,
    params: { slug },
    tags: ["posts"],
    metadata: true,
  });

  if (!post) {
    return {
      title: "Post Not Found | ProvidusCRM",
      description: "This blog post is no longer available.",
    };
  }

  return buildPageMetadata({
    seo: post.seo,
    title: post.title,
    description: post.excerpt,
    image: post.heroImage?.asset?.url,
    canonicalPath: `/blog/${post.slug.current}`,
    openGraphType: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_QUERY,
    params: { slug },
    tags: ["posts"],
  });

  if (!post) {
    notFound();
  }

  const headings = getArticleHeadings(post.body);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const shareUrl = `${siteUrl}/blog/${post.slug.current}`;
  const jsonLd = resolveJsonLd(post.jsonLd, blogPostingJsonLd(post, siteUrl));

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <Section background="white" className="pb-0 pt-12 md:pt-20">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <Image
                src="/images/green-line.svg"
                alt=""
                width={64}
                height={24}
                aria-hidden="true"
                className="mb-5 h-auto w-16"
              />
              <Heading as="h1" className="text-black">
                {post.title}
              </Heading>
              <Text variant="p3" className="mt-4 text-[#5F5F5F]">
                {formatDate(post.publishedAt)}
              </Text>
            </div>

            {post.author && <BlogAuthorCard author={post.author} />}
          </div>

          {post.heroImage?.asset && (
            <div
              className="relative mt-10 w-full overflow-hidden rounded-lg bg-brand-blue-light"
              style={{ aspectRatio: getSanityImageAspectRatio(post.heroImage) }}
            >
              <SanityImage
                image={post.heroImage}
                altFallback={post.title}
                className="object-contain"
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                unoptimized
              />
            </div>
          )}
        </Container>
      </Section>

      <Section background="white" className="pb-0 pt-12 md:pt-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,220px)] lg:items-start">
            <BlogArticleLeftSidebar
              headings={headings}
              shareTitle={post.title}
              shareUrl={shareUrl}
            />
            <article>
              <PortableContent value={post.body} contained={false} />
            </article>
            <BlogArticleRightSidebar categories={post.categories} />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
