import type { Metadata } from "next";
import { Info, Check } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CarePlans from "@/components/shared/CarePlans";
import PricingTable from "@/components/shared/PricingTable";
import FaqAccordion from "@/components/shared/FaqAccordion";
import PhotoCTA from "@/components/shared/PhotoCTA";
import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { PRICING_NOTE, PRICING_NOTE_DETAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SAHAYA care pricing for Hyderabad — child care and elder care from 3 hours to monthly plans, in Standard Care and SAHAYA Live Care.",
  alternates: { canonical: "/pricing" },
};

/** What every plan includes, regardless of tier or duration. */
const INCLUDED = [
  "A caregiver selected through SAHAYA's onboarding process",
  "Care delivered according to your family's instructions",
  "Check-in and check-out recorded for each session",
  "A SAHAYA point of contact for coordination",
  "Replacement assistance if a caregiver becomes unavailable, subject to availability",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        lines={[
          { text: "Clear plans," },
          { text: "no hidden charges.", accent: true },
        ]}
        sub="Pay for the hours you need, in the plan that suits your family. Every session includes a caregiver selected through SAHAYA's onboarding process and a point of contact you can reach."
        image="/images/hero-family.webp"
        imagePosition="center 30%"
        scrimFrom="var(--color-teal-ink)"
      >
        <WhatsAppCTA service="Family Care" label="Ask about availability" />
        <a href="#pricing" className="btn btn-ghost">
          Jump to prices
        </a>
      </PageHero>

      {/* ── Plan tiers ── */}
      <CarePlans />

      {/* ── What every plan includes ── */}
      <section className="section-tight bg-[var(--color-teal-ink)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
              Included in every plan
            </p>
            <h2 className="t-h2 max-w-2xl text-white">
              Whatever you choose,{" "}
              <span className="text-[var(--color-teal-soft)]">
                these stay the same.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal-soft)]/20 text-[var(--color-teal-light)]"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-white/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Price tables ── */}
      <PricingTable />

      {/* ── How pricing works ── */}
      <section className="section-tight bg-[var(--color-ivory-deep)]">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-12">
          <Reveal>
            <div className="rounded-[1.75rem] border border-[var(--color-teal-soft)]/40 bg-white p-7 lg:p-9">
              <div className="flex items-start gap-3">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--color-blush-dark)]"
                  aria-hidden
                />
                <div>
                  <h2 className="font-display text-lg font-bold text-[var(--color-teal-deep)]">
                    Please read before you book
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-teal-deep)]/80">
                    {PRICING_NOTE}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-teal-deep)]/80">
                    {PRICING_NOTE_DETAIL}
                  </p>

                  <h3 className="mt-6 font-display text-base font-bold text-[var(--color-teal-deep)]">
                    How confirmation works
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-teal-deep)]/80">
                    A care request is not confirmed immediately. After you send
                    your details, the SAHAYA team checks caregiver availability
                    for your dates and requirements, then confirms with you on
                    WhatsApp.
                  </p>

                  <div className="mt-7">
                    <WhatsAppCTA
                      service="Family Care"
                      label="Check availability"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqAccordion limit={5} />

      <PhotoCTA
        title="Not sure which plan fits?"
        sub="Tell us your situation and we'll suggest the right care, duration and plan for your family."
        ctaLabel="Ask SAHAYA on WhatsApp"
        service="Family Care"
        image="/images/trust-caregiver.webp"
        overlay="rgba(14,37,38,0.82)"
      />
    </>
  );
}
