import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const statCardsSection = defineSection({
  name: "statCardsSection",
  title: "Stat cards",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      description: "Four cards fit one row. Each shows a big value on a blue tile, or an image instead of the value.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: "e.g. £50M+. Ignored when an image is set." }),
            plainImageField("image", "Image (instead of the value)"),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
