import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export interface ServiceCaseStudyCard {
  title: string;
  slug: string;
  image: string;
  label?: string;
  category?: string;
}

interface ServiceCaseStudiesSectionProps {
  title?: string;
  caseStudies: ServiceCaseStudyCard[];
  /** Optional "view all" link shown top-right of the heading (e.g. to /case-studies). */
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function ServiceCaseStudiesSection({
  title = "More projects that made a mark.",
  caseStudies,
  viewAllHref,
  viewAllLabel = "View More",
}: ServiceCaseStudiesSectionProps) {
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <Section className="bg-white py-16 md:py-24">
      <Container size="xl">
        <div className="relative text-center">
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
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-brand-green py-2 pl-5 pr-2 font-body text-[14px] font-medium text-white transition-transform hover:scale-105 md:inline-flex"
            >
              {viewAllLabel}
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
                <ArrowRight aria-hidden="true" size={16} className="text-brand-green" />
              </span>
            </Link>
          )}
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {caseStudies.map((caseStudy, index) => (
            <Reveal
              key={`${caseStudy.slug}-${index}`}
              direction="up"
              delay={index * 0.08}
              width="100%"
            >
              <article className="group">
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="relative block aspect-[1.95/1] overflow-hidden rounded-[10px] bg-brand-blue-light"
                >
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {caseStudy.category && (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-2 font-body text-[12px] text-black shadow-sm">
                      {caseStudy.category}
                    </span>
                  )}
                </Link>

                <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    {caseStudy.label && (
                      <Text variant="p4" className="text-brand-blue">
                        {caseStudy.label}
                      </Text>
                    )}
                    <Heading
                      as="h3"
                      level="h4"
                      className="mt-2 max-w-lg text-black"
                    >
                      {caseStudy.title}
                    </Heading>
                  </div>

                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 font-body text-[12px] font-medium text-white transition-transform hover:scale-105"
                  >
                    View Project
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

