import type { StructureResolver } from "sanity/structure";

// "Parent pages" are depth 1 (home, about, …); "Dynamic pages" are nested
// (industries/…, platform-expertise/…). Depth comes from string::split because
// GROQ `match` tokenises on "/" and cannot tell the two apart.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Parent pages")
        .child(
          S.documentList()
            .title("Parent pages")
            .schemaType("page")
            .filter('_type == "page" && count(string::split(slug.current, "/")) == 1')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        ),
      S.listItem()
        .title("Dynamic pages")
        .child(
          S.documentList()
            .title("Dynamic pages")
            .schemaType("page")
            .filter('_type == "page" && count(string::split(slug.current, "/")) > 1')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "page"),
    ]);
