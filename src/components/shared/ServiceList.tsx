import { Check } from "lucide-react";
import type { CHILD_CARE, ELDER_CARE } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";

type ServiceGroups = (typeof CHILD_CARE | typeof ELDER_CARE)["serviceGroups"];

interface Props {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  groups: ServiceGroups;
  tone?: "teal" | "blush";
  /** Optional scope note rendered under the grid. */
  note?: string;
}

/**
 * Grouped service list for a service page.
 *
 * The client supplied 11 child-care services and 13 elder-care services.
 * Rendered as one flat list that would have been an undifferentiated
 * wall of bullets, so they are grouped into three themed columns —
 * supervision / routine / duration for child care, companionship /
 * assistance / appointments for elder care.
 */
export default function ServiceList({
  eyebrow,
  title,
  titleAccent,
  groups,
  tone = "teal",
  note,
}: Props) {
  const blush = tone === "blush";

  return (
    <section className="section bg-[var(--color-ivory)]" id="services">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <Reveal>
          <p
            className="eyebrow mb-4"
            style={{ color: blush ? "var(--color-blush-dark)" : undefined }}
          >
            {eyebrow}
          </p>
          <h2 className="t-h2 max-w-3xl text-[var(--color-teal-deep)]">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span
                  style={{
                    color: blush
                      ? "var(--color-blush-dark)"
                      : "var(--color-teal)",
                  }}
                >
                  {titleAccent}
                </span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {groups.map((group) => (
              <div key={group.title} className="card flex h-full flex-col p-7">
                <h3 className="mb-5 font-display text-base font-bold text-[var(--color-teal-deep)]">
                  {group.title}
                </h3>
                <ul className="flex-1 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          blush
                            ? "bg-[var(--color-blush)]/18 text-[var(--color-blush-dark)]"
                            : "bg-[var(--color-teal)]/12 text-[var(--color-teal)]"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-relaxed text-[var(--color-teal-deep)]/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {note && (
          <Reveal delay={0.14}>
            <p className="mt-8 rounded-2xl border border-[var(--color-teal-soft)]/35 bg-[var(--color-teal-wash)] px-5 py-4 text-sm leading-relaxed text-[var(--color-teal-soft)]">
              {note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
