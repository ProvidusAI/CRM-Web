import type { PortableTextBlock } from "next-sanity";
import { RichTextSection } from "@/components/sections/RichTextSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface RichTextSectionData extends SectionBase {
  _type: "richTextSection";
  title?: string;
  subtitle?: string;
  body?: PortableTextBlock[];
}

// Unlike the other sections, an empty field stays empty instead of taking the
// component default: the defaults are the privacy policy, which must never
// appear on a page whose editor left the heading, the subtitle or the body blank.
export const richTextSectionAdapter: SectionAdapter<RichTextSectionData> = (s) => (
  <RichTextSection title={s.title ?? ""} subtitle={s.subtitle ?? ""} body={s.body ?? []} />
);
