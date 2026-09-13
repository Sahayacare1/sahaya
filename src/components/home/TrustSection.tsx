"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, BadgeCheck, UserCheck, Phone, Check } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

gsap.registerPlugin(ScrollTrigger);

const checks = [
  {
    icon: ShieldCheck,
    title: "Government ID verified",
    body: "Every caregiver's identity is verified before they are placed with a family.",
  },
  {
    icon: BadgeCheck,
    title: "Background checked",
    body: "Police verification and reference checks are completed on every applicant.",
  },
  {
    icon: UserCheck,
    title: "Interviewed & assessed",
    body: "In-person interview plus a practical skills assessment before approval.",
  },
  {
    icon: Phone,
    title: "Emergency support",
    body: "A dedicated support line for families during care hours, every day.",
  },
];

/**
 * Safety & trust.
 *
 * Fixes:
 *  - The photo column and the 2x2 card grid were sized independently,
 *    so the two columns ended at different heights and the section read
 *    as ragged. The photo now stretches to the card grid's height.
 *  - The arch photo used `rounded-[inherit]` for its inner ring, which
 *    does not inherit a multi-corner radius — the ring rendered as a
 *    rectangle over an arch. The ring is gone; the shape is clean.
 *  - Cards were `text-xs` at 70% opacity, which is below the readable
 *    contrast floor on an ivory background.
 */
export default function TrustSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section bg-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* ── Header ── */}
        <div className="mb-12 lg:mb-16">
          <Reveal>
            <p className="eyebrow mb-4">Safety &amp; trust</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h2 max-w-3xl text-[var(--color-teal-deep)]">
              Trust isn&rsquo;t a feature.
              <br />
              <span className="text-[var(--color-teal)]">
                It&rsquo;s the foundation.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* ── Photo + verification grid ── */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Photo */}
          <Reveal from="left" className="lg:col-span-5">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[2rem] bg-[var(--color-teal-wash)] shadow-[0_28px_60px_-28px_rgba(28,58,59,0.4)]">
              <img
                src="/images/elder-hero.webp"
                alt="A SAHAYA caregiver holding the hands of an elderly grandmother, both smiling"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)]/80 via-transparent to-transparent"
              />

              {/* Proof badge, anchored on the photo. */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-md">
                  <p className="font-display text-lg font-bold text-white">
                    Every caregiver, vetted.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">
                    Six checks before anyone enters your home.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Verification items */}
          <div
            ref={gridRef}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
          >
            {checks.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="trust-item card card-interactive flex h-full flex-col p-6 sm:p-7"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="icon-badge">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)]"
                    aria-hidden="true"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[var(--color-teal-deep)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
