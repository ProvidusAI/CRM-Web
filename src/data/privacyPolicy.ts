import type { PortableTextBlock } from "next-sanity";

// What /privacy-policy says today, as Portable Text for the rich text section.
// The route renders it with no props, and the seed writes it to Sanity, so the
// page reads the same before and after the content moves to the CMS.

export const DEFAULT_PRIVACY_TITLE = "Privacy Policy";
export const DEFAULT_PRIVACY_SUBTITLE = "Last updated: 24-06-2026";

const EMAIL = "connect@providuscrm.co.uk";

type Part = string | { strong: string } | { href: string; text: string };

let keyCount = 0;
const key = () => `pp${++keyCount}`;

const b = (strong: string): Part => ({ strong });
const a = (href: string, text: string): Part => ({ href, text });
const email = (): Part => a(`mailto:${EMAIL}`, EMAIL);

/**
 * One block. Each part becomes its own span, so a run of text and links keeps
 * the child boundaries the page had when it was JSX (React separates adjacent
 * text nodes with a comment, and the proof diff compares that too).
 */
function block(style: "normal" | "h2" | "address", parts: Part[], list?: "bullet"): PortableTextBlock {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = parts.map((part) => {
    if (typeof part === "string") return { _type: "span", _key: key(), text: part, marks: [] as string[] };
    if ("strong" in part) return { _type: "span", _key: key(), text: part.strong, marks: ["strong"] };
    const def = { _key: key(), _type: "link" as const, href: part.href };
    markDefs.push(def);
    return { _type: "span", _key: key(), text: part.text, marks: [def._key] };
  });
  return {
    _type: "block",
    _key: key(),
    style,
    ...(list ? { listItem: list, level: 1 } : {}),
    markDefs,
    children,
  };
}

const h2 = (...parts: Part[]) => block("h2", parts);
const p = (...parts: Part[]) => block("normal", parts);
const bullet = (...parts: Part[]) => block("normal", parts, "bullet");
const address = (...parts: Part[]) => block("address", parts);

export const DEFAULT_PRIVACY_BODY: PortableTextBlock[] = [
  h2("1. About Us and This Policy"),
  p("ProvidusCRM is a Salesforce consulting practice and a wholly owned subsidiary of Providus Technologies LLC. References in this policy to \"ProvidusCRM,\" \"we,\" \"us,\" or \"our\" mean ProvidusCRM together with Providus Technologies LLC where relevant."),
  p("For UK data protection law, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, ProvidusCRM is the data controller for personal data we collect through our website and in the course of our business activities in the United Kingdom."),
  p("This policy explains what personal data we collect, how we use it, who we share it with, how long we keep it, and the rights you have over it. If you have any questions, please contact us at ", email(), " or write to us at:"),
  address("ProvidusCRM\n1st Floor, Portfolio Place\n498 Broadway\nOldham\nUnited Kingdom\nOL9 9PY"),
  h2("2. The Data We Collect"),
  p("We only collect personal data we genuinely need."),
  bullet(b("Information you give us."), " Your name, job title, company name, business email address, business phone number, and the content of any messages you send us. You provide this when you fill in a contact form, request a proposal, register for an event or webinar, subscribe to updates, or contact us directly."),
  bullet(b("Information we collect automatically."), " When you visit our website, we collect technical data such as your IP address, browser type, device type, the pages you visit, and how you arrived at our site. We collect this through cookies and similar technologies. You can manage cookies through the banner on our website or your browser settings."),
  bullet(b("Information from client engagements."), " Where your organisation is a client, we may process personal data shared with us during a project, such as contact details of your team members and data within the Salesforce environment we are engaged to work on."),
  bullet(b("Information from third parties."), " We sometimes receive business contact details from publicly available sources such as LinkedIn, from partners such as Salesforce or FinDock, or from events where you have agreed to be contacted."),
  h2("3. How We Use Your Data and Our Legal Bases"),
  p("We use your personal data only for clear and lawful purposes, and we rely on a specific UK GDPR legal basis in each case."),
  p("We use it to respond to enquiries and provide the information, proposals, or services you request, on the basis of taking steps at your request before entering into a contract. We use it to deliver services agreed under our contracts with clients, on the basis of the performance of a contract. We use it to send service updates and project communications, based on contract or legitimate interests in running our business properly."),
  p("We use it to send marketing emails about our services, events, and relevant content, on the basis of your consent or, where permitted under UK rules for existing business contacts, our legitimate interests. You can opt out at any time using the unsubscribe link in any email or by contacting us."),
  p("We use it to improve our website and services, keep accounting records, and meet our legal obligations, based on legitimate interests or legal obligation."),
  p("You can withdraw consent at any time without affecting the lawfulness of processing carried out beforehand."),
  h2("4. Who We Share Your Data With"),
  p("We do not sell your personal data. We share it only where necessary and under appropriate safeguards."),
  p("We share it with trusted service providers who help us run our business, such as cloud hosting, CRM, and marketing platforms, and professional advisers. Each is bound by a written agreement to handle data only on our instructions."),
  p("We share it with Providus Technologies LLC and group entities, where this supports the service we provide. We share it with technology partners such as Salesforce or FinDock, where you have asked us to, or where a joint project requires it."),
  p("We may share it with regulators, courts, or law enforcement where legally required."),
  h2("5. International Transfers"),
  p("Some of the recipients above are based outside the United Kingdom, including our parent company, Providus Technologies LLC, in the United States. Where we transfer personal data outside the UK, we use the safeguards required by UK GDPR. These include transfers to countries the UK government has formally recognised as providing adequate protection, the UK International Data Transfer Agreement (IDTA), or the UK Addendum to the EU Standard Contractual Clauses, supported by transfer risk assessments where appropriate."),
  p("If you would like a copy of the safeguards we use for a specific transfer, please contact us at ", email(), "."),
  h2("6. How Long We Keep Your Data"),
  p("We keep personal data only as long as we need it for the purposes set out in this policy, or as required by law. Enquiry data is typically held for up to 24 months from your last interaction with us. Client engagement data is held for the duration of our contract and for up to seven years afterwards, in line with UK accounting and tax record-keeping requirements. Marketing data is held until you opt out or until it is no longer relevant. After these periods, we securely delete or anonymise the data."),
  h2("7. How We Protect Your Data"),
  p("We apply appropriate technical and organisational measures to protect personal data, including access controls, encryption in transit, secure cloud infrastructure, and staff training. No system is ever completely secure, but we work to industry standards and notify the ICO and affected individuals promptly in the unlikely event of a personal data breach where required."),
  h2("8. Your Rights Under UK GDPR"),
  p("You have the right to be informed about how we use your data, to access the personal data we hold about you, to have inaccurate data corrected, to have your data erased in certain circumstances, to restrict how we process it, to object to certain processing, including direct marketing, to data portability, and to withdraw any consent you have given. You also have rights in relation to automated decision-making and profiling, although we do not currently carry out any automated decision-making that has legal or similarly significant effects on you."),
  p("To exercise any of these rights, please contact us at ", email(), ". We will respond within one month, as required by UK GDPR."),
  p("If you are unhappy with how we have handled your data, you can complain to the Information Commissioner's Office (ICO) at", " ", a("https://ico.org.uk", "ico.org.uk"), " ", "or by calling ", a("tel:03031231113", "0303 123 1113"), ". We would, however, appreciate the chance to address your concerns first."),
  h2("9. Children's Data"),
  p("Our services are intended for businesses, and we do not knowingly collect personal data from anyone under the age of 18."),
  h2("10. Changes to This Policy"),
  p("We may update this policy from time to time. Where changes are significant, we will tell you directly or post a clear notice on our website."),
  address(
    "ProvidusCRM\n1st Floor, Portfolio Place, 498 Broadway, Oldham, United Kingdom OL9 9PY\n",
    email(),
  ),
];
