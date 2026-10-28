import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const featuredRolesSection = defineSection({
  name: "featuredRolesSection",
  title: "Featured roles carousel",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      description: "One card each. Leave empty for the five standard roles.",
      of: [
        defineArrayMember({
          type: "object",
          name: "featuredRole",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "details",
              title: "Details",
              type: "array",
              description: "Bullet points under the title, such as salary, location and contract type.",
              of: [{ type: "string" }],
            }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
