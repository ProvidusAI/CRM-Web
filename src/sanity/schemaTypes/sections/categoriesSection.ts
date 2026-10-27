import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const categoriesSection = defineSection({
  name: "categoriesSection",
  title: "Service categories",
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      description: "Shown two per row. Leave empty for the eight standard services.",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceCategory",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "boxGradient",
              title: "Card colour",
              type: "string",
              description: "Leave empty to use the default for this position.",
              options: {
                list: [
                  { title: "Blue", value: "linear-gradient(174.14deg, rgba(220, 239, 255, 0) 8.64%, #DCEFFF 105.18%)" },
                  { title: "Purple", value: "linear-gradient(185.05deg, rgba(222, 220, 255, 0) 8.14%, #DEDCFF 99.18%)" },
                  { title: "Green", value: "linear-gradient(185.05deg, rgba(220, 255, 229, 0) 8.14%, #DCFFE5 99.18%)" },
                  { title: "Orange", value: "linear-gradient(174.14deg, rgba(255, 237, 220, 0) 8.64%, #FFEDDC 105.18%)" },
                ],
              },
            }),
            defineField({
              name: "iconGradient",
              title: "Icon tile colour",
              type: "string",
              description: "Leave empty to use the default for this position.",
              options: {
                list: [
                  { title: "Blue", value: "linear-gradient(180deg, #8BC9FF 0%, #F8FBFF 136.56%)" },
                  { title: "Purple", value: "linear-gradient(180deg, #D4D1FF 0%, #F8FBFF 136.56%)" },
                  { title: "Green", value: "linear-gradient(180deg, #9EFFB8 0%, #F8FBFF 136.56%)" },
                  { title: "Orange", value: "linear-gradient(180deg, #F6CBA5 0%, #F8FBFF 136.56%)" },
                ],
              },
            }),
            defineField({ name: "href", title: "Link", type: "string", description: "The title links here. Leave empty for a plain title." }),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
  ],
});
