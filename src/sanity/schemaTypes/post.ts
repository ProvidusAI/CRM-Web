import { defineField, defineType } from "sanity";
import { slugField } from "./slugField";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [{ name: "summary", title: "Summary card" }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField("title"),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summaryHeading",
      title: "Summary heading",
      description:
        "Shown in the blue card at the top of the article. The card only appears when both this and the text are filled.",
      type: "string",
      group: "summary",
    }),
    defineField({
      name: "summaryText",
      title: "Summary text",
      description: "Leave a blank line between paragraphs.",
      type: "text",
      rows: 6,
      group: "summary",
    }),
    defineField({
      name: "summaryPrimaryButton",
      title: "First button",
      description: "Leave empty to keep \"Let's Connect\" → /contact.",
      type: "object",
      group: "summary",
      fields: [
        defineField({ name: "label", title: "Label", type: "string", placeholder: "Let's Connect" }),
        defineField({
          name: "link",
          title: "Link",
          description: "A page on this site (/contact) or a full address (https://…).",
          type: "url",
          placeholder: "/contact",
          validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
        }),
      ],
    }),
    defineField({
      name: "summarySecondaryButton",
      title: "Second button",
      description: "Optional. Appears only when both the label and the link are filled.",
      type: "object",
      group: "summary",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({
          name: "link",
          title: "Link",
          description: "A page on this site (/case-studies) or a full address (https://…).",
          type: "url",
          validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
        }),
        defineField({
          name: "variant",
          title: "Style",
          type: "string",
          options: {
            list: [
              { title: "Green", value: "filled" },
              { title: "White", value: "white" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          initialValue: "filled",
        }),
      ],
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
      subtitle: "publishedAt",
      media: "heroImage",
    },
  },
});
