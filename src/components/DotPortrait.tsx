"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { blurData } from "@/data/blur";
import DotImage from "@/lib/DotImage";
import { cn } from "@/lib/cn";

interface DotPortraitProps {
  className?: string;
  src?: string;
  alt?: string;
}

/**
 * Interactive "particle dot" portrait. Renders the supplied transparent image
 * as a grid of dots that ripple and repel from the cursor.
 *
 * The still is server-rendered (and preloaded) underneath the canvas so the
 * hero is never an empty box; it cross-fades out once the first dot frame is
 * drawn.
 */
export function DotPortrait({
  className,
  src = "/images/profile-particle.webp",
  alt = "Portrait of Ishan",
}: DotPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas.getContext("2d")) {
      setFailed(true);
      return;
    }

    const fx = new DotImage(canvas, src, {
      rgb: [128, 0, 32], // site accent: #800020 burgundy
      onError: () => setFailed(true),
      onReady: handleReady,
    });

    return () => fx.destroy();
  }, [src, failed, handleReady]);

  if (failed) {
    return (
      <div className={cn("relative aspect-[1379/1678] w-full", className)}>
        <Image
          alt={alt}
          className="select-none object-contain"
          fill
          sizes="(max-width: 1024px) 60vw, 370px"
          src={src}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[1379/1678] w-full", className)}>
      <canvas
        aria-label={alt}
        className="absolute inset-0 block h-full w-full cursor-none"
        ref={canvasRef}
        role="img"
      />

      {/* Static poster: matches DotImage's 4% padding, then fades away. */}
      <Image
        alt=""
        aria-hidden="true"
        blurDataURL={blurData.profileParticle}
        className={cn(
          "pointer-events-none absolute inset-[4%] h-[92%] w-[92%] select-none object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none",
          ready ? "opacity-0" : "opacity-100",
        )}
        height={459}
        placeholder="blur"
        priority
        src={src}
        width={378}
      />
    </div>
  );
}
