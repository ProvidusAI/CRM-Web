import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const expertiseStackSection = defineSection({
  name: "expertiseStackSection",
  title: "Platform cards (stacking)",
  fields: [
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      description: "Leave empty for the standard set of Salesforce clouds.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stackCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the picture's alt text." }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            defineField({
              name: "color",
              title: "Accent colour",
              type: "string",
              options: {
                list: [
                  { title: "Blue", value: "var(--color-explore-blue)" },
                  { title: "Purple", value: "var(--color-explore-purple)" },
                  { title: "Orange", value: "var(--color-explore-orange)" },
                  { title: "Lavender", value: "var(--color-explore-lavender)" },
                  { title: "Sky", value: "var(--color-explore-sky)" },
                  { title: "Violet", value: "var(--color-explore-violet)" },
                  { title: "Teal", value: "var(--color-explore-teal)" },
                ],
              },
            }),
            plainImageField("icon", "Icon"),
            plainImageField("image", "Picture"),
            defineField({ name: "href", title: "Link", type: "string", description: "The arrow links here. Leave empty for a plain arrow." }),
            defineField({
              name: "hidden",
              title: "Hide this card",
              type: "boolean",
              description: "Keeps the card out of the stack until its page is ready.",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "title", subtitle: "subtitle", media: "icon" } },
        }),
      ],
    }),
  ],
});
