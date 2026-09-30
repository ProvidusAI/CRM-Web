"use client";

import { NavigationMenu as Primitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps, CSSProperties, RefObject } from "react";
import { cn } from "@/lib/utils";

// shadcn's Base UI navigation menu (ui.shadcn.com/docs/components/base/navigation-menu),
// trimmed to the parts the header uses and restyled for Figma 851:2892.
// Base UI animates with CSS transitions on data-starting-style and
// data-ending-style, so no animation plugin is needed.

type WithClassName<P> = Omit<P, "className"> & { className?: string };

const MORPH =
  "duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export const NavigationMenuItem = Primitive.Item;
export const NavigationMenuTrigger = Primitive.Trigger;
export const NavigationMenuLink = Primitive.Link;

export function NavigationMenu(props: WithClassName<Primitive.Root.Props<string>>) {
  return <Primitive.Root {...props} />;
}

export function NavigationMenuList({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Primitive.List>>) {
  return (
    <Primitive.List
      className={cn("flex list-none items-center gap-[21px]", className)}
      {...props}
    />
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: WithClassName<ComponentProps<typeof Primitive.Content>>) {
  return (
    <Primitive.Content
      className={cn(
        "transition-[opacity,translate]",
        MORPH,
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        // Slide in from the side of the previously open trigger, out the other way.
        "data-[starting-style]:data-[activation-direction=left]:-translate-x-1/2",
        "data-[starting-style]:data-[activation-direction=right]:translate-x-1/2",
        "data-[ending-style]:data-[activation-direction=left]:translate-x-1/2",
        "data-[ending-style]:data-[activation-direction=right]:-translate-x-1/2",
        className
      )}
      {...props}
    />
  );
}

interface NavigationMenuPanelProps {
  /** Element the panel centres under. */
  anchor: RefObject<HTMLElement | null>;
  /** Gap between the anchor's bottom edge and the panel's top edge. */
  sideOffset: number;
  /** Horizontal distance from the panel centre to the open trigger's centre. */
  caretOffset: number;
}

// Figma 851:2892: one 800px white panel for every menu, radius 20, soft
// shadow, a 21×17 caret on the top edge pointing at the open trigger. The
// left-column tint is painted on the popup so it stays put while the
// content slides between menus.
export function NavigationMenuPanel({ anchor, sideOffset, caretOffset }: NavigationMenuPanelProps) {
  return (
    <Primitive.Portal>
      {/* Blurs the page below the header, and takes the outside click that
          closes the menu so nothing underneath is activated. */}
      <Primitive.Backdrop
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 z-40 backdrop-blur-[8px] transition-opacity",
          MORPH,
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
        )}
      />
      <Primitive.Positioner
        anchor={anchor}
        side="bottom"
        align="center"
        sideOffset={sideOffset}
        collisionPadding={16}
        // before: bridges the gap under the triggers, so moving the pointer
        // down to the panel does not count as leaving the menu.
        className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) before:absolute before:inset-x-0 before:bottom-full before:h-8 before:content-['']"
      >
        <Primitive.Popup
          data-slot="nav-panel"
          style={{ "--caret-offset": `${caretOffset}px` } as CSSProperties}
          className={cn(
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-[20px] outline-none",
            // 234px matches DesktopNav's PanelBody row width (rowClass's
            // w-[234px] / ml-[269px] on the link grid) — keep in sync.
            "bg-[linear-gradient(to_right,var(--color-nav-panel-side)_234px,var(--color-white)_234px)]",
            "drop-shadow-nav-panel transition-[opacity,scale,width,height]",
            MORPH,
            "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-full left-[calc(50%+var(--caret-offset)-10.5px)] h-[17px] w-[21px] bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)] transition-[left]",
              MORPH
            )}
          />
          <Primitive.Viewport className="relative size-full overflow-hidden rounded-[20px]" />
        </Primitive.Popup>
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
