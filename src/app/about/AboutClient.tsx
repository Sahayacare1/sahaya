"use client";

import { Eye, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import TargetCustomers from "@/components/shared/TargetCustomers";
import FaqAccordion from "@/components/shared/FaqAccordion";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import FounderStory from "@/components/home/FounderStory";
import { BRAND } from "@/lib/constants";
import { ABOUT } from "@/lib/content";

export default function AboutClient() {
  return (
    <>
      <PageHero
        eyebrow="About SAHAYA"
        lines={[
          { text: "We exist because" },
          { text: "family matters.", accent: true },
        ]}
        sub={BRAND.heroSub}
        image="/images/hero-background.webp"
        imagePosition="center 32%"
        scrimFrom="var(--color-teal-ink)"
      />

      {/* Mission + Vision */}
      <section className="section bg-[var(--color-teal-ink)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">About SAHAYA</p>
              <div className="space-y-4">
                {ABOUT.about.map((paragraph) => (
                  <p key={paragraph} className="t-lead leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal from="right">
              <ul className="grid gap-4">
                <li className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-7">
                  <span aria-hidden="true" className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-teal-soft)]/18 text-[var(--color-teal-light)]">
                    <Target size={18} />
                  </span>
                  <h2 className="font-display text-lg font-bold text-white">Our mission</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/60">{ABOUT.mission}</p>
                </li>
                <li className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-7">
                  <span aria-hidden="true" className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-blush)]/20 text-[var(--color-blush)]">
                    <Eye size={18} />
                  </span>
                  <h2 className="font-display text-lg font-bold text-white">Our vision</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/60">{ABOUT.vision}</p>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <TargetCustomers />
      <FounderStory />
      <FaqAccordion />

      {/* CTA */}
      <section className="section bg-[var(--color-teal-ink)] text-center">
        <div className="mx-auto max-w-xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white mb-4 leading-tight">
              Ready to get started?
            </h2>
            <p className="text-white/50 text-base mb-8">One message is all it takes.</p>
            <WhatsAppCTA service="Family Care" label="Enquire on WhatsApp" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
