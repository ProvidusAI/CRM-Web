import { defineField } from "sanity";

export const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describe the image for screen readers. Leave empty only for decorative images.",
});

/** An image people read (photos, logos): carries alt text. */
export const contentImageField = (name: string, title: string) =>
  defineField({ name, title, type: "image", options: { hotspot: true }, fields: [altField] });

/** A background, texture or icon chip: no alt text, rendered decoratively. */
export const plainImageField = (name: string, title: string) =>
  defineField({ name, title, type: "image" });
