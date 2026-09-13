import Link from "next/link";
import { ArrowRight, Info, Sparkles } from "lucide-react";
import {
  PRICING,
  PRICING_NOTE,
  PRICING_NOTE_DETAIL,
  formatINR,
  type PriceRow,
} from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

interface Props {
  /** Restrict to one service; omit to render both. */
  only?: "Child Care" | "Elder Care";
  /** Section heading level — the pricing page uses h1 for its own header. */
  showHeading?: boolean;
}

/**
 * Price table.
 *
 * The client supplied two tiers across seven durations for two services
 * — 28 figures. A single wide table would have been unreadable, so this
 * renders one table per service, and switches to stacked cards below
 * `md` where a five-column table has no chance of fitting.
 *
 * The Daily / Weekly / Monthly rows are marked, because the client has
 * not yet defined how many hours those plans cover. The indicative
 * disclaimer is rendered alongside every table rather than buried in
 * the page footer, so a price is never shown without its caveat.
 */
export default function PricingTable({ only, showHeading = true }: Props) {
  const tables = only ? PRICING.filter((t) => t.service === only) : PRICING;

  return (
    <section className="section bg-[var(--color-ivory)]" id="pricing">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {showHeading && (
          <Reveal>
            <p className="eyebrow mb-4">Pricing</p>
            <h2 className="t-h2 max-w-2xl text-[var(--color-teal-deep)]">
              Clear plans,{" "}
              <span className="text-[var(--color-teal)]">
                no hidden charges.
              </span>
            </h2>
            <p className="t-lead t-measure mt-5 text-[var(--color-teal-soft)]">
              Choose the hours you need, and the level of visibility that suits
              your family. Every plan includes a verified caregiver and SAHAYA
              support.
            </p>
          </Reveal>
        )}

        <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-16">
          {tables.map((table) => (
            <div key={table.service}>
              {/* Service label */}
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-[var(--color-teal-deep)]">
                  {table.service}
                </h3>
                <Link
                  href={table.slug}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-teal)] hover:text-[var(--color-teal-deep)]"
                >
                  About {table.service.toLowerCase()}
                  <ArrowRight
                    size={13}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* ── Desktop table ── */}
              <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--color-teal-soft)]/35 bg-white md:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    {table.service} pricing by duration, for Standard Care and
                    SAHAYA Live Care
                  </caption>
                  <thead>
                    <tr className="bg-[var(--color-teal-wash)]">
                      <th
                        scope="col"
                        className="px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-teal)]"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-teal)]"
                      >
                        Standard Care
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right font-display text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-teal)]"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Sparkles size={12} aria-hidden />
                          Live Care
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr
                        key={row.duration}
                        className="border-t border-[var(--color-teal-soft)]/20 transition-colors hover:bg-[var(--color-teal-wash)]/50"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-display text-[0.9375rem] font-semibold text-[var(--color-teal-deep)]"
                        >
                          {row.duration}
                          {row.needsConfirmation && (
                            <span
                              className="ml-2 align-middle text-[var(--color-blush-dark)]"
                              title={PRICING_NOTE_DETAIL}
                            >
                              <Info size={13} aria-hidden className="inline" />
                              <span className="sr-only">
                                {PRICING_NOTE_DETAIL}
                              </span>
                            </span>
                          )}
                        </th>
                        <td className="px-6 py-4 text-right font-display text-[0.9375rem] font-semibold tabular-nums text-[var(--color-teal-deep)]">
                          {formatINR(row.standard)}
                        </td>
                        <td className="px-6 py-4 text-right font-display text-[0.9375rem] font-semibold tabular-nums text-[var(--color-teal)]">
                          {formatINR(row.live)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile cards ── */}
              <ul className="space-y-3 md:hidden">
                {table.rows.map((row) => (
                  <li key={row.duration}>
                    <MobilePriceCard row={row} />
                  </li>
                ))}
              </ul>

              {/* Disclaimer — always next to the numbers */}
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[var(--color-teal-soft)]">
                <Info size={13} aria-hidden className="mt-0.5 shrink-0" />
                <span>
                  {PRICING_NOTE} {PRICING_NOTE_DETAIL}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobilePriceCard({ row }: { row: PriceRow }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-display text-base font-bold text-[var(--color-teal-deep)]">
          {row.duration}
        </p>
        {row.needsConfirmation && (
          <span className="chip chip-blush">Hours TBC</span>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[var(--color-teal-wash)] px-4 py-3">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-teal-soft)]">
            Standard
          </dt>
          <dd className="mt-1 font-display text-lg font-bold tabular-nums text-[var(--color-teal-deep)]">
            {formatINR(row.standard)}
          </dd>
        </div>
        <div className="rounded-xl bg-[var(--color-blush-light)] px-4 py-3">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-blush-dark)]">
            Live Care
          </dt>
          <dd className="mt-1 font-display text-lg font-bold tabular-nums text-[var(--color-teal-deep)]">
            {formatINR(row.live)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
