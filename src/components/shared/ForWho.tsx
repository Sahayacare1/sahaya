import Reveal from "@/components/shared/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  items: readonly { title: string; body: string }[];
  tone?: "teal" | "blush";
}

/**
 * "Who this is for" — three situations per service page.
 *
 * Segmenting by circumstance rather than by feature helps a visitor
 * recognise themselves in the copy before they read a service list.
 */
export default function ForWho({ eyebrow, title, items, tone = "teal" }: Props) {
  const blush = tone === "blush";

  return (
    <section
      className="section-tight bg-[var(--color-ivory-deep)]"
      id="who-its-for"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <Reveal>
          <p
            className="eyebrow mb-4"
            style={{ color: blush ? "var(--color-blush-dark)" : undefined }}
          >
            {eyebrow}
          </p>
          <h2 className="t-h2 max-w-2xl text-[var(--color-teal-deep)]">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {items.map((item, i) => (
              <li key={item.title}>
                <div className="card flex h-full flex-col p-7">
                  <span
                    aria-hidden="true"
                    className="mb-4 font-display text-sm font-bold tabular-nums"
                    style={{
                      color: blush
                        ? "var(--color-blush-dark)"
                        : "var(--color-teal-soft)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--color-teal-deep)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
