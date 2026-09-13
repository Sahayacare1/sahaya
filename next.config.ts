import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Without this, Turbopack walks up out of the repo looking for a
  // workspace root (it finds an unrelated package-lock.json in the home
  // directory) and warns on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // All artwork is pre-optimised WebP in /public, so the built-in
    // optimiser would only add a proxy hop.
    formats: ["image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
