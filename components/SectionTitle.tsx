import type { ReactNode } from "react";

type As = "h1" | "h2" | "h3";

export interface SectionTitleProps {
  children: ReactNode;
  /** Small Bungee eyebrow label above the title. */
  eyebrow?: string;
  as?: As;
  /** Accent color for the inked underline box. */
  accent?: "pow" | "zap" | "pop" | "grape";
  align?: "left" | "center";
  className?: string;
}

const accentBg = {
  pow: "bg-pow",
  zap: "bg-zap",
  pop: "bg-pop",
  grape: "bg-grape",
} as const;

/**
 * Bangers heading with an inked underline accent + optional Bungee eyebrow.
 */
export function SectionTitle({
  children,
  eyebrow,
  as: Tag = "h2",
  accent = "pow",
  align = "left",
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block border-2 border-ink ${accentBg[accent]} px-3 py-1 font-accent text-xs uppercase tracking-tight ${
            accent === "pop" ? "text-ink" : "text-paper"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={`mt-3 font-display tracking-comic leading-[0.95] text-ink ${
          Tag === "h1"
            ? "text-[clamp(3rem,9vw,7rem)]"
            : "text-[clamp(2.25rem,6vw,3.75rem)]"
        }`}
      >
        {children}
      </Tag>
      <span
        className={`mt-3 block h-2 w-28 border-2 border-ink ${accentBg[accent]} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
