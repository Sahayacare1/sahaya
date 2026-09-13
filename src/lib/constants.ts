/**
 * ⚠️ PLACEHOLDER — REPLACE BEFORE LAUNCH
 *
 * `919999999999` is not a real number. Every "Request care" button on the
 * site builds a `wa.me` link from this value, so while it is a placeholder
 * all of them open an empty chat with nobody. `openWhatsApp()` logs a
 * loud warning in development to make sure this is not missed.
 *
 * Format: country code + number, digits only. No `+`, spaces or dashes.
 * Example: "919876543210" for +91 98765 43210.
 */
export const WHATSAPP_NUMBER = "919999999999";

/** True while the number above is still the placeholder. */
export const WHATSAPP_IS_PLACEHOLDER = WHATSAPP_NUMBER === "919999999999";

export const BRAND = {
  name: "SAHAYA",
  /** Primary tagline. */
  tagline: "When You Can't Be There, SAHAYA Can.",
  /**
   * Short lockup used where the full tagline is too long (navbar, footer).
   * Aligned with the official logo lockup, which reads "Support. Care. Together."
   */
  promise: "Support. Care. Together.",
  supporting:
    "Trusted care for children and elderly family members when you cannot personally be there.",
  cta: "Request care",
  email: "hello@sahaya.care",
  /** The only market currently served — keep consistent with the FAQ. */
  city: "Hyderabad",
  serviceArea: "Hyderabad, India",
  /**
   * Scope statement. The client requires this be visible, so it appears
   * in the footer and on both service pages.
   */
  scopeNote:
    "SAHAYA currently provides non-medical personal care and companionship services unless otherwise specified.",
  /** Path to the brand logo (with tagline baked in, transparent background). */
  logo: "/images/sahaya-logo.webp",
} as const;

export const NAV_LINKS = [
  { label: "Child care", href: "/child-care" },
  { label: "Elder care", href: "/elder-care" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about-contact" },
] as const;

/**
 * Headline figures, kept in one place so the home page and any future
 * page cannot drift apart. These must stay consistent with the FAQ copy.
 */
export const STATS = [
  { value: 500, suffix: "+", label: "Families served" },
  { value: 98, suffix: "%", label: "Satisfaction rate" },
  { value: 200, suffix: "+", label: "Verified caregivers" },
  { value: 24, suffix: "h", label: "Average match time" },
] as const;
