"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, ArrowRight, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { openWhatsApp } from "@/lib/whatsapp";
import { BRAND } from "@/lib/constants";
import { CARE_PLANS } from "@/lib/content";

const SERVICES = ["Child Care", "Elder Care"] as const;
const DURATIONS = ["3 Hours", "6 Hours", "9 Hours", "12 Hours", "Daily", "Weekly", "Monthly"] as const;
const PLANS = CARE_PLANS.map((p) => p.name);

interface FormState {
  name: string; mobile: string; service: string; location: string;
  date: string; startTime: string; duration: string; plan: string; requirement: string;
}

const EMPTY: FormState = {
  name: "", mobile: "", service: SERVICES[0], location: "",
  date: "", startTime: "", duration: DURATIONS[1], plan: PLANS[0]!, requirement: "",
};

function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export default function ContactClient() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const minDate = useMemo(() => todayISO(), []);

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  function validate(state: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) next.name = "Please tell us your name.";
    if (!state.mobile.trim()) next.mobile = "We need a number to confirm availability.";
    else if (!/^[+\d][\d\s-]{6,}$/.test(state.mobile.trim())) next.mobile = "That doesn't look like a valid phone number.";
    if (!state.location.trim()) next.location = "We need an area or city to check coverage.";
    if (state.date && state.date < minDate) next.date = "Please choose today or a future date.";
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`${formId}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    openWhatsApp(form);
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={[
          { text: "Get in touch." },
          { text: "We're here to help.", accent: true },
        ]}
        sub="Fill in your details and we'll open WhatsApp with a pre-filled message, ready to send."
        image="/images/trust-caregiver.webp"
        imagePosition="center center"
        scrimFrom="var(--color-teal-ink)"
      />

      <section className="section bg-[var(--color-teal-deep)]" id="enquire">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow mb-4 text-[var(--color-teal-soft)]">Enquiry Form</p>
            <h2 className="t-h2 mb-3 text-white">Request care.</h2>
            <p className="t-lead mb-10 text-white/60">
              The SAHAYA team confirms availability after receiving your enquiry.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-name`} label="Your name" required error={errors.name}>
                  <input id={`${formId}-name`} className="field field-night" value={form.name} onChange={set("name")} placeholder="e.g. Priya Sharma" autoComplete="name" aria-invalid={Boolean(errors.name)} />
                </Field>
                <Field id={`${formId}-mobile`} label="Mobile number" required error={errors.mobile}>
                  <input id={`${formId}-mobile`} type="tel" inputMode="tel" className="field field-night" value={form.mobile} onChange={set("mobile")} placeholder="+91 98765 43210" autoComplete="tel" aria-invalid={Boolean(errors.mobile)} />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-service`} label="Service">
                  <select id={`${formId}-service`} className="field field-night" value={form.service} onChange={set("service")}>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id={`${formId}-location`} label="Area or city" required error={errors.location}>
                  <input id={`${formId}-location`} className="field field-night" value={form.location} onChange={set("location")} placeholder="e.g. Madhapur" autoComplete="address-level2" aria-invalid={Boolean(errors.location)} />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-date`} label="Preferred date" error={errors.date}>
                  <input id={`${formId}-date`} type="date" min={minDate} className="field field-night" value={form.date} onChange={set("date")} aria-invalid={Boolean(errors.date)} />
                </Field>
                <Field id={`${formId}-startTime`} label="Start time">
                  <input id={`${formId}-startTime`} type="time" className="field field-night" value={form.startTime} onChange={set("startTime")} />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id={`${formId}-duration`} label="Duration">
                  <select id={`${formId}-duration`} className="field field-night" value={form.duration} onChange={set("duration")}>
                    {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field id={`${formId}-plan`} label="Plan">
                  <select id={`${formId}-plan`} className="field field-night" value={form.plan} onChange={set("plan")}>
                    {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
              </div>

              <Field id={`${formId}-requirement`} label="Requirement">
                <textarea id={`${formId}-requirement`} rows={3} className="field field-night resize-none" value={form.requirement} onChange={set("requirement")} placeholder="Tell us a little about the care you're looking for…" />
              </Field>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Send enquiry via WhatsApp
                <ArrowRight size={16} className="btn-arrow" aria-hidden />
              </button>

              <p aria-live="polite" className="min-h-5 text-center text-sm">
                {sent ? (
                  <span className="inline-flex items-center gap-2 text-[var(--color-teal-light)]">
                    <CheckCircle2 size={15} aria-hidden />
                    WhatsApp should have opened in a new tab.
                  </span>
                ) : (
                  <span className="text-white/45">A care request is confirmed after we check availability.</span>
                )}
              </p>
            </form>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.14}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="field-label field-label-night">Email</p>
                <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 font-display text-base font-semibold text-white underline-offset-4 hover:underline">
                  <Mail size={15} aria-hidden />{BRAND.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="field-label field-label-night">Service area</p>
                <p className="inline-flex items-center gap-2 font-display text-base font-semibold text-white">
                  <MapPin size={15} aria-hidden />{BRAND.serviceArea}
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <WhatsAppCTA service="Family Care" label="Or message us directly" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ id, label, required, error, children }: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label field-label-night">
        {label}
        {required && <span className="ml-1 text-[var(--color-blush)]" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-[var(--color-blush)]">{error}</p>}
    </div>
  );
}
