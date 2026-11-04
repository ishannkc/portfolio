"use client";

import { useEffect, useRef, useState } from "react";
import DotImage from "@/lib/DotImage";
import { cn } from "@/lib/cn";

interface DotPortraitProps {
  className?: string;
  src?: string;
  alt?: string;
}

/**
 * Interactive "particle dot" portrait. Renders the supplied transparent PNG
 * as a grid of dots that ripple and repel from the cursor.
 */
export function DotPortrait({
  className,
  src = "/images/profile.png",
  alt = "Portrait of Ishan",
}: DotPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas.getContext("2d")) {
      setFailed(true);
      return;
    }

    const fx = new DotImage(canvas, src, {
      rgb: [128, 0, 32], // site accent: #800020 burgundy
      onError: () => setFailed(true),
    });

    return () => fx.destroy();
  }, [src, failed]);

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fallback when canvas or image loading fails
      <img
        alt={alt}
        className={cn("block h-full w-full object-cover object-bottom", className)}
        src={src}
      />
    );
  }

  return (
    <canvas
      aria-label={alt}
      className={cn("block aspect-[1379/1678] w-full cursor-none", className)}
      ref={canvasRef}
      role="img"
    />
  );
}
