import { ServiceBenefitsSection } from "@/components/sections/ServiceBenefitsSection";
import type { ServiceBenefitColorTheme, ServiceBenefitIconKey } from "@/sanity/lib/types";
import type { SectionAdapter, SectionBase } from "../types";

export interface ServiceBenefitsSectionData extends SectionBase {
  _type: "serviceBenefitsSection";
  title?: string;
  items?: {
    _key: string;
    title?: string;
    description?: string;
    iconKey?: ServiceBenefitIconKey;
    colorTheme?: ServiceBenefitColorTheme;
  }[];
}

export const serviceBenefitsSectionAdapter: SectionAdapter<ServiceBenefitsSectionData> = (s) => (
  <ServiceBenefitsSection
    title={s.title || undefined}
    // No items stay an empty list, which the component renders as nothing.
    items={(s.items ?? []).map((item) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      iconKey: item.iconKey || undefined,
      colorTheme: item.colorTheme || undefined,
    }))}
  />
);
