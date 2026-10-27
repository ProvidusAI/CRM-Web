import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const expertiseImplementationSection = defineSection({
  name: "expertiseImplementationSection",
  title: "Image and text rows (industries we impact)",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({
      name: "items",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "implementationRow",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the image's alt text." }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            plainImageField("image", "Image"),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "heading.text",
});
