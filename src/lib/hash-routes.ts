/**
 * Hash destinations that exist on the single-page site. Any other fragment
 * (for example `/#projects/hi`) is treated as an unknown route, so it gets
 * redirected to a real path and rendered by the Not Found page.
 */
export const KNOWN_HASHES = [
  "#home",
  "#about",
  "#projects",
  "#research",
  "#skills",
  "#certifications",
  "#gallery",
  "#contact",
  "#main-content",
] as const;

export function isKnownHash(hash: string) {
  if (!hash || hash === "#") return true;
  return (KNOWN_HASHES as readonly string[]).includes(hash);
}

/** Turns `#projects/hi` into `/projects/hi` so Next.js can resolve a route. */
export function hashToPath(hash: string) {
  return `/${hash.replace(/^#/, "")}`;
}
