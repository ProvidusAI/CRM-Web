import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { markHeadingField } from "./markHeading";

export const comparisonSection = defineSection({
  name: "comparisonSection",
  title: "Versus comparison",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({ name: "negativeTitle", title: "Left card title", type: "string" }),
    defineField({ name: "negativeItems", title: "Left card items", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "positiveTitle", title: "Right card title", type: "string" }),
    defineField({ name: "positiveItems", title: "Right card items", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "footnote", title: "Footnote", type: "text", rows: 3 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string", description: "Both button fields are needed for the button to show." }),
    defineField({ name: "buttonHref", title: "Button link", type: "string" }),
  ],
  previewTitle: "heading.text",
});
