import { ProcessStepsSection } from "@/components/sections/ProcessStepsSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface ProcessStepsSectionData extends SectionBase {
  _type: "processStepsSection";
  title?: string;
  steps?: {
    _key: string;
    title?: string;
    text?: string;
    icon?: SanityImageValue;
    gradient?: string;
  }[];
}

export const processStepsSectionAdapter: SectionAdapter<ProcessStepsSectionData> = (s) => (
  <ProcessStepsSection
    title={s.title || undefined}
    steps={
      s.steps?.length
        ? s.steps.map((step) => ({
            title: step.title ?? "",
            text: step.text ?? "",
            icon: imageSrc(step.icon),
            gradient: step.gradient || undefined,
          }))
        : undefined
    }
  />
);
