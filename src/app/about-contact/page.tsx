import type { Metadata } from "next";
import AboutContactClient from "./AboutContactClient";

export const metadata: Metadata = {
  // The root layout adds the "— SAHAYA" suffix via its title template,
  // so the suffix is not repeated here.
  title: "About & Contact",
  description:
    "SAHAYA's mission is trusted, verified care for every Indian family. Send an enquiry and we'll open WhatsApp with your details ready to send.",
  alternates: { canonical: "/about-contact" },
};

export default function AboutContactPage() {
  return <AboutContactClient />;
}
