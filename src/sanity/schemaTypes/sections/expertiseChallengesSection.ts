import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const expertiseChallengesSection = defineSection({
  name: "expertiseChallengesSection",
  title: "Challenge cards (staircase)",
  fields: [
    markHeadingField("title", "Title"),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "challengeCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "text", rows: 2, description: "A new line becomes a line break." }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "title.text",
});
