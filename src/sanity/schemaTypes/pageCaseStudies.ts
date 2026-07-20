import { defineField, defineType } from "sanity";

const pageOptions = [
  {
    title: "Platform Expertise — Sales Cloud",
    value: "salesforce-sales-cloud-consulting",
  },
  {
    title: "Platform Expertise — Service Cloud",
    value: "salesforce-service-cloud-consulting",
  },
  {
    title: "Platform Expertise — Marketing Cloud",
    value: "salesforce-marketing-cloud-consulting",
  },
  {
    title: "Platform Expertise — Experience Cloud",
    value: "salesforce-experience-cloud-consulting",
  },
  {
    title: "Platform Expertise — Data Cloud",
    value: "salesforce-data-cloud-consulting",
  },
  { title: "Industries", value: "industries" },
  {
    title: "Industries — Nonprofit",
    value: "salesforce-nonprofit-consulting",
  },
];

export const pageCaseStudies = defineType({
  name: "pageCaseStudies",
  title: "Page case studies",
  type: "document",
  description:
    "Choose which case studies appear on a specific page. Service pages are configured on the service page document instead.",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "Only used inside Sanity.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageKey",
      title: "Website page",
      type: "string",
      description: "The page these case studies will appear on.",
      options: {
        list: pageOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      type: "string",
      description:
        "Optional. Overrides the default heading shown above the case studies.",
    }),
    defineField({
      name: "caseStudies",
      title: "Case studies",
      type: "array",
      description:
        "Select and order the case studies shown on this page. Leave empty to hide the section.",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pageKey",
    },
  },
});
