import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const talentPillsSection = defineSection({
  name: "talentPillsSection",
  title: "Talent pills (scrolling rows)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      description: "Each row scrolls sideways on its own. Leave empty for the two standard rows.",
      of: [
        defineArrayMember({
          type: "object",
          name: "talentPillsRow",
          fields: [
            defineField({
              name: "variant",
              title: "Colour",
              type: "string",
              description: "Leave empty for blue.",
              options: {
                list: [
                  { title: "Blue", value: "blue" },
                  { title: "Green", value: "green" },
                ],
              },
            }),
            defineField({ name: "reverse", title: "Scroll the other way", type: "boolean", initialValue: false }),
            defineField({ name: "roles", title: "Roles", type: "array", of: [{ type: "string" }] }),
          ],
          preview: {
            select: { title: "roles.0", subtitle: "variant" },
            prepare: ({ title, subtitle }) => ({ title: title || "Row", subtitle }),
          },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
