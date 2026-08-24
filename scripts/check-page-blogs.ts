import { PAGE_BLOG_OPTIONS, STATIC_PAGE_OPTIONS } from "../src/lib/pageKeys";
import { toBlogTeaserCards } from "../src/lib/blogTeaserCards";
import type { PageBlogPost } from "../src/sanity/lib/types";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

// The blog and case-study indexes are deliberately excluded — a blog grid
// there is redundant. Comparing against STATIC_PAGE_OPTIONS.length rather than
// a hardcoded 21 keeps this passing when a new static page is added.
check(
  "excludes exactly two pages",
  PAGE_BLOG_OPTIONS.length === STATIC_PAGE_OPTIONS.length - 2,
  `expected ${STATIC_PAGE_OPTIONS.length - 2}, got ${PAGE_BLOG_OPTIONS.length}`
);

for (const excluded of ["blog", "case-studies"]) {
  check(
    `omits "${excluded}"`,
    !PAGE_BLOG_OPTIONS.some((option) => option.value === excluded),
    `"${excluded}" is still in the list`
  );
}

check(
  "every option has a title and value",
  PAGE_BLOG_OPTIONS.every((option) => Boolean(option.title && option.value)),
  "at least one option is missing a title or value"
);

const samplePost: PageBlogPost = {
  _id: "post-1",
  title: "Migrating from Magento",
  slug: { current: "migrating-from-magento" },
  publishedAt: "2026-08-01T00:00:00Z",
  categories: ["Commerce", "Migration"],
  heroImage: {
    alt: "A storefront dashboard",
    asset: { _id: "image-1", url: "https://cdn.example/hero.webp" },
  },
};

const mapped = toBlogTeaserCards([samplePost]);

check("maps one card per post", mapped.length === 1, `got ${mapped.length}`);
check("flattens the slug", mapped[0]?.slug === "migrating-from-magento", `got ${mapped[0]?.slug}`);
check("uses the hero image url", mapped[0]?.image === "https://cdn.example/hero.webp", `got ${mapped[0]?.image}`);
check("uses the editor's alt text", mapped[0]?.imageAlt === "A storefront dashboard", `got ${mapped[0]?.imageAlt}`);
check("takes only the first category", mapped[0]?.category === "Commerce", `got ${mapped[0]?.category}`);

// A post whose hero image was never uploaded must not produce an empty src.
const bare: PageBlogPost = { ...samplePost, heroImage: undefined, categories: undefined };
const mappedBare = toBlogTeaserCards([bare]);
check("falls back to the placeholder image", mappedBare[0]?.image === "/images/case-study.webp", `got ${mappedBare[0]?.image}`);
check("falls back to the title for alt", mappedBare[0]?.imageAlt === "Migrating from Magento", `got ${mappedBare[0]?.imageAlt}`);
check("leaves category undefined", mappedBare[0]?.category === undefined, `got ${mappedBare[0]?.category}`);

// sanityFetch returns null when Sanity is not configured.
check("handles undefined input", toBlogTeaserCards(undefined).length === 0, "expected an empty array");

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(`PASS  ${PAGE_BLOG_OPTIONS.length} blog-eligible pages`);
