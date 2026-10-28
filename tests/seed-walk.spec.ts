import { test, expect } from "@playwright/test";
import { img, heading, prepareDocument } from "../scripts/seed-pages/lib";

test("prepareDocument uploads each image once, adds _keys, applies the prefix", async () => {
  const uploads: string[] = [];
  const doc = await prepareDocument(
    {
      slug: "industries/x",
      title: "X",
      seoFallback: { title: "X title", description: "X desc", image: "/images/x.webp" },
      sections: [
        { _type: "heroSection", title: heading("Hello", { mark: "after", markStyle: "hero" }), image: img("/images/a.webp", "Business meeting") },
        { _type: "platformsSection", logos: [img("/images/a.webp", "Platform Logo"), img("/images/b.webp", "Platform Logo")] },
      ],
    },
    { prefix: "preview/", upload: async (p) => { uploads.push(p); return `image-${uploads.length}abc-10x10-webp`; }, legacy: {} }
  );
  expect(doc._id).toBe("page-preview-industries-x");
  expect((doc.slug as { current: string }).current).toBe("preview/industries/x");
  expect(uploads).toEqual(["/images/a.webp", "/images/b.webp", "/images/x.webp"]);
  const sections = doc.sections as Record<string, unknown>[];
  expect(sections.every((s) => typeof s._key === "string")).toBe(true);
  const logos = sections[1].logos as Record<string, unknown>[];
  expect(logos.every((l) => typeof l._key === "string")).toBe(true);
  expect(logos[0]).toMatchObject({ _type: "image", alt: "Platform Logo", asset: { _type: "reference", _ref: "image-1abc-10x10-webp" } });
  expect((doc.seo as Record<string, unknown>).metaTitle).toBe("X title");
});

test("legacy SEO wins over the code fallback, field by field", async () => {
  const doc = await prepareDocument(
    { slug: "about", title: "About", legacyKey: "about", seoFallback: { title: "About Us", description: "Code desc" }, sections: [] },
    { prefix: "", upload: async () => "image-a-1x1-png", legacy: { about: { seo: { metaDescription: "CMS desc" } } } }
  );
  expect(doc.seo).toMatchObject({ metaTitle: "About Us", metaDescription: "CMS desc" });
});
