import {
  ShieldCheck,
  HeartHandshake,
  Clock,
  Star,
  Home,
  Users,
} from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Government ID verified" },
  { icon: Users, label: "Background checked" },
  { icon: Clock, label: "On time, every time" },
  { icon: HeartHandshake, label: "Compassionate care" },
  { icon: Home, label: "Care in your home" },
  { icon: Star, label: "Rated by 500+ families" },
];

/**
 * Scrolling trust band.
 *
 * Fixes:
 *  - The section carried `aria-hidden="true"` while containing the
 *    page's core trust claims, hiding them from every screen reader.
 *    It is a real content block, so it is now exposed properly.
 *  - The loop translated -50% but the flex `gap` was not mirrored by
 *    a matching trailing gap, so the track jumped at the seam every
 *    cycle. The gap is now shared between the flex `gap` and the
 *    trailing `padding-right`.
 *  - No mask, so items were sliced off at the container edge. The
 *    band now fades in and out at both ends.
 *  - Colours sat at 70% opacity on a dark band, failing contrast. The
 *    labels are near-white now.
 */
export default function Marquee() {
  // Duplicated once: the track is exactly two laps wide, so a -50%
  // translation lands precisely on the start of the second lap.
  const row = [...items, ...items];

  return (
    <section
      aria-label="Why families choose SAHAYA"
      className="dark-seam overflow-hidden border-b border-[var(--color-teal-soft)]/15 bg-[var(--color-teal-ink)] py-6"
    >
      <div className="marquee">
        <div className="marquee-track">
          {row.map((item, i) => {
            const Icon = item.icon;
            // The second lap is decorative repetition.
            const duplicate = i >= items.length;
            return (
              <span
                key={`${item.label}-${i}`}
                aria-hidden={duplicate || undefined}
                className="inline-flex items-center gap-3"
              >
                <Icon
                  size={16}
                  className="shrink-0 text-[var(--color-blush)]"
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-semibold tracking-wide whitespace-nowrap text-[var(--color-teal-light)]">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-1 h-1 w-1 rounded-full bg-[var(--color-teal-soft)]/50"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
