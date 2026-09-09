"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";

const teamThoughts = [
  {
    id: 1,
    name: "Mohsin J. Khan",
    displayName: "Mohsin Khan",
    designation: "Founder",
    fullDesignation: "Founder at ProvidusCRM",
    image: "/images/team/9.webp",
    quote: "I have seen too many organisations stuck with CRM systems that no longer serve them. We exist to fix that, and to make sure new implementations do not end up the same way."
  },
  {
    id: 2,
    name: "Mustansir Mustafa",
    displayName: "Mustansir Mustafa",
    designation: "Senior Director of Business Operations",
    fullDesignation: "Senior Director of Business Operations",
    image: "/images/team/10.webp",
    quote: "Operational excellence in CRM is not just about writing clean code; it's about aligning technology with business processes to achieve predictable, repeatable success."
  },
  {
    id: 3,
    name: "Sami Haroon",
    displayName: "Sami Haroon",
    designation: "Vice President of AI Engineering",
    fullDesignation: "Vice President of AI Engineering",
    image: "/images/team/8.webp",
    quote: "Integrating AI with Salesforce is the next frontier of productivity. We build intelligent workflows that turn data into insights and actions, helping teams scale effortlessly."
  },
  {
    id: 4,
    name: "Adil Raja",
    displayName: "Adil Raja",
    designation: "Chief CRM Officer",
    fullDesignation: "Chief CRM Officer",
    image: "/images/team/1.webp",
    quote: "A CRM should empower people, not restrict them. We design user-centric Salesforce systems that teams love to use, driving high adoption and maximum long-term value."
  }
];

export function TeamThoughtsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamThoughts[activeIndex];

  return (
    <section className="mt-24 relative py-24 overflow-hidden bg-[#1E5D8F]">
      <Image
        src="/images/team-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
        quality={78}
      />
      <Container className="relative z-10">
        {/* Header */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-16">
            <Image
              src="/images/green-line.svg"
              alt=""
              width={60}
              height={20}
              className="w-16 h-auto mb-6"
            />
            <Heading as="h2" className="text-white font-bold mb-4">
              Meet Our Team
            </Heading>
            <Text variant="p2" className="text-white/80 max-w-2xl">
              Our team of technology experts and industry leaders leads our expertise, solutions, and success stories.
            </Text>
          </div>
        </Reveal>

        {/* Large Message Card */}
        <Reveal direction="up" delay={0.2}>
          <div
            className="bg-white flex flex-col md:flex-row w-full overflow-hidden shadow-2xl mb-12"
            style={{
              borderRadius: "20px"
            }}
          >
            {/* Left side Image */}
            <div className="w-full md:w-[360px] lg:w-[420px] shrink-0 relative aspect-square md:aspect-auto min-h-[350px] md:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={activeMember.image}
                    alt={activeMember.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    style={{
                      borderRadius: "20px 20px 0 0" // default rounded for mobile top
                    }}
                  />
                  {/* Subtle dark gradient overlay to match image style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side Quote/Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between flex-1 relative min-h-[350px]">
              {/* Double Quote Icon */}
              <div className="absolute top-8 right-8 lg:top-12 lg:right-12 text-[#E2F2FF] opacity-80 pointer-events-none">
                <svg width="60" height="44" viewBox="0 0 60 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4286 0C6.90738 0 0 6.90738 0 15.4286V43.2857H25.7143V15.4286H8.57143C8.57143 11.6429 11.6429 8.57143 15.4286 8.57143V0ZM49.7143 0C41.1931 0 34.2857 6.90738 34.2857 15.4286V43.2857H60V15.4286H42.8571C42.8571 11.6429 45.9286 8.57143 49.7143 8.57143V0Z" />
                </svg>
              </div>

              {/* Quote Text */}
              <div className="pr-12 md:pr-16 flex-1 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heading as="h3" level="h4" className="text-black font-medium leading-relaxed font-heading pr-4">
                      “{activeMember.quote}”
                    </Heading>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author Details */}
              <div className="mt-8 pt-6 border-t border-gray-100 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Text variant="p1" className="text-black font-bold mb-1">
                      {activeMember.displayName}
                    </Text>
                    <Text variant="p3" className="text-gray-500">
                      {activeMember.fullDesignation}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamThoughts.map((member, index) => {
            const isActive = activeIndex === index;
            return (
              <Reveal
                key={member.id}
                direction="up"
                delay={0.3 + index * 0.1}
              >
                <div
                  className={`cursor-pointer transition-all duration-300 flex flex-col items-center select-none w-full max-w-[284px] ${isActive ? "ring-4 ring-white/30 translate-y-[-8px]" : "hover:translate-y-[-4px]"
                    }`}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  style={{
                    borderRadius: "40px",
                    boxShadow: "0px 16.25px 35.54px 0px rgba(0, 0, 0, 0.04), 0px 63.97px 63.97px 0px rgba(0, 0, 0, 0.04), 0px 144.19px 86.31px 0px rgba(0, 0, 0, 0.02), 0px 255.88px 102.56px 0px rgba(0, 0, 0, 0.01), 0px 399.05px 111.69px 0px rgba(0, 0, 0, 0.0)",
                    backdropFilter: "blur(32.492881774902344px)",
                    background: isActive
                      ? "rgba(255, 255, 255, 0.95)"
                      : "rgba(255, 255, 255, 0.85)",
                    padding: "8px"
                  }}
                >
                  {/* Photo with radius 32px */}
                  <div
                    className="relative w-[268px] h-[284px] overflow-hidden mb-6 shrink-0"
                    style={{
                      borderRadius: "32px"
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="268px"
                      className="object-cover"
                    />
                  </div>

                  {/* Name and Designation */}
                  <div className="text-center px-2 flex flex-col items-center">
                    <Text variant="p1" className="text-black font-bold mb-2">
                      {member.name}
                    </Text>
                    <Text variant="p3" className="text-gray-500 leading-snug">
                      {member.designation}
                    </Text>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
