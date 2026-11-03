"use client";

import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import type { NavItem } from "@/data/types";

interface MobileNavProps {
  navItems: readonly NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex items-center justify-center p-1 text-[#3B2A20] transition-colors hover:text-[#800020]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <CloseIcon className="h-7 w-7" />
        ) : (
          <MenuIcon className="h-7 w-7" />
        )}
      </button>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full flex flex-col gap-3.5 border-t border-[#3B2A20]/20 bg-[#F7EEDB] px-6 py-4 md:px-12"
          id={menuId}
        >
          {navItems.map((item) => (
            <a
              className={
                item.href === "#"
                  ? "font-headline-md text-lg font-extrabold text-[#800020] underline decoration-[#800020]/60 decoration-1 underline-offset-4"
                  : "font-headline-md text-lg font-extrabold text-[#3B2A20] transition-colors hover:text-[#800020]"
              }
              href={item.href}
              key={item.label}
              onClick={() => setOpen(false)}
              {...(item.href === "#" ? { "aria-current": "page" as const } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
