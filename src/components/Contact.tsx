import { contact } from "@/data/contact";
import { Card } from "./Card";
import { SectionHeading } from "./SectionHeading";
import { WaxSeal } from "./WaxSeal";
import {
  ContactCoffeeRing,
  WingQuill,
} from "./illustrations/Decorations";

export function Contact() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#F5EAD4] py-space-xl"
      id="contact"
    >
      <ContactCoffeeRing className="pointer-events-none absolute bottom-2 right-4 select-none opacity-25" />

      <div className="relative mx-auto max-w-[1100px] px-margin">
        <SectionHeading className="mb-space-lg" label={contact.label} />

        <Card
          className="relative mx-auto max-w-3xl p-space-lg sm:p-12"
          radius="2xl"
          shadow="md"
        >
          <div className="ink-shadow-sm absolute right-6 top-6 hidden h-24 w-20 flex-col items-center justify-between rounded border-2 border-dashed border-[#3B2A20] bg-[#EFE1C3] p-1.5 sm:flex">
            <WaxSeal size={32}>🏔️</WaxSeal>
            <span className="font-label-sm text-[10px] font-bold uppercase tracking-wider text-[#3B2A20]">
              {contact.stamp}
            </span>
            <svg
              aria-hidden="true"
              fill="none"
              height="12"
              viewBox="0 0 48 12"
              width="48"
            >
              <path
                d="M0 6 Q 6 0 12 6 T 24 6 T 36 6 T 48 6"
                fill="none"
                stroke="#3B2A20"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <div className="max-w-xl sm:pr-24 md:pr-0">
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
      </div>
    </section>
  );
}
