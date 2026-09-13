"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

interface Props {
  /** Show the full section with heading, or just the accordion. */
  withHeading?: boolean;
  /** Limit to the first N questions (the home page shows a subset). */
  limit?: number;
}

/**
 * FAQ accordion.
 *
 * Extracted from the About page so the pricing and process pages can
 * reuse it. Each row is a real button with `aria-expanded` /
 * `aria-controls`, and the panel animates with `grid-template-rows:
 * 0fr -> 1fr`, which resolves to the content's actual height. The
 * previous implementation animated `max-height: 0 -> 10rem`, which
 * silently clipped any answer longer than 160px.
 */
export default function FaqAccordion({
  withHeading = true,
  limit,
}: Props) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  const accordion = (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-btn-${i}`;
        return (
          <div key={faq.q} className="card overflow-hidden !rounded-2xl">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[0.9375rem] font-semibold text-[var(--color-teal-deep)] transition-colors hover:bg-[var(--color-teal-wash)]"
              >
                {faq.q}
                <ChevronDown
                  size={17}
                  aria-hidden
                  className={`shrink-0 text-[var(--color-teal)] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (!withHeading) return accordion;

  return (
    <section className="section bg-[var(--color-ivory)]" id="faq">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="t-h2 mb-12 text-[var(--color-teal-deep)]">
            Common questions.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>{accordion}</Reveal>
      </div>
    </section>
  );
}
