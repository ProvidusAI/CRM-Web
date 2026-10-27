import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const exploreSection = defineSection({
  name: "exploreSection",
  title: "Explore tiles",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "tiles",
      title: "Tiles",
      type: "array",
      description:
        "Three tiles, in order: the tall one on the left, then the two stacked on the right. Their colours follow the position. Anything left empty keeps the standard tile's value.",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "exploreTile",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
            contentImageField("image", "Illustration"),
          ],
          preview: { select: { title: "title", subtitle: "href", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
