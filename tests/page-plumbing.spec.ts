import { test, expect } from "@playwright/test";
import { sitemapPageEntries } from "@/lib/sitemapPages";

test("sitemap page entries: home is /, preview pages are excluded, no /home", () => {
  const urls = sitemapPageEntries([
    { slug: "home" },
    { slug: "about" },
    { slug: "industries/salesforce-health-cloud-consulting" },
    { slug: "preview/about" },
  ]).map((e) => e.url);
  expect(urls).toEqual([
    "https://providuscrm.co.uk/",
    "https://providuscrm.co.uk/about",
    "https://providuscrm.co.uk/industries/salesforce-health-cloud-consulting",
  ]);
});

test("sitemap page entries: pages marked noIndex are excluded", () => {
  const urls = sitemapPageEntries([{ slug: "about" }, { slug: "thank-you", noIndex: true }, { slug: "faq", noIndex: false }]).map(
    (e) => e.url
  );
  expect(urls).toEqual(["https://providuscrm.co.uk/about", "https://providuscrm.co.uk/faq"]);
});
