import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";
import { markHeadingField } from "./markHeading";

export const heroSection = defineSection({
  name: "heroSection",
  title: "Hero",
  fields: [
    markHeadingField("title", "Title"),
    defineField({ name: "subtitle", title: "Subtitle", type: "string", description: "Small line above the title." }),
    defineField({
      name: "subtitleAsH1",
      title: "Subtitle is the page heading (H1)",
      type: "boolean",
      description: "On: the subtitle becomes the page's H1 and the title an H2. Off: the title is the H1.",
      initialValue: false,
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] }),
    contentImageField("image", "Image"),
    defineField({
      name: "imageClassName",
      title: "Image fit",
      type: "string",
      description: "Leave empty for the default (cover).",
      options: {
        list: [
          { title: "Cover, centred (default)", value: "object-cover object-center" },
          { title: "Contain", value: "object-contain" },
          { title: "Contain, with padding", value: "object-contain p-4" },
          { title: "Contain, centred", value: "object-contain object-center" },
        ],
      },
    }),
    defineField({ name: "hideImage", title: "Hide image (short centred hero)", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "ctaVariant",
      title: "Button style",
      type: "string",
      description: "Leave empty for the default (white).",
      options: { list: [{ title: "White (default)", value: "white" }, { title: "Filled", value: "filled" }], layout: "radio", direction: "horizontal" },
    }),
    defineField({
      name: "ctaSize",
      title: "Button size",
      type: "string",
      description: "Leave empty for the default (medium).",
      options: { list: [{ title: "Medium (default)", value: "md" }, { title: "Small", value: "sm" }], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "hideCta", title: "Hide button", type: "boolean", initialValue: false }),
  ],
  previewTitle: "title.text",
});
