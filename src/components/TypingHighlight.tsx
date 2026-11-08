"use client";

import { useEffect, useRef } from "react";

interface TypingHighlightProps {
  text: string;
  className?: string;
}

const TYPE_START_MS = 300;
const TYPE_BASE_MS = 75;
const TYPE_VARIATION_MS = 50;

/**
 * Types a single word one character at a time. The full word is rendered by
 * the parent as visually hidden text, so the content stays in the HTML.
 */
export function TypingHighlight({ text, className }: TypingHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }

    el.textContent = "";

    let i = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) return;
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
  }, [text]);

  return <span className={className} ref={ref} />;
}
