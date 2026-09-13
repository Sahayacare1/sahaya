import {
  WHATSAPP_NUMBER,
  WHATSAPP_IS_PLACEHOLDER,
  BRAND,
} from "./constants";

export type WhatsAppEnquiry = {
  service: string;
  name?: string;
  mobile?: string;
  location?: string;
  date?: string;
  startTime?: string;
  duration?: string;
  plan?: string;
  requirement?: string;
};

/**
 * Builds a pre-filled WhatsApp enquiry and opens it in a new tab.
 *
 * The message mirrors the structure the SAHAYA team expects, so an
 * enquiry arriving from the site can be actioned without a follow-up
 * round of questions.
 *
 * Notes on the implementation:
 *  - Only fields the visitor actually filled in are included. An
 *    earlier version printed a bare "-" for every omitted value, so a
 *    one-tap request from the navbar sent five lines of dashes.
 *  - Blank and whitespace-only values count as omitted.
 *  - A placeholder phone number used to fail silently; it now warns
 *    loudly in development.
 *  - The date is formatted for a human reader rather than echoed back
 *    as `YYYY-MM-DD`.
 */
export function buildWhatsAppMessage(data: WhatsAppEnquiry): string {
  const clean = (value?: string) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  };

  const name = clean(data.name);
  const mobile = clean(data.mobile);
  const location = clean(data.location);
  const duration = clean(data.duration);
  const requirement = clean(data.requirement);
  const plan = clean(data.plan);
  const startTime = clean(data.startTime);
  const date = clean(data.date);

  const lines = [`Hello ${BRAND.name},`, ""];

  if (name) lines.push(`I'm ${name}.`);

  lines.push(`I am interested in ${data.service}.`);

  const details: string[] = [];
  if (mobile) details.push(`Mobile: ${mobile}`);
  if (location) details.push(`Location: ${location}`);
  if (date) details.push(`Preferred Date: ${formatDate(date)}`);
  if (startTime) details.push(`Start Time: ${startTime}`);
  if (duration) details.push(`Duration: ${duration}`);
  if (plan) details.push(`Plan: ${plan}`);
  if (requirement) details.push(`Requirement: ${requirement}`);

  if (details.length) lines.push("", ...details);

  lines.push("", "Please contact me regarding caregiver availability.");

  return lines.join("\n");
}

/** `2026-09-15` -> `15 September 2026`. Falls back to the raw string. */
function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;

  const [, year, month, day] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) return iso;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function openWhatsApp(data: WhatsAppEnquiry) {
  if (WHATSAPP_IS_PLACEHOLDER && process.env.NODE_ENV !== "production") {
    console.warn(
      "[SAHAYA] WHATSAPP_NUMBER is still the placeholder " +
        `("${WHATSAPP_NUMBER}"). Every enquiry link is currently dead. ` +
        "Set a real number in src/lib/constants.ts before launch."
    );
  }

  const message = buildWhatsAppMessage(data);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}
