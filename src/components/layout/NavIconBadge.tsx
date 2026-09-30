import Image from "next/image";
import type { NavIcon } from "./navConfig";

// Figma menu icon: a white glyph centred in a 25px brand-green circle.
export function NavIconBadge({ icon }: { icon: NavIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-[25px] shrink-0 items-center justify-center rounded-full bg-brand-green"
    >
      <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
    </span>
  );
}
