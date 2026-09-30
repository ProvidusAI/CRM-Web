"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "./Container";
import { NavIconBadge } from "./NavIconBadge";
import type { NavEntry } from "./navConfig";

// The mobile menu is a native <details>, so the burger works the moment the
// server HTML paints. As a React-state button it ignored taps for ~3s on a
// throttled phone until hydration, and for good when a bundle stalled.
function closeMenuOnEscape(e: KeyboardEvent<HTMLDetailsElement>) {
  if (e.key !== "Escape" || !e.currentTarget.open) return;
  e.currentTarget.open = false;
  e.currentTarget.querySelector("summary")?.focus();
}

function closeMenuOnLinkClick(e: MouseEvent<HTMLDivElement>) {
  if (!(e.target as Element).closest("a")) return;
  const menu = e.currentTarget.closest("details");
  if (menu) menu.open = false;
}

export function MobileNav({ entries }: { entries: NavEntry[] }) {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <details className="group/menu lg:hidden" onKeyDown={closeMenuOnEscape}>
      {/* -m-1 p-3: a 44px tap target with the icon where p-2 had it. */}
      <summary
        aria-label="Navigation menu"
        className="-m-1 flex cursor-pointer touch-manipulation list-none items-center justify-center p-3 text-nav-text [&::-webkit-details-marker]:hidden"
      >
        <svg
          className="h-5 w-5 group-open/menu:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className="hidden h-5 w-5 group-open/menu:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </summary>

      {/* Fixed under the 72px header row with its own scroll: inline in
          the sticky header it was pinned with it, so on a short screen
          its lower items could never scroll into view. */}
      <div
        className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto overscroll-contain border-t border-gray-100 bg-white"
        onClick={closeMenuOnLinkClick}
      >
        <Container>
          <nav aria-label="Main navigation" className="flex flex-col gap-1 py-4">
            {entries.map((entry) =>
              entry.kind === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="typography-p3 px-2 py-2 text-nav-text transition-colors hover:text-brand-green"
                  aria-current={current(entry.href)}
                >
                  {entry.label}
                </Link>
              ) : (
                <details key={entry.label} name="mobile-nav-section" className="group/section">
                  <summary className="typography-p3 flex cursor-pointer list-none items-center justify-between px-2 py-2 text-nav-text [&::-webkit-details-marker]:hidden">
                    {entry.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-open/section:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-gray-100 pl-4">
                    {entry.categories.map((category) => (
                      <div key={category.label} className="flex flex-col gap-1">
                        {category.href ? (
                          <Link
                            href={category.href}
                            aria-current={current(category.href)}
                            className="typography-p4 !font-semibold px-2 py-2 text-nav-category transition-colors hover:text-brand-green"
                          >
                            {/* Services has three named groups; a single-group
                                panel links its overview page instead. */}
                            {entry.categories.length > 1 ? category.label : `${entry.label} overview`}
                          </Link>
                        ) : null}
                        {category.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={current(link.href)}
                            className="typography-p4 flex items-center gap-3 px-2 py-2 text-gray-text transition-colors hover:text-brand-green"
                          >
                            <NavIconBadge icon={link.icon} />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              )
            )}
            <div className="mt-2 border-t border-gray-100 pt-4">
              <Link href="/contact">
                <CtaButton variant="filled" size="sm" className="w-full">
                  Let&apos;s Connect
                </CtaButton>
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </details>
  );
}
