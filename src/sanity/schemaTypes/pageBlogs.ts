import { defineField, defineType } from "sanity";

import { PAGE_BLOG_OPTIONS } from "@/lib/pageKeys";

export const pageBlogs = defineType({
  name: "pageBlogs",
  title: "Page blogs",
  type: "document",
  description:
    "Choose which blog posts appear on a specific page, above the closing call to action. Leave a page unconfigured to hide the section there.",
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
      description: "The page these blog posts will appear on.",
      options: {
        list: PAGE_BLOG_OPTIONS,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      type: "string",
      description:
        "Optional. Overrides the default heading shown above the posts.",
    }),
    defineField({
      name: "posts",
      title: "Blog posts",
      type: "array",
      description:
        "Select and order the posts shown on this page. Leave empty to hide the section.",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
