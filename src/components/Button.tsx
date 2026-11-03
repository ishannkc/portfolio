import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "gold";
type Size = "xs" | "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  shadow?: boolean;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  download?: boolean | string;
  ariaLabel?: string;
}

interface ActionProps extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "border-[#3B2A20] bg-[#800020] text-[#FFF4E0] hover:bg-[#6b001b]",
  secondary:
    "border-[#3B2A20] bg-[#FAF0DC] text-[#3B2A20] hover:bg-[#EFE1C3]",
  gold: "border-[#3B2A20] bg-[#B8923A] text-[#221B08] hover:bg-[#a37f2f]",
};

const sizes: Record<Size, string> = {
  xs: "gap-1 rounded-md px-4 py-1.5 font-label-md text-xs",
  sm: "gap-2 rounded-lg px-space-lg py-2.5 font-label-lg text-sm",
  md: "gap-2 rounded-lg px-space-xl py-3 font-label-lg text-base",
  lg: "gap-2 rounded-lg px-6 py-3 font-label-lg text-base",
};

const shadows: Record<Size, string> = {
  xs: "ink-shadow-sm",
  sm: "ink-shadow",
  md: "ink-shadow",
  lg: "ink-shadow",
};

const base =
  "ink-btn-press inline-flex items-center justify-center whitespace-nowrap border-2 font-semibold transition-all";

export function Button({
  children,
  variant = "primary",
  size = "md",
  shadow = true,
  className,
  ...props
}: LinkProps | ActionProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    shadow ? shadows[size] : "shadow-none",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <a
        aria-label={props.ariaLabel}
        className={classes}
        download={props.download}
        href={props.href}
        rel={props.external ? "noopener noreferrer" : undefined}
        target={props.external ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-label={props.ariaLabel}
      className={classes}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {children}
    </button>
  );
}
