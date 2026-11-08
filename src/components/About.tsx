import Image from "next/image";
import { about } from "@/data/profile";
import { Card } from "./Card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const TECH_STAGGER_MS = 40;
const TECH_STAGGER_CAP_MS = 600;

export function About() {
  return (
    <section
      aria-label="About me"
      className="w-full border-b-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl"
      id="about"
    >
      <div className="mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-sm" label={about.label} />

        <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
          <Card
            className="p-space-lg lg:col-span-7"
            radius="2xl"
            shadow="base"
          >
            <div className="space-y-5">
              <p className="font-body-lg text-lg leading-relaxed text-[#3B2A20]">
                <span className="drop-cap-illuminated">I</span>
                {about.intro.map((segment, index) =>
                  segment.bold ? (
                    <strong
                      className="font-bold text-[#800020]"
                      key={`${segment.text}-${index}`}
                    >
                      {segment.text}
                    </strong>
                  ) : (
                    segment.text
                  ),
                )}
              </p>

              <div>
                <p className="font-body-lg text-lg leading-relaxed text-[#3B2A20]">
                  {about.techLabel}
                </p>

                <ul className="mt-2 grid gap-x-10 gap-y-1.5 font-body-md text-lg leading-snug text-[#3B2A20] sm:grid-flow-col sm:grid-rows-3">
                  {about.technologies.map((technology, index) => (
                    <li key={technology}>
                      <Reveal
                        className="flex items-center gap-2.5"
                        delay={Math.min(
                          index * TECH_STAGGER_MS,
                          TECH_STAGGER_CAP_MS,
                        )}
                        distance={12}
                      >
                        <span
                          aria-hidden="true"
                          className="text-sm font-bold leading-none text-[#800020]"
                        >
                          ▸
                        </span>
                        <span>{technology}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-body-lg text-lg leading-relaxed text-[#3B2A20]">
                {about.outro}
              </p>
            </div>
          </Card>

          <div className="group relative lg:col-span-5">
            <div className="relative aspect-[10/9] overflow-hidden rounded-[2rem] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_24px_50px_-18px_rgba(59,42,32,0.45)] motion-reduce:transform-none">
              <Image
                alt={about.portrait.alt}
                className="select-none object-cover object-[50%_55%]"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                src={about.portrait.src}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
