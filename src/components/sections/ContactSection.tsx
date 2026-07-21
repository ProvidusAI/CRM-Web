"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

const emptyContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export function ContactSection() {
  const [formState, setFormState] = useState(emptyContactFormState);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setFormState(emptyContactFormState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    }
  };

  return (
    <section className="mt-4 py-8 md:py-12 bg-white">
      <Container>
        <div
          className="relative rounded-3xl overflow-hidden bg-brand-blue px-6 py-12 md:px-12 lg:px-16 md:py-16 lg:py-20 text-white shadow-xl"
        >
          <Image
            src="/images/hero-bg.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1800px) 1696px, calc(100vw - 48px)"
            className="absolute inset-0 z-0 object-cover object-center"
            quality={78}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column — Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              <Reveal direction="up" delay={0.1}>
                {/* Wavy Logo Icon */}
                <Image
                  src="/images/green-line.svg"
                  alt=""
                  aria-hidden="true"
                  width={60}
                  height={20}
                  className="inline-block h-8 w-auto align-baseline ml-1"
                />

                {/* This is the only heading on /contact, so it carries the page
                    h1. Visual size is unchanged. */}
                <Heading as="h1" level="h2" className="text-white !text-[34px] !leading-[38px] md:!text-[50px] md:!leading-[60.9px] font-bold font-heading mb-4">
                  Let&apos;s Connect
                </Heading>

                <Text className="text-white/85 !text-[15px] md:!text-[18px] font-body leading-relaxed max-w-md">
                  Get in touch with by filling out the form or via the contact details below.
                </Text>
              </Reveal>

              {/* Info Items */}
              <div className="flex flex-col gap-6 mt-6 md:mt-8">
                {/* Pin Address */}
                <Reveal direction="up" delay={0.2}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center pt-1 text-brand-green-light">
                      <MapPin className="w-6 h-6 text-brand-green-light" aria-hidden="true" />
                    </div>
                    <span className="font-body font-normal text-[15px] md:text-[18px] text-white/90 leading-relaxed max-w-sm">
                      9 Appold St, London EC2A 2AP, <br />United Kingdom
                    </span>
                  </div>
                </Reveal>

                {/* Email Address */}
                <Reveal direction="up" delay={0.3}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                      <Mail className="w-6 h-6 text-brand-green-light" aria-hidden="true" />
                    </div>
                    <a
                      href="mailto:connect@providuscrm.co.uk"
                      className="font-body font-normal text-[15px] md:text-[18px] text-white hover:text-brand-green-light transition-colors leading-relaxed"
                    >
                      connect@providuscrm.co.uk
                    </a>
                  </div>
                </Reveal>

                {/* Phone Number */}
                <Reveal direction="up" delay={0.4}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-transparent rounded-full flex items-center justify-center text-brand-green-light">
                      <Phone className="w-6 h-6 text-brand-green-light" aria-hidden="true" />
                    </div>
                    <a
                      href="tel:+447777973577"
                      className="font-body font-normal text-[15px] md:text-[18px] text-white hover:text-brand-green-light transition-colors leading-relaxed"
                    >
                      +44 7777 973577
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column — Contact Form */}
            <div className="lg:col-span-7 w-full bg-transparent rounded-2xl">
              <Reveal direction="left" delay={0.2} width="100%">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {status === "success" ? (
                    <div className="bg-brand-green-light/20 border border-brand-green-light/45 rounded-xl p-8 text-center flex flex-col items-center gap-3" role="status" aria-live="polite">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-brand-green-light)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <Heading as="h4" className="text-white">
                        Thank You!
                      </Heading>
                      <Text className="text-white/80">
                        Your message has been sent successfully. We will connect with you shortly.
                      </Text>
                    </div>
                  ) : (
                    <>
                      {status === "error" && (
                        <div
                          role="alert"
                          className="rounded-[6px] border border-white/40 bg-white/15 px-4 py-3 font-body text-[14px] text-white"
                        >
                          {errorMessage}
                        </div>
                      )}

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[16px] md:text-[18px] leading-[25px] text-white">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            pattern="[A-Za-z .'-]+"
                            title="Name can only include letters, spaces, apostrophes, periods, and hyphens."
                            placeholder="Enter your full name"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[16px] md:text-[18px] leading-[25px] text-white">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            maxLength={100}
                            placeholder="Enter your email address"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone & Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[16px] md:text-[18px] leading-[25px] text-white">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            minLength={7}
                            maxLength={20}
                            inputMode="numeric"
                            pattern="[0-9]{7,20}"
                            title="Phone must contain 7 to 20 digits only."
                            placeholder="Enter your phone number"
                            value={formState.phone}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                phone: e.target.value.replace(/\D/g, "").slice(0, 20),
                              })
                            }
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-body font-normal text-[16px] md:text-[18px] leading-[25px] text-white">
                            Company
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={150}
                            placeholder="Enter your company name"
                            value={formState.company}
                            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            className="h-[48px] px-4 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all"
                          />
                        </div>
                      </div>


                      {/* Textarea */}
                      <div className="flex flex-col gap-2">
                        <label className="font-body font-normal text-[16px] md:text-[18px] leading-[25px] text-white">
                          How can we help?
                        </label>
                        <textarea
                          required
                          maxLength={1000}
                          rows={4}
                          placeholder="Please tell us about your project..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="px-4 py-3 bg-white border border-transparent rounded-[6px] text-[14px] font-body text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-green transition-all resize-none min-h-[120px]"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-[#38A81B] text-white hover:bg-[#2d8c14] focus-visible:outline-[#38A81B] py-3.5 rounded-full font-body font-semibold text-[16px] transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "submitting"
                          ? "Sending..."
                          : "Let's Connect"}
                      </button>
                    </>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
