import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const hiringModelsSection = defineSection({
  name: "hiringModelsSection",
  title: "Hiring models",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "models",
      title: "Cards",
      type: "array",
      description: "Stacked beside the photo. Leave empty for the two standard cards.",
      of: [
        defineArrayMember({
          type: "object",
          name: "hiringModel",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            defineField({
              name: "borderClass",
              title: "Border colour",
              type: "string",
              options: {
                list: [
                  { title: "Bright green", value: "border-[#33ff00]" },
                  { title: "Blue", value: "border-migration-blue" },
                ],
              },
            }),
            defineField({
              name: "shadowClass",
              title: "Shadow colour",
              type: "string",
              options: {
                list: [
                  { title: "Green glow", value: "shadow-[0_7px_14px_0_rgba(51,255,0,0.21)]" },
                  { title: "Blue glow", value: "shadow-[0_7px_14px_0_rgba(48,143,255,0.21)]" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    contentImageField("image", "Photo"),
  ],
  previewTitle: "title",
});
