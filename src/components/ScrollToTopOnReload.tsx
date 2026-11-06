"use client";

import { useEffect } from "react";

const SCROLL_KEY = "portfolio:scroll-y";

function readSavedScroll() {
  try {
    return Number(window.sessionStorage.getItem(SCROLL_KEY) ?? "0") || 0;
  } catch {
    return 0;
  }
}

/**
 * On a reload, glide back to the top of the page from wherever the visitor
 * had scrolled to. Fresh visits and client-side navigations are untouched,
 * and reduced-motion users jump straight to the top.
 */
export function ScrollToTopOnReload() {
  useEffect(() => {
    const saveScroll = () => {
      try {
        window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      } catch {
        // sessionStorage can be unavailable in private modes.
      }
    };

    window.addEventListener("pagehide", saveScroll);

    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navigation?.type === "reload";
    const saved = readSavedScroll();

    if (!isReload || saved <= 0) {
      return () => window.removeEventListener("pagehide", saveScroll);
    }

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousBehavior = root.style.scrollBehavior;
    const previousRestoration =
      "scrollRestoration" in history ? history.scrollRestoration : null;

    // Keep the browser from fighting our animation with its own restore.
    root.style.scrollBehavior = "auto";
    if (previousRestoration !== null) history.scrollRestoration = "manual";

    let raf = 0;

    const restore = () => {
      root.style.scrollBehavior = previousBehavior;
      if (previousRestoration !== null) {
        history.scrollRestoration = previousRestoration;
      }
    };

    const animate = () => {
      const from = Math.max(window.scrollY, saved);

      if (from <= 0) {
        restore();
        return;
      }

      if (reduced) {
        window.scrollTo(0, 0);
        restore();
        return;
      }

      // Start from the saved position instantly, then hand the upward glide
      // to the browser's compositor-driven smooth scrolling (much smoother
      // than scrolling frame by frame from JavaScript).
      window.scrollTo(0, from);
      restore();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onLoad = () => {
      raf = requestAnimationFrame(animate);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pagehide", saveScroll);
      window.removeEventListener("load", onLoad);
      restore();
    };
  }, []);

  return null;
}
  