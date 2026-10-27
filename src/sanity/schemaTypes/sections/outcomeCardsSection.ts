import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const outcomeCardsSection = defineSection({
  name: "outcomeCardsSection",
  title: "Outcome cards",
  fields: [
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      description: "A row of cards that fills the width, up to four across.",
      of: [
        defineArrayMember({
          type: "object",
          name: "outcomeCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "text", rows: 2, description: "A new line becomes a line break." }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            plainImageField("icon", "Icon"),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
  ],
  previewTitle: "cards.0.title",
});
