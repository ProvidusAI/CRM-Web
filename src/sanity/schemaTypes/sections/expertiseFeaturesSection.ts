import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const expertiseFeaturesSection = defineSection({
  name: "expertiseFeaturesSection",
  title: "Feature cards",
  fields: [
    defineField({
      name: "features",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "featureCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "text", rows: 2, description: "A new line becomes a line break. Also used as the icon's alt text." }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
  ],
});
