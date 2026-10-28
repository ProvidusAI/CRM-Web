import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField, plainImageField } from "./alt";

export const whyBandSection = defineSection({
  name: "whyBandSection",
  title: "Why us band (blue background)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    plainImageField("backgroundImage", "Background image"),
    defineField({
      name: "reasons",
      title: "Reason cards",
      type: "array",
      description: "White cards on the left. Leave empty for the four standard cards.",
      of: [
        defineArrayMember({
          type: "object",
          name: "whyReason",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "titleClass",
              title: "Title colour",
              type: "string",
              options: {
                list: [
                  { title: "Sky blue", value: "text-[#54a9da]" },
                  { title: "Periwinkle", value: "text-[#769aeb]" },
                  { title: "Orange", value: "text-[#eb8c3f]" },
                  { title: "Salesforce blue", value: "text-salesforce-blue" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
    contentImageField("image", "Photo"),
  ],
  previewTitle: "title",
});
