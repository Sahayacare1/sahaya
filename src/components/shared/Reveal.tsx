"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface Props {
  children: ReactNode;
  /** Rendered wrapper element. Defaults to a plain div. */
  as?: ElementType;
  className?: string;
  /** Seconds of delay after the trigger fires. */
  delay?: number;
  /** Travel distance in px for directional reveals. */
  y?: number;
  x?: number;
  from?: Direction;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Scroll-triggered entrance.
 *
 * A previous version of this component rendered `style={{ opacity: 0 }}`
 * and relied entirely on GSAP to make it visible again. If the bundle
 * failed to load, hydration errored, or a ScrollTrigger never fired, the
 * content was invisible *forever* — the single highest-impact bug in the
 * build. Four independent escape hatches now guarantee visibility:
 *
 *   1. `no-js` on <html> reveals it before any script runs at all.
 *   2. `prefers-reduced-motion` reveals it in pure CSS.
 *   3. The inline timer in `layout.tsx` reveals it if JS runs but React
 *      never hydrates (this component sets `__sahayaHydrated` so that
 *      fallback knows to stand down when hydration did succeed).
 *   4. The watchdog below reveals it if React hydrates but the
 *      ScrollTrigger never fires.
 */
const FALLBACK_MS = 2600;

declare global {
  interface Window {
    /** Set once React has mounted. Read by the fallback in `layout.tsx`. */
    __sahayaHydrated?: boolean;
  }
}

/** Flags that React mounted, so the inline fallback stands down. */
function declareHydrated() {
  if (typeof window !== "undefined") window.__sahayaHydrated = true;
}

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 44,
  x,
  from = "up",
  stagger,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tell the inline fallback in `layout.tsx` that React hydrated, so
    // it does not force-reveal every element and flatten the animation.
    declareHydrated();

    // Respect the user's motion preference — never animate, never hide.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const travel: gsap.TweenVars =
      from === "left"  ? { opacity: 0, x: -(x ?? 64), y: 0 } :
      from === "right" ? { opacity: 0, x:  (x ?? 64), y: 0 } :
      from === "scale" ? { opacity: 0, scale: 0.94, y: 0 } :
      from === "down"  ? { opacity: 0, y: -y } :
      from === "none"  ? { opacity: 0 } :
                         { opacity: 0, y };

    const targets = stagger ? Array.from(el.children) : el;
    if (!targets || (Array.isArray(targets) && targets.length === 0)) {
      el.style.opacity = "1";
      return;
    }
    if (stagger) gsap.set(el, { opacity: 1 });

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, travel, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        // Animate the element's own style so the watchdog below can
        // verify a real inline opacity rather than a tween's target.
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, el);

    // --- Watchdog ---------------------------------------------------
    // If the ScrollTrigger never fires (element measured off-screen, a
    // refresh raced the fonts, GSAP failed to register the plugin), the
    // content would stay invisible indefinitely. This guarantees it
    // becomes visible within a bounded time no matter what.
    const watchdog = window.setTimeout(() => {
      const stillHidden = stagger
        ? Array.from(el.children).some(
            (child) => getComputedStyle(child).opacity === "0"
          )
        : getComputedStyle(el).opacity === "0";

      if (stillHidden) {
        el.style.opacity = "1";
        el.style.transform = "none";
        Array.from(el.children).forEach((child) => {
          (child as HTMLElement).style.opacity = "1";
          (child as HTMLElement).style.transform = "none";
        });
      }
    }, FALLBACK_MS);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
    };
  }, [delay, y, x, from, stagger, start]);

  return (
    <Tag
      ref={ref}
      className={`js-reveal ${className}`}
      style={{ opacity: 0, willChange: "opacity, transform" }}
    >
      {children}
    </Tag>
  );
}
