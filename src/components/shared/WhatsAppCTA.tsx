"use client";

import { ArrowRight } from "lucide-react";
import { openWhatsApp, type WhatsAppEnquiry } from "@/lib/whatsapp";

interface Props extends WhatsAppEnquiry {
  label?: string;
  variant?: "primary" | "outline" | "blush" | "ghost";
  className?: string;
}

/**
 * The site's primary conversion action.
 *
 * Fixes: no `type="button"` (so it could submit an ancestor form), and
 * no accessible description of where the action leads.
 */
export default function WhatsAppCTA({
  label = "Request care",
  variant = "primary",
  className = "",
  ...enquiry
}: Props) {
  const base =
    variant === "primary" ? "btn btn-primary" :
    variant === "blush"   ? "btn btn-blush" :
    variant === "ghost"   ? "btn btn-ghost" :
                            "btn btn-outline";

  return (
    <button
      type="button"
      onClick={() => openWhatsApp(enquiry)}
      className={`${base} ${className}`}
      // The visible label is a verb; this spells out the destination so
      // the action is unambiguous when announced out of context.
      aria-label={`${label} — opens WhatsApp in a new tab`}
    >
      {label}
      <ArrowRight size={16} className="btn-arrow" aria-hidden />
    </button>
  );
}
