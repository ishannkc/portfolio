import { research } from "@/data/research";
import { Button } from "./Button";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";
import { ResearchKitIllustration } from "./illustrations/ResearchKit";

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
          <div className="flex flex-col gap-space-lg lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
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

              <h3 className="font-headline-lg text-2xl font-bold leading-tight text-[#3B2A20] text-balance md:text-3xl">
                {research.title}
              </h3>

              <p className="mt-2 font-label-md text-sm font-semibold italic text-[#800020]">
                <strong>{research.author}</strong>
                {research.coAuthors}
              </p>

              <div className="mt-space-md rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-space-md">
                <h4 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-[#3B2A20]">
                  {research.methodologyHeading}
                </h4>
                <p className="mt-1 font-body-md text-base leading-relaxed text-[#3B2A20]">
                  {research.methodology}
                </p>
              </div>

              <div className="mt-space-md flex flex-wrap items-center gap-space-sm">
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

              <div className="mt-space-lg flex flex-wrap items-center gap-space-md">
                <Button href={research.cta.href} size="sm">
                  <span>{research.cta.label}</span>
                  <span aria-hidden="true">{research.cta.icon}</span>
                </Button>
                <span className="font-body-sm text-xs italic text-[#584141]">
                  {research.note}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 justify-center lg:w-72">
              <div className="ink-shadow flex w-full flex-col items-center rounded-xl border-2 border-[#3B2A20] bg-[#EFE1C3] p-4 text-center">
                <ResearchKitIllustration className="my-2" />
                <span className="font-headline-sm text-base font-bold text-[#3B2A20]">
                  {research.graphic.title}
                </span>
                <p className="mt-1 font-body-sm text-xs italic text-[#3B2A20]">
                  {research.graphic.caption}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
