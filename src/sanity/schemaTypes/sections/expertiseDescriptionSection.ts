import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { markHeadingField } from "./markHeading";

export const expertiseDescriptionSection = defineSection({
  name: "expertiseDescriptionSection",
  title: "Heading with paragraphs",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
    defineField({ name: "ctaText", title: "Button label", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "hideCta",
      title: "Hide button",
      type: "boolean",
      description: "Use when this block leads straight into cards and a button would crowd it.",
      initialValue: false,
    }),
  ],
  previewTitle: "heading.text",
});
