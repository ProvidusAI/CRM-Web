import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const believeSection = defineSection({
  name: "believeSection",
  title: "Value cards",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      description: "Leave empty for the four standard values.",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", description: "Also used as the icon's alt text." }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
            plainImageField("icon", "Icon or logo"),
            plainImageField("bgImage", "Cover background"),
            defineField({
              name: "bgColor",
              title: "Cover colour",
              type: "string",
              description: "Shown when there is no cover background. Leave empty for the default.",
              options: { list: [{ title: "Light blue (default)", value: "var(--color-brand-blue-light)" }] },
            }),
            defineField({ name: "href", title: "Link", type: "string", description: "The title links here. Leave empty for a plain title." }),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
