import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";

export const faqSection = defineSection({
  name: "faqSection",
  title: "FAQ",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Leave empty for "Frequently Asked Questions" on two lines.',
    }),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      description: "The section is hidden when there are no questions.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
