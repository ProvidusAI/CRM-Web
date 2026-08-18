import "server-only";

import { hubspotPortalId, hubspotSubmitUrl } from "./config";

export interface HubSpotField {
  name: string;
  value: string;
}

interface SubmitOptions {
  formGuid: string | undefined;
  fields: HubSpotField[];
  /**
   * The `hubspotutk` cookie. Ties the submission to the visitor the tracking
   * script has been following, so HubSpot can attribute the sources and page
   * views that led to the conversion. Without it the contact is still created,
   * just with no browsing history attached.
   */
  hubspotutk?: string;
  pageUri?: string;
  pageName?: string;
}

const SUBMIT_TIMEOUT_MS = 5000;

const HUTK_COOKIE = "hubspotutk=";

/** Pulls the visitor's HubSpot tracking cookie off an incoming API request. */
export function readHubSpotCookie(request: Request): string | undefined {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(HUTK_COOKIE))
    ?.slice(HUTK_COOKIE.length);
}

/**
 * Sends a form submission to HubSpot's v3 submission endpoint.
 *
 * Uses the unauthenticated endpoint, which needs no token — the portal ID and
 * form GUID are enough. It is rate limited to 50 requests per 10 seconds, which
 * a marketing site's enquiry forms will not approach; sustained 429s would call
 * for the `secure/submit` variant and an OAuth token with the `forms` scope.
 *
 * Never throws: the caller's job is to deliver the enquiry email, and a HubSpot
 * outage must not turn a successful enquiry into a 500 for the visitor. Failures
 * are logged and swallowed.
 */
export async function submitHubSpotForm({
  formGuid,
  fields,
  hubspotutk,
  pageUri,
  pageName,
}: SubmitOptions): Promise<void> {
  if (!hubspotPortalId || !formGuid) return;

  const url = hubspotSubmitUrl(hubspotPortalId, formGuid);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      body: JSON.stringify({
        fields: fields.filter((field) => field.value),
        context: {
          ...(hubspotutk ? { hutk: hubspotutk } : {}),
          ...(pageUri ? { pageUri } : {}),
          ...(pageName ? { pageName } : {}),
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `HubSpot form submission failed (${response.status})`,
        detail.slice(0, 500)
      );
    }
  } catch (error) {
    console.error("HubSpot form submission failed", error);
  }
}
