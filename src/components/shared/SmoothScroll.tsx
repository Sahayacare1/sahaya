"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling, driven by the GSAP ticker.
 *
 * Fixes over the original:
 *  - `ScrollTrigger.scrollerProxy` is unnecessary for a window-based
 *    Lenis, but `ScrollTrigger.refresh()` on resize IS: pinned sections
 *    and sticky offsets were measured once at mount and never
 *    re-measured, so the day-story pin drifted after a resize.
 *  - `html.lenis-active` suppresses the native scrollbar, which sat on
 *    top of the layout and caused a horizontal jump when a page grew
 *    tall enough to scroll.
 *  - Lenis is not created at all when the user prefers reduced motion;
 *    hijacking the scroll is exactly what that preference opts out of.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("lenis-active");

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      autoResize: true,
      // In-page anchors ("See a typical day" on the service pages, and
      // the skip link) would otherwise hard-jump natively, which reads
      // as broken on a site that smooth-scrolls everywhere else. The
      // negative offset clears the fixed navbar so the target heading
      // is not hidden underneath it.
      anchors: { offset: -80 },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger measures the document; re-measure once the web
    // fonts and above-the-fold photos have settled.
    const refresh = () => ScrollTrigger.refresh();
    const settle = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-active");
    };
  }, []);

  return null;
}
