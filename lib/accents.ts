import type { Accent } from "./comics";

/**
 * Static class maps per accent token.
 * Tailwind only generates classes it can see as complete strings, so we
 * cannot interpolate `bg-${accent}`. These maps keep the full names visible.
 */
export const accentBg: Record<Accent, string> = {
  pow: "bg-pow",
  zap: "bg-zap",
  pop: "bg-pop",
  grape: "bg-grape",
};

export const accentText: Record<Accent, string> = {
  pow: "text-pow",
  zap: "text-zap",
  pop: "text-pop",
  grape: "text-grape",
};

/** Readable text color to sit on top of each accent fill. */
export const accentOn: Record<Accent, string> = {
  pow: "text-paper", // red → light text
  zap: "text-paper", // blue → light text
  pop: "text-ink", // yellow → dark text (contrast)
  grape: "text-paper", // purple → light text
};
