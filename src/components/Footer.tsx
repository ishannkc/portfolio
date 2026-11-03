import { footer } from "@/data/contact";

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-[#3B2A20] bg-[#EFE1C3] py-space-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-space-lg px-margin text-center">
        <div className="ink-shadow-sm inline-flex max-w-full items-center gap-2 rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC] px-space-md py-1.5">
          <span aria-hidden="true" className="text-[#800020]">
            ☕
          </span>
          <p className="font-body-md text-xs text-[#3B2A20] sm:text-base">
            {footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-space-sm">
          {footer.links.map((link) => (
            <a
              className="ink-shadow ink-btn-press flex items-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-[#3B2A20] bg-[#FAF0DC] px-space-md py-1.5 font-label-sm text-xs font-semibold text-[#3B2A20] transition-all hover:bg-[#800020] hover:text-[#FFF4E0]"
              href={link.href}
              key={link.label}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              <span>{link.label}</span>
              <span aria-hidden="true" className="text-xs">
                {link.icon}
              </span>
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-[#3B2A20]/20 pt-space-lg font-body-sm text-sm text-[#584141] sm:flex-row">
          <p>{footer.copyright}</p>
          <p className="font-label-sm text-xs font-medium text-[#3B2A20]">
            {footer.department}
          </p>
        </div>
      </div>
    </footer>
  );
}
