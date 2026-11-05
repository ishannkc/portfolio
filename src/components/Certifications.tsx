import Image from "next/image";
import { certifications } from "@/data/certifications";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl"
      id="certifications"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-sm" label={certifications.label} />

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          {certifications.items.map((certificate) => (
            <Card
              className="ink-btn-press group flex flex-col p-space-md transition-all"
              key={certificate.title}
              radius="xl"
              shadow="base"
            >
              <div>
                <div className="float-right mb-2 ml-4 w-28 shrink-0 overflow-hidden rounded-lg border-2 border-[#3B2A20] bg-[#EFE1C3] shadow-[2px_2px_0px_#3B2A20] sm:w-36 lg:w-48">
                  <Image
                    alt={certificate.image.alt}
                    className="h-auto w-full select-none transition-transform duration-500 ease-out group-hover:scale-105"
                    height={620}
                    quality={95}
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 192px"
                    src={certificate.image.src}
                    width={1384}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-[#800020]">
                    {certificate.issuer}
                  </span>
                  <Chip size="xxs" tone="parchment">
                    {certificate.year}
                  </Chip>
                </div>

                <h3 className="mt-1 font-headline-sm text-2xl font-bold leading-snug text-[#3B2A20]">
                  {certificate.title}
                </h3>

                <p className="mt-2 font-body-sm text-lg leading-relaxed text-[#3B2A20]">
                  {certificate.description}
                </p>

                <div className="clear-both" />
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#3B2A20]/20 pt-2.5 font-label-sm text-xs">
                <span className="text-[11px] font-medium text-[#584141]">
                  {certificate.meta}
                </span>
                <a
                  className="inline-flex items-center gap-1 font-semibold text-[#800020] underline-offset-4 decoration-[#800020]/60 hover:underline"
                  href={certificate.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>View Certificate</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
