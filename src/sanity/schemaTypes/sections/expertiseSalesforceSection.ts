import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const expertiseSalesforceSection = defineSection({
  name: "expertiseSalesforceSection",
  title: "Certified partner (text and image)",
  fields: [
    markHeadingField("heading", "Heading"),
    defineField({ name: "text", title: "Text", type: "text", rows: 4, description: "One block of copy. Ignored when paragraphs are added." }),
    defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 3 }], description: "Use these for several paragraphs." }),
    contentImageField("image", "Image"),
    defineField({
      name: "imageVariant",
      title: "Image style",
      type: "string",
      description: "Leave empty for the default (badge on white).",
      options: {
        list: [
          { title: "Badge, no frame (default)", value: "contain" },
          { title: "Framed photo (portrait)", value: "framed" },
          { title: "Framed photo (landscape)", value: "framed-wide" },
        ],
      },
    }),
    defineField({
      name: "hideMark",
      title: "Hide the green squiggle above the heading",
      type: "boolean",
      description: "Turn on when the heading already has a squiggle of its own.",
      initialValue: false,
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", description: "The button shows only when both label and link are set." }),
    defineField({ name: "ctaHref", title: "Button link", type: "string" }),
  ],
  previewTitle: "heading.text",
});
