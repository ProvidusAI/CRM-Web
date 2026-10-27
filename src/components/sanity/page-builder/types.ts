import type { ReactNode } from "react";

export interface SectionSpacing {
  top?: number;
  bottom?: number;
}

export interface SectionBase {
  _key: string;
  _type: string;
  spacing?: SectionSpacing;
  anchorId?: string;
}

export type SectionAdapter<T> = (section: T) => ReactNode;

/**
 * Union of every section's data type. Section tasks add a member here, e.g.
 * `| CtaSectionData`, when they register an adapter.
 */
export type PageSectionData = SectionBase;
