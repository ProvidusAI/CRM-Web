"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ExpertiseImplementationItem {
  title: string;
  text: string;
  image: string;
}

interface ExpertiseImplementationSectionProps {
  heading: React.ReactNode;
  items: ExpertiseImplementationItem[];
}

export function ExpertiseImplementationSection({
  heading,
  items,
}: ExpertiseImplementationSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
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
          <Heading as="h2" className="text-slate-900 font-bold leading-tight">
            {heading}
          </Heading>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch"
            >
              {/* Image Column */}
              <div className="lg:w-[35%] relative min-h-[250px] lg:min-h-full rounded-[18px] overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Content Column */}
              <div 
                className="lg:w-[65%] rounded-[18px] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#EBF4FF]"
              >
                <h4 className="typography-h4 text-black font-semibold mb-4">
                  {item.title}
                </h4>
                <Text variant="p4" className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {item.text}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
