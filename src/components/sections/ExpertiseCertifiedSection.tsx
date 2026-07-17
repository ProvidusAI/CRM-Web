"use client";

import { Section } from "@/components/layout/Section";
import Image from "next/image";
import { motion } from "framer-motion";

interface ExpertiseCertifiedSectionProps {
  images: string[];
}

export function ExpertiseCertifiedSection({ images }: ExpertiseCertifiedSectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <Section className="py-12 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full flex items-center"
      >
        <div className="flex items-center gap-8 md:gap-16 animate-marquee w-fit">
          {/* First set of logos */}
          {images.map((src, idx) => (
            <div key={`cert-1-${idx}`} className="shrink-0 w-[120px] h-[120px] md:w-[150px] md:h-[150px] relative">
              <Image
                src={src}
                alt={`Certification ${idx + 1}`}
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((src, idx) => (
            <div key={`cert-2-${idx}`} className="shrink-0 w-[120px] h-[120px] md:w-[150px] md:h-[150px] relative">
              <Image
                src={src}
                alt={`Certification ${idx + 1}`}
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
