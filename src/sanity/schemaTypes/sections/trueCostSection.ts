import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const trueCostSection = defineSection({
  name: "trueCostSection",
  title: "Cost breakdown",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({ name: "intro", title: "Lead-in paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "costCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 6, description: "A blank line starts a new paragraph." }),
            defineField({ name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] }),
            defineField({
              name: "background",
              title: "Card background",
              type: "string",
              initialValue: "var(--color-cost-card-green)",
              options: {
                list: [
                  { title: "Green", value: "var(--color-cost-card-green)" },
                  { title: "Blue", value: "var(--color-cost-card-blue)" },
                ],
              },
            }),
            defineField({
              name: "iconColor",
              title: "Icon tile colour",
              type: "string",
              initialValue: "var(--color-brand-green)",
              options: {
                list: [
                  { title: "Green", value: "var(--color-brand-green)" },
                  { title: "Blue", value: "var(--color-cost-icon-blue)" },
                ],
              },
            }),
            plainImageField("icon", "Icon"),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
    defineField({ name: "panelTitle", title: "Panel title", type: "string" }),
    defineField({
      name: "highlights",
      title: "Panel highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "label", subtitle: "text" } },
        }),
      ],
    }),
  ],
  previewTitle: "heading.text",
});
