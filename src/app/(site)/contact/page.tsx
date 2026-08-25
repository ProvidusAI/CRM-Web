import type { Metadata } from "next";
import { ContactSection, CtaSection, PageBlogsSection } from "@/components/sections";
import { getPageBlogs } from "@/lib/pageBlogs";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return generateStaticPageMetadata("contact", {
    title: "Contact Us",
    description:
      "Get in touch with ProvidusCRM. Speak to our certified Salesforce experts and CRM consultants today.",
    canonicalPath: "/contact",
    image: "/images/hero-bg.webp",
  });
}

export default async function ContactPage() {
  const blogs = await getPageBlogs("contact");

  return (
    <>
      <ContactSection />
      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}
      <CtaSection />
    </>
  );
}
