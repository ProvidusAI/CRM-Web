import { defineField, defineType, type FieldDefinition } from "sanity";

interface DefineSectionOptions {
  name: string;
  title: string;
  fields: FieldDefinition[];
  /** Field path shown as the row title in the sections list. */
  previewTitle?: string;
}

/**
 * Every page-builder section shares a "Layout" group: extra space and an
 * anchor id. Extra space is additive (it never reduces the component's own
 * spacing) and left empty keeps the built-in rhythm, so a seeded page renders
 * exactly like the static page it replaced. The data shape stays `spacing.top`
 * / `spacing.bottom`.
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
        title: "Extra space",
        type: "object",
        group: "layout",
        description:
          "Adds blank space outside the section, on top of its built-in spacing. It cannot reduce it, and the gap uses the page background.",
        fields: [
          defineField({ name: "top", title: "Add above (px)", type: "number", validation: (r) => r.integer().min(0) }),
          defineField({ name: "bottom", title: "Add below (px)", type: "number", validation: (r) => r.integer().min(0) }),
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
