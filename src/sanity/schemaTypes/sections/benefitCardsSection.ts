import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField, plainImageField } from "./alt";

export const benefitCardsSection = defineSection({
  name: "benefitCardsSection",
  title: "Benefit cards (image + scroller)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    contentImageField("image", "Image"),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      description: "On desktop the list is as tall as the image and scrolls when there are more cards than fit.",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
            plainImageField("icon", "Icon (white SVG, 36px)"),
          ],
          preview: { select: { title: "title", subtitle: "description", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
