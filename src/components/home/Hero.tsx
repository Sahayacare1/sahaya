"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck } from "lucide-react";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

gsap.registerPlugin(ScrollTrigger);

const careLog = [
  { time: "09:02", label: "Caregiver arrived", done: true },
  { time: "09:45", label: "Breakfast served", done: true },
  { time: "10:30", label: "Morning walk", done: true },
  { time: "12:30", label: "Medication reminder", done: true },
  { time: "13:15", label: "Lunch completed", done: true },
  { time: "15:00", label: "Care completed", done: false },
];

/**
 * Home hero.
 *
 * Rebuilt from the ground up. The previous version had:
 *  - A headline assembled from 8 separate word spans with no real
 *    spaces, so it read as gibberish to screen readers and could not
 *    be selected or wrapped naturally.
 *  - `min-h-screen` + `pt-[72px]`, which guaranteed overflow on short
 *    viewports.
 *  - Three competing photos (full-bleed background plus two floating
 *    cards) showing near-identical subject matter.
 *  - A bottom fade to ivory that ran straight into a dark band.
 *  - A pulsing "Live" badge on what is actually a sample report —
 *    a trust risk for a brand whose entire pitch is verification.
 *
 * The composition is now bottom-anchored so the copy sits over the
 * low-detail foreground of the photo while every face stays clear,
 * and the right column carries a single focal element.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // --- Background: slow Ken Burns settle ---
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 9, ease: "power1.out" }
      );

      // --- Background: parallax drift ---
      gsap.to(bgRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // --- Copy: masked line reveal ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          ".hero-line",
          { yPercent: 108 },
          { yPercent: 0, duration: 0.85, stagger: 0.09 },
          "-=0.15"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.35"
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.5"
        )
        .fromTo(
          ".hero-log-row",
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
          "-=0.35"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[var(--header-h)]"
    >
      {/* The hero photo is the LCP element, but it is applied as a CSS
          background — so the browser only discovers it after the
          stylesheet has parsed and the element has been styled, which
          pushes the fetch to the back of the queue. Preloading it
          starts the download immediately, in parallel with the CSS.
          React 19 hoists this into <head>. */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-background.webp"
        fetchPriority="high"
      />

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[url('/images/hero-background.webp')] bg-cover bg-[position:center_28%] will-change-transform"
        />
        {/* Vertical scrim: keeps every face clear at the top while
            giving the bottom-anchored copy a solid base. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)] via-[var(--color-teal-ink)]/55 to-transparent" />
        {/* Horizontal scrim: reinforces the text column only. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-teal-ink)]/80 via-[var(--color-teal-ink)]/25 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-6 lg:px-12 lg:pb-20">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: copy ── */}
          <div ref={copyRef} className="lg:col-span-7">
            <p className="hero-eyebrow eyebrow mb-5 text-[var(--color-teal-light)]">
              Child care &middot; Elder care &middot; Hyderabad
            </p>

            <h1
              className="t-display text-white"
              aria-label="When you can't be there, SAHAYA can."
            >
              {/* Visual line-masked text. The aria-label above carries the
                  real string so assistive tech reads one clean sentence. */}
              <span aria-hidden="true">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="hero-line block">When you can&rsquo;t</span>
                </span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="hero-line block">be there,</span>
                </span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="hero-line block text-[var(--color-teal-soft)]">
                    SAHAYA can.
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero-sub t-lead mt-7 max-w-[46ch] text-white/75">
              Verified caregivers for your children and your parents &mdash; so you
              can work, travel, and live without the worry.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="hero-cta">
                <WhatsAppCTA service="Family Care" label="Request Care" />
              </span>
              <Link href="/how-it-works" className="hero-cta btn btn-ghost">
                How It Works
                <ArrowRight size={15} className="btn-arrow" aria-hidden />
              </Link>
            </div>

            {/* Proof, placed at the moment of decision rather than
                several screens further down. */}
            <div className="hero-cta mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {["#d9a5a3", "#7fa7a2", "#c8dedd", "#b8827f"].map((c) => (
                    <span
                      key={c}
                      className="h-7 w-7 rounded-full border-2 border-white/70"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">500+ families</span> cared
                  for
                </p>
              </div>

              <p className="flex items-center gap-2 text-sm text-white/70">
                <ShieldCheck
                  size={16}
                  className="text-[var(--color-teal-light)]"
                  aria-hidden
                />
                <span className="font-semibold text-white">ID &amp; background</span>{" "}
                verified
              </p>
            </div>
          </div>

          {/* ── Right: care report ── */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div
              ref={cardRef}
              className="relative mx-auto w-full max-w-[24rem] rounded-[1.5rem] border border-white/60 bg-white/95 p-6 shadow-[0_32px_70px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-bold text-[var(--color-teal-deep)]">
                    Today&rsquo;s care log
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-teal-soft)]">
                    Shared with the family, as it happens
                  </p>
                </div>
                <span className="chip chip-teal shrink-0">Sample</span>
              </div>

              <ul className="space-y-2.5">
                {careLog.map((item, i) => (
                  <li key={i} className="hero-log-row flex items-center gap-3">
                    <span className="w-11 shrink-0 font-mono text-xs tabular-nums text-[var(--color-blush-dark)]">
                      {item.time}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        item.done
                          ? "bg-[var(--color-teal-soft)]"
                          : "bg-[var(--color-blush)]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        item.done
                          ? "text-[var(--color-teal-deep)]/75"
                          : "font-semibold text-[var(--color-teal)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-[var(--color-teal-soft)]/25 pt-4 text-xs leading-relaxed text-[var(--color-teal-soft)]">
                Every caregiver is ID-checked, background-verified and
                reference-vetted before they enter your home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
