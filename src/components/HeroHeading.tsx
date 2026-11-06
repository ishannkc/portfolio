"use client";

import { useEffect, useRef } from "react";

interface HeroHeadingProps {
  before: string;
  highlight: string;
  after: string;
}

const TYPE_START_MS = 300;
const TYPE_BASE_MS = 75;
const TYPE_VARIATION_MS = 50;

/**
 * Hero heading that types only the highlighted name, one character at a time,
 * while the surrounding greeting stays visible. Falls back to the full text
 * when the user prefers reduced motion.
 */
export function HeroHeading({ before, highlight, after }: HeroHeadingProps) {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = highlight;
      return;
    }

    el.textContent = "";

    let i = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      i += 1;
      el.textContent = highlight.slice(0, i);
      if (i >= highlight.length) return;
      timer = setTimeout(
        step,
        TYPE_BASE_MS + Math.random() * TYPE_VARIATION_MS,
      );
    };

    timer = setTimeout(step, TYPE_START_MS);

    return () => {
      if (timer) clearTimeout(timer);
      // Reset so a Strict Mode re-run starts from a clean slate.
      el.textContent = "";
    };
  }, [highlight]);

  return (
    <h1
      aria-label={`${before}${highlight}${after}`}
      className="mb-space-md min-h-[1.15em] font-display-hero text-[3.4rem] font-bold leading-none tracking-tight text-[#3B2A20] md:text-[4.1rem]"
    >
      <span>{before}</span>
      <span className="font-extrabold text-[#800020]" ref={highlightRef} />
      <span>{after}</span>
      <span aria-hidden="true" className="hero-cursor" />
    </h1>
  );
}
