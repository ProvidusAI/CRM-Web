import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";

export interface BlogTeaserCard {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  category?: string;
}

interface PageBlogsSectionProps {
  title?: string;
  posts: BlogTeaserCard[];
}

export function PageBlogsSection({
  title = "Latest from our blog",
  posts,
}: PageBlogsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container size="xl">
        <div className="text-center">
          <Image
            src="/images/green-line.svg"
            alt=""
            width={64}
            height={24}
            className="mx-auto h-auto w-16"
          />
          <Heading as="h2" className="mt-5 text-black">
            {title}
          </Heading>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal
              key={post.slug}
              direction="up"
              delay={index * 0.08}
              width="100%"
            >
              <article className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[1.95/1] overflow-hidden rounded-[10px] bg-brand-blue-light"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.category && (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-2 font-body text-[12px] text-black shadow-sm">
                      {post.category}
                    </span>
                  )}
                </Link>

                <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    <Text variant="p4" className="text-brand-blue">
                      {formatDate(post.publishedAt)}
                    </Text>
                    <Heading
                      as="h3"
                      level="h4"
                      className="mt-2 max-w-lg text-black"
                    >
                      {post.title}
                    </Heading>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 font-body text-[12px] font-medium text-white transition-transform hover:scale-105"
                  >
                    Read Article
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
