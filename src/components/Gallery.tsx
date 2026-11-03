import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Button } from "./Button";
import { Card } from "./Card";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const feature = gallery.feature;

  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#F5EAD4] py-space-xl"
      id="gallery"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading
          className="mb-space-lg"
          label={gallery.label}
          subtitle={gallery.subtitle}
          subtitleClassName="text-base"
          title={gallery.title}
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
          {gallery.items.map((item) => (
            <Card
              className="ink-btn-press flex flex-col justify-between p-space-md"
              key={item.title}
              radius="xl"
              shadow="base"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-[#3B2A20] bg-[#EFE1C3] p-3">
                <span aria-hidden="true" className="text-4xl">
                  {item.emoji}
                </span>
                <span className="absolute bottom-2 right-2 font-label-sm text-[10px] text-[#584141]">
                  {item.plate}
                </span>
              </div>
              <h3 className="mt-3 font-headline-sm text-base font-bold text-[#3B2A20]">
                {item.title}
              </h3>
              <p className="mt-1 font-body-sm text-xs text-[#584141]">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card
          className="relative mt-space-lg overflow-hidden p-space-lg"
          radius="2xl"
          shadow="md"
        >
          <div className="flex flex-col items-center gap-space-lg md:flex-row">
            <div className="relative flex w-full items-center justify-center rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-space-md md:w-1/2">
              <span className="absolute left-3 top-2 font-label-sm text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                {feature.plateLabel}
              </span>

              <Image
                alt={feature.image.alt}
                className="h-auto max-h-64 w-auto max-w-full select-none object-contain sm:max-h-72"
                height={feature.image.height}
                sizes="(max-width: 768px) 80vw, 288px"
                src={feature.image.src}
                width={feature.image.width}
              />

              <div className="ink-shadow-sm absolute bottom-2 right-2 rounded border border-[#3B2A20] bg-[#FAF0DC] px-2 py-0.5 font-label-sm text-[10px] font-semibold text-[#3B2A20]">
                {feature.dimensions}
              </div>
            </div>

            <div className="flex w-full flex-col justify-between md:w-1/2">
              <div className="mb-2 inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#800020]"
                />
                <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#800020]">
                  {feature.eyebrow}
                </span>
              </div>

              <h3 className="font-headline-lg text-2xl font-bold leading-tight text-[#3B2A20] text-balance md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-2 font-body-md text-base leading-relaxed text-[#3B2A20]">
                {feature.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#3B2A20]/20 pt-3 font-label-sm text-xs text-[#584141]">
                {feature.features.map((item) => (
                  <span className="inline-flex items-center gap-1" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-space-md flex flex-wrap items-center gap-3">
                <Button
                  download="temple-logo.png"
                  href={feature.image.src}
                  size="sm"
                >
                  <span aria-hidden="true" className="text-base">
                    🖼️
                  </span>
                  <span>{feature.saveLabel}</span>
                </Button>
                <Button
                  external
                  href={feature.image.src}
                  size="sm"
                  variant="secondary"
                >
                  <span>{feature.viewLabel}</span>
                  <span aria-hidden="true">↗</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
