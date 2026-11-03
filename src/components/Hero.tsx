import { hero } from "@/data/profile";
import { Button } from "./Button";
import { MailIcon } from "./icons";
import { WaxSeal } from "./WaxSeal";
import { MascotIllustration } from "./illustrations/MascotIllustration";
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

            <div className="flex flex-wrap items-center justify-center gap-space-md lg:justify-start">
              <Button href={hero.cta.href} size="md">
                <span>{hero.cta.label}</span>
                <MailIcon className="h-[1.15em] w-[1.15em]" />
              </Button>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center justify-center">
            <div className="ink-shadow-md relative rounded-2xl border-2 border-[#3B2A20] bg-[#FAF0DC] p-4">
              <div
                aria-hidden="true"
                className="absolute left-1 top-1 select-none text-xs text-[#B8923A]"
              >
                ⌜
              </div>
              <div
                aria-hidden="true"
                className="absolute right-1 top-1 select-none text-xs text-[#B8923A]"
              >
                ⌝
              </div>
              <div
                aria-hidden="true"
                className="absolute bottom-1 left-1 select-none text-xs text-[#B8923A]"
              >
                ⌞
              </div>
              <div
                aria-hidden="true"
                className="absolute bottom-1 right-1 select-none text-xs text-[#B8923A]"
              >
                ⌟
              </div>

              <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] sm:h-72 sm:w-72">
                <MascotIllustration className="h-full w-full p-2" />
              </div>

              <WaxSeal
                className="absolute -right-3 -top-3"
                shadow
                size={44}
              >
                {hero.mascotBadge}
              </WaxSeal>

              <div className="ink-shadow-sm absolute -bottom-3 left-3 rounded-md border-2 border-[#3B2A20] bg-[#FAF0DC] px-3.5 py-1 text-[#3B2A20]">
                <span className="whitespace-nowrap font-label-sm text-xs font-semibold tracking-wide">
                  {hero.mascotCaption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
