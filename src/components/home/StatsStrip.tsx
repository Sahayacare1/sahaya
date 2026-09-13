"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stats must agree with the rest of the site. The previous set claimed
 * "3 Cities", while the FAQ on the About page states that SAHAYA serves
 * Hyderabad only — a direct contradiction that undermines the trust the
 * section exists to build. The figures now live in `lib/constants.ts`
 * with the rest of the shared copy so they cannot drift again.
 */
const stats = STATS;

/**
 * Counting stats band.
 *
 * Fixes:
 *  - The divider logic was `lg:border-l ... first:border-0`. On the
 *    2-column mobile grid that drew a stray left border down the middle
 *    of the block. A consistent accent rule per item replaces it, so
 *    the layout holds at every breakpoint.
 *  - `suffix: " Cities"` plus `label: "and growing"` rendered as the
 *    fragment "3 Cities / and growing". Value and suffix now form one
 *    number with a proper unit.
 *  - Counters animated with no reduced-motion guard, and the label
 *    carried the only accessible value while the number itself was
 *    written into the DOM by a tween.
 */
export default function StatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // With reduced motion, print the final values immediately.
    if (reduced) {
      stats.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (el) el.textContent = String(stat.value);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: "top 85%",
        once: true,
      } as const;

      stats.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: trigger,
          onUpdate: () => {
            el.textContent = String(Math.round(counter.val));
          },
        });
      });

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: trigger,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-teal-ink)] py-16 lg:py-20"
      aria-label="SAHAYA by the numbers"
    >
      {/* Soft depth, properly blurred and clipped by the section. */}
      <div
        aria-hidden="true"
        className="blob -left-24 -top-24 h-64 w-64 bg-[var(--color-teal)]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="blob -bottom-28 right-0 h-72 w-72 bg-[var(--color-blush)]/12 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {stats.map(({ suffix, label }, i) => (
            <div key={label} className="stat-item">
              {/* Accent rule instead of divider borders — behaves
                  identically at 2 columns and at 4. */}
              <span
                aria-hidden="true"
                className="mb-5 block h-px w-9 bg-[var(--color-blush)]/70"
              />
              <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none text-white">
                <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
                <span className="text-[var(--color-blush)]">{suffix}</span>
              </dd>
              <dt className="mt-2.5 text-sm font-medium tracking-wide text-[var(--color-teal-soft)]">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
