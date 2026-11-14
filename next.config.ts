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
    // Every image in public/images is already generated at its display size
    // (see scripts/optimize-images.mjs). Serving the files directly removes
    // the first-visitor wait for the on-demand image optimizer.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Generated assets have stable, content-specific names: rename a file
        // when its contents change so the immutable cache stays correct.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
