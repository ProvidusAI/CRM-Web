import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const expertiseSection = defineSection({
  name: "expertiseSection",
  title: "Platform expertise (cards)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      description: "Leave empty for the standard set of Salesforce clouds.",
      of: [
        defineArrayMember({
          type: "object",
          name: "expertiseCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the icon's alt text." }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            plainImageField("icon", "Icon"),
            defineField({
              name: "shadow",
              title: "Card accent",
              type: "string",
              options: {
                list: [
                  { title: "Cyan", value: "0px 4.36px 0px 0px #0D9DDA" },
                  { title: "Blue", value: "0px 4.36px 0px 0px #1D70C5" },
                  { title: "Amber", value: "0px 4.36px 0px 0px #F4AC3B" },
                  { title: "Steel blue", value: "0px 4.36px 0px 0px #3276BA" },
                  { title: "Coral", value: "0px 4.36px 0px 0px #F45A3E" },
                  { title: "Periwinkle", value: "0px 4.36px 0px 0px #8A8FD2" },
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
