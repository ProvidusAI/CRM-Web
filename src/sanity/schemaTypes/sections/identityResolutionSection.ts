import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const identityResolutionSection = defineSection({
  name: "identityResolutionSection",
  title: "Identity resolution explainer",
  fields: [
    defineField({ name: "headingStart", title: "Heading, first line", type: "string", description: "Leave empty for the default. The green squiggle follows the second line." }),
    defineField({ name: "headingEnd", title: "Heading, second line", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "introParagraphs", title: "Intro paragraphs", type: "array", of: [{ type: "text", rows: 3 }], description: "Leave empty for the default." }),
    contentImageField("desktopImage", "Diagram (desktop)"),
    contentImageField("mobileImage", "Diagram (mobile)"),
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      description: "Three columns lay out best. Leave empty for the default.",
      of: [
        defineArrayMember({
          type: "object",
          name: "identityColumn",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  previewTitle: "headingStart",
});
