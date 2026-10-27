import { test, expect } from "@playwright/test";
import { industriesSectionAdapter } from "@/components/sanity/page-builder/adapters/IndustriesSection";
import { believeSectionAdapter } from "@/components/sanity/page-builder/adapters/BelieveSection";
import { teamThoughtsSectionAdapter } from "@/components/sanity/page-builder/adapters/TeamThoughtsSection";
import { teamGallerySectionAdapter } from "@/components/sanity/page-builder/adapters/TeamGallerySection";
import { exploreSectionAdapter } from "@/components/sanity/page-builder/adapters/ExploreSection";
import { eventsSectionAdapter } from "@/components/sanity/page-builder/adapters/EventsSection";
import { categoriesSectionAdapter } from "@/components/sanity/page-builder/adapters/CategoriesSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { DEFAULT_INDUSTRIES } from "@/components/sections/IndustriesSection";
import { DEFAULT_BELIEVE_CARDS } from "@/components/sections/BelieveSection";
import { DEFAULT_TEAM_THOUGHTS } from "@/components/sections/TeamThoughtsSection";
import { DEFAULT_TOP_ROW, DEFAULT_BOTTOM_ROW } from "@/components/sections/TeamGallerySection";
import { DEFAULT_EXPLORE_TILES } from "@/components/sections/ExploreSection";
import { DEFAULT_EVENTS } from "@/components/sections/EventsSection";
import { DEFAULT_CATEGORIES } from "@/components/sections/CategoriesSection";
import { categoriesSection } from "@/sanity/schemaTypes/sections/categoriesSection";
import { teamGallerySection } from "@/sanity/schemaTypes/sections/teamGallerySection";

const img = (hash: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
  ...(alt !== undefined ? { alt } : {}),
});
type El = { props: Record<string, unknown> };
const props = (node: unknown) => (node as El).props;

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

test.describe("registry", () => {
  test("registers all seven home and about section types", () => {
    for (const name of [
      "industriesSection",
      "believeSection",
      "teamThoughtsSection",
      "teamGallerySection",
      "exploreSection",
      "eventsSection",
      "categoriesSection",
    ]) {
      expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
    }
  });
});

test.describe("industriesSection adapter", () => {
  test("maps the title and items, with an empty href as undefined", () => {
    const p = props(
      industriesSectionAdapter({
        _type: "industriesSection",
        _key: "k",
        title: "T",
        items: [
          { _key: "a", title: "Health", description: "D", image: img("abc123"), href: "/industries/x" },
          { _key: "b", title: "Retail", description: "D2", image: img("def456"), href: "" },
        ],
      }),
    );
    expect(p.title).toBe("T");
    const items = p.items as Record<string, unknown>[];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ title: "Health", description: "D", href: "/industries/x" });
    expect(String(items[0].image)).toContain("abc123-1920x1080.webp");
    expect(items[1].href).toBeUndefined();
  });

  test("skips an item without an image and falls back to the defaults when none are left", () => {
    const p = props(
      industriesSectionAdapter({ _type: "industriesSection", _key: "k", title: "", items: [{ _key: "a", title: "No image" }] }),
    );
    expect(p.title).toBeUndefined();
    expect(p.items).toBeUndefined();
    expect(props(industriesSectionAdapter({ _type: "industriesSection", _key: "k" })).items).toBeUndefined();
  });

  test("the component default is the six standard industries", () => {
    expect(DEFAULT_INDUSTRIES).toHaveLength(6);
    expect(DEFAULT_INDUSTRIES[5].href).toBeUndefined();
  });
});

test.describe("believeSection adapter", () => {
  test("maps cards: icon and background are images, href and colour stay optional", () => {
    const p = props(
      believeSectionAdapter({
        _type: "believeSection",
        _key: "k",
        title: "Our Partnerships",
        cards: [
          { _key: "a", title: "FinDock", description: "D", icon: img("abc123"), bgImage: img("def456"), href: "/partnership/findock" },
          { _key: "b", title: "Salesforce", description: "D2", icon: img("abc789"), bgImage: undefined, href: "", bgColor: "" },
        ],
      }),
    );
    expect(p.title).toBe("Our Partnerships");
    const cards = p.cards as Record<string, unknown>[];
    expect(cards[0]).toMatchObject({ title: "FinDock", description: "D", href: "/partnership/findock" });
    expect(String(cards[0].icon)).toContain("abc123-1920x1080.webp");
    expect(String(cards[0].bgImage)).toContain("def456-1920x1080.webp");
    expect(cards[1].bgImage).toBeUndefined();
    expect(cards[1].href).toBeUndefined();
    expect(cards[1].bgColor).toBeUndefined();
  });

  test("passes a chosen fallback colour, skips an icon-less card and defaults when empty", () => {
    const cards = props(
      believeSectionAdapter({
        _type: "believeSection",
        _key: "k",
        cards: [
          { _key: "a", title: "Keep", icon: img("abc123"), bgColor: "var(--color-brand-blue-light)" },
          { _key: "b", title: "Drop" },
        ],
      }),
    ).cards as Record<string, unknown>[];
    expect(cards).toHaveLength(1);
    expect(cards[0].bgColor).toBe("var(--color-brand-blue-light)");
    expect(props(believeSectionAdapter({ _type: "believeSection", _key: "k", title: "" })).title).toBeUndefined();
    expect(props(believeSectionAdapter({ _type: "believeSection", _key: "k" })).cards).toBeUndefined();
    expect(DEFAULT_BELIEVE_CARDS).toHaveLength(4);
  });
});

test.describe("teamThoughtsSection adapter", () => {
  test("maps members; the short name and designation fall back to the full ones", () => {
    const p = props(
      teamThoughtsSectionAdapter({
        _type: "teamThoughtsSection",
        _key: "k",
        title: "Meet Our Team",
        subtitle: "S",
        members: [
          {
            _key: "m1",
            name: "Mohsin J. Khan",
            displayName: "Mohsin Khan",
            designation: "Founder",
            fullDesignation: "Founder at ProvidusCRM",
            quote: "Q",
            image: img("abc123"),
          },
          { _key: "m2", name: "Adil Raja", designation: "Chief CRM Officer", quote: "Q2", image: img("def456") },
        ],
      }),
    );
    expect(p.title).toBe("Meet Our Team");
    expect(p.subtitle).toBe("S");
    const members = p.members as Record<string, unknown>[];
    expect(members[0]).toMatchObject({
      id: "m1",
      name: "Mohsin J. Khan",
      displayName: "Mohsin Khan",
      designation: "Founder",
      fullDesignation: "Founder at ProvidusCRM",
      quote: "Q",
    });
    expect(String(members[0].image)).toContain("abc123-1920x1080.webp");
    expect(members[1]).toMatchObject({ displayName: "Adil Raja", fullDesignation: "Chief CRM Officer" });
  });

  test("skips a member without a photo and defaults when empty", () => {
    const p = props(
      teamThoughtsSectionAdapter({ _type: "teamThoughtsSection", _key: "k", title: "", subtitle: "", members: [{ _key: "x", name: "No photo" }] }),
    );
    expect(p.title).toBeUndefined();
    expect(p.subtitle).toBeUndefined();
    expect(p.members).toBeUndefined();
    expect(DEFAULT_TEAM_THOUGHTS).toHaveLength(4);
  });
});

test.describe("teamGallerySection adapter", () => {
  test("keeps each position's layout and takes the photo, alt and crop from the editor", () => {
    const p = props(
      teamGallerySectionAdapter({
        _type: "teamGallerySection",
        _key: "k",
        headingStart: "Start",
        headingEnd: "End",
        topRow: [
          { _key: "a", image: img("abc123", "Team at the office") },
          { _key: "b", image: img("def456", "Signing"), crop: "object-[32%_69%] origin-[32%_69%] scale-[1.29]" },
        ],
        bottomRow: [{ _key: "c", image: img("abc789", "Laptop"), crop: "" }],
      }),
    );
    expect(p.headingStart).toBe("Start");
    expect(p.headingEnd).toBe("End");
    const top = p.topRow as Record<string, unknown>[];
    expect(top).toHaveLength(2);
    expect(top[0]).toMatchObject({ alt: "Team at the office", aspect: DEFAULT_TOP_ROW[0].aspect, sizes: DEFAULT_TOP_ROW[0].sizes });
    expect(top[0].imageClassName).toBeUndefined();
    expect(String(top[0].src)).toContain("abc123-1920x1080.webp");
    expect(top[1]).toMatchObject({ aspect: DEFAULT_TOP_ROW[1].aspect, imageClassName: DEFAULT_TOP_ROW[1].imageClassName });
    const bottom = p.bottomRow as Record<string, unknown>[];
    expect(bottom).toHaveLength(1);
    expect(bottom[0].imageClassName).toBeUndefined();
  });

  test("a photo without an image is skipped; empty rows keep the defaults", () => {
    const p = props(
      teamGallerySectionAdapter({
        _type: "teamGallerySection",
        _key: "k",
        headingStart: "",
        topRow: [{ _key: "a" }],
      }),
    );
    expect(p.headingStart).toBeUndefined();
    expect(p.topRow).toBeUndefined();
    expect(p.bottomRow).toBeUndefined();
  });

  test("the crop list holds every crop the default photos use", () => {
    const fields = (teamGallerySection as unknown as { fields: unknown }).fields;
    const crops = listValues(fields, "topRow", "crop");
    const bottomCrops = listValues(fields, "bottomRow", "crop");
    for (const photo of [...DEFAULT_TOP_ROW, ...DEFAULT_BOTTOM_ROW]) {
      if (!photo.imageClassName) continue;
      expect([...crops, ...bottomCrops], photo.imageClassName).toContain(photo.imageClassName);
    }
  });
});

test.describe("exploreSection adapter", () => {
  test("maps title and tiles; an unset tile field takes the standard tile's at that position", () => {
    const p = props(
      exploreSectionAdapter({
        _type: "exploreSection",
        _key: "k",
        title: "Explore us",
        tiles: [
          { _key: "a", title: "Services", href: "/svc", image: img("abc123", "Services art") },
          { _key: "b", title: "", href: "", image: undefined },
        ],
      }),
    );
    expect(p.title).toBe("Explore us");
    const tiles = p.tiles as Record<string, unknown>[];
    expect(tiles).toHaveLength(3);
    expect(tiles[0]).toMatchObject({ title: "Services", href: "/svc", imageAlt: "Services art" });
    expect(String(tiles[0].image)).toContain("abc123-1920x1080.webp");
    expect(tiles[1]).toEqual(DEFAULT_EXPLORE_TILES[1]);
    expect(tiles[2]).toEqual(DEFAULT_EXPLORE_TILES[2]);
  });

  test("no tiles keeps the default tiles", () => {
    const p = props(exploreSectionAdapter({ _type: "exploreSection", _key: "k", title: "" }));
    expect(p.title).toBeUndefined();
    expect(p.tiles).toBeUndefined();
    expect(DEFAULT_EXPLORE_TILES.map((t) => t.href)).toEqual(["/services", "/industries", "/platform-expertise"]);
  });
});

test.describe("eventsSection adapter", () => {
  type EventOut = {
    name: string;
    bg: string;
    logo: { src: string; width: number; height: number; alt?: string };
    photos: string[];
  };
  const event = (over: Record<string, unknown> = {}) => ({
    _key: "e1",
    name: "TechCrunch",
    description: "D",
    bg: img("bbb111"),
    logo: img("abc123", "TC logo"),
    logoWidth: 123,
    logoHeight: 45,
    photos: [img("a1"), img("a2")],
    ...over,
  });

  test("maps an event and passes the logo display size through unchanged", () => {
    const p = props(eventsSectionAdapter({ _type: "eventsSection", _key: "k", title: "Events", events: [event()] }));
    expect(p.title).toBe("Events");
    const events = p.events as EventOut[]
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ name: "TechCrunch", description: "D" });
    expect(events[0].logo).toMatchObject({ width: 123, height: 45, alt: "TC logo" });
    expect(String(events[0].logo.src)).toContain("abc123-1920x1080.webp");
    expect(String(events[0].bg)).toContain("bbb111-1920x1080.webp");
    expect(events[0].photos).toHaveLength(2);
    expect(events[0].photos[1]).toContain("a2-1920x1080.webp");
  });

  test("an unset logo size is half the 2x export; an unset logo alt falls back to undefined", () => {
    const events = props(
      eventsSectionAdapter({
        _type: "eventsSection",
        _key: "k",
        events: [event({ logoWidth: undefined, logoHeight: undefined, logo: img("abc123") })],
      }),
    ).events as EventOut[]
    expect(events[0].logo).toMatchObject({ width: 960, height: 540 });
    expect(events[0].logo.alt).toBeUndefined();
  });

  test("skips an event with no background or logo, and a photo with no upload", () => {
    const events = props(
      eventsSectionAdapter({
        _type: "eventsSection",
        _key: "k",
        events: [event({ _key: "ok", photos: [img("a1"), {}] }), event({ _key: "nobg", bg: undefined }), event({ _key: "nologo", logo: undefined })],
      }),
    ).events as EventOut[]
    expect(events).toHaveLength(1);
    expect(events[0].photos).toHaveLength(1);
  });

  test("no usable events keeps the defaults", () => {
    expect(props(eventsSectionAdapter({ _type: "eventsSection", _key: "k", title: "", events: [event({ bg: undefined })] })).events).toBeUndefined();
    expect(props(eventsSectionAdapter({ _type: "eventsSection", _key: "k", title: "" })).title).toBeUndefined();
  });

  test("the defaults keep today's four events, logo sizes and folder paths", () => {
    expect(DEFAULT_EVENTS.map((e) => e.name)).toEqual([
      "TechCrunch Disrupt",
      "Singapore FinTech Festival",
      "GITEX Asia Singapore",
      "AI Everything Middle East & Africa, Egypt",
    ]);
    expect(DEFAULT_EVENTS[0].logo).toMatchObject({ width: 416, height: 82, src: "/images/events/disrupt/logo.webp" });
    expect(DEFAULT_EVENTS[0].photos).toHaveLength(8);
    expect(DEFAULT_EVENTS[1].bg).toBe("/images/events/singapore-fintect/bg.webp");
    expect(DEFAULT_EVENTS[2].photos[3]).toBe("/images/events/gitex-singapre/4.webp");
  });
});

test.describe("categoriesSection adapter", () => {
  test("maps categories, passing both gradients and the link through", () => {
    const [box, icon] = [DEFAULT_CATEGORIES[1].boxGradient, DEFAULT_CATEGORIES[1].iconGradient];
    const cats = props(
      categoriesSectionAdapter({
        _type: "categoriesSection",
        _key: "k",
        categories: [
          { _key: "a", title: "Dev", text: "T", icon: img("abc123"), boxGradient: box, iconGradient: icon, href: "/services/dev" },
          { _key: "b", title: "Support", text: "T2", icon: img("def456"), boxGradient: box, iconGradient: icon, href: "" },
        ],
      }),
    ).categories as Record<string, unknown>[];
    expect(cats[0]).toMatchObject({ title: "Dev", text: "T", boxGradient: box, iconGradient: icon, href: "/services/dev" });
    expect(String(cats[0].icon)).toContain("abc123-1920x1080.webp");
    // Support and Maintenance has no link today and must render without one.
    expect(cats[1].href).toBeUndefined();
  });

  test("an unset gradient takes the standard one at that position; no icon skips the card; none defaults", () => {
    const cats = props(
      categoriesSectionAdapter({
        _type: "categoriesSection",
        _key: "k",
        categories: [
          { _key: "a", title: "A", text: "T", icon: img("abc123") },
          { _key: "b", title: "B", text: "T" },
        ],
      }),
    ).categories as Record<string, unknown>[];
    expect(cats).toHaveLength(1);
    expect(cats[0].boxGradient).toBe(DEFAULT_CATEGORIES[0].boxGradient);
    expect(cats[0].iconGradient).toBe(DEFAULT_CATEGORIES[0].iconGradient);
    expect(props(categoriesSectionAdapter({ _type: "categoriesSection", _key: "k" })).categories).toBeUndefined();
  });

  test("the gradient enums hold every gradient the eight defaults use", () => {
    const fields = (categoriesSection as unknown as { fields: unknown }).fields;
    const box = listValues(fields, "categories", "boxGradient");
    const icon = listValues(fields, "categories", "iconGradient");
    expect(new Set(DEFAULT_CATEGORIES.map((c) => c.boxGradient))).toEqual(new Set(box));
    expect(new Set(DEFAULT_CATEGORIES.map((c) => c.iconGradient))).toEqual(new Set(icon));
    expect(DEFAULT_CATEGORIES).toHaveLength(8);
    expect(DEFAULT_CATEGORIES[7].href).toBeUndefined();
  });
});
