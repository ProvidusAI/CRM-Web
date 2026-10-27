import { test, expect } from "@playwright/test";
import { ClipboardList, Cog, Eye, FileCheck2, Handshake, HeartHandshake, Layers, RotateCw, TrendingUp, Users, Workflow } from "lucide-react";
import { splitComparisonSectionAdapter } from "@/components/sanity/page-builder/adapters/SplitComparisonSection";
import { serviceBenefitsSectionAdapter } from "@/components/sanity/page-builder/adapters/ServiceBenefitsSection";
import { organisationTypesSectionAdapter } from "@/components/sanity/page-builder/adapters/OrganisationTypesSection";
import { outcomeCardsSectionAdapter } from "@/components/sanity/page-builder/adapters/OutcomeCardsSection";
import { explainerCardsSectionAdapter } from "@/components/sanity/page-builder/adapters/ExplainerCardsSection";
import { trueCostSectionAdapter } from "@/components/sanity/page-builder/adapters/TrueCostSection";
import { solutionTypesSectionAdapter } from "@/components/sanity/page-builder/adapters/SolutionTypesSection";
import { industryDetailSectionAdapter } from "@/components/sanity/page-builder/adapters/IndustryDetailSection";
import { comparisonSectionAdapter } from "@/components/sanity/page-builder/adapters/ComparisonSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { OutcomeCardsSection } from "@/components/sections/OutcomeCardsSection";
import { TrueCostSection } from "@/components/sections/TrueCostSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SolutionTypesSection } from "@/components/sections/SolutionTypesSection";
import { SERVICE_BENEFIT_ICONS } from "@/components/sections/ServiceBenefitsSection";
import { DEFAULT_INDUSTRIES } from "@/data/industryDetail";
import { splitComparisonSection } from "@/sanity/schemaTypes/sections/splitComparisonSection";
import { serviceBenefitsSection } from "@/sanity/schemaTypes/sections/serviceBenefitsSection";
import { explainerCardsSection } from "@/sanity/schemaTypes/sections/explainerCardsSection";
import { trueCostSection } from "@/sanity/schemaTypes/sections/trueCostSection";
import { solutionTypesSection } from "@/sanity/schemaTypes/sections/solutionTypesSection";
import { sectionTypes } from "@/sanity/schemaTypes/sections";

const img = (hash: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
});
type El = { type?: unknown; key?: string | number | null; props: Record<string, unknown> };
const props = (node: unknown) => (node as El).props;
/** Element keys as strings: the JSX runtime may hand back numbers. */
const keyOf = (e: El) => (e.key === null || e.key === undefined ? null : String(e.key));

/** Every element reachable through props.children, without rendering anything. */
function collect(node: unknown, out: El[] = []): El[] {
  if (Array.isArray(node)) node.forEach((n) => collect(n, out));
  else if (node && typeof node === "object" && "props" in node) {
    out.push(node as El);
    collect((node as El).props.children, out);
  }
  return out;
}

/** The text of a heading node, with <br/> as a newline and the squiggle ignored. */
function textOf(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return (node as El).type === "br" ? "\n" : textOf((node as El).props.children);
  }
  return "";
}

const hasMark = (node: unknown) => collect(node).some((e) => typeof e.props.className === "string" && String(e.props.className).includes("inline-block"));

/** The values of a string field's `options.list`, found by field name. */
function listValues(fields: unknown, ...path: string[]): string[] {
  type F = { name: string; of?: { fields?: F[] }[]; options?: { list?: { value: string }[] } };
  let level = fields as F[];
  let field: F | undefined;
  for (const name of path) {
    field = level.find((f) => f.name === name);
    level = field?.of?.[0]?.fields ?? [];
  }
  return (field?.options?.list ?? []).map((o) => o.value);
}
const fieldsOf = (section: unknown) => (section as { fields: unknown }).fields;

const NAMES = [
  "splitComparisonSection",
  "serviceBenefitsSection",
  "organisationTypesSection",
  "outcomeCardsSection",
  "explainerCardsSection",
  "trueCostSection",
  "solutionTypesSection",
  "industryDetailSection",
  "comparisonSection",
];

test.describe("registry", () => {
  test("registers all nine industry and partnership section types", () => {
    for (const name of NAMES) {
      expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
      expect(sectionTypes.some((t) => t.name === name), `schema ${name}`).toBe(true);
    }
  });
});

test.describe("splitComparisonSection adapter", () => {
  test("maps heading, subtitle, cards (line-break titles, colour) and className", () => {
    const p = props(
      splitComparisonSectionAdapter({
        _type: "splitComparisonSection",
        _key: "k",
        heading: { text: "One Connected Marketing Process", mark: "none" },
        subtitle: "Sub",
        className: "bg-linear-to-b from-white to-brand-blue-light",
        cards: [
          { _key: "a", title: { text: "Build Audiences\nFrom Salesforce" }, text: "T1", color: "#33FF00" },
          { _key: "b", title: { text: "The Common Mistake" }, text: "T2", color: "#FFB030" },
        ],
      }),
    );
    expect(p.heading).toBe("One Connected Marketing Process");
    expect(p).toMatchObject({ subtitle: "Sub", className: "bg-linear-to-b from-white to-brand-blue-light" });
    const cards = p.cards as { title: unknown; text: string; color: string }[];
    expect(textOf(cards[0].title)).toBe("Build Audiences\nFrom Salesforce");
    expect(hasMark(cards[0].title)).toBe(false);
    expect(cards[1].title).toBe("The Common Mistake");
    expect(cards.map((c) => c.color)).toEqual(["#33FF00", "#FFB030"]);
  });

  test("empty className and subtitle become undefined; no cards stay an empty list", () => {
    const p = props(splitComparisonSectionAdapter({ _type: "splitComparisonSection", _key: "k", heading: { text: "H" }, subtitle: "", className: "" }));
    expect(p.subtitle).toBeUndefined();
    expect(p.className).toBeUndefined();
    expect(p.cards).toEqual([]);
  });

  test("the colour and className lists hold every value the pages pass, plus the default", () => {
    const f = fieldsOf(splitComparisonSection);
    expect(new Set(listValues(f, "cards", "color"))).toEqual(new Set(["#33FF00", "#308FFF", "#8800FF", "#FFB030", "#FFA530"]));
    const classes = listValues(f, "className");
    expect(classes).toContain("bg-linear-to-b from-white to-brand-blue-light");
    expect(classes).toContain("bg-[#F6F6F6] border-y border-[#38A81B] mt-20");
    expect(classes).toHaveLength(2);
  });
});

test.describe("serviceBenefitsSection adapter", () => {
  test("maps title and items; iconKey and colorTheme pass through", () => {
    const p = props(
      serviceBenefitsSectionAdapter({
        _type: "serviceBenefitsSection",
        _key: "k",
        title: "How We Implement Dotdigital",
        items: [
          { _key: "a", title: "Review", description: "D1", iconKey: "review", colorTheme: "blue" },
          { _key: "b", title: "Launch and Support", description: "D2", iconKey: "launch", colorTheme: "pink" },
        ],
      }),
    );
    expect(p.title).toBe("How We Implement Dotdigital");
    expect(p.items).toEqual([
      { title: "Review", description: "D1", iconKey: "review", colorTheme: "blue" },
      { title: "Launch and Support", description: "D2", iconKey: "launch", colorTheme: "pink" },
    ]);
  });

  test("empty fields become undefined so the component defaults apply", () => {
    const p = props(
      serviceBenefitsSectionAdapter({
        _type: "serviceBenefitsSection",
        _key: "k",
        title: "",
        items: [{ _key: "a", title: "T", description: "", iconKey: undefined, colorTheme: undefined }],
      }),
    );
    expect(p.title).toBeUndefined();
    expect((p.items as Record<string, unknown>[])[0]).toMatchObject({ title: "T", description: "", iconKey: undefined, colorTheme: undefined });
    expect(props(serviceBenefitsSectionAdapter({ _type: "serviceBenefitsSection", _key: "k" })).items).toEqual([]);
  });

  test("every key resolves to the lucide icon the pages pass; the original keys are unchanged", () => {
    expect(SERVICE_BENEFIT_ICONS).toMatchObject({
      roi: TrendingUp,
      adoption: Users,
      maturity: Layers,
      visibility: Eye,
      view360: RotateCw,
      partnership: Handshake,
      review: ClipboardList,
      plan: Workflow,
      configure: Cog,
      test: FileCheck2,
      launch: HeartHandshake,
    });
    expect(Object.keys(SERVICE_BENEFIT_ICONS)).toHaveLength(11);
  });

  test("the iconKey and colorTheme lists match the map and the themes", () => {
    const f = fieldsOf(serviceBenefitsSection);
    expect(new Set(listValues(f, "items", "iconKey"))).toEqual(new Set(Object.keys(SERVICE_BENEFIT_ICONS)));
    expect(new Set(listValues(f, "items", "colorTheme"))).toEqual(new Set(["blue", "green", "yellow", "peach", "pink", "purple"]));
  });
});

test.describe("organisationTypesSection adapter", () => {
  test("maps title, subtitle, items and stacked images", () => {
    const p = props(
      organisationTypesSectionAdapter({
        _type: "organisationTypesSection",
        _key: "k",
        title: "Institutions We Work With",
        subtitle: "Sub",
        items: [{ _key: "a", title: "Universities", paragraphs: ["p1", "p2"] }],
        images: [img("aaa111"), img("bbb222")],
      }),
    );
    expect(p).toMatchObject({ title: "Institutions We Work With", subtitle: "Sub", items: [{ title: "Universities", paragraphs: ["p1", "p2"] }] });
    expect((p.images as string[]).map((s) => s.match(/(aaa111|bbb222)/)?.[1])).toEqual(["aaa111", "bbb222"]);
  });

  test("empty subtitle and images become undefined; an unset image is dropped", () => {
    const empty = props(organisationTypesSectionAdapter({ _type: "organisationTypesSection", _key: "k", title: "T", subtitle: "", images: [] }));
    expect(empty.subtitle).toBeUndefined();
    expect(empty.images).toBeUndefined();
    expect(empty.items).toEqual([]);
    const some = props(organisationTypesSectionAdapter({ _type: "organisationTypesSection", _key: "k", title: "T", images: [{ _type: "image" }, img("ccc333")] }));
    expect(some.images as string[]).toHaveLength(1);
    expect(props(organisationTypesSectionAdapter({ _type: "organisationTypesSection", _key: "k", title: "T", items: [{ _key: "a", title: "X" }] })).items).toEqual([{ title: "X", paragraphs: [] }]);
  });
});

test.describe("outcomeCardsSection adapter", () => {
  test("maps cards; the title keeps its line break", () => {
    const p = props(
      outcomeCardsSectionAdapter({
        _type: "outcomeCardsSection",
        _key: "k",
        cards: [{ _key: "a", title: "Simplify\nGift Aid", text: "T", icon: img("ddd444") }],
      }),
    );
    const card = (p.cards as Record<string, unknown>[])[0];
    expect(card).toMatchObject({ title: "Simplify\nGift Aid", text: "T" });
    expect(String(card.icon)).toContain("ddd444-1920x1080.webp");
  });

  test("a card without an icon is dropped and no cards stay an empty list", () => {
    const p = props(outcomeCardsSectionAdapter({ _type: "outcomeCardsSection", _key: "k", cards: [{ _key: "a", title: "T", text: "x" }] }));
    expect(p.cards).toEqual([]);
    expect(props(outcomeCardsSectionAdapter({ _type: "outcomeCardsSection", _key: "k" })).cards).toEqual([]);
  });

  test("cards with the same title get distinct keys", () => {
    const tree = collect(OutcomeCardsSection({ cards: [{ title: "Same", text: "a", icon: "/a.webp" }, { title: "Same", text: "b", icon: "/b.webp" }] }));
    expect(tree.filter((e) => e.type === "article").map(keyOf)).toEqual(["0", "1"]);
  });
});

test.describe("explainerCardsSection adapter", () => {
  test("maps heading, cards, the CTA and the plain variant", () => {
    const p = props(
      explainerCardsSectionAdapter({
        _type: "explainerCardsSection",
        _key: "k",
        heading: { text: "What Do You Need Help With?" },
        iconVariant: "plain",
        cards: [
          { _key: "a", title: { text: "Implement Dotdigital" }, text: "T1", icon: img("eee555"), cta: { label: "Plan", href: "/contact" } },
          { _key: "b", title: { text: "It automates,\nnot just responds" }, text: "T2", icon: img("fff666"), cta: { label: "", href: "" } },
        ],
      }),
    );
    expect(p.heading).toBe("What Do You Need Help With?");
    expect(p.iconVariant).toBe("plain");
    const cards = p.cards as { title: unknown; icon: string; cta?: unknown }[];
    expect(cards[0].title).toBe("Implement Dotdigital");
    expect(cards[0].cta).toEqual({ label: "Plan", href: "/contact" });
    expect(textOf(cards[1].title)).toBe("It automates,\nnot just responds");
    expect(cards[1].cta).toBeUndefined();
    expect(cards[1].icon).toContain("fff666-1920x1080.webp");
  });

  test("an unset variant stays undefined (the tile default); only the plain variant needs the icon", () => {
    const card = { _key: "a", title: { text: "T" }, text: "t" };
    const tile = props(explainerCardsSectionAdapter({ _type: "explainerCardsSection", _key: "k", heading: { text: "H" }, cards: [card] }));
    expect(tile.iconVariant).toBeUndefined();
    // The tile draws the icon as a CSS mask, so a missing one is harmless.
    expect((tile.cards as { icon: string }[])).toHaveLength(1);
    const plain = explainerCardsSectionAdapter({ _type: "explainerCardsSection", _key: "k", heading: { text: "H" }, iconVariant: "plain", cards: [card] });
    expect(plain).toBeNull();
  });

  test("no cards render nothing", () => {
    expect(explainerCardsSectionAdapter({ _type: "explainerCardsSection", _key: "k", heading: { text: "H" } })).toBeNull();
  });

  test("the iconVariant list holds both variants", () => {
    expect(listValues(fieldsOf(explainerCardsSection), "iconVariant").sort()).toEqual(["plain", "tile"]);
  });
});

test.describe("trueCostSection adapter", () => {
  const data = {
    _type: "trueCostSection" as const,
    _key: "k",
    heading: { text: "What’s The True Cost of Salesforce for Nonprofits", mark: "after" as const, markStyle: "section" as const },
    subtitle: "Sub",
    intro: ["i1", "i2"],
    cards: [
      { _key: "a", title: "Power of Us", text: "p1\n\np2", bullets: ["b1"], background: "var(--color-cost-card-green)", iconColor: "var(--color-brand-green)", icon: img("111aaa") },
      { _key: "b", title: "Types", text: "t", bullets: [], background: "var(--color-cost-card-blue)", iconColor: "var(--color-cost-icon-blue)" },
    ],
    panelTitle: "Simplifying",
    highlights: [{ _key: "h", label: "L", text: "T" }],
  };

  test("maps heading with a section squiggle, intro, cards, panel and highlights", () => {
    const p = props(trueCostSectionAdapter(data));
    expect(textOf(p.heading)).toBe("What’s The True Cost of Salesforce for Nonprofits ");
    expect(hasMark(p.heading)).toBe(true);
    expect(p).toMatchObject({ subtitle: "Sub", intro: ["i1", "i2"], panelTitle: "Simplifying", highlights: [{ label: "L", text: "T" }] });
    const cards = p.cards as Record<string, unknown>[];
    expect(cards[0]).toMatchObject({ title: "Power of Us", text: "p1\n\np2", bullets: ["b1"], background: "var(--color-cost-card-green)", iconColor: "var(--color-brand-green)" });
    expect(String(cards[0].icon)).toContain("111aaa-1920x1080.webp");
    expect(cards[1].bullets).toBeUndefined();
    expect(cards[1].icon).toBeUndefined();
  });

  test("empty fields become undefined so the component defaults apply", () => {
    const p = props(trueCostSectionAdapter({ _type: "trueCostSection", _key: "k", heading: { text: "H" }, subtitle: "", intro: [], panelTitle: "", highlights: [], cards: [] }));
    for (const key of ["subtitle", "intro", "cards", "panelTitle", "highlights"]) expect(p[key], key).toBeUndefined();
  });

  test("repeated text gets distinct keys", () => {
    const card = { title: "Same", text: "t", bullets: ["b", "b"], background: "x", iconColor: "y" };
    const tree = collect(TrueCostSection({ heading: "H", cards: [card, card], panelTitle: "P", highlights: [{ label: "L", text: "a" }, { label: "L", text: "b" }] }));
    const keys = (type: unknown) => tree.filter((e) => e.type === type).map(keyOf);
    expect(keys("article")).toEqual(["0", "1"]);
    expect(keys("div").filter((k) => k !== null)).toEqual(["0", "1"]);
    const bulletKeys = tree.filter((e) => e.props.as === "li").map(keyOf);
    // Keys only need to be unique within one list: two cards of two identical bullets.
    expect(bulletKeys).toEqual(["0", "1", "0", "1"]);
  });

  test("the colour lists hold exactly the values the nonprofit page passes", () => {
    const f = fieldsOf(trueCostSection);
    expect(new Set(listValues(f, "cards", "background"))).toEqual(new Set(["var(--color-cost-card-green)", "var(--color-cost-card-blue)"]));
    expect(new Set(listValues(f, "cards", "iconColor"))).toEqual(new Set(["var(--color-brand-green)", "var(--color-cost-icon-blue)"]));
  });
});

test.describe("solutionTypesSection adapter", () => {
  test("maps heading, subtitle and cards; icon through imageSrc", () => {
    const p = props(
      solutionTypesSectionAdapter({
        _type: "solutionTypesSection",
        _key: "k",
        heading: { text: "Solutions We’ve Delivered" },
        subtitle: "Sub",
        cards: [{ _key: "a", title: "Grantmaking", text: "T", icon: img("222bbb"), color: "var(--color-type-teal)" }],
      }),
    );
    expect(p).toMatchObject({ heading: "Solutions We’ve Delivered", subtitle: "Sub" });
    const card = (p.cards as Record<string, unknown>[])[0];
    expect(card).toMatchObject({ title: "Grantmaking", text: "T", color: "var(--color-type-teal)" });
    expect(String(card.icon)).toContain("222bbb-1920x1080.webp");
  });

  test("no cards and no subtitle become undefined", () => {
    const p = props(solutionTypesSectionAdapter({ _type: "solutionTypesSection", _key: "k", heading: { text: "H" }, subtitle: "", cards: [] }));
    expect(p.subtitle).toBeUndefined();
    expect(p.cards).toBeUndefined();
  });

  test("cards with the same title get distinct keys", () => {
    const card = { title: "Same", text: "t", icon: "/a.png", color: "red" };
    const tree = collect(SolutionTypesSection({ heading: "H", cards: [card, card] }));
    expect(tree.filter((e) => e.type === "article").map(keyOf)).toEqual(["0", "1"]);
  });

  test("the colour list holds exactly the five tokens the nonprofit page passes", () => {
    expect(new Set(listValues(fieldsOf(solutionTypesSection), "cards", "color"))).toEqual(
      new Set(["var(--color-brand-green)", "var(--color-type-teal)", "var(--color-type-purple)", "var(--color-type-magenta)", "var(--color-type-amber)"]),
    );
  });
});

test.describe("industryDetailSection adapter", () => {
  test("keeps today's six industries as the default list", () => {
    expect(DEFAULT_INDUSTRIES.map((i) => i.title)).toEqual(["Nonprofit", "Education", "Commerce", "Healthcare", "Financial Services", "Manufacturing"]);
    expect(DEFAULT_INDUSTRIES.filter((i) => i.href)).toHaveLength(5);
  });

  test("maps industries; image through imageSrc, empty href undefined", () => {
    const p = props(
      industryDetailSectionAdapter({
        _type: "industryDetailSection",
        _key: "k",
        industries: [
          { _key: "a", title: "Nonprofit", image: img("333ccc"), description: "D", href: "/industries/x" },
          { _key: "b", title: "Manufacturing", image: img("444ddd"), description: "D2", href: "" },
        ],
      }),
    );
    const items = p.industries as Record<string, unknown>[];
    expect(items[0]).toMatchObject({ title: "Nonprofit", description: "D", href: "/industries/x" });
    expect(String(items[0].image)).toContain("333ccc-1920x1080.webp");
    expect(items[1].href).toBeUndefined();
  });

  test("an industry without an image is dropped; no industries keep the default list", () => {
    const p = props(industryDetailSectionAdapter({ _type: "industryDetailSection", _key: "k", industries: [{ _key: "a", title: "T", description: "D" }, { _key: "b", title: "U", description: "D", image: img("555eee") }] }));
    expect(p.industries as unknown[]).toHaveLength(1);
    expect(props(industryDetailSectionAdapter({ _type: "industryDetailSection", _key: "k", industries: [] })).industries).toBeUndefined();
    expect(props(industryDetailSectionAdapter({ _type: "industryDetailSection", _key: "k" })).industries).toBeUndefined();
  });
});

test.describe("comparisonSection adapter", () => {
  test("maps every field; the heading has a section squiggle", () => {
    const p = props(
      comparisonSectionAdapter({
        _type: "comparisonSection",
        _key: "k",
        heading: { text: "DIY Implementation vs Certified Partner", mark: "after", markStyle: "section" },
        subtitle: "Sub",
        negativeTitle: "What DIY Costs",
        negativeItems: ["n1", "n2"],
        positiveTitle: "What ProvidusCRM Brings",
        positiveItems: ["p1"],
        footnote: "Foot",
        buttonLabel: "Book a Call",
        buttonHref: "/contact",
      }),
    );
    expect(textOf(p.heading)).toBe("DIY Implementation vs Certified Partner ");
    expect(hasMark(p.heading)).toBe(true);
    expect(p).toMatchObject({
      subtitle: "Sub",
      negativeTitle: "What DIY Costs",
      negativeItems: ["n1", "n2"],
      positiveTitle: "What ProvidusCRM Brings",
      positiveItems: ["p1"],
      footnote: "Foot",
      buttonLabel: "Book a Call",
      buttonHref: "/contact",
    });
  });

  test("empty optional fields become undefined; the lists stay lists", () => {
    const p = props(comparisonSectionAdapter({ _type: "comparisonSection", _key: "k", heading: { text: "H" }, subtitle: "", footnote: "", buttonLabel: "", buttonHref: "" }));
    for (const key of ["subtitle", "footnote", "buttonLabel", "buttonHref"]) expect(p[key], key).toBeUndefined();
    expect(p.negativeItems).toEqual([]);
    expect(p.positiveItems).toEqual([]);
  });

  test("repeated items get distinct keys", () => {
    const tree = collect(ComparisonSection({ heading: "H", negativeTitle: "n", negativeItems: ["x", "x"], positiveTitle: "p", positiveItems: ["y", "y"] }));
    const keys = tree.filter((e) => e.key !== null && e.key !== undefined).map(keyOf);
    expect(keys).toEqual(["0", "1", "0", "1"]);
  });
});
