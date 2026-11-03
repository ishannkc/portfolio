import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: "sm" | "base" | "md" | "none";
  radius?: "lg" | "xl" | "2xl";
  as?: ElementType;
}

const shadows = {
  sm: "ink-shadow-sm",
  base: "ink-shadow",
  md: "ink-shadow-md",
  none: "",
};

const radii = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export function Card({
  children,
  className,
  shadow = "none",
  radius = "2xl",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "border-2 border-[#3B2A20] bg-[#FAF0DC]",
        radii[radius],
        shadows[shadow],
        className,
      )}
    >
      {children}
    </Component>
  );
}
