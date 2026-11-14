import { DotPortrait } from "./DotPortrait";

interface ParticlePortraitProps {
  className?: string;
  src?: string;
  alt?: string;
}

/**
 * The portrait is part of the page bundle now (instead of a client-only dynamic
 * import) so its canvas hydrates with the rest of the hero. The preloaded
 * poster inside DotPortrait keeps the first paint instant either way.
 */
export function ParticlePortrait(props: ParticlePortraitProps) {
  return <DotPortrait {...props} />;
}
