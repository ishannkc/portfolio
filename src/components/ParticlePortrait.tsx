"use client";

import dynamic from "next/dynamic";

/**
 * The canvas effect is browser-only and heavy, so load it after hydration.
 * The placeholder reserves the same aspect ratio to avoid layout shift.
 */
const DotPortrait = dynamic(
  () =>
    import("./DotPortrait").then((module) => ({ default: module.DotPortrait })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="aspect-[1379/1678] w-full"
      />
    ),
  },
);

interface ParticlePortraitProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function ParticlePortrait(props: ParticlePortraitProps) {
  return <DotPortrait {...props} />;
}
