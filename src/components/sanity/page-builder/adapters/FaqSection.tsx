import { FaqSection } from "@/components/sections/FaqSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface FaqSectionData extends SectionBase {
  _type: "faqSection";
  title?: string;
  faqs?: { _key: string; question?: string; answer?: string }[];
}

export const faqSectionAdapter: SectionAdapter<FaqSectionData> = (s) => {
  const faqs = (s.faqs ?? []).map((f) => ({ question: f.question ?? "", answer: f.answer ?? "" }));
  return <FaqSection title={s.title || undefined} faqs={faqs.length ? faqs : undefined} />;
};
