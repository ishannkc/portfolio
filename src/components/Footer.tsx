import { footer } from "@/data/contact";

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-[#3B2A20] bg-[#EFE1C3] py-space-lg">
      <div className="mx-auto max-w-7xl px-margin text-center">
        <p className="font-body-sm text-sm text-[#584141]">{footer.copyright}</p>
        <p className="font-body-sm text-sm text-[#584141]">{footer.rights}</p>
      </div>
    </footer>
  );
}
