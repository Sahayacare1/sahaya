import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ServiceList from "@/components/shared/ServiceList";
import ForWho from "@/components/shared/ForWho";
import CareTimeline from "@/components/shared/CareTimeline";
import CarePlans from "@/components/shared/CarePlans";
import PricingTable from "@/components/shared/PricingTable";
import SafetyGrid from "@/components/shared/SafetyGrid";
import FaqAccordion from "@/components/shared/FaqAccordion";
import PhotoCTA from "@/components/shared/PhotoCTA";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { ELDER_CARE } from "@/lib/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Elder Care",
  description:
    "Compassionate, non-medical elder care in Hyderabad — companionship, meal assistance, walking support, medication reminders and appointment companionship.",
  alternates: { canonical: "/elder-care" },
};

export default function ElderCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Elder care"
        lines={[
          { text: "Your parent deserves" },
          { text: "warm company.", accent: true },
        ]}
        sub={ELDER_CARE.supporting}
        image="/images/elder-care.webp"
        imagePosition="center 30%"
        scrimFrom="#2a1a1c"
      >
        <WhatsAppCTA service="Elder Care" label="Enquire about elder care" />
        <a href="#pricing" className="btn btn-ghost">
          See pricing
        </a>
      </PageHero>

      <ServiceList
        eyebrow="What we offer"
        title="Companionship and everyday support,"
        titleAccent="never alone."
        groups={ELDER_CARE.serviceGroups}
        tone="blush"
        note={BRAND.scopeNote}
      />

      <ForWho
        eyebrow="Who it's for"
        title="For families who live further away than they'd like."
        items={ELDER_CARE.forWho}
        tone="blush"
      />

      <CareTimeline />

      <CarePlans />

      <PricingTable only="Elder Care" />

      <SafetyGrid />

      <FaqAccordion limit={6} />

      <PhotoCTA
        title="They deserve the best care."
        sub="Message us on WhatsApp and we'll check caregiver availability for your parent."
        ctaLabel="Request elder care"
        service="Elder Care"
        image="/images/hero-elder.webp"
        overlay="rgba(42,26,28,0.82)"
      />
    </>
  );
}
