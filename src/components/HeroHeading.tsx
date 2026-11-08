import { TypingHighlight } from "./TypingHighlight";

interface HeroHeadingProps {
  before: string;
  highlight: string;
  after: string;
}

/**
 * The complete greeting is server-rendered as visually hidden text, so the
 * name is always available to crawlers and assistive technology. The visible
 * copy types the highlighted word in.
 */
export function HeroHeading({ before, highlight, after }: HeroHeadingProps) {
  return (
    <h1 className="mb-space-md min-h-[1.15em] w-full font-display-hero text-[3.4rem] font-bold leading-none tracking-tight text-[#3B2A20] md:text-[4.1rem]">
      <span className="sr-only">{`${before}${highlight}${after}`}</span>
      <span aria-hidden="true">
        <span>{before}</span>
        <TypingHighlight
          className="font-extrabold text-[#800020]"
          text={highlight}
        />
        <span>{after}</span>
        <span className="hero-cursor" />
      </span>
    </h1>
  );
}
