import { WhatWeDoSection, type WhatWeDoTab } from "@/components/sections/WhatWeDoSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface WhatWeDoSectionData extends SectionBase {
  _type: "whatWeDoSection";
  title?: string;
  tabs?: {
    _key: string;
    label?: string;
    heading?: string;
    text?: string;
    bullets?: string[];
    linkHref?: string;
    linkIsExternal?: boolean;
  }[];
  backgroundOverlayColor?: string;
}

export const whatWeDoSectionAdapter: SectionAdapter<WhatWeDoSectionData> = (s) => {
  const tabs = (s.tabs ?? []).map(
    (t): WhatWeDoTab => ({
      label: t.label ?? "",
      content: {
        heading: t.heading ?? "",
        text: t.text ?? "",
        bullets: t.bullets?.length ? t.bullets : undefined,
      },
      link: t.linkHref ? { href: t.linkHref, isExternal: !!t.linkIsExternal } : undefined,
    }),
  );
  return (
    <WhatWeDoSection
      title={s.title || undefined}
      tabs={tabs.length ? tabs : undefined}
      backgroundOverlayColor={s.backgroundOverlayColor || undefined}
    />
  );
};
