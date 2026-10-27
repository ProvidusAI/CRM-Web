import { defineField } from "sanity";
import { defineSection } from "./defineSection";

// The form itself (fields, validation, /api/contact) stays in code.
export const contactSection = defineSection({
  name: "contactSection",
  title: "Contact form",
  fields: [
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2, description: "Leave empty for the default." }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2, description: "A new line becomes a line break. Leave empty for the default." }),
    defineField({ name: "email", title: "Email", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "phone", title: "Phone", type: "string", description: "Leave empty for the default." }),
  ],
});
