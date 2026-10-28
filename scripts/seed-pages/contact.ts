import {
  DEFAULT_CONTACT_ADDRESS,
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_CONTACT_INTRO,
  DEFAULT_CONTACT_PHONE,
} from "@/components/sections/ContactSection";
import { curated, img } from "./lib";
import type { SeedPage } from "./types";

// Source: src/app/(site)/contact/page.tsx. No JSON-LD on this route.
export const contactPage: SeedPage = {
  slug: "contact",
  title: "Contact",
  legacyKey: "contact",
  seoFallback: {
    title: "Contact Us",
    description:
      "Get in touch with ProvidusCRM. Speak to our certified Salesforce experts and CRM consultants today.",
    image: "/images/hero-bg.webp",
  },
  sections: [
    // <ContactSection /> (defaults)
    {
      _type: "contactSection",
      intro: DEFAULT_CONTACT_INTRO,
      address: DEFAULT_CONTACT_ADDRESS,
      email: DEFAULT_CONTACT_EMAIL,
      phone: DEFAULT_CONTACT_PHONE,
    },
    // {blogs.posts.length > 0 && <PageBlogsSection title posts />}
    { _type: "pageBlogsSection", ...curated("posts", "contact") },
    // <CtaSection /> (defaults)
    {
      _type: "ctaSection",
      title: "Explore How We Align Your CRM Systems With Your Business Initiatives.",
      buttonLabel: "Let's Connect",
      buttonHref: "/contact",
      backgroundImage: img("/images/cta-bg.webp"),
    },
  ],
};
