import { post } from "../src/sanity/schemaTypes/post";
import { blockContent } from "../src/sanity/schemaTypes/blockContent";
import type { BlogPost, CtaBannerBlock } from "../src/sanity/lib/types";
import { BlogSummaryCard, splitParagraphs } from "../src/components/sanity/BlogSummaryCard";
import { BlogCtaBanner } from "../src/components/sanity/BlogCtaBanner";

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

// ── Summary card ────────────────────────────────────────────────
check("splits on blank lines", JSON.stringify(splitParagraphs("One.\n\nTwo.\n\n\nThree.")) === JSON.stringify(["One.", "Two.", "Three."]), "wrong split");
check("keeps single line breaks inside a paragraph", splitParagraphs("a\nb").length === 1, "single newline split a paragraph");
check("drops whitespace-only paragraphs", splitParagraphs("  \n\nOnly").length === 1, "kept an empty paragraph");
check("summary hidden when heading blank", BlogSummaryCard({ heading: "  ", text: "Body" }) === null, "rendered with blank heading");
check("summary hidden when text blank", BlogSummaryCard({ heading: "Summary", text: "" }) === null, "rendered with blank text");
check("summary hidden when both undefined", BlogSummaryCard({}) === null, "rendered with nothing");
check("summary renders when both filled", BlogSummaryCard({ heading: "Summary", text: "Body" }) !== null, "expected an element");

// ── CTA banner ──────────────────────────────────────────────────
const bannerImage = { alt: "Dashboard", asset: { _id: "img", url: "https://cdn.example/dash.webp" } };
check("banner hidden without an image asset", BlogCtaBanner({ value: { _type: "ctaBanner", heading: "Go" } }) === null, "rendered without image");
check("banner hidden without a heading", BlogCtaBanner({ value: { _type: "ctaBanner", heading: " ", image: bannerImage } }) === null, "rendered without heading");
check("banner renders with heading + image", BlogCtaBanner({ value: { _type: "ctaBanner", heading: "Go", image: bannerImage } }) !== null, "expected an element");

if (failures.length > 0) {
  console.error("FAIL\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("PASS  blog blocks");
