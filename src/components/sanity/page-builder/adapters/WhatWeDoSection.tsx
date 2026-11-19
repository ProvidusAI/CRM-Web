import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { ContentLink } from "@/components/sanity/PortableContent";
import { WhatWeDoSection, type WhatWeDoTab } from "@/components/sections/WhatWeDoSection";
import { Text } from "@/components/ui/Typography";
import type { SectionAdapter, SectionBase } from "../types";

export interface WhatWeDoSectionData extends SectionBase {
  _type: "whatWeDoSection";
  title?: string;
  tabs?: {
    _key: string;
    label?: string;
    heading?: string;
    body?: PortableTextBlock[];
    /** Pre-rich-text plain text; kept so an unmigrated tab still renders. */
    text?: string;
    bullets?: string[];
    linkHref?: string;
    linkIsExternal?: boolean;
  }[];
  backgroundOverlayColor?: string;
}

// Paragraphs match the component's own plain-text rendering; links get the
// site's standard inline link treatment.
const tabBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text variant="p2" className="text-gray-700 leading-relaxed">
        {children}
      </Text>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const link = value as { href?: string; openInNewTab?: boolean } | undefined;
      return (
        <ContentLink href={link?.href || "#"} openInNewTab={link?.openInNewTab}>
          {children}
        </ContentLink>
      );
    },
  },
};

export const whatWeDoSectionAdapter: SectionAdapter<WhatWeDoSectionData> = (s) => {
  const tabs = (s.tabs ?? []).map(
    (t): WhatWeDoTab => ({
      label: t.label ?? "",
      content: {
        heading: t.heading ?? "",
        text: t.text ?? "",
        body: t.body?.length ? <PortableText value={t.body} components={tabBodyComponents} /> : undefined,
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
