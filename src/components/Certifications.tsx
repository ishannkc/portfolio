import { certifications } from "@/data/certifications";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { SectionHeading } from "./SectionHeading";
import { WaxSeal } from "./WaxSeal";

export function Certifications() {
  return (
    <section
      className="w-full border-b-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl"
      id="certifications"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading
          className="mb-space-lg"
          label={certifications.label}
          subtitle={certifications.subtitle}
          subtitleClassName="text-base"
          title={certifications.title}
        />

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
          {certifications.items.map((certificate) => {
            if (certificate.featured) {
              return (
                <Card
                  className="ink-btn-press relative flex flex-col justify-between p-space-md transition-all md:col-span-2 lg:col-span-3"
                  key={certificate.title}
                  radius="xl"
                  shadow="base"
                >
                  <div>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <WaxSeal size={32}>{certificate.symbol}</WaxSeal>
                        <div>
                          <span className="mb-1 block font-label-sm text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                            {certificate.issuer}
                          </span>
                          <h3 className="font-headline-sm text-base font-bold leading-snug text-[#3B2A20]">
                            {certificate.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {certificate.distinction && (
                          <Chip
                            className="ink-shadow-sm"
                            size="xxs"
                            tone="primary"
                          >
                            {certificate.distinction}
                          </Chip>
                        )}
                        <Chip
                          className="ink-shadow-sm"
                          size="xxs"
                          tone="parchment"
                        >
                          {certificate.year}
                        </Chip>
                      </div>
                    </div>

                    <p className="mt-2.5 font-body-sm text-xs leading-relaxed text-[#3B2A20]">
                      {certificate.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#3B2A20]/20 pt-2.5 font-label-sm text-xs">
                    <span className="text-[10px] font-medium text-[#584141]">
                      {certificate.folio}
                    </span>
                    <a
                      className="inline-flex items-center gap-1 font-semibold text-[#800020] underline-offset-4 decoration-[#800020]/60 hover:underline"
                      href={certificate.href}
                    >
                      <span>View Folio</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </Card>
              );
            }

            return (
              <Card
                className="ink-btn-press relative flex flex-col justify-between p-space-md transition-all"
                key={certificate.title}
                radius="xl"
                shadow="base"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <WaxSeal size={32}>{certificate.symbol}</WaxSeal>
                    <Chip
                      className="ink-shadow-sm"
                      size="xxs"
                      tone="parchment"
                    >
                      {certificate.year}
                    </Chip>
                  </div>

                  <span className="mb-1 block font-label-sm text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                    {certificate.issuer}
                  </span>
                  <h3 className="font-headline-sm text-base font-bold leading-snug text-[#3B2A20]">
                    {certificate.title}
                  </h3>
                  <p className="mt-2 font-body-sm text-xs leading-relaxed text-[#3B2A20]">
                    {certificate.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#3B2A20]/20 pt-2.5 font-label-sm text-xs">
                  <span className="text-[10px] font-medium text-[#584141]">
                    {certificate.folio}
                  </span>
                  <a
                    className="inline-flex items-center gap-1 font-semibold text-[#800020] underline-offset-4 decoration-[#800020]/60 hover:underline"
                    href={certificate.href}
                  >
                    <span>View Folio</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
