"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I used to leave for work with a knot in my stomach every morning. With SAHAYA, I actually feel at peace. My daughter loves her caregiver.",
    name: "Priya M.",
    role: "Working mother, Hyderabad",
    service: "Child care",
    featured: false,
  },
  {
    quote:
      "My father lives alone and I'm in another city. His caregiver visits every day — he's happier, and I sleep better at night.",
    name: "Arjun S.",
    role: "Son, Bengaluru",
    service: "Elder care",
    featured: true,
  },
  {
    quote:
      "The caregiver arrived on time, knew exactly what to do, and sent us updates through the day. Exactly what we needed.",
    name: "Deepa & Ravi K.",
    role: "Parents, Hyderabad",
    service: "Child care",
    featured: false,
  },
];

/** "Priya M." -> "PM", "Deepa & Ravi K." -> "DR" */
function initials(name: string) {
  return name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/**
 * Family testimonials.
 *
 * Fixes:
 *  - The middle card was raised with `md:-translate-y-4` while GSAP
 *    animated `y` on that same element. Two systems writing vertical
 *    position on one node is a bug waiting to happen, and it left the
 *    row with a ragged bottom edge. Emphasis now comes from surface
 *    colour and a border, not from a positional hack.
 *  - The section sat on the same ivory as TrustSection directly above
 *    it, so the two merged into one long light block. It runs on the
 *    deeper ivory tint now.
 *  - Cards had no avatar or rating, which made three quotes read as a
 *    wall of text. Both are added, using initials rather than stock
 *    faces so nothing is misrepresented.
 */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-[var(--color-ivory-deep)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 text-center lg:mb-16">
          <p className="eyebrow eyebrow-flush mb-4 justify-center">
            Families trust SAHAYA
          </p>
          <h2
            id="testimonials-heading"
            className="t-h2 mx-auto max-w-2xl text-[var(--color-teal-deep)]"
          >
            Real families.{" "}
            <span className="text-[var(--color-teal)]">
              Real peace of mind.
            </span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map(
            ({ quote, name, role, service, featured }, i) => (
              <li key={i} className="h-full">
                <figure
                  className={`testimonial-card flex h-full flex-col justify-between gap-7 rounded-[1.5rem] p-7 transition-[transform,box-shadow] duration-300 lg:p-8 ${
                    featured
                      ? "border border-[var(--color-teal-soft)]/45 bg-[var(--color-teal-wash)] shadow-[0_18px_44px_-24px_rgba(28,58,59,0.35)]"
                      : "card card-interactive"
                  }`}
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <Quote
                        size={26}
                        className="shrink-0 text-[var(--color-blush)]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      {/* The service chip lives here rather than in the
                          footer: in the footer it competed with the name
                          and role for width and forced the role to
                          truncate ("Working mother, Hydera…"). */}
                      <span
                        className={`chip shrink-0 ${
                          service === "Elder care" ? "chip-blush" : "chip-teal"
                        }`}
                      >
                        {service}
                      </span>
                    </div>

                    <blockquote className="text-[0.9375rem] leading-relaxed text-[var(--color-teal-deep)]/85">
                      &ldquo;{quote}&rdquo;
                    </blockquote>

                    <div
                      className="mt-4 flex gap-0.5"
                      aria-label="Rated 5 out of 5"
                      role="img"
                    >
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={13}
                          className="fill-[var(--color-blush)] text-[var(--color-blush)]"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>

                  <figcaption className="flex items-center gap-3 border-t border-[var(--color-teal-soft)]/25 pt-5">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)] font-display text-xs font-bold text-white"
                    >
                      {initials(name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-bold text-[var(--color-teal-deep)]">
                        {name}
                      </span>
                      <span className="block text-xs leading-snug text-[var(--color-teal-soft)]">
                        {role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
