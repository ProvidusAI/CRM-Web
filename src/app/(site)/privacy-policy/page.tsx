import type { Metadata } from "next";
import { RichTextSection } from "@/components/sections";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How ProvidusCRM collects, uses, shares and protects personal data under UK GDPR, and the rights you have over it.",
  canonicalPath: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <RichTextSection />;
}
