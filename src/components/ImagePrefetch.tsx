"use client";

import { useEffect } from "react";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";
import { research } from "@/data/research";

/**
 * Warms the browser cache for the stills further down the page after the
 * initial load settles. They are already display-sized WebPs, so this costs a
 * few hundred KB and removes the placeholder delay for visitors who scroll
 * straight away. Skipped on save-data and very slow connections.
 */
const urls = Array.from(
  new Set([
    research.paperPreview.src,
    "/images/stamp-cropped-224.webp",
    ...certifications.items.map((item) => item.image.src),
    ...projects.items.map((item) => item.image.src),
  ]),
);

export function ImagePrefetch() {
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) {
      return;
    }

    let timer = 0;
    const warm = () => {
      timer = window.setTimeout(() => {
        for (const url of urls) {
          const image = new window.Image();
          image.decoding = "async";
          image.fetchPriority = "low";
          image.src = url;
        }
      }, 600);
    };

    if (document.readyState === "complete") {
      warm();
    } else {
      window.addEventListener("load", warm, { once: true });
    }

    return () => {
      window.removeEventListener("load", warm);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
