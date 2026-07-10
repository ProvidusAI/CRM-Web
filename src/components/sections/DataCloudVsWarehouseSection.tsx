"use client";

import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { motion } from "framer-motion";

export function DataCloudVsWarehouseSection() {
  return (
    <section className="py-20 md:py-32 bg-[#F6F6F6] border-y border-[#38A81B] mt-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="text-[#A0FF88] mb-4">
            <svg
              width="64"
              height="32"
              viewBox="0 0 64 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 28L20 8L32 20L48 4L56 12"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 28L36 12L44 20L60 4"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
            </svg>
          </div>
          <Heading as="h2" className="text-black font-bold leading-tight">
            Data Cloud vs Your Data Warehouse, Do You Need Both?
          </Heading>
        </motion.div>

        <div className="relative w-full">
          {/* Vertical divider on desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 transform -translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-y-12 md:gap-y-16 gap-x-0 relative z-10">
            {/* Box 1 */}
            <div className="md:pr-16 lg:pr-24 flex">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  borderRadius: '16px',
                  border: '1px solid #33FF00',
                  backgroundColor: '#FFF',
                  boxShadow: '0 7px 14px 0 rgba(51, 255, 0, 0.21)'
                }}
                className="p-8 md:p-10 flex flex-col w-full h-full"
              >
                <Heading as="h4" className="text-black font-bold mb-4">
                  Data Cloud Is<br/>The Operational Layer
                </Heading>
                <Text variant="p4" className="text-gray-600 leading-relaxed">
                  It keeps a live, unified view of each customer that Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce can read from within seconds. Its strength is the speed of activation across your Salesforce ecosystem.
                </Text>
              </motion.div>
            </div>

            {/* Box 2 */}
            <div className="md:pl-16 lg:pl-24 flex">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                style={{
                  borderRadius: '16px',
                  border: '1px solid #308FFF',
                  backgroundColor: '#FFF',
                  boxShadow: '0 7px 14px 0 rgba(48, 143, 255, 0.21)'
                }}
                className="p-8 md:p-10 flex flex-col w-full h-full"
              >
                <Heading as="h4" className="text-black font-bold mb-4">
                  Your Data Warehouse Is<br/>The Analytical Layer
                </Heading>
                <Text variant="p4" className="text-gray-600 leading-relaxed">
                  It holds large volumes of structured data across the whole business, so analysts can query it flexibly for reports, dashboards, and modelling. Its strength is analytical depth across every function, not just customer records.
                </Text>
              </motion.div>
            </div>

            {/* Box 3 */}
            <div className="md:pr-16 lg:pr-24 flex">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                style={{
                  borderRadius: '16px',
                  border: '1px solid #8800FF',
                  backgroundColor: '#FFF',
                  boxShadow: '0 7px 14px 0 rgba(136, 0, 255, 0.21)'
                }}
                className="p-8 md:p-10 flex flex-col w-full h-full"
              >
                <Heading as="h4" className="text-black font-bold mb-4">
                  Most Businesses Need Both,<br/>Connected Properly
                </Heading>
                <Text variant="p4" className="text-gray-600 leading-relaxed">
                  Data Cloud handles operational customer activation. The warehouse handles cross-business analysis. Zero-copy sharing with Snowflake and Databricks lets both platforms reference data without duplicating storage.
                </Text>
              </motion.div>
            </div>

            {/* Box 4 */}
            <div className="md:pl-16 lg:pl-24 flex">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                style={{
                  borderRadius: '16px',
                  border: '1px solid #FFB030',
                  backgroundColor: '#FFF',
                  boxShadow: '0 7px 14px 0 rgba(255, 176, 48, 0.21)'
                }}
                className="p-8 md:p-10 flex flex-col w-full h-full"
              >
                <Heading as="h4" className="text-black font-bold mb-4">
                  The Common Mistake
                </Heading>
                <Text variant="p4" className="text-gray-600 leading-relaxed">
                  Businesses purchase the Data Cloud license, expecting data warehouse-style reporting end up disappointed. Businesses that refuse Data Cloud because they already have a warehouse end up with Salesforce activation gaps. Our consultants map which layer holds which workload, based on how your business actually operates.
                </Text>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
