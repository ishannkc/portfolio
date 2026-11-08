"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hashToPath, isKnownHash } from "@/lib/hash-routes";

/**
 * Catches unknown fragments such as `/#projects/hi` after the page has
 * hydrated (address-bar edits, back/forward, stray links) and hands them to
 * Next.js as real paths so the Not Found page renders.
 */
export function HashRouteGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    const check = () => {
      const { hash } = window.location;

      if (hash && !isKnownHash(hash)) {
        router.replace(hashToPath(hash));
      }
    };

    check();
    window.addEventListener("hashchange", check);

    return () => window.removeEventListener("hashchange", check);
  }, [pathname, router]);

  return null;
}
