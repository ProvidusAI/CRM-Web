import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How ProvidusCRM collects, uses, shares and protects personal data under UK GDPR, and the rights you have over it.",
  canonicalPath: "/privacy-policy",
});

const EMAIL = "connect@providuscrm.co.uk";

const Email = () => (
  <a href={`mailto:${EMAIL}`} className="text-brand-blue underline-offset-4 hover:underline">
    {EMAIL}
  </a>
);

function H2({ children }: { children: ReactNode }) {
  return (
    <Heading as="h2" level="h4" className="mt-12 mb-4 text-black">
      {children}
    </Heading>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <Text variant="p3" className="mb-4 text-gray-700">
      {children}
    </Text>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Section background="white" className="py-16 md:py-24">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Heading as="h1" level="h2" className="text-black">
            Privacy Policy
          </Heading>
          <Text variant="p3" className="mt-4 font-semibold text-gray-700">
            Last updated: 24-06-2026
          </Text>

          <H2>1. About Us and This Policy</H2>
          <P>
            ProvidusCRM is a Salesforce consulting practice and a wholly owned subsidiary of Providus Technologies
            LLC. References in this policy to &quot;ProvidusCRM,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot; mean ProvidusCRM together with Providus Technologies LLC where relevant.
          </P>
          <P>
            For UK data protection law, including the UK General Data Protection Regulation (UK GDPR) and the Data
            Protection Act 2018, ProvidusCRM is the data controller for personal data we collect through our website
            and in the course of our business activities in the United Kingdom.
          </P>
          <P>
            This policy explains what personal data we collect, how we use it, who we share it with, how long we keep
            it, and the rights you have over it. If you have any questions, please contact us at <Email /> or write
            to us at:
          </P>
          <address className="mb-4 not-italic">
            <Text variant="p3" className="text-gray-700">
              ProvidusCRM
              <br />
              1st Floor, Portfolio Place
              <br />
              498 Broadway
              <br />
              Oldham
              <br />
              United Kingdom
              <br />
              OL9 9PY
            </Text>
          </address>

          <H2>2. The Data We Collect</H2>
          <P>We only collect personal data we genuinely need.</P>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>
              <Text variant="p3" as="span">
                <strong>Information you give us.</strong> Your name, job title, company name, business email address,
                business phone number, and the content of any messages you send us. You provide this when you fill in a
                contact form, request a proposal, register for an event or webinar, subscribe to updates, or contact us
                directly.
              </Text>
            </li>
            <li>
              <Text variant="p3" as="span">
                <strong>Information we collect automatically.</strong> When you visit our website, we collect technical
                data such as your IP address, browser type, device type, the pages you visit, and how you arrived at our
                site. We collect this through cookies and similar technologies. You can manage cookies through the
                banner on our website or your browser settings.
              </Text>
            </li>
            <li>
              <Text variant="p3" as="span">
                <strong>Information from client engagements.</strong> Where your organisation is a client, we may
                process personal data shared with us during a project, such as contact details of your team members and
                data within the Salesforce environment we are engaged to work on.
              </Text>
            </li>
            <li>
              <Text variant="p3" as="span">
                <strong>Information from third parties.</strong> We sometimes receive business contact details from
                publicly available sources such as LinkedIn, from partners such as Salesforce or FinDock, or from events
                where you have agreed to be contacted.
              </Text>
            </li>
          </ul>

          <H2>3. How We Use Your Data and Our Legal Bases</H2>
          <P>
            We use your personal data only for clear and lawful purposes, and we rely on a specific UK GDPR legal basis
            in each case.
          </P>
          <P>
            We use it to respond to enquiries and provide the information, proposals, or services you request, on the
            basis of taking steps at your request before entering into a contract. We use it to deliver services agreed
            under our contracts with clients, on the basis of the performance of a contract. We use it to send service
            updates and project communications, based on contract or legitimate interests in running our business
            properly.
          </P>
          <P>
            We use it to send marketing emails about our services, events, and relevant content, on the basis of your
            consent or, where permitted under UK rules for existing business contacts, our legitimate interests. You can
            opt out at any time using the unsubscribe link in any email or by contacting us.
          </P>
          <P>
            We use it to improve our website and services, keep accounting records, and meet our legal obligations,
            based on legitimate interests or legal obligation.
          </P>
          <P>
            You can withdraw consent at any time without affecting the lawfulness of processing carried out beforehand.
          </P>

          <H2>4. Who We Share Your Data With</H2>
          <P>
            We do not sell your personal data. We share it only where necessary and under appropriate safeguards.
          </P>
          <P>
            We share it with trusted service providers who help us run our business, such as cloud hosting, CRM, and
            marketing platforms, and professional advisers. Each is bound by a written agreement to handle data only on
            our instructions.
          </P>
          <P>
            We share it with Providus Technologies LLC and group entities, where this supports the service we provide.
            We share it with technology partners such as Salesforce or FinDock, where you have asked us to, or where a
            joint project requires it.
          </P>
          <P>We may share it with regulators, courts, or law enforcement where legally required.</P>

          <H2>5. International Transfers</H2>
          <P>
            Some of the recipients above are based outside the United Kingdom, including our parent company, Providus
            Technologies LLC, in the United States. Where we transfer personal data outside the UK, we use the
            safeguards required by UK GDPR. These include transfers to countries the UK government has formally
            recognised as providing adequate protection, the UK International Data Transfer Agreement (IDTA), or the UK
            Addendum to the EU Standard Contractual Clauses, supported by transfer risk assessments where appropriate.
          </P>
          <P>
            If you would like a copy of the safeguards we use for a specific transfer, please contact us at <Email />.
          </P>

          <H2>6. How Long We Keep Your Data</H2>
          <P>
            We keep personal data only as long as we need it for the purposes set out in this policy, or as required by
            law. Enquiry data is typically held for up to 24 months from your last interaction with us. Client
            engagement data is held for the duration of our contract and for up to seven years afterwards, in line with
            UK accounting and tax record-keeping requirements. Marketing data is held until you opt out or until it is
            no longer relevant. After these periods, we securely delete or anonymise the data.
          </P>

          <H2>7. How We Protect Your Data</H2>
          <P>
            We apply appropriate technical and organisational measures to protect personal data, including access
            controls, encryption in transit, secure cloud infrastructure, and staff training. No system is ever
            completely secure, but we work to industry standards and notify the ICO and affected individuals promptly in
            the unlikely event of a personal data breach where required.
          </P>

          <H2>8. Your Rights Under UK GDPR</H2>
          <P>
            You have the right to be informed about how we use your data, to access the personal data we hold about
            you, to have inaccurate data corrected, to have your data erased in certain circumstances, to restrict how
            we process it, to object to certain processing, including direct marketing, to data portability, and to
            withdraw any consent you have given. You also have rights in relation to automated decision-making and
            profiling, although we do not currently carry out any automated decision-making that has legal or similarly
            significant effects on you.
          </P>
          <P>
            To exercise any of these rights, please contact us at <Email />. We will respond within one month, as
            required by UK GDPR.
          </P>
          <P>
            If you are unhappy with how we have handled your data, you can complain to the Information
            Commissioner&apos;s Office (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline-offset-4 hover:underline"
            >
              ico.org.uk
            </a>{" "}
            or by calling <a href="tel:03031231113">0303 123 1113</a>. We would, however, appreciate the chance to
            address your concerns first.
          </P>

          <H2>9. Children&apos;s Data</H2>
          <P>
            Our services are intended for businesses, and we do not knowingly collect personal data from anyone under
            the age of 18.
          </P>

          <H2>10. Changes to This Policy</H2>
          <P>
            We may update this policy from time to time. Where changes are significant, we will tell you directly or
            post a clear notice on our website.
          </P>

          <address className="mt-10 not-italic">
            <Text variant="p3" className="text-gray-700">
              ProvidusCRM
              <br />
              1st Floor, Portfolio Place, 498 Broadway, Oldham, United Kingdom OL9 9PY
              <br />
              <Email />
            </Text>
          </address>
        </article>
      </Container>
    </Section>
  );
}
