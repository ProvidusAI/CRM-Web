import { existsSync } from "node:fs";
import { test, expect } from "@playwright/test";
import { buildNav, isInSection, type NavEntry } from "@/components/layout/navConfig";

const services = [
  { label: "Salesforce Consulting Services", href: "/services/salesforce-consulting-services" },
  { label: "Salesforce Brand New Service", href: "/services/salesforce-brand-new-service" },
];

function panel(entries: NavEntry[], label: string) {
  const entry = entries.find((e) => e.label === label);
  if (entry?.kind !== "panel") throw new Error(`${label} should be a panel`);
  return entry;
}

test.describe("nav config", () => {
  test("top level follows the design", () => {
    expect(buildNav(services).map((e) => `${e.kind}:${e.label}`)).toEqual([
      "panel:Services",
      "link:Our Work",
      "link:Hire Talent",
      "panel:Partnership",
      "panel:Company",
    ]);
  });

  test("Salesforce Services lists the Sanity pages with mapped or fallback icons", () => {
    const [salesforce, industries, platform] = panel(buildNav(services), "Services").categories;
    expect(salesforce.href).toBe("/services");
    expect(salesforce.links.map((l) => l.href)).toEqual(services.map((s) => s.href));
    expect(salesforce.links[0].icon.src).toBe("/images/nav/consulting.svg");
    // A service page with no mapped icon falls back to the category glyph.
    expect(salesforce.links[1].icon).toEqual(salesforce.icon);
    expect(industries.links).toHaveLength(5);
    expect(platform.links).toHaveLength(6);
  });

  test("Company has no overview page", () => {
    expect(panel(buildNav([]), "Company").categories[0].href).toBeUndefined();
  });

  test("isInSection matches the prefix and its subpages only", () => {
    expect(isInSection("/services", ["/services"])).toBe(true);
    expect(isInSection("/services/salesforce-consulting-services", ["/services"])).toBe(true);
    expect(isInSection("/services-extra", ["/services"])).toBe(false);
    expect(isInSection("/blog/some-post", ["/about", "/blog"])).toBe(true);
    expect(isInSection("/", ["/about", "/blog"])).toBe(false);
  });

  test("every icon file exists", () => {
    const icons = buildNav(services).flatMap((entry) =>
      entry.kind === "panel"
        ? entry.categories.flatMap((c) => [c.icon, ...c.links.map((l) => l.icon)])
        : []
    );
    for (const icon of icons) {
      expect(existsSync(`public${icon.src}`), icon.src).toBe(true);
    }
  });
});
