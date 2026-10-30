import { defineField, defineType, type SlugValue } from "sanity";
import { pageSlugError, slugToPath } from "@/lib/pagePaths";
import { pageSectionMembers } from "./sections";
import { sectionInsertMenuGroups } from "./sections/insertMenuGroups";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "The page address. Use \"home\" for the homepage and / for child pages, e.g. industries/salesforce-health-cloud-consulting.",
      options: {
        source: "title",
        maxLength: 200,
        // Keep "/" so nested pages can be generated; the default slugifier strips it.
        slugify: (input: string) =>
          input.toLowerCase().trim().replace(/[^a-z0-9/]+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, ""),
      },
      validation: (r) =>
        r.required().custom((value: SlugValue | undefined) => {
          const current = value?.current;
          if (!current) return true;
          return pageSlugError(current) ?? true;
        }),
    }),
    defineField({
      name: "clipOverflowX",
      title: "Clip horizontal overflow",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Wraps the page so wide decorations cannot cause sideways scrolling. Leave off for pages with sticky sections (e.g. the homepage stack).",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      of: pageSectionMembers,
      options: {
        // Thumbnails come from `pnpm thumbs:sections`, which screenshots each
        // section type from the live pages into public/studio-thumbnails/sections/.
        insertMenu: {
          groups: sectionInsertMenuGroups,
          views: [
            { name: "grid", previewImageUrl: (type) => `/studio-thumbnails/sections/${type}.webp` },
            { name: "list" },
          ],
        },
      },
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({ name: "jsonLd", title: "JSON-LD", type: "jsonLd", group: "seo" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? slugToPath(slug) : "No slug" }),
  },
});
