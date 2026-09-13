/**
 * SAHAYA — site content.
 *
 * Single source of truth for every piece of copy that appears in more
 * than one place. Components read from here so the home page, the
 * service pages and the pricing page can never drift apart.
 *
 * ─────────────────────────────────────────────────────────────────
 * CLIENT GUARDRAILS — do not weaken these without written confirmation
 * ─────────────────────────────────────────────────────────────────
 *
 * 1. LIVE CARE / "WITH CAM" — the client has not confirmed how the
 *    monitoring feature will actually work. Nothing here may promise
 *    camera, video or live streaming. It is described only as enhanced
 *    visibility and more frequent updates, with an explicit note that
 *    the exact features are confirmed before launch.
 *
 * 2. VERIFICATION CLAIMS — the client's instruction is to "only display
 *    a verification claim publicly after the business actually performs
 *    it". Every safety string therefore uses hedged, process-based
 *    wording ("can be completed", "as per SAHAYA's onboarding process",
 *    "where applicable") rather than absolute claims.
 *
 * 3. PRICING — Daily / Weekly / Monthly hours are not yet defined, so
 *    the indicative-pricing disclaimer must stay visible next to any
 *    price table.
 *
 * 4. SCOPE — SAHAYA is non-medical. The scope note in BRAND.scopeNote
 *    must remain visible on the service pages and in the footer.
 */

/* ============================================================
   SERVICES
   ============================================================ */

export const CHILD_CARE = {
  slug: "/child-care",
  name: "Child Care",
  /** Hero + card headline. */
  headline: "Trusted care for your child, right at home.",
  short: "Supervision, meals, homework and play — a trusted hand at home.",
  heroLines: [
    { text: "Your child is safe." },
    { text: "You can focus.", accent: true },
  ],
  supporting:
    "Whether you're at work, travelling or simply need an extra pair of caring hands, SAHAYA helps ensure your child is safe, comfortable and cared for.",
  /** Full service list, grouped for readability. */
  serviceGroups: [
    {
      title: "Supervision & safety",
      items: [
        "Child supervision",
        "Babysitting",
        "Play and activity supervision",
        "Temporary child care",
      ],
    },
    {
      title: "Daily routine",
      items: [
        "Meal and snack assistance",
        "Homework routine support",
        "Bedtime routine support",
      ],
    },
    {
      title: "Flexible duration",
      items: ["Full-day care", "Weekly care", "Monthly care", "Working-parent support"],
    },
  ],
  /** Who this is for. */
  forWho: [
    {
      title: "Working parents",
      body: "You leave for work before your child wakes and get home after their bedtime.",
    },
    {
      title: "Parents who travel",
      body: "A work trip or family emergency, and you need someone dependable within hours.",
    },
    {
      title: "Families with a gap to fill",
      body: "School holidays, a sick day, or a gap between school ending and you getting home.",
    },
  ],
} as const;

export const ELDER_CARE = {
  slug: "/elder-care",
  name: "Elder Care",
  headline: "Care for your parents, even when you're away.",
  short:
    "Companionship, medication reminders, meals and mobility support — so your parents are never alone.",
  heroLines: [
    { text: "Your parent deserves" },
    { text: "warm company.", accent: true },
  ],
  supporting:
    "SAHAYA helps families make sure their elderly parents have companionship, everyday assistance and someone dependable by their side.",
  serviceGroups: [
    {
      title: "Companionship",
      items: [
        "Companionship",
        "Family updates",
        "Temporary elder care",
        "Full-day support",
      ],
    },
    {
      title: "Daily assistance",
      items: [
        "Meal assistance",
        "Walking support",
        "Daily routine assistance",
        "Medication reminders",
      ],
    },
    {
      title: "Appointments & errands",
      items: [
        "Doctor appointment companionship",
        "Hospital visit companionship",
        "Grocery and essential assistance",
        "Weekly and monthly support",
      ],
    },
  ],
  forWho: [
    {
      title: "Working sons and daughters",
      body: "You need someone to assist your parents during your working hours.",
    },
    {
      title: "Families living in another city",
      body: "You want dependable, verified support for parents who live far from you.",
    },
    {
      title: "NRI families",
      body: "You live overseas and need a trusted local point of care for your parents in India.",
    },
  ],
} as const;

/* ============================================================
   CARE PLANS
   ============================================================ */

/**
 * Two tiers. `Live Care` deliberately does NOT mention cameras or
 * streaming — see guardrail 1 at the top of this file.
 */
export const CARE_PLANS = [
  {
    id: "standard",
    name: "Standard Care",
    tagline: "Dependable caregiving support",
    description:
      "For families who need reliable, everyday caregiving support at home.",
    features: [
      "A suitable caregiver assigned to your family",
      "Care delivered according to your instructions",
      "Check-in and check-out recorded",
      "Basic care updates during the session",
      "SAHAYA support for questions and coordination",
      "Replacement assistance if a caregiver becomes unavailable, subject to availability",
    ],
    highlighted: false,
  },
  {
    id: "live",
    name: "SAHAYA Live Care",
    tagline: "Greater visibility and reassurance",
    description:
      "For families who want a higher level of visibility into the care session.",
    features: [
      "Everything included in Standard Care",
      "More frequent family updates through the day",
      "An enhanced care timeline for each session",
      "Priority coordination with the SAHAYA team",
    ],
    /**
     * Mandatory qualifier. Do not remove and do not replace with a
     * camera or streaming claim.
     */
    caveat:
      "Exact Live Care features are confirmed by the SAHAYA team before your care begins.",
    highlighted: true,
  },
] as const;

/* ============================================================
   PRICING
   ============================================================ */

export interface PriceRow {
  duration: string;
  /** Undefined for Daily / Weekly / Monthly until the client confirms hours. */
  hours?: string;
  standard: number;
  live: number;
  /** Flagged so the UI can mark the rows whose scope is not yet defined. */
  needsConfirmation?: boolean;
}

export const PRICING: {
  service: string;
  slug: string;
  rows: PriceRow[];
}[] = [
  {
    service: "Child Care",
    slug: "/child-care",
    rows: [
      { duration: "3 Hours", hours: "3 hrs", standard: 749, live: 999 },
      { duration: "6 Hours", hours: "6 hrs", standard: 1249, live: 1499 },
      { duration: "9 Hours", hours: "9 hrs", standard: 1749, live: 1999 },
      { duration: "12 Hours", hours: "12 hrs", standard: 2249, live: 2499 },
      { duration: "Daily", standard: 3449, live: 3999, needsConfirmation: true },
      { duration: "Weekly", standard: 9449, live: 12999, needsConfirmation: true },
      { duration: "Monthly", standard: 19449, live: 25999, needsConfirmation: true },
    ],
  },
  {
    service: "Elder Care",
    slug: "/elder-care",
    rows: [
      { duration: "3 Hours", hours: "3 hrs", standard: 1149, live: 1299 },
      { duration: "6 Hours", hours: "6 hrs", standard: 1649, live: 1799 },
      { duration: "9 Hours", hours: "9 hrs", standard: 2149, live: 2299 },
      { duration: "12 Hours", hours: "12 hrs", standard: 2649, live: 2799 },
      { duration: "Daily", standard: 4449, live: 4599, needsConfirmation: true },
      { duration: "Weekly", standard: 12449, live: 15999, needsConfirmation: true },
      { duration: "Monthly", standard: 24449, live: 29999, needsConfirmation: true },
    ],
  },
];

/**
 * Must remain visible wherever a price is displayed — the Daily, Weekly
 * and Monthly rows do not yet have defined hours.
 */
export const PRICING_NOTE =
  "Pricing shown is indicative. Final availability and service details are confirmed by the SAHAYA team.";

export const PRICING_NOTE_DETAIL =
  "Daily, weekly and monthly plan hours are confirmed at the time of booking.";

/* ============================================================
   WHY FAMILIES CHOOSE SAHAYA
   ============================================================ */

export const WHY_SAHAYA = [
  {
    icon: "shield" as const,
    title: "Trusted care",
    body: "Caregivers go through the verification and selection process defined by SAHAYA.",
  },
  {
    icon: "clock" as const,
    title: "Flexible duration",
    body: "Choose care for a few hours, a full day, or longer periods.",
  },
  {
    icon: "bell" as const,
    title: "Family updates",
    body: "Stay informed about important moments during the care session.",
  },
  {
    icon: "phone" as const,
    title: "Human support",
    body: "Families have a SAHAYA contact for assistance and coordination.",
  },
  {
    icon: "refresh" as const,
    title: "Replacement support",
    body: "If the assigned caregiver becomes unavailable, SAHAYA can help arrange an alternative, subject to availability.",
  },
  {
    icon: "family" as const,
    title: "Child and elder care",
    body: "One trusted brand for two of the most important people in a family — children and parents.",
  },
];

/* ============================================================
   SAFETY
   All wording is process-based and hedged, per guardrail 2.
   ============================================================ */

export const SAFETY_POINTS = [
  {
    icon: "id" as const,
    area: "Identity verification",
    copy: "Caregiver identity details are verified as per SAHAYA's onboarding process.",
  },
  {
    icon: "shield" as const,
    area: "Background verification",
    copy: "Background checks can be completed before caregiver activation.",
  },
  {
    icon: "user" as const,
    area: "Interview",
    copy: "Caregivers are personally assessed before onboarding.",
  },
  {
    icon: "phone" as const,
    area: "Reference checks",
    copy: "Previous work references can be reviewed where applicable.",
  },
  {
    icon: "book" as const,
    area: "Orientation",
    copy: "Caregivers receive guidance on SAHAYA service standards.",
  },
  {
    icon: "clipboard" as const,
    area: "Family instructions",
    copy: "Care is provided according to the family's agreed requirements.",
  },
  {
    icon: "refresh" as const,
    area: "Replacement support",
    copy: "SAHAYA assists when a scheduled caregiver becomes unavailable.",
  },
  {
    icon: "headset" as const,
    area: "Support",
    copy: "Families have a SAHAYA point of contact for assistance.",
  },
];

/* ============================================================
   CARE TIMELINE
   ============================================================ */

export const CARE_TIMELINE = {
  elder: {
    label: "Elder care",
    entries: [
      { time: "09:02 AM", label: "Caregiver arrived", done: true },
      { time: "09:45 AM", label: "Breakfast completed", done: true },
      { time: "10:30 AM", label: "Morning walk completed", done: true },
      { time: "12:30 PM", label: "Medication reminder", done: true },
      { time: "01:15 PM", label: "Lunch completed", done: true },
      { time: "03:00 PM", label: "Care completed", done: false },
    ],
    note: "Everything is going well. Your parent is comfortable and active today.",
    noteLabel: "Caregiver note",
  },
  child: {
    label: "Child care",
    entries: [
      { time: "09:00 AM", label: "Care started", done: true },
      { time: "09:30 AM", label: "Breakfast", done: true },
      { time: "10:30 AM", label: "Play activity", done: true },
      { time: "12:30 PM", label: "Lunch", done: true },
      { time: "01:30 PM", label: "Nap", done: true },
      { time: "03:00 PM", label: "Care completed", done: false },
    ],
    note: "She finished her homework and asked for more!",
    noteLabel: "Today's highlight",
  },
} as const;

/* ============================================================
   TARGET CUSTOMERS
   ============================================================ */

export const TARGET_CUSTOMERS = [
  {
    title: "Working parents",
    body: "Parents who need temporary or regular child-care support while working.",
  },
  {
    title: "Working sons and daughters",
    body: "Adults who need someone to assist elderly parents during work hours.",
  },
  {
    title: "Families living away",
    body: "Children living in another city or state who want dependable support for their parents.",
  },
  {
    title: "NRI families",
    body: "Families living overseas who need trusted local support for parents in India.",
  },
  {
    title: "Temporary care needs",
    body: "Support during travel, work, events, hospital visits, emergencies or a caregiver's absence.",
  },
];

/* ============================================================
   HOW IT WORKS
   ============================================================ */

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    icon: "message" as const,
    title: "Choose care",
    body: "Pick Child Care or Elder Care, and the plan that suits your family.",
  },
  {
    n: "02",
    icon: "clipboard" as const,
    title: "Tell us what you need",
    body: "Share the type of care, date, start time, duration, location and any special requirements.",
  },
  {
    n: "03",
    icon: "search" as const,
    title: "We review your request",
    body: "The SAHAYA team checks your requirement and caregiver availability.",
  },
  {
    n: "04",
    icon: "user" as const,
    title: "A suitable caregiver",
    body: "A caregiver is arranged based on availability and your care requirements.",
  },
  {
    n: "05",
    icon: "heart" as const,
    title: "Care begins",
    body: "The caregiver arrives and begins the scheduled care session.",
  },
  {
    n: "06",
    icon: "bell" as const,
    title: "Stay reassured",
    body: "Families receive relevant updates throughout the care period.",
  },
  {
    n: "07",
    icon: "check" as const,
    title: "Care completed",
    body: "The session finishes, and you can share feedback or request care again.",
  },
];

/**
 * Condensed process for the home page — the same journey, without
 * asking a first-time visitor to read all seven steps. The full
 * sequence lives on /how-it-works.
 */
export const HOW_IT_WORKS_SHORT = [
  {
    n: "01",
    icon: "message" as const,
    title: "Request care",
    body: "Send one WhatsApp message. Tell us who needs care, when, and where.",
    tag: "Takes 2 minutes",
    image: "/images/hero-family.webp",
    alt: "A caregiver playing with a young child on the living-room floor",
  },
  {
    n: "02",
    icon: "search" as const,
    title: "We check availability",
    body: "Our team reviews your requirement and confirms caregiver availability.",
    tag: "Same-day reply",
    image: "/images/trust-caregiver.webp",
    alt: "A uniformed SAHAYA caregiver waving while holding a child's hand",
  },
  {
    n: "03",
    icon: "heart" as const,
    title: "Care begins",
    body: "Your caregiver arrives and starts the scheduled session on time.",
    tag: "Always on schedule",
    image: "/images/child-day.webp",
    alt: "A caregiver helping a child with homework at a table",
  },
  {
    n: "04",
    icon: "bell" as const,
    title: "Stay reassured",
    body: "You receive relevant updates through the care period, and support if you need it.",
    tag: "Updates through the day",
    image: "/images/hero-elder.webp",
    alt: "A caregiver holding an elderly grandmother's hands",
  },
];

/* ============================================================
   FAQ
   ============================================================ */

export const FAQS = [
  {
    q: "What services does SAHAYA provide?",
    a: "SAHAYA provides Child Care and non-medical Elder Care services for families who need trusted support at home.",
  },
  {
    q: "Can I choose the duration?",
    a: "Yes. Current plans include 3, 6, 9 and 12-hour options, along with Daily, Weekly and Monthly care plans.",
  },
  {
    q: "How do I request care?",
    a: "Select your service and requirements on the website and submit the enquiry. You'll be redirected to WhatsApp, where the SAHAYA team can confirm availability.",
  },
  {
    q: "Is the booking immediately confirmed?",
    a: "No. A care request is confirmed after SAHAYA checks caregiver availability and your requirements.",
  },
  {
    q: "Can I request a particular language?",
    a: "You can share your preferred language and SAHAYA will try to match accordingly, based on availability.",
  },
  {
    q: "What is Live Care?",
    a: "Live Care is intended to offer a higher level of family visibility and updates. The exact features will be confirmed by the SAHAYA team before launch.",
  },
  {
    q: "Does SAHAYA provide medical treatment?",
    a: "SAHAYA's current focus is non-medical personal care, companionship and routine assistance, unless qualified medical services are separately introduced.",
  },
  {
    q: "What areas do you serve?",
    a: "We currently serve Hyderabad. Message us on WhatsApp to check availability in your area.",
  },
  {
    q: "Can I request the same caregiver?",
    a: "Yes. We try to keep the same caregiver with your family so a trusted relationship can build over time, subject to availability.",
  },
  {
    q: "What if I need to cancel?",
    a: "Message us on WhatsApp as early as you can. We'll work with you to reschedule.",
  },
];

/* ============================================================
   ABOUT
   ============================================================ */

export const ABOUT = {
  about: [
    "SAHAYA was created around a simple idea — families should have dependable support when they cannot personally be there for the people they love.",
    "Whether it is a child who needs supervision while parents are working, or an elderly parent who needs companionship and everyday assistance, SAHAYA aims to make care easier, safer and more reassuring for families.",
    "Our goal is not simply to provide caregivers. Our goal is to become a trusted family-care partner families can depend on.",
  ],
  mission:
    "To make trusted family care simple, accessible and dependable for every family that needs an extra helping hand.",
  vision:
    "To become a trusted family-care network that helps people care for their children and parents wherever life takes them.",
};

/** Short lines usable as section accents. Kept here so they stay consistent. */
export const MARKETING_LINES = {
  primary: "Care for the ones who matter most.",
  away: "You may be away. Your care doesn't have to be.",
  trust: "Someone you trust. Someone who cares.",
  worry: "Because being away shouldn't mean being worried.",
  generations: "Trusted support for every generation.",
  close: "From your child to your parents, care is always close.",
  peace: "More than a caregiver. Peace of mind for the family.",
};

/** Formatting helper — Indian digit grouping, no decimals. */
export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
