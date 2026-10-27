import { test, expect } from "@playwright/test";
import { expertiseSalesforceSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseSalesforceSection";
import { expertisePlatformsSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertisePlatformsSection";
import { expertiseDescriptionSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseDescriptionSection";
import { expertiseCertifiedSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseCertifiedSection";
import { expertiseImplementationSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseImplementationSection";
import { expertiseChallengesSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseChallengesSection";
import { expertiseFeaturesSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseFeaturesSection";
import { expertiseStackSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseStackSection";
import { expertiseSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseSection";
import { identityResolutionSectionAdapter } from "@/components/sanity/page-builder/adapters/IdentityResolutionSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { ExpertiseSection, expertiseItems } from "@/components/sections/ExpertiseSection";
import { ExpertiseStackSection, DEFAULT_STACK_ITEMS } from "@/components/sections/ExpertiseStackSection";
import { DEFAULT_IDENTITY_RESOLUTION } from "@/components/sections/IdentityResolutionSection";
import { PLATFORM_HREFS, resolvePlatformHref } from "@/lib/platformPages";

const img = (hash: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
  ...(alt !== undefined ? { alt } : {}),
});
type El = { props: Record<string, unknown> };
const props = (node: unknown) => (node as El).props;

/** Every element reachable through props.children, without rendering anything. */
function collect(node: unknown, out: El[] = []): El[] {
  if (Array.isArray(node)) node.forEach((n) => collect(n, out));
  else if (node && typeof node === "object" && "props" in node) {
    out.push(node as El);
    collect((node as El).props.children, out);
  }
  return out;
}

test.describe("registry", () => {
  test("registers all ten expertise section types", () => {
    for (const name of [
      "expertiseSalesforceSection",
      "expertisePlatformsSection",
      "expertiseDescriptionSection",
      "expertiseCertifiedSection",
      "expertiseImplementationSection",
      "expertiseChallengesSection",
      "expertiseFeaturesSection",
      "expertiseStackSection",
      "expertiseSection",
      "identityResolutionSection",
    ]) {
      expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
    }
  });
});

test.describe("expertiseSalesforceSection adapter", () => {
  test("maps fields, heading with a small squiggle, image and alt", () => {
    const p = props(
      expertiseSalesforceSectionAdapter({
        _type: "expertiseSalesforceSection",
        _key: "k",
        heading: { text: "Why Work With\nProvidusCRM?", mark: "after", markStyle: "heroSmall" },
        text: "One block",
        paragraphs: ["a", "b"],
        image: img("aaa111", "Two colleagues"),
        imageVariant: "framed-wide",
        hideMark: true,
        ctaLabel: "Go",
        ctaHref: "/contact",
      }),
    );
    const kids = (p.heading as { props: { children: unknown[] } }).props.children;
    expect((kids[2] as { props: { className: string } }).props.className).toBe("inline-block h-8 w-auto align-baseline ml-1");
    expect(p).toMatchObject({ text: "One block", paragraphs: ["a", "b"], imageAlt: "Two colleagues", imageVariant: "framed-wide", hideMark: true, ctaLabel: "Go", ctaHref: "/contact" });
    expect(String(p.image)).toContain("aaa111-1920x1080.webp");
  });

  test("a plain heading stays a plain string; empty fields become undefined", () => {
    const p = props(
      expertiseSalesforceSectionAdapter({
        _type: "expertiseSalesforceSection",
        _key: "k",
        heading: { text: "Certified Experts", mark: "none" },
        text: "",
        paragraphs: [],
        imageVariant: undefined,
        ctaLabel: "",
        ctaHref: "",
        image: img("bbb222", ""),
      }),
    );
    expect(p.heading).toBe("Certified Experts");
    for (const key of ["text", "paragraphs", "imageVariant", "imageAlt", "ctaLabel", "ctaHref"]) expect(p[key], key).toBeUndefined();
  });

  test("renders nothing without an image", () => {
    expect(expertiseSalesforceSectionAdapter({ _type: "expertiseSalesforceSection", _key: "k", heading: { text: "H" } })).toBeNull();
  });
});

test.describe("expertisePlatformsSection adapter", () => {
  test("maps items; href and bgGradient pass through, icon through imageSrc", () => {
    const p = props(
      expertisePlatformsSectionAdapter({
        _type: "expertisePlatformsSection",
        _key: "k",
        title: "Our Platform Expertise",
        items: [
          { _key: "i1", title: "Agentforce", text: "T1", icon: img("ccc333"), bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)", href: "/custom" },
          { _key: "i2", title: "Revenue Cloud", text: "T2", icon: img("ddd444"), bgGradient: "", href: "" },
        ],
      }),
    );
    const items = p.items as Record<string, unknown>[];
    expect(p.title).toBe("Our Platform Expertise");
    expect(items[0]).toMatchObject({ title: "Agentforce", text: "T1", bgGradient: "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)", href: "/custom" });
    expect(String(items[0].icon)).toContain("ccc333-1920x1080.webp");
    // An empty href must reach the component as undefined so the title lookup applies.
    expect(items[1].href).toBeUndefined();
  });
});

test.describe("href preference", () => {
  test("an item's own href wins; a missing one keeps the title lookup", () => {
    expect(resolvePlatformHref("Agentforce", "/custom")).toBe("/custom");
    expect(resolvePlatformHref("Agentforce")).toBe(PLATFORM_HREFS.Agentforce);
    expect(resolvePlatformHref("Agentforce", undefined)).toBe(PLATFORM_HREFS.Agentforce);
    expect(resolvePlatformHref("Revenue Cloud")).toBeUndefined();
    expect(resolvePlatformHref("Revenue Cloud", "/revenue")).toBe("/revenue");
  });

  test("ExpertiseSection links the card with item.href, falling back to PLATFORM_HREFS", () => {
    const tree = collect(
      ExpertiseSection({
        items: [
          { id: 1, title: "Agentforce", icon: "/a.webp", text: "t", shadow: "s", href: "/custom" },
          { id: 2, title: "Sales Cloud", icon: "/b.webp", text: "t", shadow: "s" },
          { id: 3, title: "Revenue Cloud", icon: "/c.webp", text: "t", shadow: "s" },
        ],
      }),
    );
    const hrefs = tree.filter((e) => String(e.props["aria-label"] ?? "").startsWith("Explore")).map((e) => `${e.props["aria-label"]} -> ${e.props.href}`);
    expect(hrefs).toContain("Explore Agentforce consulting -> /custom");
    expect(hrefs).toContain(`Explore Sales Cloud consulting -> ${PLATFORM_HREFS["Sales Cloud"]}`);
    expect(hrefs.some((h) => h.includes("Revenue Cloud"))).toBe(false);
  });

  test("the default items still link exactly as before", () => {
    const hrefs = collect(ExpertiseSection({})).filter((e) => String(e.props["aria-label"] ?? "").startsWith("Explore")).map((e) => e.props.href);
    expect(new Set(hrefs)).toEqual(new Set(Object.values(PLATFORM_HREFS)));
  });
});

test.describe("expertiseDescriptionSection adapter", () => {
  test("maps heading, paragraphs and CTA fields", () => {
    const p = props(
      expertiseDescriptionSectionAdapter({
        _type: "expertiseDescriptionSection",
        _key: "k",
        heading: { text: "Where Client Data Breaks Down", mark: "after", markStyle: "section" },
        paragraphs: ["a", "b"],
        ctaText: "Talk",
        ctaHref: "/talk",
        hideCta: true,
      }),
    );
    const kids = (p.heading as { props: { children: unknown[] } }).props.children;
    expect((kids[2] as { props: { className: string } }).props.className).toBe("inline-block -mb-2 ml-1");
    expect(p).toMatchObject({ paragraphs: ["a", "b"], ctaText: "Talk", ctaHref: "/talk", hideCta: true });
  });

  test("empty CTA fields become undefined so the defaults apply", () => {
    const p = props(expertiseDescriptionSectionAdapter({ _type: "expertiseDescriptionSection", _key: "k", heading: { text: "H" }, ctaText: "", ctaHref: "" }));
    expect(p.heading).toBe("H");
    expect(p.paragraphs).toEqual([]);
    expect(p.ctaText).toBeUndefined();
    expect(p.ctaHref).toBeUndefined();
  });
});

test.describe("expertiseCertifiedSection adapter", () => {
  test("maps badges and their alts; a blank alt keeps today's default", () => {
    const p = props(
      expertiseCertifiedSectionAdapter({
        _type: "expertiseCertifiedSection",
        _key: "k",
        images: [img("eee555", "Certification 1"), img("fff666", ""), img("111777")],
      }),
    );
    expect((p.images as string[]).map((s) => s.match(/(eee555|fff666|111777)/)?.[1])).toEqual(["eee555", "fff666", "111777"]);
    expect(p.alts).toEqual(["Certification 1", "", ""]);
  });

  test("badges without an uploaded image are dropped, keeping alts aligned", () => {
    const p = props(
      expertiseCertifiedSectionAdapter({
        _type: "expertiseCertifiedSection",
        _key: "k",
        images: [{ _type: "image" }, img("eee555", "Second")],
      }),
    );
    expect(p.images as string[]).toHaveLength(1);
    expect(p.alts).toEqual(["Second"]);
  });
});

test.describe("expertiseImplementationSection adapter", () => {
  test("maps heading and items; items without an image are dropped", () => {
    const p = props(
      expertiseImplementationSectionAdapter({
        _type: "expertiseImplementationSection",
        _key: "k",
        heading: { text: "Industries We Impact" },
        items: [
          { _key: "a", title: "Non-Profit", text: "T", image: img("aaa111") },
          { _key: "b", title: "No image", text: "T" },
        ],
      }),
    );
    const items = p.items as Record<string, unknown>[];
    expect(p.heading).toBe("Industries We Impact");
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ title: "Non-Profit", text: "T" });
    expect(String(items[0].image)).toContain("aaa111-1920x1080.webp");
  });
});

test.describe("expertiseChallengesSection adapter", () => {
  test("maps title and items; the icon stays a plain url for the CSS mask", () => {
    const p = props(
      expertiseChallengesSectionAdapter({
        _type: "expertiseChallengesSection",
        _key: "k",
        title: { text: "What goes wrong" },
        items: [{ _key: "a", title: "Fragmented\nCustomer Data", text: "T", icon: img("bbb222") }],
      }),
    );
    const items = p.items as Record<string, unknown>[];
    expect(p.title).toBe("What goes wrong");
    expect(items[0]).toMatchObject({ title: "Fragmented\nCustomer Data", text: "T" });
    expect(String(items[0].icon)).toContain("bbb222-1920x1080.webp");
  });

  test("no title leaves the heading out", () => {
    expect(props(expertiseChallengesSectionAdapter({ _type: "expertiseChallengesSection", _key: "k", title: { text: "" }, items: [] })).title).toBeUndefined();
  });
});

test.describe("expertiseFeaturesSection adapter", () => {
  test("maps features; features without an icon are dropped", () => {
    const p = props(
      expertiseFeaturesSectionAdapter({
        _type: "expertiseFeaturesSection",
        _key: "k",
        features: [
          { _key: "a", title: "Pipeline\nVisibility", description: "D", icon: img("ccc333") },
          { _key: "b", title: "No icon", description: "D" },
        ],
      }),
    );
    const features = p.features as Record<string, unknown>[];
    expect(features).toHaveLength(1);
    expect(features[0]).toMatchObject({ title: "Pipeline\nVisibility", description: "D" });
    expect(String(features[0].icon)).toContain("ccc333-1920x1080.webp");
  });
});

test.describe("expertiseStackSection adapter", () => {
  test("maps items including colour, link and the hidden flag", () => {
    const p = props(
      expertiseStackSectionAdapter({
        _type: "expertiseStackSection",
        _key: "k",
        items: [
          { _key: "a", title: "Service Cloud", subtitle: "S", text: "T", color: "var(--color-explore-purple)", icon: img("aaa111"), image: img("bbb222"), href: "/x" },
          { _key: "b", title: "Revenue Cloud", subtitle: "S", text: "T", color: "var(--color-explore-violet)", icon: img("ccc333"), image: img("ddd444"), href: "", hidden: true },
          { _key: "c", title: "Unfinished", subtitle: "S", text: "T", color: "var(--color-explore-blue)", icon: img("eee555") },
        ],
      }),
    );
    const items = p.items as Record<string, unknown>[];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ title: "Service Cloud", subtitle: "S", text: "T", color: "var(--color-explore-purple)", href: "/x" });
    expect(String(items[0].icon)).toContain("aaa111-1920x1080.webp");
    expect(String(items[0].image)).toContain("bbb222-1920x1080.webp");
    expect(items[1]).toMatchObject({ title: "Revenue Cloud", hidden: true });
    expect(items[1].href).toBeUndefined();
  });

  test("no items means the component's DEFAULT_STACK_ITEMS apply", () => {
    expect(props(expertiseStackSectionAdapter({ _type: "expertiseStackSection", _key: "k", items: [] })).items).toBeUndefined();
    expect(props(expertiseStackSectionAdapter({ _type: "expertiseStackSection", _key: "k" })).items).toBeUndefined();
  });

  test("DEFAULT_STACK_ITEMS keeps Revenue Cloud hidden, and the stack leaves it out", () => {
    expect(DEFAULT_STACK_ITEMS).toHaveLength(7);
    expect(DEFAULT_STACK_ITEMS.filter((i) => i.hidden).map((i) => i.title)).toEqual(["Revenue Cloud"]);
    const titles = (items?: typeof DEFAULT_STACK_ITEMS) =>
      collect(ExpertiseStackSection({ items })).filter((e) => typeof e.props.subtitle === "string").map((e) => e.props.title);
    expect(titles()).toHaveLength(6);
    expect(titles()).not.toContain("Revenue Cloud");
    expect(titles([{ ...DEFAULT_STACK_ITEMS[0] }, { ...DEFAULT_STACK_ITEMS[5], hidden: false }])).toEqual(["Experience Cloud", "Revenue Cloud"]);
  });
});

test.describe("expertiseSection adapter", () => {
  test("maps items with the shadow and href; the id comes from _key", () => {
    const p = props(
      expertiseSectionAdapter({
        _type: "expertiseSection",
        _key: "k",
        title: "Our Platforms",
        items: [
          { _key: "a", title: "Agentforce", text: "T", icon: img("aaa111"), shadow: "0px 4.36px 0px 0px #0D9DDA", href: "/custom" },
          { _key: "b", title: "Sales Cloud", text: "T", icon: img("bbb222"), shadow: "0px 4.36px 0px 0px #1D70C5", href: "" },
          { _key: "c", title: "No icon", text: "T", shadow: "x" },
        ],
      }),
    );
    const items = p.items as Record<string, unknown>[];
    expect(p.title).toBe("Our Platforms");
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ id: "a", title: "Agentforce", text: "T", shadow: "0px 4.36px 0px 0px #0D9DDA", href: "/custom" });
    expect(String(items[0].icon)).toContain("aaa111-1920x1080.webp");
    expect(items[1].href).toBeUndefined();
  });

  test("an empty section is ExpertiseSection with its defaults", () => {
    const p = props(expertiseSectionAdapter({ _type: "expertiseSection", _key: "k", title: "", items: [] }));
    expect(p.title).toBeUndefined();
    expect(p.items).toBeUndefined();
    expect(expertiseItems).toHaveLength(6);
  });
});

test.describe("identityResolutionSection adapter", () => {
  test("maps every editable field", () => {
    const p = props(
      identityResolutionSectionAdapter({
        _type: "identityResolutionSection",
        _key: "k",
        headingStart: "How Identity",
        headingEnd: "Resolution Works",
        introParagraphs: ["p1", "p2"],
        desktopImage: img("aaa111", "Desktop alt"),
        mobileImage: img("bbb222", "Mobile alt"),
        columns: [{ _key: "c1", title: "Col", paragraphs: ["x", "y"] }],
      }),
    );
    expect(p).toMatchObject({ headingStart: "How Identity", headingEnd: "Resolution Works", introParagraphs: ["p1", "p2"], desktopImageAlt: "Desktop alt", mobileImageAlt: "Mobile alt" });
    expect(String(p.desktopImage)).toContain("aaa111-1920x1080.webp");
    expect(String(p.mobileImage)).toContain("bbb222-1920x1080.webp");
    expect(p.columns).toEqual([{ title: "Col", paragraphs: ["x", "y"] }]);
  });

  test("empty fields become undefined so the component defaults apply", () => {
    const p = props(identityResolutionSectionAdapter({ _type: "identityResolutionSection", _key: "k", headingStart: "", introParagraphs: [], columns: [], desktopImage: img("aaa111", "") }));
    for (const key of ["headingStart", "headingEnd", "introParagraphs", "columns", "mobileImage", "desktopImageAlt", "mobileImageAlt"]) expect(p[key], key).toBeUndefined();
  });

  test("defaults keep today's content and the identiy-mob.png filename", () => {
    expect(DEFAULT_IDENTITY_RESOLUTION.mobileImage).toBe("/images/platform-expertise/identiy-mob.png");
    expect(DEFAULT_IDENTITY_RESOLUTION.desktopImage).toBe("/images/data-cloud-identity.svg");
    expect(DEFAULT_IDENTITY_RESOLUTION.columns).toHaveLength(3);
    expect(DEFAULT_IDENTITY_RESOLUTION.columns.every((c) => c.paragraphs.length === 2)).toBe(true);
  });
});
