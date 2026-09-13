"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BEFORE = [
  "Leaving for work with a knot in your stomach",
  "Calling home every hour to check",
  "Distracted in meetings, worried about mum",
  "Rushing home early just to be sure",
  "Lying awake wondering if they're okay",
];

const AFTER = [
  "Leaving home knowing care is in safe hands",
  "Getting a care update at 10 AM",
  "Focused at work, fully present",
  "Coming home to a happy child or parent",
  "Sleeping soundly. They're okay.",
];

export default function BeforeAfter() {
  const sectionRef  = useRef<HTMLElement>(null);
  const beforeRef   = useRef<HTMLDivElement>(null);
  const afterRef    = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<"before" | "after" | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panels slide in from sides
      gsap.fromTo(beforeRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(afterRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" } }
      );
      // Divider line draws down
      gsap.fromTo(dividerRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" } }
      );
      // List items stagger in
      gsap.fromTo(".ba-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a1a1b] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-4 !text-[#7FA7A2]">The SAHAYA difference</p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold text-white leading-[1.05]">
            Life without SAHAYA.<br />
            <span className="text-[#7FA7A2]">Life with SAHAYA.</span>
          </h2>
        </div>

        {/* Split panels */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Divider — desktop only */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"
          />

          {/* BEFORE */}
          <div
            ref={beforeRef}
            className="opacity-0 relative rounded-[2rem] lg:rounded-r-none lg:rounded-l-[2rem] overflow-hidden"
            onMouseEnter={() => setActive("before")}
            onMouseLeave={() => setActive(null)}
          >
            {/* Photo */}
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <img
                src="/images/before-care.webp"
                alt="Worried parent before SAHAYA"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: active === "before" ? "scale(1.04)" : "scale(1)" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#2d1b1b] -z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1b] via-[#0a1a1b]/20 to-transparent" />
              {/* Label */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-sm text-white/60 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-400/70" />
                  Without SAHAYA
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="p-8 lg:p-10 space-y-4">
              {BEFORE.map((item, i) => (
                <div key={i} className="ba-item opacity-0 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-red-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                  </span>
                  <p className="text-white/45 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER */}
          <div
            ref={afterRef}
            className="opacity-0 relative rounded-[2rem] lg:rounded-l-none lg:rounded-r-[2rem] overflow-hidden border border-[#285A5C]/30"
            onMouseEnter={() => setActive("after")}
            onMouseLeave={() => setActive(null)}
          >
            {/* Photo */}
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <img
                src="/images/after-care.webp"
                alt="Relaxed parent with SAHAYA"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: active === "after" ? "scale(1.04)" : "scale(1)" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e2829] to-[#1a3a2a] -z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1b] via-[#0a1a1b]/20 to-transparent" />
              {/* Label */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#285A5C]/40 backdrop-blur-sm text-[#7FA7A2] border border-[#285A5C]/40">
                  <span className="w-2 h-2 rounded-full bg-[#7FA7A2]" />
                  With SAHAYA
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="p-8 lg:p-10 space-y-4">
              {AFTER.map((item, i) => (
                <div key={i} className="ba-item opacity-0 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#285A5C]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#7FA7A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-14 text-center">
          <p className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold text-white/20">
            The difference is{" "}
            <span className="text-[#7FA7A2]">one message.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
