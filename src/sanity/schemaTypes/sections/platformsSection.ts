import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { altField } from "./alt";

export const platformsSection = defineSection({
  name: "platformsSection",
  title: "Platform logos",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      description: "Leave empty for the standard twelve platform logos.",
      of: [{ type: "image", options: { hotspot: true }, fields: [altField] }],
    }),
  ],
  previewTitle: "title",
});
