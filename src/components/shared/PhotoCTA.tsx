import Reveal from "@/components/shared/Reveal";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

interface Props {
  title: string;
  sub: string;
  ctaLabel: string;
  service: string;
  image: string;
  /** Darkens the photo so the copy stays legible. */
  overlay?: string;
  tone?: "blush" | "primary";
}

/**
 * Full-bleed photo call-to-action, shared by every inner page.
 *
 * The three copies of this block all set the sub-copy to `text-white/50`
 * on a photo — around 3.1:1 against the mid-tones, under the 4.5:1
 * minimum. The overlay is heavier and the copy is brighter now.
 */
export default function PhotoCTA({
  title,
  sub,
  ctaLabel,
  service,
  image,
  overlay = "rgba(14,37,38,0.82)",
  tone = "blush",
}: Props) {
  return (
    <section className="relative isolate flex min-h-[24rem] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: overlay }} />
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-6">
        <Reveal>
          <h2 className="t-h2 text-white">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="t-lead mx-auto mt-5 max-w-[46ch] text-white/75">{sub}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-9 flex justify-center">
            <WhatsAppCTA
              service={service}
              label={ctaLabel}
              variant={tone}
              className="btn-lg"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
