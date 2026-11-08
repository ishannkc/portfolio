import Link from "next/link";
import { HomeIcon, SkullIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main
      className="flex min-h-svh w-full flex-col items-center justify-center bg-[#F5EAD4] px-margin py-space-xl text-center"
      id="main-content"
    >
      <div className="ink-shadow flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC]">
        <SkullIcon className="h-14 w-14 text-[#800020]" />
      </div>

      <h1 className="mt-space-lg font-headline-lg text-3xl font-bold leading-tight text-[#3B2A20] text-balance md:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-space-sm max-w-md font-body-md text-lg text-[#584141] text-balance">
        The page you&apos;re looking does not exist
      </p>

      <Link
        className="ink-btn-press ink-shadow mt-space-lg inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-[#3B2A20] bg-[#800020] px-space-xl py-3 font-label-lg text-base font-semibold text-[#FFF4E0] transition-all hover:bg-[#6b001b]"
        href="/"
      >
        <HomeIcon className="h-5 w-5" />
        Home
      </Link>
    </main>
  );
}
