import type { CSSProperties } from "react";
import { SECTION_ADAPTERS } from "./registry";
import type { PageSectionData, SectionSpacing } from "./types";

/** Only the sides an editor set; undefined keeps the component's own rhythm. */
export function sectionWrapperStyle(spacing?: SectionSpacing): CSSProperties | undefined {
  if (!spacing) return undefined;
  const style: CSSProperties = {};
  if (typeof spacing.top === "number") style.paddingTop = spacing.top;
  if (typeof spacing.bottom === "number") style.paddingBottom = spacing.bottom;
  return Object.keys(style).length > 0 ? style : undefined;
}

export function PageSections({ sections }: { sections?: PageSectionData[] }) {
  return (
    <>
      {sections?.map((section) => {
        const adapter = SECTION_ADAPTERS[section._type] as ((s: PageSectionData) => React.ReactNode) | undefined;
        if (!adapter) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[PageSections] No adapter for section type "${section._type}"`);
          }
          return null;
        }
        return (
          <div
            key={section._key}
            data-section-type={section._type}
            id={section.anchorId || undefined}
            style={sectionWrapperStyle(section.spacing)}
          >
            {adapter(section)}
          </div>
        );
      })}
    </>
  );
}
