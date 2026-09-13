import Reveal from "@/components/shared/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  titleAccent: string;
  items: readonly string[];
  image: string;
  imageAlt: string;
  /** Accent colour for the step markers and heading. */
  accent: string;
  /** Label above the pull-quote on the photo. */
  quoteLabel: string;
  quote: string;
  /** Photo on the left instead of the right. */
  reverse?: boolean;
  /** Section surface. */
  tone?: "dark" | "light";
}

/**
 * "A typical day" — numbered timeline beside a photo with a pull-quote.
 *
 * Both service pages carried their own copy of this block. Consolidating
 * it fixed the shared problems in one place:
 *  - The step markers were 28px circles with 10px text, well under any
 *    sensible minimum, and had no semantic relationship to the list.
 *  - The list was a flat <ul> of <li>, so the numbering was decorative
 *    rather than an actual ordered sequence.
 *  - The photo's pull-quote sat on a hard-coded rgba panel that ignored
 *    the design tokens.
 */
export default function DayTimeline({
  eyebrow,
  title,
  titleAccent,
  items,
  image,
  imageAlt,
  accent,
  quoteLabel,
  quote,
  reverse = false,
  tone = "dark",
}: Props) {
  const dark = tone === "dark";

  return (
    <section
      className={
        dark
          ? "section bg-[var(--color-teal-ink)]"
          : "section bg-[var(--color-ivory)]"
      }
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* ── Text ── */}
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <p
            className="eyebrow mb-4"
            style={{ color: dark ? accent : undefined }}
          >
            {eyebrow}
          </p>
          <h2
            className={`t-h2 mb-9 ${dark ? "text-white" : "text-[var(--color-teal-deep)]"}`}
          >
            {title}
            <br />
            <span style={{ color: accent }}>{titleAccent}</span>
          </h2>

          {/* An <ol> so the sequence is conveyed, not just implied. */}
          <ol className="relative space-y-0">
            {items.map((item, i) => {
              const last = i === items.length - 1;
              return (
                <li key={item} className="group relative flex gap-4 pb-6 last:pb-0">
                  {/* Connector rail */}
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[0.9375rem] top-8 h-[calc(100%-2rem)] w-px"
                      style={{
                        background: dark
                          ? "rgba(255,255,255,0.12)"
                          : "color-mix(in srgb, var(--color-teal-soft) 35%, transparent)",
                      }}
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-display text-[11px] font-bold tabular-nums transition-colors duration-300"
                    style={{
                      borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
                      color: accent,
                      background: dark
                        ? "var(--color-teal-ink)"
                        : "var(--color-ivory)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`pt-1 text-[0.9375rem] leading-relaxed transition-colors duration-300 ${
                      dark
                        ? "text-white/65 group-hover:text-white"
                        : "text-[var(--color-teal-soft)] group-hover:text-[var(--color-teal-deep)]"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* ── Photo ── */}
        <Reveal
          from={reverse ? "left" : "right"}
          className={reverse ? "lg:order-1" : ""}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_36px_70px_-28px_rgba(14,37,38,0.6)]">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal-ink)]/70 via-transparent to-transparent"
            />

            <figcaption className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[var(--color-teal-ink)]/70 p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-teal-soft)]">
                {quoteLabel}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
                &ldquo;{quote}&rdquo;
              </p>
            </figcaption>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
