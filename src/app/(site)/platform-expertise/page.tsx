import {
  HeroSection,
  PartnersSection,
  ExpertiseStackSection,
  ServiceCaseStudiesSection,
  CtaSection,
  PageBlogsSection
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("platform-expertise", {
    title: "Certified Platform Expertise",
    description:
      "Certified Salesforce Platform expertise across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce, and Revenue Cloud.",
    canonicalPath: "/platform-expertise",
    image: "/images/platform-experties.webp",
  });
}

export default async function PlatformExpertisePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Certified Platform Expertise | ProvidusCRM",
    "description": "Certified Salesforce Platform expertise across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Data Cloud, Agentforce, and Revenue Cloud.",
    "url": "https://providuscrm.co.uk/platform-expertise",
    "about": [
      {
        "@type": "Service",
        "name": "Experience Cloud Consulting",
        "description": "Give customers, partners, and teams a self-service portal that works."
      },
      {
        "@type": "Service",
        "name": "Service Cloud Consulting",
        "description": "Resolve cases faster with the right context on every ticket."
      },
      {
        "@type": "Service",
        "name": "Marketing Cloud Consulting",
        "description": "Connect every campaign to a measurable pipeline based on CRM data."
      },
      {
        "@type": "Service",
        "name": "Data Cloud Consulting",
        "description": "Unify customer data from every source into one profile inside Salesforce."
      },
      {
        "@type": "Service",
        "name": "Agentforce Implementation",
        "description": "Deploy autonomous AI agents that handle real workflows and tasks."
      },
      {
        "@type": "Service",
        "name": "Revenue Cloud & CPQ Implementation",
        "description": "Configure CPQ rules, product bundles, pricing logic, and billing automation."
      },
      {
        "@type": "Service",
        "name": "Sales Cloud Implementation",
        "description": "Close deals faster with full pipeline visibility and lead assignment rules."
      }
    ]
  };
  const jsonLd = await getSitePageJsonLd("platform-expertise", schema);
  const blogs = await getPageBlogs("platform-expertise");
  const caseStudies = await getPageCaseStudies("platform-expertise");

  const heroTitle = (
    <>
      Certified Platform Expertise Across Every Salesforce Cloud{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection
        title={heroTitle}
        description="Whether it is sales pipeline management or autonomous AI agents, our certified team delivers end-to-end solutions across the Salesforce platform."
        image="/images/platform-experties.webp"
        imageClassName="object-contain"
      />
      <PartnersSection />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <ExpertiseStackSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Drive CRM Innovation For Your Organisation" />
    </>
  );
}

