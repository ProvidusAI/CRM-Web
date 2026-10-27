import { CertifiedSection } from "@/components/sections/CertifiedSection";
import { renderMarkHeading, type MarkHeadingValue } from "../markHeading";
import type { SectionAdapter, SectionBase } from "../types";

export interface CertifiedSectionData extends SectionBase {
  _type: "certifiedSection";
  title?: MarkHeadingValue;
  description?: string;
}

export const certifiedSectionAdapter: SectionAdapter<CertifiedSectionData> = (s) => (
  <CertifiedSection title={renderMarkHeading(s.title)} description={s.description || undefined} />
);
