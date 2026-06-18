import type { ReactNode } from "react";

type BorderWeight = "thin" | "normal" | "bold";

const borderClass: Record<BorderWeight, string> = {
  thin: "border-2",
  normal: "border-[3px]",
  bold: "border-4",
};

export interface PanelProps {
  children: ReactNode;
  /** Ink border weight. */
  weight?: BorderWeight;
  /** Render a low-opacity halftone texture behind the content. */
  halftone?: boolean | "dense";
  /** Slight comic skew for energy. */
  skew?: boolean;
  /** Hard inked drop-shadow (the "sticker" look). */
  shadow?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure";
}

/**
 * Bordered comic panel wrapper — the core visual unit reused everywhere.
 */
export function Panel({
  children,
  weight = "normal",
  halftone = false,
  skew = false,
  shadow = false,
  className = "",
  as: Tag = "div",
}: PanelProps) {
  return (
    <Tag
      className={[
        "relative overflow-hidden border-ink bg-paper",
        borderClass[weight],
        shadow ? "ink-shadow" : "",
        skew ? "-rotate-1" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {halftone && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            halftone === "dense" ? "halftone-dense" : "halftone"
          }`}
        />
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}
