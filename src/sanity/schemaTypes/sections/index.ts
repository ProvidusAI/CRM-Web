import type { defineSection } from "./defineSection";

// Every page-builder section type. Section tasks append to this list.
export const sectionTypes: ReturnType<typeof defineSection>[] = [];

export const pageSectionMembers = sectionTypes.map((t) => ({ type: t.name }));
