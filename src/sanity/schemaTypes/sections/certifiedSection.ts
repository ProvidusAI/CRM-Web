import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { markHeadingField } from "./markHeading";

export const certifiedSection = defineSection({
  name: "certifiedSection",
  title: "Certified expertise",
  fields: [
    markHeadingField("title", "Title"),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, description: "Leave empty for the default." }),
  ],
  previewTitle: "title.text",
});
