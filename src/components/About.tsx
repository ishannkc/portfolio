import { about } from "@/data/profile";
import { Card } from "./Card";
import { SectionHeading } from "./SectionHeading";
import { WaxSeal } from "./WaxSeal";
import { DeskScene } from "./illustrations/DeskScene";

export function About() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl"
      id="about"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-lg" label={about.label} />

        <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <Card
            className="relative p-space-lg lg:col-span-7"
            radius="2xl"
            shadow="base"
          >
            <span className="absolute right-3 top-2 font-headline-sm text-xs italic text-[#B8923A]">
              Folio II
            </span>

            <h2 className="font-headline-lg text-3xl font-bold leading-snug text-[#3B2A20] md:text-4xl">
              {about.heading}
            </h2>

            <div className="mt-space-md">
              <span aria-hidden="true" className="drop-cap-illuminated">
                {about.dropCap}
              </span>
              <p className="font-body-lg text-xl leading-relaxed text-[#3B2A20]">
                {about.lead.before}
                <strong>{about.lead.highlight}</strong>
                {about.lead.after}
              </p>
            </div>

            <p className="mt-space-sm font-body-md text-lg leading-relaxed text-[#3B2A20]">
              {about.body}
            </p>

            <div className="mt-space-lg grid grid-cols-2 gap-space-sm sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div
                  className="ink-shadow-sm rounded-lg border-2 border-[#3B2A20] bg-[#EFE1C3] p-2.5 text-center"
                  key={stat.label}
                >
                  <span aria-hidden="true" className="block text-lg">
                    {stat.emoji}
                  </span>
                  <span className="block whitespace-nowrap font-label-sm text-xs font-semibold text-[#3B2A20]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card
            className="relative p-space-lg lg:col-span-5"
            radius="2xl"
            shadow="base"
          >
            <WaxSeal
              className="absolute -top-3.5 left-1/2 -translate-x-1/2"
              size={28}
            >
              ❦
            </WaxSeal>

            <div className="mb-2 mt-1 text-center">
              <span className="font-headline-sm text-base font-bold text-[#3B2A20]">
                {about.desk.title}
              </span>
            </div>

            <div className="rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-4">
              <DeskScene className="h-auto w-full" />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-label-sm text-xs text-[#3B2A20]">
              <span className="whitespace-nowrap">{about.desk.captionLeft}</span>
              <span className="whitespace-nowrap">
                {about.desk.captionRight}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
