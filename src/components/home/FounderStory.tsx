"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function FounderStory() {
  const imgRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on the founder photo
      gsap.to(imgRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F8F6EF] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo */}
          <Reveal from="left">
            <div className="relative">
              {/* Main founder image */}
              <div
                ref={imgRef}
                className="relative rounded-[2rem] overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 shadow-[0_40px_80px_-20px_rgba(28,58,59,0.2)] will-change-transform"
              >
                <img
                  src="/images/founder.webp"
                  alt="SAHAYA founder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image not yet added
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8DEDD] via-[#EEF4F3] to-[#F2E4E3] -z-10" />
              </div>

              {/* Floating quote card */}
              <div
                className="absolute -bottom-6 -right-4 lg:right-0 max-w-[260px] rounded-2xl p-5 shadow-[0_16px_40px_-12px_rgba(28,58,59,0.18)] bg-white border border-[#C8DEDD]/40"
              >
                <Quote size={18} className="text-[#D9A5A3] mb-2" strokeWidth={1.5} />
                <p className="text-[#1C3A3B] text-sm leading-relaxed font-medium">
                  "I built SAHAYA because I lived this worry myself."
                </p>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <Reveal from="right">
            <p className="eyebrow mb-5">From the Founder</p>

            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1C3A3B] leading-[1.05] mb-8">
              Built from a real<br />
              <span className="text-[#285A5C]">family need.</span>
            </h2>

            <div className="space-y-5 text-[#6B8A8B] text-base leading-relaxed">
              <p>
                When my grandmother needed daily support and none of us could be there, we spent weeks trying to find someone trustworthy. There was no reliable way to find a verified caregiver, no updates during the day, and no peace of mind.
              </p>
              <p>
                That experience stayed with me. I knew there had to be a better way — one that gave families the same confidence I wished we'd had.
              </p>
              <p>
                SAHAYA was built for every family navigating that same worry. Whether it's a child at home while you're at work, or a parent who needs company while you're in another city — you deserve to feel at peace.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-[#D9A5A3]" />
              <div>
                <p className="font-display font-bold text-[#1C3A3B] text-base">Varun Reddy</p>
                <p className="text-xs text-[#7FA7A2] uppercase tracking-widest mt-0.5">Founder, SAHAYA</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
