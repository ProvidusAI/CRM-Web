"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs?: FaqItem[];
}

export function FaqSection({ title = "Frequently Asked Questions", faqs = [] }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Try to cleanly split the title into two lines if it's the default
  const formattedTitle = title === "Frequently Asked Questions" 
    ? <><span className="block">Frequently</span><span className="block">Asked Questions</span></>
    : title;

  return (
    <Section className="py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column - Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <GreenLineMark className="w-16 h-auto mb-6 text-brand-green-light" />
            <Heading as="h2" className="text-black">
              {formattedTitle}
            </Heading>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index}
                  className={cn(
                    "border transition-colors duration-300 rounded-[12px] overflow-hidden",
                    isOpen ? "border-gray-300 bg-white" : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-6 flex justify-between items-center gap-6"
                    aria-expanded={isOpen}
                  >
                    <Text variant="p1" className="text-black font-semibold !leading-tight m-0 p-0 pr-4">
                      {faq.question}
                    </Text>
                    <span className="shrink-0 text-gray-500">
                      {isOpen ? (
                        <Minus className="w-6 h-6 stroke-[1.5]" />
                      ) : (
                        <Plus className="w-6 h-6 stroke-[1.5]" />
                      )}
                    </span>
                  </button>
                  
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <Text variant="p4" className="text-gray-700 m-0 p-0">
                        {faq.answer}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </Section>
  );
}
