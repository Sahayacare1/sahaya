import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

const trust = [
  { icon: ShieldCheck, label: "ID verified" },
  { icon: BadgeCheck, label: "Background checked" },
  { icon: Clock, label: "Same-day reply" },
];

/**
 * Site footer.
 *
 * Previously it offered no way to actually start an enquiry — the only
 * contact details were an email address and a city name, on a site whose
 * entire conversion path is WhatsApp. It now carries a real contact
 * block and the three trust markers that close the loop on the claims
 * made further up the page.
 */
export default function Footer() {
  return (
    <footer className="bg-[var(--color-teal-ink)] text-[var(--color-teal-light)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ── Brand ── */}
          <div className="lg:col-span-2">
            {/* The official lockup carries the tagline. It is light-on-
                cream by design, so on the dark footer it sits inside a
                soft brand pill that preserves the teal + blush colors. */}
            <div className="inline-flex rounded-2xl bg-[var(--color-ivory)]/95 px-3.5 py-3 ring-1 ring-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] sm:px-5 sm:py-4">
              <div className="relative h-[44px] w-[82px] sm:h-[60px] sm:w-[111px]">
                <Image
                  src={BRAND.logo}
                  alt={`${BRAND.name} — ${BRAND.promise}`}
                  fill
                  sizes="(max-width: 640px) 82px, 111px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Trusted, verified caregivers for your children and your elderly
              parents — so you can work, travel and live without the worry.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
              {trust.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium text-white/70"
                >
                  <Icon
                    size={14}
                    className="text-[var(--color-teal-soft)]"
                    aria-hidden
                  />
                  {label}
                </li>
              ))}
            </ul>

            {/* Scope statement — the client requires this to be visible. */}
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-white/40">
              {BRAND.scopeNote}
            </p>
          </div>

          {/* ── Pages ── */}
          <nav aria-label="Footer">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-teal-soft)]">
              Pages
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      aria-hidden
                      className="-translate-x-1 translate-y-1 text-[var(--color-blush)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact ── */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-teal-soft)]">
              Contact
            </p>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-[var(--color-teal-soft)]"
                  aria-hidden
                />
                <span className="text-white/75">{BRAND.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-[var(--color-teal-soft)]"
                  aria-hidden
                />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-white/45">
              Message us on WhatsApp and we&rsquo;ll reply the same day.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-12">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Non-medical home care &middot; {BRAND.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
