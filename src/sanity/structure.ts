import type { StructureResolver } from "sanity/structure";

// "Parent pages" are depth 1 (home, about, …); "Dynamic pages" are nested
// (industries/…, platform-expertise/…). Depth comes from string::split because
// GROQ `match` tokenises on "/" and cannot tell the two apart.
// Hidden from the sidebar: the pageBlogs / pageCaseStudies key lists are empty and
// nothing reads them. Their schemas stay registered so existing documents remain valid.
// staticPageSeo / sitePageJsonLd are only read for the routes still in code.
const HIDDEN_TYPES = ["page", "pageBlogs", "pageCaseStudies", "staticPageSeo", "sitePageJsonLd"];
const CODED_PAGE_KEYS = '["blog", "case-studies"]';

const codedPageList = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType(type)
        .filter(`_type == "${type}" && pageKey in ${CODED_PAGE_KEYS}`)
    );

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
      // Also catches drafts without a slug, which match neither list above.
      S.listItem()
        .title("All pages")
        .child(
          S.documentList()
            .title("All pages")
            .schemaType("page")
            .filter('_type == "page"')
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !HIDDEN_TYPES.includes(item.getId() ?? "")),
      codedPageList(S, "staticPageSeo", "Static page SEO"),
      codedPageList(S, "sitePageJsonLd", "Static page JSON-LD"),
    ]);
