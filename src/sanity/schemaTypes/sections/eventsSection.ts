import { defineArrayMember, defineField } from "sanity";
import { defineSection } from "./defineSection";
import { contentImageField, plainImageField } from "./alt";

export const eventsSection = defineSection({
  name: "eventsSection",
  title: "Events carousel",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "events",
      title: "Events",
      type: "array",
      description: "Leave empty for the four standard events. An event without a background or logo is left out.",
      of: [
        defineArrayMember({
          type: "object",
          name: "event",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
            plainImageField("bg", "Background"),
            contentImageField("logo", "Logo"),
            defineField({
              name: "logoWidth",
              title: "Logo width (px)",
              type: "number",
              description: "Display width. Logos are exported at 2x, so this is usually half the file's width. Leave empty to use half.",
              validation: (r) => r.integer().positive(),
            }),
            defineField({
              name: "logoHeight",
              title: "Logo height (px)",
              type: "number",
              description: "Display height. Leave empty to use half the file's height.",
              validation: (r) => r.integer().positive(),
            }),
            defineField({
              name: "photos",
              title: "Photos",
              type: "array",
              description: "They scroll in two columns, alternating. Decorative, so they have no alt text.",
              of: [{ type: "image", options: { hotspot: true } }],
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
  ],
  previewTitle: "title",
});
