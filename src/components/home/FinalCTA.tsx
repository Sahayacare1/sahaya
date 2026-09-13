"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, BadgeCheck, MapPin } from "lucide-react";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

gsap.registerPlugin(ScrollTrigger);

const reassurance = [
  { icon: ShieldCheck, label: "ID verified" },
  { icon: BadgeCheck, label: "Background checked" },
  { icon: MapPin, label: "Hyderabad" },
];

/**
 * Closing call to action.
 *
 * Fixes:
 *  - The headline repeated the hero almost word for word
 *    ("I can't be there. SAHAYA can." vs "When you can't be there,
 *    SAHAYA can."), so the final screen spent its impact restating the
 *    first. It now asks for the action instead.
 *  - The first line was set in `#C8DEDD` at 50% opacity on teal —
 *    roughly 2.4:1, well under the 4.5:1 minimum. The whole headline
 *    is now full-contrast.
 *  - The headline was eight separate word spans, which is what the
 *    browser, screen readers and text selection all had to cope with.
 *    One aria-label plus masked visual lines replaces it.
 *  - There was no reassurance at the point of highest intent. The three
 *    badges answer the last objection before the click.
 */
export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".cta-line",
        { yPercent: 105 },
        { yPercent: 0, duration: 0.8, stagger: 0.08 }
      )
        .fromTo(
          ".cta-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-teal)] py-24 lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden="true"
        className="blob -left-32 -top-32 h-96 w-96 bg-[var(--color-teal-soft)]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="blob -bottom-40 right-0 h-80 w-80 bg-[var(--color-teal-ink)]/45 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="cta-fade eyebrow eyebrow-flush mb-6 justify-center text-[var(--color-teal-light)]">
          Get started
        </p>

        <h2
          id="final-cta-heading"
          className="t-display text-white"
          aria-label="Let's find the right caregiver for your family."
        >
          <span aria-hidden="true">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="cta-line block">Let&rsquo;s find the right</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="cta-line block">caregiver for</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="cta-line block text-[var(--color-blush)]">
                your family.
              </span>
            </span>
          </span>
        </h2>

        <p className="cta-fade t-lead mx-auto mt-7 max-w-[44ch] text-white/80">
          Tell us what you need on WhatsApp. We&rsquo;ll come back the same day
          with a caregiver match.
        </p>

        <div className="cta-fade mt-10">
          <WhatsAppCTA
            service="Family Care"
            label="Request care on WhatsApp"
            variant="blush"
            className="btn-lg"
          />
        </div>

        {/* Last-objection handling, right where the decision happens. */}
        <ul className="cta-fade mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {reassurance.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-white/80"
            >
              <Icon
                size={15}
                className="text-[var(--color-teal-light)]"
                aria-hidden
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
