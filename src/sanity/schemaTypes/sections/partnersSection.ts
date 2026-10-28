import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { altField } from "./alt";

export const partnersSection = defineSection({
  name: "partnersSection",
  title: "Trusted by (partner logos)",
  fields: [
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      description: "Leave empty for the standard partner strip.",
      of: [{ type: "image", fields: [altField] }],
    }),
  ],
});
