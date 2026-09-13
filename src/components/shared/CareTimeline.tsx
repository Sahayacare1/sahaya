"use client";

import { useState } from "react";
import { Check, Quote } from "lucide-react";
import { CARE_TIMELINE } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

type Variant = keyof typeof CARE_TIMELINE;

const TABS: { id: Variant; label: string }[] = [
  { id: "child", label: "Child care" },
  { id: "elder", label: "Elder care" },
];

/**
 * "Today's care" timeline.
 *
 * The client supplied two sample timelines and flagged this as a visual
 * demo for the home page. A tab toggle shows both without doubling the
 * section height — and because both timelines live in `CARE_TIMELINE`,
 * the two can never drift out of sync.
 *
 * Built as tabs rather than two stacked blocks so the section stays
 * scannable; the tablist follows the WAI-ARIA pattern with arrow-key
 * support and a roving tabindex.
 */
export default function CareTimeline() {
  const [active, setActive] = useState<Variant>("elder");
  const timeline = CARE_TIMELINE[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive(TABS[(i + 1) % TABS.length]!.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive(TABS[(i - 1 + TABS.length) % TABS.length]!.id);
    }
  };

  return (
    <section
      className="section bg-[var(--color-teal-ink)]"
      aria-labelledby="timeline-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
              A day with SAHAYA
            </p>
            <h2 id="timeline-heading" className="t-h2 text-white">
              What a care session{" "}
              <span className="text-[var(--color-teal-soft)]">
                actually looks like.
              </span>
            </h2>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Choose a care timeline"
              onKeyDown={onKeyDown}
              className="inline-flex rounded-full border border-white/12 bg-white/[0.04] p-1"
            >
              {TABS.map((tab) => {
                const selected = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tl-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`tl-panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors duration-200 ${
                      selected
                        ? "bg-[var(--color-blush)] text-[var(--color-teal-ink)]"
                        : "text-white/65 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            role="tabpanel"
            id={`tl-panel-${active}`}
            aria-labelledby={`tl-tab-${active}`}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8"
          >
            {/* Timeline */}
            <ol className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              {timeline.entries.map((entry, i) => {
                const last = i === timeline.entries.length - 1;
                return (
                  <li key={entry.time} className="relative flex gap-4 pb-6 last:pb-0">
                    {!last && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[0.9375rem] top-8 h-[calc(100%-2rem)] w-px bg-white/12"
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        entry.done
                          ? "border-[var(--color-teal-soft)]/45 bg-[var(--color-teal-soft)]/18 text-[var(--color-teal-light)]"
                          : "border-[var(--color-blush)]/50 bg-[var(--color-blush)]/20 text-[var(--color-blush)]"
                      }`}
                    >
                      {entry.done ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </span>

                    <div className="pt-1">
                      <p className="font-mono text-xs tabular-nums text-[var(--color-blush)]">
                        {entry.time}
                      </p>
                      <p
                        className={`mt-1 text-[0.9375rem] ${
                          entry.done
                            ? "text-white/80"
                            : "font-semibold text-white"
                        }`}
                      >
                        {entry.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Caregiver note */}
            <div className="flex flex-col gap-6">
              <figure className="flex flex-1 flex-col justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7">
                <Quote
                  size={26}
                  className="mb-5 text-[var(--color-blush)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <blockquote className="font-display text-lg font-semibold leading-relaxed text-white">
                  &ldquo;{timeline.note}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-teal-soft)]">
                  {timeline.noteLabel}
                </figcaption>
              </figure>

              <p className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-xs leading-relaxed text-white/50">
                This is an example of the updates a family receives during a
                care session. The exact format is confirmed by the SAHAYA team
                based on the plan you choose.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
