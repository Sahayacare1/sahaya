import { Check, Info } from "lucide-react";
import { CARE_PLANS } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

/**
 * Standard Care vs SAHAYA Live Care.
 *
 * The client explicitly has not decided how the monitoring feature will
 * work, and asked that no camera or streaming promise be made. Live Care
 * is therefore sold purely on visibility, update frequency and priority
 * coordination, with its `caveat` rendered as visible body copy rather
 * than hidden in a footnote.
 */
export default function CarePlans() {
  return (
    <section className="section bg-[var(--color-ivory-deep)]" id="plans">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow mb-4">Care options</p>
          <h2 className="t-h2 max-w-2xl text-[var(--color-teal-deep)]">
            Two ways to{" "}
            <span className="text-[var(--color-teal)]">stay close.</span>
          </h2>
          <p className="t-lead t-measure mt-5 text-[var(--color-teal-soft)]">
            Both plans include a verified caregiver. Live Care adds a higher
            level of visibility for families who want it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <ul className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            {CARE_PLANS.map((plan) => (
              <li key={plan.id} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[1.75rem] p-7 transition-[transform,box-shadow] duration-300 lg:p-9 ${
                    plan.highlighted
                      ? "border border-[var(--color-teal-soft)]/50 bg-[var(--color-teal-wash)] shadow-[0_22px_50px_-28px_rgba(28,58,59,0.4)]"
                      : "card card-interactive"
                  }`}
                >
                  <div className="mb-6">
                    {plan.highlighted && (
                      <span className="chip chip-teal mb-4">Most visibility</span>
                    )}
                    <h3 className="font-display text-2xl font-bold text-[var(--color-teal-deep)]">
                      {plan.name}
                    </h3>
                    <p className="mt-1 font-display text-sm font-semibold text-[var(--color-teal)]">
                      {plan.tagline}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-teal-soft)]">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)]/12 text-[var(--color-teal)]"
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-[var(--color-teal-deep)]/85">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* The client's qualifier. Kept as visible body copy,
                      not a footnote, and never replaced with a camera
                      or streaming claim. */}
                  {"caveat" in plan && plan.caveat && (
                    <p className="mt-6 flex items-start gap-2 rounded-xl bg-white/70 px-4 py-3 text-xs leading-relaxed text-[var(--color-teal-soft)]">
                      <Info size={13} aria-hidden className="mt-0.5 shrink-0" />
                      {plan.caveat}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
