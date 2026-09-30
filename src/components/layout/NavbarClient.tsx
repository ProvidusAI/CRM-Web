"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import type { NavItem } from "@/types";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { buildNav } from "./navConfig";

interface NavbarClientProps {
  salesforceServices: NavItem[];
}

export function NavbarClient({ salesforceServices }: NavbarClientProps) {
  // Desktop panels centre under this row (Figma centres them on the page).
  const rowRef = useRef<HTMLDivElement>(null);
  const entries = buildNav(salesforceServices);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <Container>
        <div ref={rowRef} className="flex h-18 items-center justify-between gap-8 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="ProvidusCRM"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <DesktopNav entries={entries} anchor={rowRef} />

          <div className="hidden shrink-0 lg:block">
            <Link href="/contact">
              <CtaButton variant="filled" size="sm">
                Let&apos;s Connect
              </CtaButton>
            </Link>
          </div>

          <MobileNav entries={entries} />
        </div>
      </Container>
    </header>
  );
}
