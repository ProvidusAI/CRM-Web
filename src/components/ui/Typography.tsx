import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Heading ──────────────────────────────────────────────────
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  level?: HeadingLevel;
  children?: ReactNode;
}

const headingClasses: Record<HeadingLevel, string> = {
  h1: "typography-h1 !text-[36px] !leading-[40px] !tracking-[-0.4px] md:!text-[60px] md:!leading-[60.9px] md:!tracking-[-1.24px]",
  h2: "typography-h2 !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[45px]",
  h3: "typography-h3 !text-[30px] !leading-[34px] !tracking-[-0.2px] md:!text-[40px] md:!leading-[45px] md:!tracking-[-0.39px]",
  h4: "typography-h4 !text-[24px] !leading-[30px] md:!text-[30px] md:!leading-[35px]",
};

export function Heading({
  as,
  level,
  children,
  className,
  ...props
}: HeadingProps) {
  const semanticLevel = as ?? level ?? "h2";
  const visualLevel = level ?? semanticLevel;
  const Tag = semanticLevel;

  return (
    <Tag className={cn(headingClasses[visualLevel], className)} {...props}>
      {children}
    </Tag>
  );
}

// ─── Text ─────────────────────────────────────────────────────
type TextVariant = "p1" | "p2" | "p3" | "p4";
// h1/h2 are allowed so a heading tag can carry small body styling — e.g. a hero
// kicker that is semantically the page h1 but visually a p4.
type TextTag = "p" | "span" | "div" | "li" | "label" | "dt" | "dd" | "h1" | "h2";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: TextTag;
  children?: ReactNode;
}

const textClasses: Record<TextVariant, string> = {
  p1: "typography-p1 !text-[18px] !leading-[28px] md:!text-[22px] md:!leading-[30px]",
  p2: "typography-p2 !text-[17px] !leading-[27px] md:!text-[20px] md:!leading-[30px]",
  p3: "typography-p3 !text-[15px] !leading-[24px] md:!text-[16px] md:!leading-[26px]",
  p4: "typography-p4 !text-[13px] !leading-[22px] md:!text-[14px] md:!leading-[24px]",
};

export function Text({
  variant = "p2",
  as: Tag = "p",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textClasses[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
