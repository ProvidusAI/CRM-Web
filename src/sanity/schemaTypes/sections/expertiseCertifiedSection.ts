import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { altField } from "./alt";

export const expertiseCertifiedSection = defineSection({
  name: "expertiseCertifiedSection",
  title: "Certification badges (scrolling strip)",
  fields: [
    defineField({
      name: "images",
      title: "Badges",
      type: "array",
      description: "Alt text left empty reads \"Certification 1\", \"Certification 2\", and so on.",
      of: [{ type: "image", options: { hotspot: true }, fields: [altField] }],
    }),
  ],
});
