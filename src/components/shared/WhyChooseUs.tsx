import { WHY_SAHAYA } from "@/lib/content";
import { icon } from "@/components/shared/icons";
import Reveal from "@/components/shared/Reveal";

/**
 * "Why families choose SAHAYA".
 *
 * Server component: it resolves the Lucide icons itself and passes only
 * rendered elements into the client `Reveal`, so no component reference
 * crosses the server/client boundary.
 */
export default function WhyChooseUs() {
  return (
    <section className="section bg-[var(--color-ivory)]" id="why-sahaya">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow mb-4">Why SAHAYA</p>
          <h2 className="t-h2 max-w-2xl text-[var(--color-teal-deep)]">
            More than a caregiver.{" "}
            <span className="text-[var(--color-teal)]">
              Peace of mind for the family.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {WHY_SAHAYA.map((item) => {
              const Icon = icon(item.icon);
              return (
                <li key={item.title}>
                  <div className="card card-interactive group flex h-full flex-col p-7">
                    <span className="icon-badge mb-5">
                      <Icon size={18} aria-hidden />
                    </span>
                    <h3 className="font-display text-base font-bold text-[var(--color-teal-deep)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
