import { defineField, defineType } from "sanity";
import { STATIC_PAGE_OPTIONS } from "@/lib/pageKeys";

// Sourced from src/lib/pageKeys.ts so this dropdown, the JSON-LD dropdown, and
// the StaticPageKey union can never drift apart. Add new pages there.
const pageOptions = [...STATIC_PAGE_OPTIONS];

export const staticPageSeo = defineType({
  name: "staticPageSeo",
  title: "Static page SEO",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Only used inside Sanity.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Website page",
      type: "string",
      options: {
        list: pageOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO metadata",
      type: "seo",
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD",
      type: "jsonLd",
      description:
        "Optional structured data for this page. This replaces the legacy Static page JSON-LD document when set.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
