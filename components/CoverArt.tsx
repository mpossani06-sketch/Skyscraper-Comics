import Image from "next/image";
import type { Comic } from "@/lib/comics";
import { accentBg, accentOn } from "@/lib/accents";

export interface CoverArtProps {
  comic: Comic;
  /** Extra classes for the outer aspect box. */
  className?: string;
  /** Larger type for splash/detail usage. */
  size?: "card" | "splash";
}

/**
 * Cover art for a series. If `comic.cover` is set we render the real image;
 * otherwise we draw a styled color-block stand-in (ink frame + Bangers title)
 * so layouts read correctly before real covers are dropped in.
 */
export function CoverArt({ comic, className = "", size = "card" }: CoverArtProps) {
  if (comic.cover) {
    return (
      <div className={`relative aspect-[3/4] ${className}`}>
        <Image
          src={comic.cover}
          alt={`Cover art for ${comic.title}`}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder cover for ${comic.title}`}
      className={`relative grid aspect-[3/4] place-items-center overflow-hidden ${accentBg[comic.accent]} ${className}`}
    >
      {/* halftone wash for depth */}
      <div className="pointer-events-none absolute inset-0 halftone-dense" />
      {/* faux issue banner */}
      <span className="absolute top-0 left-0 m-3 border-2 border-ink bg-paper px-2 py-0.5 font-accent text-[0.65rem] uppercase tracking-tight text-ink">
        Issue&nbsp;#1
      </span>
      <span
        className={`relative px-4 text-center font-display tracking-comic leading-[0.9] ${accentOn[comic.accent]} ${
          size === "splash"
            ? "text-[clamp(2.5rem,7vw,5rem)]"
            : "text-[clamp(1.75rem,5vw,2.75rem)]"
        }`}
      >
        {comic.title}
      </span>
      <span
        className={`absolute bottom-0 mb-4 font-accent text-[0.7rem] uppercase tracking-tight ${accentOn[comic.accent]} opacity-80`}
      >
        {comic.genre}
      </span>
    </div>
  );
}
