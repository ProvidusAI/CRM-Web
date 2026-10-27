import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

export const salesforceConsultCtaSection = defineSection({
  name: "salesforceConsultCtaSection",
  title: "Consultant CTA card",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "buttonHref", title: "Button link", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "backgroundColor",
      title: "Background",
      type: "string",
      description: "Leave empty for the default (blue).",
      options: {
        list: [
          { title: "Blue (default)", value: "var(--color-consult-blue)" },
          {
            title: "Green gradient",
            value: "linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)",
          },
        ],
      },
    }),
    defineField({
      name: "buttonVariant",
      title: "Button style",
      type: "string",
      description: "White for backgrounds the green button would disappear into. Leave empty for the default (filled).",
      options: { list: [{ title: "Filled (default)", value: "filled" }, { title: "White", value: "white" }], layout: "radio", direction: "horizontal" },
    }),
    contentImageField("image", "Image"),
  ],
  previewTitle: "title",
});
