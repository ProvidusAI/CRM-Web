import { DEFAULT_PRIVACY_BODY, DEFAULT_PRIVACY_SUBTITLE, DEFAULT_PRIVACY_TITLE } from "@/data/privacyPolicy";
import type { SeedPage } from "./types";

// Source: src/app/(site)/privacy-policy/page.tsx, which renders <RichTextSection /> with its
// defaults. The title, subtitle and Portable Text body are those defaults (data/privacyPolicy.ts),
// so the render is unchanged. The body already carries _keys on blocks, spans and markDefs, and
// the walker keeps existing keys, so the mark -> markDef references stay valid.
// No legacyKey (the route calls buildPageMetadata directly), no JSON-LD, no clipOverflowX.
export const privacyPage: SeedPage = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  seoFallback: {
    title: "Privacy Policy",
    description:
      "How ProvidusCRM collects, uses, shares and protects personal data under UK GDPR, and the rights you have over it.",
  },
  sections: [
    {
      _type: "richTextSection",
      title: DEFAULT_PRIVACY_TITLE,
      subtitle: DEFAULT_PRIVACY_SUBTITLE,
      body: DEFAULT_PRIVACY_BODY,
    },
  ],
};
