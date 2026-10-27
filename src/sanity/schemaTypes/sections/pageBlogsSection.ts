import { defineField } from "sanity";
import { defineSection } from "./defineSection";

export const pageBlogsSection = defineSection({
  name: "pageBlogsSection",
  title: "Blog posts strip",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Leave empty for the default." }),
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      description: "The section is hidden when no posts are selected.",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
  ],
  previewTitle: "title",
});
