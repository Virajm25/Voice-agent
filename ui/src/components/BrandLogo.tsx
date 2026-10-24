import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";

// Inline-SVG logo: a rounded tile holding stylised sound bars. Height comes
// from the caller via className (e.g. "h-7"); the wordmark is live text so it
// follows the theme. `mark` renders the tile alone; `inverse` forces light text
// for always-dark surfaces.
export function BrandLogo({
  className,
  inverse = false,
  mark = false,
}: {
  className?: string;
  inverse?: boolean;
  mark?: boolean;
}) {
  const tile = (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className="aspect-square h-full shrink-0"
    >
      <defs>
        <linearGradient id="brand-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f7d62" />
          <stop offset="1" stopColor="#c9824a" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#brand-tile)" />
      <g fill="#fff">
        <rect x="7" y="13" width="3" height="6" rx="1.5" />
        <rect x="12" y="9" width="3" height="14" rx="1.5" />
        <rect x="17" y="6" width="3" height="20" rx="1.5" />
        <rect x="22" y="11" width="3" height="10" rx="1.5" />
      </g>
    </svg>
  );

  if (mark) {
    return (
      <span role="img" aria-label={BRAND_NAME} className={cn("inline-flex select-none", className)}>
        {tile}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={BRAND_NAME}
      className={cn("inline-flex select-none items-center gap-2.5", className)}
    >
      {tile}
      <span
        className={cn(
          "font-display whitespace-nowrap text-[1.05em] font-extrabold leading-none tracking-tight",
          inverse ? "text-white" : "text-foreground",
        )}
      >
        {BRAND_NAME}
      </span>
    </span>
  );
}
