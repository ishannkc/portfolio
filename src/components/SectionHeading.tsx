import { cn } from "@/lib/cn";

export function FlourishDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mt-2 flex items-center justify-center gap-2 text-[#B8923A]",
        className,
      )}
    >
      <span className="h-px w-12 bg-[#B8923A]" />
      <span className="text-xs">❦</span>
      <span className="h-px w-12 bg-[#B8923A]" />
    </div>
  );
}

interface SectionHeadingProps {
  label: string;
  title?: string;
  subtitle?: string;
  divider?: "after-chip" | "after-copy" | "none";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  divider = "after-chip",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "ink-shadow-sm inline-flex max-w-full items-center gap-2 rounded-full border-2 border-[#3B2A20] bg-[#FAF0DC] px-space-md py-1.5",
          divider === "after-copy" && "mb-space-sm",
        )}
      >
        <span aria-hidden="true" className="text-sm text-[#800020]">
          ✦
        </span>
        <span className="whitespace-nowrap font-headline-md text-base font-bold tracking-wide text-[#3B2A20]">
          {label}
        </span>
        <span aria-hidden="true" className="text-sm text-[#800020]">
          ✦
        </span>
      </h2>

      {divider === "after-chip" && <FlourishDivider />}

      {title && (
        <h3
          className={cn(
            "font-headline-lg text-3xl font-bold leading-tight text-[#3B2A20] text-balance md:text-4xl",
            divider === "after-chip" && "mt-3",
            titleClassName,
          )}
        >
          {title}
        </h3>
      )}

      {subtitle && (
        <p
          className={cn(
            "mt-1 font-body-md text-lg italic text-[#3B2A20] text-balance",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}

      {divider === "after-copy" && <FlourishDivider />}
    </div>
  );
}
