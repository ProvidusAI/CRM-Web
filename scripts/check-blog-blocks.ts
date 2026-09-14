import { post } from "../src/sanity/schemaTypes/post";
import { blockContent } from "../src/sanity/schemaTypes/blockContent";
import type { BlogPost, CtaBannerBlock } from "../src/sanity/lib/types";

const failures: string[] = [];

function check(name: string, condition: boolean, detail: string) {
  if (!condition) failures.push(`${name}: ${detail}`);
}

// ── Schema ──────────────────────────────────────────────────────
const postFields = (post.fields ?? []).map((field) => field.name);
check("post has summaryHeading", postFields.includes("summaryHeading"), `fields: ${postFields.join(", ")}`);
check("post has summaryText", postFields.includes("summaryText"), `fields: ${postFields.join(", ")}`);

const members = (blockContent.of ?? []) as Array<{ name?: string; fields?: Array<{ name: string }> }>;
const banner = members.find((member) => member.name === "ctaBanner");
check("blockContent has ctaBanner", Boolean(banner), `members: ${members.map((m) => m.name).join(", ")}`);
const bannerFields = (banner?.fields ?? []).map((field) => field.name);
check("ctaBanner has heading + image", bannerFields.includes("heading") && bannerFields.includes("image"), `fields: ${bannerFields.join(", ")}`);

// ── Types ───────────────────────────────────────────────────────
// Compile-time: these assignments fail `tsx` if the types are missing.
const typedPost: Pick<BlogPost, "summaryHeading" | "summaryText"> = { summaryHeading: "Summary", summaryText: "One\n\nTwo" };
const typedBanner: CtaBannerBlock = { _type: "ctaBanner", heading: "Hi" };
check("types compile", Boolean(typedPost) && Boolean(typedBanner), "unreachable");

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("PASS  blog blocks");
