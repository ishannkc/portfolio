import Image from "next/image";
import { contact } from "@/data/contact";
import { Card } from "./Card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  ContactCoffeeRing,
  WingQuill,
} from "./illustrations/Decorations";

export function Contact() {
  return (
    <section
      aria-label="Contact"
      className="relative w-full overflow-hidden bg-[#F5EAD4] py-space-xl"
      id="contact"
    >
      <ContactCoffeeRing className="pointer-events-none absolute bottom-2 right-4 select-none opacity-25" />

      <div className="relative mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-sm" label={contact.label} />

        <Reveal>
          <Card
            className="relative mx-auto max-w-3xl p-space-lg sm:p-12"
            radius="2xl"
            shadow="md"
          >
          <div className="pointer-events-none absolute right-4 top-4 hidden w-24 -rotate-2 select-none mix-blend-multiply sm:block md:right-6 md:top-6 lg:w-28">
            <Image
              alt="Nepal postage stamp"
              className="h-auto w-full"
              height={713}
              sizes="(max-width: 1024px) 96px, 112px"
              src="/images/stamp-cropped.webp"
              width={918}
            />
          </div>

          <div className="max-w-xl sm:pr-28 md:pr-28 lg:pr-0">
            <span className="mb-2 block font-label-sm text-xs font-semibold uppercase tracking-wider text-[#800020]">
              {contact.socialsHeading}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {contact.socials.map((social) => (
                <a
                  className="ink-shadow-sm ink-btn-press inline-flex items-center gap-1 rounded-md border-2 border-[#3B2A20] bg-[#EFE1C3] px-3.5 py-1 font-label-md text-xs font-semibold text-[#3B2A20] hover:bg-[#EAD7B0]"
                  href={social.href}
                  key={social.label}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  target={
                    social.href.startsWith("http") ? "_blank" : undefined
                  }
                >
                  <span className="whitespace-nowrap">{social.label}</span>
                  <span aria-hidden="true" className="text-xs">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-space-lg flex items-center justify-end gap-2 text-right">
            <span className="font-label-sm text-xs italic text-[#584141]">
              {contact.signature}
            </span>
            <WingQuill />
          </div>
        </Card>
        </Reveal>
      </div>
    </section>
  );
}
