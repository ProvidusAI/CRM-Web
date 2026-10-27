import { test, expect } from "@playwright/test";
import { imageSrc, imageSize, imageAlt } from "@/sanity/lib/imageRef";
import { renderMarkHeading } from "@/components/sanity/page-builder/markHeading";
import { sectionWrapperStyle } from "@/components/sanity/page-builder/PageSections";

const img = { _type: "image" as const, asset: { _type: "reference" as const, _ref: "image-a1b2c3-416x82-webp" }, alt: "Logo" };

/** Flattens a React element tree into a list of nodes (elements and strings). */
function walk(node: unknown, out: unknown[] = []): unknown[] {
  if (Array.isArray(node)) node.forEach((n) => walk(n, out));
  else if (node && typeof node === "object" && "props" in node) {
    out.push(node);
    walk((node as { props: { children?: unknown } }).props.children, out);
  } else if (node !== null && node !== undefined && node !== false) out.push(node);
  return out;
}

test.describe("page builder core", () => {
  test("image helpers read the asset ref", () => {
    expect(imageSrc(img)).toMatch(/^https:\/\/cdn\.sanity\.io\/images\/[^/]+\/[^/]+\/a1b2c3-416x82\.webp$/);
    expect(imageSize(img)).toEqual({ width: 416, height: 82 });
    expect(imageSize(img, { half: true })).toEqual({ width: 208, height: 41 });
    expect(imageAlt(img)).toBe("Logo");
    expect(imageAlt({ ...img, alt: "" }, "fallback")).toBe("fallback");
    expect(imageSrc(undefined)).toBeUndefined();
    expect(imageSrc({ _type: "image" })).toBeUndefined();
  });

  test("mark headings render like the static JSX", () => {
    expect(renderMarkHeading({ text: "Plain", mark: "none" })).toBe("Plain");
    expect(renderMarkHeading(undefined)).toBeUndefined();
    expect(renderMarkHeading({ text: "  " })).toBeUndefined();

    const withMark = walk(renderMarkHeading({ text: "Hello world", mark: "after", markStyle: "hero", markSpace: true }));
    expect(withMark).toContain("Hello world");
    expect(withMark).toContain(" ");
    const mark = withMark.find((n) => (n as { props?: { className?: string } })?.props?.className) as { props: { className: string } };
    expect(mark.props.className).toBe("inline-block h-10 w-auto align-baseline ml-1");

    const noSpace = walk(renderMarkHeading({ text: "A", mark: "after", markStyle: "section", markSpace: false }));
    expect(noSpace).not.toContain(" ");

    const lines = walk(renderMarkHeading({ text: "Line one\nLine two" }));
    expect(lines).toContain("Line one");
    expect(lines).toContain("Line two");
    expect(lines.some((n) => (n as { type?: string })?.type === "br")).toBe(true);
  });

  test("spacing override only sets what the editor filled in", () => {
    expect(sectionWrapperStyle(undefined)).toBeUndefined();
    expect(sectionWrapperStyle({})).toBeUndefined();
    expect(sectionWrapperStyle({ top: 40 })).toEqual({ paddingTop: 40 });
    expect(sectionWrapperStyle({ top: 0, bottom: 24 })).toEqual({ paddingTop: 0, paddingBottom: 24 });
  });
});
