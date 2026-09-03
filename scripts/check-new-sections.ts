// The only real logic in the four new sections is "render nothing when
// empty" — this asserts it without a DOM, same pattern as check-page-blogs.
// No React import: the script calls components as plain functions, no JSX.
import { PainPointsSection } from "../src/components/sections/PainPointsSection";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

check(
  "PainPointsSection hides when empty",
  PainPointsSection({ items: [] }) === null,
  "expected null for items: []"
);
check(
  "PainPointsSection renders when populated",
  PainPointsSection({
    items: [{ title: "T", text: "B", icon: "/images/logo.svg" }],
  }) !== null,
  "expected an element for one item"
);

if (failures.length > 0) {
  console.error(`${failures.length} check(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("check-new-sections: all checks passed");
