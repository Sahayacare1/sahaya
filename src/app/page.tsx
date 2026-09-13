import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import ServiceSelector from "@/components/home/ServiceSelector";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import CareTimeline from "@/components/shared/CareTimeline";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import TargetCustomers from "@/components/shared/TargetCustomers";
import CarePlans from "@/components/shared/CarePlans";
import PricingPreview from "@/components/home/PricingPreview";
import SafetyGrid from "@/components/shared/SafetyGrid";
import Testimonials from "@/components/home/Testimonials";
import StatsStrip from "@/components/home/StatsStrip";
import FaqAccordion from "@/components/shared/FaqAccordion";
import FinalCTA from "@/components/home/FinalCTA";

/**
 * Home.
 *
 * Section order follows the client's specified homepage structure —
 * hero, service selector, how it works, care timeline, why SAHAYA,
 * safety, care plans, WhatsApp CTA — with pricing preview, target
 * customers and an FAQ added to answer objections before the close.
 *
 * The light/dark rhythm is deliberate. Two dark sections never sit
 * adjacent without a seam, and consecutive light sections alternate
 * between `--color-ivory` and the deeper `--color-ivory-deep` so they
 * read as separate blocks rather than one long band:
 *
 *   1. Hero              dark   (photographic)
 *   2. Marquee           dark   — continues the hero by design
 *   3. ServiceSelector   ivory
 *   4. WhyChooseUs       ivory
 *   5. CareTimeline      dark   — the session demo
 *   6. HowItWorksPreview teal-deep, seam-separated from 5
 *   7. TargetCustomers   ivory-deep
 *   8. CarePlans         ivory-deep
 *   9. PricingPreview    ivory
 *  10. SafetyGrid        ivory
 *  11. Testimonials      ivory-deep
 *  12. StatsStrip        dark
 *  13. FaqAccordion      ivory
 *  14. FinalCTA          teal
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServiceSelector />
      <WhyChooseUs />
      <CareTimeline />
      <HowItWorksPreview />
      <TargetCustomers />
      <CarePlans />
      <PricingPreview />
      <SafetyGrid />
      <Testimonials />
      <StatsStrip />
      <FaqAccordion limit={6} />
      <FinalCTA />
    </>
  );
}
