import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const processStepsSection = defineSection({
  name: "processStepsSection",
  title: "Process steps (image icons)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      description: "Joined by a dashed line. Leave empty for the six standard steps.",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "gradient",
              title: "Card tint",
              type: "string",
              description: "The colour the card fades to at the bottom. Leave empty for none.",
              options: {
                list: [
                  { title: "Light blue", value: "to-[#dcf1ff]" },
                  { title: "Light green", value: "to-[#dcffee]" },
                  { title: "Light yellow", value: "to-[#fffbdc]" },
                  { title: "Light peach", value: "to-[#ffebdc]" },
                  { title: "Light pink", value: "to-[#ffdcf8]" },
                  { title: "Light purple", value: "to-[#e5dcff]" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
