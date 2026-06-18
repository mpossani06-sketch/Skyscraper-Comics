import type { ReactNode } from "react";

type Tail = "bottom-left" | "bottom-right" | "top-left" | "none";
type Variant = "speech" | "thought";

export interface SpeechBubbleProps {
  children: ReactNode;
  tail?: Tail;
  variant?: Variant;
  className?: string;
}

/** Tail position → CSS positioning for the little inked pointer. */
const tailPos: Record<Exclude<Tail, "none">, string> = {
  "bottom-left": "left-8 -bottom-3",
  "bottom-right": "right-8 -bottom-3",
  "top-left": "left-8 -top-3 rotate-180",
};

/**
 * Comic speech / thought bubble with an inked tail.
 * Dialogue copy uses the Comic Neue face (never used for UI chrome).
 */
export function SpeechBubble({
  children,
  tail = "bottom-left",
  variant = "speech",
  className = "",
}: SpeechBubbleProps) {
  return (
    <div className={`relative inline-block max-w-prose ${className}`}>
      <div
        className={[
          "relative border-[3px] border-ink bg-paper px-5 py-3",
          "font-dialogue text-lg leading-snug text-ink",
          variant === "thought" ? "rounded-[2.5rem]" : "rounded-2xl",
        ].join(" ")}
      >
        {children}
      </div>

      {tail !== "none" &&
        (variant === "speech" ? (
          // Triangular inked tail (two stacked triangles fake the border)
          <span
            aria-hidden
            className={`absolute h-0 w-0 border-x-[14px] border-t-[18px] border-x-transparent border-t-ink ${tailPos[tail]}`}
          >
            <span className="absolute -left-[10px] -top-[19px] h-0 w-0 border-x-[10px] border-t-[13px] border-x-transparent border-t-paper" />
          </span>
        ) : (
          // Thought bubble: two shrinking inked dots
          <span aria-hidden className={`absolute ${tailPos[tail]}`}>
            <span className="block h-3 w-3 rounded-full border-2 border-ink bg-paper" />
            <span className="mt-1 ml-[-6px] block h-2 w-2 rounded-full border-2 border-ink bg-paper" />
          </span>
        ))}
    </div>
  );
}
