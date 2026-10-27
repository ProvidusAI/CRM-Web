import { SalesforceServiceHero } from "@/components/sections/SalesforceServiceHero";
import { imageSrc, type SanityImageValue } from "@/sanity/lib/imageRef";
import type { SectionAdapter, SectionBase } from "../types";

export interface SalesforceServiceHeroData extends SectionBase {
  _type: "salesforceServiceHero";
  kicker?: string;
  badgeTitle?: string;
  badgeSubtitle?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  formTitle?: string;
  formButtonLabel?: string;
  backgroundImage?: SanityImageValue;
}

export const salesforceServiceHeroAdapter: SectionAdapter<SalesforceServiceHeroData> = (s) => (
  <SalesforceServiceHero
    kicker={s.kicker || undefined}
    badgeTitle={s.badgeTitle || undefined}
    badgeSubtitle={s.badgeSubtitle || undefined}
    title={s.title ?? ""}
    description={s.description || undefined}
    bullets={s.bullets?.length ? s.bullets : undefined}
    formTitle={s.formTitle || undefined}
    formButtonLabel={s.formButtonLabel || undefined}
    backgroundImage={imageSrc(s.backgroundImage)}
  />
);
