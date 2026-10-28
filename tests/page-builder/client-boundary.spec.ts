import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// Adapters run in server components. A value imported from a "use client"
// module is a client-reference proxy there, so `.map` or any property access
// on it throws. Only the component itself may cross the boundary.
const ADAPTERS_DIR = path.join(process.cwd(), "src/components/sanity/page-builder/adapters");
const COMPONENT_NAME = /^[A-Z][A-Za-z0-9]*(Section|Hero|Carousel)$/;

function resolveAlias(spec: string): string | undefined {
  const base = path.join(process.cwd(), "src", spec.slice(2));
  return [`${base}.tsx`, `${base}.ts`].find((f) => fs.existsSync(f));
}

function isClientModule(file: string): boolean {
  const head = fs.readFileSync(file, "utf8").replace(/^\s*(\/\/.*\n|\/\*[\s\S]*?\*\/\s*)*/, "");
  return /^["']use client["']/.test(head);
}

/** Non-type named imports from "@/..." modules, as [name, module] pairs. */
function valueImports(source: string): [string, string][] {
  const out: [string, string][] = [];
  for (const m of source.matchAll(/import\s+(?!type\b)\{([^}]*)\}\s*from\s*["'](@\/[^"']+)["']/g)) {
    for (const part of m[1].split(",")) {
      const spec = part.trim();
      if (!spec || /^type\s/.test(spec)) continue;
      out.push([spec.split(/\s+as\s+/)[0].trim(), m[2]]);
    }
  }
  return out;
}

test("adapters import only components, never other values, from client modules", () => {
  const offenders: string[] = [];
  const files = fs.readdirSync(ADAPTERS_DIR).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
  // Guards against a moved directory or bad filter making the scan pass vacuously.
  expect(files.length, "adapter files scanned").toBeGreaterThanOrEqual(40);
  for (const file of files) {
    const source = fs.readFileSync(path.join(ADAPTERS_DIR, file), "utf8");
    for (const [name, mod] of valueImports(source)) {
      const resolved = resolveAlias(mod);
      if (!resolved || !isClientModule(resolved)) continue;
      if (!COMPONENT_NAME.test(name)) offenders.push(`${file}: ${name} from ${mod}`);
    }
  }
  expect(offenders, "move shared data into a module without \"use client\"").toEqual([]);
});
