import { defineField } from "sanity";

/**
 * Headings that today are JSX: text, optional <br/> line breaks, and the green
 * squiggle (GreenLineMark) after the last word. markStyle values map 1:1 to the
 * className variants the static pages used (see markHeading.tsx).
 */
export const markHeadingField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: false },
    fields: [
      defineField({ name: "text", title: "Text", type: "text", rows: 2, description: "A new line becomes a line break." }),
      defineField({
        name: "mark",
        title: "Green squiggle",
        type: "string",
        initialValue: "none",
        options: { list: [{ title: "None", value: "none" }, { title: "After the text", value: "after" }], layout: "radio", direction: "horizontal" },
      }),
      defineField({
        name: "markStyle",
        title: "Squiggle size",
        type: "string",
        initialValue: "hero",
        hidden: ({ parent }) => parent?.mark !== "after",
        options: {
          list: [
            { title: "Hero (large)", value: "hero" },
            { title: "Hero (small)", value: "heroSmall" },
            { title: "Section heading", value: "section" },
          ],
        },
      }),
      defineField({
        name: "markSpace",
        title: "Space before squiggle",
        type: "boolean",
        initialValue: true,
        hidden: ({ parent }) => parent?.mark !== "after",
      }),
    ],
  });
