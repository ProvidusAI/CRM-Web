"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export interface BlogCardItem {
  title: string;
  date: string;
  image: string;
  slug: string;
  excerpt: string;
  categories: string[];
}

interface BlogSectionProps {
  posts: BlogCardItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogSection({ posts, searchQuery, onSearchChange }: BlogSectionProps) {
  // Split filtered posts into layout parts
  const firstItem = posts[0];
  const stackedItems = posts.slice(1, 3);
  const mediumItems = posts.slice(3, 7);
  const smallItems = posts.slice(7);

  return (
    <section className="py-12 md:py-20 bg-white">
      <Container>
        {/* Section Header with Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8 mb-12">
          <div>
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
            <Heading as="h2" className="text-black !text-[32px] md:!text-[45px] font-bold font-heading">
              Latest Blogs
            </Heading>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="What are you looking for?"
              aria-label="Search blog posts"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-[14px] font-body text-black placeholder-gray-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <Text variant="p2" className="text-gray-400">
              No blogs found matching your search criteria.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* ROW 1: Featured (Large Left + Small Stacked Right) */}
            {(firstItem || stackedItems.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Large Featured Card */}
                {firstItem && (
                  <Link
                    href={`/blog/${firstItem.slug}`}
                    className="lg:col-span-8 flex flex-col group cursor-pointer"
                  >
                    <Reveal direction="up" delay={0.1} width="100%">
                      <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 shadow-sm">
                        <Image
                          src={firstItem.image}
                          alt={firstItem.title}
                          fill
                          sizes="(min-width: 1024px) 64vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-103"
                          quality={82}
                          priority
                        />
                      </div>
                      <Heading
                        as="h3"
                        className="text-black hover:text-brand-blue transition-colors font-heading font-bold !text-[22px] md:!text-[27px] !leading-[30px] md:!leading-[33px] tracking-[-0.24px]"
                      >
                        {firstItem.title}
                      </Heading>
                      <span className="inline-block mt-2 font-body font-normal text-[16px] text-[#8C8C8C] leading-[30px]">
                        {firstItem.date}
                      </span>
                      <Text variant="p3" className="mt-3 max-w-2xl text-[#5F5F5F]">
                        {firstItem.excerpt}
                      </Text>
                    </Reveal>
                  </Link>
                )}

                {/* Right Stacked List Cards */}
                {stackedItems.length > 0 && (
                  <div className="lg:col-span-4 flex flex-col gap-8">
                    {stackedItems.map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/blog/${item.slug}`}
                        className="flex flex-col group cursor-pointer"
                      >
                        <Reveal direction="up" delay={0.2 + idx * 0.1} width="100%">
                          <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-4 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(min-width: 1024px) 30vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-103"
                              quality={82}
                            />
                          </div>
                          <Heading
                            as="h4"
                            className="text-black hover:text-brand-blue transition-colors font-heading font-bold !text-[19px] lg:!text-[24px] xl:!text-[27px] !leading-[28px] lg:!leading-[33px] tracking-[-0.24px]"
                          >
                            {item.title}
                          </Heading>
                          <span className="inline-block mt-1 font-body font-normal text-[16px] text-[#8C8C8C] leading-[30px]">
                            {item.date}
                          </span>
                        </Reveal>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ROW 2 & 3: Medium Cards (2-column grid) */}
            {mediumItems.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-gray-100 pt-12">
                {mediumItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/blog/${item.slug}`}
                    className="flex flex-col group cursor-pointer"
                  >
                    <Reveal direction="up" delay={0.1 * idx} width="100%">
                      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-6 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-103"
                          quality={82}
                        />
                      </div>
                      <Heading
                        as="h3"
                        className="text-black hover:text-brand-blue transition-colors font-heading font-bold !text-[22px] md:!text-[27px] !leading-[30px] md:!leading-[33px] tracking-[-0.24px]"
                      >
                        {item.title}
                      </Heading>
                      <span className="inline-block mt-2 font-body font-normal text-[16px] text-[#8C8C8C] leading-[30px]">
                        {item.date}
                      </span>
                      <Text variant="p3" className="mt-3 text-[#5F5F5F]">
                        {item.excerpt}
                      </Text>
                    </Reveal>
                  </Link>
                ))}
              </div>
            )}

            {/* ROW 4 & 5: Small Cards (3-column grid) */}
            {smallItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-t border-gray-100 pt-12">
                {smallItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/blog/${item.slug}`}
                    className="flex flex-col group cursor-pointer"
                  >
                    <Reveal direction="up" delay={0.08 * idx} width="100%">
                      <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-103"
                          quality={82}
                        />
                      </div>
                      <Heading
                        as="h3"
                        className="text-black hover:text-brand-blue transition-colors font-heading font-bold !text-[20px] lg:!text-[25px] xl:!text-[27px] !leading-[28px] lg:!leading-[33px] tracking-[-0.24px] line-clamp-2"
                      >
                        {item.title}
                      </Heading>
                      <span className="inline-block mt-2 font-body font-normal text-[16px] md:text-[20px] text-[#8C8C8C] leading-[30px]">
                        {item.date}
                      </span>
                    </Reveal>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {/* <div className="flex justify-center mt-8">
              <button className="flex items-center gap-2 border border-gray-300 text-black px-8 py-3.5 rounded-full hover:bg-gray-50 transition-all font-semibold cursor-pointer">
                Load More
                <ArrowRight className="w-5 h-5" />
              </button>
            </div> */}
          </div>
        )}
      </Container>
    </section>
  );
}
