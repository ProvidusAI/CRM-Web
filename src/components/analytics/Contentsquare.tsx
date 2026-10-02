import Script from "next/script";

const CONTENTSQUARE_TAG_ID = "b1d2d161babd3";

/**
 * Contentsquare (the product Hotjar became). Loaded with `lazyOnload`, like
 * the other tags here: after window load, when the browser is idle, so it
 * stays off the critical path and out of the LCP window.
 */
export function ContentsquareScript() {
  return (
    <Script
      id="contentsquare"
      strategy="lazyOnload"
      src={`https://t.contentsquare.net/uxa/${CONTENTSQUARE_TAG_ID}.js`}
    />
  );
}
