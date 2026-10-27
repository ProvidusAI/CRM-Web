import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const whatWeDoSection = defineSection({
  name: "whatWeDoSection",
  title: "What we do (tabs)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "tabs",
      title: "Tabs",
      type: "array",
      description: "Leave empty for the standard eight services.",
      of: [
        defineArrayMember({
          type: "object",
          name: "tab",
          fields: [
            defineField({ name: "label", title: "Tab label", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 8, description: "A blank line starts a new paragraph." }),
            defineField({ name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "linkHref", title: "Heading link", type: "string", description: "Leave empty for a plain heading." }),
            defineField({ name: "linkIsExternal", title: "Opens in a new tab", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label", subtitle: "heading" } },
        }),
      ],
    }),
    defineField({
      name: "backgroundOverlayColor",
      title: "Background tint",
      type: "string",
      description: "Leave empty for the default.",
      options: {
        list: [
          { title: "Blue (default)", value: "var(--color-tab-highlight)" },
          { title: "Grey", value: "#616161" },
        ],
      },
    }),
  ],
  previewTitle: "title",
});
