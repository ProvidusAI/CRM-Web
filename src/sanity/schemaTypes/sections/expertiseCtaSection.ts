import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const expertiseCtaSection = defineSection({
  name: "expertiseCtaSection",
  title: "Expertise CTA (two images)",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "titleHref", title: "Title link", type: "string", description: "Optional. Makes the heading a link." }),
    defineField({ name: "buttonText", title: "Button label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button link", type: "string" }),
    contentImageField("image1", "Image 1 (team photo)"),
    contentImageField("image2", "Image 2 (illustration)"),
  ],
  previewTitle: "title",
});
