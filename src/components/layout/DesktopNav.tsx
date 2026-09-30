"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";
import { cn } from "@/lib/utils";
import { NavIconBadge } from "./NavIconBadge";
import { isInSection, type NavCategory, type NavEntry } from "./navConfig";

// Figma 851:2892, top-level item: 14px/25px with 10px padding. The
// highlighted item (the open panel, or the current section when none is
// open) turns semibold green with a 1px underline.
const TOP_ITEM =
  "group/top relative flex cursor-pointer items-center rounded-md p-2.5 typography-p4 !leading-[25px] whitespace-nowrap text-nav-text outline-none transition-colors hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-green/50 data-[highlight]:!font-semibold data-[highlight]:text-brand-green motion-reduce:transition-none";

// Trigger bottom sits 13.5px above the 72px header row's bottom edge; the
// panel's top edge is 32px below the trigger (15px gap + 17px caret).
const PANEL_SIDE_OFFSET = 18;

// Left column: 53px rows, 30px apart. The first row starts 56px from the top
// in the three-category Services panel and 42px in single-category panels.
// The first link row's icon is centred on the first category row.
const ROW_HEIGHT = 53;
const ROW_STRIDE = 83;

interface DesktopNavProps {
  entries: NavEntry[];
  /** The header row; panels centre under it. */
  anchor: RefObject<HTMLDivElement | null>;
}

export function DesktopNav({ entries, anchor }: DesktopNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [caretOffset, setCaretOffset] = useState(0);
  const [categoryByPanel, setCategoryByPanel] = useState<Record<string, number>>({});
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleValueChange(value: string | null) {
    setOpen(value);
    if (!value) return;
    // Each panel opens on its first category. Only the new panel is reset,
    // so the outgoing one keeps its content while it animates out.
    setCategoryByPanel((prev) => ({ ...prev, [value]: 0 }));
    const trigger = triggers.current[value]?.getBoundingClientRect();
    const row = anchor.current?.getBoundingClientRect();
    if (trigger && row) {
      setCaretOffset(trigger.left + trigger.width / 2 - (row.left + row.width / 2));
    }
  }

  return (
    <NavigationMenu
      value={open}
      onValueChange={handleValueChange}
      closeDelay={150}
      aria-label="Primary"
      className="hidden lg:block"
    >
      <NavigationMenuList>
        {entries.map((entry) => {
          const highlight = open ? open === entry.label : isInSection(pathname, entry.section);
          const highlightAttr = highlight ? "" : undefined;

          return (
            <NavigationMenuItem
              key={entry.label}
              value={entry.kind === "panel" ? entry.label : undefined}
            >
              {entry.kind === "link" ? (
                <NavigationMenuLink
                  active={pathname === entry.href}
                  render={<NextLink href={entry.href} />}
                  className={TOP_ITEM}
                  data-highlight={highlightAttr}
                >
                  <TopLabel label={entry.label} />
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    ref={(node) => {
                      triggers.current[entry.label] = node;
                    }}
                    className={TOP_ITEM}
                    data-highlight={highlightAttr}
                  >
                    <TopLabel label={entry.label} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <PanelBody
                      categories={entry.categories}
                      active={categoryByPanel[entry.label] ?? 0}
                      onActivate={(index) =>
                        setCategoryByPanel((prev) => ({ ...prev, [entry.label]: index }))
                      }
                      pathname={pathname}
                    />
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuPanel
        anchor={anchor}
        sideOffset={PANEL_SIDE_OFFSET}
        caretOffset={caretOffset}
      />
    </NavigationMenu>
  );
}

function TopLabel({ label }: { label: string }) {
  return (
    <span className="relative grid">
      {/* A semibold copy reserves the highlighted width, so neighbours don't shift. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
        {label}
      </span>
      <span className="col-start-1 row-start-1">{label}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0.5 h-px scale-x-0 rounded-full bg-brand-green transition-transform group-data-[highlight]/top:scale-x-100 motion-reduce:transition-none"
      />
    </span>
  );
}

interface PanelBodyProps {
  categories: NavCategory[];
  active: number;
  onActivate: (index: number) => void;
  pathname: string;
}

function PanelBody({ categories, active, onActivate, pathname }: PanelBodyProps) {
  const single = categories.length === 1;
  const rowTop = single ? 42 : 56;
  const bottom = single ? 48 : 38;
  // The rows are absolutely placed, so reserve their column's height.
  const minHeight = rowTop + categories.length * ROW_STRIDE - (ROW_STRIDE - ROW_HEIGHT) + bottom;

  return (
    // Each category row is followed in the DOM by its link grid (only the
    // active one renders), so Tab moves from a category straight into its
    // links. Rows sit in the left column by absolute position.
    <div className="relative w-[800px]" style={{ minHeight }}>
      {categories.map((category, index) => {
        const isActive = index === active;
        const rowClass = cn(
          "absolute left-0 flex w-[234px] items-center gap-[15px] px-6 typography-p3 !font-bold !leading-7 text-nav-category outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-green motion-reduce:transition-none",
          single && "justify-center",
          isActive && "bg-brand-green-light"
        );
        const rowStyle = { top: rowTop + index * ROW_STRIDE, height: ROW_HEIGHT };
        const rowContent = (
          <>
            <NavIconBadge icon={category.icon} />
            {category.label}
          </>
        );

        return (
          <Fragment key={category.label}>
            {category.href ? (
              <NavigationMenuLink
                closeOnClick
                active={pathname === category.href}
                render={<NextLink href={category.href} />}
                className={rowClass}
                style={rowStyle}
                onMouseEnter={() => onActivate(index)}
                onFocus={() => onActivate(index)}
              >
                {rowContent}
              </NavigationMenuLink>
            ) : (
              <div className={rowClass} style={rowStyle}>
                {rowContent}
              </div>
            )}
            {isActive ? (
              <ul
                className="ml-[269px] grid w-[493px] list-none grid-cols-[219px_219px] gap-x-[54px] gap-y-10"
                style={{ paddingTop: rowTop + 14, paddingBottom: bottom }}
              >
                {/* Figma's two-line link rows are 32px boxes that the 40px
                    label overflows by 4px each way, giving a 72px pitch at
                    the 40px gap. The label's -my-1 reproduces that, and
                    self-center keeps one-line labels centred on the icon.
                    The link's py-1 -my-1 wraps its focus ring round the
                    overflow without changing the layout. */}
                {category.links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink
                      closeOnClick
                      active={pathname === link.href}
                      render={<NextLink href={link.href} />}
                      className="-my-1 flex items-start gap-[15px] rounded-md py-1 text-nav-link outline-none transition-colors hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-green/50 motion-reduce:transition-none"
                    >
                      <NavIconBadge icon={link.icon} />
                      <span className="-my-1 self-center typography-p3 !font-medium !leading-5">
                        {link.label}
                      </span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
