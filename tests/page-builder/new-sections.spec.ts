import { test, expect } from "@playwright/test";
import type { ReactNode } from "react";
import { recruitmentIntroSectionAdapter } from "@/components/sanity/page-builder/adapters/RecruitmentIntroSection";
import { talentPillsSectionAdapter } from "@/components/sanity/page-builder/adapters/TalentPillsSection";
import { hiringModelsSectionAdapter } from "@/components/sanity/page-builder/adapters/HiringModelsSection";
import { processStepsSectionAdapter } from "@/components/sanity/page-builder/adapters/ProcessStepsSection";
import { whyBandSectionAdapter } from "@/components/sanity/page-builder/adapters/WhyBandSection";
import { featuredRolesSectionAdapter } from "@/components/sanity/page-builder/adapters/FeaturedRolesSection";
import { richTextSectionAdapter } from "@/components/sanity/page-builder/adapters/RichTextSection";
import { SECTION_ADAPTERS } from "@/components/sanity/page-builder/registry";
import { DEFAULT_TALENT_PILL_ROWS } from "@/components/sections/TalentPillsSection";
import { DEFAULT_HIRING_MODELS } from "@/components/sections/HiringModelsSection";
import { DEFAULT_PROCESS_STEPS } from "@/components/sections/ProcessStepsSection";
import { DEFAULT_WHY_REASONS } from "@/components/sections/WhyBandSection";
import { richTextComponents } from "@/components/sections/RichTextSection";
import { DEFAULT_FEATURED_ROLES } from "@/data/featuredRoles";
import { DEFAULT_PRIVACY_BODY } from "@/data/privacyPolicy";
import { talentPillsSection } from "@/sanity/schemaTypes/sections/talentPillsSection";
import { hiringModelsSection } from "@/sanity/schemaTypes/sections/hiringModelsSection";
import { processStepsSection } from "@/sanity/schemaTypes/sections/processStepsSection";
import { whyBandSection } from "@/sanity/schemaTypes/sections/whyBandSection";
import { richTextSection } from "@/sanity/schemaTypes/sections/richTextSection";

const img = (hash: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: `image-${hash}-1920x1080-webp` },
  ...(alt !== undefined ? { alt } : {}),
});
type El = { type: unknown; props: Record<string, unknown> };
const props = (node: unknown) => (node as El).props;

/** The values of a string field's `options.list`, found by field name path. */
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
const sameSet = (a: string[], b: string[]) => expect([...new Set(a)].sort()).toEqual([...new Set(b)].sort());

test("registers all seven recruitment and privacy section types", () => {
  for (const name of [
    "richTextSection",
    "recruitmentIntroSection",
    "talentPillsSection",
    "hiringModelsSection",
    "processStepsSection",
    "whyBandSection",
    "featuredRolesSection",
  ]) {
    expect(typeof SECTION_ADAPTERS[name], name).toBe("function");
  }
});

test.describe("recruitmentIntroSection adapter", () => {
  test("maps the text and the icon", () => {
    const p = props(
      recruitmentIntroSectionAdapter({
        _type: "recruitmentIntroSection",
        _key: "k",
        lead: "L",
        highlight: "H",
        icon: img("abc123"),
      }),
    );
    expect(p.lead).toBe("L");
    expect(p.highlight).toBe("H");
    expect(String(p.icon)).toContain("abc123-1920x1080.webp");
  });

  test("passes undefined for empty fields", () => {
    const p = props(recruitmentIntroSectionAdapter({ _type: "recruitmentIntroSection", _key: "k", lead: "", highlight: "" }));
    expect(p.lead).toBeUndefined();
    expect(p.highlight).toBeUndefined();
    expect(p.icon).toBeUndefined();
  });
});

test.describe("talentPillsSection adapter", () => {
  test("maps the title and rows, with an empty variant as undefined", () => {
    const p = props(
      talentPillsSectionAdapter({
        _type: "talentPillsSection",
        _key: "k",
        title: "T",
        rows: [
          { _key: "a", roles: ["Dev", "Admin"], variant: "green", reverse: true },
          { _key: "b", roles: ["PM"] },
        ],
      }),
    );
    expect(p.title).toBe("T");
    expect(p.rows).toEqual([
      { roles: ["Dev", "Admin"], variant: "green", reverse: true },
      { roles: ["PM"], variant: undefined, reverse: undefined },
    ]);
  });

  test("falls back to the default rows when none are set", () => {
    const p = props(talentPillsSectionAdapter({ _type: "talentPillsSection", _key: "k", title: "" }));
    expect(p.title).toBeUndefined();
    expect(p.rows).toBeUndefined();
  });

  test("the variant list holds exactly the variants the page uses", () => {
    sameSet(listValues(talentPillsSection.fields, "rows", "variant"), DEFAULT_TALENT_PILL_ROWS.map((r) => r.variant));
  });
});

test.describe("hiringModelsSection adapter", () => {
  test("maps models and the content photo with its alt", () => {
    const p = props(
      hiringModelsSectionAdapter({
        _type: "hiringModelsSection",
        _key: "k",
        title: "T",
        models: [
          { _key: "a", title: "Hourly", text: "X", borderClass: "border-migration-blue", shadowClass: "shadow-[0_7px_14px_0_rgba(48,143,255,0.21)]" },
          { _key: "b", title: "Bare" },
        ],
        image: img("abc123", "A photo"),
      }),
    );
    expect(p.title).toBe("T");
    expect(p.models).toEqual([
      { title: "Hourly", text: "X", borderClass: "border-migration-blue", shadowClass: "shadow-[0_7px_14px_0_rgba(48,143,255,0.21)]" },
      { title: "Bare", text: "", borderClass: undefined, shadowClass: undefined },
    ]);
    expect(String(p.image)).toContain("abc123-1920x1080.webp");
    expect(p.imageAlt).toBe("A photo");
  });

  test("an uploaded photo without alt is decorative, and no photo keeps the default", () => {
    const withImage = props(hiringModelsSectionAdapter({ _type: "hiringModelsSection", _key: "k", image: img("abc123") }));
    expect(withImage.imageAlt).toBe("");
    const without = props(hiringModelsSectionAdapter({ _type: "hiringModelsSection", _key: "k" }));
    expect(without.image).toBeUndefined();
    expect(without.imageAlt).toBeUndefined();
    expect(without.models).toBeUndefined();
  });

  test("the class lists hold exactly the values the page uses", () => {
    sameSet(listValues(hiringModelsSection.fields, "models", "borderClass"), DEFAULT_HIRING_MODELS.map((m) => m.borderClass));
    sameSet(listValues(hiringModelsSection.fields, "models", "shadowClass"), DEFAULT_HIRING_MODELS.map((m) => m.shadowClass));
  });
});

test.describe("processStepsSection adapter", () => {
  test("maps steps with the plain icon and the gradient", () => {
    const p = props(
      processStepsSectionAdapter({
        _type: "processStepsSection",
        _key: "k",
        title: "T",
        steps: [{ _key: "a", title: "Kickoff", text: "Body", icon: img("abc123"), gradient: "to-[#dcf1ff]" }],
      }),
    );
    expect(p.title).toBe("T");
    const steps = p.steps as Record<string, unknown>[];
    expect(steps).toHaveLength(1);
    expect(steps[0]).toMatchObject({ title: "Kickoff", text: "Body", gradient: "to-[#dcf1ff]" });
    expect(String(steps[0].icon)).toContain("abc123-1920x1080.webp");
  });

  test("an empty gradient and no steps are undefined", () => {
    const p = props(
      processStepsSectionAdapter({ _type: "processStepsSection", _key: "k", steps: [{ _key: "a", title: "S", gradient: "" }] }),
    );
    expect((p.steps as Record<string, unknown>[])[0].gradient).toBeUndefined();
    expect(props(processStepsSectionAdapter({ _type: "processStepsSection", _key: "k" })).steps).toBeUndefined();
  });

  test("the gradient list holds exactly the values the page uses", () => {
    sameSet(listValues(processStepsSection.fields, "steps", "gradient"), DEFAULT_PROCESS_STEPS.map((s) => s.gradient));
  });
});

test.describe("whyBandSection adapter", () => {
  test("maps reasons, the plain background and the content photo", () => {
    const p = props(
      whyBandSectionAdapter({
        _type: "whyBandSection",
        _key: "k",
        title: "T",
        backgroundImage: img("bd0001"),
        reasons: [{ _key: "a", title: "R", text: "B", icon: img("abc123"), titleClass: "text-salesforce-blue" }],
        image: img("def456", "Handshake"),
      }),
    );
    expect(p.title).toBe("T");
    expect(String(p.backgroundImage)).toContain("bd0001-1920x1080.webp");
    const reasons = p.reasons as Record<string, unknown>[];
    expect(reasons[0]).toMatchObject({ title: "R", text: "B", titleClass: "text-salesforce-blue" });
    expect(String(reasons[0].icon)).toContain("abc123-1920x1080.webp");
    expect(String(p.image)).toContain("def456-1920x1080.webp");
    expect(p.imageAlt).toBe("Handshake");
  });

  test("empty fields are undefined", () => {
    const p = props(whyBandSectionAdapter({ _type: "whyBandSection", _key: "k", title: "" }));
    expect(p.title).toBeUndefined();
    expect(p.backgroundImage).toBeUndefined();
    expect(p.reasons).toBeUndefined();
    expect(p.image).toBeUndefined();
    expect(p.imageAlt).toBeUndefined();
  });

  test("the title colour list holds exactly the values the page uses", () => {
    sameSet(listValues(whyBandSection.fields, "reasons", "titleClass"), DEFAULT_WHY_REASONS.map((r) => r.titleClass));
  });
});

test.describe("featuredRolesSection adapter", () => {
  test("maps the title and roles", () => {
    const p = props(
      featuredRolesSectionAdapter({
        _type: "featuredRolesSection",
        _key: "k",
        title: "T",
        roles: [{ _key: "a", title: "Dev", details: ["Remote", "Full Time"], description: "D" }],
      }),
    );
    expect(p.title).toBe("T");
    expect(p.roles).toEqual([{ title: "Dev", details: ["Remote", "Full Time"], description: "D" }]);
  });

  test("no roles keeps the default list", () => {
    const p = props(featuredRolesSectionAdapter({ _type: "featuredRolesSection", _key: "k", title: "" }));
    expect(p.title).toBeUndefined();
    expect(p.roles).toBeUndefined();
    expect(DEFAULT_FEATURED_ROLES).toHaveLength(5);
  });
});

test.describe("richTextSection adapter", () => {
  const body = [{ _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Hi", marks: [] }] }];

  test("passes title, subtitle and body through", () => {
    const p = props(richTextSectionAdapter({ _type: "richTextSection", _key: "k", title: "T", subtitle: "Sub", body }));
    expect(p.title).toBe("T");
    expect(p.subtitle).toBe("Sub");
    expect(p.body).toBe(body);
  });

  test("empty fields stay empty instead of falling back to the privacy policy", () => {
    const p = props(richTextSectionAdapter({ _type: "richTextSection", _key: "k" }));
    expect(p.title).toBe("");
    expect(p.subtitle).toBe("");
    expect(p.body).toEqual([]);
  });

  test("the body field allows only the styles, list, decorator and link the serializer renders", () => {
    type Member = { type: string; styles?: { value: string }[]; lists?: { value: string }[]; marks?: { decorators?: { value: string }[]; annotations?: { name: string }[] } };
    const body = (richTextSection.fields as unknown as { name: string; of: Member[] }[]).find((f) => f.name === "body");
    const block = body?.of[0] as Member;
    expect(block.styles?.map((s) => s.value)).toEqual(["normal", "h2", "address"]);
    expect(block.lists?.map((l) => l.value)).toEqual(["bullet"]);
    expect(block.marks?.decorators?.map((d) => d.value)).toEqual(["strong"]);
    expect(block.marks?.annotations?.map((a) => a.name)).toEqual(["link"]);
  });
});

test.describe("rich text serializer", () => {
  type Render = (args: Record<string, unknown>) => ReactNode;
  const components = richTextComponents();
  const block = components.block as unknown as Record<string, Render>;
  const marks = components.marks as unknown as Record<string, Render>;

  test("an address block is an <address> with not-italic and a <br/> per line", () => {
    const el = block.address({ value: { _key: "a" }, children: ["ProvidusCRM\n498 Broadway\nOldham"] }) as unknown as El;
    expect(el.type).toBe("address");
    expect(String(el.props.className)).toContain("not-italic");
    const text = el.props.children as El;
    const kids = text.props.children as unknown[];
    expect(kids.filter((k) => (k as El).type === "br")).toHaveLength(2);
    expect(kids.filter((k) => typeof k === "string")).toEqual(["ProvidusCRM", "498 Broadway", "Oldham"]);
  });

  test("the closing address is spaced from the text above, the opening one from the text below", () => {
    const last = richTextComponents("z").block as unknown as Record<string, Render>;
    expect(String((last.address({ value: { _key: "z" }, children: ["x"] }) as unknown as El).props.className)).toBe("mt-10 not-italic");
    expect(String((last.address({ value: { _key: "a" }, children: ["x"] }) as unknown as El).props.className)).toBe("mb-4 not-italic");
  });

  test("h2 and normal reproduce the policy's heading and paragraph", () => {
    const h2 = block.h2({ children: "T" }) as unknown as El;
    expect(h2.props).toMatchObject({ as: "h2", level: "h4", className: "mt-12 mb-4 text-black" });
    const p = block.normal({ children: "T" }) as unknown as El;
    expect(p.props).toMatchObject({ variant: "p3", className: "mb-4 text-gray-700" });
  });

  test("links: mailto has no target, external opens a new tab, tel is unstyled, unsafe schemes are plain text", () => {
    const link = (href: string) => marks.link({ value: { href }, children: "x" }) as unknown as El;
    expect(link("mailto:a@b.co").props).toMatchObject({ href: "mailto:a@b.co", className: "text-brand-blue underline-offset-4 hover:underline" });
    expect(link("mailto:a@b.co").props.target).toBeUndefined();
    expect(link("https://ico.org.uk").props).toMatchObject({ target: "_blank", rel: "noopener noreferrer" });
    expect(link("tel:03031231113").props.className).toBeUndefined();
    expect(link("javascript:alert(1)").type).not.toBe("a");
  });

  test("the default privacy body has the two address blocks and the bullet list", () => {
    const styles = DEFAULT_PRIVACY_BODY.map((b) => `${b.style}${b.listItem ? ":" + b.listItem : ""}`);
    expect(styles.filter((s) => s === "address")).toHaveLength(2);
    expect(styles.filter((s) => s === "normal:bullet")).toHaveLength(4);
    expect(styles.filter((s) => s === "h2")).toHaveLength(10);
  });
});
