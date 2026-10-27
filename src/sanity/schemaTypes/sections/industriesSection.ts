import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const industriesSection = defineSection({
  name: "industriesSection",
  title: "Industries grid",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "items",
      title: "Industries",
      type: "array",
      description: "Leave empty for the six standard industry clouds.",
      of: [
        defineArrayMember({
          type: "object",
          name: "industry",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the picture's alt text." }),
            defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
            plainImageField("image", "Picture"),
            defineField({ name: "href", title: "Link", type: "string", description: "The title links here. Leave empty for a plain title." }),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
