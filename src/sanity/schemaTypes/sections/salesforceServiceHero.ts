import { defineField } from "sanity";
import { defineSection } from "./defineSection";
import { plainImageField } from "./alt";

export const salesforceServiceHero = defineSection({
  name: "salesforceServiceHero",
  title: "Service hero with form",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "string", description: "Small heading above the title. When set it is the page's H1 and the title an H2." }),
    defineField({ name: "badgeTitle", title: "Badge title", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "badgeSubtitle", title: "Badge subtitle", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "formTitle", title: "Form title", type: "string", description: "Leave empty for the default." }),
    defineField({ name: "formButtonLabel", title: "Form button label", type: "string", description: "Leave empty for the default." }),
    plainImageField("backgroundImage", "Background image"),
  ],
  previewTitle: "title",
});
