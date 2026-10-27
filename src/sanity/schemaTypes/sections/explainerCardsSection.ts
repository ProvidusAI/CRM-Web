import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const explainerCardsSection = defineSection({
  name: "explainerCardsSection",
  title: "Explainer cards",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({
      name: "iconVariant",
      title: "Icon style",
      type: "string",
      description: "Leave empty for the gradient tile.",
      options: {
        list: [
          { title: "Gradient tile", value: "tile" },
          { title: "Plain icon", value: "plain" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "explainerCard",
          fields: [
            markHeadingField("title", "Title"),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "cta",
              title: "Button",
              type: "object",
              description: "Both fields are needed for the button to show.",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "Link", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "title.text", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "heading.text",
});
