"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Line {
  text: string;
  /** Render this line in the soft-teal accent. */
  accent?: boolean;
}

interface Props {
  eyebrow: string;
  /** One entry per visual line. Joined with spaces for the aria-label. */
  lines: Line[];
  sub?: string;
  image: string;
  /** Background position, e.g. "center 30%". */
  imagePosition?: string;
  /** Height class. Inner pages default to a shorter hero than home. */
  heightClass?: string;
  /** The darkest corner the scrim fades from. */
  scrimFrom?: string;
  children?: ReactNode;
  /** Rendered to the right of the copy on large screens. */
  aside?: ReactNode;
}

/**
 * Shared cinematic page hero.
 *
 * This was previously copy-pasted into four route files — child care,
 * elder care, how it works and about — as a ~90-line `Hero()` function.
 * Each copy had drifted, and all four shared the same defects:
 *
 *  - Headlines were built from one <span> per word, with no whitespace
 *    between them, relying on `mr-[0.2em]` for the visual gap. Screen
 *    readers announced "Yourchild is safe." and the text could not be
 *    selected or translated as a sentence.
 *  - `min-h-screen` on inner pages pushed the actual content below the
 *    fold on laptops.
 *  - The Ken Burns and parallax tweens had no reduced-motion guard, and
 *    the copy started at `opacity: 0` with nothing to reveal it if the
 *    bundle failed.
 *
 * One implementation now serves every page.
 */
export default function PageHero({
  eyebrow,
  lines,
  sub,
  image,
  imagePosition = "center 30%",
  heightClass = "min-h-[68svh]",
  scrimFrom = "var(--color-teal-ink)",
  children,
  aside,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.07 },
        { scale: 1, duration: 8, ease: "power1.out" }
      );

      gsap.to(bgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".ph-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".ph-line",
          { yPercent: 108 },
          { yPercent: 0, duration: 0.8, stagger: 0.08 },
          "-=0.15"
        )
        .fromTo(
          ".ph-fade",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 },
          "-=0.45"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const accessibleTitle = lines.map((l) => l.text).join(" ");

  /**
   * Build a translucent tint of the scrim colour.
   *
   * Do NOT append an alpha suffix to `scrimFrom` directly — the default
   * is `var(--color-teal-ink)`, and `var(--color-teal-ink)` + `"b3"`
   * produces the invalid value `var(--color-teal-ink)b3`. The browser
   * drops the whole declaration, so the gradient silently disappears
   * and the copy ends up sitting on bare photograph. `color-mix` is
   * valid for both a `var()` and a literal hex.
   */
  const tint = (pct: number) =>
    `color-mix(in srgb, ${scrimFrom} ${pct}%, transparent)`;

  return (
    <section
      ref={sectionRef}
      className={`relative isolate flex items-center overflow-hidden pt-[var(--header-h)] ${heightClass}`}
    >
      {/* The hero photo is the LCP element on every inner page, but it
          is applied as a CSS background, so the browser cannot discover
          it until the stylesheet has parsed. Preloading starts the fetch
          immediately. React 19 hoists this into <head>. */}
      <link rel="preload" as="image" href={image} fetchPriority="high" />

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover will-change-transform"
          style={{ backgroundImage: `url('${image}')`, backgroundPosition: imagePosition }}
        />

        {/* Small screens: the copy spans the full width, so only a
            vertical wash actually carries contrast. */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(to bottom, ${tint(72)} 0%, ${tint(90)} 26%, ${tint(90)} 74%, ${tint(72)} 100%)`,
          }}
        />

        {/* Wide screens: the copy sits in a column on the left, so the
            scrim is directional — the photograph stays open on the right. */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `linear-gradient(to right, ${tint(95)}, ${tint(55)} 48%, transparent)`,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: `linear-gradient(to top, ${tint(100)}, transparent)` }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-12">
        <div
          className={
            aside
              ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
              : ""
          }
        >
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            <p className="ph-eyebrow eyebrow mb-6 text-[var(--color-teal-light)]">
              {eyebrow}
            </p>

            <h1 className="t-display text-white" aria-label={accessibleTitle}>
              <span aria-hidden="true">
                {lines.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <span
                      className={`ph-line block ${
                        line.accent ? "text-[var(--color-teal-soft)]" : ""
                      }`}
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            {sub && (
              <p className="ph-fade t-lead mt-7 max-w-[48ch] text-white/75">
                {sub}
              </p>
            )}

            {children && (
              <div className="ph-fade mt-9 flex flex-wrap items-center gap-3">
                {children}
              </div>
            )}
          </div>

          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
