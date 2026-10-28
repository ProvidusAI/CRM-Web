import { test, expect } from "@playwright/test";
import { pageBlogsSectionAdapter } from "@/components/sanity/page-builder/adapters/PageBlogsSection";
import { serviceCaseStudiesSectionAdapter } from "@/components/sanity/page-builder/adapters/ServiceCaseStudiesSection";
import { whyChooseSectionAdapter } from "@/components/sanity/page-builder/adapters/WhyChooseSection";
import { faqSectionAdapter } from "@/components/sanity/page-builder/adapters/FaqSection";
import { whatWeDoSectionAdapter } from "@/components/sanity/page-builder/adapters/WhatWeDoSection";
import { certifiedSectionAdapter } from "@/components/sanity/page-builder/adapters/CertifiedSection";
import { platformsSectionAdapter } from "@/components/sanity/page-builder/adapters/PlatformsSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { reasons } from "@/components/sections/WhyChooseSection";
import { DEFAULT_WHAT_WE_DO_TABS } from "@/components/sections/WhatWeDoSection";
import { toServiceCaseStudyCards } from "@/lib/caseStudyCards";
import { imageSrc } from "@/sanity/lib/imageRef";
import { toBlogTeaserCards } from "@/lib/blogTeaserCards";

const img = (hash: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
  ...(alt !== undefined ? { alt } : {}),
});
type El = { type?: unknown; props: Record<string, unknown> };
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

const caseStudy = (over: Record<string, unknown> = {}) => ({
  title: "Acme rollout",
  slug: { current: "acme-rollout" },
  technologies: ["Sales Cloud", "MuleSoft"],
  industry: "Retail",
  coverImage: { asset: { url: "https://cdn.sanity.io/images/p/d/cover-1x1.webp" } },
  ...over,
});

test.describe("registry", () => {
  test("skips a case study without a slug instead of throwing", () => {
    const cards = toServiceCaseStudyCards([
      caseStudy({ slug: undefined }),
      caseStudy({ slug: {} }),
      caseStudy({ slug: { current: "kept" } }),
    ]);
    expect(cards.map((c) => c.slug)).toEqual(["kept"]);
  });

  test("registers the seven listing and shared home section types", () => {
    for (const name of [
      "pageBlogsSection",
      "serviceCaseStudiesSection",
      "whyChooseSection",
      "faqSection",
      "whatWeDoSection",
      "certifiedSection",
      "platformsSection",
    ]) {
      expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
    }
  });
});

test.describe("toServiceCaseStudyCards", () => {
  test("maps a case study onto a card", () => {
    expect(toServiceCaseStudyCards([caseStudy()])).toEqual([
      {
        title: "Acme rollout",
        slug: "acme-rollout",
        image: "https://cdn.sanity.io/images/p/d/cover-1x1.webp",
        label: "Sales Cloud",
        category: "Retail",
      },
    ]);
  });

  test("falls back to the stock image and label", () => {
    const [card] = toServiceCaseStudyCards([caseStudy({ coverImage: undefined, technologies: [], industry: undefined })]);
    expect(card).toMatchObject({ image: "/images/case-study.webp", label: "Salesforce Consulting" });
    expect(card.category).toBeUndefined();
  });

  test("no case studies is an empty list", () => {
    expect(toServiceCaseStudyCards(undefined)).toEqual([]);
  });
});

test.describe("serviceCaseStudiesSection adapter", () => {
  test("maps dereferenced case studies through toServiceCaseStudyCards", () => {
    const docs = [caseStudy(), caseStudy({ title: "Other", slug: { current: "other" } })];
    const p = props(
      serviceCaseStudiesSectionAdapter({
        _type: "serviceCaseStudiesSection",
        _key: "k",
        title: "Our work",
        caseStudies: docs,
        viewAllHref: "/case-studies",
        viewAllLabel: "See all",
      }),
    );
    expect(p.caseStudies).toEqual(toServiceCaseStudyCards(docs));
    expect(p).toMatchObject({ title: "Our work", viewAllHref: "/case-studies", viewAllLabel: "See all" });
  });

  test("empty fields become undefined", () => {
    const p = props(
      serviceCaseStudiesSectionAdapter({
        _type: "serviceCaseStudiesSection",
        _key: "k",
        title: "",
        viewAllHref: "",
        viewAllLabel: "",
        caseStudies: [caseStudy()],
      }),
    );
    expect(p.title).toBeUndefined();
    expect(p.viewAllHref).toBeUndefined();
    expect(p.viewAllLabel).toBeUndefined();
  });

  test("an empty list, or only broken references, renders nothing", () => {
    expect(serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", caseStudies: [] })).toBeNull();
    expect(serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k" })).toBeNull();
    expect(serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", caseStudies: [null] })).toBeNull();
  });
});

test.describe("serviceCaseStudiesSection inline cards", () => {
  const inline = (over: Record<string, unknown> = {}) => ({
    _key: "c1",
    title: "Inline project",
    slug: "inline-project",
    image: img("abc123"),
    label: "Health Cloud",
    category: "Healthcare",
    ...over,
  });

  test("maps inline cards field by field", () => {
    const p = props(
      serviceCaseStudiesSectionAdapter({
        _type: "serviceCaseStudiesSection",
        _key: "k",
        inlineCards: [inline(), inline({ _key: "c2", title: "Bare", slug: "bare", label: undefined, category: undefined })],
        viewAllHref: "/case-studies",
      }),
    );
    expect(p.caseStudies).toEqual([
      {
        title: "Inline project",
        slug: "inline-project",
        image: imageSrc(img("abc123")),
        label: "Health Cloud",
        category: "Healthcare",
      },
      { title: "Bare", slug: "bare", image: imageSrc(img("abc123")), label: undefined, category: undefined },
    ]);
    expect(p.viewAllHref).toBe("/case-studies");
  });

  test("references win over inline cards", () => {
    const docs = [caseStudy()];
    const p = props(
      serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", caseStudies: docs, inlineCards: [inline()] }),
    );
    expect(p.caseStudies).toEqual(toServiceCaseStudyCards(docs));
  });

  test("only broken references fall through to the inline cards", () => {
    const p = props(
      serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", caseStudies: [null], inlineCards: [inline()] }),
    );
    expect((p.caseStudies as unknown[]).length).toBe(1);
  });

  test("no references and no inline cards renders nothing", () => {
    expect(serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", caseStudies: [], inlineCards: [] })).toBeNull();
  });

  test("an inline card without an image is skipped", () => {
    const p = props(
      serviceCaseStudiesSectionAdapter({
        _type: "serviceCaseStudiesSection",
        _key: "k",
        inlineCards: [inline({ image: undefined }), inline({ _key: "c2", title: "Kept", slug: "kept" })],
      }),
    );
    expect((p.caseStudies as { title: string }[]).map((c) => c.title)).toEqual(["Kept"]);
    expect(serviceCaseStudiesSectionAdapter({ _type: "serviceCaseStudiesSection", _key: "k", inlineCards: [inline({ image: undefined })] })).toBeNull();
  });
});

const post = (over: Record<string, unknown> = {}) => ({
  _id: "p1",
  title: "A post",
  slug: { current: "a-post" },
  publishedAt: "2026-01-02",
  categories: ["Salesforce"],
  heroImage: { alt: "Hero alt", asset: { _id: "a1", url: "https://cdn.sanity.io/images/p/d/hero-1x1.webp" } },
  ...over,
});

test.describe("pageBlogsSection adapter", () => {
  test("maps dereferenced posts through toBlogTeaserCards", () => {
    const posts = [post(), post({ _id: "p2", slug: { current: "b" }, heroImage: undefined, categories: undefined })];
    const p = props(pageBlogsSectionAdapter({ _type: "pageBlogsSection", _key: "k", title: "From the blog", posts }));
    expect(p.posts).toEqual(toBlogTeaserCards(posts));
    expect(p.title).toBe("From the blog");
  });

  test("an empty title becomes undefined", () => {
    const p = props(pageBlogsSectionAdapter({ _type: "pageBlogsSection", _key: "k", title: "", posts: [post()] }));
    expect(p.title).toBeUndefined();
  });

  test("an empty list, or only broken references, renders nothing", () => {
    expect(pageBlogsSectionAdapter({ _type: "pageBlogsSection", _key: "k", posts: [] })).toBeNull();
    expect(pageBlogsSectionAdapter({ _type: "pageBlogsSection", _key: "k" })).toBeNull();
    expect(pageBlogsSectionAdapter({ _type: "pageBlogsSection", _key: "k", posts: [null] })).toBeNull();
  });
});

test.describe("whyChooseSection adapter", () => {
  test("maps reasons, icon, image, alt and overlay", () => {
    const p = props(
      whyChooseSectionAdapter({
        _type: "whyChooseSection",
        _key: "k",
        title: "Why us",
        reasons: [{ _key: "r1", title: "T1", color: "#C08A2E", icon: img("aaa111"), text: "X1" }],
        image: img("bbb222", "Specialist at work"),
        backgroundOverlayColor: "#616161",
      }),
    );
    expect(p.title).toBe("Why us");
    expect(p.customReasons).toEqual([
      { title: "T1", color: "#C08A2E", icon: expect.stringContaining("aaa111-1920x1080.webp"), text: "X1" },
    ]);
    expect(String(p.image)).toContain("bbb222-1920x1080.webp");
    expect(p.imageAlt).toBe("Specialist at work");
    expect(p.backgroundOverlayColor).toBe("#616161");
  });

  test("a reason without an icon or colour keeps the default for its position", () => {
    const p = props(
      whyChooseSectionAdapter({
        _type: "whyChooseSection",
        _key: "k",
        reasons: [{ _key: "r1", title: "T1", text: "X1" }, { _key: "r2", title: "T2", text: "X2" }],
      }),
    );
    const [a, b] = p.customReasons as { icon: string; color: string }[];
    expect(a).toMatchObject({ icon: reasons[0].icon, color: reasons[0].color });
    expect(b).toMatchObject({ icon: reasons[1].icon, color: reasons[1].color });
  });

  test("empty fields become undefined so the component defaults apply", () => {
    const p = props(
      whyChooseSectionAdapter({
        _type: "whyChooseSection",
        _key: "k",
        title: "",
        reasons: [],
        image: img("ccc333", ""),
        backgroundOverlayColor: "",
      }),
    );
    expect(p.title).toBeUndefined();
    expect(p.customReasons).toBeUndefined();
    expect(p.imageAlt).toBeUndefined();
    expect(p.backgroundOverlayColor).toBeUndefined();
    const none = props(whyChooseSectionAdapter({ _type: "whyChooseSection", _key: "k" }));
    expect(none.image).toBeUndefined();
  });
});

test.describe("faqSection adapter", () => {
  test("maps title and faqs", () => {
    const p = props(
      faqSectionAdapter({
        _type: "faqSection",
        _key: "k",
        title: "Questions",
        faqs: [{ _key: "f1", question: "Q?", answer: "A." }],
      }),
    );
    expect(p).toMatchObject({ title: "Questions", faqs: [{ question: "Q?", answer: "A." }] });
  });

  test("empty title and faqs become undefined", () => {
    const p = props(faqSectionAdapter({ _type: "faqSection", _key: "k", title: "", faqs: [] }));
    expect(p.title).toBeUndefined();
    expect(p.faqs).toBeUndefined();
  });
});

test.describe("whatWeDoSection adapter", () => {
  test("maps tabs, bullets, links and overlay", () => {
    const p = props(
      whatWeDoSectionAdapter({
        _type: "whatWeDoSection",
        _key: "k",
        title: "Our services",
        tabs: [
          {
            _key: "t1",
            label: "Consulting",
            heading: "Salesforce Consulting",
            text: "One.\n\nTwo.",
            bullets: ["a", "b"],
            linkHref: "/services/x",
            linkIsExternal: true,
          },
          { _key: "t2", label: "Support", heading: "Support", text: "Text", bullets: [], linkHref: "" },
        ],
        backgroundOverlayColor: "#616161",
      }),
    );
    expect(p.title).toBe("Our services");
    expect(p.backgroundOverlayColor).toBe("#616161");
    expect(p.tabs).toEqual([
      {
        label: "Consulting",
        content: { heading: "Salesforce Consulting", text: "One.\n\nTwo.", bullets: ["a", "b"] },
        link: { href: "/services/x", isExternal: true },
      },
      { label: "Support", content: { heading: "Support", text: "Text", bullets: undefined }, link: undefined },
    ]);
  });

  test("a link defaults to internal", () => {
    const p = props(
      whatWeDoSectionAdapter({
        _type: "whatWeDoSection",
        _key: "k",
        tabs: [{ _key: "t1", label: "L", heading: "H", text: "T", linkHref: "/x" }],
      }),
    );
    expect((p.tabs as { link: unknown }[])[0].link).toEqual({ href: "/x", isExternal: false });
  });

  test("empty fields become undefined so the default tabs apply", () => {
    const p = props(whatWeDoSectionAdapter({ _type: "whatWeDoSection", _key: "k", title: "", tabs: [], backgroundOverlayColor: "" }));
    expect(p.title).toBeUndefined();
    expect(p.tabs).toBeUndefined();
    expect(p.backgroundOverlayColor).toBeUndefined();
  });

  test("the default tabs are exported for the seed", () => {
    expect(DEFAULT_WHAT_WE_DO_TABS).toHaveLength(8);
  });
});

test.describe("certifiedSection adapter", () => {
  test("a title with line breaks becomes text and <br/>", () => {
    const p = props(
      certifiedSectionAdapter({
        _type: "certifiedSection",
        _key: "k",
        title: { text: "Certified\nExpertise", mark: "none" },
        description: "D",
      }),
    );
    expect(collect(p.title).filter((e) => e.type === "br")).toHaveLength(1);
    expect(p.description).toBe("D");
  });

  test("a one-line title stays a plain string", () => {
    const p = props(certifiedSectionAdapter({ _type: "certifiedSection", _key: "k", title: { text: "Certified Salesforce Expertise You Can Count On" } }));
    expect(p.title).toBe("Certified Salesforce Expertise You Can Count On");
  });

  test("empty fields become undefined", () => {
    const p = props(certifiedSectionAdapter({ _type: "certifiedSection", _key: "k", title: { text: "" }, description: "" }));
    expect(p.title).toBeUndefined();
    expect(p.description).toBeUndefined();
  });
});

test.describe("platformsSection adapter", () => {
  test("maps logos through imageSrc with per-logo alt", () => {
    const p = props(
      platformsSectionAdapter({
        _type: "platformsSection",
        _key: "k",
        title: "Built On Partnerships",
        logos: [img("aaa111", "Stripe"), img("bbb222")],
      }),
    );
    expect(p.title).toBe("Built On Partnerships");
    const logos = p.logos as string[];
    expect(logos[0]).toContain("aaa111-1920x1080.webp");
    expect(logos[1]).toContain("bbb222-1920x1080.webp");
    expect(p.alts).toEqual(["Stripe", "Platform Logo"]);
  });

  test("a logo without an upload is skipped", () => {
    const p = props(platformsSectionAdapter({ _type: "platformsSection", _key: "k", logos: [{ _type: "image" }, img("aaa111")] }));
    expect(p.logos as string[]).toHaveLength(1);
    expect(p.alts as string[]).toHaveLength(1);
  });

  test("empty fields become undefined so the default logos apply", () => {
    const p = props(platformsSectionAdapter({ _type: "platformsSection", _key: "k", title: "", logos: [] }));
    expect(p.title).toBeUndefined();
    expect(p.logos).toBeUndefined();
    expect(p.alts).toBeUndefined();
  });
});
