import { Footer, Navbar } from "@/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-[100] bg-white text-brand-blue px-4 py-2 rounded-lg font-semibold shadow-md"
      >
        Skip to main content
      </a>
      <Navbar />
      {/* overflow-x-clip: slide-in animations start offset past the screen
          edge; unclipped, they widen the page (and the fixed mobile menu,
          which sizes to it) until they animate in. clip, unlike hidden,
          keeps sticky elements inside main working. */}
      <main id="main-content" aria-label="Main content" className="overflow-x-clip">
        {children}
      </main>
      <Footer />
    </>
  );
}
