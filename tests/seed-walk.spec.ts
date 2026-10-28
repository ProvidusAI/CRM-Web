import { test, expect } from "@playwright/test";
import type { SanityClient } from "@sanity/client";
import { img, heading, prepareDocument, mergeLegacy, describeError, validateTargets, legacyRefs, curated, resolveCurated, type LegacyValues } from "../scripts/seed-pages/lib";

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

const noUpload = async () => "image-a-1x1-png";
const page = { slug: "about", title: "About", legacyKey: "k", seoFallback: { title: "T" }, jsonLdFallback: { "@type": "Org" }, sections: [] };
const run = (legacy: LegacyValues) => prepareDocument(page, { prefix: "", upload: noUpload, legacy });

test("JSON-LD: legacy enabled:false is kept, a real schema wins, fallback only when neither", async () => {
  expect((await run({ k: { jsonLd: { enabled: false } } })).jsonLd).toMatchObject({ enabled: false });
  expect((await run({ k: { jsonLd: { enabled: true, schemaJson: '{"a":1}' } } })).jsonLd).toMatchObject({ schemaJson: '{"a":1}' });
  const fb = (await run({})).jsonLd as { enabled: boolean; schemaJson: string };
  expect(fb.enabled).toBe(true);
  expect(JSON.parse(fb.schemaJson)).toEqual({ "@type": "Org" });
  // enabled:true without schemaJson and invalid JSON both resolve to the fallback, like resolveJsonLd.
  expect(((await run({ k: { jsonLd: { enabled: true } } })).jsonLd as { schemaJson: string }).schemaJson).toContain("Org");
  expect(((await run({ k: { jsonLd: { schemaJson: "{nope" } } })).jsonLd as { schemaJson: string }).schemaJson).toContain("Org");
});

test("mergeLegacy: staticPageSeo.jsonLd beats sitePageJsonLd, even when disabled", () => {
  const site = [{ pageKey: "k", jsonLd: { enabled: true, schemaJson: '{"site":1}' } }, { pageKey: "j", jsonLd: { schemaJson: '{"site":2}' } }];
  const merged = mergeLegacy([{ pageKey: "k", jsonLd: { enabled: false } }, { pageKey: "j" }], site);
  expect(merged.k.jsonLd).toEqual({ enabled: false });
  expect(merged.j.jsonLd).toEqual({ schemaJson: '{"site":2}' });
});

test("empty legacy SEO values do not override the code fallback; undefined array items are dropped", async () => {
  const doc = await prepareDocument(
    { ...page, seoFallback: { title: "T", image: "/images/x.webp" }, sections: [{ _type: "a", items: [undefined, { x: 1 }] }] },
    { prefix: "", upload: noUpload, legacy: { k: { seo: { ogImage: {}, twitterImage: { _type: "image" }, metaDescription: "" } } } }
  );
  const seo = doc.seo as Record<string, unknown>;
  expect(seo.ogImage).toMatchObject({ _type: "image", asset: { _ref: "image-a-1x1-png" } });
  expect(seo).not.toHaveProperty("twitterImage");
  expect(seo).not.toHaveProperty("metaDescription");
  expect((doc.sections as { items: unknown[] }[])[0].items).toHaveLength(1);
});

test("describeError never exposes the request object or headers", () => {
  const err = Object.assign(new Error("Request error while attempting to reach https://x"), {
    request: { headers: { authorization: "Bearer SECRET" } },
    statusCode: 401,
    responseBody: "x".repeat(900),
  });
  const out = describeError(err);
  expect(out).not.toContain("SECRET");
  expect(out).toContain("status 401");
  expect(out.length).toBeLessThan(700);
  expect(describeError("plain")).toBe("plain");
});

test("validateTargets: prefix shape, bad slugs, duplicates", () => {
  const p = (slug: string) => ({ slug, title: "t", seoFallback: { title: "t" }, sections: [] });
  expect(validateTargets([p("home"), p("industries/x")], "preview/")).toEqual([]);
  expect(validateTargets([p("home")], "")).toEqual([]);
  expect(validateTargets([p("home")], "Preview/").length).toBeGreaterThan(0);
  expect(validateTargets([p("home")], "a/b/").length).toBeGreaterThan(0);
  expect(validateTargets([p("Bad Slug")], "preview/")).toHaveLength(1);
  expect(validateTargets([p("blog")], "")).toHaveLength(1);
  expect(validateTargets([p("x")], "blog/")).toHaveLength(1);
  expect(validateTargets([p("x")], "api/")).toHaveLength(1);
  expect(validateTargets([p("about"), p("about")], "")).toHaveLength(1);
});

test("legacyRefs filters falsy ids", async () => {
  const client = { fetch: async (q: string) => ({ ids: q.includes("pageBlogs") ? ["p1", null, ""] : ["c1", undefined], sectionTitle: "S" }) };
  const r = await legacyRefs(client as unknown as SanityClient, "k");
  expect(r.caseStudies).toEqual([{ _type: "reference", _ref: "c1" }]);
  expect(r.posts).toEqual([{ _type: "reference", _ref: "p1" }]);
});

test("resolveCurated fills curated sections, drops the placeholder, fetches once per key", async () => {
  const calls: string[] = [];
  const fetchRefs = async (key: string) => {
    calls.push(key);
    return {
      caseStudies: [{ _type: "reference" as const, _ref: "c1" }],
      posts: [{ _type: "reference" as const, _ref: "p1" }],
      caseStudiesTitle: key === "home" ? "Our Work" : "",
      postsTitle: undefined,
    };
  };
  const base = { slug: "home", title: "Home", seoFallback: { title: "H" } };
  const out = await resolveCurated(
    {
      ...base,
      sections: [
        { _type: "heroSection" },
        { _type: "serviceCaseStudiesSection", viewAllHref: "/case-studies", ...curated("caseStudies", "home") },
        { _type: "pageBlogsSection", ...curated("posts", "home") },
        { _type: "pageBlogsSection", ...curated("posts", "about") },
      ],
    },
    fetchRefs
  );
  expect(calls).toEqual(["home", "about"]);
  expect(out.sections[0]).toEqual({ _type: "heroSection" });
  expect(out.sections[1]).toEqual({
    _type: "serviceCaseStudiesSection",
    viewAllHref: "/case-studies",
    title: "Our Work",
    caseStudies: [{ _type: "reference", _ref: "c1" }],
  });
  // No title configured (undefined or empty): the key is absent, not "".
  expect(out.sections[2]).toEqual({ _type: "pageBlogsSection", posts: [{ _type: "reference", _ref: "p1" }] });
  expect(out.sections[3]).not.toHaveProperty("title");
  expect(JSON.stringify(out)).not.toContain("__curated");
});

test("prepareDocument keeps existing _keys, so Portable Text marks still match their markDefs", async () => {
  const body = [
    {
      _type: "block", _key: "b1", style: "normal",
      markDefs: [{ _key: "m1", _type: "link", href: "mailto:a@b.co" }],
      children: [
        { _type: "span", _key: "s1", text: "Mail ", marks: [] },
        { _type: "span", _key: "s2", text: "a@b.co", marks: ["m1"] },
      ],
    },
  ];
  const doc = await prepareDocument(
    { slug: "p", title: "P", seoFallback: { title: "P" }, sections: [{ _type: "richTextSection", body }] },
    { prefix: "", upload: noUpload, legacy: {} }
  );
  const out = ((doc.sections as Record<string, unknown>[])[0].body as typeof body)[0];
  expect(out._key).toBe("b1");
  expect(out.children.map((c) => c._key)).toEqual(["s1", "s2"]);
  const defKeys = out.markDefs.map((d) => d._key);
  expect(defKeys).toEqual(["m1"]);
  for (const c of out.children) for (const m of c.marks) if (!["strong", "em"].includes(m)) expect(defKeys).toContain(m);
});
