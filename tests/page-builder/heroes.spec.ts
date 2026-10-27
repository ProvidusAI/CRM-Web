import { test, expect } from "@playwright/test";
import { heroSectionAdapter } from "@/components/sanity/page-builder/adapters/HeroSection";
import { salesforceServiceHeroAdapter } from "@/components/sanity/page-builder/adapters/SalesforceServiceHero";
import { ctaSectionAdapter } from "@/components/sanity/page-builder/adapters/CtaSection";
import { expertiseCtaSectionAdapter } from "@/components/sanity/page-builder/adapters/ExpertiseCtaSection";
import { industryCtaSectionAdapter } from "@/components/sanity/page-builder/adapters/IndustryCtaSection";
import { salesforceConsultCtaSectionAdapter } from "@/components/sanity/page-builder/adapters/SalesforceConsultCtaSection";
import { contactSectionAdapter } from "@/components/sanity/page-builder/adapters/ContactSection";
import { partnersSectionAdapter } from "@/components/sanity/page-builder/adapters/PartnersSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { DEFAULT_PARTNER_LOGOS } from "@/components/sections/PartnersSection";

const img = (hash: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
  ...(alt !== undefined ? { alt } : {}),
});
type El = { props: Record<string, unknown> };
const props = (node: unknown) => (node as El).props;

test.describe("heroSection adapter", () => {
  test("maps fields to HeroSection props", () => {
    const p = props(
      heroSectionAdapter({
        _type: "heroSection",
        _key: "k",
        title: { text: "Line one\nLine two", mark: "after", markStyle: "heroSmall", markSpace: false },
        subtitle: "Kicker",
        subtitleAsH1: true,
        description: "Desc",
        image: img("aaa111", "A meeting"),
        imageClassName: "object-contain p-4",
        ctaLabel: "Go",
        ctaHref: "/x",
        ctaVariant: "filled",
        ctaSize: "sm",
        hideCta: true,
        bullets: ["a", "b"],
      }),
    );
    expect(p.subtitle).toBe("Kicker");
    expect(p.subtitleAsH1).toBe(true);
    expect(p.description).toBe("Desc");
    expect(String(p.image)).toContain("aaa111-1920x1080.webp");
    expect(p.imageAlt).toBe("A meeting");
    expect(p.imageClassName).toBe("object-contain p-4");
    expect(p.ctaLabel).toBe("Go");
    expect(p.ctaHref).toBe("/x");
    expect(p.ctaVariant).toBe("filled");
    expect(p.ctaSize).toBe("sm");
    expect(p.hideCta).toBe(true);
    expect(p.bullets).toEqual(["a", "b"]);
  });

  test("title renders a small squiggle with no space before it", () => {
    const title = props(
      heroSectionAdapter({
        _type: "heroSection",
        _key: "k",
        title: { text: "Insights And Impact", mark: "after", markStyle: "heroSmall", markSpace: false },
      }),
    ).title as { props: { children: unknown[] } };
    const [text, space, mark] = title.props.children as [string, unknown, { props: { className: string } }];
    expect(text).toBe("Insights And Impact");
    expect(space).toBeNull();
    expect(mark.props.className).toBe("inline-block h-8 w-auto align-baseline ml-1");
  });

  test("empty fields become undefined so the component defaults apply", () => {
    const p = props(
      heroSectionAdapter({
        _type: "heroSection",
        _key: "k",
        title: { text: "" },
        description: "",
        imageClassName: "",
        ctaLabel: "",
        subtitle: "",
        bullets: [],
        image: img("bbb222", ""),
      }),
    );
    for (const key of ["title", "description", "imageClassName", "ctaLabel", "ctaHref", "ctaVariant", "ctaSize", "subtitle", "bullets", "imageAlt"]) {
      expect(p[key], key).toBeUndefined();
    }
    expect(String(p.image)).toContain("bbb222");
  });
});

test.describe("salesforceServiceHero adapter", () => {
  test("maps fields, background through imageSrc", () => {
    const p = props(
      salesforceServiceHeroAdapter({
        _type: "salesforceServiceHero",
        _key: "k",
        kicker: "K",
        badgeTitle: "B",
        badgeSubtitle: "BS",
        title: "T",
        description: "D",
        bullets: ["x"],
        formTitle: "F",
        formButtonLabel: "FB",
        backgroundImage: img("ccc333"),
      }),
    );
    expect(p).toMatchObject({ kicker: "K", badgeTitle: "B", badgeSubtitle: "BS", title: "T", description: "D", bullets: ["x"], formTitle: "F", formButtonLabel: "FB" });
    expect(String(p.backgroundImage)).toContain("ccc333-1920x1080.webp");
  });

  test("empty fields become undefined", () => {
    const p = props(salesforceServiceHeroAdapter({ _type: "salesforceServiceHero", _key: "k", title: "T", kicker: "", badgeTitle: "", bullets: [] }));
    expect(p.kicker).toBeUndefined();
    expect(p.badgeTitle).toBeUndefined();
    expect(p.bullets).toBeUndefined();
    expect(p.backgroundImage).toBeUndefined();
  });
});

test.describe("ctaSection adapter", () => {
  test("maps fields to CtaSection props", () => {
    const p = props(ctaSectionAdapter({ _type: "ctaSection", _key: "k", title: "T", buttonHref: "/contact", backgroundImage: img("abc123") }));
    expect(p.title).toBe("T");
    expect(p.buttonHref).toBe("/contact");
    expect(p.buttonLabel).toBeUndefined();
    expect(String(p.backgroundImage)).toContain("abc123-1920x1080.webp");
  });

  test("an empty section is CtaSection with all defaults", () => {
    const p = props(ctaSectionAdapter({ _type: "ctaSection", _key: "k", title: "", buttonLabel: "" }));
    expect(p).toEqual({ title: undefined, buttonLabel: undefined, buttonHref: undefined, backgroundImage: undefined });
  });
});

test.describe("expertiseCtaSection adapter", () => {
  test("maps text, links and both images with their alts", () => {
    const p = props(
      expertiseCtaSectionAdapter({
        _type: "expertiseCtaSection",
        _key: "k",
        title: "T",
        titleHref: "/t",
        buttonText: "B",
        buttonHref: "/b",
        image1: img("111aaa", "One"),
        image2: img("222bbb", "Two"),
      }),
    );
    expect(p).toMatchObject({ title: "T", titleHref: "/t", buttonText: "B", buttonHref: "/b", image1Alt: "One", image2Alt: "Two" });
    expect(String(p.image1)).toContain("111aaa-1920x1080.webp");
    expect(String(p.image2)).toContain("222bbb-1920x1080.webp");
  });

  test("blank alts fall back to the component defaults; missing image renders nothing", () => {
    const p = props(
      expertiseCtaSectionAdapter({ _type: "expertiseCtaSection", _key: "k", title: "T", buttonText: "B", buttonHref: "/b", titleHref: "", image1: img("111aaa", ""), image2: img("222bbb") }),
    );
    expect(p.image1Alt).toBeUndefined();
    expect(p.image2Alt).toBeUndefined();
    expect(p.titleHref).toBeUndefined();
    expect(expertiseCtaSectionAdapter({ _type: "expertiseCtaSection", _key: "k", title: "T", buttonText: "B", buttonHref: "/b", image1: img("111aaa") })).toBeNull();
  });
});

test.describe("industryCtaSection adapter", () => {
  test("image alt feeds imageAlt", () => {
    const p = props(
      industryCtaSectionAdapter({ _type: "industryCtaSection", _key: "k", title: "T", buttonLabel: "B", buttonHref: "/b", image: img("ddd444", "Card art") }),
    );
    expect(p).toMatchObject({ title: "T", buttonLabel: "B", buttonHref: "/b", imageAlt: "Card art" });
    expect(String(p.image)).toContain("ddd444-1920x1080.webp");
  });

  test("blank alt is undefined; missing image renders nothing", () => {
    expect(props(industryCtaSectionAdapter({ _type: "industryCtaSection", _key: "k", title: "T", buttonLabel: "B", buttonHref: "/b", image: img("ddd444") })).imageAlt).toBeUndefined();
    expect(industryCtaSectionAdapter({ _type: "industryCtaSection", _key: "k", title: "T", buttonLabel: "B", buttonHref: "/b" })).toBeNull();
  });
});

test.describe("salesforceConsultCtaSection adapter", () => {
  test("maps gradient, variant and image alt", () => {
    const gradient = "linear-gradient(60deg, var(--color-brand-green) 37.293%, var(--color-brand-green-light) 91.441%)";
    const p = props(
      salesforceConsultCtaSectionAdapter({
        _type: "salesforceConsultCtaSection",
        _key: "k",
        title: "T",
        buttonLabel: "B",
        buttonHref: "/b",
        backgroundColor: gradient,
        buttonVariant: "white",
        image: img("eee555", "Recruiter"),
      }),
    );
    expect(p).toMatchObject({ title: "T", buttonLabel: "B", buttonHref: "/b", backgroundColor: gradient, buttonVariant: "white", imageAlt: "Recruiter" });
    expect(String(p.image)).toContain("eee555-1920x1080.webp");
  });

  test("empty fields become undefined", () => {
    const p = props(salesforceConsultCtaSectionAdapter({ _type: "salesforceConsultCtaSection", _key: "k", backgroundColor: "", buttonVariant: undefined }));
    expect(p).toEqual({
      title: undefined,
      buttonLabel: undefined,
      buttonHref: undefined,
      backgroundColor: undefined,
      image: undefined,
      imageAlt: undefined,
      buttonVariant: undefined,
    });
  });
});

test.describe("contactSection adapter", () => {
  test("maps the editable contact details", () => {
    const p = props(contactSectionAdapter({ _type: "contactSection", _key: "k", intro: "Hi", address: "1 A St\nLondon", email: "a@b.co", phone: "+44 1" }));
    expect(p).toEqual({ intro: "Hi", address: "1 A St\nLondon", email: "a@b.co", phone: "+44 1" });
  });

  test("empty fields become undefined", () => {
    const p = props(contactSectionAdapter({ _type: "contactSection", _key: "k", intro: "", email: "" }));
    expect(p).toEqual({ intro: undefined, address: undefined, email: undefined, phone: undefined });
  });
});

test.describe("partnersSection adapter", () => {
  test("maps logos to { src, alt } items", () => {
    const p = props(
      partnersSectionAdapter({ _type: "partnersSection", _key: "k", logos: [img("f1f1f1", "Acme"), img("f2f2f2")] }),
    );
    const logos = p.logos as { src: string; alt: string }[];
    expect(logos).toHaveLength(2);
    expect(logos[0].src).toContain("f1f1f1-1920x1080.webp");
    expect(logos[0].alt).toBe("Acme");
    expect(logos[1].alt).toBe("Partner 2 logo");
  });

  test("no logos means the component's default list", () => {
    expect(props(partnersSectionAdapter({ _type: "partnersSection", _key: "k" })).logos).toBeUndefined();
    expect(props(partnersSectionAdapter({ _type: "partnersSection", _key: "k", logos: [] })).logos).toBeUndefined();
    expect(DEFAULT_PARTNER_LOGOS).toHaveLength(12);
    expect(DEFAULT_PARTNER_LOGOS[0]).toEqual({ src: "/images/partners/1.webp", alt: "Partner 1 logo" });
  });
});

test("all eight adapters are registered", () => {
  for (const name of ["heroSection", "salesforceServiceHero", "ctaSection", "expertiseCtaSection", "industryCtaSection", "salesforceConsultCtaSection", "contactSection", "partnersSection"]) {
    expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
  }
});
