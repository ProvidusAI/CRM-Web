"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  hubspotPortalId,
  hubspotTrackingScriptUrl,
} from "@/lib/hubspot/config";

declare global {
  interface Window {
    _hsq?: unknown[][];
  }
}

/**
 * HubSpot's loader records a page view on hard loads only. App Router
 * navigations swap the tree without one, so every route change has to be
 * reported by hand or the whole site looks like a single landing page.
 */
function HubSpotRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Create the queue rather than bail if it is missing: HubSpot processes
    // whatever is already in _hsq once the script loads, so a navigation that
    // beats the loader still gets counted.
    const hsq = (window._hsq = window._hsq || []);

    const query = searchParams.toString();
    // setPath must precede trackPageView, and the path must start with "/".
    hsq.push(["setPath", query ? `${pathname}?${query}` : pathname]);
    hsq.push(["trackPageView"]);
  }, [pathname, searchParams]);

  return null;
}

export function HubSpotScript() {
  if (!hubspotPortalId) return null;

  return (
    <>
      <Script
        id="hubspot-tracking"
        strategy="afterInteractive"
        src={hubspotTrackingScriptUrl(hubspotPortalId)}
      />
      {/* useSearchParams would opt every page out of static rendering without this. */}
      <Suspense fallback={null}>
        <HubSpotRouteTracker />
      </Suspense>
    </>
  );
}
