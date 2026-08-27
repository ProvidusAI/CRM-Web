import { defineField, defineType } from "sanity";
import { slugField } from "./slugField";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField("title"),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "resultSummary",
      title: "Result summary",
      type: "string",
      description: "Short measurable result shown on cards and hero areas.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "blockContent",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "blockContent",
    }),
    defineField({
      name: "body",
      title: "Additional body",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
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
      subtitle: "clientName",
      media: "coverImage",
    },
  },
});
