import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { markHeadingField } from "./markHeading";

export const splitComparisonSection = defineSection({
  name: "splitComparisonSection",
  title: "Split comparison cards",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      description: "Cards alternate left and right. An odd count centres the last card.",
      of: [
        defineArrayMember({
          type: "object",
          name: "comparisonCard",
          fields: [
            markHeadingField("title", "Title"),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            defineField({
              name: "color",
              title: "Border colour",
              type: "string",
              initialValue: "#33FF00",
              options: {
                list: [
                  { title: "Green", value: "#33FF00" },
                  { title: "Blue", value: "#308FFF" },
                  { title: "Purple", value: "#8800FF" },
                  { title: "Amber", value: "#FFB030" },
                  { title: "Orange", value: "#FFA530" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title.text", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "className",
      title: "Background",
      type: "string",
      description: "Leave empty for the default.",
      options: {
        list: [
          { title: "Grey with green border (default)", value: "bg-[#F6F6F6] border-y border-[#38A81B] mt-20" },
          { title: "White to light blue", value: "bg-linear-to-b from-white to-brand-blue-light" },
        ],
      },
    }),
  ],
  previewTitle: "heading.text",
});
