"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

interface CopyEmailButtonProps {
  email: string;
  label: string;
  copiedLabel: string;
}

export function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      className="w-full sm:w-auto"
      onClick={handleCopy}
      size="lg"
      variant="secondary"
    >
      <span aria-atomic="true" aria-live="polite">
        {copied ? copiedLabel : label}
      </span>
      <span aria-hidden="true">📋</span>
    </Button>
  );
}
