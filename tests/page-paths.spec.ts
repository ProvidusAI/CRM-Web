import { test, expect } from "@playwright/test";
import { pageSlugError, slugToPath, segmentsToSlug, pageDocumentId, slugDepth } from "@/lib/pagePaths";

test.describe("page paths", () => {
  test("home maps to / and /home is not a page", () => {
    expect(slugToPath("home")).toBe("/");
    expect(segmentsToSlug(undefined)).toBe("home");
    expect(segmentsToSlug([])).toBe("home");
    expect(segmentsToSlug(["home"])).toBeNull();
  });
  test("nested slugs keep their slashes", () => {
    expect(segmentsToSlug(["industries", "salesforce-health-cloud-consulting"])).toBe("industries/salesforce-health-cloud-consulting");
    expect(slugToPath("industries/salesforce-health-cloud-consulting")).toBe("/industries/salesforce-health-cloud-consulting");
    expect(slugDepth("about")).toBe(1);
    expect(slugDepth("industries/x")).toBe(2);
  });
  test("ids use dashes, never dots", () => {
    expect(pageDocumentId("home")).toBe("page-home");
    expect(pageDocumentId("preview/industries/x")).toBe("page-preview-industries-x");
    expect(pageDocumentId("a.b")).not.toContain(".");
  });
  test("slug validation", () => {
    expect(pageSlugError("about")).toBeNull();
    expect(pageSlugError("industries/salesforce-health-cloud-consulting")).toBeNull();
    expect(pageSlugError("salesforce-recruitment-agency")).toBeNull();
    expect(pageSlugError("home")).toBeNull();
    for (const bad of ["Home", "/about", "about/", "a//b", "a b", "home/x", "blog", "blog/x", "case-studies", "services/x",
      "salesforce", "studio", "api/x", "section-thumbs-preview", "staff-augmentation", "salesforce-foo",
      "platform-expertise/salesforce-education-cloud-consulting", "platform-expertise/salesforce-commerce-cloud-consulting"]) {
      expect(pageSlugError(bad), bad).not.toBeNull();
    }
  });
});
