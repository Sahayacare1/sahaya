import Link from "next/link";
import { ArrowRight, Home, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Branded 404.
 *
 * Without this file Next.js serves its own not-found page: a system-font
 * "404 / This page could not be found." with inline styles, rendered
 * inside the SAHAYA navbar and footer. On an ivory editorial site that
 * reads as a broken page rather than a designed one.
 *
 * The copy is deliberately calm — a care brand should not greet a lost
 * visitor with an error tone — and the page carries real navigation, so
 * a 404 becomes a route back into the site instead of a dead end.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[72svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div
        aria-hidden="true"
        className="blob -right-24 -top-24 h-80 w-80 bg-[var(--color-teal-light)]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="blob -bottom-32 -left-20 h-72 w-72 bg-[var(--color-blush-light)]/60 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 py-20 text-center sm:px-6">
        <p className="eyebrow eyebrow-flush justify-center text-[var(--color-teal-soft)]">
          Error 404
        </p>

        <p
          aria-hidden="true"
          className="mt-6 font-display text-[clamp(4.5rem,14vw,8rem)] font-bold leading-none text-[var(--color-teal-light)]"
        >
          404
        </p>

        <h1 className="t-h2 mt-4 text-[var(--color-teal-deep)]">
          We couldn&rsquo;t find that page.
        </h1>

        <p className="t-lead mx-auto mt-5 max-w-[46ch] text-[var(--color-teal-soft)]">
          The link may be out of date, or the page may have moved. Nothing is
          wrong with your enquiry &mdash; let&rsquo;s get you back on track.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Home size={16} aria-hidden />
            Back to home
          </Link>
          <Link href="/about-contact" className="btn btn-outline">
            <MessageCircle size={16} aria-hidden />
            Contact us
          </Link>
        </div>

        {/* Real navigation, so a 404 still leads somewhere useful. */}
        <nav aria-label="Site sections" className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal-soft)]">
            Or jump to
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-teal-soft)]/35 px-4 py-2 text-sm font-medium text-[var(--color-teal)] transition-colors hover:border-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white"
                >
                  {link.label}
                  <ArrowRight
                    size={13}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
