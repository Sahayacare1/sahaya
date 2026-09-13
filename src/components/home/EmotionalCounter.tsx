"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  { at: 2,   label: "Caregiver arrived on time" },
  { at: 18,  label: "Breakfast prepared and served" },
  { at: 45,  label: "Medication reminder given" },
  { at: 72,  label: "Morning walk completed" },
  { at: 105, label: "Lunch ready" },
  { at: 134, label: "She's comfortable. Resting now." },
];

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export default function EmotionalCounter() {
  const sectionRef  = useRef<HTMLElement>(null);
  const counterRef  = useRef<HTMLDivElement>(null);
  const closingRef  = useRef<HTMLParagraphElement>(null);
  const [elapsed, setElapsed]     = useState(0);
  const [started, setStarted]     = useState(false);
  const [visible, setVisible]     = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start counter when section enters viewport
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => setStarted(true),
      once: true,
    });
    return () => trigger.kill();
  }, []);

  // Tick every second once started
  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        // Reveal events as time passes
        EVENTS.forEach((ev, i) => {
          if (next >= ev.at) setVisible((v) => v.includes(i) ? v : [...v, i]);
        });
        // Stop at last event + a few seconds
        if (next >= EVENTS[EVENTS.length - 1].at + 6) {
          clearInterval(intervalRef.current!);
        }
        return next;
      });
    }, 80); // 80ms per tick = ~12x speed so it feels alive but not too fast

    return () => clearInterval(intervalRef.current!);
  }, [started]);

  // Animate closing line in after all events visible
  useEffect(() => {
    if (visible.length === EVENTS.length && closingRef.current) {
      gsap.fromTo(closingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
      );
    }
  }, [visible]);

  // Counter number entrance
  useEffect(() => {
    if (started && counterRef.current) {
      gsap.fromTo(counterRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" }
      );
    }
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a1a1b] py-28 overflow-hidden"
    >
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(40,90,92,0.18) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <p className="eyebrow mb-6 !text-[#7FA7A2]">Right now, while you're here</p>

        {/* Intro line */}
        <p className="text-white/50 text-lg mb-10 leading-relaxed">
          A family just like yours left their mother with a SAHAYA caregiver.<br />
          Here's what's happened since.
        </p>

        {/* Live counter */}
        <div ref={counterRef} className="mb-12 opacity-0">
          <p className="text-white/30 text-sm uppercase tracking-widest mb-2">She's been cared for</p>
          <p className="font-display font-bold text-white tabular-nums"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}>
            {formatTime(elapsed)}
          </p>
        </div>

        {/* Event feed */}
        <div className="text-left max-w-sm mx-auto space-y-3 mb-14">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: visible.includes(i) ? 1 : 0,
                transform: visible.includes(i) ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <CheckCircle2
                size={17}
                className="shrink-0"
                style={{ color: i === EVENTS.length - 1 ? "#D9A5A3" : "#7FA7A2" }}
              />
              <span className={`text-sm leading-relaxed ${i === EVENTS.length - 1 ? "text-white font-semibold" : "text-white/65"}`}>
                {ev.label}
              </span>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p
          ref={closingRef}
          className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white leading-tight opacity-0"
        >
          She's okay.<br />
          <span style={{ color: "#7FA7A2" }}>You can focus.</span>
          <br />
          <span className="text-white/30 text-lg font-normal mt-2 block">
            This is what SAHAYA does.
          </span>
        </p>

      </div>
    </section>
  );
}
