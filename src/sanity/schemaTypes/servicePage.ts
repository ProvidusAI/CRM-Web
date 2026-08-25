import { createElement, type CSSProperties } from "react";
import { defineField, defineType, type FieldProps } from "sanity";

const iconKeyOptions = [
  { title: "ROI", value: "roi" },
  { title: "User adoption", value: "adoption" },
  { title: "Platform maturity", value: "maturity" },
  { title: "Lifecycle visibility", value: "visibility" },
  { title: "360 view", value: "view360" },
  { title: "Partnership", value: "partnership" },
];

const colorThemeOptions = [
  { title: "Blue", value: "blue" },
  { title: "Green", value: "green" },
  { title: "Yellow", value: "yellow" },
  { title: "Peach", value: "peach" },
  { title: "Pink", value: "pink" },
  { title: "Purple", value: "purple" },
];

const processIconOptions = [
  { title: "Analysis", value: "analysis" },
  { title: "Design", value: "design" },
  { title: "Strategy", value: "strategy" },
  { title: "Development", value: "development" },
  { title: "Release", value: "release" },
  { title: "Support", value: "support" },
];

const sectionOrderOptions = [
  { title: "Trusted partners", value: "partners", thumbnail: "/studio-thumbnails/partners.webp" },
  { title: "Certified section", value: "certified", thumbnail: "/studio-thumbnails/certified.webp" },
  { title: "Case studies", value: "caseStudies", thumbnail: "/studio-thumbnails/caseStudies.webp" },
  { title: "Tabs section", value: "tabs", thumbnail: "/studio-thumbnails/tabs.webp" },
  { title: "Consultant CTA (middle)", value: "consultantCta", thumbnail: "/studio-thumbnails/consultantCta.webp" },
  { title: "Benefits timeline", value: "benefits", thumbnail: "/studio-thumbnails/benefits.webp" },
  { title: "Salesforce process", value: "process", thumbnail: "/studio-thumbnails/process.webp" },
  { title: "Migration platforms", value: "migrationPlatforms", thumbnail: "/studio-thumbnails/migrationPlatforms.webp" },
  { title: "Expertise carousel", value: "expertise", thumbnail: "/studio-thumbnails/expertise.webp" },
  { title: "Industries grid", value: "industries", thumbnail: "/studio-thumbnails/industries.webp" },
  { title: "Why choose", value: "whyChoose", thumbnail: "/studio-thumbnails/whyChoose.webp" },
  { title: "FAQs", value: "faqs", thumbnail: "/studio-thumbnails/faqs.webp" },
  { title: "Footer CTA", value: "cta", thumbnail: "/studio-thumbnails/cta.webp" },
];

const defaultSectionOrder = sectionOrderOptions.map((option) => option.value);

const designColorOptions = [
  { title: "Brand Blue", value: "#1D70C5" },
  { title: "Brand Green", value: "#38A81B" },
  { title: "Consult CTA Blue", value: "#2898FF" },
  { title: "Salesforce Blue", value: "#00A1E0" },
  { title: "Soft Indigo", value: "#687DDA" },
  { title: "Soft Purple", value: "#A670DD" },
  { title: "Experience Orange", value: "#F45A3E" },
  { title: "Data Lavender", value: "#8A8FD2" },
  { title: "Agentforce Cyan", value: "#0D9DDA" },
  { title: "Marketing Gold", value: "#F4AC3B" },
];

const serviceImageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
      }),
    ],
  });

const sectionFieldWrapperStyle: CSSProperties = {
  margin: "20px 0",
};

const sectionHeadingStyle: CSSProperties = {
  background: "var(--card-muted-bg-color)",
  border: "1px solid var(--card-border-color)",
  borderRadius: "8px",
  marginBottom: "12px",
  padding: "14px 16px",
};

const sectionHeadingTextStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: "24px",
};

function ProminentSectionField(props: FieldProps) {
  const title = props.title || props.schemaType.title || props.name;

  return createElement(
    "div",
    { style: sectionFieldWrapperStyle },
    createElement(
      "div",
      { style: sectionHeadingStyle },
      createElement("div", { style: sectionHeadingTextStyle }, title)
    ),
    createElement("div", null, props.renderDefault({ ...props, title: undefined }))
  );
}

const prominentSectionComponents = {
  field: ProminentSectionField,
};

export const servicePage = defineType({
  name: "servicePage",
  title: "Salesforce service page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Page status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD",
      type: "jsonLd",
    }),
    defineField({
      name: "sectionOrder",
      title: "Section order",
      description:
        "Drag sections up or down to control the page order below the fixed hero section. Missing sections are appended in the default order.",
      type: "array",
      initialValue: defaultSectionOrder,
      validation: (rule) => rule.unique(),
      of: [
        defineField({
          name: "sectionKey",
          title: "Section",
          type: "string",
          options: { list: sectionOrderOptions },
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "badgeTitle",
          title: "Badge title",
          type: "string",
        }),
        defineField({
          name: "badgeSubtitle",
          title: "Badge subtitle",
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "bullets",
          title: "Bullet list",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "formTitle",
          title: "Form title",
          type: "string",
        }),
        defineField({
          name: "formButtonLabel",
          title: "Form button label",
          type: "string",
        }),
        serviceImageField("backgroundImage", "Background image"),
      ],
    }),
    defineField({
      name: "certified",
      title: "Certified section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "caseStudies",
      title: "Related case studies",
      description: "Select and order the case studies shown on this service page.",
      type: "array",
      components: prominentSectionComponents,
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "tabsSection",
      title: "Tabs section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "heading",
                  title: "Heading",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "link",
                  title: "Heading Link",
                  type: "object",
                  fields: [
                    defineField({
                      name: "linkType",
                      title: "Link Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "None", value: "none" },
                          { title: "Internal Reference", value: "internal" },
                          { title: "Custom/External URL", value: "external" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "none",
                    }),
                    defineField({
                      name: "internalLink",
                      title: "Internal Link",
                      type: "reference",
                      to: [{ type: "servicePage" }, { type: "post" }, { type: "caseStudy" }],
                      hidden: ({ parent }) => parent?.linkType !== "internal",
                    }),
                    defineField({
                      name: "externalUrl",
                      title: "Custom/External URL",
                      type: "url",
                      validation: Rule => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                      hidden: ({ parent }) => parent?.linkType !== "external",
                    }),
                  ]
                }),
                defineField({
                  name: "text",
                  title: "Body text",
                  type: "text",
                  rows: 5,
                }),
                defineField({
                  name: "bullets",
                  title: "Bullets",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "benefitsSection",
      title: "Benefits timeline",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "iconKey",
                  title: "Icon",
                  type: "string",
                  options: { list: iconKeyOptions },
                }),
                defineField({
                  name: "colorTheme",
                  title: "Color theme",
                  type: "string",
                  options: { list: colorThemeOptions },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "consultantCta",
      title: "Consultant CTA section",
      description:
        "Blue CTA section with consultant image, shown after the tabs section on Salesforce service pages.",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background color",
          type: "string",
          initialValue: "#2898FF",
          options: { list: designColorOptions },
        }),
        serviceImageField("image", "Consultant image"),
      ],
    }),
    defineField({
      name: "processSection",
      title: "Salesforce process section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 2,
          description: "Use a line break if the title should split over two lines.",
        }),
        defineField({
          name: "steps",
          title: "Process steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "iconKey",
                  title: "Icon",
                  type: "string",
                  options: { list: processIconOptions },
                }),
                defineField({
                  name: "colorTheme",
                  title: "Color theme",
                  type: "string",
                  options: {
                    list: [
                      { title: "Green", value: "green" },
                      { title: "Blue", value: "blue" },
                    ],
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "migrationPlatformsSection",
      title: "Migration platforms section",
      description:
        "Optional carousel for CRM platforms this Salesforce service migrates from.",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "text",
          rows: 2,
          description: "Use a line break if the title should split over two lines.",
        }),
        defineField({
          name: "items",
          title: "Platforms",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Platform name",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                serviceImageField("logo", "Logo"),
                defineField({
                  name: "text",
                  title: "Description",
                  type: "text",
                  rows: 4,
                }),
                defineField({
                  name: "colorTheme",
                  title: "Card color theme",
                  type: "string",
                  initialValue: "blue",
                  options: {
                    list: [
                      { title: "Blue", value: "blue" },
                      { title: "Green", value: "green" },
                    ],
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "expertiseSection",
      title: "Expertise carousel",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 4,
                }),
                serviceImageField("icon", "Icon image"),
                defineField({
                  name: "accentColor",
                  title: "Card accent color",
                  type: "string",
                  description: "Choose one of the approved design colors.",
                  options: { list: designColorOptions },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "industriesSection",
      title: "Industries grid",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                }),
                defineField({
                  name: "link",
                  title: "Heading link",
                  description:
                    "Optional. Makes the card heading clickable — e.g. /industries/salesforce-nonprofit-consulting. Leave empty for a static heading.",
                  type: "url",
                  validation: (rule) =>
                    rule.uri({
                      scheme: ["http", "https"],
                      allowRelative: true,
                    }),
                }),
                serviceImageField("image", "Image"),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whyChooseSection",
      title: "Why choose section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "reasons",
          title: "Reasons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 3,
                }),
                serviceImageField("icon", "Icon image"),
                defineField({
                  name: "color",
                  title: "Title color",
                  type: "string",
                  description: "Choose one of the approved design colors.",
                  options: { list: designColorOptions },
                }),
              ],
            },
          ],
        }),
        serviceImageField("image", "Right-side image"),
      ],
    }),
    defineField({
      name: "faqSection",
      title: "FAQ section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Frequently Asked Questions",
        }),
        defineField({
          name: "faqs",
          title: "FAQs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                  validation: (rule) => rule.required(),
                  rows: 3,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA section",
      type: "object",
      components: prominentSectionComponents,
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
          initialValue: "/contact",
        }),
        serviceImageField("backgroundImage", "Background image"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
    },
  },
});
