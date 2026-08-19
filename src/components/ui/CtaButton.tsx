import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaButtonVariant = "filled" | "outline" | "white";
type CtaButtonSize = "sm" | "md" | "lg";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CtaButtonVariant;
  size?: CtaButtonSize;
  children: ReactNode;
  className?: string;
}

/**
 * The scale is padding and arrow-circle diameter; the label stays 16px at every
 * size. Earlier revisions carried `text-p3`/`text-p2` here, which are not
 * utilities in this project and rendered as nothing — every size has always
 * shown a 16px label. Setting it explicitly keeps that appearance while making
 * the code honest about it.
 *
 * Size the label with `typography-*`, never `text-*`: cn() runs tailwind-merge,
 * which groups `text-*` together, so a size class there strips the caller's
 * text colour.
 */
const sizeMap: Record<
  CtaButtonSize,
  { wrapper: string; circle: string; text: string }
> = {
  sm: { wrapper: "p-1.5 pr-5", circle: "w-8 h-8", text: "typography-p3 px-2" },
  md: { wrapper: "p-2 pr-7", circle: "w-11 h-11", text: "typography-p3 px-3" },
  lg: { wrapper: "p-2.5 pr-8", circle: "w-13 h-13", text: "typography-p3 px-4" },
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CtaButton({
  variant = "filled",
  size = "md",
  children,
  className,
  ...props
}: CtaButtonProps) {
  const s = sizeMap[size];

  return (
    <button
      className={cn(
        "inline-flex items-center rounded-full font-body font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "filled"
          ? "bg-[#38A81B] text-white hover:bg-[#2d8c14] focus-visible:outline-[#38A81B]"
          : variant === "white"
          ? "bg-white text-[#38A81B] hover:bg-[#f8fff6] focus-visible:outline-white"
          : "bg-white text-[#38A81B] border-2 border-[#38A81B] hover:bg-[#f0fced] focus-visible:outline-[#38A81B]",
        s.wrapper,
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full shrink-0",
          variant === "filled" ? "bg-white text-[#38A81B]" : "bg-[#38A81B] text-white",
          s.circle
        )}
      >
        <ArrowRight />
      </span>
      <span className={s.text}>{children}</span>
    </button>
  );
}
