import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const teamThoughtsSection = defineSection({
  name: "teamThoughtsSection",
  title: "Team quotes",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2, description: "Leave empty for the default." }),
    defineField({
      name: "members",
      title: "Team members",
      type: "array",
      description: "Leave empty for the four standard members. Phones show the same quotes as a carousel.",
      of: [
        defineArrayMember({
          type: "object",
          name: "teamMember",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", description: "Printed under the photo; also the photo's alt text." }),
            defineField({ name: "designation", title: "Designation", type: "string", description: "Printed under the name." }),
            defineField({ name: "displayName", title: "Name on the quote card", type: "string", description: "Leave empty to use the name." }),
            defineField({
              name: "fullDesignation",
              title: "Designation on the quote card",
              type: "string",
              description: "Leave empty to use the designation.",
            }),
            defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
            plainImageField("image", "Photo"),
          ],
          preview: { select: { title: "name", subtitle: "designation", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
