import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ProcessSteps from "@/components/shared/ProcessSteps";
import SafetyGrid from "@/components/shared/SafetyGrid";
import CareTimeline from "@/components/shared/CareTimeline";
import FaqAccordion from "@/components/shared/FaqAccordion";
import PhotoCTA from "@/components/shared/PhotoCTA";
import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How It Works & Safety",
  description:
    "See SAHAYA's seven-step care process, the caregiver onboarding and selection process, and what families can expect from a care session.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        lines={[
          { text: "Simple from" },
          { text: "start to finish.", accent: true },
        ]}
        sub="No paperwork, no waiting rooms, no agency runaround. One message starts the process — and the SAHAYA team handles the rest."
        image="/images/trust-caregiver.webp"
        imagePosition="center 22%"
        scrimFrom="var(--color-teal-ink)"
      >
        <WhatsAppCTA service="Family Care" label="Start your request" />
      </PageHero>

      <ProcessSteps />

      <SafetyGrid />

      <CareTimeline />

      {/* ── What we need from you ── */}
      <section className="section-tight bg-[var(--color-ivory)]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <Reveal>
            <div className="rounded-[1.75rem] border border-[var(--color-teal-soft)]/40 bg-white p-7 lg:p-9">
              <p className="eyebrow mb-4">Before we can confirm</p>
              <h2 className="font-display text-xl font-bold text-[var(--color-teal-deep)] lg:text-2xl">
                A few details help us match the right caregiver.
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-teal-deep)]/80">
                Have these ready and the SAHAYA team can check availability
                without a follow-up round of questions.
              </p>

              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  "Type of care — child or elder",
                  "Preferred date and start time",
                  "Duration — hours, daily, weekly or monthly",
                  "Your location in Hyderabad",
                  "Any special requirements or preferences",
                  "Preferred language, if you have one",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-[var(--color-teal-soft)]/20 pb-3 text-sm text-[var(--color-teal-deep)]/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-blush)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <WhatsAppCTA service="Family Care" label="Send your details" />
                <p className="text-xs leading-relaxed text-[var(--color-teal-soft)]">
                  {BRAND.scopeNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqAccordion />

      <PhotoCTA
        title="Ready to begin?"
        sub="One message is all it takes. We'll check availability and come back to you the same day."
        ctaLabel="Request care on WhatsApp"
        service="Family Care"
        image="/images/hero-family.webp"
        overlay="rgba(14,37,38,0.82)"
      />
    </>
  );
}
