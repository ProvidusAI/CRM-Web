import { CategoriesSection, DEFAULT_CATEGORIES } from "@/components/sections/CategoriesSection";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface CategoriesSectionData extends SectionBase {
  _type: "categoriesSection";
  categories?: {
    _key: string;
    title?: string;
    text?: string;
    icon?: SanityImageValue;
    boxGradient?: string;
    iconGradient?: string;
    href?: string;
  }[];
}

export const categoriesSectionAdapter: SectionAdapter<CategoriesSectionData> = (s) => {
  const categories = (s.categories ?? []).flatMap((c, i) => {
    const icon = imageSrc(c.icon);
    // next/image throws on an empty src, so a category without an icon is skipped.
    if (!icon) return [];
    // A card always draws both gradients, so an unset one takes the standard
    // category's at the same position.
    const standard = DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length];
    return [
      {
        title: c.title ?? "",
        text: c.text ?? "",
        icon,
        boxGradient: c.boxGradient || standard.boxGradient,
        iconGradient: c.iconGradient || standard.iconGradient,
        href: c.href || undefined,
      },
    ];
  });
  return <CategoriesSection categories={categories.length ? categories : undefined} />;
};
