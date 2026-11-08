import { hero } from "@/data/profile";
import { Button } from "./Button";
import { MailIcon } from "./icons";
import { ParticlePortrait } from "./ParticlePortrait";
import { HeroHeading } from "./HeroHeading";
import {
  Astrolabe,
  CoffeeRing,
  Ornithopter,
} from "./illustrations/Decorations";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative w-full overflow-hidden border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl lg:py-24"
      id="home"
    >
      <CoffeeRing className="pointer-events-none absolute -left-12 -top-12 select-none opacity-30" />
      <Ornithopter className="pointer-events-none absolute right-8 top-10 hidden select-none opacity-45 lg:block" />
      <Astrolabe className="pointer-events-none absolute bottom-6 left-12 hidden select-none opacity-35 md:block" />

      <div className="relative mx-auto max-w-[1150px] px-margin">
        <div className="flex flex-col-reverse items-center gap-space-xl lg:flex-row-reverse lg:justify-between lg:gap-28 xl:gap-32">
          <div className="flex w-full min-w-0 flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <HeroHeading
              after={hero.heading.after}
              before={hero.heading.before}
              highlight={hero.heading.highlight}
            />

            <p className="mb-space-lg w-full max-w-2xl font-body-lg text-[1.35rem] leading-relaxed text-[#3B2A20]">
              {hero.pitch}
            </p>

            <div className="flex w-full flex-wrap items-center justify-center gap-space-lg lg:justify-start">
              <Button href={hero.cta.href} size="md">
                <span>{hero.cta.label}</span>
                <MailIcon className="h-[1.15em] w-[1.15em]" />
              </Button>
              <a
                aria-label={`${hero.resume.label} (PDF)`}
                className="group inline-flex items-center gap-1.5 border-b-2 border-[#800020] pb-0.5 font-headline-md text-lg font-semibold text-[#800020] transition-all duration-200 hover:-translate-y-1 hover:border-[#3B2A20] hover:text-[#3B2A20] motion-reduce:transform-none"
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

          <div className="relative flex w-full max-w-[320px] shrink-0 items-center justify-center sm:max-w-[345px] lg:max-w-[370px]">
            <div className="w-full">
              <ParticlePortrait />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
