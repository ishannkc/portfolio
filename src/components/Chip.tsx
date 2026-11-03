import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "parchment" | "primary" | "gold" | "plain";
type Size = "xxs" | "xs" | "sm" | "md";

interface ChipProps {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  shape?: "rounded" | "pill";
  shadow?: boolean;
  font?: "label-sm" | "label-md";
  className?: string;
}

const tones: Record<Tone, string> = {
  parchment: "border-[#3B2A20] bg-[#EFE1C3] text-[#3B2A20]",
  primary: "border-[#3B2A20] bg-[#800020] text-[#FFF4E0]",
  gold: "border-[#3B2A20] bg-[#B8923A] text-[#221B08]",
  plain: "border-[#3B2A20] bg-[#FAF0DC] text-[#3B2A20]",
};

const sizes: Record<Size, string> = {
  xxs: "px-2 py-0.5 text-[10px]",
  xs: "px-2.5 py-0.5 text-xs",
  sm: "px-3 py-1 text-xs",
  md: "px-3.5 py-2 text-sm",
};

export function Chip({
  children,
  tone = "parchment",
  size = "xs",
  shape = "rounded",
  shadow = false,
  font = "label-sm",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap border font-medium leading-tight",
        shape === "pill" ? "rounded-full" : "rounded-md",
        tones[tone],
        sizes[size],
        font === "label-md" ? "font-label-md" : "font-label-sm",
        shadow && "ink-shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
