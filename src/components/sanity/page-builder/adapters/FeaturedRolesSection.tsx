import { FeaturedRolesSection } from "@/components/sections/FeaturedRolesSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface FeaturedRolesSectionData extends SectionBase {
  _type: "featuredRolesSection";
  title?: string;
  roles?: {
    _key: string;
    title?: string;
    details?: string[];
    description?: string;
  }[];
}

export const featuredRolesSectionAdapter: SectionAdapter<FeaturedRolesSectionData> = (s) => (
  <FeaturedRolesSection
    title={s.title || undefined}
    roles={
      s.roles?.length
        ? s.roles.map((role) => ({
            title: role.title ?? "",
            details: role.details ?? [],
            description: role.description ?? "",
          }))
        : undefined
    }
  />
);
