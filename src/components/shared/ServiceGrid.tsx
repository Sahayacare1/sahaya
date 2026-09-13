import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

interface Item {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface Props {
  eyebrow: string;
  title: string;
  items: readonly Item[];
  /** `teal` for child care, `blush` for elder care. */
  tone?: "teal" | "blush";
}

/**
 * "What we offer" card grid, shared by both service pages.
 *
 * This is a **server** component on purpose. It was briefly a client
 * component, which broke the build: the parent pages are server
 * components, and they pass `items` containing `icon: Clock` — a Lucide
 * *component reference*. React cannot serialise a function across the
 * server/client boundary, so the prerender failed with
 * "Functions cannot be passed directly to Client Components".
 *
 * Rendering the icons on the server and passing only the resulting
 * elements into the client `Reveal` wrapper sidesteps that entirely,
 * and keeps the icon markup out of the client bundle.
 *
 * The original grid wrapped every card in its own `<Reveal delay={i * 0.08}>`,
 * so each card ran a separate ScrollTrigger with a growing delay and the
 * later cards arrived noticeably late. One staggered tween now covers
 * the whole list.
 */
export default function ServiceGrid({
  eyebrow,
  title,
  items,
  tone = "teal",
}: Props) {
  const blush = tone === "blush";

  return (
    <section className="section bg-[var(--color-ivory)]">
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

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {items.map(({ icon: Icon, title: itemTitle, body }) => (
              <li key={itemTitle}>
                <div className="card card-interactive group flex h-full flex-col p-7">
                  <span
                    className={`icon-badge mb-5 ${blush ? "icon-badge-blush" : ""}`}
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--color-teal-deep)]">
                    {itemTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                    {body}
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
