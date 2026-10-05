import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { SanityImage } from "./SanityImage";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { getArticleHeadingId } from "@/lib/portableText";
import { getSanityImageAspectRatio } from "@/lib/sanityImage";
import { BlogCtaBanner } from "./BlogCtaBanner";
import type { CtaBannerBlock } from "@/sanity/lib/types";

interface PortableContentProps {
  value?: PortableTextBlock[];
  contained?: boolean;
}

interface LinkMarkValue {
  href?: string;
  openInNewTab?: boolean;
}

interface PortableImageValue extends SanityImageType {
  caption?: string;
}

interface TableRowValue {
  _key: string;
  cells: string[];
}

interface TableValue {
  rows?: TableRowValue[];
}

const LINK_CLASS = "text-brand-blue underline-offset-4 hover:underline";

function ContentLink({
  href,
  openInNewTab,
  children,
}: {
  href: string;
  openInNewTab?: boolean;
  children: ReactNode;
}) {
  if (href.startsWith("http") || openInNewTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={LINK_CLASS}>
      {children}
    </Link>
  );
}

// @sanity/table cells are plain strings, so editors write links as Markdown:
// [link text](https://example.com). Only safe schemes become links; anything
// else (e.g. javascript:) stays as the literal text.
const CELL_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/i;

export function renderTableCell(cell: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;

  for (const match of cell.matchAll(CELL_LINK)) {
    const [whole, text, href] = match;
    const start = match.index ?? 0;
    if (!SAFE_HREF.test(href)) continue;
    if (start > last) parts.push(cell.slice(last, start));
    parts.push(
      <ContentLink key={start} href={href}>
        {text}
      </ContentLink>
    );
    last = start + whole.length;
  }

  if (parts.length === 0) return cell;
  if (last < cell.length) parts.push(cell.slice(last));
  return parts;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text variant="p3" className="text-[#4A4A4A]">
        {children}
      </Text>
    ),
    h2: ({ children, value }) => (
      <Heading
        as="h2"
        level="h4"
        id={getArticleHeadingId(value._key)}
        className="scroll-mt-28 text-brand-blue"
      >
        {children}
      </Heading>
    ),
    h3: ({ children, value }) => (
      <Heading
        as="h3"
        level="h4"
        id={getArticleHeadingId(value._key)}
        className="scroll-mt-28 text-brand-blue"
      >
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-green pl-6">
        <Text variant="p2" className="text-black">
          {children}
        </Text>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-3 pl-6 text-p3 text-[#4A4A4A]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 pl-6 text-p3 text-[#4A4A4A]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const link = value as LinkMarkValue | undefined;
      return (
        <ContentLink href={link?.href || "#"} openInNewTab={link?.openInNewTab}>
          {children}
        </ContentLink>
      );
    },
  },
  types: {
    table: ({ value }) => {
      const { rows } = value as TableValue;

      if (!rows || rows.length === 0) {
        return null;
      }

      const [headerRow, ...bodyRows] = rows;

      return (
        <div className="my-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-100-bg">
                {headerRow.cells.map((cell, index) => (
                  <Text
                    key={index}
                    as="th"
                    variant="p3"
                    className="border border-gray-border px-4 py-3 font-semibold text-black"
                  >
                    {renderTableCell(cell)}
                  </Text>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, index) => (
                    <Text
                      key={index}
                      as="td"
                      variant="p3"
                      className="border border-gray-border px-4 py-3 text-gray-500"
                    >
                      {renderTableCell(cell)}
                    </Text>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    image: ({ value }) => {
      const image = value as PortableImageValue;

      if (!image.asset?.url) {
        return null;
      }

      return (
        <figure className="my-4">
          <div
            className="relative w-full overflow-hidden rounded-lg bg-brand-blue-light"
            style={{ aspectRatio: getSanityImageAspectRatio(image) }}
          >
            <SanityImage
              image={image}
              altFallback={image.caption || "Article image"}
              className="object-contain"
              unoptimized
            />
          </div>
          {image.caption && (
            <Text variant="p4" className="mt-2 text-center text-[#6B6B6B]">
              {image.caption}
            </Text>
          )}
        </figure>
      );
    },
    ctaBanner: ({ value }) => <BlogCtaBanner value={value as CtaBannerBlock} />,
  },
};

export function PortableContent({
  value,
  contained = true,
}: PortableContentProps) {
  if (!value || value.length === 0) {
    return null;
  }

  const content = (
    <div className="flex flex-col gap-7">
      <PortableText value={value} components={components} />
    </div>
  );

  return contained ? (
    <Container size="md">
      <div className="py-12 md:py-16">{content}</div>
    </Container>
  ) : (
    content
  );
}
