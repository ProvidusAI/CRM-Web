import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField } from "./alt";

// The crops the Figma frame uses. Empty means a plain centred cover crop.
const cropField = (list: { title: string; value: string }[]) =>
  defineField({
    name: "crop",
    title: "Crop",
    type: "string",
    description: "Leave empty for a plain centred crop.",
    options: { list },
  });

const photo = (name: string, crop: { title: string; value: string }[]) =>
  defineArrayMember({
    type: "object",
    name,
    fields: [contentImageField("image", "Photo"), cropField(crop)],
    preview: { select: { title: "image.alt", media: "image" } },
  });

export const teamGallerySection = defineSection({
  name: "teamGallerySection",
  title: "Team photo gallery",
  fields: [
    defineField({ name: "headingStart", title: "Heading, first line", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "headingEnd",
      title: "Heading, second line",
      type: "string",
      description: "Leave empty for the default. It starts a new line from tablet width up.",
    }),
    defineField({
      name: "topRow",
      title: "Top row",
      type: "array",
      description: "Two photos, a wide one then a narrower one. Leave empty for the standard photos.",
      validation: (r) => r.max(2),
      of: [
        photo("topPhoto", [{ title: "Zoomed on the left of centre", value: "object-[32%_69%] origin-[32%_69%] scale-[1.29]" }]),
      ],
    }),
    defineField({
      name: "bottomRow",
      title: "Bottom row",
      type: "array",
      description: "Three equal photos. Leave empty for the standard photos.",
      validation: (r) => r.max(3),
      of: [
        photo("bottomPhoto", [
          { title: "Lower third", value: "object-[center_68%]" },
          { title: "Bottom", value: "object-[center_84%]" },
        ]),
      ],
    }),
  ],
  previewTitle: "headingStart",
});
