import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PRICING, PRICING_NOTE, formatINR } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

/**
 * Compact pricing summary for the home page.
 *
 * Shows only the hourly plans — the full Daily / Weekly / Monthly tables
 * live on /pricing, where there is room to render them properly. The
 * indicative disclaimer stays attached here too, so a price is never
 * shown on the home page without its caveat.
 */
export default function PricingPreview() {
  return (
    <section className="section bg-[var(--color-ivory)]" id="pricing-preview">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Pricing</p>
            <h2 className="t-h2 text-[var(--color-teal-deep)]">
              Pay for the hours{" "}
              <span className="text-[var(--color-teal)]">you actually need.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead t-measure text-[var(--color-teal-soft)] lg:ml-auto lg:text-right">
              Hourly, daily, weekly and monthly plans, in Standard Care or
              SAHAYA Live Care.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {PRICING.map((table) => {
              // Only the defined-hour plans on the home page.
              const hourly = table.rows.filter((r) => !r.needsConfirmation);
              const from = Math.min(...hourly.map((r) => r.standard));

              return (
                <li key={table.service}>
                  <div className="card flex h-full flex-col p-7 lg:p-8">
                    <div className="mb-6 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-bold text-[var(--color-teal-deep)]">
                        {table.service}
                      </h3>
                      <p className="text-right">
                        <span className="block text-xs uppercase tracking-[0.14em] text-[var(--color-teal-soft)]">
                          From
                        </span>
                        <span className="font-display text-2xl font-bold text-[var(--color-teal)]">
                          {formatINR(from)}
                        </span>
                      </p>
                    </div>

                    <table className="w-full border-collapse">
                      <caption className="sr-only">
                        {table.service} hourly pricing
                      </caption>
                      <tbody>
                        {hourly.map((row) => (
                          <tr
                            key={row.duration}
                            className="border-t border-[var(--color-teal-soft)]/20"
                          >
                            <th
                              scope="row"
                              className="py-3 text-left text-sm font-medium text-[var(--color-teal-deep)]/85"
                            >
                              {row.duration}
                            </th>
                            <td className="py-3 text-right text-sm tabular-nums text-[var(--color-teal-soft)]">
                              {formatINR(row.standard)}
                            </td>
                            <td className="py-3 text-right text-sm font-semibold tabular-nums text-[var(--color-teal)]">
                              {formatINR(row.live)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t border-[var(--color-teal-soft)]/20">
                          <td
                            colSpan={3}
                            className="pt-3 text-right text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--color-teal-soft)]"
                          >
                            <span className="inline-flex gap-6">
                              <span>Standard</span>
                              <span>Live Care</span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-auto pt-7">
                      <Link
                        href="/pricing"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-teal-deep)]"
                      >
                        See all plans and durations
                        <ArrowRight
                          size={13}
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[var(--color-teal-soft)]">
            <Info size={13} aria-hidden className="mt-0.5 shrink-0" />
            {PRICING_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
