import { test, expect } from "@playwright/test";
import { renderTableCell } from "@/components/sanity/PortableContent";

type LinkElement = { props: { href: string; children: string } };

test.describe("table cell links", () => {
  test("plain text is returned unchanged", () => {
    expect(renderTableCell("Salesforce Nonprofit Cloud")).toBe("Salesforce Nonprofit Cloud");
  });

  test("[text](url) becomes a link with the surrounding text kept", () => {
    const parts = renderTableCell("See [our pricing](/pricing) and [FinDock](https://findock.com).");
    expect(Array.isArray(parts)).toBe(true);
    const list = parts as unknown[];
    expect(list[0]).toBe("See ");
    const first = list[1] as LinkElement;
    expect(first.props.href).toBe("/pricing");
    expect(first.props.children).toBe("our pricing");
    expect(list[2]).toBe(" and ");
    expect((list[3] as LinkElement).props.href).toBe("https://findock.com");
    expect(list[4]).toBe(".");
  });

  test("unsafe schemes stay as literal text", () => {
    expect(renderTableCell("[click](javascript:alert(1))")).toBe("[click](javascript:alert(1))");
  });
});
