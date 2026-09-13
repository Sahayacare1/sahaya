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
import { CHILD_CARE } from "@/lib/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Child Care",
  description:
    "Trusted in-home child care in Hyderabad — supervision, babysitting, meals, homework and bedtime routines, for working parents and travelling families.",
  alternates: { canonical: "/child-care" },
};

export default function ChildCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Child care"
        lines={[
          { text: "Your child is safe." },
          { text: "You can focus.", accent: true },
        ]}
        sub={CHILD_CARE.supporting}
        image="/images/child-care.webp"
        imagePosition="center 35%"
        scrimFrom="var(--color-teal-ink)"
      >
        <WhatsAppCTA service="Child Care" label="Enquire about child care" />
        <a href="#pricing" className="btn btn-ghost">
          See pricing
        </a>
      </PageHero>

      <ServiceList
        eyebrow="What we offer"
        title="Everything your child needs,"
        titleAccent="in one place."
        groups={CHILD_CARE.serviceGroups}
        tone="teal"
        note={BRAND.scopeNote}
      />

      <ForWho
        eyebrow="Who it's for"
        title="For parents who can't always be there."
        items={CHILD_CARE.forWho}
        tone="teal"
      />

      <CareTimeline />

      <CarePlans />

      <PricingTable only="Child Care" />

      <SafetyGrid />

      <FaqAccordion limit={6} />

      <PhotoCTA
        title="Ready to arrange child care?"
        sub="Send us your dates and requirements on WhatsApp, and we'll confirm caregiver availability."
        ctaLabel="Request child care"
        service="Child Care"
        image="/images/story-dropoff.webp"
        overlay="rgba(14,37,38,0.8)"
      />
    </>
  );
}
