import type { Metadata } from "next";
import {
  ExpertiseDescriptionSection,
  OfferCarouselSection,
  PainPointsSection,
  PricingPlansSection,
  SplitChecklistSection,
} from "@/components/sections";

// Committed tooling route (not a scratch page): gives the section-thumbnail
// capture script (scripts/capture-section-thumbnails.ts) a stable place to
// render the picker sections that no live service page shows yet. Kept out
// of the sitemap and nav; noindex below.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SectionThumbsPreviewPage() {
  return (
    <>
      <div data-section-key="painPoints">
        <PainPointsSection
          items={[
            {
              title: "Uncontrolled automation",
              text: "Someone built a workflow rule two years ago for a process that has since changed. The rule still runs. Nobody remembers why it's there.",
              icon: "/images/salesforce-consulting.svg",
            },
            {
              title: "Inconsistent access management",
              text: "Someone granted access six months ago. Nobody revoked it when the project ended. Your access model widens quietly.",
              icon: "/images/salesforce-integration.svg",
            },
            {
              title: "Poor Salesforce release management",
              text: "Three times a year, a release changes how something works. A customisation built two years earlier starts behaving differently.",
              icon: "/images/salesforce-development.svg",
            },
            {
              title: "Sluggish user adoption",
              text: "When nobody adjusts the system to match how the team works, workarounds appear. A spreadsheet reappears.",
              icon: "/images/salesforce-customisation.svg",
            },
          ]}
        />
      </div>

      <div data-section-key="splitChecklist">
        <SplitChecklistSection
          title="Is This You?"
          text="Wondering whether you should be partnering with a Salesforce managed services provider like ProvidusCRM? If any of these issues sound familiar, book a CRM health check:"
          ctaLabel="Schedule a CRM Audit"
          ctaHref="/contact"
          images={[
            { src: "/images/our-services.webp", alt: "Team at work" },
            { src: "/images/consult.webp", alt: "Consultation" },
          ]}
          items={[
            "Support tickets pile up because nobody owns Salesforce administration full-time",
            "The last Salesforce release broke something, and nobody caught it until a user reported it",
            "Reports and dashboards don't quite match what the team is actually experiencing",
            "Nobody's fully sure what all the automation in your org actually does anymore",
            "User adoption has quietly dropped since go-live, and workarounds have crept back in",
          ]}
        />
      </div>

      <div data-section-key="offerCarousel">
        <OfferCarouselSection
          title="What We Offer"
          items={[
            {
              title: "Automation & Development",
              text: "Flow and automation maintenance, Apex development where declarative tools don't fit, and fixing what a release changed.",
              icon: "/images/salesforce-development.svg",
            },
            {
              title: "Release Management",
              text: "Reviewing upcoming Salesforce releases against your specific org, testing changes in a sandbox before they go live.",
              icon: "/images/salesforce-implementation.svg",
            },
            {
              title: "Reporting & Analytics",
              text: "Building and maintaining dashboards that reflect what's actually happening in the business.",
              icon: "/images/salesforce-consulting.svg",
            },
            {
              title: "Integration Mapping & Support",
              text: "Maintaining and troubleshooting connections to finance systems, marketing platforms, and other third-party tools.",
              icon: "/images/salesforce-integration.svg",
            },
          ]}
        />
      </div>

      <div data-section-key="pricing">
        <PricingPlansSection
          title="Our Flexible Salesforce Managed Services Plans"
          subtitle="Three Salesforce managed services plans, customised to different levels of need."
          plans={[
            {
              name: "Hourly",
              description: "Pay only for the hours you use, with no long-term commitment or fixed retainer.",
              includes: [
                "Admin support, bug fixes, and configuration changes",
                "Reports and dashboard adjustments",
                "Dedicated Desk",
                "One-off development work on a defined scope",
              ],
            },
            {
              name: "Weekly",
              description: "A set number of hours each week with dedicated resources assigned to your account.",
              includes: [
                "Apex development and Lightning customisations",
                "Automation and Flow build work",
                "Integration configuration and troubleshooting",
              ],
            },
            {
              name: "Monthly",
              description: "End-to-end coverage across admin, development, support, integrations, and strategic input.",
              includes: [
                "Release management, health checks, and system monitoring",
                "Backup configuration and Apex testing",
                "Staff training and user adoption support",
              ],
              featured: true,
            },
          ]}
        />
      </div>

      <div data-section-key="description">
        <ExpertiseDescriptionSection
          heading="Salesforce Expertise That Grows With You"
          paragraphs={[
            "Our consultants bring years of hands-on Salesforce experience across sales, service, and marketing clouds, so your team gets guidance grounded in real implementations, not theory.",
            "From initial configuration to ongoing optimisation, we stay embedded with your org, catching issues before they become tickets and adjusting the system as your business changes.",
          ]}
        />
      </div>
    </>
  );
}
