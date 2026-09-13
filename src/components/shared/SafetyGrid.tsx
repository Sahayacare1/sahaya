import { SAFETY_POINTS } from "@/lib/content";
import { icon } from "@/components/shared/icons";
import Reveal from "@/components/shared/Reveal";

interface Props {
  /** Show the full section wrapper and heading, or just the grid. */
  withHeading?: boolean;
  tone?: "light" | "dark";
}

/**
 * Safety and verification grid.
 *
 * Extracted from the How It Works page so the service pages can show the
 * same eight points without a fourth copy of the markup.
 *
 * ⚠️ WORDING IS DELIBERATELY HEDGED. The client's instruction is to
 * "only display a verification claim publicly after the business
 * actually performs it". Every line in `SAFETY_POINTS` is therefore
 * process-based ("can be completed", "as per SAHAYA's onboarding
 * process", "where applicable") rather than an absolute guarantee.
 *
 * Do not upgrade this copy to "police verified" / "100% background
 * checked" / "fully vetted" without written confirmation that the
 * business performs those checks for every caregiver.
 */
export default function SafetyGrid({
  withHeading = true,
  tone = "light",
}: Props) {
  const dark = tone === "dark";

  const grid = (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {SAFETY_POINTS.map((point) => {
        const Icon = icon(point.icon);
        return (
          <li key={point.area}>
            <div
              className={`flex h-full flex-col p-6 ${
                dark
                  ? "card-night"
                  : "card card-interactive"
              }`}
            >
              <span
                className={`icon-badge mb-4 ${
                  dark ? "!bg-[var(--color-teal-soft)]/18 !text-[var(--color-teal-light)]" : ""
                }`}
              >
                <Icon size={17} aria-hidden />
              </span>
              <h3
                className={`font-display text-sm font-bold ${
                  dark ? "text-white" : "text-[var(--color-teal-deep)]"
                }`}
              >
                {point.area}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  dark ? "text-white/55" : "text-[var(--color-teal-soft)]"
                }`}
              >
                {point.copy}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );

  if (!withHeading) {
    return <Reveal delay={0.08}>{grid}</Reveal>;
  }

  return (
    <section
      className={`section ${dark ? "bg-[var(--color-teal-ink)]" : "bg-[var(--color-ivory)]"}`}
      id="safety"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p
              className="eyebrow mb-4"
              style={{ color: dark ? "var(--color-teal-soft)" : undefined }}
            >
              Safety
            </p>
            <h2
              className={`t-h2 ${dark ? "text-white" : "text-[var(--color-teal-deep)]"}`}
            >
              Trust isn&rsquo;t a feature.{" "}
              <span
                style={{
                  color: dark ? "var(--color-teal-soft)" : "var(--color-teal)",
                }}
              >
                It&rsquo;s the foundation.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className={`t-lead t-measure lg:ml-auto lg:text-right ${
                dark ? "text-white/60" : "text-[var(--color-teal-soft)]"
              }`}
            >
              SAHAYA follows a defined onboarding and selection process for
              every caregiver, and stays reachable for the family throughout.
            </p>
          </Reveal>
        </div>

        {grid}
      </div>
    </section>
  );
}
