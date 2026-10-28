import { aboutPage } from "./about";
import { contactPage } from "./contact";
import { homePage } from "./home";
import { commercePage, educationPage, financialServicesPage, healthPage, nonprofitPage } from "./industries";
import { industriesPage, partnershipPage, platformExpertisePage, servicesPage } from "./parents";
import type { SeedPage } from "./types";

/** Appended to by the per-page modules (Tasks 11a-11f). */
export const SEED_PAGES: SeedPage[] = [homePage, aboutPage, contactPage, industriesPage, partnershipPage, platformExpertisePage, servicesPage, commercePage, educationPage, financialServicesPage, healthPage, nonprofitPage];
