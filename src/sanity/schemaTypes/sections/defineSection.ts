import { defineField, defineType, type FieldDefinition } from "sanity";

interface DefineSectionOptions {
  name: string;
  title: string;
  fields: FieldDefinition[];
  /** Field path shown as the row title in the sections list. */
  previewTitle?: string;
}

/**
 * Every page-builder section shares a "Layout" group: a spacing override and an
 * anchor id. Spacing left empty keeps the component's built-in rhythm, so a
 * seeded page renders exactly like the static page it replaced.
 */
export function defineSection({ name, title, fields, previewTitle }: DefineSectionOptions) {
  return defineType({
    name,
    title,
    type: "object",
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "layout", title: "Layout" },
    ],
    fields: [
      ...fields.map((f) => ({ ...f, group: f.group ?? "content" })),
      defineField({
        name: "spacing",
        title: "Spacing override",
        type: "object",
        group: "layout",
        description: "Leave empty to keep the section's normal spacing.",
        fields: [
          defineField({ name: "top", title: "Top (px)", type: "number", validation: (r) => r.integer() }),
          defineField({ name: "bottom", title: "Bottom (px)", type: "number", validation: (r) => r.integer() }),
        ],
      }),
      defineField({
        name: "anchorId",
        title: "Anchor id",
        type: "string",
        group: "layout",
        description: "Optional. Lets links jump to this section, e.g. #pricing.",
        validation: (r) => r.regex(/^[a-z][a-z0-9-]*$/, { name: "anchor" }),
      }),
    ],
    preview: {
      select: { title: previewTitle ?? "title", text: "title.text" },
      prepare: ({ title: t, text }) => ({
        title: (typeof t === "string" ? t : text) || title,
        subtitle: title,
      }),
    },
  });
}
