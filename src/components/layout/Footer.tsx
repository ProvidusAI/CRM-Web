import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { Container } from "./Container";
import { Text } from "@/components/ui/Typography";

const servicesLinks = [
  { label: "Salesforce Nonprofit Implementation", href: "/services/salesforce-nonprofit-implementation" },
  { label: "Salesforce Implementation Services", href: "/services/salesforce-implementation-services" },
  { label: "Salesforce Migration Services", href: "/services/salesforce-migration-services" },
  { label: "Salesforce Integration Services", href: "/services/salesforce-integration-services" },
  { label: "Salesforce Customization Services", href: "/services/salesforce-customisation-services" },
  { label: "Salesforce Consulting Services", href: "/services/salesforce-consulting-services" },
];

const quickLinks = [
  { label: "Industry", href: "/industries" },
  { label: "Platform Expertise", href: "/platform-expertise" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  { icon: "facebook", href: "https://www.facebook.com/share/1ASdLhT26p/" },
  { icon: "twitter", href: "https://x.com/Providustechllc" },
  { icon: "instagram", href: "https://www.instagram.com/lifeatprovidus" },
  { icon: "linkedin", href: "https://www.linkedin.com/company/providus-technologies" },
];

export function Footer() {
  return (
    <footer className="bg-[#124F87] text-white pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Column 1: Logo, Description, Socials */}
          <div className="md:col-span-4 flex flex-col items-start gap-8">
            <Image
              src="/images/logo-footer.svg"
              alt="ProvidusCRM"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
            <Text variant="p3" className="text-white/90 leading-[28px] max-w-sm">
              Our team of Salesforce experts is looking forward to solving your key CRM
              challenges and helping you drive intelligent automation across your
              processes and sustainable growth.
            </Text>

            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.icon}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={social.icon}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">{social.icon}</span>
                  <Image
                    src={`/images/${social.icon}.svg`}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6 w-full">
              <Text variant="p3" className="text-white/90">
                Powered By
              </Text>
              <Image
                src="/images/providus-logo-white.webp"
                alt="Providus"
                width={130}
                height={31}
                className="h-[26px] w-auto"
              />
              <Image
                src="/images/providus-ai-logo-white.webp"
                alt="Providus AI"
                width={160}
                height={31}
                className="h-[26px] w-auto"
              />
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h2 className="typography-p2 align-middle text-white mb-2">
              Services
            </h2>
            <nav className="flex flex-col gap-2">
              {servicesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="typography-p4 text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Quicklinks */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="typography-p2 align-middle text-white mb-2">
              Quicklinks
            </h2>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="typography-p4 text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h2 className="typography-p2 align-middle text-white mb-2">
              Contact
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-brand-green-light mt-0.5" aria-hidden="true" />
                <span className="typography-p4 text-white/80">
                  9 Appold St, London EC2A 2AP, United Kingdom
                </span>
              </div>
              <a
                href="mailto:connect@providuscrm.co.uk"
                className="flex items-center gap-3 typography-p4 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0 text-brand-green-light" aria-hidden="true" />
                connect@providuscrm.co.uk
              </a>
              <a
                href="tel:+447777973577"
                className="flex items-center gap-3 typography-p4 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0 text-brand-green-light" aria-hidden="true" />
                +44 7777 973577
              </a>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text variant="p4" className=" text-white/60">
            © Copyright 2026, All Rights Reserved
          </Text>

          <div className="flex gap-6">
            <Link href="/faq" className="text-[12px] leading-[24px] font-roboto text-white/60 hover:text-white">
              FAQ
            </Link>
            <Link href="/terms" className="text-[12px] leading-[24px] font-roboto text-white/60 hover:text-white">
              Term of Service
            </Link>
            <Link href="/privacy" className="text-[12px] leading-[24px] font-roboto text-white/60 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
