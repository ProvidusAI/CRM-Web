import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const serviceCaseStudiesSection = defineSection({
  name: "serviceCaseStudiesSection",
  title: "Case studies strip",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "caseStudies",
      title: "Case studies",
      type: "array",
      description: "The section is hidden when no case studies are selected.",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "inlineCards",
      title: "Inline cards",
      type: "array",
      description:
        "Cards typed in directly. Shown only when no case studies are selected above; selected case studies always win.",
      of: [
        defineArrayMember({
          type: "object",
          name: "inlineCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "slug",
              title: "Case study slug",
              type: "string",
              description: "The part after /case-studies/, e.g. my-project.",
              validation: (rule) => rule.required(),
            }),
            // The card writes the title as the image's alt text, so there is no alt field here.
            plainImageField("image", "Cover image"),
            defineField({ name: "label", title: "Label", type: "string", description: "Small blue line above the title, e.g. Health Cloud." }),
            defineField({ name: "category", title: "Category", type: "string", description: "Pill over the image, e.g. Healthcare." }),
          ],
          preview: { select: { title: "title", subtitle: "category", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "viewAllHref",
      title: "View all link",
      type: "string",
      description: "Shows a button beside the title, e.g. /case-studies. Leave empty for no button.",
    }),
    defineField({ name: "viewAllLabel", title: "View all label", type: "string", description: "Leave empty for the default." }),
  ],
  previewTitle: "title",
});
