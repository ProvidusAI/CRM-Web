"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";

interface SalesforceServiceHeroProps {
  badgeTitle?: string;
  badgeSubtitle?: string;
  title: string;
  description?: string;
  bullets?: string[];
  formTitle?: string;
  formButtonLabel?: string;
  backgroundImage?: string;
}

const emptyForm = {
  name: "",
  email: "",
  contactNumber: "",
  message: "",
};

export function SalesforceServiceHero({
  badgeTitle,
  badgeSubtitle,
  title,
  description,
  bullets = [],
  formTitle,
  formButtonLabel,
  backgroundImage = "/images/hero-bg.webp",
}: SalesforceServiceHeroProps) {
  const displayBadgeTitle = badgeTitle || "Certified";
  const displayBadgeSubtitle = badgeSubtitle || "Salesforce Partner in the UK";
  const displayFormTitle = formTitle || "Fill a form today";
  const displayFormButtonLabel = formButtonLabel || "Let's Connect";
  const [formState, setFormState] = useState(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, serviceTitle: title }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setFormState(emptyForm);
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
    <section className="bg-white pb-10 pt-4 md:pb-14 md:pt-6">
      <Container>
        <div
          className="relative overflow-hidden rounded-[20px] bg-brand-blue px-6 py-10 text-white shadow-xl md:px-10 md:py-14 lg:px-14 lg:py-16"
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="(min-width: 1800px) 1696px, calc(100vw - 48px)"
            className="absolute inset-0 z-0 object-cover object-center"
            quality={78}
          />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="shrink-0 bg-white rounded-sm overflow-hidden">
                  <Image
                    src="/images/salesforce-partner.webp"
                    alt="Salesforce Partner"
                    width={66}
                    height={71}
                    className="h-auto w-[66px] object-contain bg-white"
                  />
                </div>
                <Text variant="p3" className="max-w-[170px] text-white">
                  <span className="block font-semibold">{displayBadgeTitle}</span>
                  <span className="block">{displayBadgeSubtitle}</span>
                </Text>
              </div>

              <Heading
                as="h1"
                className="max-w-[560px] text-white !text-[34px] !leading-[1.05] md:!text-[60px] md:!leading-[0.98]"
              >
                {title}
                <Image
                  src="/images/green-line.svg"
                  alt=""
                  width={72}
                  height={24}
                  aria-hidden="true"
                  className="ml-3 inline-block h-[0.45em] w-auto align-baseline"
                />
              </Heading>

              {description && (
                <Text variant="p3" className="mt-7 max-w-xl text-white/90">
                  {description}
                </Text>
              )}

              {bullets.length > 0 && (
                <ul className="mt-7 space-y-3">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-brand-green-light"
                      />
                      <Text variant="p3" as="span" className="text-white/90">
                        {bullet}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-[18px] border border-white/45 bg-white/10 p-5 backdrop-blur-sm md:p-7">
              {status === "success" ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[12px] border border-brand-green-light/40 bg-brand-green-light/15 p-8 text-center">
                  <CheckCircle
                    aria-hidden="true"
                    className="h-12 w-12 text-brand-green-light"
                  />
                  <Heading as="h4" className="mt-4 text-white">
                    Thank You!
                  </Heading>
                  <Text variant="p3" className="mt-3 text-white/80">
                    Your message has been sent successfully. We will connect
                    with you shortly.
                  </Text>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Heading
                    as="h2"
                    level="h4"
                    className="text-center text-white"
                  >
                    {displayFormTitle}
                  </Heading>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-[6px] border border-white/40 bg-white/15 px-4 py-3 font-body text-[14px] text-white"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <HeroInput
                    label="Name"
                    value={formState.name}
                    placeholder="Enter your full name"
                    maxLength={100}
                    pattern="[A-Za-z .'-]+"
                    title="Name can only include letters, spaces, apostrophes, periods, and hyphens."
                    onChange={(value) =>
                      setFormState({ ...formState, name: value })
                    }
                  />
                  <HeroInput
                    label="Email"
                    type="email"
                    value={formState.email}
                    placeholder="Enter your email address"
                    maxLength={100}
                    onChange={(value) =>
                      setFormState({ ...formState, email: value })
                    }
                  />
                  <HeroInput
                    label="Contact Number"
                    type="tel"
                    value={formState.contactNumber}
                    placeholder="Enter your contact number"
                    minLength={7}
                    maxLength={20}
                    inputMode="numeric"
                    pattern="[0-9]{7,20}"
                    title="Contact number must contain 7 to 20 digits only."
                    onChange={(value) =>
                      setFormState({
                        ...formState,
                        contactNumber: value.replace(/\D/g, "").slice(0, 20),
                      })
                    }
                  />

                  <div className="flex flex-col gap-2">
                    <Text variant="p4" as="label" className="text-white">
                      Message
                    </Text>
                    <textarea
                      required
                      maxLength={1000}
                      rows={5}
                      placeholder="Tell us about your project"
                      value={formState.message}
                      onChange={(event) =>
                        setFormState({
                          ...formState,
                          message: event.target.value,
                        })
                      }
                      className="min-h-[130px] resize-none rounded-[6px] border border-transparent bg-white px-4 py-3 font-body text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-brand-green"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-[6px] bg-brand-green px-6 py-3 font-body text-[14px] font-semibold text-white shadow-md transition-colors hover:bg-[#2d8c14] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending..." : displayFormButtonLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface HeroInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  title?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
}

function HeroInput({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  maxLength,
  minLength,
  pattern,
  title,
  inputMode,
}: HeroInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text variant="p4" as="label" className="text-white">
        {label}
      </Text>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        title={title}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[6px] border border-transparent bg-white px-4 font-body text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-brand-green"
      />
    </div>
  );
}
