import { hero } from "@/data/profile";
import { Button } from "./Button";
import { MailIcon } from "./icons";
import { DotPortrait } from "./DotPortrait";
import {
  Astrolabe,
  CoffeeRing,
  Ornithopter,
} from "./illustrations/Decorations";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl lg:py-24">
      <CoffeeRing className="pointer-events-none absolute -left-12 -top-12 select-none opacity-30" />
      <Ornithopter className="pointer-events-none absolute right-8 top-10 hidden select-none opacity-45 lg:block" />
      <Astrolabe className="pointer-events-none absolute bottom-6 left-12 hidden select-none opacity-35 md:block" />

      <div className="relative mx-auto max-w-[1100px] px-margin">
        <div className="flex flex-col-reverse items-center gap-space-xl lg:flex-row-reverse lg:justify-between lg:gap-28 xl:gap-32">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="mb-space-md font-display-hero text-5xl font-bold leading-none tracking-tight text-[#3B2A20] md:text-6xl">
              {hero.heading.before}
              <span className="font-extrabold text-[#800020]">
                {hero.heading.highlight}
              </span>
              {hero.heading.after}
              <span aria-hidden="true" className="hero-cursor" />
            </h1>

            <p className="mb-space-lg max-w-xl font-body-lg text-xl leading-relaxed text-[#3B2A20]">
              {hero.pitch}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-space-lg lg:justify-start">
              <Button href={hero.cta.href} size="md">
                <span>{hero.cta.label}</span>
                <MailIcon className="h-[1.15em] w-[1.15em]" />
              </Button>
              <a
                aria-label={`${hero.resume.label} (PDF)`}
                className="group inline-flex items-center gap-1.5 border-b-2 border-[#800020] pb-0.5 font-headline-md text-lg font-semibold text-[#800020] transition-colors hover:border-[#3B2A20] hover:text-[#3B2A20]"
                href={hero.resume.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{hero.resume.label}</span>
                <span aria-hidden="true" className="text-lg font-bold">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center justify-center">
            <div className="w-[300px] sm:w-[320px] lg:w-[340px]">
              <DotPortrait />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
