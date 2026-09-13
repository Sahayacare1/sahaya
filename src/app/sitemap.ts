import type { MetadataRoute } from "next";

const SITE_URL = "https://sahaya.care";

/**
 * Static sitemap.
 *
 * All six routes are prerendered, so there is nothing dynamic to
 * enumerate. `lastModified` is intentionally omitted rather than set to
 * `new Date()` — a build-time timestamp changes on every deploy even
 * when the content has not, which teaches crawlers to distrust it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/child-care", priority: 0.9 },
    { path: "/elder-care", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/how-it-works", priority: 0.7 },
    { path: "/about-contact", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
