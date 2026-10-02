// Asserts production-only performance markers on a running `next start`
// server: CSS inlined (no render-blocking stylesheet request) and tracking
// scripts deferred to idle. `next/script` only emits <link rel="preload">
// for eagerly loaded (afterInteractive) scripts, so a preload means the
// tool still competes with first paint.
const target = process.argv.slice(2).find((arg) => arg !== "--") ?? "http://localhost:3001/";

// Only the src-loaded tags can be detected: GTM and Clarity are inline
// snippets, which next/script never preloads under any strategy.
const TRACKING_HOSTS = ["hs-scripts.com", "contentsquare.net"];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main(): Promise<void> {
  const response = await fetch(target, { cache: "no-store", redirect: "follow" });
  const html = await response.text();
  const failures: string[] = [];

  if (!response.ok) failures.push(`HTTP ${response.status}`);

  if (/<link[^>]*rel="stylesheet"[^>]*href="\/_next\/static\/css\//.test(html)) {
    failures.push("CSS is linked, not inlined (render-blocking request)");
  }

  for (const host of TRACKING_HOSTS) {
    const preload = new RegExp(`<link[^>]*rel="preload"[^>]*href="[^"]*${escapeRegExp(host)}`);
    if (preload.test(html)) failures.push(`${host} is preloaded, so it loads eagerly`);
  }

  if (failures.length > 0) {
    console.error(`check:perf-markers failed for ${target}\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`check:perf-markers passed for ${target}`);
}

main().catch((error: unknown) => {
  console.error(`check:perf-markers could not inspect ${target}: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

export {}; // makes this a module so its top-level `main` does not collide with check-slugs.ts
