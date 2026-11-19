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
            defineField({
              name: "body",
              title: "Text",
              type: "array",
              description: "Select some text to make it bold or turn it into a link.",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                  marks: {
                    decorators: [{ title: "Bold", value: "strong" }],
                    annotations: [
                      defineField({
                        name: "link",
                        title: "Link",
                        type: "object",
                        fields: [
                          defineField({
                            name: "href",
                            title: "URL",
                            type: "url",
                            description: "A full URL, or a site path like /services/salesforce-consulting-services.",
                            validation: (rule) =>
                              rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                          }),
                          defineField({ name: "openInNewTab", title: "Open in a new tab", type: "boolean", initialValue: false }),
                        ],
                      }),
                    ],
                  },
                }),
              ],
            }),
            // Pre-rich-text content, migrated into `body` on 2026-11-19 and kept
            // hidden rather than deleted. Only read when a tab has no `body`.
            defineField({ name: "text", title: "Text (legacy)", type: "text", hidden: true, deprecated: { reason: "Use Text (rich) instead." } }),
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
