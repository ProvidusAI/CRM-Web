import { defineField, defineType } from "sanity";
import { STATIC_PAGE_OPTIONS } from "@/lib/pageKeys";

// Sourced from src/lib/pageKeys.ts — see staticPageSeo.ts. This list previously
// drifted and was missing Contact.
const pageOptions = [...STATIC_PAGE_OPTIONS];

export const sitePageJsonLd = defineType({
  name: "sitePageJsonLd",
  title: "Static page JSON-LD",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: pageOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD",
      type: "jsonLd",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
