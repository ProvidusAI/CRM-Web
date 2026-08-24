import { PAGE_BLOG_OPTIONS, STATIC_PAGE_OPTIONS } from "../src/lib/pageKeys";

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

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(`PASS  ${PAGE_BLOG_OPTIONS.length} blog-eligible pages`);
