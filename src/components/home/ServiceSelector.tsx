"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  href: string;
  image: string;
  alt: string;
  chip: string;
  chipClass: string;
  title: string;
  titleAccent: string;
  desc: string;
  tags: string[];
  /** Colour the curtain wipes away to. */
  curtain: string;
}

const services: Service[] = [
  {
    href: "/child-care",
    image: "/images/child-care.webp",
    alt: "A SAHAYA caregiver doing a craft activity with a young child at a table",
    chip: "Child care",
    chipClass: "chip-teal",
    title: "Your child is safe.",
    titleAccent: "You can focus.",
    desc: "Supervision, meals, homework and play — a trusted hand at home for working parents.",
    tags: ["Full-day care", "Homework", "Meals", "Activities"],
    curtain: "var(--color-teal)",
  },
  {
    href: "/elder-care",
    image: "/images/elder-care.webp",
    alt: "A SAHAYA caregiver walking in a garden with an elderly grandfather",
    chip: "Elder care",
    chipClass: "chip-blush",
    title: "Warm company,",
    titleAccent: "every day.",
    desc: "Companionship, medication reminders, meals and mobility support — so your parents are never alone.",
    tags: ["Companionship", "Meals", "Medication"],
    curtain: "var(--color-blush-dark)",
  },
];

/**
 * Full-bleed service cards.
 *
 * The brief called for a "curtain wipe reveal". The original had no
 * wipe at all — just a fade-and-slide — so the effect is built here: a
 * coloured panel covers each card and sweeps away on scroll, with the
 * photo settling out of an overscale behind it.
 *
 * Also fixed:
 *  - A scroll-scrubbed GSAP tween wrote `scale` on the <img> while a
 *    GSAP mouseenter tween wrote `scale` on the same element, so the
 *    hover zoom was overwritten on every scroll tick. The overscale
 *    settle now runs once on enter, and hover lives on the wrapper.
 *  - The Elder Care card used a maroon gradient (`#2a1010`) that is
 *    not part of the palette. Both cards use teal-ink now.
 *  - The card had no visible keyboard focus treatment.
 *  - `min-h-[520px]` made the cards taller than most phone viewports.
 */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });

      // Curtain sweeps up and away, revealing the photo underneath.
      tl.fromTo(
        curtainRef.current,
        { yPercent: 0 },
        { yPercent: -101, duration: 1, ease: "power4.inOut" }
      )
        // Photo settles out of a slight overscale as the curtain clears.
        .fromTo(
          mediaRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.85"
        )
        .fromTo(
          card.querySelectorAll(".sc-anim"),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.7"
        );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={service.href}
      className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] shadow-[0_28px_60px_-28px_rgba(14,37,38,0.45)] outline-offset-4 lg:min-h-[32rem]"
    >
      {/* ── Photo ── */}
      {/* Hover zoom lives on this wrapper; GSAP owns the inner <img>. */}
      <div
        ref={mediaRef}
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      >
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Scrim ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)] via-[var(--color-teal-ink)]/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15 transition-[box-shadow] duration-500 group-hover:ring-white/35"
      />

      {/* ── Content ── */}
      <div className="relative z-10 p-7 sm:p-9 lg:p-10">
        <span className={`sc-anim chip mb-5 ${service.chipClass}`}>
          {service.chip}
        </span>

        <h3 className="sc-anim t-h2 text-white">
          {service.title}
          <br />
          <span className="text-white/70">{service.titleAccent}</span>
        </h3>

        <p className="sc-anim mt-4 max-w-[38ch] text-sm leading-relaxed text-white/70">
          {service.desc}
        </p>

        <div className="sc-anim mt-7 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-sm"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-teal)] shadow-lg transition-[transform,background-color,color] duration-300 group-hover:translate-x-1.5 group-hover:bg-[var(--color-blush)] group-hover:text-[var(--color-teal-deep)]"
          >
            <ArrowRight size={18} />
          </span>
        </div>
      </div>

      {/* ── Curtain (above everything, wipes away on enter) ── */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 flex items-end p-8"
        style={{ background: service.curtain }}
      >
        <span className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
          {String(index + 1).padStart(2, "0")} — {service.chip}
        </span>
      </div>
    </Link>
  );
}

export default function ServiceSelector() {
  return (
    <section className="section bg-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Our services</p>
            <h2 className="t-h2 text-[var(--color-teal-deep)]">
              Care for every stage of family life.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-lead t-measure text-[var(--color-teal-soft)] lg:ml-auto lg:text-right">
              Whether it&rsquo;s your child or your parent, SAHAYA brings trusted,
              verified care directly to your home.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.href} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
