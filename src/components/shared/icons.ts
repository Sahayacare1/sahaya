import {
  ShieldCheck,
  Clock,
  Bell,
  Phone,
  RefreshCw,
  Users,
  Fingerprint,
  UserCheck,
  BookOpen,
  ClipboardList,
  LifeBuoy,
  MessageCircle,
  Search,
  HeartHandshake,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * `lib/content.ts` is plain data, so it stores icon *names* rather than
 * component references. That keeps the content module free of React, and
 * — more importantly — lets it be imported by server components without
 * trying to pass a function across the server/client boundary, which
 * React cannot serialise.
 */
export const ICONS = {
  // Why SAHAYA
  shield: ShieldCheck,
  clock: Clock,
  bell: Bell,
  phone: Phone,
  refresh: RefreshCw,
  family: Users,

  // Safety
  id: Fingerprint,
  user: UserCheck,
  book: BookOpen,
  clipboard: ClipboardList,
  headset: LifeBuoy,

  // How it works
  message: MessageCircle,
  search: Search,
  heart: HeartHandshake,
  check: BadgeCheck,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function icon(name: IconName): LucideIcon {
  return ICONS[name];
}
