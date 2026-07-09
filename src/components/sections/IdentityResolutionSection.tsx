"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import Image from "next/image";
import { motion } from "framer-motion";

export function IdentityResolutionSection() {
  return (
    <Section className="py-20 md:py-32 bg-white">
      <Container>
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heading as="h2" className="text-black font-bold leading-tight">
              How Identity <br className="hidden md:block" />
              Resolution Works{" "}
              <GreenLineMark className="inline-block h-8 md:h-10 w-auto align-baseline" />
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <Text variant="p2" className="text-gray-700">
              Identity resolution decides whether two records belong to the same person.
            </Text>
            <Text variant="p2" className="text-gray-700">
              Get it right, and every dashboard, segment, and AI feature downstream becomes trustworthy. Get it wrong, and you cannot trust anything Data Cloud produces.
            </Text>
          </motion.div>
        </div>

        {/* Middle Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full mb-16 md:mb-24"
        >
          <div className="relative w-full aspect-[1236/193] min-h-[120px] md:min-h-[190px]">
            <Image
              src="/images/data-cloud-identity.svg"
              alt="How Identity Resolution Works Diagram"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Bottom 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:pr-12 md:border-r border-gray-300"
          >
            <Heading as="h4" className="text-black font-bold mb-6">
              The Two Failure modes
            </Heading>
            <Text variant="p4" className="text-gray-600 leading-relaxed mb-6">
              Exact-match-only rules miss obvious duplicates: "John Smith" and "J. Smith" pointing at the same phone number stay as separate profiles.
            </Text>
            <Text variant="p4" className="text-gray-600 leading-relaxed">
              Loose, misdirected matching goes the other way, merging two different people who share a common name and a nearby postcode. The right configuration sits between these extremes.
            </Text>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="md:px-12 md:border-r border-gray-300"
          >
            <Heading as="h4" className="text-black font-bold mb-6">
              Here's An Example
            </Heading>
            <Text variant="p4" className="text-gray-600 leading-relaxed mb-6">
              Consider "J. Smith, jsmith@email.com, mobile ending 4471, London SW1" and "John Smith, john.smith@personalemail.com, mobile ending 4471, London SW1".
            </Text>
            <Text variant="p4" className="text-gray-600 leading-relaxed">
              A default configuration keeps them as two profiles. A properly configured multi-attribute rule merges them into one unified profile with two known email addresses, tuned against real sample data.
            </Text>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="md:pl-12"
          >
            <Heading as="h4" className="text-black font-bold mb-6">
              Survivorship Rules
            </Heading>
            <Text variant="p4" className="text-gray-600 leading-relaxed mb-6">
              Once records merge, Data Cloud picks which field values win. Consent should use "most restrictive wins" to avoid contacting opt-outs.
            </Text>
            <Text variant="p4" className="text-gray-600 leading-relaxed">
              Loyalty status should use "highest value wins" to avoid downgrading customers. Our consultants make these decisions field by field, documented with your data owners.
            </Text>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
