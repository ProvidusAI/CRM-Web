import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableContent } from "@/components/sanity/PortableContent";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { CtaSection, ServiceCaseStudiesSection } from "@/components/sections";
import { urlForImage } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";
import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveJsonLd } from "@/lib/jsonLd";
import { getSanityImageAspectRatio } from "@/lib/sanityImage";
import { buildPageMetadata } from "@/lib/seo";
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { CaseStudy, CaseStudyListItem } from "@/sanity/lib/types";
import type { Image as SanityImageType } from "sanity";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SlugResult {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<SlugResult[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["case-studies"],
    revalidate: 60,
    metadata: true,
  });

  return (slugs ?? []).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await sanityFetch<CaseStudy>({
    query: CASE_STUDY_QUERY,
    params: { slug },
    tags: ["case-studies"],
    metadata: true,
  });

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | ProvidusCRM",
      description: "This case study is no longer available.",
    };
  }

  return buildPageMetadata({
    seo: caseStudy.seo,
    title: caseStudy.title,
    description: caseStudy.excerpt,
    image: caseStudy.coverImage?.asset?.url,
    canonicalPath: `/case-studies/${caseStudy.slug.current}`,
    openGraphType: "article",
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, allCaseStudies] = await Promise.all([
    sanityFetch<CaseStudy>({
      query: CASE_STUDY_QUERY,
      params: { slug },
      tags: ["case-studies"],
    }),
    sanityFetch<CaseStudyListItem[]>({
      query: CASE_STUDIES_QUERY,
      tags: ["case-studies"],
    }),
  ]);


  if (!caseStudy) {
    notFound();
  }

  const recentCaseStudies = (allCaseStudies ?? []).filter((cs) => cs.slug.current !== slug).slice(0, 2);

  const mappedCaseStudies = recentCaseStudies.map((cs) => ({
    title: cs.title,
    slug: cs.slug.current,
    image: cs.coverImage ? urlForImage(cs.coverImage as SanityImageType).url() : "/images/case-studies/case-study.png",
    category: cs.industry,
  }));
  const jsonLd = resolveJsonLd(caseStudy.jsonLd);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main className="bg-white">
        <Container size="xl" className="pt-4 md:pt-6">
          {caseStudy.coverImage?.asset && (
            <div
              className="relative overflow-hidden rounded-[20px] bg-brand-blue-light"
              style={{
                aspectRatio: getSanityImageAspectRatio(caseStudy.coverImage),
              }}
            >
              <SanityImage
                image={caseStudy.coverImage}
                altFallback={caseStudy.title}
                className="object-contain"
                priority
                sizes="(min-width: 1800px) 1536px, (min-width: 1440px) 1376px, calc(100vw - 48px)"
                unoptimized
              />
            </div>
          )}
        </Container>

        <Container size="xl" className="py-12 text-center md:py-16">
          {caseStudy.industry && (
            <Badge
              variant="blue"
              className="border-2! border-brand-blue px-4 py-1 text-sm font-semibold bg-transparent"
            >
              {caseStudy.industry}
            </Badge>
          )}
          <Heading
            as="h1"
            className="mx-auto mt-5 max-w-4xl text-black !text-[32px] !leading-[1.12] md:!text-[52px] md:!leading-[1.08]"
          >
            {caseStudy.title}
          </Heading>
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <Text
              variant="p3"
              className="mx-auto mt-5 max-w-4xl text-[#5F5F5F]"
            >
              {caseStudy.technologies.map((technology) => technology.trim()).join(" | ")}
            </Text>
          )}
        </Container>

        <Container size="xl" className="pb-16 md:pb-24">
          <article className="flex flex-col gap-8 md:gap-10">
            <EditorialContent value={caseStudy.challenge} />
            <EditorialContent value={caseStudy.solution} />
            <EditorialContent value={caseStudy.results} />
            <EditorialContent value={caseStudy.body} />
          </article>
        </Container>

        <ServiceCaseStudiesSection caseStudies={mappedCaseStudies} />
      </main>
      <CtaSection />
    </>
  );
}

function EditorialContent({ value }: { value?: CaseStudy["challenge"] }) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableContent value={value} contained={false} />;
}
