import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const organisationTypesSection = defineSection({
  name: "organisationTypesSection",
  title: "Accordion with images",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Accordion items",
      type: "array",
      description: "The first item opens by default.",
      of: [
        defineArrayMember({
          type: "object",
          name: "accordionItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "images",
      title: "Stacked images",
      type: "array",
      description: "Shown beside the accordion. Decorative, so they carry no alt text. Leave empty for none.",
      of: [defineArrayMember({ type: "image", name: "stackedImage" })],
    }),
  ],
  previewTitle: "title",
});
