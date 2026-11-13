import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Test the dev server from a phone on the LAN: Next blocks cross-origin
  // dev assets/endpoints by default, which leaves the page un-hydrated
  // (no canvas, no typing effect) when opened via the machine's LAN IP.
  allowedDevOrigins: ["192.168.1.15", "192.168.*.*", "10.*.*.*"],
  images: {
    qualities: [75, 95],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
