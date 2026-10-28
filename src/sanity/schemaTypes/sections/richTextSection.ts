import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const richTextSection = defineSection({
  name: "richTextSection",
  title: "Rich text page",
  fields: [
    defineField({
      name: "title",
      title: "Page heading",
      type: "string",
      description: "Shown as the page's main heading.",
    }),
    defineField({
      name: "subtitle",
      title: "Line under the heading",
      type: "string",
      description: 'Optional, e.g. "Last updated: 24-06-2026".',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Address (keeps line breaks)", value: "address" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }],
            annotations: [
              defineField({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
