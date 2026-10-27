import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const industryCtaSection = defineSection({
  name: "industryCtaSection",
  title: "Industry CTA card",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button link", type: "string" }),
    contentImageField("image", "Image"),
  ],
  previewTitle: "title",
});
