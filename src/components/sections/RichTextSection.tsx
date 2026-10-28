import Link from "next/link";
import { Children, type ReactNode } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import {
  DEFAULT_PRIVACY_BODY,
  DEFAULT_PRIVACY_SUBTITLE,
  DEFAULT_PRIVACY_TITLE,
} from "@/data/privacyPolicy";

const LINK_CLASS = "text-brand-blue underline-offset-4 hover:underline";

/** Safe schemes only; anything else (e.g. javascript:) stays plain text. */
function renderLink(href: string | undefined, children: ReactNode): ReactNode {
  if (!href) return children;
  if (/^mailto:/i.test(href)) {
    return (
      <a href={href} className={LINK_CLASS}>
        {children}
      </a>
    );
  }
  // The policy's phone number has always been an unstyled link.
  if (/^tel:/i.test(href)) return <a href={href}>{children}</a>;
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </a>
    );
  }
  if (/^(\/(?!\/)|#)/.test(href)) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  return children;
}

/** A Shift+Enter line break in the editor is a "\n" inside a span: one <br/> per line. */
function withLineBreaks(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child, i): ReactNode[] => {
    if (typeof child !== "string") return [child];
    return child.split("\n").flatMap((line, j): ReactNode[] => {
      const br = j > 0 ? [<br key={`br-${i}-${j}`} />] : [];
      return line ? [...br, line] : br;
    });
  });
}

/**
 * The serializer for the policy-style body. `closingKey` is the key of the
 * block that closes the document: an address there is spaced from the text
 * above it, where an address in the middle is spaced from the text below.
 */
export function richTextComponents(closingKey?: string): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <Text variant="p3" className="mb-4 text-gray-700">
          {children}
        </Text>
      ),
      h2: ({ children }) => (
        <Heading as="h2" level="h4" className="mt-12 mb-4 text-black">
          {children}
        </Heading>
      ),
      address: ({ children, value }) => (
        <address className={value._key === closingKey ? "mt-10 not-italic" : "mb-4 not-italic"}>
          <Text variant="p3" className="text-gray-700">
            {withLineBreaks(children)}
          </Text>
        </address>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li>
          <Text variant="p3" as="span">
            {children}
          </Text>
        </li>
      ),
    },
    marks: {
      link: ({ value, children }) => renderLink((value as { href?: string } | undefined)?.href, children),
    },
  };
}

interface RichTextSectionProps {
  /** The page heading (h1). Leave empty for none. */
  title?: string;
  /** A line under the heading, such as "Last updated…". */
  subtitle?: string;
  body?: PortableTextBlock[];
}

export function RichTextSection({
  title = DEFAULT_PRIVACY_TITLE,
  subtitle = DEFAULT_PRIVACY_SUBTITLE,
  body = DEFAULT_PRIVACY_BODY,
}: RichTextSectionProps) {
  return (
    <Section background="white" className="py-16 md:py-24">
      <Container>
        <article className="mx-auto max-w-3xl">
          {title && (
            <Heading as="h1" level="h2" className="text-black">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text variant="p3" className="mt-4 font-semibold text-gray-700">
              {subtitle}
            </Text>
          )}
          <PortableText value={body} components={richTextComponents(body.at(-1)?._key)} />
        </article>
      </Container>
    </Section>
  );
}
