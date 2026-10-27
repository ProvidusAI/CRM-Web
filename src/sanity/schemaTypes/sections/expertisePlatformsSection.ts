import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const expertisePlatformsSection = defineSection({
  name: "expertisePlatformsSection",
  title: "Platform expertise (carousel)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "items",
      title: "Platform cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "platformCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "bgGradient",
              title: "Card background",
              type: "string",
              options: {
                list: [
                  { title: "Pink", value: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)" },
                  { title: "Light blue", value: "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)" },
                  { title: "Lavender", value: "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)" },
                  { title: "Pale blue", value: "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)" },
                  { title: "Mint", value: "linear-gradient(59.61deg, #F4F4F4 45%, #DBFFFB 119.24%)" },
                  { title: "Light green", value: "linear-gradient(59.61deg, #F4F4F4 45%, #D8FFE0 119.24%)" },
                  { title: "Cream", value: "linear-gradient(59.61deg, #F4F4F4 45%, #FFF3D8 119.24%)" },
                ],
              },
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "Where the title links to. Leave empty to use the platform's own page when the title matches one (Agentforce, Sales Cloud, ...).",
            }),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
  ],
});
