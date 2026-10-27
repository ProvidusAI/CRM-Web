import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const serviceBenefitsSection = defineSection({
  name: "serviceBenefitsSection",
  title: "Benefit steps",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "benefit",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
            defineField({
              name: "iconKey",
              title: "Icon",
              type: "string",
              description: "Leave empty for the ROI icon.",
              options: {
                list: [
                  { title: "ROI", value: "roi" },
                  { title: "User adoption", value: "adoption" },
                  { title: "Platform maturity", value: "maturity" },
                  { title: "Lifecycle visibility", value: "visibility" },
                  { title: "360 view", value: "view360" },
                  { title: "Partnership", value: "partnership" },
                  { title: "Review (clipboard)", value: "review" },
                  { title: "Plan (workflow)", value: "plan" },
                  { title: "Configure (cog)", value: "configure" },
                  { title: "Test (checked file)", value: "test" },
                  { title: "Launch and support (hands)", value: "launch" },
                ],
              },
            }),
            defineField({
              name: "colorTheme",
              title: "Colour",
              type: "string",
              description: "Leave empty for blue.",
              options: {
                list: [
                  { title: "Blue", value: "blue" },
                  { title: "Green", value: "green" },
                  { title: "Yellow", value: "yellow" },
                  { title: "Peach", value: "peach" },
                  { title: "Pink", value: "pink" },
                  { title: "Purple", value: "purple" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
