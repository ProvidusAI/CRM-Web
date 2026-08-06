// Titles are matched against this map to decide whether a platform card
// heading links to that platform's own page. Platforms without a page (e.g.
// Revenue Cloud) fall through and render as a static heading.
export const PLATFORM_HREFS: Record<string, string> = {
  Agentforce: "/platform-expertise/salesforce-agentforce-consulting",
  "Sales Cloud": "/platform-expertise/salesforce-sales-cloud-consulting",
  "Service Cloud": "/platform-expertise/salesforce-service-cloud-consulting",
  "Marketing Cloud": "/platform-expertise/salesforce-marketing-cloud-consulting",
  "Experience Cloud": "/platform-expertise/salesforce-experience-cloud-consulting",
  "Data Cloud": "/platform-expertise/salesforce-data-cloud-consulting",
};
