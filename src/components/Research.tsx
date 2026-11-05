import Image from "next/image";
import { research } from "@/data/research";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";

export function Research() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl"
      id="research"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <h2 className="sr-only">Research</h2>
        <SectionHeading className="mb-space-lg" label={research.label} />

        <Card
          className="relative p-space-lg lg:p-space-xl"
          radius="2xl"
          shadow="md"
        >
          <div className="mb-space-sm flex flex-wrap items-center gap-2">
            <Chip
              className="ink-shadow-sm"
              shape="pill"
              size="xs"
              tone="primary"
            >
              {research.publicationTag}
            </Chip>
            <Chip
              className="ink-shadow-sm"
              shape="pill"
              size="xs"
              tone="gold"
            >
              {research.statusTag}
            </Chip>
          </div>

          <h3 className="font-headline-lg text-2xl font-bold leading-tight text-[#3B2A20] md:text-3xl">
            {research.title}
          </h3>

          <div className="mt-space-lg grid grid-cols-1 gap-space-lg lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
            <div className="min-w-0">
              <p className="font-label-md text-sm font-semibold text-[#800020]">
                {research.authors}
              </p>

              <div className="mt-2 space-y-0.5 font-body-md text-sm leading-relaxed text-[#3B2A20]">
                <p>{research.affiliation}</p>
                <p>{research.course}</p>
                <p className="italic">{research.supervisor}</p>
              </div>

              <div className="mt-space-md rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-space-md">
                <h4 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-[#3B2A20]">
                  {research.methodologyHeading}
                </h4>
                <p className="mt-1 font-body-md text-base leading-relaxed text-[#3B2A20]">
                  {research.methodology}
                </p>
              </div>

              <div className="mt-space-md flex flex-col gap-space-sm">
                {research.takeaways.map((takeaway) => (
                  <div
                    className="ink-shadow-sm rounded-lg border-2 border-[#3B2A20] bg-[#FAF0DC] px-3.5 py-2"
                    key={takeaway.title}
                  >
                    <span
                      className={
                        takeaway.highlight
                          ? "block font-headline-sm text-base font-bold text-[#800020]"
                          : "block font-headline-sm text-base font-bold text-[#3B2A20]"
                      }
                    >
                      {takeaway.title}
                    </span>
                    <span className="font-body-sm text-xs text-[#3B2A20]">
                      {takeaway.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-space-md lg:mx-0">
              <div className="ink-shadow w-full overflow-hidden rounded-xl border-2 border-[#3B2A20] bg-white">
                <Image
                  alt={research.paperPreview.alt}
                  className="h-auto w-full select-none"
                  height={1743}
                  quality={95}
                  sizes="(max-width: 1024px) 92vw, 520px"
                  src={research.paperPreview.src}
                  width={1347}
                />
              </div>

              <a
                className="group inline-flex items-center gap-1.5 border-b-2 border-[#800020] pb-0.5 font-headline-md text-lg font-semibold text-[#800020] transition-colors hover:border-[#3B2A20] hover:text-[#3B2A20]"
                download={research.cta.download}
                href={research.cta.href}
              >
                <span>{research.cta.label}</span>
                <span aria-hidden="true" className="text-lg font-bold">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
