import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/content";
import { icon } from "@/components/shared/icons";
import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

/**
 * The full seven-step process.
 *
 * Seven items do not divide evenly into any sensible grid, so the last
 * cell is a call to action rather than an orphaned step — four columns
 * across two rows, balanced, with the action landing exactly where a
 * reader finishes the sequence.
 */
export default function ProcessSteps() {
  return (
    <section
      className="dark-seam bg-[var(--color-teal-deep)]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
              The process
            </p>
            <h2 id="process-heading" className="t-h2 text-white">
              From request to{" "}
              <span className="text-[var(--color-teal-soft)]">
                care completed.
              </span>
            </h2>
          </div>
          <p className="t-measure text-[0.9375rem] leading-relaxed text-white/50 lg:max-w-xs lg:text-right">
            Seven steps, no paperwork, no waiting rooms. One message starts it
            all.
          </p>
        </div>

        <Reveal delay={0.08}>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = icon(step.icon);
              return (
                <li key={step.n}>
                  <div className="card-night group relative h-full overflow-hidden p-6">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[4.5rem] font-bold leading-none text-white/[0.05]"
                    >
                      {step.n}
                    </span>

                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-teal-soft)]/18 text-[var(--color-teal-light)] transition-colors duration-300 group-hover:bg-[var(--color-teal-soft)]/28"
                      >
                        <Icon size={18} />
                      </span>
                      <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[var(--color-blush)]">
                        Step {step.n}
                      </p>
                      <h3 className="mt-1.5 font-display text-base font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* Eighth cell — the action, where the sequence ends. */}
            <li className="sm:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col justify-center rounded-[1.5rem] border border-[var(--color-teal-soft)]/30 bg-[var(--color-teal-soft)]/10 p-6">
                <p className="font-display text-base font-bold text-white">
                  Ready when you are.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Availability is confirmed by the SAHAYA team after you send
                  your request.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <WhatsAppCTA
                    service="Family Care"
                    label="Request care"
                    variant="blush"
                    className="btn-sm"
                  />
                  <Link
                    href="/pricing"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal-light)] hover:text-white"
                  >
                    See pricing
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
