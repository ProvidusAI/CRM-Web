import { defineField, type SlugValue } from "sanity";

// A slug saved with a space silently 404s: the listing links to
// `/blog/my-post ` but the browser normalises the trailing space away, so the
// GROQ `slug.current == $slug` lookup on the article route finds nothing.
// The Generate button already strips whitespace; hand-typed slugs did not.
export const slugField = (source: string) =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: { source, maxLength: 96 },
    validation: (rule) =>
      rule.required().custom((value: SlugValue | undefined) => {
        const current = value?.current;
        if (!current) return true; // required() reports the empty case
        return /\s/.test(current)
          ? "Slug cannot contain spaces — use hyphens instead."
          : true;
      }),
  });
