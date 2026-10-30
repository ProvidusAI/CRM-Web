import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { sectionTypes } from "@/sanity/schemaTypes/sections";
import { sectionInsertMenuGroups } from "@/sanity/schemaTypes/sections/insertMenuGroups";

const typeNames = sectionTypes.map((t) => t.name).sort();
const grouped = sectionInsertMenuGroups.flatMap((g) => g.of);

test("every section type is in exactly one Add-item group", () => {
  expect([...grouped].sort()).toEqual(typeNames);
  expect(new Set(grouped).size).toBe(grouped.length);
});

test("every section type has a thumbnail (run `pnpm thumbs:sections` after adding one)", () => {
  const missing = typeNames.filter((name) => !existsSync(`public/studio-thumbnails/sections/${name}.webp`));
  expect(missing).toEqual([]);
});
