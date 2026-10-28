import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const recruitmentIntroSection = defineSection({
  name: "recruitmentIntroSection",
  title: "Recruitment intro band",
  fields: [
    plainImageField("icon", "Icon"),
    defineField({
      name: "lead",
      title: "Lead text",
      type: "text",
      rows: 3,
      description: "The sentence before the bold part. Leave empty for the default.",
    }),
    defineField({
      name: "highlight",
      title: "Bold text",
      type: "text",
      rows: 3,
      description: "Shown bold and blue after the lead text. Leave empty for the default.",
    }),
  ],
  previewTitle: "lead",
});
