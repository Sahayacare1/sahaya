import { TARGET_CUSTOMERS } from "@/lib/content";
import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

/**
 * "Who SAHAYA is for".
 *
 * Segmenting by situation rather than by service helps a visitor
 * recognise themselves — an NRI son in another country has a different
 * reason for being here than a parent filling a gap between school and
 * getting home.
 */
export default function TargetCustomers() {
  return (
    <section className="section bg-[var(--color-ivory-deep)]" id="who-its-for">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Who it&rsquo;s for</p>
            <h2 className="t-h2 text-[var(--color-teal-deep)]">
              If you&rsquo;re away,{" "}
              <span className="text-[var(--color-teal)]">
                you&rsquo;re not alone.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead t-measure text-[var(--color-teal-soft)] lg:ml-auto lg:text-right">
              Families come to SAHAYA for very different reasons. Most of them
              share one thing: someone they love needs a dependable presence.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TARGET_CUSTOMERS.map((customer, i) => (
              <li key={customer.title}>
                <div className="card flex h-full flex-col p-6 lg:p-7">
                  <span
                    aria-hidden="true"
                    className="mb-4 font-display text-sm font-bold tabular-nums text-[var(--color-blush)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--color-teal-deep)]">
                    {customer.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                    {customer.body}
                  </p>
                </div>
              </li>
            ))}

            {/* Fills the last cell on a 3-column grid and gives the
                section a clear next action instead of dead space. */}
            <li className="sm:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col justify-center rounded-[1.5rem] border border-[var(--color-teal-soft)]/45 bg-[var(--color-teal-wash)] p-7">
                <p className="font-display text-lg font-bold text-[var(--color-teal-deep)]">
                  Not sure which fits?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-teal-soft)]">
                  Tell us your situation and we&rsquo;ll suggest the right care
                  and duration.
                </p>
                <div className="mt-5">
                  <WhatsAppCTA
                    service="Family Care"
                    label="Ask us"
                    className="btn-sm"
                  />
                </div>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
