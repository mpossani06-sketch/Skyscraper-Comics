type Variant = "default" | "dense" | "diagonal" | "pop";

const variantClass: Record<Variant, string> = {
  default: "halftone",
  dense: "halftone-dense",
  diagonal: "halftone-diagonal",
  pop: "halftone-pop",
};

export interface HalftoneProps {
  variant?: Variant;
  className?: string;
}

/**
 * Reusable Ben-Day dot texture layer. Absolutely positioned and decorative,
 * so it's always aria-hidden. Drop inside a `relative` container.
 */
export function Halftone({ variant = "default", className = "" }: HalftoneProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${variantClass[variant]} ${className}`}
    />
  );
}
