import {
  HeroSection,
  PartnersSection,
  WhyChooseSection,
  CertifiedSection,
  CtaSection,
  CategoriesSection,
  reasons,
  ServiceCaseStudiesSection,
  PageBlogsSection
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getPageCaseStudies } from "@/lib/pageCaseStudies";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata() {
  return generateStaticPageMetadata("services", {
    title: "Salesforce Services",
    description:
      "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.",
    canonicalPath: "/services",
    image: "/images/our-services-hero.webp",
  });
}

export default async function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Salesforce Services | ProvidusCRM",
    "description": "End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals.",
    "url": "https://providuscrm.co.uk/services"
  };
  const jsonLd = await getSitePageJsonLd("services", schema);
  const blogs = await getPageBlogs("services");
  const caseStudies = await getPageCaseStudies("services");

  const servicesHeroTitle = (
    <>
      Our Services{" "}
      <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
    </>
  );

  const servicesReasons = [
    {
      ...reasons[0],
      text: "We deliver solutions based on the challenges you’re facing. Before any configuration begins, our team maps business processes and bottlenecks. As a result, the Salesforce org that goes live reflects how your business actually runs. "
    },
    {
      ...reasons[1],
      text: "We provide you with experienced, certified Salesforce talent who’ve solved the challenges you’re facing today many times for multiple organisations across the UK. You get proven expertise, defined delivery frameworks, documented decisions, and a track record of going live on time with solutions teams actually adopt."
    },
    {
      ...reasons[2],
      text: "ProvidusCRM is a specialist Salesforce services company. Our certified team covers Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Experience Cloud, and Agentforce, delivering custom Salesforce solutions around your industry, processes, needs, and goals."
    }
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <HeroSection
        title={servicesHeroTitle}
        description="End-to-end Salesforce services and certified talent for building CRM solutions around your organisation's processes, challenges, and goals."
        image="/images/our-services-hero.webp"
        imageClassName="object-contain"
      />
      <PartnersSection />
      <CategoriesSection />
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Salesforce Services Partner"
        customReasons={servicesReasons}
      />
      {caseStudies.cards.length > 0 && (
        <ServiceCaseStudiesSection
          title={caseStudies.title}
          caseStudies={caseStudies.cards}
        />
      )}
      <CertifiedSection
        title="Certified Salesforce Expertise Behind Every Solution We Deliver"
        description="Our consultants, developers, and architects are certified across platform administration, app building, data architecture, and every major Salesforce cloud. Every engagement is backed by certified expertise."
      />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection title="Ready to Reinvent Your CRM?" />
    </>
  );
}
