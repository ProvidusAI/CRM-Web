import { defineField } from "sanity";
import { defineSection } from "./defineSection";

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
      name: "viewAllHref",
      title: "View all link",
      type: "string",
      description: "Shows a button beside the title, e.g. /case-studies. Leave empty for no button.",
    }),
    defineField({ name: "viewAllLabel", title: "View all label", type: "string", description: "Leave empty for the default." }),
  ],
  previewTitle: "title",
});
