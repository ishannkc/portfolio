import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface WaxSealProps {
  children: ReactNode;
  size?: number;
  shadow?: boolean;
  className?: string;
  label?: string;
}

export function WaxSeal({
  children,
  size = 44,
  shadow = false,
  className,
  label,
}: WaxSealProps) {
  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "wax-seal wax-seal-border inline-flex shrink-0 select-none items-center justify-center rounded-full font-headline-sm font-bold text-[#FFF4E0]",
        shadow && "ink-shadow-sm",
        className,
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: size <= 30 ? "10px" : size <= 36 ? "12px" : "13px",
      }}
    >
      {children}
    </span>
  );
}
