import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const solutionTypesSection = defineSection({
  name: "solutionTypesSection",
  title: "Solution type cards",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "solutionCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "color",
              title: "Border and icon colour",
              type: "string",
              initialValue: "var(--color-brand-green)",
              options: {
                list: [
                  { title: "Green", value: "var(--color-brand-green)" },
                  { title: "Teal", value: "var(--color-type-teal)" },
                  { title: "Purple", value: "var(--color-type-purple)" },
                  { title: "Magenta", value: "var(--color-type-magenta)" },
                  { title: "Amber", value: "var(--color-type-amber)" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "heading.text",
});
