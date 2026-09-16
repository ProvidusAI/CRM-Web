"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

export function ExploreSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-16">
            <Heading as="h2" className="text-black font-bold text-center">
              Explore ProvidusCRM
            </Heading>
          </div>
        </Reveal>

        {/* 40% / 60% Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">

          {/* Left Column (40%) - Green Box */}
          <div className="lg:col-span-4 h-full">
            <Reveal direction="left" delay={0.2} className="h-full">
              <Link href="/services" className="block h-full">
                <motion.div
                  className="relative w-full h-[500px] lg:h-[504px] overflow-hidden flex flex-col justify-between p-10 cursor-pointer select-none group"
                  style={{
                    background: "linear-gradient(178.75deg, #161913 1.07%, var(--color-explore-green-dark) 111.45%)",
                    borderRadius: "16px"
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    <Heading as="h3" className="text-white">
                      Our Services
                    </Heading>
                    <Text
                      variant="p3"
                      className="flex items-center gap-2 font-medium"
                      style={{ color: "var(--color-explore-green-accent)" }}
                    >
                      <span>Explore</span>
                      <motion.span
                        className="inline-block"
                        variants={{
                          hover: { x: 5 }
                        }}
                        animate={undefined}
                        whileHover="hover"
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </Text>
                  </div>

                  {/* Graphic/Illustration */}
                  <div className="absolute right-0 bottom-0 w-[95%] h-[80%] max-h-[380px] pointer-events-none overflow-hidden rounded-br-[16px]">
                    {/* Glowing background oval */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-[320px] h-[320px] bg-[#64BD4E]/20 blur-3xl rounded-full" />

                    {/* Woman Illustration */}
                    <motion.div
                      className="absolute inset-0 z-10"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/images/our-services.webp"
                        alt="Our Services"
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-contain object-right-bottom"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          </div>

          {/* Right Column (60%) - Stacked Blue & Grey Boxes */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between h-full">

            {/* Top Box - Blue Box */}
            <Reveal direction="right" delay={0.2}>
              <Link href="/industries" className="block">
                <motion.div
                  className="relative w-full h-[240px] overflow-hidden flex flex-col justify-between p-10 cursor-pointer select-none group"
                  style={{
                    background: "linear-gradient(100.9deg, #267DE4 10.81%, #0F0F0F 98.86%)",
                    borderRadius: "16px"
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col gap-4 max-w-[55%]">
                    <Heading as="h3" className="text-white">
                      Our Industry Expertise
                    </Heading>
                    <Text
                      variant="p3"
                      className="flex items-center gap-2 font-medium"
                      style={{ color: "var(--color-explore-green-accent)" }}
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </Text>
                  </div>

                  {/* Graphic/Illustration */}
                  <div className="absolute right-0 bottom-0 h-full w-[65%] md:w-[50%] pointer-events-none overflow-hidden rounded-r-[16px]">
                    {/* Glowing background. On phones it is wider than this box, which clips its blur into a hard vertical line. */}
                    <div className="absolute bottom-[-10%] right-[-10%] hidden md:block w-[200px] h-[200px] bg-[#267DE4]/30 blur-3xl rounded-full" />

                    {/* Dashboard Image */}
                    <motion.div
                      className="absolute inset-0 flex items-end justify-end"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/images/our-industry.webp"
                        alt="Industry Expertise"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-contain object-right-bottom"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>

            {/* Bottom Box - Grey Box */}
            <Reveal direction="right" delay={0.3}>
              <Link href="/platform-expertise" className="block">
                <motion.div
                  className="relative w-full h-[240px] overflow-hidden flex flex-col justify-between p-10 cursor-pointer select-none group"
                  style={{
                    background: "linear-gradient(90deg, #686868 0%, #242424 100%)",
                    borderRadius: "16px"
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col gap-4 max-w-[55%]">
                    <Heading as="h3" className="text-white">
                      Our Platform Expertise
                    </Heading>
                    <Text
                      variant="p3"
                      className="flex items-center gap-2 font-medium"
                      style={{ color: "var(--color-explore-green-accent)" }}
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </Text>
                  </div>

                  {/* Graphic/Illustration */}
                  <div className="absolute right-0 bottom-0 h-full w-[65%] md:w-[50%] pointer-events-none overflow-hidden rounded-r-[16px]">
                    {/* Glowing background. On phones it is wider than this box, which clips its blur into a hard vertical line. */}
                    <div className="absolute bottom-[-10%] right-[-10%] hidden md:block w-[200px] h-[200px] bg-[#686868]/30 blur-3xl rounded-full" />

                    {/* Platform Image */}
                    <motion.div
                      className="absolute inset-0 flex items-end justify-end"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/images/our-platform.webp"
                        alt="Platform Expertise"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-contain object-right-bottom"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>

          </div>

        </div>
      </Container>
    </section>
  );
}
