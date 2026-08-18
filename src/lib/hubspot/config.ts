/**
 * HubSpot is optional at build and run time, mirroring the Sanity setup: with
 * no portal ID the tracking script is not rendered, and with no form GUID the
 * submission call is skipped. Nothing throws.
 *
 * The portal ID and region are public by design — both ship inside the
 * tracking script URL.
 */
export const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

/**
 * Data-hosting region, e.g. "na2" or "eu1" — the same value the form embed code
 * carries. Optional: the unprefixed hosts 307-redirect to the right region
 * anyway, so leaving it unset costs a round trip rather than breaking.
 */
export const hubspotRegion = process.env.NEXT_PUBLIC_HUBSPOT_REGION;

export const hubspotContactFormGuid = process.env.HUBSPOT_CONTACT_FORM_GUID;

export const hubspotServiceFormGuid = process.env.HUBSPOT_SERVICE_FORM_GUID;

export const isHubSpotConfigured = Boolean(hubspotPortalId);

/** e.g. https://js-na2.hs-scripts.com/{portalId}.js */
export function hubspotTrackingScriptUrl(portalId: string) {
  const host = hubspotRegion
    ? `js-${hubspotRegion}.hs-scripts.com`
    : "js.hs-scripts.com";

  return `https://${host}/${portalId}.js`;
}

/** e.g. https://api-na2.hsforms.com/submissions/v3/integration/submit/... */
export function hubspotSubmitUrl(portalId: string, formGuid: string) {
  const host = hubspotRegion
    ? `api-${hubspotRegion}.hsforms.com`
    : "api.hsforms.com";

  return `https://${host}/submissions/v3/integration/submit/${portalId}/${formGuid}`;
}
