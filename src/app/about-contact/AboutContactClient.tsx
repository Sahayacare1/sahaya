"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, ArrowRight, Mail, MapPin, Eye, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import TargetCustomers from "@/components/shared/TargetCustomers";
import FaqAccordion from "@/components/shared/FaqAccordion";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { openWhatsApp } from "@/lib/whatsapp";
import { BRAND } from "@/lib/constants";
import { ABOUT, CARE_PLANS } from "@/lib/content";

const SERVICES = ["Child Care", "Elder Care"] as const;
const DURATIONS = [
  "3 Hours",
  "6 Hours",
  "9 Hours",
  "12 Hours",
  "Daily",
  "Weekly",
  "Monthly",
] as const;
const PLANS = CARE_PLANS.map((p) => p.name);

interface FormState {
  name: string;
  mobile: string;
  service: string;
  location: string;
  date: string;
  startTime: string;
  duration: string;
  plan: string;
  requirement: string;
}

const EMPTY: FormState = {
  name: "",
  mobile: "",
  service: SERVICES[0],
  location: "",
  date: "",
  startTime: "",
  duration: DURATIONS[1],
  plan: PLANS[0]!,
  requirement: "",
};

/** Today in `YYYY-MM-DD`, for the date input's `min`. */
function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

/**
 * About & contact.
 *
 * The enquiry form is the site's primary conversion path, and the
 * original was the weakest part of the build:
 *  - Every `<label>` was a bare element with no `htmlFor` and no `id`
 *    on its field, so no label was associated with any input. Screen
 *    readers announced unlabelled fields and clicking a label did
 *    nothing.
 *  - There was no validation of any kind, so an empty form cheerfully
 *    opened WhatsApp with a message full of blanks.
 *  - Fields sat on `rgba(255,255,255,0.06)` with `text-white/20`
 *    placeholders — far below the contrast floor.
 *  - The submit button gave no feedback.
 *
 * It now collects the fields the SAHAYA team actually needs to check
 * availability without a follow-up round of questions: mobile, start
 * time and plan, in addition to name, location, date and duration.
 */
export default function AboutContactClient() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [sent, setSent] = useState(false);
  const minDate = useMemo(() => todayISO(), []);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  function validate(state: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) next.name = "Please tell us your name.";
    if (!state.mobile.trim()) {
      next.mobile = "We need a number to confirm availability.";
    } else if (!/^[+\d][\d\s-]{6,}$/.test(state.mobile.trim())) {
      next.mobile = "That doesn't look like a valid phone number.";
    }
    if (!state.location.trim()) {
      next.location = "We need an area or city to check coverage.";
    }
    if (state.date && state.date < minDate) {
      next.date = "Please choose today or a future date.";
    }
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard users aren't stranded.
      const first = Object.keys(found)[0];
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    openWhatsApp(form);
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="About SAHAYA"
        lines={[
          { text: "We exist because" },
          { text: "family matters.", accent: true },
        ]}
        sub={BRAND.heroSub}
        image="/images/hero-background.webp"
        imagePosition="center center"
        scrimFrom="var(--color-teal-ink)"
      />

      {/* ── About + mission + vision ── */}
      <section className="section bg-[var(--color-teal-ink)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
                About SAHAYA
              </p>
              <div className="space-y-4">
                {ABOUT.about.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="t-lead leading-relaxed text-white/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal from="right">
              <ul className="grid gap-4">
                <li className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-7">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-teal-soft)]/18 text-[var(--color-teal-light)]"
                  >
                    <Target size={18} />
                  </span>
                  <h2 className="font-display text-lg font-bold text-white">
                    Our mission
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/60">
                    {ABOUT.mission}
                  </p>
                </li>
                <li className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-7">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-blush)]/20 text-[var(--color-blush)]"
                  >
                    <Eye size={18} />
                  </span>
                  <h2 className="font-display text-lg font-bold text-white">
                    Our vision
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/60">
                    {ABOUT.vision}
                  </p>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <TargetCustomers />

      {/* ── Enquiry form ── */}
      <section className="section bg-[var(--color-teal-deep)]" id="enquire">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">
              Enquire
            </p>
            <h2 className="t-h2 mb-3 text-white">Get in touch.</h2>
            <p className="t-lead mb-10 text-white/60">
              Fill in your details and we&rsquo;ll open WhatsApp with a
              pre-filled message, ready to send. The SAHAYA team confirms
              availability from there.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 sm:p-8 lg:p-10"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-name`} label="Your name" required error={errors.name}>
                  <input
                    id={`${formId}-name`}
                    className="field field-night"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="e.g. Priya Sharma"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                  />
                </Field>

                <Field id={`${formId}-mobile`} label="Mobile number" required error={errors.mobile}>
                  <input
                    id={`${formId}-mobile`}
                    type="tel"
                    inputMode="tel"
                    className="field field-night"
                    value={form.mobile}
                    onChange={set("mobile")}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={errors.mobile ? `${formId}-mobile-err` : undefined}
                  />
                </Field>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-service`} label="Service">
                  <select
                    id={`${formId}-service`}
                    className="field field-night"
                    value={form.service}
                    onChange={set("service")}
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={`${formId}-location`} label="Area or city" required error={errors.location}>
                  <input
                    id={`${formId}-location`}
                    className="field field-night"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="e.g. Madhapur"
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={
                      errors.location ? `${formId}-location-err` : undefined
                    }
                  />
                </Field>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-date`} label="Preferred date" error={errors.date}>
                  <input
                    id={`${formId}-date`}
                    type="date"
                    min={minDate}
                    className="field field-night"
                    value={form.date}
                    onChange={set("date")}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? `${formId}-date-err` : undefined}
                  />
                </Field>

                <Field id={`${formId}-startTime`} label="Start time">
                  <input
                    id={`${formId}-startTime`}
                    type="time"
                    className="field field-night"
                    value={form.startTime}
                    onChange={set("startTime")}
                  />
                </Field>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-duration`} label="Duration">
                  <select
                    id={`${formId}-duration`}
                    className="field field-night"
                    value={form.duration}
                    onChange={set("duration")}
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={`${formId}-plan`} label="Plan">
                  <select
                    id={`${formId}-plan`}
                    className="field field-night"
                    value={form.plan}
                    onChange={set("plan")}
                  >
                    {PLANS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field id={`${formId}-requirement`} label="Requirement">
                <textarea
                  id={`${formId}-requirement`}
                  rows={3}
                  className="field field-night resize-none"
                  value={form.requirement}
                  onChange={set("requirement")}
                  placeholder="Tell us a little about the care you're looking for…"
                />
              </Field>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Send enquiry via WhatsApp
                <ArrowRight size={16} className="btn-arrow" aria-hidden />
              </button>

              {/* Live region: announced when it appears. */}
              <p aria-live="polite" className="min-h-5 text-center text-sm">
                {sent ? (
                  <span className="inline-flex items-center gap-2 text-[var(--color-teal-light)]">
                    <CheckCircle2 size={15} aria-hidden />
                    WhatsApp should have opened in a new tab. If it didn&rsquo;t,
                    check your pop-up blocker.
                  </span>
                ) : (
                  <span className="text-white/45">
                    A care request is confirmed after we check availability.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          {/* ── Contact details ── */}
          <Reveal delay={0.14}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="field-label field-label-night">Email</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 font-display text-base font-semibold text-white underline-offset-4 hover:underline"
                >
                  <Mail size={15} aria-hidden />
                  {BRAND.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="field-label field-label-night">Service area</p>
                <p className="inline-flex items-center gap-2 font-display text-base font-semibold text-white">
                  <MapPin size={15} aria-hidden />
                  {BRAND.serviceArea}
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-white/40">
              {BRAND.scopeNote}
            </p>

            <div className="mt-8 flex justify-center">
              <WhatsAppCTA
                service="Family Care"
                label="Or message us directly"
                variant="ghost"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqAccordion />
    </>
  );
}

/** Labelled field wrapper that wires up the error message correctly. */
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label field-label-night">
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-blush)]" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 text-xs font-medium text-[var(--color-blush)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
