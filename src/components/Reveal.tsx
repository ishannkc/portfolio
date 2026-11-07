"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

const REVEAL_THRESHOLD = 0.15;
const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px";

// useLayoutEffect warns during server rendering, so fall back to useEffect
// there. The hidden state is applied before paint in the browser.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in milliseconds. */
  delay?: number;
  /** Upward drift distance, in pixels. */
  distance?: number;
  style?: CSSProperties;
}

/**
 * Reveals its children once when they scroll into view.
 *
 * The hidden start state is only added after JavaScript mounts, so the content
 * stays fully visible without JS. Blocks already on screen at load are left
 * alone rather than animated, keeping the first screen calm.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    // If the block is already visible on load, skip the animation entirely.
    const rect = element.getBoundingClientRect();
    const isOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isOnScreen) setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: REVEAL_ROOT_MARGIN,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [armed]);

  const revealStyle = {
    "--reveal-delay": `${Math.max(0, delay)}ms`,
    "--reveal-distance": `${distance}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "reveal",
        armed && !shown && "reveal-pending",
        shown && "reveal-in",
        className,
      )}
      ref={ref}
      style={revealStyle}
    >
      {children}
    </div>
  );
}
