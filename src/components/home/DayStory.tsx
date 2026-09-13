"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sunrise,
  BookOpen,
  UtensilsCrossed,
  Coffee,
  Sunset,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  src: string;
  alt: string;
  time: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

const scenes: Scene[] = [
  {
    src: "/images/story-dropoff.webp",
    alt: "A parent handing their child over to a smiling SAHAYA caregiver at the door",
    time: "8:00 AM",
    icon: Sunrise,
    title: "The morning handover",
    body: "You hand your little one to a verified SAHAYA caregiver — with a smile, not a worry.",
  },
  {
    src: "/images/child-hero.webp",
    alt: "A caregiver and a young child doing a craft activity together at a table",
    time: "10:00 AM",
    icon: BookOpen,
    title: "Learning through play",
    body: "Reading, homework and creative play keep young minds happy and engaged all morning.",
  },
  {
    src: "/images/story-lunch.webp",
    alt: "A freshly cooked meal being served to a child at the family table",
    time: "1:00 PM",
    icon: UtensilsCrossed,
    title: "A warm meal, on time",
    body: "Nutritious food prepared and served — because full tummies make happy afternoons.",
  },
  {
    src: "/images/elder-day.webp",
    alt: "A SAHAYA caregiver sharing tea and conversation with an elderly grandmother",
    time: "4:00 PM",
    icon: Coffee,
    title: "And for the grandparents…",
    body: "Companionship, tea and gentle care for the elders of the house, too.",
  },
  {
    src: "/images/story-pickup.webp",
    alt: "A parent returning home to a happy child at the end of the day",
    time: "6:00 PM",
    icon: Sunset,
    title: "Reunited, happy",
    body: "You come home to a child who has been loved all day — with a full report of the fun.",
  },
];

/**
 * "A Day With SAHAYA" — sticky photo panel with scrolling scenes.
 *
 * The sticky column was genuinely inert. `html` and `body` both carried
 * `overflow-x: hidden`, which makes the other axis compute to `auto` and
 * turns the element into a scroll container. A scroll container between
 * a sticky element and the viewport breaks `position: sticky`, so the
 * photo panel never travelled. `globals.css` now uses `overflow-x: clip`,
 * which clips without establishing a scroll container.
 *
 * Also fixed:
 *  - The sticky offset was hard-coded to 72px while the compact navbar
 *    is 60px, so the panel sat 12px too low and clipped under the bar.
 *  - The panel height was an unclamped `100dvh - 136px`, which pushed
 *    the last scene card out of reach on short laptop screens.
 *  - Active-state colours were recomputed as inline styles on every
 *    render. They are CSS-driven now, so transitions actually run.
 *  - Cards started at `opacity: 0` with no reduced-motion escape.
 */
export default function DayStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        // Entrance for each scene card.
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
      }

      // Photo swap + active highlight. Kept on ScrollTrigger (not
      // IntersectionObserver) so it stays in sync with Lenis.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 58%",
          end: "bottom 58%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--color-teal-ink)]">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-6 lg:px-12 lg:pt-28">
        <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
          A day with SAHAYA
        </p>
        <h2 className="t-h2 max-w-2xl text-white">
          From morning handover to evening{" "}
          <span className="text-[var(--color-teal-soft)]">smiles.</span>
        </h2>
      </div>

      {/* ── Split layout ── */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-24 pt-12 sm:px-6 lg:flex-row lg:gap-14 lg:px-12 lg:pb-32 lg:pt-16">
        {/* ── Sticky photo panel (desktop) ── */}
        <div className="hidden lg:block lg:w-[46%] lg:shrink-0">
          <div
            className="sticky overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)]"
            style={{
              top: "calc(var(--nav-h-compact) + 1.5rem)",
              // Clamped so the panel never grows past a comfortable
              // height on a tall monitor, nor overflows a short laptop.
              height: "min(calc(100dvh - 6.75rem), 44rem)",
            }}
          >
            {scenes.map((scene, i) => (
              <img
                key={scene.src}
                src={scene.src}
                alt={scene.alt}
                // Every scene is lazy, including the first. The panel
                // sits ~1900px down the page, so nothing here is the
                // LCP element — and marking scene 1 `eager` made Next.js
                // emit a preload for it, which competed for bandwidth
                // with the actual hero photo and pushed out LCP.
                loading="lazy"
                decoding="async"
                aria-hidden={i !== active}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}

            {/* Scrim + caption for the active scene */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)]/85 via-transparent to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-blush)]">
                  {scenes[active].time}
                </p>
                <p className="mt-1.5 font-display text-xl font-bold text-white">
                  {scenes[active].title}
                </p>
              </div>

              {/* Progress rail — replaces the ambiguous "01 / 05". */}
              <div className="flex shrink-0 gap-1.5 pb-1" aria-hidden="true">
                {scenes.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-6 bg-[var(--color-blush)]"
                        : "w-1.5 bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrolling scenes ── */}
        <ol className="flex flex-1 flex-col gap-4 lg:gap-5 lg:pt-2">
          {scenes.map((scene, i) => {
            const Icon = scene.icon;
            const isActive = active === i;
            return (
              <li key={scene.src}>
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`js-reveal overflow-hidden rounded-[1.5rem] border transition-colors duration-500 ${
                    isActive
                      ? "border-[var(--color-teal-soft)]/45 bg-white/[0.07]"
                      : "border-white/[0.07] bg-white/[0.03]"
                  }`}
                >
                  {/* Photo on mobile, where there is no sticky panel. */}
                  <div className="relative h-44 w-full overflow-hidden lg:hidden">
                    <img
                      src={scene.src}
                      alt={scene.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)] to-transparent"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                          isActive
                            ? "bg-[var(--color-blush)]/25 text-[var(--color-blush)]"
                            : "bg-white/[0.07] text-[var(--color-teal-soft)]"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-teal-soft)]">
                        {scene.time}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-white/10"
                      />
                      <span className="font-mono text-xs tabular-nums text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="t-h3 mb-2 text-white">{scene.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-white/55">
                      {scene.body}
                    </p>

                    {/* Active underline */}
                    <div
                      aria-hidden="true"
                      className="mt-5 h-0.5 rounded-full bg-[var(--color-blush)] transition-[width] duration-700 ease-out"
                      style={{ width: isActive ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
