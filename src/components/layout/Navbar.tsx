"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, Mail } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { CHILD_CARE, ELDER_CARE } from "@/lib/content";
import { openWhatsApp } from "@/lib/whatsapp";

/** The two service pages, surfaced as a dropdown. */
const SERVICES = [
  { href: CHILD_CARE.slug, name: CHILD_CARE.name, blurb: CHILD_CARE.short },
  { href: ELDER_CARE.slug, name: ELDER_CARE.name, blurb: ELDER_CARE.short },
];

/**
 * Site header.
 *
 * Structure: an announcement strip stacked on the nav row. The strip
 * carries the brand promise and a direct contact route, which a service
 * business needs visible at all times; it collapses on scroll so the
 * header gets out of the way.
 *
 * Navigation is four items plus a Services dropdown rather than five
 * flat links. With five, the row measured roughly 695px against 720px
 * of available width at the 768px breakpoint — close enough to wrapping
 * that any copy change would have broken the layout. The dropdown also
 * scales if a third service is ever added.
 *
 * Fixed from the original build:
 *  - The tagline was collapsed with `text-[0px]`, leaving a 0px-tall
 *    inline box that reflowed the wordmark and made the header jitter.
 *  - The CTA used `!px-4 !py-2 !text-xs` to fight `.btn`, producing a
 *    button that matched nothing else on the site. It uses `.btn-sm`.
 *  - The layout was `justify-between` across four children, so on
 *    tablet widths the links drifted. It is three explicit zones now.
 *  - The mobile sheet had no Escape handling, no scroll lock, no
 *    backdrop and no focus return. All added.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

  // One rAF-throttled scroll listener driving both the compact state
  // and the progress bar, instead of one handler per concern.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 32);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close everything when the route changes — including on browser
  // back/forward. Adjusting state during render is React's documented
  // pattern for "reset when a prop changes"; an effect calling
  // setState synchronously would cause a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  // Escape closes whichever layer is open, and returns focus.
  useEffect(() => {
    if (!open && !servicesOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  // Click-away for the dropdown.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [servicesOpen]);

  // Body scroll lock while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const openEnquiry = () => openWhatsApp({ service: "Family Care" });

  // "Services" reads as active whenever either service page is open.
  const onServicePage =
    pathname === CHILD_CARE.slug || pathname === ELDER_CARE.slug;

  /** NAV_LINKS minus the two service pages, which live in the dropdown. */
  const secondaryLinks = NAV_LINKS.filter(
    (link) => link.href !== CHILD_CARE.slug && link.href !== ELDER_CARE.slug
  );

  const linkClass = (active: boolean) =>
    `rounded-full px-2.5 py-2 text-sm font-semibold transition-colors duration-200 lg:px-3.5 ${
      active
        ? "bg-[var(--color-teal-light)]/55 text-[var(--color-teal)]"
        : "text-[var(--color-teal)]/75 hover:bg-[var(--color-teal-light)]/35 hover:text-[var(--color-teal)]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-[var(--color-teal-light)]/70 bg-[var(--color-ivory)]/92 shadow-[0_1px_0_0_rgba(28,58,59,0.04),0_10px_30px_-18px_rgba(28,58,59,0.35)] backdrop-blur-xl"
          : "border-transparent bg-[var(--color-ivory)]/70 backdrop-blur-md"
      }`}
    >
      {/* ── Announcement strip ── */}
      <div
        className={`overflow-hidden bg-[var(--color-teal-ink)] transition-[height,opacity] duration-300 ${
          scrolled ? "h-0 opacity-0" : "h-[var(--announce-h)] opacity-100"
        }`}
      >
        <div className="mx-auto flex h-[var(--announce-h)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-12">
          <p className="truncate font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-teal-light)]">
            {BRAND.promise}
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={`mailto:${BRAND.email}`}
              className="hidden items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-white sm:inline-flex"
            >
              <Mail size={12} aria-hidden />
              {BRAND.email}
            </a>
            <button
              type="button"
              onClick={openEnquiry}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-blush)] transition-colors hover:text-white"
            >
              Enquire on WhatsApp
              <ArrowRight size={12} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* ── Nav row ── */}
      <div
        className={`transition-[height] duration-300 ${
          scrolled ? "h-[var(--nav-h-compact)]" : "h-[var(--nav-h)]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-12">
          {/* Zone 1: brand mark. The logo lockup already includes the
              tagline ("Support. Care. Together."), so the navbar no
              longer renders a separate subline. Plain <img> is used
              (not next/image) so the browser receives the exact
              transparent PNG — no optimisation pipeline that could
              strip the alpha channel or re-encode the background. */}
          <Link
            href="/"
            aria-label={`${BRAND.name} — home`}
            className="relative block shrink-0 transition-opacity hover:opacity-80"
            style={{
              // The lockup is 1.85:1 — height tracks the row, width
              // is derived. At expanded height the logo sits at 60px
              // tall; at compact height 48px tall.
              height: scrolled ? "48px" : "60px",
              width: scrolled ? "89px" : "111px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} — ${BRAND.promise}`}
              // height/width set the rendered box; the file is 589×319
              // (1.85:1), matching the container so the transparent
              // background fits flush without leaving an ivory halo.
              width={scrolled ? 89 : 111}
              height={scrolled ? 48 : 60}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="block h-full w-full select-none object-contain object-left"
            />
          </Link>

          <div className="flex-1" />

          {/* Zone 2: links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 md:flex"
          >
            {/* Services dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                ref={servicesBtnRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={`inline-flex items-center gap-1 ${linkClass(onServicePage)}`}
              >
                Services
                <ChevronDown
                  size={13}
                  aria-hidden
                  className={`transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="services-menu"
                inert={!servicesOpen}
                className={`absolute left-0 top-[calc(100%+0.5rem)] w-72 origin-top-left overflow-hidden rounded-2xl border border-[var(--color-teal-soft)]/35 bg-[var(--color-ivory)] p-2 shadow-[0_24px_50px_-20px_rgba(28,58,59,0.4)] transition-[opacity,transform] duration-200 ${
                  servicesOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                {SERVICES.map((service) => {
                  const active = pathname === service.href;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 transition-colors ${
                        active
                          ? "bg-[var(--color-teal-light)]/45"
                          : "hover:bg-[var(--color-teal-wash)]"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-[var(--color-teal-deep)]">
                          {service.name}
                        </span>
                        <ArrowRight
                          size={13}
                          aria-hidden
                          className="text-[var(--color-teal-soft)]"
                        />
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--color-teal-soft)]">
                        {service.blurb}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={linkClass(pathname === link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: CTA + mobile toggle */}
          {/* xl-and-up shows the full CTA label; md–xl collapses it to a
              short one so the row never wraps. */}
          <button
            onClick={openEnquiry}
            className="btn btn-primary btn-sm ml-2 hidden md:inline-flex xl:min-w-[9.5rem]"
          >
            <span className="hidden xl:inline">{BRAND.cta}</span>
            <span className="xl:hidden">Enquire</span>
          </button>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-teal)] transition-colors hover:bg-[var(--color-teal-light)]/40 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {/* ── Scroll progress ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-teal)]/25 transition-opacity duration-300"
        style={{ opacity: scrolled ? 1 : 0 }}
      >
        <div
          className="h-full origin-left bg-[var(--color-blush)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* ── Mobile sheet backdrop ── */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default bg-[var(--color-teal-ink)]/35 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* ── Mobile sheet ── */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full origin-top overflow-hidden border-b border-[var(--color-teal-light)]/70 bg-[var(--color-ivory)] shadow-[0_24px_48px_-24px_rgba(28,58,59,0.4)] transition-[opacity,transform] duration-300 md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto px-5 pb-6 pt-3 sm:px-6"
        >
          {SERVICES.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              aria-current={pathname === service.href ? "page" : undefined}
              className={`block border-b border-[var(--color-teal-light)]/45 py-4 ${
                pathname === service.href
                  ? "text-[var(--color-teal)]"
                  : "text-[var(--color-teal)]/70"
              }`}
            >
              <span className="font-display text-base font-semibold">
                {service.name}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-[var(--color-teal-soft)]">
                {service.blurb}
              </span>
            </Link>
          ))}

          {secondaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-[var(--color-teal-light)]/45 py-4 font-display text-base font-semibold transition-colors ${
                  active
                    ? "text-[var(--color-teal)]"
                    : "text-[var(--color-teal)]/70 hover:text-[var(--color-teal)]"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-blush)]"
                  />
                )}
              </Link>
            );
          })}

          <button
            onClick={openEnquiry}
            className="btn btn-primary btn-block mt-5"
          >
            {BRAND.cta}
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-[var(--color-teal-soft)]">
            {BRAND.promise}
          </p>
        </nav>
      </div>
    </header>
  );
}
