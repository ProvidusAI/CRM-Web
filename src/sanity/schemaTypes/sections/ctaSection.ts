import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const ctaSection = defineSection({
  name: "ctaSection",
  title: "CTA band",
  fields: [
    defineField({ name: "title", title: "Title", type: "text", rows: 2, description: "A new line becomes a line break. Leave empty for the default." }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "buttonHref", title: "Button link", type: "string", description: "Leave empty for the default." }),
    plainImageField("backgroundImage", "Background image"),
  ],
  previewTitle: "title",
});
