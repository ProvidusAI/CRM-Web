import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField, plainImageField } from "./alt";

export const whyChooseSection = defineSection({
  name: "whyChooseSection",
  title: "Why choose us",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "reasons",
      title: "Reasons",
      type: "array",
      description: "Leave empty for the three standard reasons.",
      of: [
        defineArrayMember({
          type: "object",
          name: "reason",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            defineField({
              name: "color",
              title: "Title colour",
              type: "string",
              description: "Leave empty to use the default for this position.",
              options: {
                list: [
                  { title: "Indigo", value: "var(--color-soft-indigo)" },
                  { title: "Purple", value: "var(--color-soft-purple)" },
                  { title: "Salesforce blue", value: "var(--color-salesforce-blue)" },
                  { title: "Brand green", value: "var(--color-brand-green)" },
                  { title: "Teal", value: "var(--color-explore-teal)" },
                  { title: "Gold", value: "#C08A2E" },
                  { title: "Brown", value: "#A9714B" },
                ],
              },
            }),
            plainImageField("icon", "Icon"),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
    contentImageField("image", "Image"),
    defineField({
      name: "backgroundOverlayColor",
      title: "Background tint",
      type: "string",
      description: "Leave empty for the default.",
      options: {
        list: [
          { title: "Blue (default)", value: "var(--color-tab-highlight)" },
          { title: "Grey", value: "#616161" },
        ],
      },
    }),
  ],
  previewTitle: "title",
});
