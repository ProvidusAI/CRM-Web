import Script from "next/script";

const CONTENTSQUARE_TAG_ID = "b1d2d161babd3";

/**
 * Contentsquare (the product Hotjar became). Their install snippet is a plain
 * `<script defer>`; `afterInteractive` is the next/script equivalent and is
 * what the other tags here already use, so the loader stays off the critical
 * path and out of the LCP window.
 */
export function ContentsquareScript() {
  return (
    <Script
      id="contentsquare"
      strategy="afterInteractive"
      src={`https://t.contentsquare.net/uxa/${CONTENTSQUARE_TAG_ID}.js`}
    />
  );
}
