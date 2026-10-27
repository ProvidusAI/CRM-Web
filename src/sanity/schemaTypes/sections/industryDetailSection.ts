import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const industryDetailSection = defineSection({
  name: "industryDetailSection",
  title: "Industry stack",
  fields: [
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      description: "Cards that stack as the visitor scrolls. Leave empty for the six standard industries.",
      of: [
        defineArrayMember({
          type: "object",
          name: "industry",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the image's alt text." }),
            plainImageField("image", "Image"),
            defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
            defineField({ name: "href", title: "Link", type: "string", description: "Optional. The title links here when set." }),
          ],
          preview: { select: { title: "title", subtitle: "description", media: "image" } },
        }),
      ],
    }),
  ],
  previewTitle: "industries.0.title",
});
