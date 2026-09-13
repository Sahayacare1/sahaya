"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HOW_IT_WORKS_SHORT } from "@/lib/content";
import { icon } from "@/components/shared/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Condensed process preview for the home page.
 *
 * Reads from `HOW_IT_WORKS_SHORT` in the content layer, so the home page
 * and the full `/how-it-works` sequence cannot drift apart.
 *
 * Rebuilt from the original because:
 *  - It sat directly beneath the equally-dark DayStory section with no
 *    boundary, so the two read as one very long black slab. It now runs
 *    on a lighter teal surface with an explicit seam.
 *  - Four full-width rows with 380px images made the section enormous.
 *    A 2x2 grid carries the same content in half the height.
 *  - It reused the exact image set already on screen in DayStory.
 *  - The step numerals were set at 7rem in an 18%-opacity tint —
 *    effectively invisible, while still occupying layout space.
 */
export default function HowItWorksPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".hiw-card").forEach((card) => {
        const media = card.querySelector<HTMLElement>(".hiw-media");
        const content = card.querySelectorAll<HTMLElement>(".hiw-anim");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          media,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.inOut" }
        ).fromTo(
          content,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 },
          "-=0.6"
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dark-seam bg-[var(--color-teal-deep)]"
      aria-labelledby="hiw-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-12 lg:py-28">
        {/* ── Header ── */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
              How it works
            </p>
            <h2 id="hiw-heading" className="t-h2 text-white">
              Simple from{" "}
              <span className="text-[var(--color-teal-soft)]">
                start to finish.
              </span>
            </h2>
          </div>
          <p className="t-measure text-[0.9375rem] leading-relaxed text-white/50 lg:max-w-xs lg:text-right">
            From your first WhatsApp message to care completed — four steps,
            no paperwork, no waiting rooms.
          </p>
        </div>

        {/* ── Steps ── */}
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {HOW_IT_WORKS_SHORT.map(({ n, icon: iconName, title, body, tag, image, alt }) => {
            const Icon = icon(iconName);
            return (
              <li key={n}>
                <article className="hiw-card group card-night h-full overflow-hidden">
                  {/* Image with curtain reveal */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="hiw-media absolute inset-0"
                      style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                      <img
                        src={image}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-teal-deep)]/75 via-transparent to-transparent"
                    />
                    {/* Numeral, legible and doing real work as a marker. */}
                    <span className="absolute bottom-4 left-5 font-display text-3xl font-bold tabular-nums text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {n}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <div className="hiw-anim mb-3 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-teal-soft)]/20 text-[var(--color-teal-light)]"
                      >
                        <Icon size={17} />
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">
                        {title}
                      </h3>
                    </div>

                    <p className="hiw-anim text-[0.9375rem] leading-relaxed text-white/55">
                      {body}
                    </p>

                    <p className="hiw-anim mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-blush)]">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[var(--color-blush)]"
                      />
                      {tag}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        {/* ── CTA ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-9 sm:flex-row">
          <p className="text-center text-sm text-white/50 sm:text-left">
            Ready to get started? It takes under two minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/how-it-works" className="btn btn-ghost">
              See the full process
              <ArrowRight size={15} className="btn-arrow" aria-hidden />
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
