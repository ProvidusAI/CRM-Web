import { ContactSection } from "@/components/sections/ContactSection";
import type { SectionAdapter, SectionBase } from "../types";

export interface ContactSectionData extends SectionBase {
  _type: "contactSection";
  intro?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export const contactSectionAdapter: SectionAdapter<ContactSectionData> = (s) => (
  <ContactSection
    intro={s.intro || undefined}
    address={s.address || undefined}
    email={s.email || undefined}
    phone={s.phone || undefined}
  />
);
