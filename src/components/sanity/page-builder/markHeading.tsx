import { Fragment, type ReactNode } from "react";
import { GreenLineMark } from "@/components/ui/GreenLineMark";

export interface MarkHeadingValue {
  text?: string;
  mark?: "none" | "after";
  markStyle?: "hero" | "heroSmall" | "section";
  markSpace?: boolean;
}

// The exact className each static page passed to <GreenLineMark/>.
const MARK_CLASS: Record<NonNullable<MarkHeadingValue["markStyle"]>, string> = {
  hero: "inline-block h-10 w-auto align-baseline ml-1",
  heroSmall: "inline-block h-8 w-auto align-baseline ml-1",
  section: "inline-block -mb-2 ml-1",
};

/** Rebuilds the JSX headings the static pages wrote: text, <br/>s, squiggle. */
export function renderMarkHeading(value?: MarkHeadingValue): ReactNode | undefined {
  const text = value?.text?.trim();
  if (!text) return undefined;
  const lines = text.split("\n");
  const hasMark = value?.mark === "after";
  if (!hasMark && lines.length === 1) return text;

  return (
    <>
      {lines.length === 1
        ? lines[0]
        : lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
      {hasMark && (value?.markSpace ?? true) ? " " : null}
      {hasMark && <GreenLineMark className={MARK_CLASS[value?.markStyle ?? "hero"]} />}
    </>
  );
}
