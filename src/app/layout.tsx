import type { Metadata, Viewport } from "next";
import { Quicksand, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/shared/SmoothScroll";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const SITE_URL = "https://sahaya.care";
const DESCRIPTION =
  "SAHAYA provides verified child care and elder care for Indian families — background-checked caregivers, meals, homework, medication reminders and daily family updates.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SAHAYA — Trusted Child Care & Elder Care at Home",
    template: "%s — SAHAYA",
  },
  description: DESCRIPTION,
  keywords: [
    "child care",
    "elder care",
    "caregiver",
    "home care India",
    "verified caregiver",
    "SAHAYA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SAHAYA — Trusted Child Care & Elder Care at Home",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "SAHAYA",
    type: "website",
    locale: "en_IN",
    // Without this, a shared link renders as a bare text card. The hero
    // photograph already carries the brand's warmth and shows a
    // caregiver with both a child and a grandparent.
    images: [
      {
        url: "/images/hero-background.webp",
        width: 1672,
        height: 941,
        alt: "A SAHAYA caregiver with a young child and an elderly grandmother",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAHAYA — Trusted Child Care & Elder Care at Home",
    description: DESCRIPTION,
    images: ["/images/hero-background.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#285A5C",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      // `no-js` is cleared by the inline script below. It is the first of
      // the fail-safes guaranteeing scroll-animated content stays visible
      // even when the JS bundle never arrives.
      className={`no-js ${quicksand.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  var root = document.documentElement;
  // Layer 1: JS is running at all, so the no-js styles can go.
  root.classList.remove('no-js');

  // Layer 3: JS is running, but that does not mean React hydrated.
  // If a chunk 404s or hydration throws, the inline opacity:0 that
  // every scroll-reveal element carries would never be cleared and
  // the page would render as blank ivory. Reveal() sets
  // __sahayaHydrated on mount; if it never appears, reveal the
  // content ourselves. Content still ships in the HTML either way,
  // so this only affects visitors with a broken JS load.
  setTimeout(function () {
    if (window.__sahayaHydrated) return;
    var nodes = document.querySelectorAll('.js-reveal');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.opacity = '1';
      nodes[i].style.transform = 'none';
      nodes[i].style.visibility = 'visible';
    }
  }, 3000);
})();
            `,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-[var(--color-ivory)] antialiased">
        <SmoothScroll />
        {/* Keyboard users can jump straight past the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-teal)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
