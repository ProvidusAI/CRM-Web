/**
 * The outer box reserves a full viewport on purpose. Next serialises this
 * Suspense fallback into every prerendered page ahead of the real content, so
 * the browser can paint it before the `$RC` swap lands. Reserving a viewport
 * means that swap replaces a full-height box with a full-height box: nothing
 * above the fold moves, and CLS stays near zero. The inner box keeps the
 * spinner's original 60vh centring so the placeholder itself looks unchanged.
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2F2FF] border-t-[#1D70C5]" />
          <p className="text-p3 text-gray-500">Loading…</p>
        </div>
      </div>
    </div>
  );
}
